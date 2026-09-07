/**
 * backfill-planitem-uid.ts
 *
 * Befüllt bestehende planItems-Dokumente ohne (oder mit falschem) uid-Feld
 * nachträglich. Die planItems-Security-Rule verlangt
 * resource.data.uid == request.auth.uid für Lesen, Schreiben und Löschen —
 * Dokumente ohne korrekte uid sind für Clients komplett unerreichbar
 * ("Missing or insufficient permissions").
 *
 * Die uid steht im Dokumentpfad (users/{uid}/plans/{planId}/planItems/{itemId})
 * und wird daraus abgeleitet. Idempotent: Dokumente, deren uid bereits dem
 * Pfad entspricht, werden übersprungen. Falsche uids (Datenkorruption, z. B.
 * manuell angelegte Testdaten) werden auf die Pfad-uid korrigiert — sonst
 * hätte der "falsche" Besitzer laut Regel Zugriff auf fremde Items.
 *
 * Collection-Group-Query über alle planItems, paginiert über documentId.
 *
 * Voraussetzung: Service-Account-Credentials über
 * GOOGLE_APPLICATION_CREDENTIALS (oder gcloud ADC für learnhub-eca26).
 *
 * Usage: npm run backfill:planitem-uid [-- --dry-run]
 */

import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import {
  FieldPath,
  getFirestore,
  type QueryDocumentSnapshot,
} from "firebase-admin/firestore";

const dryRun = process.argv.includes("--dry-run");

if (getApps().length === 0) {
  initializeApp({ credential: applicationDefault() });
}

const db = getFirestore();
const PAGE_SIZE = 450; // unter dem Batch-Limit von 500

async function main(): Promise<void> {
  let processed = 0;
  let updated = 0;
  let fixedMismatch = 0;
  let skippedOk = 0;
  let skippedNoPathUid = 0;

  let lastDoc: QueryDocumentSnapshot | undefined;

  while (true) {
    let q = db
      .collectionGroup("planItems")
      .orderBy(FieldPath.documentId())
      .limit(PAGE_SIZE);
    if (lastDoc) q = q.startAfter(lastDoc);
    const snapshot = await q.get();
    if (snapshot.empty) break;

    const batch = db.batch();
    let batchCount = 0;

    for (const docSnap of snapshot.docs) {
      processed += 1;
      const data = docSnap.data() as Record<string, unknown>;

      // Pfad: users/{uid}/plans/{planId}/planItems/{itemId}
      const pathUid = docSnap.ref.path.split("/")[1];
      if (!pathUid) {
        skippedNoPathUid += 1;
        continue;
      }

      if (data.uid === pathUid) {
        skippedOk += 1;
        continue;
      }

      if (typeof data.uid === "string" && data.uid.length > 0) {
        fixedMismatch += 1;
      }

      batch.update(docSnap.ref, { uid: pathUid });
      batchCount += 1;
      updated += 1;
    }

    if (batchCount > 0 && !dryRun) {
      await batch.commit();
      console.log(`Batch committed: ${batchCount} Dokument(e)`);
    }

    lastDoc = snapshot.docs[snapshot.docs.length - 1];
  }

  console.log(
    `Fertig${dryRun ? " (dry-run)" : ""}: ${processed} verarbeitet, ` +
      `${updated} mit uid befüllt (davon ${fixedMismatch} korrigiert), ` +
      `${skippedOk} waren korrekt, ${skippedNoPathUid} ohne uid im Pfad.`
  );
}

main().catch((err) => {
  console.error("Backfill fehlgeschlagen:", err);
  process.exitCode = 1;
});
