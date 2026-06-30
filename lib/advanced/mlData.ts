import { Module } from "../types";

export const advMLModule: Module = {
  id: "adv-ml", slug: "adv-ml",
  title: "Maschinelles Lernen",
  description: "Mustererkennung, Perzeptron, Gradient Descent, SVM, Clustering, MLP & Evaluierung — mit Probeklausur.",
  icon: "📈", color: "#EC4899", progress: 0, category: "advanced",
  lessons: [
    {
      id: "ml-mustererkennung", title: "Mustererkennung & Klassifikation", duration: "35 min", type: "text",
      content: `## Mustererkennung & Klassifikation

### Grundbegriffe

**Mustererkennung (Pattern Recognition):** Zuordnung von Signaturen physikalischer Größen zu einer oder mehreren vordefinierten Kategorien (Klassen) → *„Was ist es?"*

| Begriff | Definition |
|---------|-----------|
| **Muster (Pattern)** | Objekte mit beschreibenden Informationssignaturen (Vektoren, Matrizen) |
| **Klasse (Class)** | Zusammenfassung verschiedener Objekte unter gemeinsamen Eigenschaften |
| **Feature (Merkmal)** | Aus sensorischen Informationen erzeugt; Basis der Mustererkennung |
| **Feature Space** | P-dimensionaler Raum $M$, der durch $P$ Merkmale definiert ist |
| **Cluster** | Klasse in engem Bereich des Merkmalsraums (geringer Intra-Klassenabstand) |

### Feature Space & Cluster

- Eine Klasse $C$ sollte durch alle Merkmalsvektoren in einem **engen Bereich** repräsentiert werden
- Großer **Inter-Klassenabstand** zwischen Clustern → gute Trennbarkeit
- Überschneiden sich Cluster → Merkmale nicht optimal gewählt (*Real-World-Situation!*)

### Arten der Klassenzuweisung

| Art | Methode | Beschreibung |
|-----|---------|-------------|
| **Semantische Klassen** | Supervised | Inhaltlich ähnliche Objekte; Zuordnung durch Experten |
| **Natürliche Klassen** | Unsupervised | Formal äquivalent basierend auf Distanzen zwischen Objekten |

### Unsicherheit (Uncertainty)

| Typ | Aleatoric | Epistemic |
|-----|-----------|-----------|
| Name | Stochastische Unsicherheit | Systematische Unsicherheit |
| Reduzierbar? | **Nein** | **Ja** (durch Expertenwissen / Fusion) |
| Daten | Zufällig, stochastisch | Spärlich, selten, inkonsistent |
| Modell | Wahrscheinlichkeitstheorie | Beweis- & Fuzzy-Theorien |
| Beispiel | Messrauschen | Fehlende Kalibrierung |

> **Ockhams Rasiermesser:** Von mehreren hinreichenden Erklärungen ist die **einfachste** vorzuziehen (wenigste Variablen & Hypothesen).

### Daten → Informationen → Wissen

1. **Datenerfassung:** Sensoren (optisch, Druck, Distanz, Winkel, Position)
2. **Probleme:** Random Errors (Noise), Systematic Errors (Alignment)
3. **Garbage in → Garbage out!** Datenvorbereitung ist essenziell`,
    },
    {
      id: "ml-perzeptron", title: "Lineare Maschinen & Perzeptron", duration: "40 min", type: "text",
      content: `## Lineare Maschinen & Perzeptron

### Diskriminante

Eine **Diskriminante** $g(m)$ ist eine Entscheidungsgrenze, die zwei Klassen linear trennt (Hyperebene).

**Linearer Lerner:** Lernt die Clusterzentren von Class 1 und Class 2, berechnet Durchschnittswerte.

### Perzeptron (Frank Rosenblatt, 1958)

Vereinfachtes künstliches neuronales Netz (ANN), neuro-biologisch inspiriert.

**Diskriminante:**
$$y(m) = \\text{sgn}(g(m)) = \\text{sgn}(w^T m + w_0)$$

- $w_0$ = **Bias** (ermöglicht beliebige lineare Funktionen, meist $x_0 = 1$)
- Summe $z$ wird einer Aktivierungsfunktion übergeben → Neuron feuert oder nicht

### Lernalgorithmus

1. Datenpunkte einzeln betrachten
2. Klassifizieren (Vorhersage)
3. Mit Label vergleichen
4. Gewichte anpassen (Update Rule)

**Update Rule (vereinheitlicht):**
$$w_{\\text{neu}} = w_{\\text{alt}} + \\eta \\cdot (y_i - \\hat{y}_i) \\cdot x_i$$

- $\\eta$ = Lernrate (Geschwindigkeit des Lernvorgangs)
- Korrekte Vorhersage → keine Anpassung
- Inkorrekte → Gewichte in richtige Richtung „schubsen"
- Alle Datenpunkte einmal gesehen = **1 Epoche**

### Novikoff's Theorem (1962)

> Wenn die Daten **linear trennbar** sind, findet der Perzeptron-Algorithmus eine geeignete Diskriminante. Wenn nicht, **konvergiert er nie**.

### XOR-Problem (Minsky & Papert)

- Perzeptron kann **nicht-lineare Probleme nicht lösen** (z.B. XOR)
- XOR lässt sich durch Verknüpfung mehrerer Neuronen lösen → **MLP**

### VC-Dimension

| Konzept | Beschreibung |
|---------|-------------|
| **VCdim** | Maximale Anzahl Punkte, die korrekt klassifiziert werden können |
| **Shattering** | Alle $2^n$ Label-Möglichkeiten durch Funktionen darstellbar |
| **Lineare Kl. in $\\mathbb{R}^d$** | VCdim $h = d + 1$ |
| **Lineare Kl. in $\\mathbb{R}^2$** | VCdim $h = 3$ (nicht 4 → XOR!) |

### Dual Representation

- Nur so viele Parameter $\\alpha_i$ wie Trainingsmuster
- Dimensionalität von $m$ spielt keine Rolle mehr`,
    },
    {
      id: "ml-gradient-descent", title: "Gradient Descent & Backpropagation", duration: "40 min", type: "text",
      content: `## Gradient Descent & Backpropagation

### Verlustfunktion (Loss Function)

Quadratischer Fehler für ein einzelnes Sample:
$$L = (y - \\hat{y})^2$$

Mittlerer Fehler über $n$ Trainingspunkte:
$$J(w) = \\frac{1}{n} \\sum_{i=1}^{n} L(y_i, \\hat{y}_i)$$

### Gradient Descent

Optimierungsalgorithmus zum Finden von **Minima** einer differenzierbaren Funktion.

**Aktualisierungsregel:**
$$w_j := w_j - \\eta \\cdot \\frac{\\partial J}{\\partial w_j}$$

> Bewegen uns auf der Verlustfunktion **abwärts** Richtung Senke.

| Typ | Update pro Schritt | Eigenschaften |
|-----|-------------------|---------------|
| **Batch GD** | Alle $m$ Samples | Stabil, langsam, viel Speicher |
| **SGD** | 1 Sample | Schnell, rauschig, weniger Speicher |
| **Mini-Batch** | $k$ Samples | Bester Kompromiss |

### Backpropagation

Beschreibt, wie $\\frac{\\partial L}{\\partial w_i}$ berechnet wird — der **Einfluss jedes Gewichts** auf die Verlustfunktion.

**Kettenregel (Chain Rule):**

Kostenfunktion $L$ ist Verschachtelung von drei Funktionen:

$$L = L(\\sigma(z(w))) \\quad \\Rightarrow \\quad \\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial \\sigma} \\cdot \\frac{\\partial \\sigma}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w}$$

1. **Vorwärts:** Eingabe durch Netz → Output berechnen
2. **Rückwärts:** Fehler von Output zurück zu Gewichten propagieren
3. **Update:** Gewichte anpassen

### Voraussetzungen

- Verlust- und Aktivierungsfunktion müssen **differenzierbar** sein
- Deutlicher Gradient bevorzugt (Vanishing Gradient Problem!)

### Maximum Margin & Cross-Validation

| Konzept | Beschreibung |
|---------|-------------|
| **Cross-Validation** | Daten in Trainings-/Testset splitten; Generalisierung schätzen |
| **Leave-One-Out** | Extremfall: 1 Sample als Test, Rest als Training |
| **Empirical Risk** | Mittlerer Fehler auf Trainingsdaten |
| **True Risk** | Erwarteter Fehler auf neuen Daten (unbekannte Verteilung $p$) |
| **Structural Risk Min.** | VCdim kontrollieren, um True Risk zu minimieren |`,
    },
    {
      id: "ml-svm", title: "Support Vector Machines", duration: "45 min", type: "text",
      content: `## Support Vector Machines (SVM)

### Grundidee

SVM findet die Diskriminante, die am besten **generalisiert**, indem sie die **Margin $\\gamma$ maximiert**.

> Maximierung der Margin reduziert die VCdim und minimiert das Risiko.

### Linearer Fall (trennbare Daten)

**Optimierungsproblem:**

$$\\min \\frac{1}{2} ||w||^2 \\quad \\text{s.t.} \\quad y_i(w^T x_i + w_0) \\geq 1 \\; \\forall i$$

- **Stützvektoren (Support Vectors):** Punkte **auf** der Margin
- Diskriminante ist Linearkombination der Support Vectors → **sparsam**

### KKT-Bedingungen (Karush-Kuhn-Tucker)

$$\\alpha_i \\geq 0, \\quad y_i(w^T x_i + w_0) - 1 \\geq 0, \\quad \\alpha_i [y_i(w^T x_i + w_0) - 1] = 0$$

- $\\alpha_i > 0$ → Punkt ist **Support Vector**
- Viele $\\alpha_i = 0$ → Sparsamkeit: Klassifikator basiert auf wenigen Datenpunkten
- Quadratisches Optimierungsproblem → **konvex** → einzigartiges Minimum

### Soft Margin (nicht-trennbare Daten)

Slack-Variablen $\\xi_i$ erlauben Margin-Verletzungen:

$$\\min \\frac{1}{2} ||w||^2 + C \\sum_{i=1}^{n} \\xi_i$$

- $C$ = Regularisierungsparameter (Trade-off: Margin-Breite vs. Fehler)
- Großes $C$ → weniger Fehler, engere Margin
- Kleines $C$ → mehr Fehler, breitere Margin

### Kernel Trick

Nicht-lineare Transformation in höher-dimensionalen Raum $H$:

$$K(x, z) = \\phi(x)^T \\phi(z)$$

> Jedes Skalarprodukt durch Kernel-Funktion ersetzen → **keine explizite Berechnung** in $H$!

| Kernel | Formel | Eigenschaften |
|--------|--------|---------------|
| **Linear** | $K(x,z) = x^T z$ | Für linear trennbare Daten |
| **Polynomial** | $K(x,z) = (x^T z + 1)^d$ | Grad $d$; VCdim $h = \\binom{D+d}{d}$ |
| **RBF (Gauß)** | $K(x,z) = e^{-\\gamma \\|\|x-z\\|\|^2}$ | $D \\to \\infty$; sehr flexibel |

**Mercer's Condition:** Kernel-Matrix muss positiv semi-definit sein.

### Dual-Darstellung (Wolfe's Dual)

- Beide Formulierungen (primal, dual) = quadratische Programmierung
- Einzigartige Lösungen, effizient berechnbar
- Dual: nur Skalarprodukte → Kernel Trick anwendbar`,
    },
    {
      id: "ml-clustering", title: "Clustering", duration: "40 min", type: "text",
      content: `## Clustering

### Grundlagen

**Ziel:** Datenstruktursegmentierung ohne vorheriges Wissen über Kandidaten.

- Elemente im selben Cluster → **möglichst ähnlich**
- Elemente in verschiedenen Clustern → **möglichst unterschiedlich**

### Distanzmaße

| Maß | Formel | Eigenschaft |
|-----|--------|------------|
| **Euklidisch** | $d = \\sqrt{\\sum (x_i - y_i)^2}$ | Standard; Minkowski mit $n=2$ |
| **City-Block** | $d = \\sum \\|x_i - y_i\\|$ | Minkowski mit $n=1$ |
| **Chebyshev** | $d = \\max \\|x_i - y_i\\|$ | Minkowski mit $n \\to \\infty$ |
| **Standardized Eukl.** | $d = \\sqrt{\\sum \\frac{(x_i-y_i)^2}{S_i^2}}$ | Berücksichtigt Standardabweichung |

### K-Means Clustering

**Partitionierungsmethode:** Anzahl $k$ muss bekannt sein.

1. Initialisiere $k$ Clusterzentren (zufällig)
2. Ordne jeden Punkt dem **nächstgelegenen Zentrum** zu
3. Aktualisiere Zentren = Mittelwerte der Cluster-Mitglieder
4. Wiederhole bis Konvergenz

| Vorteile | Nachteile |
|----------|-----------|
| Geringe Zeitkomplexität $O(nkt)$ | Nicht für nicht-konvexe Daten |
| Hohe Recheneffizienz | Empfindlich ggü. Ausreißern |
| | Kein globales Optimum garantiert |
| | $k$ muss vorgegeben werden |

### Hierarchisches Clustering (Single-Link)

**Agglomerativ (Bottom-Up):**

1. Jeder Datenpunkt = eigenes Cluster
2. Nächste Cluster zusammenführen
3. Wiederhole bis ein Cluster übrig

**Ergebnis:** Dendrogramm → bei gewünschter Ähnlichkeitsebene schneiden.

- **Single-Link:** Kürzester Abstand zwischen Objekten zweier Cluster
- Zeitkomplexität: BIRCH $O(n)$, Chameleon $O(n^2)$
- Geeignet für Datensätze **beliebiger Form**

### DBSCAN

**Density-Based Spatial Clustering of Applications with Noise**

Annahme: Daten in hoher Dichte gehören zum selben Cluster.

| Parameter | Beschreibung |
|-----------|-------------|
| **eps** ($\\varepsilon$) | Radius für Nachbarschaft |
| **minPts** | Mindestanzahl Punkte für dichten Bereich |

| Vorteile | Nachteile |
|----------|-----------|
| Beliebige Clusterformen | Parameter empirisch bestimmt |
| Erkennt Ausreißer (Noise) | Schlecht bei ungleichmäßiger Dichte |
| Effizient $O(n \\log n)$ | Großer Speicher bei großen Daten |

### Clustering-Evaluation

**Intern** (ohne Labels):

$$DB = \\frac{1}{k} \\sum_{i=1}^{k} \\max_{j \\neq i} \\frac{\\sigma_i + \\sigma_j}{d(c_i, c_j)}$$

Davies-Bouldin → **kleinster Wert** = beste Clusterung.

**Extern** (mit Labels):

| Metrik | Formel | Beschreibung |
|--------|--------|-------------|
| **Rand** | $(TP + TN) / \\binom{n}{2}$ | Übereinstimmung mit Ground Truth |
| **Jaccard** | $TP / (TP + FP + FN)$ | Ähnlichkeitsmaß |

### Cluster-Anzahl $k$ bestimmen

**Elbow-Methode:** Intra-Cluster-Scatter $W_k$ gegen $k$ plotten; Knick = optimales $k$.`,
    },
    {
      id: "ml-mlp", title: "Neuronale Netze / MLP", duration: "40 min", type: "text",
      content: `## Neuronale Netze / MLP

### Multi-Layer Perceptron (MLP)

Entgegenwirkt den Nachteilen des einfachen Perzeptrons (XOR-Problem).

### Architektur

| Schicht | Beschreibung | Neuronenanzahl |
|---------|-------------|----------------|
| **Input Layer** | Eingabeschicht | = Anzahl Features (z.B. 784 für 28×28 Bilder) |
| **Hidden Layer(s)** | Verdeckte Schicht(en) | Abhängig von Problemkomplexität |
| **Output Layer** | Ausgabeschicht | Abhängig vom Problem (Klassifikation/Regression) |

### Anzahl Hidden Layers

| Problem | Empfehlung |
|---------|-----------|
| Lineares Problem | Kein Hidden Layer |
| Stetige Funktionen approximieren | 1 Hidden Layer |
| Bildverarbeitung / Sprache | Mehrere Layer (Deep Learning) |

### Aktivierungsfunktionen

| Funktion | Formel | Eigenschaften |
|----------|--------|---------------|
| **Sigmoid** | $\\sigma(x) = \\frac{1}{1+e^{-x}}$ | Ausgabe $(0,1)$; Vanishing Gradient |
| **Tanh** | $\\tanh(x)$ | Ausgabe $(-1,1)$; zentriert |
| **ReLU** | $\\max(0, x)$ | Standard; kein Vanishing Gradient; effizient |
| **Softmax** | $\\frac{e^{x_i}}{\\sum e^{x_j}}$ | Output-Schicht; Wahrscheinlichkeiten |

### Training eines MLP

1. **Forward Pass:** Eingabe durch alle Schichten → Output
2. **Loss berechnen:** Vergleich Output mit Label
3. **Backpropagation:** Fehler rückwärts propagieren
4. **Gewichte aktualisieren:** Gradient Descent

### Wichtige Konzepte

- **Universal Approximation Theorem:** 1 Hidden Layer mit genug Neuronen kann jede stetige Funktion approximieren
- **Vanishing Gradient:** Sigmoid/Tanh in tiefen Netzen → Gradienten werden sehr klein → langsame Anpassung
- **ReLU** löst dieses Problem teilweise (Gradient = 1 für $x > 0$)
- **Dropout:** Zufälliges Deaktivieren von Neuronen während des Trainings → Regularisierung`,
    },
    {
      id: "ml-evaluierung", title: "Modell-Evaluierung", duration: "30 min", type: "text",
      content: `## Evaluierung

### Konfusionsmatrix

| | Vorh. Positiv | Vorh. Negativ |
|---|-------------|-------------|
| **Tats. Positiv** | TP | FN |
| **Tats. Negativ** | FP | TN |

### Metriken

| Metrik | Formel | Bedeutung |
|--------|--------|-----------|
| **Accuracy** | $\\frac{TP+TN}{\\text{Total}}$ | Anteil richtiger Vorhersagen |
| **Precision** | $\\frac{TP}{TP+FP}$ | Wie viele Positive sind wirklich positiv? |
| **Recall** | $\\frac{TP}{TP+FN}$ | Wie viele Positive wurden gefunden? |
| **F1-Score** | $2 \\cdot \\frac{P \\cdot R}{P + R}$ | Harmonisches Mittel aus Precision & Recall |
| **Specificity** | $\\frac{TN}{TN+FP}$ | Wie viele Negative korrekt erkannt? |

> **Trade-off:** Precision ↔ Recall. F1 balanciert beide.

### ROC & AUC

- **ROC-Kurve:** TPR vs. FPR für verschiedene Schwellwerte
- **AUC** (Area Under Curve): 1.0 = perfekt, 0.5 = Zufall

### k-Fold Cross-Validation

1. Daten in $k$ Teile aufteilen
2. $k-1$ Teile zum Trainieren, 1 Teil zum Testen
3. $k$-mal wiederholen, Ergebnisse mitteln

> **10-Fold CV** = Standard!

### Bias-Variance-Tradeoff

$$\\text{Error} = \\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Noise}$$

| | Underfitting | Overfitting |
|---|-------------|------------|
| **Trainingsfehler** | Hoch | Niedrig |
| **Testfehler** | Hoch | Viel höher |
| **Bias** | Hoch | Niedrig |
| **Variance** | Niedrig | Hoch |
| **Lösung** | Komplexeres Modell | Mehr Daten, Regularisierung |`,
    },
    {
      id: "ml-klausur", title: "Probeklausur ML — 15 Fragen", duration: "60 min", type: "quiz", examMode: true,
      content: `## ML Probeklausur — 15 Fragen

### Frage 1
Was minimiert OLS (Ordinary Least Squares)?
A) Absolute Fehler
B) Quadratische Fehler
C) Maximale Abweichung
D) Median

Richtig: **B.** OLS minimiert die Summe der quadratischen Fehler.

### Frage 2
Sigmoid-Funktion?
A) $f(x)=\\max(0,x)$
B) $f(x)=\\tanh(x)$
C) $f(x)=1/(1+e^{-x})$
D) $f(x)=x$

Richtig: **C.** Ausgabe in $(0,1)$.

### Frage 3
Precision misst...
A) Richtige insgesamt
B) $TP / (TP + FP)$
C) $TP / (TP + FN)$
D) $(TP+TN)/\\text{Total}$

Richtig: **B.** Anteil der korrekten Positiv-Vorhersagen.

### Frage 4
Entropie eines reinen Knotens?
A) 1
B) 0
C) 0.5
D) -1

Richtig: **B.** Keine Unsicherheit.

### Frage 5
Random Forest = ...
A) Bagging + Random Subspace
B) Boosting
C) Ein einzelner Baum
D) k-Means

Richtig: **A.** Bagging + zufällige Feature-Auswahl.

### Frage 6
Overfitting bedeutet...
A) Modell ist zu einfach
B) Trainingsdaten auswendig gelernt
C) Zu wenige Daten
D) Alles richtig

Richtig: **B.** Gut auf Training, schlecht auf Test.

### Frage 7
10-Fold Cross-Validation?
A) 10× gleiche Daten verwenden
B) 10 Teile, 9 Train / 1 Test, 10× wiederholen
C) 10 verschiedene Modelle trainieren
D) 10× Lernrate anpassen

Richtig: **B.**

### Frage 8
Kernel-Trick bei SVM?
A) Schnellere Matrix-Multiplikation
B) Abbildung in höhere Dimension ohne explizite Berechnung
C) Feature-Auswahl
D) Normalisierung der Daten

Richtig: **B.** $K(x,z) = \\phi(x)^T \\phi(z)$.

### Frage 9
Gradient Boosting: Bäume werden ... erstellt.
A) Parallel
B) Sequentiell
C) Zufällig
D) Auf allen Daten gleichzeitig

Richtig: **B.** Jeder Baum korrigiert den vorherigen.

### Frage 10
Welcher Algorithmus ist ein Lazy Learner?
A) Entscheidungsbaum
B) SVM
C) kNN
D) Logistische Regression

Richtig: **C.** Keine Trainingsphase; Berechnung erst bei Vorhersage.

### Frage 11
RBF-Kernel?
A) $K(x,z)=x^T z$
B) $K(x,z)=(x^T z+1)^d$
C) $K(x,z)=e^{-\\gamma||x-z||^2}$
D) $K(x,z)=\\tanh(x^T z)$

Richtig: **C.** Gauß-Kernel.

### Frage 12
Novikoff's Theorem besagt...
A) Perzeptron konvergiert immer
B) Bei linear trennbaren Daten konvergiert der Perzeptron-Algorithmus
C) XOR ist lösbar durch Perzeptron
D) SVM ist besser als Perzeptron

Richtig: **B.**

### Frage 13
Aleatorische Unsicherheit ist...
A) Durch mehr Daten reduzierbar
B) Nicht reduzierbar (zufällig, stochastisch)
C) Systematisch
D) Durch Expertenwissen eliminierbar

Richtig: **B.** Intrinsische Schwankungen der Daten.

### Frage 14
Davies-Bouldin-Indikator: Ein kleinerer Wert bedeutet...
A) Schlechtere Clusterung
B) Bessere Clusterung
C) Mehr Cluster
D) Weniger Daten

Richtig: **B.** Minimales Verhältnis von Intra- zu Inter-Cluster-Distanz.

### Frage 15
Was löst das Vanishing Gradient Problem teilweise?
A) Sigmoid-Funktion
B) Tanh-Funktion
C) ReLU-Funktion
D) Softmax-Funktion

Richtig: **C.** ReLU hat Gradient = 1 für $x > 0$.`,
    },
  ],
};
