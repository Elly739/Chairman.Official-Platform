import type { Metadata } from "next";
import Link from "next/link";
import { DeskAnnouncementCardVisual } from "../components/desk-announcement-card-visual";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getPostHref, getPostsByCategory } from "@/lib/content";

const deskPosts = getPostsByCategory("desk");


export const metadata: Metadata = {
  title: "Chairman's Desk | Chairman.Official",
  description: "Official statements and announcement cards from the Chairman's Desk.",
};

export default function ChairmansDeskPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Chairman&apos;s Desk</p>
        <h1 className="section-title">Official announcement cards and statements.</h1>
        <p className="section-copy">
          This page now focuses on Chairman&apos;s Desk announcements. Each card opens the full statement record.
        </p>

        {deskPosts.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {deskPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-[1.8rem] border border-[var(--color-line)] bg-white p-4 shadow-[0_16px_40px_rgba(10,61,98,0.1)]"
              >
                <DeskAnnouncementCardVisual post={post} compact />
                <div className="space-y-3 px-2 pb-2 pt-4">
                  <p className="text-sm leading-7 text-[var(--color-muted)]">{post.summary}</p>
                  <div className="pt-1">
                    <Link
                      href={getPostHref(post)}
                      className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)]"
                    >
                      Open Announcement Card
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <article className="mt-12 rounded-[1.8rem] border border-dashed border-[var(--color-line)] bg-white p-8 text-sm leading-7 text-[var(--color-muted)]">
            No public Chairman&apos;s Desk announcements yet.
          </article>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}

