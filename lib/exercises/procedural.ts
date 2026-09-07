// Prozedurale Übungsaufgaben (Quelle B) — reine Funktionen mit seed.
//
// Für Themen, bei denen die Aufgabe rechnerisch ist und die Lösung berechenbar:
// Subnetting, Zahlensysteme, IEEE 754, Fehlererkennung, Codes,
// Wirtschaftlichkeit (Nutzwertanalyse, Amortisation) und Netzplantechnik.
//
// Die Generatoren sind deterministisch (mulberry32-PRNG über den seed) und
// liefern unbegrenzt viele Aufgaben mit garantiert korrekter Lösung — genau
// bei diesen Themen verrechnen sich Sprachmodelle, und hier zählt Übungsmenge
// mehr als Abwechslung im Wortlaut.
//
// KEIN Firestore-Zugriff, KEINE UI. Tests: tests/procedural-*.test.ts rechnen
// die Lösungen mit einer unabhängigen Referenzimplementierung nach.

import type { Exercise } from "./types";

// ─── PRNG ───────────────────────────────────────────────────────────────────

export type Rng = () => number;

/** Deterministischer 32-Bit-PRNG (mulberry32) — gleicher seed, gleiche Folge. */
export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

function pick<T>(rng: Rng, items: T[]): T {
  return items[Math.floor(rng() * items.length)];
}

// ─── Bit-Helfer ─────────────────────────────────────────────────────────────

function toBin8(value: number): string {
  return (value & 0xff).toString(2).padStart(8, "0");
}

function toHex8(value: number): string {
  return value.toString(16).toUpperCase().padStart(8, "0");
}

function popcount(value: number): number {
  let v = value >>> 0;
  let count = 0;
  while (v !== 0) {
    count += v & 1;
    v >>>= 1;
  }
  return count;
}

function grayToBinary(gray: number): number {
  let b = gray;
  for (let shift = 1; shift < 8; shift *= 2) {
    b ^= gray >> shift;
  }
  return b & 0xff;
}

function binaryToGray(bin: number): number {
  return (bin ^ (bin >> 1)) & 0xff;
}

/** Float32-Bits (IEEE 754 single precision) als vorzeichenloser 32-Bit-Wert. */
function float32Bits(value: number): number {
  const buf = new ArrayBuffer(4);
  new DataView(buf).setFloat32(0, value, false);
  return new DataView(buf).getUint32(0, false);
}

function bitsToFloat32(bits: number): number {
  const buf = new ArrayBuffer(4);
  new DataView(buf).setUint32(0, bits >>> 0, false);
  return new DataView(buf).getFloat32(0, false);
}

// ─── Subnetting (netzwerktechnik-subnetting) ────────────────────────────────

function ipToInt(ip: string): number {
  return (
    ip
      .split(".")
      .reduce((acc, part) => ((acc << 8) | (Number(part) & 0xff)) >>> 0, 0) >>> 0
  );
}

function intToIp(value: number): string {
  const v = value >>> 0;
  return [24, 16, 8, 0].map((shift) => (v >>> shift) & 0xff).join(".");
}

export function generateSubnettingExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  // Gemeinsames Netz: IP und Präfix würfeln, Netzadresse daraus.
  const prefix = randInt(rng, 12, 29);
  const hostBits = 32 - prefix;
  const mask = (~0 << hostBits) >>> 0;
  const network = (ipToInt(`${randInt(rng, 1, 223)}.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}.${randInt(rng, 0, 255)}`) & mask) >>> 0;
  const broadcast = (network | ~mask) >>> 0;
  const firstHost = network + 1;
  const lastHost = broadcast - 1;
  const hostCount = 2 ** hostBits - 2;
  const ipNetz = intToIp(network);
  const ipMask = intToIp(mask);
  const ipBroadcast = intToIp(broadcast);
  const ipFirst = intToIp(firstHost);
  const ipLast = intToIp(lastHost);

  exercises.push({
    id: "subnetting-g1",
    type: "numeric",
    difficulty: 1,
    prompt: `Ein Netzwerk nutzt das Subnetz ${ipNetz}/${prefix} (Subnetzmaske ${ipMask}). Wie viele Hosts können maximal adressiert werden?`,
    answer: hostCount,
    unit: "Hosts",
    calculation: `2^${hostBits} - 2`,
    explanation:
      `Host-Bits: 32 − ${prefix} = ${hostBits}. Nutzbare Adressen: 2^${hostBits} − 2 = ${hostCount}` +
      ` (minus Netzadresse ${ipNetz} und Broadcast ${ipBroadcast}).`,
  });

  exercises.push({
    id: "subnetting-g2",
    type: "numeric",
    difficulty: 1,
    prompt: `Wie lautet die Netzwerkadresse des Hosts ${ipFirst} mit Subnetzmaske ${ipMask} (/ ${prefix})?`,
    answer: ipNetz,
    explanation:
      `Netzwerkadresse = IP UND Maske (bitweise AND). Mit /${prefix} werden die letzten ${hostBits} Bit ` +
      `genullt: ${ipFirst} → ${ipNetz}.`,
  });

  exercises.push({
    id: "subnetting-g3",
    type: "numeric",
    difficulty: 1,
    prompt: `Wie lautet die Broadcast-Adresse des Subnetzes ${ipNetz}/${prefix}?`,
    answer: ipBroadcast,
    explanation:
      `Broadcast = alle Host-Bits auf 1: Netzadresse ${ipNetz} mit ${hostBits} gesetzten Host-Bits → ${ipBroadcast}.`,
  });

  // Rückwärtsvariante: nötige Host-Anzahl → Präfix (N+2 bewusst keine 2er-Potenz,
  // damit die ceil(log2)-Formel im calculation-Feld exakt aufgeht).
  let needed = randInt(rng, 30, 3000);
  while (Number.isInteger(Math.log2(needed + 2))) {
    needed += 1;
  }
  let bits = 1;
  while (2 ** bits - 2 < needed) bits += 1;
  const neededPrefix = 32 - bits;
  exercises.push({
    id: "subnetting-g4",
    type: "numeric",
    difficulty: 2,
    prompt: `Eine Abteilung benötigt ein Subnetz für ${needed} Hosts. Welche Präfixlänge (CIDR) ist die längste, die ausreicht?`,
    answer: neededPrefix,
    calculation: `32 - ceil(log2(${needed + 2}))`,
    explanation:
      `Benötigte Adressen inklusive Netz- und Broadcast-Adresse: ${needed} + 2 = ${needed + 2}. ` +
      `Gesucht ist das kleinste h mit 2^h ≥ ${needed + 2}: 2^${bits} = ${2 ** bits}. ` +
      `Präfix = 32 − ${bits} = /${neededPrefix} (ergibt ${2 ** bits - 2} nutzbare Adressen).`,
  });

  // Choice: Welcher Host liegt im Subnetz? 3 Verwechsler aus Nachbarsubnetzen.
  const subnetSize = 2 ** hostBits;
  const correctIp = intToIp(network + randInt(rng, 1, hostCount));
  const offsets = new Set<number>();
  while (offsets.size < 3) {
    const direction = rng() < 0.5 ? -1 : 1;
    const offset = direction * subnetSize * randInt(rng, 1, 3) + (direction > 0 ? -1 : 1) * randInt(rng, 1, 30);
    const candidate = network + offset;
    if (candidate >= 1 && candidate <= 0xfffffffe && (candidate < network || candidate > broadcast)) {
      offsets.add(offset);
    }
  }
  const options = [correctIp, ...[...offsets].map((o) => intToIp(network + o))];
  const correctIndex = 0;
  exercises.push({
    id: "subnetting-g5",
    type: "choice",
    difficulty: 2,
    prompt: `Welche der folgenden Adressen liegt im Subnetz ${ipNetz}/${prefix}?`,
    options,
    correctIndex,
    explanation:
      `Das Subnetz umfasst ${ipNetz} bis ${ipBroadcast} (${hostCount} Hosts). ` +
      `Nur ${correctIp} liegt in diesem Bereich; die anderen Adressen gehören zu benachbarten Subnetzen.`,
  });

  return exercises;
}

