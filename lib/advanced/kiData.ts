import { Module } from "../types";

export const advKIModule: Module = {
  id: "adv-ki", slug: "adv-ki",
  title: "Künstliche Intelligenz",
  description: "Suchalgorithmen, Logik & Inferenz, CSP & Planung, Neuronale Netze, ML, Wahrscheinlichkeit, NLP, Ethik — mit Probeklausur.",
  icon: "🤖", color: "#8B5CF6", progress: 0, category: "advanced",
  lessons: [
    {
      id: "ki-suche", title: "Suchalgorithmen", duration: "45 min", type: "interactive", interactive: "searchVisualizer",
      content: `## Suchalgorithmen

### Uninformierte Suche (Blind)

| Algorithmus | Struktur | Vollständig | Optimal | Zeit | Speicher |
|-------------|----------|-------------|---------|------|----------|
| BFS | Queue | Ja | Ja (gleiche Kosten) | $O(b^d)$ | $O(b^d)$ |
| DFS | Stack | Nein* | Nein | $O(b^m)$ | $O(bm)$ |
| Depth-Limited | Stack | Nein | Nein | $O(b^l)$ | $O(bl)$ |
| Iterative Deepening | Kombi | Ja | Ja | $O(b^d)$ | $O(bd)$ |
| Uniform Cost | Priority Q | Ja | Ja | $O(b^{C^*/\\epsilon})$ | $O(b^{C^*/\\epsilon})$ |

$b$ = Verzweigungsfaktor, $d$ = Tiefe der Lösung, $m$ = max. Tiefe, $C^*$ = optimale Kosten

*DFS vollständig in endlichen Räumen.

### Informierte Suche (Heuristik)

**A*:**
$f(n) = g(n) + h(n)$
- $g(n)$ = bisherige Kosten vom Start
- $h(n)$ = Heuristik (geschätzte Restkosten)

**Eigenschaften:**
- **Zulässig:** $h(n) \\leq h^*(n)$ (überschätzt nie) → optimal
- **Konsistent:** $h(n) \\leq c(n,n') + h(n')$ → auch optimal
- **Dominanz:** $h_1 \\geq h_2$ → $h_1$ expandiert weniger Knoten

**IDA* (Iterative Deepening A*):**
- A* mit Tiefengrenze auf $f$-Wert
- Speicher: $O(d)$ statt $O(b^d)$
- Mehr Wiederholungen, aber praktisch oft schneller

**SMA* (Simplified Memory-bounded A*):**
- Fester Speicherplatz, verwirft schlechteste Blätter
- Optimal unter Speicherbeschränkung

**Bidirektionale Suche:**
- Suche von Start UND Ziel gleichzeitig
- Treffen in der Mitte
- $O(b^{d/2})$ statt $O(b^d)$ — exponentiell besser!

### Heuristiken

**8-Puzzle:**
- $h_1$ = Anzahl falsch platzierte Steine (zulässig)
- $h_2$ = Manhattan-Distanz (zulässig + konsistent, dominanter)

**Rucksack:** $h$ = restlicher Wert / Kapazität (zulässig).

**TSP:** $h$ = MST-Untergrenze (zulässig).`,
    },
    {
      id: "ki-logik", title: "Logik & Inferenz", duration: "45 min", type: "text",
      content: `## Logik in der KI

### Aussagenlogik

Variablen: $P, Q, R \\in \\{\\text{wahr}, \\text{falsch}\\}$

**Wichtige Äquivalenzen:**

| Name | Formel |
|------|--------|
| De Morgan | $\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q$ |
| De Morgan | $\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q$ |
| Kontraposition | $P \\implies Q \\equiv \\neg Q \\implies \\neg P$ |
| Material | $P \\implies Q \\equiv \\neg P \\lor Q$ |
| Doppel negation | $\\neg\\neg P \\equiv P$ |
| Distributiv | $P \\land (Q \\lor R) \\equiv (P \\land Q) \\lor (P \\land R)$ |

### Prädikatenlogik (FOL)

- **Konstanten:** Max, Lisa
- **Variablen:** $x, y, z$
- **Prädikate:** Student(x), Hört(x, y)
- **Funktionen:** Vater(x), alter(x)
- **Quantoren:** $\\forall x$ (alle), $\\exists x$ (existiert)

**Negation:**
- $\\neg\\forall x\\ P(x) \\equiv \\exists x\\ \\neg P(x)$
- $\\neg\\exists x\\ P(x) \\equiv \\forall x\\ \\neg P(x)$

### Konjunktive Normalform (KNF)

1. Eliminiere $\\implies$: $P \\to Q \\equiv \\neg P \\lor Q$
2. De Morgan anwenden
3. Distributivgesetz: $\\lor$ über $\\land$ verteilen

### Resolution

    (A ∨ B) ∧ (¬B ∨ C) ⊢ (A ∨ C)

**Vorgehen:**
1. KB in KNF umwandeln
2. Annahme negieren
3. Resolventen bilden
4. Leere Klausel = Widerspruch = bewiesen

### Unifikation

Zwei Terme **unifizieren** = Substitution finden die sie gleich macht.

- unify(Student(x), Student(Max)) → {x/Max}
- unify(f(x, a), f(b, y)) → {x/b, y/a}
- unify(f(x), g(x)) → fehlgeschlagen

**Most General Unifier (MGU):** Minimalste Substitution.

### Skolemisierung

Existenzquantoren eliminieren durch Konstanten/Funktionen:

- $\\exists x\\ P(x)$ → $P(c)$ (Skolem-Konstante)
- $\\forall y\\ \\exists x\\ P(x,y)$ → $\\forall y\\ P(f(y), y)$ (Skolem-Funktion)

### Prolog

    % Fakten
    elternteil(hans, max).
    elternteil(lisa, max).

    % Regeln
    geschwister(X, Y) :- elternteil(Z, X), elternteil(Z, Y), X \\= Y.

    % Abfrage
    ?- geschwister(hans, X).
    X = lisa.

Prolog nutzt **Resolution + Backtracking**. Keine Schleifen, sondern Rekursion.`,
    },
    {
      id: "ki-csp", title: "CSP & Planung", duration: "35 min", type: "text",
      content: `## Constraint Satisfaction Problems (CSP)

### Definition

- **Variablen** $X = \\{x_1, \\ldots, x_n\\}$
- **Domänen** $D_i$ für jedes $x_i$
- **Constraints** $C_j$ über Teilmengen von Variablen

**Beispiel: Australien färben**
Variablen: {WA, NT, SA, Q, NSW, V, T}, Domäne: {rot, grün, blau}, Constraints: benachbarte ≠ gleich.

### Backtracking-Suche

    backtrack(assignment):
      if vollständig: return assignment
      var = wähle_unzugewiesene_variable()
      for value in order_domain_values(var):
        if konsistent(value, assignment):
          assignment[var] = value
          result = backtrack(assignment)
          if result ≠ failure: return result
          remove assignment[var]
      return failure

### Heuristiken

**1. MRV (Minimum Remaining Values):**
Wähle Variable mit **kleinster** verbleibender Domäne zuerst. → Erkennt Misserfolge früh.

**2. Degree Heuristic:**
Wähle Variable mit den **meisten Constraints** zu anderen unzugewiesenen Variablen.

**3. Least Constraining Value:**
Ordne Werte so, dass möglichst wenige andere Domänen eingeschränkt werden.

### Konsistenz-Pruning

**Node-Konsistenz:** Domäne erfüllt Unary Constraints.

**Arc-Konsistenz (AC-3):**
Für jeden Wert in $D_x$ muss es einen kompatiblen Wert in $D_y$ geben.
- Entferne inkonsistente Werte
- Laufzeit: $O(e \\cdot d^3)$, $e$ = Kanten, $d$ = Domänengröße

**Forward Checking:** Nach Zuweisung: entferne inkonsistente Werte aus Nachbar-Domänen.

### Planung (STRIPS/PDDL)

**Zustandsraum:**
- **Initialzustand:** Fakten die gelten
- **Zielzustand:** Gewünschte Fakten
- **Operatoren:** Vorbedingungen → Effekte (ADD-Liste, DELETE-Liste)

**Beispiel (Klötzchenwelt):**
    move(A, Tisch, B)
    Vorbedingung: clear(A), clear(B)
    ADD: on(A,B)
    DELETE: on(A,Tisch)

### Suchverfahren in der Planung

**Forward Planning:** Suche im Zustandsraum vorwärts. Problem: riesiger Suchraum.

**Backward Planning:** Suche vom Ziel rückwärts. Problem: viele mögliche Ausgangszustände.

**Partial-Order Planning:**
- Operatoren nicht total geordnet
- Offene Bedingungen schließen
- Ordering-Constraints einfügen
- Flexibler als totale Ordnung

**Graphplan:**
- Baut Planning-Graph auf (alternierend Propositions- und Action-Level)
- Extrahiert dann Plan
- Effizienter als reine Suche`,
    },
    {
      id: "ki-neuronale", title: "Neuronale Netze", duration: "50 min", type: "text",
      content: `## Neuronale Netze

### Perzeptron

$y = f(\\sum w_i x_i + b)$

**Aktivierungsfunktionen:**

| Funktion | Formel | Eigenschaften |
|----------|--------|---------------|
| Sigmoid | $1/(1+e^{-x})$ | (0,1), glatt, Vanishing Gradient |
| tanh | $(e^x-e^{-x})/(e^x+e^{-x})$ | (-1,1), zentriert |
| ReLU | $\\max(0,x)$ | [0,∞), einfach, effizient |
| Leaky ReLU | $\\max(0.01x, x)$ | Verhindert "dying ReLU" |
| Softmax | $e^{x_i}/\\sum e^{x_j}$ | Wahrscheinlichkeiten, Klassifikation |

### Backpropagation

1. **Forward:** Eingabe durchs Netz → Ausgabe
2. **Fehler:** $E = \\frac{1}{2}\\sum (y_k - t_k)^2$
3. **Backward:** Gradient per Kettenregel: $\\frac{\\partial E}{\\partial w_{ij}} = \\frac{\\partial E}{\\partial y_j} \\cdot \\frac{\\partial y_j}{\\partial w_{ij}}$
4. **Update:** $w \\leftarrow w - \\eta \\frac{\\partial E}{\\partial w}$

### Optimierer

| Optimierer | Formel | Eigenschaft |
|------------|--------|-------------|
| SGD | $w_{t+1} = w_t - \\eta \\nabla E$ | Einfach, noisy |
| Momentum | $v_{t+1} = \\beta v_t + \\eta \\nabla E$ | Beschleunigt |
| Adam | Adaptive Lernrate pro Parameter | Standard, robust |

### Netzarchitekturen

**Feedforward (MLP):** Schichten vollständig verbunden. Universal Approximator.

**CNN (Convolutional Neural Network):**
- **Convolutional Layer:** Feature Maps durch Filter (Kernel)
- **Pooling Layer:** Downsampling (Max, Average)
- **Fully Connected:** Klassifikation am Ende
- Anwendung: Bilderkennung, Objekterkennung

**RNN (Recurrent Neural Network):**
- Schleifen: Ausgabe einer Schicht geht zurück als Eingabe
- $h_t = f(W_h h_{t-1} + W_x x_t)$
- Problem: Vanishing/Exploding Gradient über lange Sequenzen

**LSTM (Long Short-Term Memory):**
- Gates: Forget, Input, Output
- Cell State: Information über lange Distanzen
- Verhindert Vanishing Gradient

**Transformer (seit 2017):**
- **Self-Attention:** $\\text{Attention}(Q,K,V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V$
- Parallele Verarbeitung (nicht sequentiell wie RNN)
- Basis von BERT, GPT, T5

### Regularisierung

| Methode | Beschreibung |
|---------|-------------|
| Dropout | Zufällig Neuronen deaktivieren (Training) |
| L1/L2 Regularisierung | Bestrafe große Gewichte |
| Batch Normalization | Normalisiere pro Batch |
| Early Stopping | Stoppe wenn Validation-Loss steigt |
| Data Augmentation | Erweitere Trainingsdaten |`,
    },
    {
      id: "ki-ml-grundlagen", title: "ML Grundlagen", duration: "40 min", type: "text",
      content: `## Maschinelles Lernen — Überblick

### 1. Supervised Learning

$(x_i, y_i)$ gegeben. Finde $f: X \\to Y$.

**Klassifikation:** Diskrete Ausgabe (Spam/KeinSpam).
- K-Nearest Neighbors (KNN)
- Decision Trees / Random Forest
- SVM (Support Vector Machine)
- Logistische Regression
- Naive Bayes

**Regression:** Kontinuierlich (Preise, Temperaturen).
- Lineare Regression: $y = w_0 + w_1 x$
- Polynomiale Regression
- Ridge / Lasso (mit Regularisierung)

### 2. Unsupervised Learning

Nur $x_i$ (KEINE Labels). Finde Struktur.

**Clustering:**
- **k-Means:** $k$ Cluster, minimize Inertia $\\sum \\|x_i - \\mu_k\\|^2$
- **DBSCAN:** Dichte-basiert, beliebige Formen
- **Hierarchisch:** Dendrogramm

**Dimensionsreduktion:**
- **PCA:** Finde Hauptkomponenten (maximale Varianz)
- **t-SNE:** Nicht-lineare Reduktion für Visualisierung
- **Autoencoder:** Neuronales Netz zum Komprimieren

### Feature Engineering

**Skalierung:**
- Min-Max: $x' = (x - x_{min}) / (x_{max} - x_{min})$
- Standardisierung: $x' = (x - \\mu) / \\sigma$

**Encoding:**
- One-Hot: Kategorien → Vektor (Farbe: [1,0,0], [0,1,0], [0,0,1])
- Label Encoding: Kategorien → Zahlen (rot=0, grün=1, blau=2)

**Feature Selection:**
- Korrelationsanalyse (entferne korrelierte Features)
- Recursive Feature Elimination
- Mutual Information

### 3. Reinforcement Learning

Agent interagiert mit Umwelt, maximiert Belohnung $\\sum \\gamma^t r_t$.

**Q-Learning:**
$Q(s,a) \\leftarrow Q(s,a) + \\alpha[r + \\gamma \\max Q(s',a') - Q(s,a)]$

**Exploration vs. Exploitation:**
- $\\epsilon$-greedy: Mit Wahrscheinlichkeit $\\epsilon$ zufällig, sonst bester Action

### Modellauswahl & Evaluation

| Metrik | Anwendung |
|--------|-----------|
| Accuracy | Ausgewogene Klassen |
| Precision | False Positives teuer (Spam) |
| Recall | False Negatives teuer (Krebs) |
| F1-Score | Harmonic Mean Precision/Recall |
| ROC-AUC | Modellvergleich |
| MSE / RMSE | Regression |

**Cross-Validation:** $k$-folds → robuster als Train/Test Split.

**Overfitting:** Zu gut auf Training, schlecht auf Test. Gegenmaßnahmen: Regularisierung, mehr Daten, Dropout, Early Stopping.`,
    },
    {
      id: "ki-bayes", title: "Wahrscheinlichkeit & Bayes", duration: "35 min", type: "text",
      content: `## Wahrscheinlichkeit & Bayes-Statistik

### Bayes-Theorem

$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$

- **Prior** $P(A)$: Vorwissen
- **Likelihood** $P(B|A)$: Wahrscheinlichkeit der Evidenz
- **Posterior** $P(A|B)$: Aktualisierte Wahrscheinlichkeit

**Beispiel: Krankheitstest**
- Prävalenz: $P(K) = 0.01$
- Sensitivität: $P(+|K) = 0.99$
- Spezifität: $P(-|\\neg K) = 0.95$

$P(K|+) = \\frac{0.99 \\cdot 0.01}{0.99 \\cdot 0.01 + 0.05 \\cdot 0.99} = \\frac{0.0099}{0.0099 + 0.0495} = 0.167$

→ Trotz 99% Sensitivität: nur 16.7% Chance bei positivem Test!

### Naive Bayes Klassifikator

$P(C|x_1, \\ldots, x_n) \\propto P(C) \\prod_{i=1}^n P(x_i|C)$

**Naiv:** Features sind unabhängig (bedingt gegeben Klasse).

**Anwendung:** Spam-Filter, Textklassifikation.
- $P(\\text{Spam}|\\text{Viagra}) = \\frac{P(\\text{Viagra}|\\text{Spam}) \\cdot P(\\text{Spam})}{P(\\text{Viagra})}$

### Wahrscheinlichkeitsverteilungen

| Verteilung | Beschreibung | Parameter |
|-----------|--------------|-----------|
| Bernoulli | Münzwurf | $p$ |
| Binomial | $n$ Münzwürfe | $n, p$ |
| Poisson | seltene Ereignisse | $\\lambda$ |
| Normal (Gauss) | Glockenform | $\\mu, \\sigma^2$ |

**Normalverteilung:** $f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$

### Markov Chain Monte Carlo (MCMC)

Approximation komplexer Verteilungen durch Sampling.

**Metropolis-Hastings:**
1. Starte bei $x_0$
2. Propose $x'$ aus Proposal-Verteilung
3. Akzeptiere mit Wahrscheinlichkeit $\\min(1, \\frac{P(x')}{P(x_t)})$

**Anwendung:** Bayes'sche Inferenz, Posterior-Verteilungen approximieren.

### Maximum Likelihood Estimation (MLE)

Finde Parameter $\\theta$ die Daten am besten erklären:

$\\theta_{MLE} = \\arg\\max_\\theta P(D|\\theta)$

**Beispiel:** Normalverteilung → $\\mu_{MLE} = \\bar{x}$, $\\sigma^2_{MLE} = \\frac{1}{n}\\sum(x_i - \\bar{x})^2$`,
    },
    {
      id: "ki-nlp", title: "Natürliche Sprachverarbeitung (NLP)", duration: "40 min", type: "text",
      content: `## Natürliche Sprachverarbeitung (NLP)

### Text-Repräsentation

**Bag of Words (BoW):** Vektoren mit Worthäufigkeiten.
- "Der Hund bellt" → {Der:1, Hund:1, bellt:1}
- Problem: Keine Reihenfolge, hohe Dimensionalität

**TF-IDF:**
$\\text{tfidf}(t,d) = \\text{tf}(t,d) \\cdot \\log\\frac{N}{\\text{df}(t)}$
- Häufiges Wort → niedriger IDF-Score
- Seltenes, wichtiges Wort → hoher Score

**Word Embeddings:**
- **Word2Vec:** Wörter als dichte Vektoren (300D)
- Semantik: king - man + woman ≈ queen
- **GloVe:** Global Vectors, basiert auf Co-Occurrence
- **FastText:** Subword-Informationen (gut für Morphologie)

### Sprachmodelle

**N-Gramm:** $P(w_n | w_1, \\ldots, w_{n-1}) \\approx P(w_n | w_{n-1}, w_{n-2})$

**Neuronale Sprachmodelle:**
- RNN/LSTM-basiert
- Transformer-basiert (GPT, BERT)

### Transformer-Architektur

**Self-Attention:**
$\\text{Attention}(Q,K,V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$

- **Q**uery, **K**ey, **V**alue — gelernte Projektionen
- Multi-Head Attention: mehrere Attention-Köpfe parallel
- Positional Encoding: Reihenfolge einbetten

**Encoder-Decoder:**
- **Encoder:** Versteht Input (BERT: bidirektional)
- **Decoder:** Generiert Output (GPT: autoregressiv)
- **T5:** Beides (Seq2Seq)

### Anwendungen

| Aufgabe | Beispiel | Modell |
|---------|----------|--------|
| Textklassifikation | Spam, Sentiment | BERT |
| Named Entity Recognition | Person, Ort | BERT + CRF |
| Maschinelle Übersetzung | EN → DE | Transformer |
| Textgenerierung | Artikel schreiben | GPT |
| Question Answering | W-Fragen beantworten | BERT |
| Zusammenfassung | Text kürzen | T5, BART |

### Large Language Models (LLMs)

- **GPT-4:** 1.7T Parameter, generativ
- **BERT:** 340M Parameter, Verständnis
- **LLaMA:** Open-Source von Meta
- **T5:** Text-to-Text, vielseitig

**Prompt Engineering:**
- Zero-Shot: "Klassifiziere: 'Das ist toll' → "
- Few-Shot: Beispiele im Prompt
- Chain-of-Thought: "Schritt für Schritt denken..."

**RLHF:** Reinforcement Learning from Human Feedback — Alignment von LLMs.`,
    },
    {
      id: "ki-ethik", title: "Ethik & Grenzen der KI", duration: "25 min", type: "text",
      content: `## Ethik & Grenzen

### EU AI Act (ab 2024)

**Risikokategorien:**
| Kategorie | Beispiele | Anforderungen |
|-----------|-----------|---------------|
| Unannehmbar | Social Scoring | Verboten |
| Hoch | Gesichtserkennung, Kreditwürdigkeit | Strenge Regulierung |
| Limitiert | Chatbots | Transparenzpflicht |
| Minimal | Spamfilter | Keine besonderen |

### Fairness in KI

**Bias-Quellen:**
- **Datenbias:** Trainingsdaten spiegeln Vorurteile
- **Algorithmusbias:** Optimierung verstärkt Diskriminierung
- **Selection Bias:** Nicht-repräsentative Stichprobe

**Fairness-Metriken:**
| Metrik | Definition |
|--------|-----------|
| Demographic Parity | Gleiche Positivrate über Gruppen |
| Equal Opportunity | Gleiche True Positive Rate |
| Predictive Parity | Gleiche Precision über Gruppen |

> **Problem:** Diese Metriken sind oft **unvereinbar** (Chouldechova, 2017).

### Explainability (Erklärbarkeit)

**Blackbox-Problem:** Tiefe neuronale Netze sind nicht interpretierbar.

**Erklärungsmethoden:**
- **LIME:** Lokale lineare Approximation
- **SHAP:** Shapley-Werte (Spieltheorie)
- **Attention-Visualisierung:** Welche Eingaben sind wichtig?
- **Grad-CAM:** Welche Bildregionen aktivieren das Netz?

### Grenzen der KI

- **Kein echtes Verständnis:** Statistische Muster, kein Common Sense
- **Symbol Grounding Problem:** KI "weiß" nicht was Wörter bedeuten
- **Halluzinationen:** LLMs erzeugen plausible, aber falsche Inhalte
- **Alignment Problem:** KI-Ziele ≠ menschliche Ziele

### Verantwortung

- **Rechenschaftspflicht:** Wer haftet bei KI-Entscheidungen?
- **Transparenz:** Nachvollziehbarkeit von Entscheidungen
- **Sicherheit:** Robustheit gegen Angriffe (Adversarial Examples)
- **Datenschutz:** DSGVO, Anonymisierung`,
    },
    {
      id: "ki-klausur", title: "Probeklausur KI — 15 Fragen", duration: "75 min", type: "quiz", examMode: true,
      content: `## KI Probeklausur — 15 Fragen

### Frage 1
BFS nutzt welche Datenstruktur?
A) Stack
B) Queue
C) Priority Queue
D) Heap

Richtig: **B.** BFS = Queue (FIFO).

### Frage 2
A* optimal wenn Heuristik...
A) möglichst groß
B) zulässig (überschätzt nie)
C) zufällig
D) immer 0

Richtig: **B.**

### Frage 3
Bewertungsfunktion A*?
A) $f(n)=h(n)$
B) $f(n)=g(n)$
C) $f(n)=g(n)+h(n)$
D) $f(n)=g(n) \\cdot h(n)$

Richtig: **C.** Wegkosten + Heuristik.

### Frage 4
Resolutionsregel?
A) $(A \\land B) \\to A$
B) $(A \\lor B) \\land (\\neg B \\lor C) \\to (A \\lor C)$
C) $(A \\to B) \\land B \\to A$
D) $(A \\lor B) \\to B$

Richtig: **B.**

### Frage 5
Vanishing Gradient bei...
A) ReLU
B) Sigmoid
C) Linear
D) Step

Richtig: **B.** Sigmoid sättigt → Gradient ≈ 0.

### Frage 6
CSP = ?
A) Central Signal Processing
B) Constraint Satisfaction Problem
C) Continuous State Processing
D) Cognitive Symbol Programming

Richtig: **B.**

### Frage 7
k-Means = ...
A) Supervised
B) Unsupervised
C) Reinforcement
D) Semi-Supervised

Richtig: **B.** Clustering OHNE Labels.

### Frage 8
Perzeptron-Update?
A) $w \\leftarrow w - \\eta \\nabla E$
B) $w \\leftarrow w + \\eta(y-\\hat{y})x$
C) $w \\leftarrow w + \\eta \\nabla E$
D) $w \\leftarrow w(1-\\eta)$

Richtig: **B.** Gewichte proportional zum Fehler.

### Frage 9
Bayes-Theorem?
A) $P(A|B) = P(B|A)$
B) $P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$
C) $P(A|B) = P(A)P(B)$
D) $P(A|B) = \\frac{P(A)}{P(B)}$

Richtig: **B.**

### Frage 10
Overfitting?
A) Zu gut auf Training, schlecht auf Test
B) Zu einfach
C) Zu viele Testdaten
D) Lernrate zu hoch

Richtig: **A.**

### Frage 11
XOR mit einem Perzeptron?
A) Lernbar
B) NICHT lernbar (nicht linear separierbar)
C) Nur mit Sigmoid
D) Nur mit tanh

Richtig: **B.**

### Frage 12
Transformer verwendet...
A) RNN
B) LSTM
C) Self-Attention
D) CNN

Richtig: **C.** Self-Attention ersetzt Rekursion.

### Frage 13
STRIPS-Operator besteht aus...
A) Nur Vorbedingungen
B) Vorbedingungen, ADD-Liste, DELETE-Liste
C) Nur Effekten
D) Nur Zielzustand

Richtig: **B.**

### Frage 14
Naive Bayes Annahme?
A) Features korreliert
B) Features unabhängig (bedingt)
C) Normalverteilung
D) Lineare Trennung

Richtig: **B.** "Naiv" = bedingte Unabhängigkeit.

### Frage 15
MRV-Heuristik in CSP?
A) Wähle Variable mit größter Domäne
B) Wähle Variable mit kleinster Domäne
C) Zufällig
D) Alphabetisch

Richtig: **B.** Minimum Remaining Values → erkennt Sackgassen früh.`,
    },
  ],
};
