import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";

export const metadata: Metadata = {
  title: "Vision | Chairman.Official",
  description: "The public direction, priorities, and leadership philosophy shaping Chairman.Official.",
};

const priorities = [
  {
    title: "Clarity",
    description: "Public communication should feel grounded, direct, and easy to trust even when the subject is complex.",
  },
  {
    title: "Execution",
    description: "Ideas matter most when they move into visible work, measurable progress, and disciplined follow-through.",
  },
  {
    title: "Public Value",
    description: "The platform exists to carry leadership language toward outcomes that people can see, understand, and benefit from.",
  },
];

export default function VisionPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="section-kicker">Vision</p>
            <h1 className="section-title">A public platform shaped by seriousness, usefulness, and visible direction.</h1>
            <p className="section-copy">
              Chairman.Official is designed to communicate more than updates. It exists to carry conviction, make priorities legible, and keep leadership presence aligned with work that can be seen and followed.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/chairmans-desk" className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white">
                Open Chairman&apos;s Desk
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-brand)]">
                Read Articles
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_24px_60px_rgba(10,61,98,0.2)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">Guiding Position</p>
            <blockquote className="mt-6 font-heading text-3xl font-semibold leading-[1.45] sm:text-4xl">
              &ldquo;Strong public leadership should make direction visible, language disciplined, and progress easier to recognise.&rdquo;
            </blockquote>
            <p className="mt-6 text-base leading-8 text-white/80">
              That is the standard behind every update, card, article, and public-facing release on the platform.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-kicker">Core Priorities</p>
            <h2 className="section-title">The platform is built around a few principles that should stay obvious.</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {priorities.map((priority, index) => (
              <article key={priority.title} className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_14px_40px_rgba(10,61,98,0.06)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold text-white">
                  0{index + 1}
                </span>
                <h3 className="mt-8 font-heading text-2xl font-semibold text-[var(--color-ink)]">{priority.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{priority.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