// ─── Zahlensysteme: Umrechnung (zahlensysteme-umrechnung) ───────────────────

export function generateUmrechnungExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  const dec = randInt(rng, 1, 255);
  const bin = toBin8(dec);
  exercises.push({
    id: "umrechnung-g1",
    type: "numeric",
    difficulty: 1,
    prompt: `Wandeln Sie die Dezimalzahl ${dec} in eine 8-Bit-Binärzahl um.`,
    answer: bin,
    explanation:
      `Stellenwerte: 128 64 32 16 8 4 2 1. ${dec} = ${bin} (${bin
        .split("")
        .map((bit, i) => (bit === "1" ? String(2 ** (7 - i)) : null))
        .filter((v): v is string => v !== null)
        .join(" + ")}).`,
  });

  const bin2 = toBin8(randInt(rng, 1, 255));
  const dec2 = Number.parseInt(bin2, 2);
  const summands = bin2
    .split("")
    .map((bit, i) => (bit === "1" ? String(2 ** (7 - i)) : null))
    .filter((v): v is string => v !== null);
  exercises.push({
    id: "umrechnung-g2",
    type: "numeric",
    difficulty: 1,
    prompt: `Wandeln Sie die Binärzahl ${bin2} in eine Dezimalzahl um.`,
    answer: dec2,
    calculation: summands.join("+"),
    explanation: `Stellenwerte aufaddieren: ${summands.join(" + ")} = ${dec2}.`,
  });

  const hex = randInt(rng, 16, 255);
  const hexString = hex.toString(16).toUpperCase().padStart(2, "0");
  exercises.push({
    id: "umrechnung-g3",
    type: "numeric",
    difficulty: 1,
    prompt: `Wandeln Sie die Dezimalzahl ${hex} in eine zweistellige Hexadezimalzahl um.`,
    answer: hexString,
    explanation:
      `Division durch 16: ${hex} : 16 = ${Math.floor(hex / 16)} Rest ${hex % 16}` +
      ` → ${Math.floor(hex / 16).toString(16).toUpperCase()} und ${(hex % 16).toString(16).toUpperCase()} → ${hexString}.`,
  });

  const hex2 = pick(rng, ["1A", "2F", "3C", "4B", "5D", "6E", "7F", "8A", "9B", "A1", "B4", "C3", "D2", "E5", "F8", "77", "99", "AB", "CD", "EF"]);
  const hex2Value = Number.parseInt(hex2, 16);
  exercises.push({
    id: "umrechnung-g4",
    type: "numeric",
    difficulty: 2,
    prompt: `Wandeln Sie die Hexadezimalzahl 0x${hex2} in eine Dezimalzahl um.`,
    answer: hex2Value,
    calculation: `${Number.parseInt(hex2[0], 16)}*16+${Number.parseInt(hex2[1], 16)}`,
    explanation:
      `0x${hex2} = ${Number.parseInt(hex2[0], 16)} · 16 + ${Number.parseInt(hex2[1], 16)} = ${hex2Value}.`,
  });

  const octDec = randInt(rng, 8, 511);
  const octString = octDec.toString(8);
  exercises.push({
    id: "umrechnung-g5",
    type: "numeric",
    difficulty: 2,
    prompt: `Wandeln Sie die Dezimalzahl ${octDec} in eine Oktalzahl um.`,
    answer: octString,
    explanation:
      `Wiederholte Division durch 8: ${octDec} : 8 = ${Math.floor(octDec / 8)} Rest ${octDec % 8} ` +
      `→ ${Math.floor(octDec / 8).toString(8)} Rest ${octDec % 8} → ${octString}.`,
  });

  const bin3 = toBin8(randInt(rng, 1, 255));
  const hex3 = Number.parseInt(bin3, 2).toString(16).toUpperCase().padStart(2, "0");
  exercises.push({
    id: "umrechnung-g6",
    type: "numeric",
    difficulty: 2,
    prompt: `Wandeln Sie die Binärzahl ${bin3} in eine Hexadezimalzahl um.`,
    answer: hex3,
    explanation:
      `In 4er-Gruppen (Nibbles) teilen: ${bin3.slice(0, 4)} ${bin3.slice(4)} → ` +
      `${Number.parseInt(bin3.slice(0, 4), 2).toString(16).toUpperCase()} und ${Number.parseInt(bin3.slice(4), 2).toString(16).toUpperCase()} → 0x${hex3}.`,
  });

  return exercises;
}

