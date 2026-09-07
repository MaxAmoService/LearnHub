/**
 * backfill-topic-slug.ts
 *
 * Befüllt bestehende planItems-Dokumente mit dem topicSlug aus der
 * AP1-Vorlage. Der topicSlug verknüpft ein Plan-Item mit seinen statischen
 * Übungsaufgaben (content/exercises/<topicSlug>.json) und wurde den
 * Template-Items nachträglich hinzugefügt — Bestands-Docs haben ihn nicht.
 *
 * Ablauf: Alle Pläne mit templateId "ap1-it-berufe" einsammeln (Collection
 * Group, paginiert über documentId — keine Composite-Index-Pflicht), dann je
 * Plan die planItems über die order dem Slug aus der Vorlagen-Datei zuordnen.
 * Idempotent: Items mit bereits korrektem topicSlug werden übersprungen,
 * falsche werden korrigiert. Pläne ohne Vorlage (templateId null) und Pläne
 * anderer Vorlagen bleiben unberührt.
 *
 * Voraussetzung: Service-Account-Credentials über
 * GOOGLE_APPLICATION_CREDENTIALS (oder gcloud ADC für learnhub-eca26).
 *
 * Usage: npm run backfill:topic-slug [-- --dry-run]
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
const TEMPLATE_ID = "ap1-it-berufe";

interface TemplateFile {
  items: { order: number; topicSlug: string | null }[];
}

const template: TemplateFile = JSON.parse(
  readFileSync(join(process.cwd(), "content", "plan-templates", `${TEMPLATE_ID}.json`), "utf8")
) as TemplateFile;

const slugByOrder = new Map<number, string | null>();
for (const item of template.items) {
  slugByOrder.set(item.order, item.topicSlug ?? null);
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
      if (plan.templateId !== TEMPLATE_ID) continue;
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
        const item = itemSnap.data() as { order?: number; topicSlug?: string | null };
        const expected = slugByOrder.get(item.order ?? -1) ?? null;
        if (expected === null) continue; // Vorlagen-Item ohne Slug → nichts zu tun
        if (item.topicSlug === expected) {
          itemsSkippedOk += 1;
          continue;
        }
        batch.update(itemSnap.ref, { topicSlug: expected });
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
      `${plansMatched} AP1-Pläne, ${itemsProcessed} Items geprüft, ` +
      `${itemsUpdated} mit topicSlug befüllt/korrigiert, ${itemsSkippedOk} waren korrekt.`
  );
}

main().catch((err) => {
  console.error("Backfill fehlgeschlagen:", err);
  process.exitCode = 1;
});
