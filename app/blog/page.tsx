import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "../components/post-card";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getPostsByCategory } from "@/lib/content";

const blogPosts = getPostsByCategory("blog");


export const metadata: Metadata = {
  title: "Blog | Chairman.Official",
  description: "Essays, reflections, and strategic writing from Elly Okello.",
};

export default function BlogPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Blog</p>
        <h1 className="section-title">Ideas, strategy, and perspective with a longer shelf life.</h1>
        <p className="section-copy">
          The blog is for thought pieces that deepen your point of view and give people language they can cite, revisit, and share.
        </p>
        <div className="mt-8">
          <Link href="/news" className="inline-flex rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
            Visit the Newsroom
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