// ─── Binärarithmetik (zahlensysteme-binaerarithmetik) ───────────────────────

export function generateBinaerArithmetikExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  const a = randInt(rng, 20, 127);
  const b = randInt(rng, 10, 127);
  const sum = a + b;
  exercises.push({
    id: "binaerarithmetik-g1",
    type: "numeric",
    difficulty: 1,
    prompt: `Addieren Sie binär (8 Bit): ${toBin8(a)} + ${toBin8(b)}.`,
    answer: toBin8(sum),
    explanation:
      `Bitweise Addition mit Übertrag: ${toBin8(a)} + ${toBin8(b)} = ${toBin8(sum)}. ` +
      `Probe dezimal: ${a} + ${b} = ${sum}.`,
  });

  const c = randInt(rng, 50, 200);
  const d = randInt(rng, 10, c - 1);
  const diff = c - d;
  exercises.push({
    id: "binaerarithmetik-g2",
    type: "numeric",
    difficulty: 1,
    prompt: `Subtrahieren Sie binär (8 Bit): ${toBin8(c)} − ${toBin8(d)}.`,
    answer: toBin8(diff),
    explanation:
      `Subtraktion mit Borgen: ${toBin8(c)} − ${toBin8(d)} = ${toBin8(diff)}. ` +
      `Probe dezimal: ${c} − ${d} = ${diff}.`,
  });

  const e = randInt(rng, 1, 15);
  const f = randInt(rng, 1, 15);
  const product = e * f;
  exercises.push({
    id: "binaerarithmetik-g3",
    type: "numeric",
    difficulty: 2,
    prompt: `Multiplizieren Sie binär (Ergebnis 8 Bit): ${toBin8(e)} × ${toBin8(f)}.`,
    answer: toBin8(product),
    explanation:
      `Multiplikation durch Verschieben und Addieren: ${toBin8(e)} × ${toBin8(f)} = ${toBin8(product)}. ` +
      `Probe dezimal: ${e} × ${f} = ${product}.`,
  });

  const shift = randInt(rng, 1, 15);
  exercises.push({
    id: "binaerarithmetik-g4",
    type: "numeric",
    difficulty: 2,
    prompt: `Verschieben Sie die Binärzahl ${toBin8(shift)} um zwei Stellen nach links (logischer Shift). Geben Sie das 8-Bit-Ergebnis an.`,
    answer: toBin8(shift << 2),
    explanation:
      `Shift um 2 nach links entspricht einer Multiplikation mit 4 und hängt rechts zwei Nullen an: ` +
      `${toBin8(shift)} → ${toBin8(shift << 2)} (${shift} × 4 = ${shift << 2}).`,
  });

  return exercises;
}

// ─── Zweierkomplement (zahlensysteme-zweierkomplement) ──────────────────────

export function generateZweierkomplementExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  const neg = -randInt(rng, 1, 128);
  exercises.push({
    id: "zweierkomplement-g1",
    type: "numeric",
    difficulty: 2,
    prompt: `Stellen Sie die Dezimalzahl ${neg} im Zweierkomplement mit 8 Bit dar.`,
    answer: toBin8(neg),
    explanation:
      `Betrag bilden: ${-neg} = ${toBin8(-neg)}. Invertieren: ${toBin8(~(-neg) & 0xff)}. ` +
      `+1 addieren: ${toBin8(neg)}.`,
  });

  const bits = randInt(rng, 128, 255);
  const signedValue = bits - 256;
  exercises.push({
    id: "zweierkomplement-g2",
    type: "numeric",
    difficulty: 2,
    prompt: `Welche Dezimalzahl stellt die 8-Bit-Zweierkomplement-Zahl ${toBin8(bits)} dar?`,
    answer: signedValue,
    calculation: `${bits}-256`,
    explanation:
      `Führendes Bit ist 1 → negativ. Wert = ${bits} − 256 = ${signedValue}. ` +
      `Kontrolle: invertieren + 1 ergibt ${toBin8(-signedValue)} = ${-signedValue}.`,
  });

  const pos = randInt(rng, 1, 127);
  exercises.push({
    id: "zweierkomplement-g3",
    type: "numeric",
    difficulty: 2,
    prompt: `Bilden Sie das Zweierkomplement von ${pos} (8 Bit), also die Darstellung von ${-pos}.`,
    answer: toBin8(-pos),
    explanation:
      `${pos} = ${toBin8(pos)}. Invertieren: ${toBin8(~pos & 0xff)}. +1: ${toBin8(-pos)}.`,
  });

  const addA = randInt(rng, 1, 60);
  const addB = -randInt(rng, 1, addA);
  const addSum = addA + addB;
  exercises.push({
    id: "zweierkomplement-g4",
    type: "numeric",
    difficulty: 3,
    prompt: `Addieren Sie im Zweierkomplement (8 Bit): ${addA} + (${addB}). Geben Sie das 8-Bit-Ergebnis an.`,
    answer: toBin8(addSum),
    explanation:
      `Darstellungen: ${addA} = ${toBin8(addA)}, ${addB} = ${toBin8(addB)}. ` +
      `Addition: ${toBin8(addA)} + ${toBin8(addB)} = ${toBin8(addSum)} = ${addSum}.`,
  });

  return exercises;
}

