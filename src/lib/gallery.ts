
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  description: string;
  location: string;
  date: string;
  aiHint: string;
}

export const galleryData: GalleryImage[] = [
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/IMG_7331.jpg',
    width: 600,
    height: 800,
    alt: 'Porträtfoto von Benedikt Schächner',
    title: 'Porträt',
    description: 'Ein professionelles Porträtfoto, aufgenommen für offizielle Anlässe und Publikationen.',
    location: 'Fotostudio, München',
    date: '2024-05-15',
    aiHint: 'portrait person'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/IMG_1677.JPG',
    width: 600,
    height: 800,
    alt: 'Benedikt Schächner bei einer Präsentation',
    title: 'Vortrag',
    description: 'Während eines Lightning Talks über Nextcloud-Sicherheit auf der Nextcloud Conference in Berlin.',
    location: 'Nextcloud Conference, Berlin',
    date: '2024-09-14',
    aiHint: 'person presentation'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/IMG_8516.JPG',
    width: 800,
    height: 600,
    alt: 'Benedikt Schächner in legerer Kleidung',
    title: 'Lässig',
    description: 'Ein entspannter Moment, aufgenommen im Englischen Garten in München.',
    location: 'Englischer Garten, München',
    date: '2024-06-20',
    aiHint: 'person casual'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/IMG_8836.JPG',
    width: 600,
    height: 800,
    alt: 'Benedikt Schächner im Anzug',
    title: 'Preisverleihung',
    description: 'Formelle Kleidung bei der Preisverleihung des Deutschen Multimediapreises in Dresden.',
    location: 'Deutscher Multimediapreis, Dresden',
    date: '2024-11-23',
    aiHint: 'person formal'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/Benedikt%20Scha%CC%88chner%20Download%20(1).jpeg',
    width: 600,
    height: 800,
    alt: 'Weiteres Porträtfoto',
    title: 'Porträt II',
    description: 'Ein weiteres professionelles Porträt aus einem Shooting in Töging.',
    location: 'Fotostudio, Töging',
    date: '2023-10-01',
    aiHint: 'portrait man'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/Benedikt%20Scha%CC%88chner%20Download%20(2).jpeg',
    width: 600,
    height: 800,
    alt: 'Benedikt Schächner im Freien',
    title: 'Outdoor',
    description: 'Ein Outdoor-Foto, das bei einem Spaziergang in der Natur entstanden ist.',
    location: 'In der Nähe von Pleiskirchen',
    date: '2024-07-10',
    aiHint: 'person outdoor'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/Benedikt%20Scha%CC%88chner%20Download%20(3).jpeg',
    width: 600,
    height: 800,
    alt: 'Porträtfoto von Benedikt Schächner',
    title: 'Nahaufnahme',
    description: 'Eine Nahaufnahme, die den Fokus auf den Gesichtsausdruck legt.',
    location: 'Fotostudio, München',
    date: '2024-05-15',
    aiHint: 'person closeup'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/Benedikt%20Scha%CC%88chner%20Download%20(4).jpeg',
    width: 800,
    height: 600,
    alt: 'Benedikt Schächner bei einer Veranstaltung',
    title: 'Networking',
    description: 'Im Gespräch auf einer Fachveranstaltung für junge Führungskräfte.',
    location: 'Young Leaders Akademie',
    date: '2023-11-18',
    aiHint: 'person event'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/Benedikt%20Scha%CC%88chner%20Download.jpeg',
    width: 600,
    height: 800,
    alt: 'Profilbild von Benedikt Schächner',
    title: 'Profil',
    description: 'Ein klassisches Profilbild für berufliche Netzwerke und Online-Profile.',
    location: 'Fotostudio, Töging',
    date: '2023-10-01',
    aiHint: 'person profile'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/Benedikt%20Scha%CC%88chner%20Suche.jpeg',
    width: 800,
    height: 600,
    alt: 'Benedikt Schächner bei der Arbeit',
    title: 'Fokussiert',
    description: 'Konzentriert bei der Arbeit an einem neuen Web-Projekt am Schreibtisch.',
    location: 'Home Office',
    date: '2024-08-05',
    aiHint: 'person working'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/Benedikt%20Scha%CC%88chner.jpeg',
    width: 600,
    height: 800,
    alt: 'Ein weiteres Foto von Benedikt Schächner',
    title: 'Klassisch',
    description: 'Ein klassisches Foto in Schwarz-Weiß-Optik für einen zeitlosen Look.',
    location: 'Fotostudio, München',
    date: '2024-05-15',
    aiHint: 'person classic'
  },
   {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/Download%20(1).jpeg',
    width: 800,
    height: 600,
    alt: 'Benedikt Schächner in Aktion',
    title: 'Aktion',
    description: 'Ein dynamisches Bild während einer interaktiven Workshop-Session mit Medienscouts.',
    location: 'König-Karlmann-Gymnasium',
    date: '2024-03-22',
    aiHint: 'person action'
  },
];
