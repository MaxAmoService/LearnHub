import { Module } from "../types";

export const advADModule: Module = {
  id: "adv-ad", slug: "adv-ad",
  title: "Algorithmen & Datenstrukturen",
  description: "Laufzeitanalyse, Sortierverfahren, Listen, Bäume, Graphen, Hashing, DP, Greedy — mit Probeklausur.",
  icon: "🔀", color: "#F59E0B", progress: 0, category: "advanced",
  lessons: [
    {
      id: "ad-laufzeit", title: "Laufzeitanalyse & O-Notation", duration: "45 min", type: "text",
      content: `## Laufzeitanalyse & O-Notation

### Asymptotische Notationen

| Notation | Bedeutung | Beispiel |
|----------|-----------|----------|
| $O(f(n))$ | Obergrenze (Worst-Case) | Quicksort: $O(n^2)$ |
| $\\Omega(f(n))$ | Untergrenze (Best-Case) | Quicksort: $\\Omega(n \\log n)$ |
| $\\Theta(f(n))$ | Exakte Schranke | Mergesort: $\\Theta(n \\log n)$ |
| $o(f(n))$ | Strikte Obergrenze | $n = o(n^2)$ |
| $\\omega(f(n))$ | Strikte Untergrenze | $n^2 = \\omega(n)$ |

### Wichtige Wachstumsklassen

| Klasse | Name | Beispiel | $n=10^6$ |
|--------|------|----------|----------|
| $O(1)$ | Konstant | Hash-Lookup | 1 |
| $O(\\log n)$ | Logarithmisch | Binäre Suche | 20 |
| $O(n)$ | Linear | Lineare Suche | $10^6$ |
| $O(n \\log n)$ | Quasilinear | Mergesort | $2 \\cdot 10^7$ |
| $O(n^2)$ | Quadratisch | Bubblesort | $10^{12}$ |
| $O(n^3)$ | Kubisch | Standard-Matrix | $10^{18}$ |
| $O(2^n)$ | Exponentiell | TSP Brute-Force | $\\infty$ |
| $O(n!)$ | Fakultät | Permutationen | $\\infty$ |

### Formale Definition

$O(f(n)) = \\{g(n) \\mid \\exists c > 0, n_0: \\forall n \\geq n_0: g(n) \\leq c \\cdot f(n)\\}$

$\\Omega(f(n)) = \\{g(n) \\mid \\exists c > 0, n_0: \\forall n \\geq n_0: g(n) \\geq c \\cdot f(n)\\}$

$\\Theta(f(n)) = O(f(n)) \\cap \\Omega(f(n))$

### Rechenregeln

1. **Konstanten fallen weg:** $O(3n^2 + 100n) = O(n^2)$
2. **Summe:** $O(f + g) = O(\\max(f, g))$
3. **Produkt:** $O(f \\cdot g) = O(f) \\cdot O(g)$
4. **Polynom:** $O(n^k)$ für konstantes $k$
5. **Logarithmus-Basis:** $O(\\log_2 n) = O(\\ln n) = O(\\log n)$

### Rekurrenzen lösen

**Master-Theorem:** $T(n) = aT(n/b) + O(n^d)$

| Fall | Bedingung | Lösung |
|------|-----------|--------|
| 1 | $d < \\log_b a$ | $O(n^{\\log_b a})$ |
| 2 | $d = \\log_b a$ | $O(n^d \\log n)$ |
| 3 | $d > \\log_b a$ | $O(n^d)$ |

**Beispiele:**
- Mergesort: $T(n) = 2T(n/2) + O(n)$ → $a=2, b=2, d=1$ → Fall 2 → $O(n \\log n)$
- Binäre Suche: $T(n) = T(n/2) + O(1)$ → $a=1, b=2, d=0$ → Fall 2 → $O(\\log n)$
- Strassen: $T(n) = 7T(n/2) + O(n^2)$ → $a=7, b=2, d=2$ → Fall 1 → $O(n^{2.81})$

### Amortisierte Analyse

Durchschnittliche Kosten pro Operation über eine Sequenz von $n$ Operationen.

**Methode 1: Aggregat** — Gesamtkosten durch Anzahl Operationen teilen.

**Methode 2: Banker's Method** — Jede Operation zahlt "Credits". Günstige Operationen legen Credits an, teure verbrauchen sie.

**Methode 3: Potentialmethode** — $\\hat{c_i} = c_i + \\Phi(D_i) - \\Phi(D_{i-1})$

**Beispiel: Dynamisches Array**
- Verdoppeln bei Voll: $O(n)$ Kosten
- Aber amortisiert: $O(1)$ pro Einfügeoperation
- Beweis: Nach $n$ Einfügungen max. $2n$ Kopieroperationen → $2n/n = O(1)$

**Beispiel: Splay Tree**
- Einzelne Operation: $O(n)$ Worst-Case
- Amortisiert: $O(\\log n)$ pro Operation (bewiesen über Potentialmethode)`,
    },
    {
      id: "ad-sortieren", title: "Sortierverfahren", duration: "50 min", type: "interactive", interactive: "sortVisualizer",
      content: `## Sortierverfahren — Übersicht

| Verfahren | Best | Average | Worst | Stabil | In-Place | Methode |
|-----------|------|---------|-------|--------|----------|---------|
| Bubblesort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | Ja | Ja | Austausch |
| Insertionsort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | Ja | Ja | Einfügen |
| Selectionsort | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | Nein | Ja | Auswahl |
| Shellsort | $O(n \\log n)$ | $O(n^{1.3})$ | $O(n^2)$ | Nein | Ja | Einfügen |
| Mergesort | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | Ja | Nein | Teile & Herrsche |
| Quicksort | $O(n \\log n)$ | $O(n \\log n)$ | $O(n^2)$ | Nein | Ja | Teile & Herrsche |
| Heapsort | $O(n \\log n)$ | $O(n \\log n)$ | $O(n \\log n)$ | Nein | Ja | Auswahl |
| CountingSort | $O(n+k)$ | $O(n+k)$ | $O(n+k)$ | Ja | Nein | Index |
| RadixSort | $O(d(n+k))$ | $O(d(n+k))$ | $O(d(n+k))$ | Ja | Nein | Index |

### Quicksort — Divide & Conquer

    quicksort(A, lo, hi):
      if lo < hi:
        p = partition(A, lo, hi)
        quicksort(A, lo, p-1)
        quicksort(A, p+1, hi)

**Partitionierung (Lomuto):**

    partition(A, lo, hi):
      pivot = A[hi]
      i = lo - 1
      for j = lo to hi-1:
        if A[j] <= pivot:
          i++; swap(A[i], A[j])
      swap(A[i+1], A[hi])
      return i + 1

**Optimierungen:**
- **Median-of-Three:** Pivot = Median(erstes, mittleres, letztes)
- **Randomisiertes Pivot:** Vermeidet Worst-Case bei sortierter Eingabe
- **Insertion Sort** für kleine Teilarrays ($n < 10$)
- **3-Way Partition** für viele Duplikate

### Mergesort — Garantiert $O(n \\log n)$

    mergesort(A):
      if |A| <= 1: return A
      mid = |A| / 2
      L = mergesort(A[0..mid])
      R = mergesort(A[mid+1..])
      return merge(L, R)

**Merge:** Zwei sortierte Listen zusammenführen durch Vergleich der Front-Elemente.

### Heapsort

1. **Build-Max-Heap:** $O(n)$ (Bottom-Up)
2. **Extrahiere Maximum** $n$-mal: $O(n \\log n)$

    heapsort(A):
      buildMaxHeap(A)
      for i = n downto 2:
        swap(A[1], A[i])
        heapSize--
        maxHeapify(A, 1)

### CountingSort — $O(n+k)$, nicht vergleichsbasiert

    countingSort(A, k):
      C[0..k] = 0
      for each a in A: C[a]++
      for i = 1 to k: C[i] += C[i-1]
      for each a in A (rückwärts):
        B[C[a]] = a; C[a]--

**Voraussetzung:** Elemente aus kleinem Bereich $[0, k]$.
**Stabil** durch rückwärtiges Einordnen.

### RadixSort

1. Sortiere Ziffer für Ziffer (Least Significant → Most Significant)
2. Jeder Schritt: Stabiler Sort (z.B. CountingSort) auf einer Ziffer
3. $d$ Ziffern × $O(n+k)$ = $O(d(n+k))$

**LSD RadixSort** (von rechts) ist stabiler als MSD.

### Warum $\\Omega(n \\log n)$ für Vergleichssortierkeiten?

- Entscheidungsbaum für $n$ Elemente hat $n!$ Blätter
- Höhe $\\geq \\log_2(n!) = \\Theta(n \\log n)$ (Stirling)
- Also: Jeder vergleichsbasierte Algorithmus braucht $\\Omega(n \\log n)$ Vergleiche`,
    },
    {
      id: "ad-datenstrukturen", title: "Datenstrukturen: Listen, Stacks, Queues", duration: "40 min", type: "text",
      content: `## Elementare Datenstrukturen

### Array

| Operation | Laufzeit |
|-----------|----------|
| Zugriff Index $i$ | $O(1)$ |
| Suche (unsortiert) | $O(n)$ |
| Suche (sortiert) | $O(\\log n)$ |
| Einfügen Mitte | $O(n)$ |
| Löschen Mitte | $O(n)$ |

**Dynamisches Array:** Verdoppelt Kapazität bei Überlauf. Amortisiert $O(1)$ für append.

### Verkettete Liste

**Einfach verkettet:** Jeder Knoten hat Daten + Zeiger auf Nachfolger.

| Operation | Array | Einfach verkettet | Doppelt verkettet |
|-----------|-------|-------------------|-------------------|
| Zugriff Index $i$ | $O(1)$ | $O(n)$ | $O(n)$ |
| Einfügen Anfang | $O(n)$ | $O(1)$ | $O(1)$ |
| Einfügen Ende | $O(1)^*$ | $O(n)$ / $O(1)^*$ | $O(1)^*$ |
| Löschen Anfang | $O(n)$ | $O(1)$ | $O(1)$ |
| Löschen gegeben | $O(n)$ | $O(n)$ | $O(1)$ |

$^*$ = mit Zeiger auf Ende

### Stack (LIFO)

**Operationen:** push, pop, top — alle $O(1)$.

**Anwendungen:**
- Funktionsaufrufe (Call Stack)
- Klammerprüfung: öffnende pushen, schließende matchen
- Postfix-Auswertung: $3\\ 4\\ +\\ 5\\ \\times$ = $(3+4) \\times 5 = 35$
- DFS-Traversal
- Undo-Funktionalität

### Queue (FIFO)

**Operationen:** enqueue (hinten), dequeue (vorne) — alle $O(1)$.

**Implementierung:** Ringpuffer (circular array):

    class CircularQueue:
      front = 0, rear = 0, size = 0
      enqueue(x): arr[rear] = x; rear = (rear+1) % capacity
      dequeue(): x = arr[front]; front = (front+1) % capacity

### Deque (Double-Ended Queue)

Einfügen und Entfernen an **beiden Enden** in $O(1)$.

| Operation | Array-Deque | Listen-Deque |
|-----------|-------------|--------------|
| pushFront/pushBack | $O(1)^*$ | $O(1)$ |
| popFront/popBack | $O(1)$ | $O(1)$ |
| Zugriff Index | $O(1)$ | $O(n)$ |

**Anwendung:** Sliding Window Maximum (mit Monotone Deque in $O(n)$).

### Circular Queue (Ringpuffer)

Fester Puffer, Zeiger wrap-around:

    CircularBuffer[capacity]:
      head = 0, tail = 0, count = 0
      isFull:  count == capacity
      isEmpty: count == 0
      enqueue: if !full → buf[tail] = x; tail = (tail+1) % cap; count++
      dequeue: if !empty → x = buf[head]; head = (head+1) % cap; count--

**Vorteil:** Kein Speicher allozieren, keine Fragmentierung.

### Priority Queue

**extractMax()** / **extractMin()** entfernt Element mit höchster/niedrigster Priorität.

| Implementierung | insert | extractMax | peek |
|-----------------|--------|------------|------|
| Unsortiertes Array | $O(1)$ | $O(n)$ | $O(n)$ |
| Sortiertes Array | $O(n)$ | $O(1)$ | $O(1)$ |
| Binärer Heap | $O(\\log n)$ | $O(\\log n)$ | $O(1)$ |
| Fibonacci-Heap | $O(1)^*$ | $O(\\log n)^*$ | $O(1)$ |

$^*$ amortisiert

### Hash-basierte Strukturen

**HashSet:** Keine Duplikate, $O(1)$ contains/add/remove.
**HashMap:** Key-Value-Paare, $O(1)$ get/put.`,
    },
    {
      id: "ad-baeume", title: "Bäume & binäre Suchbäume", duration: "50 min", type: "interactive", interactive: "treeExplorer",
      content: `## Bäume — Hierarchische Datenstrukturen

### Grundbegriffe

- **Wurzel (Root):** Oberster Knoten
- **Blatt (Leaf):** Knoten ohne Kinder
- **Höhe:** Längster Weg von Wurzel zu Blatt
- **Tiefe:** Abstand von Wurzel
- **Grad:** Anzahl Kinder

### Binäre Suchbäume (BST)

**Eigenschaft:** Links < Wurzel < Rechts (für jeden Teilbaum).

| Operation | Balanced | Entartet (Skewed) |
|-----------|----------|-------------------|
| Suchen | $O(\\log n)$ | $O(n)$ |
| Einfügen | $O(\\log n)$ | $O(n)$ |
| Löschen | $O(\\log n)$ | $O(n)$ |

**Löschen im BST:**
1. **Blatt:** einfach entfernen
2. **Ein Kind:** Kind ersetzt Knoten
3. **Zwei Kinder:** Inorder-Nachfolger (kleinster im rechten Teilbaum) als Ersatz

### AVL-Baum (selbst-ausgleichend)

**Balance-Faktor:** $\\text{bf}(v) = \\text{höhe(links)} - \\text{höhe(rechts)} \\in \\{-1, 0, 1\\}$

**Rotationen nach Einfügen/Löschen:**

| Fall | Bedingung | Rotation |
|------|-----------|----------|
| Links-Links | bf > 1, bf(links) >= 0 | Rechtsrotation |
| Rechts-Rechts | bf < -1, bf(rechts) <= 0 | Linksrotation |
| Links-Rechts | bf > 1, bf(links) < 0 | Links- dann Rechtsrotation |
| Rechts-Links | bf < -1, bf(rechts) > 0 | Rechts- dann Linksrotation |

**Rechtsrotation um Knoten A:**

      A             B
     / \\           / \\
    B   C   →     D   A
   / \\             / \\
  D   E           E   C

### Red-Black Trees

Alternativer selbst-ausgleichender BST. Eigenschaften:
1. Jeder Knoten ist **rot oder schwarz**
2. Wurzel ist **schwarz**
3. Rote Knoten haben **schwarze Kinder** (keine zwei roten hintereinander)
4. Alle Wege von Wurzel zu Blättern haben **gleiche schwarze Tiefe**

**Vorteil:** Maximal $2 \\log(n+1)$ Höhe, weniger Rotationen als AVL.

| | AVL | Red-Black |
|-|-----|-----------|
| Höhe | $\\leq 1.44 \\log n$ | $\\leq 2 \\log n$ |
| Suchen | Schneller | Etwas langsamer |
| Einfügen/Löschen | Mehr Rotationen | Weniger Rotationen |
| Anwendung | Lookup-intensiv | Einfügen/Löschen-intensiv (z.B. Linux Kernel) |

### B-Bäume (für Datenbanken)

**B-Baum der Ordnung $m$:**
- Jeder Knoten hat max. $m$ Kinder, min. $\\lceil m/2 \\rceil$ (außer Wurzel)
- Alle Blätter auf gleicher Höhe
- Schlüssel in Knoten sortiert

**B+-Baum (Variante):**
- Daten **nur in Blättern**
- Innere Knoten nur als Index
- Blätter verkettet (sequentieller Zugriff)

**Warum B-Bäume für Datenbanken?**
- Minimiert Plattenzugriffe (hohe Verzweigung)
- $O(\\log_m n)$ Zugriffe — mit $m=1000$ fast nie mehr als 3-4

### Traversierung

| Verfahren | Reihenfolge | Anwendung |
|-----------|-------------|-----------|
| Preorder | Wurzel → Links → Rechts | Kopie, Ausdrucksbaum |
| Inorder | Links → Wurzel → Rechts | Sortierte Ausgabe (BST) |
| Postorder | Links → Rechts → Wurzel | Löschen, Speicher freigeben |
| Levelorder | Ebene für Ebene (BFS) | Druckauftrag, kürzester Weg |

    preorder:  10, 5, 3, 7, 15, 12, 18
    inorder:   3, 5, 7, 10, 12, 15, 18  ← sortiert!
    postorder: 3, 7, 5, 12, 18, 15, 10

### Heap

**Max-Heap:** Elternknoten $\\geq$ Kinder. Min-Heap analog.

| Operation | Laufzeit |
|-----------|----------|
| insert | $O(\\log n)$ |
| extractMax | $O(\\log n)$ |
| peek | $O(1)$ |
| buildHeap | $O(n)$ |

**Build-Heap** in $O(n)$ (Bottom-Up-Heapify).`,
    },
    {
      id: "ad-graphen", title: "Graphen & Graph-Algorithmen", duration: "50 min", type: "interactive", interactive: "graphExplorer",
      content: `## Graphen

Ein **Graph** $G = (V, E)$ besteht aus Knoten $V$ und Kanten $E$.

### Darstellung

| Methode | Speicher | Kante prüfen | Nachbarn finden |
|---------|----------|--------------|-----------------|
| Adjazenzmatrix | $O(|V|^2)$ | $O(1)$ | $O(|V|)$ |
| Adjazenzliste | $O(|V|+|E|)$ | $O(\\deg(v))$ | $O(\\deg(v))$ |
| Inkidenzmatrix | $O(|V| \\cdot |E|)$ | $O(1)$ | $O(|E|)$ |

### BFS vs. DFS

**BFS** (Queue): Ebenenweise, kürzeste Wege (ungewichtet), $O(|V|+|E|)$

**DFS** (Stack/Rekursion): Tiefensuche, Zyklenerkennung, Topologische Sortierung, $O(|V|+|E|)$

**DFS-Zeitstempel:**
- $d[v]$ = Entdeckungszeit
- $f[v]$ = Abschlusszeit
- **Kantenklassifizierung:** Baum-, Rückwärts-, Vorwärts-, Querkante

### Topologische Sortierung

Nur für **DAGs** (Directed Acyclic Graph). Reihenfolge: für jede Kante $u \\to v$ kommt $u$ vor $v$.

**Algorithmus:** DFS, Knoten bei Abschluss auf Stack. Umgekehrte Reihenfolge = topo-sort.

**Anwendung:** Build-Systeme, Kursreihenfolge, Task-Scheduling.

### Dijkstra — Kürzeste Wege (positive Kanten)

    dijkstra(G, s):
      dist[s] = 0, alle anderen = ∞
      PQ = alle Knoten
      while PQ nicht leer:
        u = extractMin(PQ)
        für jede Kante (u,v) mit Gewicht w:
          wenn dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
            decreaseKey(PQ, v, dist[v])

| Implementierung | Laufzeit |
|-----------------|----------|
| Array | $O(|V|^2)$ |
| Binär-Heap | $O((|V|+|E|) \\log |V|)$ |
| Fibonacci-Heap | $O(|E| + |V| \\log |V|)$ |

**NICHT für negative Kanten!**

### Bellman-Ford — Negative Kanten erlaubt

    bellmanFord(G, s):
      dist[s] = 0, alle anderen = ∞
      for i = 1 to |V|-1:
        für jede Kante (u,v) mit Gewicht w:
          wenn dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
      // Negative Zyklen erkennen:
      für jede Kante (u,v) mit Gewicht w:
        wenn dist[u] + w < dist[v]:
          "Negativer Zyklus!"

- **Laufzeit:** $O(|V| \\cdot |E|)$
- Erkennt **negative Zyklen** (Dijkstra kann das nicht)

### Floyd-Warshall — All-Pairs Kürzeste Wege

    floydWarshall(G):
      dist[i][j] = Gewicht(i,j) oder ∞
      for k = 1 to |V|:
        for i = 1 to |V|:
          for j = 1 to |V|:
            dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])

- **Laufzeit:** $O(|V|^3)$
- Findet kürzeste Wege zwischen **allen** Paaren
- Einfach zu implementieren

### MST (Kruskal & Prim)

**Kruskal:** Sortiere Kanten nach Gewicht, füge hinzu wenn kein Zyklus (Union-Find mit Pfadkompression + Union by Rank).
- Laufzeit: $O(|E| \\log |E|)$

**Prim:** Starte mit Knoten, füge jeweils leichteste Kante zum MST hinzu (Priority Queue).
- Laufzeit: $O(|E| \\log |V|)$ mit Binär-Heap

**Cut-Property:** Für jeden Cut des Graphen ist die leichteste Kante über den Cut im MST.

### Union-Find (Disjoint Sets)

| Operation | Ohne Optimierung | Mit Pfadkompression + Union by Rank |
|-----------|------------------|-------------------------------------|
| find | $O(n)$ | $O(\\alpha(n)) \\approx O(1)$ |
| union | $O(n)$ | $O(\\alpha(n)) \\approx O(1)$ |

$\\alpha(n)$ = inverse Ackermann-Funktion, wächst extrem langsam ($\\leq 4$ für praktische $n$).`,
    },
    {
      id: "ad-hashing", title: "Hashing & Hash-Tabellen", duration: "35 min", type: "text",
      content: `## Hashing

Hash-Tabellen: Suchen, Einfügen, Löschen in $O(1)$ average case.

### Hash-Funktionen

| Methode | Formel | Hinweis |
|---------|--------|---------|
| Division | $h(k) = k \\bmod m$ | $m$ prim wählen |
| Multiplikation | $h(k) = \\lfloor m(kA \\bmod 1) \\rfloor$ | $A \\approx (\\sqrt{5}-1)/2$ |
| Universal | $h(k) = ((ak + b) \\bmod p) \\bmod m$ | Kollisionsresistent |

### Kollisionsbehandlung

**1. Verkettung (Chaining):**
- Jeder Slot hat eine verkettete Liste
- Average: $O(1 + \\alpha)$, Worst: $O(n)$

**2. Offene Adressierung:**
- **Linear Probing:** $h(k, i) = (h(k) + i) \\bmod m$ — Primary Clustering
- **Quadratic Probing:** $h(k, i) = (h(k) + c_1 i + c_2 i^2) \\bmod m$ — Secondary Clustering
- **Double Hashing:** $h(k, i) = (h_1(k) + i \\cdot h_2(k)) \\bmod m$ — Am besten

**3. Cuckoo Hashing:**
- Zwei Hash-Funktionen, zwei Tabellen
- Bei Kollision: existierendes Element wird "rausgeworfen" und neu gehasht
- **Garantiert** $O(1)$ Worst-Case Lookup!
- Rehashing wenn Zyklen erkannt werden

**4. Robin Hood Hashing:**
- Beim Linear Probing: Element mit größerer Entfernung zum Ideal-Slot verdrängt kürzeres
- Reduziert Varianz der Suchzeit

### Lastfaktor

$\\alpha = n/m$ (Elemente / Größe)

| Strategie | Max $\\alpha$ | Rehash |
|-----------|---------------|--------|
| Java HashMap | 0.75 | Verdoppeln |
| Python dict | 0.66 | ~Verdoppeln |
| C++ unordered_map | 1.0 | Verdoppeln |

### Bloom Filter — Probabilistische Datenstruktur

- **$k$ Hash-Funktionen**, Bit-Array der Größe $m$
- **Einfügen:** Setze Bits an Positionen $h_1(x), h_2(x), \\ldots, h_k(x)$
- **Abfrage:** Alle $k$ Bits gesetzt? → "Möglicherweise vorhanden" (False Positive möglich)
- **Garantie:** Kein False Negative!

**False-Positive-Wahrscheinlichkeit:**
$P_{FP} \\approx (1 - e^{-kn/m})^k$

**Optimal:** $k = (m/n) \\ln 2$

**Anwendung:** Datenbanken (vorab Filtern), Caches, Netzwerk-Routing.

### Perfektes Hashing

Für **statische** Schlüsselmengen (kein Einfügen nach Erstellung):
- Statische Hash-Tabelle: $O(1)$ Worst-Case, minimaler Speicher
- Konstruktion: Zwei Hash-Funktionen + Tabelle pro Bucket`,
    },
    {
      id: "ad-dp", title: "Dynamische Programmierung", duration: "45 min", type: "text",
      content: `## Dynamische Programmierung (DP)

### Prinzip

1. **Optimal Substructure:** Optimale Lösung enthält optimale Teillösungen
2. **Overlapping Subproblems:** Gleiche Teillösungen werden mehrfach berechnet

**Vorgehen:** Rekursion + Memoisierung (Top-Down) oder Iterativ (Bottom-Up).

### Fibonacci

    // Naiv: O(2^n)
    fib(n): if n <= 1: return n; return fib(n-1) + fib(n-2)

    // DP Bottom-Up: O(n)
    fib(n):
      dp[0] = 0, dp[1] = 1
      for i = 2 to n: dp[i] = dp[i-1] + dp[i-2]
      return dp[n]

### Longest Common Subsequence (LCS)

Gegeben: Zwei Strings $X = x_1 \\ldots x_m$, $Y = y_1 \\ldots y_n$. Finde längste gemeinsame Teilfolge.

    LCS[i][j] =
      0                          wenn i=0 oder j=0
      LCS[i-1][j-1] + 1         wenn x_i = y_j
      max(LCS[i-1][j], LCS[i][j-1]) sonst

**Laufzeit:** $O(m \\cdot n)$, **Speicher:** $O(m \\cdot n)$ (optimierbar auf $O(\\min(m,n))$)

**Beispiel:** X = "ABCBDAB", Y = "BDCAB" → LCS = "BCAB" (Länge 4)

### Knapsack (Rucksackproblem)

Gegeben: $n$ Gegenstände mit Gewicht $w_i$ und Wert $v_i$. Rucksack mit Kapazität $W$. Maximaler Wert?

**0/1 Knapsack (jeder Gegenstand max. einmal):**

    dp[i][w] =
      0                                          wenn i=0 oder w=0
      dp[i-1][w]                                 wenn w_i > w
      max(dp[i-1][w], dp[i-1][w-w_i] + v_i)     sonst

**Laufzeit:** $O(n \\cdot W)$ — **Pseudo-polinomial!**

**Fractional Knapsack:** Greedy (sortiere nach $v_i/w_i$) — $O(n \\log n)$.

### Edit Distance (Levenshtein)

Minimale Anzahl Operationen (Einfügen, Löschen, Ersetzen) um String $A$ in String $B$ zu verwandeln.

    dp[i][j] =
      i                                wenn j=0
      j                                wenn i=0
      dp[i-1][j-1]                     wenn a_i = b_j
      1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])  sonst

**Laufzeit:** $O(m \\cdot n)$. Anwendung: Rechtschreibkorrektur, DNA-Sequenzalignment.

### Matrix Chain Multiplication

Gegeben: Matrizen $A_1, \\ldots, A_n$ mit Dimensionen $p_{i-1} \\times p_i$. Minimale Anzahl Skalaroperationen?

    dp[i][j] = min über k von (dp[i][k] + dp[k+1][j] + p_{i-1} \\cdot p_k \\cdot p_j)

**Laufzeit:** $O(n^3)$.

### DP vs. Greedy vs. Divide & Conquer

| | DP | Greedy | D&C |
|-|-----|--------|-----|
| Subprobleme | Überlappend | Unabhängig | Unabhängig |
| Wahl | Alle Optionen | Lokal optimal | Partition |
| Optimal? | Garantiert | Nicht immer | Garantiert |
| Memoisierung | Ja | Nein | Nein |`,
    },
    {
      id: "ad-greedy", title: "Greedy-Algorithmen", duration: "35 min", type: "text",
      content: `## Greedy-Algorithmen

### Prinzip

1. **Greedy Choice Property:** Lokal optimale Wahl führt zu global optimaler Lösung
2. **Optimal Substructure:** Optimale Lösung enthält optimale Teillösungen

**Unterschied zu DP:** Greedy trifft sofortige Entscheidung, DP prüft alle Optionen.

### Aktivitätsauswahl (Activity Selection)

Gegeben: $n$ Aktivitäten mit Start- und Endzeit. Maximale Anzahl nicht-überlappende Aktivitäten?

**Greedy-Strategie:** Sortiere nach Endzeit, wähle greedig.

    activities.sort(key=end)
    last_end = -∞
    for each a in activities:
      if a.start >= last_end:
        select(a); last_end = a.end

**Laufzeit:** $O(n \\log n)$ (Sortierung). **Beweis:** Austauschargument.

### Fraktioneller Rucksack

Gegenstände sind **teilbar**. Sortiere nach Wert/Gewicht-Verhältnis $v_i/w_i$ absteigend.

    sort by v_i/w_i descending
    for each item:
      if capacity >= w_i: take all
      else: take fraction; break

**Laufzeit:** $O(n \\log n)$. Immer optimal (im Gegensatz zu 0/1 Knapsack!).

### Huffman-Kodierung

**Problem:** Verlustfreie Kompression. Häufige Zeichen sollen kurze Codes bekommen.

**Algorithmus:**
1. Erstelle Blattknoten für jedes Zeichen mit Häufigkeit
2. While mehr als ein Knoten:
   - Entferne zwei Knoten mit kleinster Häufigkeit
   - Erstelle neuen Elternknoten mit Summe
3. Weise links=0, rechts=1 zu

**Beispiel:**

| Zeichen | Häufigkeit | Code |
|---------|------------|------|
| a | 45% | 0 |
| b | 13% | 101 |
| c | 12% | 100 |
| d | 16% | 111 |
| e | 9% | 1101 |
| f | 5% | 1100 |

**Eigenschaften:**
- **Präfixfrei:** Kein Code ist Präfix eines anderen
- **Optimal** unter Präfix-Codes (bewiesen über Austauschargument)
- Laufzeit: $O(n \\log n)$ mit Priority Queue

### Dijkstra als Greedy

Wähle greedig den Knoten mit kleinstem bekanntem Abstand. Korrekt weil:
- Kanten haben positives Gewicht
- Bereits gefundene kürzeste Wege werden nicht verbessert

### Kruskal als Greedy

Wähle greedy die leichteste Kante die keinen Zyklus bildet. Korrekt durch Cut-Property.

### Greedy funktioniert NICHT immer

**0/1 Knapsack:** Greedy nach $v_i/w$ ist nicht optimal (Gegenbeispiel: Kapazität 50, A(60,10), B(100,20), C(120,30) → Greedy nimmt A+B=160 statt A+C=180).

**TSP:** Nächster Nachbar ist nicht optimal.

### Beweistechniken

1. **Austauschargument:** Zeige dass greedy ≥ jede andere Lösung
2. **Induktion:** Greedy Choice + Optimal Substructure → Optimal`,
    },
    {
      id: "ad-klausur", title: "Probeklausur AD — 15 Fragen", duration: "75 min", type: "quiz", examMode: true,
      content: `## AD Probeklausur — 15 Fragen

### Frage 1
Quicksort Worst-Case bei sortierter Eingabe mit Pivot = erstes Element?
A) $O(n \\log n)$
B) $O(n^2)$
C) $O(n)$
D) $O(\\log n)$

Richtig: **B.** Sortierte Eingabe + schlechte Pivotwahl → $O(n^2)$.

### Frage 2
Welche Datenstruktur: LIFO?
A) Queue
B) Stack
C) Priority Queue
D) Deque

Richtig: **B.** Stack = Last In First Out.

### Frage 3
Binäre Suche Laufzeit?
A) $O(n)$
B) $O(n^2)$
C) $O(\\log n)$
D) $O(n \\log n)$

Richtig: **C.** Halbierung des Suchraums pro Schritt.

### Frage 4
BST Traversierung für sortierte Ausgabe?
A) Preorder
B) Inorder
C) Postorder
D) Levelorder

Richtig: **B.** Inorder = Links → Wurzel → Rechts.

### Frage 5
Kürzeste Wege, gewichteter Graph (positiv)?
A) BFS
B) DFS
C) Dijkstra
D) Kruskal

Richtig: **C.** Dijkstra mit Priority Queue.

### Frage 6
Lastfaktor $\\alpha$?
A) $n+m$
B) $n \\cdot m$
C) $n/m$
D) $m/n$

Richtig: **C.** $\\alpha = n/m$ (Elemente / Tabellengröße).

### Frage 7
Welches Sortierverfahren ist NICHT stabil?
A) Mergesort
B) Bubblesort
C) Insertionsort
D) Quicksort

Richtig: **D.** Quicksort vertauscht über weite Distanzen.

### Frage 8
AVL-Baum Balance-Faktor?
A) $|bf| \\leq 2$
B) $|bf| \\leq 1$
C) $|bf| \\leq 0$
D) Keine Einschränkung

Richtig: **B.** Balance-Faktor $\\leq 1$ für jeden Knoten.

### Frage 9
BFS verwendet...
A) Stack
B) Queue
C) Priority Queue
D) Hash-Tabelle

Richtig: **B.** BFS = Queue (FIFO).

### Frage 10
Bellman-Ford erkennst...
A) Negative Zyklen
B) Positive Zyklen
C) Nur kürzeste Wege
D) MST

Richtig: **A.** Wenn nach $|V|-1$ Iterationen noch Relaxation möglich → negativer Zyklus.

### Frage 11
DAG = ?
A) Dynamic Array Graph
B) Directed Acyclic Graph
C) Distributed Algorithm Generator
D) Double Access Grid

Richtig: **B.** Gerichteter azyklischer Graph.

### Frage 12
LCS von "ABCBDAB" und "BDCAB"?
A) "AB"
B) "BCAB"
C) "BDAB"
D) "ABCBDAB"

Richtig: **B.** Länge 4.

### Frage 13
Huffman-Kodierung ist...
A) Nicht Präfix-frei
B) Präfix-frei und optimal
C) Nur für ASCII
D) Verlustbehaftet

Richtig: **B.** Präfix-frei + kürzester erwarteter Code.

### Frage 14
Master-Theorem: $T(n) = 2T(n/2) + n$?
A) $O(n)$
B) $O(n \\log n)$
C) $O(n^2)$
D) $O(\\log n)$

Richtig: **B.** $a=2, b=2, d=1$ → Fall 2 → $O(n \\log n)$ (Mergesort).

### Frage 15
Bloom Filter garantieren...
A) Kein False Positive
B) Kein False Negative
C) Beides
D) Nichts

Richtig: **B.** Kein False Negative, aber False Positives möglich.`,
    },
  ],
};
