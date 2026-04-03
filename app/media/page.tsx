import type { Metadata } from "next";
import Link from "next/link";
import { MediaFeed, type MediaTimelineItem } from "../components/media-feed";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
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
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-5xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>
      <section className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-10">
        <p className="section-kicker">Media</p>
        <h1 className="section-title">A public media profile for personal visuals and Chairman.Official cards.</h1>
        <p className="section-copy">
          Personal photos and branded cards now live in one continuous feed, ordered by time posted. News, blog, and Chairman&apos;s Desk still keep their own full-story sections.
        </p>

        <div className="mt-10 rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_24px_60px_rgba(10,61,98,0.2)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/78">Public Channels</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <Link key={link.label} href={link.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/18 bg-white/10 px-4 py-2 text-sm font-medium text-white/88">
                {link.label} {link.handle}
              </Link>
            ))}
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

