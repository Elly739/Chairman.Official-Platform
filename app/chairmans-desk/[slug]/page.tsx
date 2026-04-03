import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeskAnnouncementCardVisual } from "../../components/desk-announcement-card-visual";
import { ShareActions } from "../../components/share-actions";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { absoluteUrl } from "@/lib/site";
import { getPost, getPostHref, getPostsByCategory } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};


export async function generateStaticParams() {
  return getPostsByCategory("desk").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("desk", slug);

  if (!post) {
    return { title: "Chairman's Desk | Chairman.Official" };
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

export default async function DeskPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost("desk", slug);

  if (!post) {
    notFound();
  }

  const shareUrl = absoluteUrl(getPostHref(post));

  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>

      <section className="mx-auto w-full max-w-5xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Chairman&apos;s Desk Announcement</p>
        <h1 className="section-title">{post.title}</h1>
        <p className="section-copy">{post.summary}</p>

        <article className="mt-10 overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white p-5 shadow-[0_16px_40px_rgba(10,61,98,0.1)]">
          <DeskAnnouncementCardVisual post={post} />
        </article>

        <div className="mt-10 grid gap-6 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]">Announcement Insight</p>
            <p className="mt-4 text-lg leading-8 text-[var(--color-ink)]">{post.socialHook}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{post.shareCaption}</p>
          </div>
          <ShareActions postTitle={post.title} shareCaption={post.shareCaption} shareUrl={shareUrl} />
        </div>

        <div className="mt-8">
          <Link href="/chairmans-desk" className="inline-flex rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
            Back to Chairman&apos;s Desk
          </Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

