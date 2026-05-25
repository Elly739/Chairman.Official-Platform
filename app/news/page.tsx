import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { getPostsByCategory } from "@/lib/content";
import type { Post } from "@/lib/content";

const newsPosts = getPostsByCategory("news");

const newsLanes = [
  {
    label: "Breaking / Announcements",
    description: "Urgent updates, platform notices, event announcements, and important public information.",
    tags: ["Announcement", "Breaking"],
  },
  {
    label: "Product Updates",
    description: "Release notes, changes, improvements, and fixes across Chairman.Official.",
    tags: ["Product Update", "Release Notes"],
  },
  {
    label: "Events & Scheduled Drops",
    description: "Upcoming launches, campaigns, community moments, deadlines, and dated public drops.",
    tags: ["Event", "Scheduled Drop"],
  },
  {
    label: "Official Statements",
    description: "Clarifications, decisions, direction shifts, and the authority voice of the platform.",
    tags: ["Statement", "Official Statement"],
  },
];

export const metadata: Metadata = {
  title: "News | Chairman.Official",
  description: "Official announcements, release notes, scheduled drops, and public statements from Chairman.Official.",
};

function postMatchesLane(post: Post, tags: string[]) {
  return tags.some((tag) => post.tags.includes(tag) || post.kicker.includes(tag));
}

function NewsCard({ post, lead = false }: { post: Post; lead?: boolean }) {
  return (
    <article className={`overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)] ${lead ? "lg:grid lg:grid-cols-[0.92fr_1.08fr]" : ""}`}>
      <Link href={`/news/${post.slug}`} className={`relative block overflow-hidden bg-[var(--color-soft)] ${lead ? "min-h-[24rem]" : "aspect-[16/10]"}`}>
        <Image
          src={post.coverImage ?? "/media/news-cover.svg"}
          alt={post.coverAlt ?? post.title}
          fill
          className="object-cover object-top transition duration-300 hover:scale-[1.02]"
          sizes={lead ? "(max-width: 1024px) 100vw, 560px" : "(max-width: 768px) 100vw, 360px"}
        />
        <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)] shadow-md">
          {post.kicker}
        </div>
      </Link>
      <div className={lead ? "p-8 lg:p-10" : "p-6"}>
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">{post.publishedAt}</p>
        <h2 className={`${lead ? "mt-5 text-4xl" : "mt-4 text-2xl"} font-heading font-semibold leading-tight text-[var(--color-ink)]`}>
          {post.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{post.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md border border-[#e8c98b] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/news/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-[#c48b1e] transition hover:text-[var(--color-brand)]">
          Read official update -&gt;
        </Link>
      </div>
    </article>
  );
}

export default function NewsPage() {
  const leadPost = newsPosts[0];

  return (
    <main className="editorial-shell bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="editorial-hero px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-end">
            <div className="relative z-10">
              <span className="editorial-chip">Official News</span>
              <h1 className="section-title max-w-[12ch]">Announcements, releases, scheduled drops, and statements.</h1>
              <p className="section-copy max-w-2xl">
                News is the official voice layer of Chairman.Official: clear cards for the headline, captions for the explanation, and structured updates for public record.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {newsLanes.map((lane) => (
                <article key={lane.label} className="editorial-stat">
                  <span className="editorial-stat-value text-[1.35rem]">{lane.label.split(" ")[0]}</span>
                  <span className="editorial-stat-label">{lane.description}</span>
                </article>
              ))}
            </div>
          </div>
        </div>

        {leadPost ? (
          <section className="mt-12">
            <p className="section-kicker">Lead update</p>
            <div className="mt-6">
              <NewsCard post={leadPost} lead />
            </div>
          </section>
        ) : null}

        <div className="mt-14 grid gap-8">
          {newsLanes.map((lane) => {
            const lanePosts = newsPosts.filter((post) => postMatchesLane(post, lane.tags));
            if (!lanePosts.length) return null;

            return (
              <section key={lane.label} className="grid gap-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="section-kicker">{lane.label}</p>
                    <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">{lane.description}</h2>
                  </div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">{lanePosts.length} items</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {lanePosts.map((post) => (
                    <NewsCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
