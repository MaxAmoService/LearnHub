/**
 * backfill-plan-item-lessonids.ts
 *
 * Befüllt bestehende planItems-Dokumente mit der lessonId aus den
 * Plan-Vorlagen (ap1-it-berufe + mathematik-1). Die lessonId verknüpft ein
 * Plan-Item mit einer Lektion im Modul (Deep-Link „Modul öffnen") und wurde
 * den Template-Items nachträglich durch scripts/match-plan-items-to-lessons.ts
 * hinzugefügt — Bestands-Docs haben sie nicht.
 *
 * Ablauf: Alle Pläne mit templateId "ap1-it-berufe" oder "mathematik-1"
 * einsammeln (Collection Group, paginiert über documentId — keine
 * Composite-Index-Pflicht), dann je Plan die planItems über die order der
 * lessonId aus der Vorlagen-Datei zuordnen. Idempotent: Items mit bereits
 * korrekter lessonId werden übersprungen, falsche werden korrigiert. Pläne
 * ohne Vorlage (templateId null) und Pläne anderer Vorlagen bleiben
 * unberührt.
 *
 * Voraussetzung: Service-Account-Credentials über
 * GOOGLE_APPLICATION_CREDENTIALS (oder gcloud ADC für learnhub-eca26).
 *
 * Usage: npm run backfill:plan-item-lessonids [-- --dry-run]
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
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
const TEMPLATE_IDS = ["ap1-it-berufe", "mathematik-1"];

interface TemplateFile {
  items: { order: number; lessonId: string | null }[];
}

// lessonId per order, je Vorlage — Quelle der Wahrheit sind die JSON-Dateien.
const lessonIdByTemplate = new Map<string, Map<number, string | null>>();
for (const templateId of TEMPLATE_IDS) {
  const template = JSON.parse(
    readFileSync(join(process.cwd(), "content", "plan-templates", `${templateId}.json`), "utf8")
  ) as TemplateFile;
  const byOrder = new Map<number, string | null>();
  for (const item of template.items) {
    byOrder.set(item.order, item.lessonId ?? null);
  }
  lessonIdByTemplate.set(templateId, byOrder);
}

async function main(): Promise<void> {
  let plansProcessed = 0;
  let plansMatched = 0;
  let itemsProcessed = 0;
  let itemsUpdated = 0;
  let itemsSkippedOk = 0;

  let lastDoc: QueryDocumentSnapshot | undefined;

  while (true) {
    let q = db
      .collectionGroup("plans")
      .orderBy(FieldPath.documentId())
      .limit(PAGE_SIZE);
    if (lastDoc) q = q.startAfter(lastDoc);
    const snapshot = await q.get();
    if (snapshot.empty) break;

    for (const planSnap of snapshot.docs) {
      plansProcessed += 1;
      const plan = planSnap.data() as { templateId?: string | null };
      const byOrder = lessonIdByTemplate.get(plan.templateId ?? "");
      if (!byOrder) continue;
      plansMatched += 1;

      // Pfad: users/{uid}/plans/{planId}
      const pathParts = planSnap.ref.path.split("/");
      const uid = pathParts[1];
      const planId = pathParts[3];

      const itemsSnap = await db
        .collection(`users/${uid}/plans/${planId}/planItems`)
        .get();

      const batch = db.batch();
      let batchCount = 0;

      for (const itemSnap of itemsSnap.docs) {
        itemsProcessed += 1;
        const item = itemSnap.data() as { order?: number; lessonId?: string | null };
        const expected = byOrder.get(item.order ?? -1) ?? null;
        if (expected === null) continue; // Vorlagen-Item ohne lessonId → nichts zu tun
        if ((item.lessonId ?? null) === expected) {
          itemsSkippedOk += 1;
          continue;
        }
        batch.update(itemSnap.ref, { lessonId: expected });
        batchCount += 1;
        itemsUpdated += 1;
      }

      if (batchCount > 0 && !dryRun) {
        await batch.commit();
        console.log(`Batch committed: ${batchCount} Item(s) für Plan ${planId}`);
      }
    }

    lastDoc = snapshot.docs[snapshot.docs.length - 1];
  }

  console.log(
    `Fertig${dryRun ? " (dry-run)" : ""}: ${plansProcessed} Pläne verarbeitet, ` +
      `${plansMatched} Template-Pläne, ${itemsProcessed} Items geprüft, ` +
      `${itemsUpdated} mit lessonId befüllt/korrigiert, ${itemsSkippedOk} waren korrekt.`
  );
}

main().catch((err) => {
  console.error("Backfill fehlgeschlagen:", err);
  process.exitCode = 1;
});
