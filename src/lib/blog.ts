export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string; // ISO date, e.g. 2026-01-12
  category: string;
  tags: string[];
  readingMinutes: number;
  content: string; // HTML body (rendered with dangerouslySetInnerHTML)
  projectSlug?: string;
}

export const blogData: BlogPost[] = [
  {
    title: 'Notio: Von der Idee zur nominierten Lernplattform',
    slug: 'notio-von-der-idee-zur-nominierten-lernplattform',
    description:
      'Wie aus einer simplen Idee eine webbasierte Noten- und Lernverwaltung wurde – und was die Nominierung für den Crossmedia-Preis des Bayerischen Rundfunks damit zu tun hat.',
    date: '2025-11-30',
    category: 'Projektbericht',
    tags: ['Notio', 'EdTech', 'Web-App', 'Projektarbeit'],
    readingMinutes: 5,
    projectSlug: 'notio',
    content: `
      <p>Notio ist eine webbasierte Applikation zur Verwaltung schulischer Leistungsdaten. Was als kleines Skript für den eigenen Schulalltag begann, ist heute eine vollständige Plattform – nominiert für den Crossmedia-Wettbewerb des Bayerischen Rundfunks.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Die Idee</h3>
      <p>Schülerinnen und Schüler führen Noten meist in Papierheften oder losen Tabellen. Notio bündelt alles an einem Ort: Noten, Lernzettel, Aufgaben und anstehende Prüfungen. Der Fokus lag von Anfang an auf Übersichtlichkeit und einfacher Bedienbarkeit.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Die Umsetzung</h3>
      <p>Gebaut wurde die App mit modernen Webtechnologien: Next.js im Frontend, eine klare Datenstruktur im Backend. Der wichtigste Teil ist das Dashboard: Es zeigt den aktuellen Notenschnitt, alle Fächer und die letzten Leistungsnachweise auf einen Blick.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Die Auszeichnung</h3>
      <p>Die Nominierung für den Crossmedia-Wettbewerb des Bayerischen Rundfunks war eine große Überraschung und Bestätigung zugleich. Sie hat gezeigt, dass auch ein Schulprojekt professionelle Qualität erreichen kann, wenn man sich mit Design und Technik gründlich auseinandersetzt.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Was ich gelernt habe</h3>
      <p>Der größte Lerneffekt lag nicht in einer einzelnen Technologie, sondern im kompletten Entwicklungsprozess: Anforderungen verstehen, iterieren, Feedback einarbeiten und ein Produkt pflegen, das echte Nutzer verwenden.</p>
    `,
  },
];