// ─── IEEE 754 (zahlensysteme-ieee754) ───────────────────────────────────────

export function generateIeee754Exercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  // Encode: Wert = M · 2^−d mit ganzzahligem M → exakt als float32 darstellbar
  // und als Dezimalzahl mit endlich vielen Nachkommastellen lesbar.
  for (let i = 0; i < 2; i++) {
    const d = randInt(rng, 1, 10);
    const m = randInt(rng, 2 ** d, 10 * 2 ** d - 1);
    const sign = rng() < 0.4 ? -1 : 1;
    const value = (sign * m) / 2 ** d;
    const bits = float32Bits(value);
    const signBit = (bits >>> 31) & 1;
    const exponent = (bits >>> 23) & 0xff;
    const fraction = bits & 0x7fffff;
    const fracBin = fraction.toString(2).padStart(23, "0");
    exercises.push({
      id: `ieee754-g${i + 1}`,
      type: "numeric",
      difficulty: 3,
      prompt: `Stellen Sie die Dezimalzahl ${value} als 32-Bit-Gleitkommazahl nach IEEE 754 (single precision) dar. Geben Sie das Bitmuster als Hexadezimalzahl an (8 Hex-Ziffern).`,
      answer: toHex8(bits),
      explanation:
        `Vorzeichenbit: ${signBit}. Exponent: ${Math.floor(Math.log2(Math.abs(value)))} + 127 (Bias) = ${exponent} (binär ${exponent.toString(2).padStart(8, "0")}). ` +
        `Mantisse (23 Bit, führende 1 implizit): ${fracBin.slice(0, 23)}. ` +
        `Zusammengesetzt: ${signBit} ${exponent.toString(2).padStart(8, "0")} ${fracBin} = 0x${toHex8(bits)}.`,
    });
  }

  // Decode: sauberer Wert → Bitmuster; gefragt ist die Rückrichtung.
  for (let i = 0; i < 2; i++) {
    const d = randInt(rng, 1, 8);
    const m = randInt(rng, 2 ** d, 10 * 2 ** d - 1);
    const sign = rng() < 0.4 ? -1 : 1;
    const value = (sign * m) / 2 ** d;
    const bits = float32Bits(value);
    const exponent = (bits >>> 23) & 0xff;
    const fraction = bits & 0x7fffff;
    exercises.push({
      id: `ieee754-g${i + 3}`,
      type: "numeric",
      difficulty: 3,
      prompt: `Das 32-Bit-Muster 0x${toHex8(bits)} ist eine IEEE-754-Gleitkommazahl (single precision). Welche Dezimalzahl stellt es dar?`,
      answer: value,
      explanation:
        `Vorzeichen: ${(bits >>> 31) & 1}. Exponent: ${exponent} − 127 = ${exponent - 127}. ` +
        `Mantisse: 1.${fraction.toString(2).padStart(23, "0").slice(0, 6)}… ` +
        `Wert = ${value < 0 ? "−" : ""}1,… · 2^${exponent - 127} = ${value}.`,
    });
  }

  return exercises;
}

// ─── Fehlererkennung (zahlensysteme-fehlererkennung) ────────────────────────

export function generateFehlererkennungExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  const dataBits = randInt(rng, 0, 127);
  const ones = popcount(dataBits);
  const evenParity = ones % 2;
  exercises.push({
    id: "fehlererkennung-g1",
    type: "numeric",
    difficulty: 1,
    prompt: `Berechnen Sie das Paritätsbit (gerade Parität) für das 7-Bit-Datenwort ${toBin8(dataBits).slice(1)}.`,
    answer: evenParity,
    calculation: `${toBin8(dataBits).slice(1).split("").map((b) => (b === "1" ? "1" : "0")).join("+")} % 2`,
    explanation:
      `Gerade Parität: Die Gesamtzahl der Einsen (inklusive Paritätsbit) muss gerade sein. ` +
      `Das Datenwort enthält ${ones} Einsen → Paritätsbit = ${evenParity} (Summe ${ones + evenParity}).`,
  });

  const oddData = randInt(rng, 0, 127);
  const oddOnes = popcount(oddData);
  const oddParity = 1 - (oddOnes % 2);
  exercises.push({
    id: "fehlererkennung-g2",
    type: "numeric",
    difficulty: 1,
    prompt: `Berechnen Sie das Paritätsbit (ungerade Parität) für das 7-Bit-Datenwort ${toBin8(oddData).slice(1)}.`,
    answer: oddParity,
    explanation:
      `Ungerade Parität: Die Gesamtzahl der Einsen muss ungerade sein. ` +
      `${oddOnes} Einsen im Datenwort → Paritätsbit = ${oddParity} (Summe ${oddOnes + oddParity}).`,
  });

  const received = randInt(rng, 0, 255);
  const hasError = popcount(received) % 2 !== 0;
  exercises.push({
    id: "fehlererkennung-g3",
    type: "recall",
    difficulty: 2,
    prompt: `Ein Empfänger prüft das Byte ${toBin8(received)} mit gerader Parität (das 8. Bit ist das Paritätsbit). Wird ein Übertragungsfehler erkannt? Begründen Sie.`,
    sampleAnswer:
      hasError
        ? `Ja. Das Byte enthält ${popcount(received)} Einsen — eine ungerade Anzahl. Bei gerader Parität muss die Anzahl der Einsen gerade sein, also liegt ein Fehler vor (1-Bit-Fehler sicher erkennbar).`
        : `Nein. Das Byte enthält ${popcount(received)} Einsen — eine gerade Anzahl, die Prüfung passt. Ein 2-Bit-Fehler bliebe allerdings unentdeckt.`,
    keyPoints: [
      "Einsen zählen",
      hasError ? "ungerade → Fehler erkannt" : "gerade → kein Fehler erkennbar",
      "Paritätsbit erkennt nur ungerade Anzahl Bitfehler",
    ],
  });

  const bytes = [randInt(rng, 0, 255), randInt(rng, 0, 255), randInt(rng, 0, 255), randInt(rng, 0, 255)];
  const checksum = bytes.reduce((a, b) => a + b, 0) % 256;
  exercises.push({
    id: "fehlererkennung-g4",
    type: "numeric",
    difficulty: 2,
    prompt: `Berechnen Sie die Prüfsumme (Modulo 256) für die Datenbytes ${bytes.map((b) => `0x${b.toString(16).toUpperCase().padStart(2, "0")}`).join(", ")}.`,
    answer: checksum,
    calculation: `(${bytes.join("+")}) % 256`,
    explanation:
      `Summe: ${bytes.join(" + ")} = ${bytes.reduce((a, b) => a + b, 0)}. ` +
      `Modulo 256: ${bytes.reduce((a, b) => a + b, 0)} % 256 = ${checksum}.`,
  });

  return exercises;
}

