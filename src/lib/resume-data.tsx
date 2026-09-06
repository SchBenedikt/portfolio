import { Award, Briefcase, Users, Code, Rocket, School, Trophy } from 'lucide-react';

export const timelineEvents = [
    {
        date: "Seit Juli 2026",
        title: "Mitglied im Jugendbeirat",
        organization: "Deutscher Multimediapreis mb21",
        description: "Mitglied im Jugendbeirat des Deutschen Multimediapreis mb21.",
        icon: <Users/>,
        isCurrent: true
    },
    {
        date: "29. Aug. - 05. Sep. 2026",
        title: "Dan-Lehrgang Inzell",
        subtitle: "1. Dan Judo",
        organization: "Bayerischer Judo-Verband e.V.",
        description: "Erfolgreicher Abschluss des 1. Dan im Judo beim DAN-Kompakt-Wochen-Lehrgang des Bayerischen Judo-Verbands in Inzell.",
        icon: <Trophy/>,
    },
    {
        date: "13. - 29. Aug. 2026",
        title: "Deutsche SchülerAkademie",
        subtitle: "Kurs 1.3 – 7 Emotionen für 1 Mensch",
        organization: "Bildung & Begabung e.V.",
        organizationSlug: "dsa",
        description: "Psychologische Studie über Gefühle, Stimmung und Affekt am Landesgymnasium für Hochbegabte Schwäbisch Gmünd.",
        icon: <School/>,
    },
    {
        date: "19. Juli 2026",
        title: "3. Platz beim Schach-Jugendopen",
        organization: "Schachklub Töging e. V.",
        description: "Dritter Platz in der Altersklasse U18 beim Jugendopen 2026 des Schachklub Töging.",
        icon: <Award />
    },
    {
        date: "13. Juli 2026",
        title: "Dies Academicus",
        organization: "König-Karlmann-Gymnasium",
        description: "Teilnahme am Dies Academicus am König-Karlmann-Gymnasium mit Besuch des Oberlandesgerichts München.",
        icon: <School/>
    },
    {
        date: "12. - 15. Jan. 2026",
        title: "Wissenschaftswoche 2026",
        organization: "König-Karlmann-Gymnasium",
        description: "Wissenschaftliche Arbeit über nachhaltige Rechenzentren unter terrestrischen und extraterrestrischen Bedingungen, archiviert auf Zenodo.",
        icon: <Award />,
        projectSlug: 'wissenschaftswoche-2026'
    },
    {
        date: "20. Nov. 2025",
        title: "Crossmedia-Preis, Sparte \"Interactive\"",
        organization: "Bayerischer Rundfunk",
        description: "Gewinn des Crossmedia-Preises in der Sparte \"interactive\" mit dem Projekt \"Notio\".",
        icon: <Award />,
        projectSlug: 'notio'
    },
    {
        date: "02. - 08. Sep. 2025",
        title: "Youth Exchange Projekt 2025",
        organization: "Ars Electronica",
        description: "Teilnahme am internationalen Jugendaustausch in Linz bei der Ars Electronica mit Teilnehmern aus Ungarn, Rumänien, Österreich und Finnland, zusammen mit meinem Zwillingsbruder Vinzenz.",
        icon: <Users/>
    },
    {
        date: "Seit April 2025",
        title: "Schriftführer",
        organization: "Judoabteilung TuS Töging",
        description: "Seit April 2025 bin ich Schriftführer der Judoabteilung vom TuS Töging.",
        icon: <Users/>,
        isCurrent: true
    },
    {
        date: "April 2025",
        title: "Freiwilliges Schülerpraktikum",
        organization: "OMV Burghausen",
        description: "Einblicke in Petrochemie, Erdölverarbeitung und Unternehmensstrukturen.",
        icon: <Briefcase/>
    },
    {
        date: "Nov 2024",
        title: "Hauptpreis, Deutscher Multimedia-Preis mb21",
        organization: "Deutscher Multimediapreis mb21",
        description: "Gewinn des Hauptpreises (Altersgruppe 11-15) für das Projekt „Meum Diarium“ zusammen mit Vinzenz Schächner.",
        icon: <Award />,
        projectSlug: 'meum-diarium'
    },
    {
        date: "Nov 2024",
        title: "1. Platz, Crossmedia-Wettbewerb",
        organization: "Bayerischer Rundfunk",
        description: "Auszeichnung für „Meum Diarium“ in der Sparte „textbased“ für Idee, Umsetzung und mediale Aufbereitung.",
        icon: <Award />,
        projectSlug: 'meum-diarium'
    },
     {
        date: "Sep 2024",
        title: "Lightning Talk, Nextcloud Conference",
        organization: "Nextcloud Conference",
        description: "Vortrag über Nextcloud-Security, Selfhosting und den Schutz sensibler Daten vor einer internationalen Community.",
        icon: <Rocket/>
    },
    {
        date: "Juli 2024",
        title: "Praktikum Informatik & Netzwerktechnik",
        organization: "Rohde & Schwarz Cybersecurity",
        description: "Praktische Arbeit an IT-Projekten und Einblicke in die Netzwerksicherheit.",
        icon: <Briefcase/>
    },
    {
        date: "Seit Aug 2022",
        title: "Gründer",
        organization: "Technik Schächner",
        description: "Bildung",
        icon: <Code/>,
        isCurrent: true
    },
    {
        date: "Seit 2023",
        title: "Administrator & Mitgründer der MedienScouts",
        organization: "König-Karlmann-Gymnasium",
        description: "Technische und didaktische Leitung von Schulinitiativen, Live-Workshops und Peer-to-Peer-Schulungen zur Medienkompetenz.",
        icon: <Users/>,
        projectSlug: 'medienscouts-kkg',
        isCurrent: true
    },
    {
        date: "Seit 2019",
        title: "Schüler am König-Karlmann-Gymnasium",
        organization: "König-Karlmann-Gymnasium",
        description: "Aktive Teilnahme an Digitalklassen, Medienscouts und MINT-Angeboten.",
        icon: <School/>,
        isCurrent: true
    }
];

