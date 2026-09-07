// Übungsaufgaben-Registry — analog zu lib/data.ts.
//
// content/exercises/<topicSlug>.json wird hier explizit importiert (statisch,
// ohne Netz, ohne API-Key) und über den Themen-Slug auffindbar gemacht. Der
// topicSlug steht am Plan-Template-Item und am planItem (lib/plans.ts).
//
// Neue Datei anlegen → hier eintragen, sonst ist sie unsichtbar.

import type { Exercise, ExerciseFile } from "./types";

// Quelle A — aus Bestand konvertiert (scripts/convert-existing-exercises.ts)
// Quelle B — prozedural erzeugt (scripts/materialize-procedural.ts)
import computersystemebiosuefiboot from "../../content/exercises/computersysteme-bios-uefi-boot.json";
import computersystemebussetaktbefehlssatz from "../../content/exercises/computersysteme-busse-takt-befehlssatz.json";
import computersystemecpupipeliningcaches from "../../content/exercises/computersysteme-cpu-pipelining-caches.json";
import computersystemedateisystemezugriffsrechte from "../../content/exercises/computersysteme-dateisysteme-zugriffsrechte.json";
import computersystemeeinausgabegeraete from "../../content/exercises/computersysteme-ein-ausgabegeraete.json";
import computersystemekernelprozessethreads from "../../content/exercises/computersysteme-kernel-prozesse-threads.json";
import computersystemeleistungsbewertung from "../../content/exercises/computersysteme-leistungsbewertung.json";
import computersystememultitaskingscheduling from "../../content/exercises/computersysteme-multitasking-scheduling.json";
import computersystemeosaufgaben from "../../content/exercises/computersysteme-os-aufgaben.json";
import computersystemeosvergleich from "../../content/exercises/computersysteme-os-vergleich.json";
import computersystemeschnittstellendatenuebertragung from "../../content/exercises/computersysteme-schnittstellen-datenuebertragung.json";
import computersystemeshellskripte from "../../content/exercises/computersysteme-shell-skripte.json";
import computersystemespeicherhierarchieram from "../../content/exercises/computersysteme-speicherhierarchie-ram.json";
import computersystemespeichermedienraid from "../../content/exercises/computersysteme-speichermedien-raid.json";
import computersystemespeicherverwaltungpaging from "../../content/exercises/computersysteme-speicherverwaltung-paging.json";
import computersystemevirtualisierungcloud from "../../content/exercises/computersysteme-virtualisierung-cloud.json";
import computersystemevonneumanncpu from "../../content/exercises/computersysteme-von-neumann-cpu.json";
import diagrammelastenheftpflichtenheft from "../../content/exercises/diagramme-lastenheft-pflichtenheft.json";
import diagrammenetzplankritischerpfad from "../../content/exercises/diagramme-netzplan-kritischer-pfad.json";
import itsicherheitauthentifizierungpasswoerter from "../../content/exercises/it-sicherheit-authentifizierung-passwoerter.json";
import itsicherheitnetzwerksicherheitfirewalls from "../../content/exercises/it-sicherheit-netzwerksicherheit-firewalls.json";
import itsicherheitschutzzielebedrohungen from "../../content/exercises/it-sicherheit-schutzziele-bedrohungen.json";
import itsicherheitsocialengineering from "../../content/exercises/it-sicherheit-social-engineering.json";
import itsicherheitverschluesselungpki from "../../content/exercises/it-sicherheit-verschluesselung-pki.json";
import itsicherheitwebsecurityowasp from "../../content/exercises/it-sicherheit-web-security-owasp.json";
import netzwerktechnikdnsdhcp from "../../content/exercises/netzwerktechnik-dns-dhcp.json";
import netzwerktechnikipv4adressierung from "../../content/exercises/netzwerktechnik-ipv4-adressierung.json";
import netzwerktechnikipv6 from "../../content/exercises/netzwerktechnik-ipv6.json";
import netzwerktechniknetzwerkhardware from "../../content/exercises/netzwerktechnik-netzwerkhardware.json";
import netzwerktechnikosimodell from "../../content/exercises/netzwerktechnik-osi-modell.json";
import netzwerktechnikprotokolleueberblick from "../../content/exercises/netzwerktechnik-protokolle-ueberblick.json";
import netzwerktechnikrouting from "../../content/exercises/netzwerktechnik-routing.json";
import netzwerktechniksubnetting from "../../content/exercises/netzwerktechnik-subnetting.json";
import netzwerktechniktcpipprotokolle from "../../content/exercises/netzwerktechnik-tcpip-protokolle.json";
import netzwerktechnikverkabelung from "../../content/exercises/netzwerktechnik-verkabelung.json";
import netzwerktechnikvlansegmentierung from "../../content/exercises/netzwerktechnik-vlan-segmentierung.json";
import netzwerktechnikwlan from "../../content/exercises/netzwerktechnik-wlan.json";
import projektmanagementagilescrum from "../../content/exercises/projektmanagement-agile-scrum.json";
import projektmanagementklassischwasserfall from "../../content/exercises/projektmanagement-klassisch-wasserfall.json";
import projektmanagementmagischesdreieck from "../../content/exercises/projektmanagement-magisches-dreieck.json";
import projektmanagementprojektmerkmalephasen from "../../content/exercises/projektmanagement-projektmerkmale-phasen.json";
import projektmanagementsmartziele from "../../content/exercises/projektmanagement-smart-ziele.json";
import wirtschaftbreakevendeckungsbeitrag from "../../content/exercises/wirtschaft-break-even-deckungsbeitrag.json";
import wirtschaftklr from "../../content/exercises/wirtschaft-klr.json";
import wirtschaftkostennutzengewinn from "../../content/exercises/wirtschaft-kosten-nutzen-gewinn.json";
import wirtschaftamortisationroi from "../../content/exercises/wirtschaft-amortisation-roi.json";
import wirtschaftangebotsvergleichnutzwertanalyse from "../../content/exercises/wirtschaft-angebotsvergleich-nutzwertanalyse.json";
import zahlensystemebinaerarithmetik from "../../content/exercises/zahlensysteme-binaerarithmetik.json";
import zahlensystemecodes from "../../content/exercises/zahlensysteme-codes.json";
import zahlensystemefehlererkennung from "../../content/exercises/zahlensysteme-fehlererkennung.json";
import zahlensystemeieee754 from "../../content/exercises/zahlensysteme-ieee754.json";
import zahlensystemeumrechnung from "../../content/exercises/zahlensysteme-umrechnung.json";
import zahlensystemezeichenkodierung from "../../content/exercises/zahlensysteme-zeichenkodierung.json";
import zahlensystemezweierkomplement from "../../content/exercises/zahlensysteme-zweierkomplement.json";