// ─── Codes: Gray & Hamming (zahlensysteme-codes) ────────────────────────────

export function generateCodesExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  const bin = randInt(rng, 1, 255);
  const gray = binaryToGray(bin);
  exercises.push({
    id: "codes-g1",
    type: "numeric",
    difficulty: 2,
    prompt: `Wandeln Sie die Binärzahl ${toBin8(bin)} in einen Gray-Code um (8 Bit).`,
    answer: toBin8(gray),
    explanation:
      `Gray-Code: Jedes Bit = aktuelles Bit XOR vorheriges Bit (b_i XOR b_{i−1}). ` +
      `${toBin8(bin)} → ${toBin8(gray)}.`,
  });

  const gray2 = binaryToGray(randInt(rng, 1, 255));
  const bin2 = grayToBinary(gray2);
  exercises.push({
    id: "codes-g2",
    type: "numeric",
    difficulty: 2,
    prompt: `Wandeln Sie den Gray-Code ${toBin8(gray2)} zurück in eine Binärzahl (8 Bit).`,
    answer: toBin8(bin2),
    explanation:
      `Rückwandlung durch XOR-Kette von links: ${toBin8(gray2)} → ${toBin8(bin2)}.`,
  });

  const wordA = randInt(rng, 0, 255);
  let wordB = randInt(rng, 0, 255);
  while (wordB === wordA) wordB = randInt(rng, 0, 255);
  const distance = popcount(wordA ^ wordB);
  const xorBin = toBin8(wordA ^ wordB);
  exercises.push({
    id: "codes-g3",
    type: "numeric",
    difficulty: 1,
    prompt: `Berechnen Sie den Hamming-Abstand zwischen ${toBin8(wordA)} und ${toBin8(wordB)}.`,
    answer: distance,
    calculation: xorBin.split("").filter((b) => b === "1").length.toString(),
    explanation:
      `XOR bilden: ${toBin8(wordA)} XOR ${toBin8(wordB)} = ${xorBin}. ` +
      `Einsen zählen: ${distance} — so viele Bitfehler könnte der Code mit Abstand d ≥ 1 erkennen.`,
  });

  exercises.push({
    id: "codes-g4",
    type: "choice",
    difficulty: 2,
    prompt: "Warum wird bei Drehgebern der Gray-Code statt der normalen Binärkodierung verwendet?",
    options: [
      "Beim Übergang zwischen benachbarten Positionen ändert sich nur ein Bit — keine Zwischenzustände",
      "Der Gray-Code benötigt halb so viele Leitungen",
      "Der Gray-Code erlaubt die Erkennung von Bitfehlern über Parität",
      "Der Gray-Code ist schneller als jede Binärkodierung",
    ],
    correctIndex: 0,
    explanation:
      "Gray-Code ist einreflexiv: Nachbarwerte unterscheiden sich in genau einem Bit. Damit kann beim Abtasten eines Drehgebers nie ein mehrdeutiger Zwischenzustand entstehen. Die anderen Antworten sind keine Eigenschaften des Gray-Codes.",
  });

  return exercises;
}

// ─── Amortisation & ROI (wirtschaft-amortisation-roi) ───────────────────────

export function generateAmortisationExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  const invest = randInt(rng, 10, 160) * 500;
  const saving = randInt(rng, 2, 40) * 500;
  const years = Math.ceil(invest / saving);

  exercises.push({
    id: "amortisation-g1",
    type: "numeric",
    difficulty: 1,
    prompt: `Ein Unternehmen investiert ${invest} € in neue Software. Die jährliche Einsparung beträgt ${saving} € (Verzinsung wird nicht berücksichtigt). Nach wie vielen Jahren hat sich die Investition amortisiert?`,
    answer: years,
    unit: "Jahre",
    calculation: `ceil(${invest}/${saving})`,
    explanation:
      `Amortisationszeit = Investition ÷ jährliche Einsparung = ${invest} ÷ ${saving} = ${(invest / saving).toFixed(2)} Jahre. ` +
      `Da erst nach einem vollen Jahr abgerechnet wird: ${years} Jahre.`,
  });

  const horizon = randInt(rng, 3, 8);
  const gain = horizon * saving - invest;
  exercises.push({
    id: "amortisation-g2",
    type: "numeric",
    difficulty: 2,
    prompt: `Investition ${invest} €, jährliche Einsparung ${saving} €. Wie hoch ist der kumulierte Gewinn nach ${horizon} Jahren (ohne Verzinsung)?`,
    answer: gain,
    unit: "€",
    calculation: `${horizon}*${saving}-${invest}`,
    explanation:
      `${horizon} Jahre × ${saving} € = ${horizon * saving} € Ersparnis. ` +
      `Abzüglich ${invest} € Investition: ${gain} €${gain < 0 ? " — die Investition ist zu diesem Zeitpunkt noch nicht amortisiert." : "."}`,
  });

  const roi = Math.round(((horizon * saving - invest) / invest) * 1000) / 10;
  exercises.push({
    id: "amortisation-g3",
    type: "numeric",
    difficulty: 2,
    prompt: `Investition ${invest} €, jährliche Einsparung ${saving} €. Berechnen Sie den ROI (Return on Investment) nach ${horizon} Jahren in Prozent (eine Nachkommastelle, ohne Verzinsung).`,
    answer: roi,
    unit: "%",
    calculation: `round(((${horizon}*${saving}-${invest})/${invest}*100)*10)/10`,
    explanation:
      `ROI = (Gesamtersparnis − Investition) ÷ Investition × 100 = ` +
      `((${horizon} × ${saving} − ${invest}) ÷ ${invest}) × 100 = ${roi} %. ` +
      `Negative Werte bedeuten: noch nicht amortisiert.`,
  });

  return exercises;
}

