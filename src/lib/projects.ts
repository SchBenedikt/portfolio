
export const projectData = [
  {
    title: 'Notio',
    slug: 'notio',
    description:
      'Eine webbasierte Applikation zur Verwaltung und Analyse schulischer Leistungsdaten, individuell konzipiert für Schüler an weiterführenden Schulen in Deutschland.',
    longDescription:
      `
      <p class="text-xl md:text-2xl">Notio ist eine webbasierte Applikation zur Verwaltung und Analyse schulischer Leistungsdaten, individuell konzipiert für Schüler an weiterführenden Schulen in Deutschland. Die Software bietet ein zentrales, übersichtlich gestaltetes Dashboard, über das alle relevanten Informationen auf einen Blick sichtbar sind.</p>

      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Dashboard & Übersicht</h3>
      <p>Nach dem Login gelangt der Nutzer direkt in das persönliche Notencockpit. Hier werden der aktuelle Gesamtnotenschnitt (auf Basis gewichteter Fächer), die Anzahl der ordentlich geführten Fächer sowie sämtliche eingetragenen Leistungsnachweise angezeigt.</p>
      
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Lernmanagement & Aufgaben</h3>
      <p>Notio ermöglicht die strukturierte Erfassung von Lernzetteln, Aufgaben und anstehenden Prüfungen. Nutzer können ausstehende Arbeiten verwalten, erledigte Aufgaben abhaken und Lernfortschritte jederzeit einsehen.</p>
      
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Notenerfassung & -analyse</h3>
      <p>Leistungsnachweise wie Klassenarbeiten, Tests und Referate lassen sich mit wenigen Klicks erfassen. Die Software berechnet automatisch den Notendurchschnitt und visualisiert die Leistung auf Fach- und Gesamtebene. Die Benachrichtigungsfunktion ist derzeit noch in Entwicklung.</p>
      
      <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Sonderfunktionen</h3>
      <p>Notio legt besonderen Wert auf intuitive Bedienbarkeit, eine pflegeleichte Oberfläche und mobile Nutzbarkeit, sodass der Zugriff auch unterwegs jederzeit möglich ist.</p>

       <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Datenschutz & Sicherheit</h3>
       <p>Sämtliche Nutzerdaten werden DSGVO-konform verarbeitet und sind vor unbefugtem Zugriff geschützt.</p>
      `,
    image: 'https://technik.xn--schchner-2za.de/wp-content/uploads/2025/08/Notio_Dashboard.png',
    url: 'https://notio.schächner.de',
    tags: ['Web-App', 'Next.js', 'Datenvisualisierung', 'Bildung', 'Lernmanagement'],
    date: '2024-08-01',
    category: 'Web-Anwendung / EdTech',
    details: {
      usage: 'Notio richtet sich in erster Linie an Schüler und Schülerinnen, kann aber auch von Eltern und Lehrkräften genutzt werden. Die Plattform lässt sich flexibel an individuelle Anforderungen und Klassenstufen anpassen.',
      strengths: 'Klare Fokuslegung auf die wichtigsten Bedürfnisse im Schulalltag: Übersicht, Transparenz und Einfachheit. Schneller Zugriff auf Lerndaten, automatische Auswertungen und eine unkomplizierte Benutzeroberfläche zeichnen Notio aus.',
      potential: 'Zukünftige Versionen könnten durch Kollaborationsfunktionen, tiefere Datenanalysen, Schnittstellen zu externen Tools (wie z.B. Google Kalender) oder vertiefte Kommunikationsmöglichkeiten erweitert werden.'
    }
  },
  {
    title: 'Meum Diarium',
    slug: 'meum-diarium',
    description:
      'Ein kreatives Crossmedia-Projekt, das Julius Cäsars Feldherr-Geschichte im Stil eines modernen Influencer-Blogs erzählt.',
    longDescription:
      '„Meum Diarium – Ein Feldherr als Influencer“ ist ein preisgekröntes Schulprojekt, das Cäsars "De Bello Gallico" als Blog-Posts, Interviews und Social-Media-Storys modern interpretiert. Das Projekt gewann den Hauptpreis beim Deutschen Multimedia-Preis mb21 2024 und wurde beim Crossmedia-Wettbewerb des Bayerischen Rundfunks ausgezeichnet, indem es historische Inhalte mit moderner Netzkultur kreativ verbindet.',
    image: 'https://technik.xn--schchner-2za.de/wp-content/uploads/2025/08/Meum-Diarium.png',
    url: 'https://www.br.de/medienkompetenz/crossmedia-wettbewerb/gewinner-crossmedia-2024-meum-diarium-100.html',
    tags: ['Crossmedia', 'Storytelling', 'Ausgezeichnet', 'UI/UX'],
    date: '2024-05-10',
    category: 'Schulprojekt / Crossmedia',
  },
  {
    title: 'Medienscouts KKG',
    slug: 'medienscouts-kkg',
    description:
      'Als Teil der Medienscouts am König-Karlmann-Gymnasium unterstütze ich Mitschüler beim sicheren Umgang mit digitalen Medien.',
    longDescription:
      'Auf medienscouts-kkg.de stellen wir als Gruppe digitale Werkzeuge vor, organisieren Workshops und beraten zu Datenschutz und Online-Sicherheit. Wir unterstützen die Digitalklassen, in denen ab der 8. Klasse papierlos gearbeitet wird, und stehen als Ansprechpartner für Schüler, Lehrer und Eltern zur Verfügung, um die digitale Bildung und Sicherheit an der Schule zu fördern.',
    image: 'https://technik.xn--schchner-2za.de/wp-content/uploads/2025/08/Medienscouts.png',
    url: 'https://medienscouts-kkg.de/',
    tags: ['Next.js', 'Chatbot', 'Schulprojekt', 'CI/CD'],
    date: '2023-09-01',
    category: 'Web-Anwendung / Bildung',
  },
  {
    title: 'Technik Schächner',
    slug: 'technik-blog',
    description: 'Eine digitale Plattform, die technische Anwendungen, Tools und persönliche Experimente aus den Bereichen Programmierung, Cloud und Automatisierung bündelt.',
    longDescription: `
        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Überblick</h3>
        <p>technik.schächner.de dient als digitales Schaufenster für eigenständig entwickelte Webprojekte, Open-Source-Beiträge und technische Demonstrationslösungen. Es ist eine Experimentierplattform, die innovative Ansätze und praktische Lösungen für die Tech-Community bereitstellt.</p>
        
        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Schwerpunkte</h3>
        <ul class="list-disc pl-6 space-y-2">
            <li>Sammlung und Präsentation eigener Softwareentwicklungen und Tools.</li>
            <li>Umsetzung von Webanwendungen mit aktuellen Technologien wie Python und JavaScript.</li>
            <li>Dokumentation und Wissenstransfer zu Technikthemen und IT-Education.</li>
            <li>Sichere Bereitstellung von Scripts, Apps und Anleitungen ohne kommerziellen Hintergrund.</li>
        </ul>

        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Alleinstellungsmerkmale</h3>
        <p>Das Projekt ist authentisch, praxisnah und von Grund auf eigenständig entwickelt. Es wird stetig durch neue Projekte erweitert, die auf aktuellen IT-Trends basieren und die eigene Weiterbildung sowie die aktive Mitgestaltung in digitalen Communities fördern.</p>

        <h3 class="text-2xl font-bold font-headline mt-6 mb-3">Bedeutung für das Portfolio</h3>
        <p>Dieses Projekt unterstreicht die Fähigkeit, Herausforderungen mit modernen Werkzeugen kreativ zu lösen, kontinuierlich zu lernen und eigene Ideen selbstständig umzusetzen. Es zeigt ein tiefes Engagement für Technik, Wissensvermittlung und die Open-Source-Community.</p>
    `,
    image: 'https://technik.xn--schchner-2za.de/wp-content/uploads/2025/08/Technik.png',
    url: 'https://technik.xn--schchner-2za.de/',
    tags: ['Web-Anwendungen', 'Python', 'JavaScript', 'Self-Hosting', 'Docker', 'Open-Source'],
    date: '2024-09-01',
    category: 'Entwicklerplattform / Blog',
  },
];
