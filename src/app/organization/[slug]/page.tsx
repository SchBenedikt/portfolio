import OrganizationClient from './OrganizationClient';
import { organizationData } from '@/lib/organizations';

export async function generateStaticParams() {
  return organizationData.map((org) => ({
    slug: org.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <OrganizationClient slug={params.slug} />;
}
