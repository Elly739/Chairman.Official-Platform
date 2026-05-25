import { createOgImage, ogContentType, ogSize } from "@/lib/og";
import { getPost, getPostsByCategory } from "@/lib/content";

export const alt = "Chairman.Official news article preview";
export const size = ogSize;
export const contentType = ogContentType;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPost("news", slug) ?? getPostsByCategory("news")[0];

  return createOgImage({
    eyebrow: post.kicker,
    title: post.title,
    summary: post.shareCaption,
  });
}