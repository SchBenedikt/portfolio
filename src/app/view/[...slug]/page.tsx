import ViewClient from './ViewClient';

export async function generateStaticParams() {
  return [{ slug: ['index'] }];
}

export default function Page({ params }: { params: { slug: string[] } }) {
  return <ViewClient slug={params.slug} />;
}
