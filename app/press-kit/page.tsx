import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Press Kit | Chairman.Official",
  description: "Official biography, portraits, contact details, and approved media assets for Chairman.Official.",
};

const profileFacts = [
  "Chairman, innovator, and builder focused on practical civic execution and public-facing leadership.",
  "Publishes official statements, project updates, and thought-leadership pieces through Chairman.Official.",
  "Works at the intersection of technology, media-ready communication, and public value.",
];

const assetDownloads = [
  {
    title: "Official Portrait",
    note: "Primary press portrait for formal use.",
    href: "/uploads/portraits/portrait-main.jpg",
  },
  {
    title: "Alternative Portrait",
    note: "Secondary portrait for editorial layouts and feature profiles.",
    href: "/uploads/portraits/portrait-alt.jpg",
  },
  {
    title: "Editorial Portrait",
    note: "Lifestyle-oriented visual for magazine, blog, and branded media use.",
    href: "/uploads/media/style.jpg",
  },
  {
    title: "Three-Piece Portrait",
    note: "Formal image for premium campaign and interview use.",
    href: "/uploads/media/three-piece.jpg",
  },
];

const approvedLines = [
  "Chairman.Official is the official public platform of Elly Okello.",
  "Use the platform name exactly as written: Chairman.Official.",
  "For media requests, interviews, speaking invitations, and official confirmations, use the contact details below.",
];

export default function PressKitPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <p className="section-kicker">Press Kit</p>
            <h1 className="section-title">Official biography, approved imagery, and media-ready details.</h1>
            <p className="section-copy">
              This page brings together the core materials needed for interviews, profiles, features, and official media mentions around Chairman.Official.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="mailto:iamellyokello@gmail.om" className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white">
                Request Media Access
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-brand)]">
                Contact Page
              </Link>
            </div>

            <div className="mt-10 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_45px_rgba(10,61,98,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Approved Profile</p>
              <h2 className="mt-6 font-heading text-3xl font-semibold text-[var(--color-ink)]">Elly Okello</h2>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">Chairman, Innovator, Builder</p>
              <div className="mt-6 grid gap-4 text-sm leading-7 text-[var(--color-muted)]">
                {profileFacts.map((fact) => (
                  <p key={fact} className="rounded-[1.25rem] bg-[var(--color-surface)] px-4 py-4">
                    {fact}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_24px_60px_rgba(10,61,98,0.2)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">Media Use Notes</p>
            <div className="mt-6 grid gap-4 text-sm leading-7 text-white/82">
              {approvedLines.map((line) => (
                <p key={line} className="rounded-[1.25rem] border border-white/14 bg-white/10 px-4 py-4">
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-8 rounded-[1.4rem] border border-white/14 bg-white/10 px-5 py-5 text-sm leading-7 text-white/82">
              <p><span className="font-semibold text-white">Email:</span> iamellyokello@gmail.om</p>
              <p className="mt-2"><span className="font-semibold text-white">Phone:</span> +254 769 182 575</p>
              <p className="mt-2"><span className="font-semibold text-white">Instagram:</span> @chairman.official</p>
              <p className="mt-2"><span className="font-semibold text-white">X:</span> @OkelloElly018</p>
              <p className="mt-2"><span className="font-semibold text-white">LinkedIn:</span> Okello Elly</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="section-kicker">Download Assets</p>
            <h2 className="section-title">Portraits and approved visuals ready for use.</h2>
            <p className="section-copy">
              Download the approved image set for coverage, interview graphics, public profiles, and Chairman.Official mentions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {assetDownloads.map((asset) => (
              <article key={asset.href} className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_14px_40px_rgba(10,61,98,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Approved Asset</p>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-[var(--color-ink)]">{asset.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{asset.note}</p>
                <a href={asset.href} download className="btn-brand-subtle mt-6 inline-flex">
                  Download Image
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_45px_rgba(10,61,98,0.08)] sm:p-10">
          <p className="section-kicker">Short Bio</p>
          <h2 className="section-title">Suggested profile text for features and introductions.</h2>
          <div className="mt-6 rounded-[1.5rem] bg-[var(--color-surface)] p-6 text-sm leading-8 text-[var(--color-muted)]">
            <p>
              Elly Okello is a chairman, innovator, and builder focused on leadership communication, civic execution, and public-facing innovation. Through Chairman.Official, he publishes official statements, project updates, and thought-leadership content designed to connect vision with visible public value.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}