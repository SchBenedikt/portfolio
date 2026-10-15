export interface Award {
  title: string;
  place?: string;
  category?: string;
  organization: string;
  organizationSlug: string;
  date: string;
  description: string;
  projectSlug?: string;
  url?: string;
}

export const awardsData: Award[] = [
  {
    title: 'Nextcloud Community Award 2026',
    place: 'Gewinner',
    category: 'Hidden Gem',
    organization: 'Nextcloud',
    organizationSlug: 'nextcloud-community-awards',
    date: '2026-09-21',
    description:
      'Auszeichnung in der Kategorie „Hidden Gem“ für die Wiederbelebung und Weiterentwicklung der Nextcloud Social App – ein dezentraler Fediverse-/ActivityPub-Server direkt in Nextcloud.',
    projectSlug: 'nextcloud-social',
    url: 'https://nextcloud.com/blog/meet-the-winners-of-the-nextcloud-community-awards-2026',
  },
  {
    title: 'Schach-Jugendopen',
    place: '3. Platz',
    category: 'Altersklasse U18',
    organization: 'Schachklub Töging e. V.',
    organizationSlug: 'schachklub-toeging',
    date: '2026-07-19',
    description: 'Dritter Platz in der Altersklasse U18 beim Jugendopen 2026 des Schachklub Töging.',
    url: 'https://schachklub-toeging.de/jugendopen-2026-2/',
  },
  {
    title: 'Crossmedia-Preis',
    place: 'Gewinner',
    category: 'Sparte „Interactive“',
    organization: 'Bayerischer Rundfunk',
    organizationSlug: 'br',
    date: '2025-11-20',
    description: 'Gewinn des Crossmedia-Preises in der Sparte „Interactive“ mit dem Projekt „Notio“.',
    projectSlug: 'notio',
    url: 'https://www.br.de/medienkompetenzprojekte/inhalt/crossmedia/notio-einfach-besser-lernen-interactive-crossmedia-2025-gewinnerbeitrag-100.html',
  },
  {
    title: 'Deutscher Multimediapreis mb21',
    place: 'Hauptpreis',
    category: 'Altersgruppe 11–15',
    organization: 'Deutscher Multimediapreis mb21',
    organizationSlug: 'mb21',
    date: '2024-11-22',
    description:
      'Gewinn des Hauptpreises für das Projekt „Meum Diarium“ zusammen mit Vinzenz Schächner – ausgezeichnet für Detailverliebtheit, Witz und die Verbindung von Antike und Moderne.',
    projectSlug: 'meum-diarium',
    url: 'https://www.mb21.de/wettbewerbsjahr_2024.html?articles=meum-diarium',
  },
  {
    title: 'Crossmedia-Wettbewerb',
    place: '1. Platz',
    category: 'Sparte „textbased“',
    organization: 'Bayerischer Rundfunk',
    organizationSlug: 'br',
    date: '2024-11-21',
    description: 'Auszeichnung für „Meum Diarium“ in der Sparte „textbased“ für Idee, Umsetzung und mediale Aufbereitung.',
    projectSlug: 'meum-diarium',
    url: 'https://www.br.de/medienkompetenzprojekte/inhalt/crossmedia/tagebuch-caesars-heute-feldherr-als-influencer-textbased-crossmedia-2024-gewinnerbeitrag-100.html',
  },
];
