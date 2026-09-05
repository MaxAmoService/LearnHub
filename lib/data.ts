import { mathModules, mathCategories } from "./mathData";
import { ihkModule, ihkCategories } from "./ihkData";
import { netzwerkModule } from "./netzwerkData";
import { reactModule } from "./reactData";
import { typescriptModule } from "./typescriptData";
import { nextjsModule } from "./nextjsData";

import { datenbankModule } from "./datenbankData";
import { computersystemeModule } from "./computersystemeData";
import { itSicherheitModule } from "./itSicherheitData";
import { complexModule } from "./complexData";
import { gitModule } from "./gitData";
import { uxModule } from "./uxData";
import { qualitaetModule } from "./qualitaetData";
import { projektmanagementModule } from "./projektmanagementData";
import { dockerModule } from "./dockerData";
import { erwProgModule } from "./erwProgData";
import { grundrechnenModule } from "./grundrechnenData";
import { ganzeZahlenModule } from "./ganzeZahlenData";
import { quadratischeGleichungenModule } from "./quadratischeGleichungenData";
import { logarithmusModule } from "./logarithmusData";
import { exponentialModule } from "./exponentialData";
import { wachstumsprozesseModule } from "./wachstumsprozesseData";
import { fourierModule } from "./fourierData";
import { Category } from "./types";
import { contentModules } from "./content/registry";

// Re-export types for backward compatibility
export type { Lesson, Module, Category } from "./types";

export const categories: Category[] = [
  {
    id: "programmieren",
    name: "Programmieren",
    icon: "💻",
    description: "Lerne moderne Programmiersprachen und Frameworks",
  },
  ...mathCategories,
  ...ihkCategories,
  {
    id: "projektmanagement",
    name: "Projektmanagement",
    icon: "📋",
    description: "Klassisch & Agil, Scrum, DIN 69901, Magisches Dreieck",
  },
  {
    id: "qualitaet",
    name: "Software-Qualität",
    icon: "✅",
    description: "ISO 9126, Design Patterns, Architekturstile, Testverfahren",
  },
];

export const modules = [
  reactModule,
  typescriptModule,
  nextjsModule,
];

// Combine all modules
export const allModules = [
  ...modules,
  ...mathModules,
  ihkModule,
  netzwerkModule,
  datenbankModule,
  computersystemeModule,
  itSicherheitModule,
  complexModule,
  gitModule,
  uxModule,
  qualitaetModule,
  projektmanagementModule,
  dockerModule,
  erwProgModule,
  grundrechnenModule,
  ganzeZahlenModule,
  quadratischeGleichungenModule,
  logarithmusModule,
  exponentialModule,
  wachstumsprozesseModule,
  fourierModule,
  ...contentModules,
];

export function getModule(slug: string) {
  return allModules.find((m) => m.slug === slug);
}
