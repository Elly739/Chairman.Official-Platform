import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "../../components/article-shell";
import { absoluteUrl } from "@/lib/site";
import { getPost, getPostHref, getPostsByCategory } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostsByCategory("blog").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("blog", slug);

  if (!post) {
    return { title: "Insights | Chairman.Official" };
  }

  const url = getPostHref(post);

  return {
    title: `${post.title} | Chairman.Official`,
    description: post.summary,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.shareCaption,
      type: "article",
      url: absoluteUrl(url),
      siteName: "Chairman.Official",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.shareCaption,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost("blog", slug);

  if (!post) {
    notFound();
  }

  return (
    <ArticleShell post={post}>
      {post.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </ArticleShell>
  );
}