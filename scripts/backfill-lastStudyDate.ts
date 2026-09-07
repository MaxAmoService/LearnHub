/**
 * backfill-lastStudyDate.ts
 *
 * Setzt einmalig lastStudyDate ("YYYY-MM-DD") für alle User-Dokumente, die
 * das Feld noch nicht haben — abgeleitet aus dem Datum von lastActive
 * (Europe/Berlin, Tagesgrenze 04:00, über lib/dates.ts). Idempotent:
 * Dokumente mit vorhandenem lastStudyDate werden übersprungen; der Streak
 * selbst wird nicht angefasst. Dadurch verliert kein Nutzer seinen Streak,
 * wenn die Streak-Logik auf lastStudyDate umgestellt wird.
 *
 * Voraussetzung: Service-Account-Credentials über
 * GOOGLE_APPLICATION_CREDENTIALS (oder gcloud ADC für learnhub-eca26).
 *
 * Usage: npx ts-node scripts/backfill-lastStudyDate.ts [--dry-run]
 */

import { applicationDefault, getApps, initializeApp } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  type Query,
  type QueryDocumentSnapshot,
} from "firebase-admin/firestore";
import { todayKey } from "../lib/dates";

const dryRun = process.argv.includes("--dry-run");

if (getApps().length === 0) {
  initializeApp({ credential: applicationDefault() });
}

const db = getFirestore();
const PAGE_SIZE = 450; // unter dem Batch-Limit von 500

function lastActiveToDate(value: unknown): Date | null {
  if (value instanceof Timestamp) return value.toDate();
  if (typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

async function main(): Promise<void> {
  let processed = 0;
  let updated = 0;
  let skippedHasField = 0;
  let skippedNoLastActive = 0;

  let lastDoc: QueryDocumentSnapshot | undefined;

  while (true) {
    let q: Query = db.collection("users").limit(PAGE_SIZE);
    if (lastDoc) q = q.startAfter(lastDoc);
    const snapshot = await q.get();
    if (snapshot.empty) break;

    const batch = db.batch();
    let batchCount = 0;

    for (const docSnap of snapshot.docs) {
      processed += 1;
      const data = docSnap.data() as Record<string, unknown>;

      if (typeof data.lastStudyDate === "string") {
        skippedHasField += 1;
        continue;
      }

      const lastActiveDate = lastActiveToDate(data.lastActive);
      if (!lastActiveDate) {
        skippedNoLastActive += 1;
        continue;
      }

      batch.update(docSnap.ref, { lastStudyDate: todayKey(lastActiveDate) });
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
      `${updated} aktualisiert, ${skippedHasField} hatten das Feld schon, ` +
      `${skippedNoLastActive} ohne lastActive.`
  );
}

main().catch((err) => {
  console.error("Backfill fehlgeschlagen:", err);
  process.exitCode = 1;
});
