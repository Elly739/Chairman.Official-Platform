import type { Metadata } from "next";
import Link from "next/link";
import { MediaFeed, type MediaTimelineItem } from "../components/media-feed";
import { SiteFooter } from "../components/site-footer";
import { getAllPosts, getPublicMediaPosts, getPostHref } from "@/lib/content";
import { SOCIAL_CARD_RENDER_VERSION } from "@/lib/social-card";
import { getMediaEngagementEntry } from "@/lib/media-engagement-store";


export const metadata: Metadata = {
  title: "Media | Chairman.Official",
  description: "A public media profile of personal visuals and Chairman.Official cards.",
};

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/chairman.official/",
    handle: "@chairman.official",
  },
  {
    label: "X",
    href: "https://x.com/OkelloElly018",
    handle: "@OkelloElly018",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/okello-elly-102788312/",
    handle: "Okello Elly",
  },
];

const personalTypes = new Set(["Personal Photo", "Portrait"]);

function parseDate(value?: string) {
  const parsed = value ? new Date(value).getTime() : Number.NaN;
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function MediaPage() {
  const mediaPosts = getPublicMediaPosts().filter((item) => personalTypes.has(item.type));
  const publishedPosts = getAllPosts().filter((post) => post.category !== "desk" && !/announcement/i.test(post.kicker));

  const photoItems: MediaTimelineItem[] = mediaPosts.map((item) => ({
    id: `photo-${item.src}`,
    kind: "photo",
    mediaSrc: item.src ?? "",
    imageSrc: item.src ?? "/media/news-cover.svg",
    imageAlt: item.alt ?? item.title,
    title: item.title,
    caption: item.caption ?? item.description,
    createdAt: item.createdAt ?? "Recent",
    channelLabel: item.channelLabel ?? item.type,
  }));

  const cardItems: MediaTimelineItem[] = publishedPosts.map((post) => {
    const version = encodeURIComponent(`${SOCIAL_CARD_RENDER_VERSION}-${post.updatedAt}-${post.socialCardTemplate ?? "campaign"}-${post.portraitImage ?? "none"}`);
    return {
      id: `card-${post.slug}`,
      kind: "card",
      mediaSrc: `card:${post.slug}:instagram`,
      imageSrc: `/api/studio/social-card/${post.slug}?platform=instagram&v=${version}`,
      imageAlt: `${post.title} social card`,
      title: post.title,
      caption: post.platformCopy?.instagram ?? post.socialHook,
      createdAt: post.publishedAt,
      channelLabel: `${post.kicker} Card`,
      href: getPostHref(post),
    } satisfies MediaTimelineItem;
  });

  const timeline = [...photoItems, ...cardItems]
    .sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt))
    .map((item) => ({
      item,
      engagement: getMediaEngagementEntry(item.mediaSrc),
    }));

  return (
    <main className="editorial-shell bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="editorial-hero px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative z-10">
              <span className="editorial-chip">Media</span>
              <h1 className="section-title max-w-[11ch]">A visual profile built for presence, clarity, and distribution.</h1>
              <p className="section-copy max-w-2xl">
                Personal photos and branded cards live together in one cleaner feed, ordered by time posted and shaped for public attention without losing identity.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/chairmans-desk" className="btn-primary">
                  Open Chairman&apos;s Desk
                </Link>
                <Link href="/media/videos" className="btn-brand-subtle">
                  Open Videos
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="editorial-stat">
                <span className="editorial-stat-value">{photoItems.length}</span>
                <span className="editorial-stat-label">Personal visuals</span>
              </article>
              <article className="editorial-stat">
                <span className="editorial-stat-value">{cardItems.length}</span>
                <span className="editorial-stat-label">Branded cards</span>
              </article>
              <article className="editorial-panel col-span-full p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Public channels</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[rgba(10,61,98,0.12)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-brand)] transition hover:border-[var(--color-brand)] hover:bg-[var(--color-soft)]"
                    >
                      {link.label} {link.handle}
                    </Link>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
                  News, articles, and Chairman&apos;s Desk keep their own reading homes. Media stays focused on visual posts and shareable card moments.
                </p>
              </article>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <MediaFeed items={timeline} />
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}


