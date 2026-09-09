export default function PageHeading({ title, description }: { title: string; description: string }) {
  return <header className="portfolio-page-heading"><p className="eyebrow">Benedikt Schächner / Portfolio</p><h1>{title}</h1><p>{description}</p></header>;
}
