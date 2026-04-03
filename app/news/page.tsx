import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "../components/post-card";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getPostsByCategory } from "@/lib/content";

const newsPosts = getPostsByCategory("news");


export const metadata: Metadata = {
  title: "News | Chairman.Official",
  description: "Official news and public updates from Elly Okello.",
};

export default function NewsPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Newsroom</p>
        <h1 className="section-title">Official updates, milestones, and announcements.</h1>
        <p className="section-copy">
          This is where visitors can track movement, decisions, partnerships, and the moments worth sharing forward.
        </p>
        <div className="mt-8">
          <Link href="/blog" className="inline-flex rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
            Visit the Blog
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {newsPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

