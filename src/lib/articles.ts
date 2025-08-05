
export interface Article {
  title: string;
  source: string;
  url: string;
  date: string;
  description: string;
}

export const articlesData: Article[] = [
    {
        title: 'Titelverteidigung beim Bezirksfinale',
        source: 'König-Karlmann-Gymnasium',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/titelverteidigung-beim-bezirksfinale/',
        date: '2025-02-23',
        description: 'Bericht über den sportlichen Erfolg beim Schach-Bezirksfinale.',
    },
    {
        title: 'Mit Cäsars Tagebuch den 1. Preis geholt',
        source: 'König-Karlmann-Gymnasium',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/mit-caesars-tagebuch-den-1-preis-geholt/',
        date: '2024-11-29',
        description: 'Ausführlicher Bericht über den Gewinn des Hauptpreises beim Crossmedia-Wettbewerb für das Projekt „Meum Diarium“.',
    },
    {
        title: 'Hauptpreis für „Meum Diarium“',
        source: 'Deutscher Multimediapreis mb21',
        url: 'https://www.mb21.de/wettbewerbsjahr_2024.html?articles=meum-diarium',
        date: '2024-11-22',
        description: 'Offizielle Jurybegründung und Vorstellung des Gewinnerprojekts „Meum Diarium“ beim Deutschen Multimediapreis.',
    },
    {
        title: 'Ein Feldherr wird wieder lebendig',
        source: 'König-Karlmann-Gymnasium',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/ein-feldherr-wird-wieder-lebendig/',
        date: '2024-11-19',
        description: 'Vorstellung des Projekts „Meum Diarium“, bei dem Julius Cäsar als moderner Influencer auftritt.',
    },
    {
        title: 'Lesen was geht!',
        source: 'König-Karlmann-Gymnasium',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/lesen-was-geht/',
        date: '2020-09-18',
        description: 'Bericht über die Teilnahme am Lesewettbewerb und die Bedeutung des Lesens.',
    },
];
