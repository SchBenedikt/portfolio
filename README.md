# Interaktives Kreativ-Portfolio von Benedikt Schächner

Willkommen im Quellcode des interaktiven Portfolios von Benedikt Schächner. Dieses Projekt wurde mit Next.js, TypeScript und Tailwind CSS erstellt und demonstriert eine moderne, funktionsreiche Webanwendung, die als persönliche Online-Visitenkarte dient.

## ✨ Features

Dieses Portfolio geht über eine einfache Präsentation hinaus und bietet eine Reihe interaktiver und ansprechender Funktionen:

- **Duale Ansicht:** Wechseln Sie auf der Startseite zwischen einer eleganten grafischen Benutzeroberfläche und einer voll funktionsfähigen, interaktiven Terminal-Ansicht.
- **Interaktives Terminal:** Das Terminal emuliert eine Unix-ähnliche Shell mit Befehlen zur Navigation im virtuellen Dateisystem (`ls`, `cd`, `cat`, `mkdir`, `touch`), zum Ändern des Themes (`theme`, `mode`) und sogar zum Starten von kleinen Spielen (`game`, `matrix`).
- **Projektdarstellung:** Eine detaillierte Übersicht über abgeschlossene Projekte mit Beschreibungen, Technologien, Bildern und direkten Links.
- **Blog:** Ein eigener Blog mit Artikeln über Webentwicklung, Projekte, KI und digitale Bildung – inklusive strukturierter Daten (JSON-LD) und automatischer Sitemap-Einträge.
- **Dynamischer Lebenslauf:** Ein digitaler Lebenslauf, der Werdegang, Zertifikate und Fähigkeiten strukturiert darstellt.
- **KI-generierte Zitate:** Auf der Lebenslauf-Seite wird ein von einer KI generiertes, inspirierendes Zitat angezeigt, das thematisch zum Profil passt.
- **Gamification-System:** Ein Erfolge-System ("Achievements"), das den Nutzer für das Erkunden der Seite und das Ausprobieren von Funktionen belohnt.
- **Anpassbares Theme:** Nutzer können zwischen einem hellen und dunklen Modus wechseln sowie die primäre Akzentfarbe der Seite anpassen.
- **Modernes Design:** Gebaut mit ShadCN UI-Komponenten und Tailwind CSS für ein sauberes, responsives und ästhetisch ansprechendes Layout.
- **Optimiert für Mobilgeräte:** Eine dedizierte untere Navigationsleiste sorgt für eine intuitive Bedienung auf Smartphones und Tablets.
- **Starkes SEO:** Per-Seite-Metadaten mit Canonical-URLs, Open Graph/Twitter-Cards, JSON-LD (Person, BlogPosting, BreadcrumbList), Sitemap und robots.txt.

## 📝 Neue Blog-Artikel hinzufügen

Artikel liegen als strukturierte Daten in `src/lib/blog.ts`. Pro Artikel:

- `title`, `slug`, `description` (Meta-Beschreibung), `date` (ISO), `category`, `tags`, `readingMinutes`
- `content`: HTML-Body (Überschriften mit `h3 class="text-2xl font-bold font-headline mt-6 mb-3"`, Listen als `<ul class="list-disc pl-6 space-y-2">`)

Neue Artikel erscheinen automatisch auf `/blog`, in der Sitemap und mit SEO-Metadaten – kein weiterer Schritt nötig.

## 🚀 Verwendete Technologien

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Sprache:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI-Komponenten:** [ShadCN UI](https://ui.shadcn.com/)
- **Animationen:** [Framer Motion](https://www.framer.com/motion/)
- **KI-Integration:** [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Erste Schritte

Um das Projekt lokal auszuführen:

1.  **Abhängigkeiten installieren:**
    ```bash
    npm install
    ```

2.  **Entwicklungsserver starten:**
    ```bash
    npm run dev
    ```

    Öffnen Sie [http://localhost:9002](http://localhost:9002), um das Ergebnis in Ihrem Browser zu sehen.
