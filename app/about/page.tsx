import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";


export const metadata: Metadata = {
  title: "About | Chairman.Official",
  description: "About Elly Okello, Chairman.Official, and the leadership direction behind the platform.",
};

const pillars = [
  {
    title: "Thought Leadership",
    description: "Ideas, statements, and reflections shaped to connect leadership language with practical public value.",
  },
  {
    title: "Innovation",
    description: "Technology, design thinking, and disciplined execution brought together to move from concept to visible outcomes.",
  },
  {
    title: "Public Impact",
    description: "Initiatives and communication built to earn trust, inform communities, and show meaningful momentum.",
  },
];

const profilePoints = [
  "Chairman, innovator, and builder focused on practical civic and community-facing execution.",
  "Publishes official statements, public commentary, and project narratives with clarity and discipline.",
  "Brings together leadership communication, technology, and media-ready storytelling in one voice.",
];

export default function AboutPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">About</p>
            <h1 className="section-title">Leadership shaped by clarity, execution, and public value.</h1>
            <p className="section-copy">
              Chairman.Official is the public home of Elly Okello, bringing together official communication, project direction, thought leadership, and media-ready storytelling.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/projects" className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white">
                Explore Projects
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-brand)]">
                Get In Touch
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_45px_rgba(10,61,98,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Profile Snapshot</p>
            <h2 className="mt-6 font-heading text-3xl font-semibold text-[var(--color-ink)]">Elly Okello</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">Chairman, Innovator, Builder</p>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-[var(--color-muted)]">
              {profilePoints.map((point) => (
                <p key={point} className="rounded-[1.25rem] bg-[var(--color-surface)] px-4 py-4">
                  {point}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-kicker">Direction</p>
            <h2 className="section-title">A voice for ideas, action, and visible progress.</h2>
            <p className="section-copy">
              This space exists to carry leadership thinking into the public sphere with seriousness, consistency, and a standard people can trust.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_14px_40px_rgba(10,61,98,0.06)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold text-white">
                  0{index + 1}
                </span>
                <h3 className="mt-8 font-heading text-2xl font-semibold text-[var(--color-ink)]">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_24px_60px_rgba(10,61,98,0.2)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">Guiding Thought</p>
          <blockquote className="mt-6 max-w-4xl font-heading text-3xl font-semibold leading-[1.4] sm:text-4xl">
            &ldquo;Strong leadership communication should make vision clear, action visible, and public trust easier to earn.&rdquo;
          </blockquote>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/76">
            Chairman.Official stands as a refined public headquarters for ideas, official notes, innovation-led work, and meaningful engagement.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