// JSON-Imports liefern string statt Literal-Union (source-Feld) — deshalb
// der explizite Cast. Die Struktur ist über die Generatoren/Tests abgesichert.
const files: ExerciseFile[] = [
  computersystemebiosuefiboot as ExerciseFile,
  computersystemebussetaktbefehlssatz as ExerciseFile,
  computersystemecpupipeliningcaches as ExerciseFile,
  computersystemedateisystemezugriffsrechte as ExerciseFile,
  computersystemeeinausgabegeraete as ExerciseFile,
  computersystemekernelprozessethreads as ExerciseFile,
  computersystemeleistungsbewertung as ExerciseFile,
  computersystememultitaskingscheduling as ExerciseFile,
  computersystemeosaufgaben as ExerciseFile,
  computersystemeosvergleich as ExerciseFile,
  computersystemeschnittstellendatenuebertragung as ExerciseFile,
  computersystemeshellskripte as ExerciseFile,
  computersystemespeicherhierarchieram as ExerciseFile,
  computersystemespeichermedienraid as ExerciseFile,
  computersystemespeicherverwaltungpaging as ExerciseFile,
  computersystemevirtualisierungcloud as ExerciseFile,
  computersystemevonneumanncpu as ExerciseFile,
  diagrammelastenheftpflichtenheft as ExerciseFile,
  diagrammenetzplankritischerpfad as ExerciseFile,
  itsicherheitauthentifizierungpasswoerter as ExerciseFile,
  itsicherheitnetzwerksicherheitfirewalls as ExerciseFile,
  itsicherheitschutzzielebedrohungen as ExerciseFile,
  itsicherheitsocialengineering as ExerciseFile,
  itsicherheitverschluesselungpki as ExerciseFile,
  itsicherheitwebsecurityowasp as ExerciseFile,
  netzwerktechnikdnsdhcp as ExerciseFile,
  netzwerktechnikipv4adressierung as ExerciseFile,
  netzwerktechnikipv6 as ExerciseFile,
  netzwerktechniknetzwerkhardware as ExerciseFile,
  netzwerktechnikosimodell as ExerciseFile,
  netzwerktechnikprotokolleueberblick as ExerciseFile,
  netzwerktechnikrouting as ExerciseFile,
  netzwerktechniksubnetting as ExerciseFile,
  netzwerktechniktcpipprotokolle as ExerciseFile,
  netzwerktechnikverkabelung as ExerciseFile,
  netzwerktechnikvlansegmentierung as ExerciseFile,
  netzwerktechnikwlan as ExerciseFile,
  projektmanagementagilescrum as ExerciseFile,
  projektmanagementklassischwasserfall as ExerciseFile,
  projektmanagementmagischesdreieck as ExerciseFile,
  projektmanagementprojektmerkmalephasen as ExerciseFile,
  projektmanagementsmartziele as ExerciseFile,
  wirtschaftbreakevendeckungsbeitrag as ExerciseFile,
  wirtschaftklr as ExerciseFile,
  wirtschaftkostennutzengewinn as ExerciseFile,
  wirtschaftamortisationroi as ExerciseFile,
  wirtschaftangebotsvergleichnutzwertanalyse as ExerciseFile,
  zahlensystemebinaerarithmetik as ExerciseFile,
  zahlensystemecodes as ExerciseFile,
  zahlensystemefehlererkennung as ExerciseFile,
  zahlensystemeieee754 as ExerciseFile,
  zahlensystemeumrechnung as ExerciseFile,
  zahlensystemezeichenkodierung as ExerciseFile,
  zahlensystemezweierkomplement as ExerciseFile,
];

const bySlug: Map<string, ExerciseFile> = new Map(files.map((f) => [f.topicSlug, f]));

/** Alle registrierten Übungsdateien. */
export function getExerciseFiles(): ExerciseFile[] {
  return files;
}

/** Übungsdatei zu einem Themen-Slug — undefined, wenn (noch) keine existiert. */
export function getExerciseFile(topicSlug: string): ExerciseFile | undefined {
  return bySlug.get(topicSlug);
}

/** Aufgaben zu einem Themen-Slug — leeres Array, wenn keine Datei existiert. */
export function getExercisesForTopic(topicSlug: string): Exercise[] {
  return bySlug.get(topicSlug)?.exercises ?? [];
}
