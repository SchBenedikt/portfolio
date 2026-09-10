export interface Project {
  title: string;
  slug: string;
  type: string;
  description: string;
  longDescription: string;
  image: string;
  aiHint: string;
  url: string;
  displayUrl?: string;
  embedWebsite?: boolean;
  tags: string[];
  date: string;
  category: string;
  details: {
    usage?: string;
    potential?: string;
  };
  blogSlug?: string;
  relatedArticleUrls?: string[];
}

export const projectData: Project[] = [
  {
    title: 'Wissenschaftswoche 2026',
    slug: 'wissenschaftswoche-2026',
    type: 'school',
    description: 'Eine wissenschaftliche Arbeit über nachhaltige Rechenzentren unter terrestrischen und extraterrestrischen Bedingungen – entstanden im Rahmen der Wissenschaftswoche 2026.',
    longDescription: `
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Zentrale Fragestellung</h3>
      <p>Mit der rasanten Entwicklung digitaler Technologien und dem Aufstieg künstlicher Intelligenz wächst der weltweite Bedarf an Rechenleistung in nie dagewesenen Ausmaß. Datenintensive Anwendungen verlagern sich zunehmend in Cloudsysteme und verlangen hochkomplexe und energieintensive Infrastrukturen.</p>
      
      <p class="mt-4">Diese Arbeit untersucht entlang der drei Säulen ökologischer, ökonomischer und sozialer Nachhaltigkeit die zentrale Frage, wie Rechenzentren sowohl unter terrestrischen als auch extraterrestrischen Bedingungen ganzheitlich nachhaltig gestaltet werden können, ohne die Leistungsfähigkeit, Verfügbarkeit und den langfristigen Wettbewerb zu beeinträchtigen.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Ökologische Dimension</h3>
      <p><b>Terrestrische Bedingungen:</b> Die Arbeit untersucht die Nachhaltigkeit der Energieversorgung, der thermischen Infrastruktur im Bezug auf sinnvolle Nutzung von Serverabwärme anhand verschiedener Beispiele und die neuen Arten nuklearer Energieversorgung von Rechenzentren großer Konzerne. Die zuvor vertieften Aspekte werden durch die umweltrelevanten Herausforderungen terrestrischer Rechenzentren mit alternativen Ansätzen für energieoptimierten Rechenzentren auf der Erde dargestellt.</p>
      
      <p class="mt-4"><b>Extraterrestrische Bedingungen:</b> Darüber hinaus befasst sich die ökologische Dimension der Nachhaltigkeit mit diversifizierten Entwicklungsansätzen für Rechenzentren in extraterrestrischen Umgebungen und der Vertiefung über Rechenzentren auf dem Planeten Mond. Erläutert werden dazu Methoden der Krisenbewältigung und der Möglichkeiten zur infrastrukturellen Absicherung vertiefend im Bezug auf Möglichkeiten von selbstheilenden Systemen.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Ökonomische Dimension</h3>
      <p>Die ökonomische Dimension der Nachhaltigkeit umfasst die Analyse des wirtschaftlichen Nutzens nachhaltiger Rechenzentren, insbesondere im Kontext terrestrischer Betriebsbedingungen.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Soziale Dimension</h3>
      <p>Die sozialen Dimensionen der Nachhaltigkeit beleuchten die Probleme, Möglichkeiten und Auswirkungen des Betriebs von Rechenzentren unter terrestrischen Bedingungen sowie deren Einfluss auf das unmittelbare Lebensumfeld der darum angesiedelten Bevölkerung. Hierbei stehen insbesondere die Beeinträchtigung der Lebensqualität auch, aber nicht nur durch Lärmbelastung, Luftverschmutzung und Wasserverbrauch im Fokus, die zu (in)direkten gesundheitlichen Schäden der Bevölkerung führen kann.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Zenodo Eintrag</h3>
      <p>Die wissenschaftliche Arbeit ist auf Zenodo archiviert und unter folgendem DOI verfügbar: <a href="https://zenodo.org/records/18378534" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">https://zenodo.org/records/18378534</a></p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Thematische Einordnung</h3>
      <p>Thematisch ist das Paper dem übergeordneten Fachbereich <i>Umwelt und Nachhaltigkeit</i> zuzuordnen und widmet sich innerhalb dieses Rahmens dem Schwerpunkt <i>nachhaltige Rechenzentren</i>. Der inhaltliche Fokus liegt hierbei auf dem Thema der <i>Strategien zur Energieeffizienz und Ressourcenschonung</i>.</p>
    `,
    image: 'https://placehold.co/1200x675/171717/9ca3af?text=Wissenschaftswoche+2026',
    aiHint: 'data center sustainability technology',
    url: 'https://w.xn--schchner-2za.de',
    displayUrl: 'w.schächner.de',
    embedWebsite: true,
    tags: ['Wissenschaft', 'Nachhaltigkeit', 'Rechenzentren', 'Forschung', 'Umwelt'],
    date: '2026-01-12',
    category: 'Wissenschaftliche Arbeit',
    details: {
      usage: 'Wissenschaftliche Arbeit im Rahmen der Wissenschaftswoche 2026 (12.01.2026 - 15.01.2026).'
    }
  },
  {
    title: 'P-Seminar Latein 2026',
    slug: 'p-seminar',
    type: 'school',
    description: 'Das P-Seminar im Fach Latein am König-Karlmann-Gymnasium Altötting.',
    longDescription: `
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Überblick</h3>
      <p class="text-xl md:text-2xl">Im Rahmen des P-Seminars im Fach Latein 2026 haben wir eine eigene Zeitschrift erstellt. Das Ergebnis ist im PDF-Dokument zu sehen.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Dokument</h3>
      <p>Das vollständige Dokument als PDF: <a href="/p-seminar.pdf" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">P-Seminar anzeigen</a>.</p>
    `,
    image: 'https://placehold.co/1200x675/171717/9ca3af?text=P-Seminar',
    aiHint: 'latin p seminar presentation',
    url: '/p-seminar.pdf#toolbar=0',
    embedWebsite: true,
    tags: [],
    date: '2026-06-01',
    category: 'Schulprojekt',
    details: {}
  },
  {
    title: 'Notio',
    slug: 'notio',
    type: 'private',
    description:
      'Eine webbasierte Applikation zur Verwaltung schulischer Leistungsdaten, nominiert für den Crossmedia-Wettbewerb des Bayerischen Rundfunks.',
    longDescription:
      `
      <p class="text-xl md:text-2xl">Notio ist eine webbasierte Applikation zur Verwaltung und Analyse schulischer Leistungsdaten, individuell konzipiert für Schüler an weiterführenden Schulen in Deutschland. Die Software bietet ein zentrales, übersichtlich gestaltetes Dashboard, über das alle relevanten Informationen auf einen Blick sichtbar sind.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Auszeichnung</h3>
      <p>Das Projekt wurde für den <strong>Crossmedia-Wettbewerb des Bayerischen Rundfunks</strong> nominiert.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Dashboard & Übersicht</h3>
      <p>Nach dem Login gelangt der Nutzer direkt in das persönliche Notencockpit. Hier werden der aktuelle Gesamtnotenschnitt (auf Basis gewichteter Fächer), die Anzahl der ordentlich geführten Fächer sowie sämtliche eingetragenen Leistungsnachweise angezeigt.</p>
      
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Lernmanagement & Aufgaben</h3>
      <p>Notio ermöglicht die strukturierte Erfassung von Lernzetteln, Aufgaben und anstehenden Prüfungen. Nutzer können ausstehende Arbeiten verwalten, erledigte Aufgaben abhaken und Lernfortschritte jederzeit einsehen.</p>
      
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Notenerfassung & -analyse</h3>
      <p>Leistungsnachweise wie Klassenarbeiten, Tests und Referate lassen sich mit wenigen Klicks erfassen. Die Software berechnet automatisch den Notendurchschnitt und visualisiert die Leistung auf Fach- und Gesamtebene. Die Benachrichtigungsfunktion ist derzeit noch in Entwicklung.</p>
      
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Sonderfunktionen</h3>
      <p>Notio legt besonderen Wert auf intuitive Bedienbarkeit, eine pflegeleichte Oberfläche und mobile Nutzbarkeit, sodass der Zugriff auch unterwegs jederzeit möglich ist.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Dokumentation</h3>
      <p>Eine ausführliche technische Dokumentation des Projekts kann <a href="https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/documents/Dokumentation_Notio.pdf" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">hier</a> eingesehen werden.</p>

       <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Datenschutz & Sicherheit</h3>
       <p>Sämtliche Nutzerdaten werden DSGVO-konform verarbeitet und sind vor unbefugtem Zugriff geschützt.</p>
      `,
    image: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/refs/heads/master/src/app/photos/Notio_Dashboard.png',
    url: 'https://notio.schächner.de',
    aiHint: 'education dashboard grades',
    tags: ['Web-App', 'Next.js', 'Datenvisualisierung', 'Bildung', 'Lernmanagement', 'Nominiert', 'Ausgezeichnet'],
    date: '2024-08-01',
    category: 'Web-Anwendung / EdTech',
    details: {
      usage: 'Digitale Noten- und Lernverwaltung für Schüler, Eltern und Lehrkräfte.'
    },
    blogSlug: 'notio-von-der-idee-zur-nominierten-lernplattform',
    relatedArticleUrls: [
      'https://www.br.de/medienkompetenzprojekte/inhalt/crossmedia/notio-einfach-besser-lernen-interactive-crossmedia-2025-gewinnerbeitrag-100.html',
      'https://www.koenig-karlmann-gymnasium.de/news/erneuter-erfolg-bei-crossmedia/',
      'https://www.km.bayern.de/meldung/30-jahre-crossmedia-nachwuchstalente-fuer-innovative-digitalprojekte-ausgezeichnet',
    ]
  },
  {
    title: '@judo_tus_toeging',
    slug: 'tus-toeging-judo-instagram',
    type: 'private',
    description: 'Verwaltung und Gestaltung des offiziellen Instagram-Kanals der Judoabteilung des TuS Töging. Der Verein wurde als „Top-Verein“ des Bayerischen Judo-Verbands ausgezeichnet.',
    longDescription: `
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Überblick</h3>
      <p>Dieses Projekt umfasst die Mitverwaltung und inhaltliche Gestaltung des Instagram-Kanals der TuS Töging Judoabteilung. Als „Top-Verein“ des Bayerischen Judo-Verbands (2024-2028) ist eine gepflegte Online-Präsenz wichtig, um Mitglieder zu informieren und neue Interessenten zu gewinnen.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Aufgaben & Inhalte</h3>
      <ul class="list-disc pl-6 space-y-2">
        <li>Regelmäßige Beiträge zu Vereinsaktivitäten, Ligabetrieb, Turnieren und dem Judo-Alltag.</li>
        <li>Pflege der Profil-Highlights (Jugend, Vereinsleben, 100 Jahre TuS, Gürtel, Training).</li>
        <li>Vorstellung von Trainingszeiten und Verlinkung aktueller Aktionen wie dem Ferienprogramm.</li>
        <li>Die Verwaltung erfolgt im Team, um eine kontinuierliche und vielfältige Berichterstattung zu gewährleisten.</li>
      </ul>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Bedeutung für das Portfolio</h3>
      <p>Das Projekt ist Teil meiner ehrenamtlichen Arbeit im Verein. Ich bin für die Gestaltung und Verwaltung des Kanals zuständig und arbeite dabei im Team.</p>
    `,
    image: 'https://github.com/SchBenedikt/portfolio/blob/master/src/app/photos/judo-instagram.png?raw=true',
    aiHint: 'judo sport',
    url: 'https://www.instagram.com/judo_tus_toeging/',
    tags: ['Social Media', 'Content Management', 'Vereinsarbeit', 'Community'],
    date: '2024-01-01',
    category: 'Social Media Management',
    details: {
      usage: 'Offizieller Social-Media-Kanal eines Sportvereins zur Mitgliedergewinnung und -information.',
      potential: 'Wachstum und Engagement durch gezielte Content-Strategien fördern.'
    }
  },
  {
    title: 'Meum Diarium',
    slug: 'meum-diarium',
    type: 'school',
    description: 'Ein preisgekröntes Crossmedia-Projekt, das Julius Cäsars Geschichte im Stil eines modernen Influencer-Blogs erzählt.',
    longDescription: `
        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Überblick</h3>
        <p>Das Projekt „Meum Diarium“ verbindet Geschichte, Latein und moderne Medien: Auf der Website berichtet Gaius Julius Caesar als Blogger-Influencer im Stil eines Tagebuchs aus seinem Leben. Entstanden ist die Seite im Rahmen des Schulunterrichts; sie wurde mit dem Deutschen Multimediapreis mb21 und Preisen beim Crossmedia-Wettbewerb ausgezeichnet. Neben den Blogeinträgen gibt es Presseartikel, eine Übersicht der Medienresonanz und einen kleinen Shop (Merch).</p>
        
        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Schwerpunkte</h3>
        <ul class="list-disc pl-6 space-y-2">
            <li><b>Tagebucheinträge aus Cäsars Perspektive:</b> Authentisch und mit Witz wird antike Geschichte modern, jugendnah und oftmals mit Bezügen zu aktuellen Persönlichkeiten (z.B. Elon Musk) erzählt.</li>
            <li><b>Multimediale Vielfalt:</b> Integration von Blogbeiträgen, Wiki-Texten, Datenbanken, Bildmaterial, KI-generierten Inhalten und Interaktionstools (z.B. ein Caesar-KI-Chat).</li>
            <li><b>Pressebereich:</b> Eine ausführliche Dokumentation zahlreicher Medienberichte, Interviews und Pressestimmen, die die kreative Leistung und das gesellschaftliche Interesse an dem Projekt hervorheben.</li>
            <li><b>Merchandise-Shop:</b> Unter „Meum Merch“ können Besucher originelle Produkte mit Caesar-Bezug kaufen – von T-Shirts bis zu Tassen, um das Projekt zu unterstützen.</li>
        </ul>
        
        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Erfolge und Anerkennung</h3>
         <ul class="list-disc pl-6 space-y-2">
            <li>Hervorragend aufgenommen von der Jury des Deutschen Multimediapreises ("herausragende Detailverliebtheit und Witz", "authentisches, multimediales Erlebnis, das antike und moderne Welt verbindet").</li>
            <li>Umfangreiche Berichterstattung in überregionalen Medien inkl. Bayerischem Rundfunk, lokalen Zeitungen und Kulturanbietern.</li>
            <li>Vermittlung historischer Themen für eine junge Zielgruppe in einem medialen Kontext.</li>
        </ul>

        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Alleinstellungsmerkmale</h3>
        <ul class="list-disc pl-6 space-y-2">
            <li>Historische Inhalte werden mit popkulturellen und gesellschaftlichen Themen verflochten.</li>
            <li>Vielseitig: Tagebuch, interaktive Website, Presseportal und Merch-Store in einem.</li>
            <li>Eigenständig auf einem selbst betriebenen Server umgesetzt.</li>
        </ul>

        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Bedeutung für das Portfolio</h3>
        <p>Zeigt, wie ein historisches Thema mit modernen Medien aufbereitet werden kann. Die Website ist ein größeres Projekt von meinen Zwillingsbruder Vinzenz und mir, das im Unterricht umgesetzt wurde und große Resonanz bekam.</p>

        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Pressespiegel (Auswahl)</h3>
        <ul class="list-disc pl-6 space-y-2">
            <li><a href="https://www.mb21.de/wettbewerbsjahr_2024.html?articles=meum-diarium" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Deutscher Multimediapreis (mb21): Jurybegründung</a></li>
            <li><a href="https://www.br.de/medienkompetenzprojekte/inhalt/crossmedia/tagebuch-caesars-heute-feldherr-als-influencer-textbased-crossmedia-2024-gewinnerbeitrag-100.html" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">Bayerischer Rundfunk (BR): Bericht und Laudatio</a></li>
            <li><a href="https://www.koenig-karlmann-gymnasium.de/news/mit-caesars-tagebuch-den-1-preis-geholt/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">König-Karlmann-Gymnasium: Bericht zum 1. Preis</a></li>
            <li><a href="https://www.koenig-karlmann-gymnasium.de/news/ein-feldherr-wird-wieder-lebendig/" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">König-Karlmann-Gymnasium: Weitere Berichterstattung</a></li>
        </ul>
    `,
    image: 'https://technik.xn--schchner-2za.de/wp-content/uploads/2025/08/Meum-Diarium.png',
    url: 'https://caesar.schächner.de',
    aiHint: 'caesar roman history blog',
    tags: ['Crossmedia', 'Storytelling', 'Ausgezeichnet', 'UI/UX', 'KI-Chatbot'],
    date: '2024-05-10',
    category: 'Schulprojekt / Crossmedia',
    details: {
      usage: 'Multimediales Storytelling mit Blog, KI-Chat und Merchandise.',
      potential: 'Kombiniert Geschichte und moderne Medientechnologien.'
    },
    relatedArticleUrls: [
      'https://www.mb21.de/wettbewerbsjahr_2024.html?articles=meum-diarium',
      'https://www.br.de/medienkompetenzprojekte/inhalt/crossmedia/tagebuch-caesars-heute-feldherr-als-influencer-textbased-crossmedia-2024-gewinnerbeitrag-100.html',
      'https://www.koenig-karlmann-gymnasium.de/news/mit-caesars-tagebuch-den-1-preis-geholt/',
      'https://www.pnp.de/lokales/landkreis-altoetting/vertreterin-der-bundesregierung-ehrt-in-dresden-vinzenz-und-benedikt-schaechner-aus-pleiskirchen-17504456',
    ]
  },
  {
    title: 'Medienscouts KKG',
    slug: 'medienscouts-kkg',
    type: 'school',
    description:
      'Ein Schülerprojekt am König-Karlmann-Gymnasium Altötting (KKG): Schülerinnen und Schüler helfen bei digitalen Fragen und fördern Medienkompetenz.',
    longDescription:
      `
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Überblick</h3>
      <p>Medienscouts am KKG ist ein Projekt von und für Schülerinnen und Schüler, das es sich zur Aufgabe gemacht hat, digitale Kompetenzen zu fördern, Hilfestellung im Umgang mit Technik und Digitalität zu bieten und für ein sicheres Miteinander im Netz zu sorgen. Die Plattform vermittelt praxisnahe Tipps – insbesondere für die immer beliebter werdenden Digitalklassen – und bietet eine Anlaufstelle für technische, didaktische und sicherheitsrelevante Fragestellungen im Schulalltag.</p>
      
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Schwerpunkte</h3>
       <ul class="list-disc pl-6 space-y-2">
            <li><b>Schüler-helfen-Schülern-Prinzip:</b> Medienscouts geben als speziell ausgebildete Schülerinnen und Schüler ihr Wissen an Mitschüler, Lehrkräfte und Eltern weiter.</li>
            <li><b>Digitalklasse:</b> Informationen und spezifische Unterstützung rund um das Konzept der Digitalklassen ab Jahrgangsstufe 8. Schwerpunkt auf dem Umgang mit digitalen Endgeräten (z.B. Windows 2-in-1-Geräte), Gerätenutzung im Unterricht und Herausforderungen beim digitalen Lernen.</li>
            <li><b>Hilfestellung & Schulungen:</b> Unterstützung bei technischen Problemen, individuelle Beratung bei digitalen Fragen und Sensibilisierung für Gefahren und den verantwortungsvollen Umgang im Internet.</li>
            <li><b>Interaktive Tools:</b> Ein neu eingeführter Chatbot unterstützt bei Routinefragen; für spezifische Probleme können direkt Screenshots und Bilder hochgeladen werden, um gezielte Hilfe zu erhalten.</li>
            <li><b>Content und Aktionen:</b> Laufend neue Artikel, Tipps, Workshops und Aktionen. Aktuell bereits fast 40 hilfreiche Blogartikel zu digitalen Themen, Microsoft- und Office-Tipps, sowie News rund um digitale Bildung am KKG.</li>
        </ul>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Alleinstellungsmerkmale</h3>
        <ul class="list-disc pl-6 space-y-2">
            <li>Ausgebildete Schülerinnen und Schüler geben ihr Wissen an Mitschüler, Lehrkräfte und Eltern weiter.</li>
            <li>Kombination aus persönlicher Beratung, interaktiven Online-Tools und regelmäßiger Wissensvermittlung über den Schulblog.</li>
            <li>Fokus auf digitale Medienbildung im Unterricht und den sicheren Umgang mit dem Internet.</li>
        </ul>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Bedeutung für das Portfolio</h3>
        <p>Ich bin Mitgründer und Administrator der Medienscouts am KKG und kümmere mich um Technik, Inhalte und die Organisation der Workshops und Schulungen.</p>
      `,
    image: 'https://technik.xn--schchner-2za.de/wp-content/uploads/2025/08/Medienscouts.png',
    url: 'https://medienscouts-kkg.de/',
    aiHint: 'students digital help school',
    tags: ['Chatbot', 'Schulprojekt', 'Bildung'],
    date: '2023-09-01',
    category: 'Web-Anwendung / Bildung',
    details: {
      usage: 'Schulinterne Plattform für Medienkompetenz und technischen Support.',
      potential: 'Direkte Unterstützung für Digitalklassen und Sensibilisierung für Online-Sicherheit.'
    }
  },
  {
    title: 'Technik Schächner',
    slug: 'technik-blog',
    type: 'private',
    description: 'Eine digitale Plattform, die technische Anwendungen, Tools und persönliche Experimente aus den Bereichen Programmierung, Cloud und Automatisierung bündelt.',
    longDescription: `
        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Überblick</h3>
        <p>technik.schächner.de ist eine Sammlung meiner eigenen technischen Anwendungen, Tools und Experimente aus den Bereichen Programmierung, Cloud und Automatisierung – ohne kommerziellen Hintergrund.</p>
        
        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Schwerpunkte</h3>
        <ul class="list-disc pl-6 space-y-2">
            <li>Sammlung und Präsentation eigener Softwareentwicklungen und Tools.</li>
            <li>Umsetzung von Webanwendungen mit aktuellen Technologien (z. B. Python, JavaScript).</li>
            <li>Experimentierplattform zur Demonstration technischer Lösungen und innovativer Ansätze.</li>
            <li>Bereich für Dokumentation und Wissenstransfer zu Technikthemen sowie IT-Education, insbesondere für junge Technikinteressierte.</li>
            <li>Sichere Bereitstellung von nützlichen Scripts, Webanwendungen und Anleitungen für die Community – ohne kommerziellen Hintergrund.</li>
        </ul>

        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Alleinstellungsmerkmale</h3>
         <ul class="list-disc pl-6 space-y-2">
            <li>Eigenständig entwickelt, praxisnah und ohne kommerziellen Hintergrund.</li>
            <li>Stetige Erweiterung durch neue Projekte und Features basierend auf aktuellen IT-trends.</li>
            <li>Integration in das persönliche Portfolio von Benedikt Schächner und Bezug zur digitalen Bildung sowie zu Open-Source.</li>
            <li>Plattform dient auch der eigenen Weiterbildung, Förderung von Teamwork und Motivation zur aktiven Mitgestaltung in digitalen Communities.</li>
        </ul>

        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Bedeutung für das Portfolio</h3>
        <p>Die Plattform ist meine persönliche Sammlung für eigene Projekte und Experimente. Sie dient mir als Weiterbildung und ich möchte damit auch junge Technikinteressierte erreichen.</p>
    `,
    image: 'https://technik.xn--schchner-2za.de/wp-content/uploads/2025/08/Technik.png',
    url: 'https://technik.xn--schchner-de/',
    aiHint: 'developer tools selfhosting blog',
    tags: ['Web-Anwendungen', 'Python', 'JavaScript', 'Self-Hosting', 'Docker', 'Open-Source'],
    date: '2024-09-01',
    category: 'Entwicklerplattform / Blog',
    details: {
      usage: 'Persönliche Entwicklerplattform und Experimentierfeld für neue Technologien.',
      potential: 'Fokus auf Open-Source, Self-Hosting und Wissensvermittlung für die Tech-Community.'
    }
  },
];


