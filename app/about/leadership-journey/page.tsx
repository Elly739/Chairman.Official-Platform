import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";

export const metadata: Metadata = {
  title: "Leadership Journey | Chairman.Official",
  description: "The background, growth, and public-facing leadership path behind Chairman.Official.",
};

const stages = [
  {
    title: "Foundation",
    body: "A journey shaped by curiosity, discipline, and a practical interest in how ideas become structures people can rely on.",
  },
  {
    title: "Innovation Practice",
    body: "Technology, media, and product thinking became working tools for turning ambition into visible platforms and usable systems.",
  },
  {
    title: "Public Presence",
    body: "Chairman.Official brings those strands together into one place where communication, identity, and public value can move in step.",
  },
];

export default function LeadershipJourneyPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-3xl">
          <p className="section-kicker">Leadership Journey</p>
          <h1 className="section-title">A path built through clarity, experimentation, and public-facing execution.</h1>
          <p className="section-copy">
            This journey is not only about titles. It is about learning how to communicate with discipline, build with intention, and keep ideas close to the communities they are meant to serve.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/about" className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white">
              Back to About
            </Link>
            <Link href="/press-kit" className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-brand)]">
              Open Media Kit
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {stages.map((stage, index) => (
              <article key={stage.title} className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_14px_40px_rgba(10,61,98,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Stage 0{index + 1}</p>
                <h2 className="mt-6 font-heading text-2xl font-semibold text-[var(--color-ink)]">{stage.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{stage.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
