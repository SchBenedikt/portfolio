
export interface Organization {
    slug: string;
    name: string;
    logo?: string; // URL to the logo
}

export const organizationData: Organization[] = [
    { slug: 'tus-toeging', name: 'TuS Töging', logo: 'https://www.tustoeging.de/sgm/online/web/downloads/logo_tus_toeging.png' },
    { slug: 'kkg', name: 'König-Karlmann-Gymnasium', logo: 'https://www.koenig-karlmann-gymnasium.de/fileadmin/user_upload/logo-kkg.png' },
    { slug: 'pnp', name: 'Passauer Neue Presse' },
    { slug: 'mb21', name: 'Deutscher Multimediapreis mb21', logo: 'https://www.mb21.de/fileadmin/mb21_2021/Design/mb21_logo_2021.svg'},
    { slug: 'br', name: 'Bayerischer Rundfunk', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Logo-br-2017.svg/1024px-Logo-br-2017.svg.png' },
    { slug: 'nextcloud', name: 'Nextcloud Conference', logo: 'https://nextcloud.com/wp-content/themes/nextcloud-theme/assets/img/logo-dark.svg' },
    { slug: 'km-bayern', name: 'Kultusministerium Bayern' },
    { slug: 'omv-burghausen', name: 'OMV Burghausen' },
    { slug: 'rohde-schwarz', name: 'Rohde & Schwarz Cybersecurity' },
    { slug: 'technik-schaechner', name: 'Technik Schächner' },
    { slug: 'fau', name: 'Friedrich-Alexander-Universität Erlangen-Nürnberg', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/FAU_logo.svg/1920px-FAU_logo.svg.png'},
    { slug: 'young-leaders', name: 'young leaders GmbH' },
    { slug: 'brk', name: 'Bayerisches Rotes Kreuz (BRK)' },
    { slug: 'bayerischer-judo-verband', name: 'Bayerischer Judo-Verband e.V.', logo: 'https://www.bayernjudo.de/templates/yootheme/cache/9c/logo_bjv_2-9c27e1bf.webp' },
    { slug: 'schachklub-toeging', name: 'Schachklub Töging e. V.'},
    { slug: 'ovb-heimatzeitungen', name: 'OVB Heimatzeitungen' },
    { slug: 'ars-electronica', name: 'Ars Electronica' },
];

export const getOrganizationBySlug = (slug: string) => {
    return organizationData.find(org => org.slug === slug);
};

// A mapping for resume organizations to slugs
export const resumeOrgToSlug: { [key: string]: string } = {
    "Judoabteilung TuS Töging": "tus-toeging",
    "OMV Burghausen": "omv-burghausen",
    "Deutscher Multimediapreis mb21": "mb21",
    "Bayerischer Rundfunk": "br",
    "Nextcloud Conference": "nextcloud",
    "Rohde & Schwarz Cybersecurity": "rohde-schwarz",
    "Technik Schächner": "technik-schaechner",
    "König-Karlmann-Gymnasium": "kkg",
    "Friedrich-Alexander-Universität Erlangen-Nürnberg": "fau",
    "young leaders GmbH": "young-leaders",
    "Bayerisches Rotes Kreuz (BRK)": "brk",
    "Bayerischer Judo-Verband e.V.": "bayerischer-judo-verband",
    "Schachklub Töging e. V.": "schachklub-toeging",
    "OVB Heimatzeitungen": "ovb-heimatzeitungen",
    "Passauer Neue Presse": "pnp",
    "Kultusministerium Bayern": "km-bayern",
    "TuS Töging": "tus-toeging",
    "Ars Electronica": "ars-electronica",
};

    