// ─── Nutzwertanalyse (wirtschaft-angebotsvergleich-nutzwertanalyse) ─────────

interface Offer {
  name: string;
  scores: number[];
  total: number;
}

export function generateNutzwertanalyseExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const exercises: Exercise[] = [];

  const criteria = ["Preis", "Lieferzeit", "Service", "Garantie"];
  const weights = criteria.map(() => randInt(rng, 3, 8) * 5);

  let offers: Offer[];
  do {
    offers = ["Angebot A", "Angebot B", "Angebot C"].map((name) => {
      const scores = criteria.map(() => randInt(rng, 1, 5));
      const total = scores.reduce((sum, s, i) => sum + s * weights[i], 0);
      return { name, scores, total };
    });
  } while (new Set(offers.map((o) => o.total)).size < 3);

  const ranking = [...offers].sort((a, b) => b.total - a.total);
  const tableLines = [
    `Gewichte: ${criteria.map((c, i) => `${c} ${weights[i]} %`).join(", ")}`,
    ...offers.map(
      (o) => `${o.name}: ${o.scores.map((s, i) => `${criteria[i]} ${s} (${s * weights[i]})`).join(", ")} → Summe ${o.total}`
    ),
  ];

  exercises.push({
    id: "nutzwertanalyse-g1",
    type: "numeric",
    difficulty: 2,
    prompt:
      `Nutzwertanalyse mit den Kriterien ${criteria.map((c, i) => `${c} (${weights[i]} %)`).join(", ")}.\n` +
      `${ranking[1].name} erzielt die Bewertungen: ${ranking[1].scores.map((s, i) => `${criteria[i]} = ${s}`).join(", ")}. ` +
      `Berechnen Sie die gewichtete Gesamtpunktzahl.`,
    answer: ranking[1].total,
    unit: "Punkte",
    calculation: ranking[1].scores.map((s, i) => `${s}*${weights[i]}`).join("+"),
    explanation:
      `Jede Bewertung mit dem Kriteriengewicht multiplizieren und summieren: ` +
      `${ranking[1].scores.map((s, i) => `${s} × ${weights[i]} = ${s * weights[i]}`).join("; ")} → ${ranking[1].total} Punkte.`,
  });

  exercises.push({
    id: "nutzwertanalyse-g2",
    type: "choice",
    difficulty: 2,
    prompt:
      `Bei einer Nutzwertanalyse erreichen die Angebote: ` +
      `${offers.map((o) => `${o.name} ${o.total} Punkte`).join(", ")} (Kriterien: ${criteria.map((c, i) => `${c} ${weights[i]} %`).join(", ")}). ` +
      `Welches Angebot ist nach der Nutzwertanalyse das beste?`,
    options: offers.map((o) => o.name),
    correctIndex: offers.findIndex((o) => o.name === ranking[0].name),
    explanation:
      `${tableLines.join("\n")}. ${ranking[0].name} hat mit ${ranking[0].total} Punkten die höchste gewichtete Summe. ` +
      `Die Gewichtung ist entscheidend: eine hohe Einzelbewertung in einem schwach gewichteten Kriterium schlägt nicht durch.`,
  });

  exercises.push({
    id: "nutzwertanalyse-g3",
    type: "numeric",
    difficulty: 2,
    prompt:
      `Nutzwertanalyse: ${offers.map((o) => `${o.name} ${o.total} Punkte`).join(", ")}. ` +
      `Um wie viele Punkte liegt das beste Angebot vor dem zweitbesten?`,
    answer: ranking[0].total - ranking[1].total,
    unit: "Punkte",
    calculation: `${ranking[0].total}-${ranking[1].total}`,
    explanation:
      `${ranking[0].name} (${ranking[0].total}) − ${ranking[1].name} (${ranking[1].total}) = ${ranking[0].total - ranking[1].total} Punkte Vorsprung.`,
  });

  exercises.push({
    id: "nutzwertanalyse-g4",
    type: "recall",
    difficulty: 1,
    prompt: "Wann ist eine Nutzwertanalyse einem reinen Preisvergleich überlegen? Nennen Sie den entscheidenden Unterschied.",
    sampleAnswer:
      "Wenn Angebote sich nicht nur im Preis unterscheiden, sondern qualitative Faktoren eine Rolle spielen (Service, Garantie, Lieferzeit). Die Nutzwertanalyse gewichtet solche Kriterien und macht den Vergleich nachvollziehbar und begründbar — der reine Preisvergleich ignoriert sie.",
    keyPoints: [
      "Mehrere Kriterien, nicht nur Preis",
      "Kriterien werden gewichtet",
      "Entscheidung wird nachvollziehbar/begründbar",
      "Subjektive Bewertung bleibt transparent sichtbar",
    ],
  });

  return exercises;
}

// ─── Netzplantechnik (diagramme-netzplan-kritischer-pfad) ───────────────────

