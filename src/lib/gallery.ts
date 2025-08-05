
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
    src: 'https://placehold.co/600x800.png',
    width: 600,
    height: 800,
    alt: 'Porträtfoto von Benedikt Schächner',
    title: 'Porträt',
    description: 'Ein professionelles Porträtfoto.',
    aiHint: 'portrait person'
  },
  {
    src: 'https://placehold.co/800x600.png',
    width: 800,
    height: 600,
    alt: 'Benedikt Schächner bei der Arbeit an einem Projekt',
    title: 'Bei der Arbeit',
    description: 'Fokussiert bei der Entwicklung einer neuen Anwendung.',
    aiHint: 'person working'
  },
  {
    src: 'https://placehold.co/600x600.png',
    width: 600,
    height: 600,
    alt: 'Benedikt Schächner in der Natur',
    title: 'Naturverbunden',
    description: 'Entspannung und Inspiration in der Natur finden.',
    aiHint: 'person nature'
  },
  {
    src: 'https://placehold.co/600x800.png',
    width: 600,
    height: 800,
    alt: 'Benedikt Schächner in einer städtischen Umgebung',
    title: 'Urban Explorer',
    description: 'Unterwegs in der Stadt, immer auf der Suche nach neuen Ideen.',
    aiHint: 'person city'
  },
  {
    src: 'https://placehold.co/800x600.png',
    width: 800,
    height: 600,
    alt: 'Benedikt Schächner beim Judo',
    title: 'Sportlicher Ausgleich',
    description: 'Konzentration und Disziplin beim Judo-Training.',
    aiHint: 'person hobby'
  },
  {
    src: 'https://placehold.co/600x600.png',
    width: 600,
    height: 600,
    alt: 'Ein lächelnder Benedikt Schächner',
    title: 'Positiv',
    description: 'Mit einem Lächeln geht alles leichter.',
    aiHint: 'person smiling'
  },
];
