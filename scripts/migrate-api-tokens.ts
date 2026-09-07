/**
 * migrate-api-tokens.ts
 *
 * Entfernt das Altlasten-Feld `apiToken` aus den User-Dokumenten. Die Werte
 * lagen im Klartext in users/{uid} — und users/{uid} ist für JEDEN
 * angemeldeten Nutzer lesbar (Leaderboard). Die Tokens gelten daher als
 * kompromittiert: Sie werden NICHT in gültige API-Keys überführt, sondern
 * verworfen. Betroffene Nutzer legen sich über die Profil-Einstellungen
 * (API-Tab) einen frischen Key an und tragen ihn an ihren Geräten ein.
 *
 * Idempotent: Dokumente ohne apiToken-Feld werden übersprungen, ein zweiter
 * Lauf findet nichts mehr. Betroffene UIDs werden ins Log geschrieben
 * (uid + username/email zur Identifikation).
 *
 * Credentials: FIREBASE_SERVICE_ACCOUNT (base64) oder
 * GOOGLE_APPLICATION_CREDENTIALS / gcloud ADC — siehe lib/firebaseAdmin.ts.
 *
 * Usage: npm run migrate:api-tokens [-- --dry-run]
 */

import { FieldPath, FieldValue, type QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getAdminDb } from "../lib/firebaseAdmin";

const dryRun = process.argv.includes("--dry-run");

const db = getAdminDb();
const PAGE_SIZE = 450; // unter dem Batch-Limit von 500

async function main(): Promise<void> {
  let processed = 0;
  let removed = 0;
  const affected: Array<{ uid: string; name: string }> = [];

  let lastDoc: QueryDocumentSnapshot | undefined;

  while (true) {
    let q = db
      .collection("users")
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

      if (!("apiToken" in data)) continue;

      removed += 1;
      const username = typeof data.username === "string" ? data.username : "";
      const email = typeof data.email === "string" ? data.email : "";
      affected.push({
        uid: docSnap.id,
        name: [username, email].filter(Boolean).join(" / ") || "(kein Name)",
      });

      batch.update(docSnap.ref, { apiToken: FieldValue.delete() });
      batchCount += 1;
    }

    if (batchCount > 0 && !dryRun) {
      await batch.commit();
      console.log(`Batch committed: ${batchCount} Dokument(e)`);
    }

    lastDoc = snapshot.docs[snapshot.docs.length - 1];
  }

  console.log(
    `Fertig${dryRun ? " (dry-run)" : ""}: ${processed} User geprüft, ` +
      `${removed} apiToken-Felder entfernt.`
  );
  if (affected.length > 0) {
    console.log("Betroffene Nutzer (altes Token wurde VERWORFEN, neuer Key nötig):");
    for (const a of affected) {
      console.log(`  ${a.uid}  ${a.name}`);
    }
  } else {
    console.log("Keine apiToken-Felder gefunden.");
  }
}

main().catch((err) => {
  console.error("Migration fehlgeschlagen:", err);
  process.exitCode = 1;
});