interface Activity {
  id: string;
  duration: number;
  predecessors: number[];
  successors: number[];
  es: number;
  ef: number;
  ls: number;
  lf: number;
  buffer: number;
}

export function generateNetzplanExercises(seed: number): Exercise[] {
  const rng = mulberry32(seed);
  const n = randInt(rng, 5, 7);
  const acts = buildNetworkWithDistractors(rng, n);

  const table = acts
    .map(
      (a) =>
        `${a.id}: ${a.duration} Tage (Vorgänger: ${a.predecessors.length === 0 ? "–" : a.predecessors.map((p) => acts[p].id).join(", ")})`
    )
    .join("\n");
  const duration = acts[acts.length - 1].ef;
  // Einen konkreten kritischen Pfad entlang echter Kanten rekonstruieren
  // (nicht nur alle Puffer-0-Knoten sortiert — die wären kein Pfad).
  const criticalPath = buildCriticalPath(acts);

  const detailTable = acts
    .map((a) => `${a.id}: FAZ ${a.es}, FEZ ${a.ef}, SAZ ${a.ls}, SEZ ${a.lf}, Puffer ${a.buffer}`)
    .join("\n");

  const exercises: Exercise[] = [
    {
      id: "netzplan-g1",
      type: "numeric",
      difficulty: 2,
      prompt: `Vorgangsliste eines Projekts:\n${table}\n\nWie lang ist die kürzestmögliche Projektdauer?`,
      answer: duration,
      unit: "Tage",
      explanation:
        `Vorwärtsrechnung (früheste Zeitpunkte) über die Vorgänger:\n${detailTable}\n` +
        `Die Projektdauer ist der früheste Endzeitpunkt des letzten Vorgangs: ${duration} Tage. ` +
        `Kritischer Pfad: ${criticalPath.join(" → ")}.`,
    },
  ];

  const nonCritical = acts.filter((a) => a.buffer > 0);
  const target = nonCritical.length > 0 ? pick(rng, nonCritical) : pick(rng, acts);
  exercises.push({
    id: "netzplan-g2",
    type: "numeric",
    difficulty: 2,
    prompt: `Vorgangsliste eines Projekts:\n${table}\n\nWie groß ist der Gesamtpuffer des Vorgangs ${target.id}?`,
    answer: target.buffer,
    unit: "Tage",
    calculation: `${target.ls}-${target.es}`,
    explanation:
      `${target.id}: FAZ ${target.es}, SAZ ${target.ls} → Gesamtpuffer = SAZ − FAZ = ${target.buffer} Tage. ` +
      (target.buffer === 0
        ? `${target.id} ist kritisch — jede Verzögerung verschiebt das Projektende.`
        : `Der Vorgang darf sich um ${target.buffer} Tage verschieben, ohne das Projektende zu gefährden.`),
  });

  const critical = acts.filter((a) => a.buffer === 0);
  if (nonCritical.length >= 3) {
    const options: string[] = [critical[0].id, ...nonCritical.slice(0, 3).map((a) => a.id)];
    exercises.push({
      id: "netzplan-g3",
      type: "choice",
      difficulty: 2,
      prompt: `Vorgangsliste eines Projekts:\n${table}\n\nWelcher Vorgang liegt auf dem kritischen Pfad (Gesamtpuffer 0)?`,
      options,
      correctIndex: 0,
      explanation:
        `Puffer aller Vorgänge: ${acts.map((a) => `${a.id} = ${a.buffer}`).join(", ")}. ` +
        `Nur Vorgänge mit Puffer 0 sind kritisch: ${critical.map((a) => a.id).join(", ")}.`,
    });
  } else {
    const maxBuffer = Math.max(...acts.map((a) => a.buffer));
    const withMax = acts.filter((a) => a.buffer === maxBuffer);
    exercises.push({
      id: "netzplan-g3",
      type: "numeric",
      difficulty: 2,
      prompt:
        `Vorgangsliste eines Projekts:\n${table}\n\nWie groß ist der größte Gesamtpuffer in diesem Netzplan?`,
      answer: maxBuffer,
      unit: "Tage",
      explanation:
        `Puffer aller Vorgänge: ${acts.map((a) => `${a.id} = ${a.buffer}`).join(", ")}. ` +
        `Größter Puffer: ${maxBuffer} Tage (${withMax.map((a) => a.id).join(", ")}).`,
    });
  }

  exercises.push({
    id: "netzplan-g4",
    type: "recall",
    difficulty: 3,
    prompt: `Vorgangsliste eines Projekts:\n${table}\n\nErmitteln Sie den kritischen Pfad und erläutern Sie, warum er für die Projektsteuerung wichtig ist.`,
    sampleAnswer:
      `Kritischer Pfad: ${criticalPath.join(" → ")} mit einer Gesamtdauer von ${duration} Tagen. ` +
      `Alle Vorgänge auf diesem Pfad haben Gesamtpuffer 0 — jede Verzögerung verschiebt das Projektende direkt. ` +
      `Deshalb muss die Projektleitung genau diese Vorgänge eng überwachen und Ressourcen dort priorisieren.`,
    keyPoints: [
      `Kritischer Pfad: ${criticalPath.join(" → ")}`,
      "Gesamtpuffer 0 auf allen kritischen Vorgängen",
      "Verzögerung eines kritischen Vorgangs verschiebt das Projektende",
      "Steuerung/Überwachung fokussiert auf den kritischen Pfad",
    ],
  });

  return exercises;
}

/** Netz erzeugen, das mindestens 3 nicht-kritische Vorgänge hat (für MC-Distraktoren). */
function buildNetworkWithDistractors(rng: Rng, n: number): Activity[] {
  for (let attempt = 0; attempt < 100; attempt++) {
    const acts = buildNetwork(rng, n);
    if (acts.filter((a) => a.buffer > 0).length >= 3) return acts;
  }
  return buildNetwork(rng, n);
}

