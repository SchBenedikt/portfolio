import ViewClient from './ViewClient';

type Props = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  return [{ slug: ['index'] }];
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ViewClient slug={slug} />;
}