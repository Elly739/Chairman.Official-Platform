import { createOgImage, ogContentType, ogSize } from "@/lib/og";
import { getAllProjects, getProject } from "@/lib/content";

export const alt = "Chairman.Official project preview";
export const size = ogSize;
export const contentType = ogContentType;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const projects = getAllProjects();
  const project = getProject(slug) ?? projects[0];

  return createOgImage({
    eyebrow: project.status,
    title: project.name,
    summary: project.summary,
  });
}