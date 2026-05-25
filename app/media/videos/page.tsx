import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = {
  title: "Videos | Chairman.Official",
  description: "Video appearances, clips, and visual moments prepared for public release on Chairman.Official.",
};

export default function MediaVideosPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="mx-auto w-full max-w-5xl px-6 py-20 lg:px-10">
        <p className="section-kicker">Videos</p>
        <h1 className="section-title">Video appearances will live here in a cleaner release format.</h1>
        <p className="section-copy">
          This section is being prepared for interviews, speech clips, event moments, and other visual records that deserve their own curated space instead of being mixed into the main post feed.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="rounded-[1.8rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_24px_60px_rgba(10,61,98,0.2)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/68">In Preparation</p>
            <h2 className="mt-6 font-heading text-3xl font-semibold">A dedicated video layer for speeches, clips, and public moments.</h2>
            <p className="mt-4 text-sm leading-7 text-white/80">
              We are keeping this separate so the media feed stays visual and simple while video gets a cleaner, more intentional presentation.
            </p>
          </article>

          <article className="rounded-[1.8rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_16px_40px_rgba(10,61,98,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Meanwhile</p>
            <h2 className="mt-6 font-heading text-3xl font-semibold text-[var(--color-ink)]">Use the current media feed for public posts and visual cards.</h2>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Link href="/media" className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white">
                Open Media Feed
              </Link>
              <Link href="/chairmans-desk" className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-3 text-sm font-semibold text-[var(--color-brand)]">
                Open Chairman&apos;s Desk
              </Link>
            </div>
          </article>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