export const certificates = [
    {
        title: "1. Dan Judo",
        organization: "Bayerischer Judo-Verband e.V.",
        date: "Sep. 2026",
        skills: ["1. Dan", "Schwarzgurt", "Judo"],
        description: "Erfolgreiche Graduierung zum 1. Dan im Judo beim DAN-Kompakt-Wochen-Lehrgang in Inzell.",
        isCurrent: true
    },
    {
        title: "JD-Kampfrichter",
        organization: "Bayerischer Judo-Verband e.V.",
        date: "März 2026",
        skills: ["Kampfrichter", "Judo"],
        description: "JD-Kampfrichter beim Bayerischen Judo-Verband seit dem 29. März 2026.",
        isCurrent: true
    },
    {
        title: "Judo-Kampfrichter",
        organization: "Bayerischer Judo-Verband e.V.",
        date: "Okt. 2025",
        skills: ["Kampfrichter", "Lizenz J", "Judo"],
        description: "Ausbildung zum Jugend-Kampfrichter mit Erwerb der Lizenz J im Rahmen einer Maßnahme des Judobezirks Oberbayern.",
    },
    {
        title: "Mediator",
        organization: "König-Karlmann-Gymnasium",
        date: "Feb. 2024 - Juli 2025",
        skills: ["Mediation", "Streitschlichtung", "Konfliktlösung", "Konfliktprävention"],
        description: "Im Rahmen des Wahlunterrichts Mediation eine 35-stündige Ausbildung zum Mediator absolviert.",
        isCurrent: true
    },
    {
        title: "Großes Latinum",
        organization: "König-Karlmann-Gymnasium",
        date: "Juli 2025",
        skills: ["Latein"],
    },
    {
        title: "Königsdiplom Schach",
        organization: "Schachklub Töging e. V.",
        date: "Juli 2025",
        skills: ["Schach"]
    },
    {
        title: "Strafrechtsseminar",
        organization: "Friedrich-Alexander-Universität Erlangen-Nürnberg",
        date: "Nov. 2024",
        skills: ["Jura", "Strafrecht"]
    },
    {
        title: "Kleines Latinum",
        organization: "König-Karlmann-Gymnasium",
        date: "Juli 2024",
        skills: ["Latein"]
    },
    {
        title: "Young Leaders Akademie",
        organization: "young leaders GmbH",
        date: "Nov. 2023",
        skills: ["Mimik-Resonanz Training"]
    },
    {
        title: "1. Hilfe Kurs",
        organization: "Bayerisches Rotes Kreuz (BRK)",
        date: "Sept. 2023",
        skills: ["Erste Hilfe"]
    },
    {
        title: "Lerntrainerseminar",
        organization: "König-Karlmann-Gymnasium",
        date: "Juli 2023",
        skills: ["Nachhilfe", "Lerntrainer"]
    },
    {
        title: "Trainerassistent Judo",
        organization: "Bayerischer Judo-Verband e.V.",
        date: "Juni 2023",
        skills: ["Trainerassistent"]
    },
    {
        title: "Bauerndiplom",
        organization: "Schachklub Töging e. V.",
        date: "03. Jan. 2020",
        skills: ["Schach"]
    },
    {
        title: "Springerdiplom",
        organization: "Schachklub Töging e. V.",
        date: "25. Sep. 2020",
        skills: ["Schach"]
    },
    {
        title: "Läuferdiplom",
        organization: "Schachklub Töging e. V.",
        date: "17. Sep. 2021",
        skills: ["Schach"]
    },
    {
        title: "Turmdiplom",
        organization: "Schachklub Töging e. V.",
        date: "09. Dez. 2022",
        skills: ["Schach"]
    }
];