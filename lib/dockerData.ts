import { Module } from "./types";

// ============================================================================
// IHK "Docker & Containerisierung" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const dockerModule: Module = {
  id: "ihk-docker",
  slug: "ihk-docker",
  title: "Docker & Containerisierung",
  description: "IHK IT-Handbuch: Docker, Container, Images, Dockerfile, Compose, Deployment, Kubernetes-Basics",
  icon: "🐳",
  color: "#2496ED",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Docker & Containerisierung (IHK)

### Was ist Docker?
- Plattform zur Erstellung und Verwaltung von Containern
- Container = leichtgewichtige, isolierte Laufzeitumgebungen
- "Build, Ship, Run"

### Container vs. VM
| Container | VM |
|-----------|-----|
| Teilt OS-Kernel | Eigene OS-Installation |
| Startet in Sekunden | Startet in Minuten |
| Wenige MB | Mehrere GB |
| Weniger isoliert | Voll isoliert |

### Dockerfile
- Beschreibt, wie ein Image gebaut wird
- FROM, RUN, COPY, CMD, EXPOSE

### Docker Compose
- Multi-Container-Anwendungen orchestrieren
- YAML-Datei definiert Services, Netzwerke, Volumes
- \`docker compose up\` startet alles

### Kubernetes
- Container auf vielen Nodes verwalten
- Skalierung, Self-Healing, Load-Balancing
- YAML-basierte Konfiguration`,

  lessons: [
    // --- Lektion 1: Was ist Docker? ---
    {
      id: "dk-1",
      title: "Was ist Docker?",
      duration: "12 min",
      type: "text",
      visuals: [{ type: "dockerWorkflow", position: "top" }],
      content: `## Docker — Container für die moderne Welt

> Docker ist der Industriestandard für Container-Virtualisierung. In diesem Modul lernst du die Grundlagen, Befehle, Docker Compose und Deployment-Strategien kennen — alles prüfungsrelevant für die IHK!

> Virtualisierung behandeln wir auch im Modul "Computersysteme & Hardware" — dort mit Fokus auf VMs vs. Container.

**Docker** ist eine Plattform zur Erstellung, Verteilung und Ausführung von Anwendungen in **Containern**.

---

## 📦 Was ist ein Container?

Ein Container ist eine **leichtgewichtige, isolierte Laufzeitumgebung**, die eine Anwendung mit allen Abhängigkeiten enthält.

> 💡 **Analogie:** Ein Container ist wie ein **Paket mit allem drin** — Code, Bibliotheken, Konfiguration. Du kannst es überall hin schicken und es läuft.

---

## 🆚 Container vs. Virtual Machine

| | 📦 Container | 🖥️ Virtual Machine |
|---|---|---|
| **OS** | Teilt OS-Kernel | Eigene OS-Installation |
| **Größe** | Wenige MB | Mehrere GB |
| **Startzeit** | Sekunden | Minuten |
| **Isolation** | Weniger isoliert | Vollständig isoliert |
| **Overhead** | Gering | Hoch |
| **Use Case** | Microservices, DevOps | Legacy, stark isoliert |

---

## 🎯 Warum Docker?

| Problem | Lösung mit Docker |
|---------|-------------------|
| "Auf meinem Rechner funktioniert es!" | Container läuft überall gleich |
| Verschiedene Versionen auf verschiedenen Rechneln | Ein Image = eine Version |
| Schwieriges Deployment | \`docker run\` — fertig |
| Umgebung aufbauen dauert lange | Image herunterladen — fertig |

---

## 📚 Die wichtigsten Begriffe

| Begriff | Beschreibung |
|---------|-------------|
| **Image** | Schablone für Container (read-only) |
| **Container** | Laufende Instanz eines Images |
| **Dockerfile** | Bauanleitung für ein Image |
| **Registry** | Speicher für Images (z.B. Docker Hub) |
| **Volume** | Persistenter Speicher außerhalb des Containers |
| **Network** | Kommunikation zwischen Containern |

---

## 🔄 Der Docker-Workflow

<svg viewBox="0 0 650 100" xmlns="http://www.w3.org/2000/svg" style="max-width:650px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="650" height="100" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="15" y="25" width="120" height="50" rx="8" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="75" y="48" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">Dockerfile</text>
  <text x="75" y="62" text-anchor="middle" fill="#64748b" font-size="10">Bauanleitung</text>
  <polygon points="135,50 150,42 150,58" fill="#64748b"/>
  <rect x="155" y="25" width="120" height="50" rx="8" fill="#8b5cf6" fill-opacity="0.25" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="215" y="48" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">docker build</text>
  <text x="215" y="62" text-anchor="middle" fill="#64748b" font-size="10">Image erstellen</text>
  <polygon points="275,50 290,42 290,58" fill="#64748b"/>
  <rect x="295" y="25" width="120" height="50" rx="8" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5"/>
  <text x="355" y="48" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">docker run</text>
  <text x="355" y="62" text-anchor="middle" fill="#64748b" font-size="10">Container starten</text>
  <polygon points="415,50 430,42 430,58" fill="#64748b"/>
  <rect x="435" y="25" width="120" height="50" rx="8" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="495" y="48" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">docker push</text>
  <text x="495" y="62" text-anchor="middle" fill="#64748b" font-size="10">Image teilen</text>
  <text x="600" y="55" text-anchor="middle" fill="#64748b" font-size="18">📦</text>
</svg>

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen Container und VM?" — Container teilt das OS, ist leichter und startet schneller. VM hat eigenes OS, ist stärker isoliert aber langsamer.`
    },

    // --- Lektion 2: Docker-Befehle ---
    {
      id: "dk-2",
      title: "Die wichtigsten Docker-Befehle",
      duration: "15 min",
      type: "interactive",
      interactive: "dockerfileBuilder",
      content: `## Docker-Befehle — Das musst du kennen

> In der letzten Lektion haben wir gelernt, WAS Docker ist. Jetzt wird es praktisch: Die wichtigsten Befehle für den Alltag. Du wirst sie ständig brauchen!

Die wichtigsten Befehle für den Alltag mit Docker.

---

## 🖼️ Images verwalten

\`\`\`bash
# Image herunterladen
docker pull nginx:latest

# Lokale Images anzeigen
docker images

# Image löschen
docker rmi nginx:latest
\`\`\`

---

## 📦 Container verwalten

\`\`\`bash
# Container starten
docker run -d -p 8080:80 --name mein-nginx nginx

# Erklärung:
# -d = Hintergrund (detached)
# -p 8080:80 = Port-Weiterleitung (Host:Container)
# --name = Name für den Container

# Laufende Container anzeigen
docker ps

# Alle Container (auch gestoppte)
docker ps -a

# Container stoppen
docker stop mein-nginx

# Container starten
docker start mein-nginx

# Container löschen
docker rm mein-nginx

# Logs anzeigen
docker logs mein-nginx

# In Container eintreten
docker exec -it mein-nginx bash
\`\`\`

---

## 🏗️ Images bauen

\`\`\`bash
# Image aus Dockerfile bauen
docker build -t mein-app:1.0 .

# -t = Tag (Name:Version)
# . = Build-Kontext (aktuelles Verzeichnis)
\`\`\`

---

## 📋 Dockerfile — Die Bauanleitung

\`\`\`dockerfile
# Basis-Image
FROM python:3.11-slim

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten installieren
COPY requirements.txt .
RUN pip install -r requirements.txt

# Code kopieren
COPY . .

# Port freigeben
EXPOSE 5000

# Startbefehl
CMD ["python", "app.py"]
\`\`\`

### Die wichtigsten Dockerfile-Instruktionen

| Instruktion | Zweck |
|-------------|-------|
| \`FROM\` | Basis-Image (z.B. python:3.11) |
| \`WORKDIR\` | Arbeitsverzeichnis setzen |
| \`COPY\` | Dateien in den Container kopieren |
| \`RUN\` | Befehl beim Bauen ausführen |
| \`EXPOSE\` | Port dokumentieren |
| \`CMD\` | Startbefehl beim Starten |

---

## 🐳 Docker Compose — Multi-Container

\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
\`\`\`

### Compose-Befehle

\`\`\`bash
# Alle Services starten
docker compose up -d

# Alle Services stoppen
docker compose down

# Neu bauen und starten
docker compose up --build

# Logs anzeigen
docker compose logs -f
\`\`\`

---

> 💡 **IHK-Tipp:** "Was macht die Dockerfile-Instruktion COPY?" — Kopiert Dateien vom Host in den Container. Wird nach WORKDIR verwendet, um den Zielort zu definieren.`
    },

    // --- Lektion 3: Docker Compose ---
    {
      id: "dk-3",
      title: "Docker Compose — Multi-Container orchestrieren",
      duration: "15 min",
      type: "interactive",
      interactive: "dockerComposeBuilder",
      content: `## Docker Compose — Mehrere Container verwalten

> Jetzt kennst du die einzelnen Docker-Befehle. Aber was, wenn du mehrere Container gleichzeitig starten willst — z.B. eine App UND eine Datenbank? Docker Compose löst genau dieses Problem!

**Docker Compose** ist ein Tool zur Definition und Ausführung von **Multi-Container-Docker-Anwendungen** mit einer einzigen YAML-Datei.

---

## 📝 Warum Docker Compose?

Ohne Compose:
\`\`\`bash
docker network create mein-netz
docker run -d --name db --network mein-netz postgres
docker run -d --name web --network mein-netz -p 80:80 nginx
\`\`\`

Mit Compose:
\`\`\`bash
docker compose up -d
\`\`\`

---

## 📄 Die docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  # Frontend
  web:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - api
    networks:
      - app-network

  # Backend API
  api:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DB_HOST=db
    networks:
      - app-network

  # Datenbank
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

# Netzwerke
networks:
  app-network:

# Volumes
volumes:
  db-data:
\`\`\`

---

## 🔑 Wichtige Schlüssel

| Schlüssel | Zweck |
|-----------|-------|
| \`image\` | Vorhandenes Image verwenden |
| \`build\` | Image aus Dockerfile bauen |
| \`ports\` | Port-Weiterleitung (Host:Container) |
| \`environment\` | Umgebungsvariablen setzen |
| \`volumes\` | Persistente Datenspeicherung |
| \`depends_on\` | Startreihenfolge |
| \`networks\` | Netzwerk-Zugehörigkeit |

---

## 🔄 Compose-Befehle

\`\`\`bash
# Starten (Hintergrund)
docker compose up -d

# Stoppen und löschen
docker compose down

# Neu bauen
docker compose up --build

# Logs anzeigen
docker compose logs -f

# Status anzeigen
docker compose ps

# In Service eintreten
docker compose exec web bash
\`\`\`

---

## 💾 Volumes — Persistente Daten

\`\`\`yaml
services:
  db:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data  # Named Volume
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # Bind Mount

volumes:
  db-data:  # Wird außerhalb des Containers gespeichert
\`\`\`

> ⚠️ **Wichtig:** Ohne Volume gehen Daten beim Neustart des Containers **verloren**!

---

## 🔨 Docker Compose ausprobieren

[INTERACTIVE]

---

> 💡 **IHK-Tipp:** "Was ist der Zweck von Docker Compose?" — Multi-Container-Anwendungen mit einer YAML-Datei definieren und starten. Vereinfacht die Orchestrierung von Services.`
    },

    // --- Lektion 4: Deployment ---
    {
      id: "dk-4",
      title: "Deployment — Anwendungen bereitstellen",
      duration: "12 min",
      type: "text",
      content: `## Deployment — Von der Entwicklung zur Produktion

> Wir können jetzt Container bauen und mit Compose verwalten. Der letzte Schritt: Wie bringen wir unsere Anwendung in die Produktion? Verschiedene Strategien haben verschiedene Vor- und Nachteile.

**Deployment** bezeichnet den Prozess, eine Anwendung auf einer Infrastruktur bereitzustellen.

---

## 🚀 Was ist Deployment?

> Deployment = Prozess der Bereitstellung einer Anwendung auf einer bestimmten Infrastruktur.

---

## 📋 Deployment-Strategien

### 1️⃣ All-at-Once (Big Bang)

<svg viewBox="0 0 500 70" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="500" height="70" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="20" y="18" width="110" height="34" rx="6" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1.5"/>
  <text x="75" y="40" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">Alt (v1.0)</text>
  <polygon points="130,35 148,28 148,42" fill="#64748b"/>
  <rect x="152" y="18" width="90" height="34" rx="6" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="197" y="36" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">Downtime</text>
  <text x="197" y="48" text-anchor="middle" fill="#94a3b8" font-size="10">⏸️</text>
  <polygon points="242,35 260,28 260,42" fill="#64748b"/>
  <rect x="264" y="18" width="110" height="34" rx="6" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5"/>
  <text x="319" y="40" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">Neu (v2.0)</text>
  <text x="430" y="40" fill="#64748b" font-size="10">Einfach, aber</text>
  <text x="430" y="52" fill="#ef4444" font-size="10">Ausfallzeit!</text>
</svg>

### 2️⃣ Rolling Update

<svg viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="500" height="100" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="60" y="25" text-anchor="middle" fill="#94a3b8" font-size="10">Server 1</text>
  <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="10">Server 2</text>
  <text x="320" y="25" text-anchor="middle" fill="#94a3b8" font-size="10">Server 3</text>
  <rect x="20" y="35" width="75" height="28" rx="6" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5"/>
  <text x="57" y="54" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">✅ Neu</text>
  <rect x="110" y="35" width="25" height="28" rx="4" fill="#64748b" fill-opacity="0.2"/>
  <text x="122" y="54" text-anchor="middle" fill="#94a3b8" font-size="10">→</text>
  <rect x="150" y="35" width="75" height="28" rx="6" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="187" y="54" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">⏳ Alt→Neu</text>
  <rect x="240" y="35" width="25" height="28" rx="4" fill="#64748b" fill-opacity="0.2"/>
  <text x="252" y="54" text-anchor="middle" fill="#94a3b8" font-size="10">→</text>
  <rect x="280" y="35" width="75" height="28" rx="6" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1.5"/>
  <text x="317" y="54" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">Alt</text>
  <text x="420" y="45" fill="#64748b" font-size="10">Keine Downtime</text>
  <text x="420" y="57" fill="#64748b" font-size="10">Server für Server</text>
  <line x1="57" y1="63" x2="57" y2="75" stroke="#10b981" stroke-width="2"/>
  <line x1="57" y1="75" x2="187" y2="75" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="187" y1="75" x2="187" y2="63" stroke="#10b981" stroke-width="2"/>
  <line x1="187" y1="75" x2="317" y2="75" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
  <line x1="317" y1="75" x2="317" y2="63" stroke="#10b981" stroke-width="2"/>
  <text x="187" y="92" text-anchor="middle" fill="#64748b" font-size="10">Sequenziell</text>
</svg>

### 3️⃣ Blue-Green

<svg viewBox="0 0 500 90" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="500" height="90" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="20" y="20" width="120" height="50" rx="8" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="42" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">Blue (Alt)</text>
  <text x="80" y="58" text-anchor="middle" fill="#64748b" font-size="10">v1.0</text>
  <rect x="200" y="20" width="120" height="50" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
  <text x="260" y="42" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">Green (Neu)</text>
  <text x="260" y="58" text-anchor="middle" fill="#64748b" font-size="10">v2.0</text>
  <text x="380" y="30" text-anchor="middle" fill="#fcd34d" font-size="10">🔀 Load Balancer</text>
  <line x1="340" y1="45" x2="140" y2="45" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrowBlue)"/>
  <line x1="340" y1="45" x2="260" y2="45" stroke="#10b981" stroke-width="1.5" stroke-dasharray="5,4" marker-end="url(#arrowGreen)"/>
  <text x="380" y="60" text-anchor="middle" fill="#64748b" font-size="10">Schneller Rollback</text>
  <text x="380" y="72" text-anchor="middle" fill="#64748b" font-size="10">Doppelte Ressourcen</text>
  <defs>
    <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#3b82f6"/></marker>
    <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#10b981"/></marker>
  </defs>
</svg>

---

## 🐳 Deployment mit Docker

### Image bauen und pushen
\`\`\`bash
# Image bauen
docker build -t myapp:1.0 .

# Tag für Registry
docker tag myapp:1.0 registry.example.com/myapp:1.0

# Push zur Registry
docker push registry.example.com/myapp:1.0
\`\`\`

### Auf dem Server
\`\`\`bash
# Image pullen
docker pull registry.example.com/myapp:1.0

# Container starten
docker run -d -p 80:80 registry.example.com/myapp:1.0
\`\`\`

---

## ☸️ Kubernetes — Container auf vielen Nodes

**Kubernetes** (K8s) ist ein System zur Verwaltung von Containern auf **vielen Servern** (Nodes).

### Was kann Kubernetes?

| Funktion | Beschreibung |
|----------|-------------|
| 📈 **Skalierung** | Automatisch mehr Container bei hoher Last |
| 🔄 **Self-Healing** | Defekte Container werden neu gestartet |
| ⚖️ **Load-Balancing** | Traffic auf Container verteilen |
| 🚀 **Rolling Updates** | Null-Downtime Deployments |

### Konzept

<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="500" height="200" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="20" y="15" width="460" height="175" rx="10" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="6,3"/>
  <text x="250" y="40" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Kubernetes Cluster</text>
  <rect x="50" y="55" width="180" height="120" rx="8" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="1.5"/>
  <text x="140" y="75" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">Node 1</text>
  <rect x="70" y="85" width="60" height="40" rx="6" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="100" y="110" text-anchor="middle" fill="#93c5fd" font-size="10">Pod A</text>
  <rect x="150" y="85" width="60" height="40" rx="6" fill="#8b5cf6" fill-opacity="0.25" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="180" y="110" text-anchor="middle" fill="#c4b5fd" font-size="10">Pod B</text>
  <rect x="70" y="135" width="140" height="28" rx="6" fill="#64748b" fill-opacity="0.15" stroke="#64748b" stroke-width="1"/>
  <text x="140" y="154" text-anchor="middle" fill="#94a3b8" font-size="10">kubelet + kube-proxy</text>
  <rect x="270" y="55" width="180" height="120" rx="8" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="1.5"/>
  <text x="360" y="75" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">Node 2</text>
  <rect x="290" y="85" width="60" height="40" rx="6" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="320" y="110" text-anchor="middle" fill="#fcd34d" font-size="10">Pod C</text>
  <rect x="370" y="85" width="60" height="40" rx="6" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1.5"/>
  <text x="400" y="110" text-anchor="middle" fill="#fca5a5" font-size="10">Pod D</text>
  <rect x="290" y="135" width="140" height="28" rx="6" fill="#64748b" fill-opacity="0.15" stroke="#64748b" stroke-width="1"/>
  <text x="360" y="154" text-anchor="middle" fill="#94a3b8" font-size="10">kubelet + kube-proxy</text>
</svg>

### Kubernetes vs. Docker Compose

| | Docker Compose | Kubernetes |
|---|---|---|
| **Umfang** | Ein Host | Viele Nodes |
| **Skalierung** | Manuel | Automatisch |
| **Self-Healing** | ❌ | ✅ |
| **Komplexität** | Niedrig | Hoch |
| **Use Case** | Entwicklung, kleine Projekte | Produktion, große Projekte |

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen Docker Compose und Kubernetes?" — Compose für einen Host, K8s für viele Nodes. K8s bietet automatische Skalierung und Self-Healing.`
    },

    // --- Lektion 5: Quiz ---
    {
      id: "dk-5",
      title: "Wissenstest: Docker & Containerisierung",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Docker & Containerisierung

Teste dein Wissen über Docker und Container-Technologien!`,
    },
  ],
};
