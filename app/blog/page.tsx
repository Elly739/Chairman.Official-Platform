import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { getPostsByCategory } from "@/lib/content";

const insightPosts = getPostsByCategory("blog");

export const metadata: Metadata = {
  title: "Insights | Chairman.Official",
  description: "Essays, reflections, and strategic insights from Elly Okello.",
};

export default function BlogPage() {
  const featuredInsight = insightPosts[0];
  const secondaryInsights = insightPosts.slice(1);

  return (
    <main className="editorial-shell bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="editorial-hero px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="relative z-10">
              <span className="editorial-chip">Insights</span>
              <h1 className="section-title max-w-[12ch]">Ideas, patterns, and strategic reading with a longer shelf life.</h1>
              <p className="section-copy max-w-2xl">
                Longer-form thinking from Chairman.Official, shaped for people who want more than headlines: perspective, interpretation, and disciplined public reflection.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/news" className="btn-primary">
                  Visit Newsroom
                </Link>
                <Link href="/vision" className="btn-brand-subtle">
                  Read the Vision
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="editorial-stat">
                <span className="editorial-stat-value">{insightPosts.length}</span>
                <span className="editorial-stat-label">Published insights</span>
              </article>
              <article className="editorial-stat">
                <span className="editorial-stat-value">{featuredInsight?.tags?.[0] ?? "Editorial"}</span>
                <span className="editorial-stat-label">Current theme</span>
              </article>
              {featuredInsight ? (
                <article className="editorial-panel col-span-full p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Featured article</p>
                  <h2 className="mt-3 font-heading text-2xl font-semibold leading-tight text-[var(--color-ink)]">{featuredInsight.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{featuredInsight.summary}</p>
                  <Link href={`/blog/${featuredInsight.slug}`} className="mt-5 inline-flex text-sm font-semibold text-[#c48b1e] transition hover:text-[var(--color-brand)]">
                    Open article -&gt;
                  </Link>
                </article>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {(secondaryInsights.length ? secondaryInsights : insightPosts).map((post) => (
            <article key={post.slug} className="group editorial-grid-card transition-transform duration-200 hover:-translate-y-1">
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-soft)]">
                <Image
                  src={post.coverImage ?? "/media/blog-cover.svg"}
                  alt={post.coverAlt ?? post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
                />
              </div>
              <div className="p-7">
                <p className="font-mono text-xs tracking-[0.06em] text-[var(--color-muted)]">
                  {post.publishedAt} · Chairman.Official Insights
                </p>
                <h2 className="mt-5 font-heading text-[1.95rem] font-semibold leading-[1.15] text-[var(--color-ink)]">
                  {post.title}
                </h2>
                <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">{post.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-md border border-[#e8c98b] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="mt-7 inline-flex text-sm font-semibold text-[#c48b1e] transition hover:text-[var(--color-brand)]">
                  Read insight -&gt;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
