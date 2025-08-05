
export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  description: string;
  aiHint: string;
}

export const galleryData: GalleryImage[] = [
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/IMG_7331.jpg',
    width: 600,
    height: 800,
    alt: 'Porträtfoto von Benedikt Schächner',
    title: 'Porträt',
    description: 'Ein professionelles Porträtfoto.',
    aiHint: 'portrait person'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/IMG_1677.JPG',
    width: 600,
    height: 800,
    alt: 'Benedikt Schächner bei einer Präsentation',
    title: 'Vortrag',
    description: 'Bei einem Vortrag über Technik-Themen.',
    aiHint: 'person presentation'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/IMG_8516.JPG',
    width: 800,
    height: 600,
    alt: 'Benedikt Schächner in legerer Kleidung',
    title: 'Lässig',
    description: 'Ein entspannter Moment.',
    aiHint: 'person casual'
  },
  {
    src: 'https://raw.githubusercontent.com/SchBenedikt/portfolio/master/src/app/photos/benedikt/IMG_8836.JPG',
    width: 600,
    height: 800,
    alt: 'Benedikt Schächner im Anzug',
    title: 'Formell',
    description: 'Bereit für das nächste Event.',
    aiHint: 'person formal'
  },
];
