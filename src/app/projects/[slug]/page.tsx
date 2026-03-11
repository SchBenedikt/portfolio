import ProjectClient from './ProjectClient';
import { projectData } from '@/lib/projects';

export async function generateStaticParams() {
  return projectData.map((project) => ({
    slug: project.slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ProjectClient slug={params.slug} />;
}
