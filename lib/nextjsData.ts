import { Module } from "./types";

export const nextjsModule: Module = {
    id: "3",
    slug: "nextjs",
    title: "Next.js",
    description: "Full-Stack React Framework - Routing, API Routes, SSR",
    icon: "▲",
    color: "#000000",
    category: "programmieren",
    merkblatt: "## 📋 Merkblatt: Next.js\n\n### Routing (App Router)\n- app/page.tsx = Startseite (/)\n- app/about/page.tsx = /about\n- app/[slug]/page.tsx = dynamische Routes\n\n### Server vs Client\n- Server Components (default)\n- 'use client' für Browser-Code\n\n### Wichtige Features\n- File-based Routing\n- API Routes: app/api/\n- Image Optimization: <Image />\n- ISR: revalidate = 60",
    progress: 0,
    lessons: [
      {
        id: "n1",
        title: "Einführung in Next.js",
        duration: "10 min",
        type: "text",
        content: `# Einführung in Next.js

Next.js ist ein **React-Framework für Production** — entwickelt von Vercel. Während React allein nur eine Bibliothek für UI-Komponenten ist, gibt Next.js dir alles, was du für eine vollständige Web-App brauchst: Routing, Server-Rendering, API-Endpunkte, Bildoptimierung und mehr. Stell dir React als den Motor vor und Next.js als das komplette Auto.

## Was ist Server-Side Rendering (SSR)?

Bei normalem React (Client-Side Rendering, CSR) lädt der Browser eine leere HTML-Datei, dann lädt JavaScript herunter und rendert die Seite im Browser. Das hat zwei Probleme: Suchmaschinen sehen oft nur leere HTML, und der User sieht kurz eine leere Seite. Bei SSR rendert der Server die Seite und schickt fertiges HTML an den Browser. Das ist besser für SEO und schneller für den User.

## Was ist Static Site Generation (SSG)?

SSG ist wie SSR, aber die Seiten werden schon beim Build-Prozess gerendert — nicht bei jedem Request. Das macht sie extrem schnell, weil der Server nur eine fertige HTML-Datei ausliefern muss. Perfekt für Blog-Posts, Dokumentationen oder Seiten, die sich selten ändern.

## File-based Routing — Ordner sind URLs

In Next.js bestimmst du die URL-Struktur deiner App durch die Ordnerstruktur. Jede \`page.tsx\` in einem Ordner wird automatisch zu einer Seite. Keine Router-Konfiguration nötig — einfach Dateien anlegen!

\`\`\`
app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
├── blog/
│   ├── page.tsx          → /blog
│   └── [slug]/
│       └── page.tsx      → /blog/:slug  (dynamisch!)
└── api/
    └── users/
        └── route.ts      → /api/users (Backend!)
\`\`\`

## Server Components vs. Client Components

In Next.js 13+ (App Router) sind alle Komponenten standardmäßig **Server Components**. Das heißt, sie werden auf dem Server gerendert und senden kein JavaScript an den Browser. Brauchst du interaktive Features (useState, useEffect, onClick), fügst du \`\"use client\"\` am Anfang der Datei hinzu.

## Erste Seite mit Next.js

Hier sehen wir eine einfache Startseite und eine über-Seite — beides Server Components:`,
        codeExample: `// ===== app/page.tsx — Die Startseite =====
// Dieses File wird automatisch zur Route "/"
// Es ist ein Server Component (kein JavaScript im Browser)
export default function Home() {
  return (
    <main>
      <h1>Willkommen bei Next.js!</h1>
      <p>Diese Seite wurde auf dem Server gerendert.</p>
    </main>
  );
}

// ===== app/about/page.tsx — Über uns =====
// Wird automatisch zur Route "/about"
export default function About() {
  return (
    <main>
      <h1>Über uns</h1>
      <p>Wir lernen Next.js together! 🚀</p>
    </main>
  );
}

// ===== app/blog/[slug]/page.tsx — Dynamische Route =====
// [slug] ist ein dynamischer Parameter
// /blog/mein-erster-post → slug = "mein-erster-post"
export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article>
      <h1>Blog-Post: {params.slug}</h1>
      <p>Inhalt des Posts...</p>
    </article>
  );
}

// ===== app/blog/page.tsx — Blog-Übersicht =====
// Links zu den einzelnen Posts
import Link from "next/link";

export default function Blog() {
  const posts = [
    { slug: "mein-erster-post", title: "Mein erster Post" },
    { slug: "nextjs-lernen", title: "Next.js lernen" },
  ];

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            {/* Link ist wie <a>, aber mit Client-Side Navigation */}
            <Link href={\`/blog/\${post.slug}\`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

// ===== Client Component (interaktiv) =====
// "use client" am Anfang = JavaScript wird im Browser geladen
"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Klicks: {count}
    </button>
  );
}`,
      },
    ],
};
