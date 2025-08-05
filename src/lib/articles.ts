
import { organizationData } from "./organizations";

export interface Article {
  title: string;
  source: string;
  organizationSlug: string;
  url: string;
  date: string;
  description: string;
}

export const articlesData: Article[] = [
    {
        title: 'Judoka ziehen positive Bilanz',
        source: 'TuS Töging',
        organizationSlug: 'tus-toeging',
        url: 'https://www.tustoeging.de/neuigkeiten.htm?n=147',
        date: '2025-04-04',
        description: 'Bericht von der Jahreshauptversammlung der Judoabteilung mit positivem Rückblick auf Erfolge, engagierten Nachwuchs und Neuwahlen der Abteilungsleitung.',
    },
    {
        title: 'Titelverteidigung beim Bezirksfinale',
        source: 'König-Karlmann-Gymnasium',
        organizationSlug: 'kkg',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/titelverteidigung-beim-bezirksfinale/',
        date: '2025-02-23',
        description: 'Die Judo-Schulmannschaft qualifiziert sich nach einem spannenden Wettkampf gegen das Gymnasium Puchheim für das Landesfinale in München.',
    },
    {
        title: 'Vertreterin der Bundesregierung ehrt in Dresden Vinzenz und Benedikt Schächner aus Pleiskirchen',
        source: 'Passauer Neue Presse',
        organizationSlug: 'pnp',
        url: 'https://www.pnp.de/lokales/landkreis-altoetting/vertreterin-der-bundesregierung-ehrt-in-dresden-vinzenz-und-benedikt-schaechner-aus-pleiskirchen-17504456',
        date: '2024-11-26',
        description: 'Die Passauer Neue Presse berichtet über die Ehrung in Dresden durch eine Vertreterin der Bundesregierung für das Projekt „Meum Diarium“.',
    },
    {
        title: 'Ein Feldherr als Influencer',
        source: 'Passauer Neue Presse',
        organizationSlug: 'pnp',
        url: 'https://www.facebook.com/altneuoettingeranzeiger/posts/mit-ihrem-multimedialen-projekt-meum-diarium-ein-feldherr-als-influencer-haben-d/1209892657393185/',
        date: '2024-11-26',
        description: 'Der Alt-Neuöttinger Anzeiger hebt auf Facebook das preisgekrönte Multimediaprojekt „Meum Diarium“ hervor.',
    },
    {
        title: 'Laudatio zum Hauptpreis „Meum Diarium“',
        source: 'YouTube',
        organizationSlug: 'mb21',
        url: 'https://www.youtube.com/watch?v=l-50niYLKXo',
        date: '2024-11-23',
        description: 'Die offizielle Laudatio zum Gewinn des Hauptpreises. Die Jury lobt den Witz, die Detailverliebtheit und die kreative Verbindung von Antike und Moderne.'
    },
    {
        title: 'Mit Cäsars Tagebuch den 1. Preis geholt',
        source: 'König-Karlmann-Gymnasium',
        organizationSlug: 'kkg',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/mit-caesars-tagebuch-den-1-preis-geholt/',
        date: '2024-11-29',
        description: 'Ausführlicher Bericht über den Gewinn des Hauptpreises beim Crossmedia-Wettbewerb für das Projekt „Meum Diarium“.',
    },
    {
        title: 'Hauptpreis für „Meum Diarium“',
        source: 'Deutscher Multimediapreis mb21',
        organizationSlug: 'mb21',
        url: 'https://www.mb21.de/wettbewerbsjahr_2024.html?articles=meum-diarium',
        date: '2024-11-22',
        description: 'Offizielle Jurybegründung und Vorstellung des Gewinnerprojekts „Meum Diarium“ beim Deutschen Multimediapreis.',
    },
    {
        title: 'Ein Feldherr als Influencer',
        source: 'Bayerischer Rundfunk',
        organizationSlug: 'br',
        url: 'https://www.br.de/medienkompetenzprojekte/inhalt/crossmedia/tagebuch-caesars-heute-feldherr-als-influencer-textbased-crossmedia-2024-gewinnerbeitrag-100.html',
        date: '2024-11-21',
        description: 'Der Bayerische Rundfunk berichtet über das prämierte Projekt "Meum Diarium" und hebt die kreative Verbindung von historischer Figur und modernem Medienumfeld hervor.',
    },
    {
        title: 'Ein Feldherr wird wieder lebendig',
        source: 'König-Karlmann-Gymnasium',
        organizationSlug: 'kkg',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/ein-feldherr-wird-wieder-lebendig/',
        date: '2024-11-19',
        description: 'Vorstellung des Projekts „Meum Diarium“, bei dem Julius Cäsar als moderner Influencer auftritt.',
    },
     {
        title: 'Lightning Talk bei der Nextcloud Conference',
        source: 'YouTube',
        organizationSlug: 'nextcloud',
        url: 'https://www.youtube.com/watch?v=zMfyJDge7is',
        date: '2024-10-25',
        description: 'Ein Vortrag über die Absicherung von privat gehosteten Nextcloud-Instanzen, Vor- und Nachteile von Sicherheitsmaßnahmen und den sinnvollen Einsatz in der Familie.'
    },
    {
        title: 'KKG-Judomannschaft siegt beim Bezirksfinale',
        source: 'König-Karlmann-Gymnasium',
        organizationSlug: 'kkg',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/kkg-judomannschaft-siegt-beim-bezirksfinale/',
        date: '2024-02-22',
        description: 'Erfolgreicher Wettkampftag für die Judoka des KKG, die sich den Sieg im Bezirksfinale sicherten.',
    },
     {
        title: 'Schachjugend zeigt ihr Können',
        source: 'OVB Heimatzeitungen',
        organizationSlug: 'schachklub-toeging',
        url: 'https://www.ovb-heimatzeitungen.de/muehldorf/2021/09/28/schachjugend-zeigt-ihr-koennen.ovb',
        date: '2021-10-05',
        description: 'Bericht über das Sommertraining und die erfolgreichen Diplomprüfungen der Schachjugend des Schachklub Töging, bei denen die Kinder und Jugendlichen ihr Können unter Beweis stellten.',
    },
    {
        title: 'Nestgeflüster – wia ma da Schnåbl gwachsn is',
        source: 'König-Karlmann-Gymnasium',
        organizationSlug: 'kkg',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/nestgefluester-wia-ma-da-schnabl-gwachsn-is/',
        date: '2020-06-09',
        description: 'Bericht über die Teilnahme am Dialektwettbewerb „Nestgeflüster“, bei dem ein selbst verfasstes und vertontes Gstanzl eingereicht wurde.',
    },
    {
        title: 'Lesen was geht!',
        source: 'König-Karlmann-Gymnasium',
        organizationSlug: 'kkg',
        url: 'https://www.koenig-karlmann-gymnasium.de/news/lesen-was-geht/',
        date: '2020-09-18',
        description: 'Bericht über die Teilnahme am Lesewettbewerb und die Bedeutung des Lesens.',
    },
];