/**
 * Kritischen Pfad als Knotenfolge entlang echter Kanten rekonstruieren:
 * Start beim kritischen Quellknoten, dann immer zum Nachfolger mit
 * es = eigenem ef und Puffer 0 — ergibt einen validen längsten Pfad.
 */
function buildCriticalPath(acts: Activity[]): string[] {
  let current = acts.findIndex((a) => a.predecessors.length === 0 && a.buffer === 0);
  const path: number[] = [];
  const visited = new Set<number>();
  while (current !== -1 && !visited.has(current)) {
    visited.add(current);
    path.push(current);
    const next = acts[current].successors.find(
      (s) => acts[s].es === acts[current].ef && acts[s].buffer === 0
    );
    current = next ?? -1;
  }
  return path.map((i) => acts[i].id);
}

function buildNetwork(rng: Rng, n: number): Activity[] {
  const acts: Activity[] = Array.from({ length: n }, (_, i) => ({
    id: `V${i + 1}`,
    duration: randInt(rng, 1, 9),
    predecessors: [],
    successors: [],
    es: 0,
    ef: 0,
    ls: 0,
    lf: 0,
    buffer: 0,
  }));

  // Zufälliger DAG: Kanten nur in Vorwärtsrichtung (i < j) → azyklisch.
  const edges: boolean[][] = Array.from({ length: n }, () => new Array<boolean>(n).fill(false));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (rng() < 0.35) edges[i][j] = true;
    }
  }
  // Reparatur: Jeder Vorgang (außer V1) braucht mindestens einen Vorgänger,
  // jeder (außer dem letzten) mindestens einen Nachfolger — garantiert
  // zusammenhängenden Graphen mit V1 als Quelle und Vn als Senke.
  for (let j = 1; j < n; j++) {
    if (!edges.some((row) => row[j])) {
      edges[randInt(rng, 0, j - 1)][j] = true;
    }
  }
  for (let i = 0; i < n - 1; i++) {
    if (!edges[i].some(Boolean)) {
      edges[i][randInt(rng, i + 1, n - 1)] = true;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (edges[i][j]) {
        acts[i].successors.push(j);
        acts[j].predecessors.push(i);
      }
    }
  }

  // Vorwärtsrechnung
  for (let i = 0; i < n; i++) {
    const a = acts[i];
    a.es = a.predecessors.length === 0 ? 0 : Math.max(...a.predecessors.map((p) => acts[p].ef));
    a.ef = a.es + a.duration;
  }

  // Rückwärtsrechnung
  const last = acts[n - 1];
  last.lf = last.ef;
  last.ls = last.lf - last.duration;
  for (let i = n - 2; i >= 0; i--) {
    const a = acts[i];
    a.lf = Math.min(...a.successors.map((s) => acts[s].ls));
    a.ls = a.lf - a.duration;
  }
  for (const a of acts) a.buffer = a.ls - a.es;

  return acts;
}

// ─── Generator-Registry ─────────────────────────────────────────────────────

export interface ProceduralGenerator {
  topicSlug: string;
  itemTitle: string;
  /** Themen ohne Modul — Musterlösungen müssen das Thema aus sich erklären. */
  standalone: boolean;
  generate: (seed: number) => Exercise[];
}

export const proceduralGenerators: Record<string, ProceduralGenerator> = {
  "netzwerktechnik-subnetting": {
    topicSlug: "netzwerktechnik-subnetting",
    itemTitle: "Subnetting: CIDR, Subnetzmaske, VLSM",
    standalone: false,
    generate: generateSubnettingExercises,
  },
  "zahlensysteme-umrechnung": {
    topicSlug: "zahlensysteme-umrechnung",
    itemTitle: "Dezimal, binär, hexadezimal: Umrechnen",
    standalone: true,
    generate: generateUmrechnungExercises,
  },
  "zahlensysteme-binaerarithmetik": {
    topicSlug: "zahlensysteme-binaerarithmetik",
    itemTitle: "Rechnen im Binärsystem (Addition, Subtraktion)",
    standalone: true,
    generate: generateBinaerArithmetikExercises,
  },
  "zahlensysteme-zweierkomplement": {
    topicSlug: "zahlensysteme-zweierkomplement",
    itemTitle: "Zweierkomplement und negative Zahlen",
    standalone: true,
    generate: generateZweierkomplementExercises,
  },
  "zahlensysteme-ieee754": {
    topicSlug: "zahlensysteme-ieee754",
    itemTitle: "Gleitkommazahlen nach IEEE 754",
    standalone: true,
    generate: generateIeee754Exercises,
  },
  "zahlensysteme-fehlererkennung": {
    topicSlug: "zahlensysteme-fehlererkennung",
    itemTitle: "Fehlererkennung: Paritätsbit und Prüfsummen",
    standalone: true,
    generate: generateFehlererkennungExercises,
  },
  "zahlensysteme-codes": {
    topicSlug: "zahlensysteme-codes",
    itemTitle: "Codes: BCD, Gray-Code, Hamming-Abstand",
    standalone: true,
    generate: generateCodesExercises,
  },
  "wirtschaft-amortisation-roi": {
    topicSlug: "wirtschaft-amortisation-roi",
    itemTitle: "Amortisationsrechnung und ROI",
    standalone: true,
    generate: generateAmortisationExercises,
  },
  "wirtschaft-angebotsvergleich-nutzwertanalyse": {
    topicSlug: "wirtschaft-angebotsvergleich-nutzwertanalyse",
    itemTitle: "Angebotsvergleich und Nutzwertanalyse",
    standalone: true,
    generate: generateNutzwertanalyseExercises,
  },
  "diagramme-netzplan-kritischer-pfad": {
    topicSlug: "diagramme-netzplan-kritischer-pfad",
    itemTitle: "Netzplantechnik und kritischer Pfad",
    standalone: false,
    generate: generateNetzplanExercises,
  },
};
