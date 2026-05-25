import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Media Kit | Chairman.Official",
  description: "Approved bios, platform references, public links, and media-ready contact details for Chairman.Official.",
};

const profileFacts = [
  "Elly Okello is a chairman, innovator, and builder focused on communication, execution, and public-facing digital work.",
  "Chairman.Official is the official platform for statements, public updates, insights, and visual communication.",
  "This page exists to help media teams, event organisers, and collaborators use the right details when referencing the platform.",
];

const assetDownloads = [
  {
    title: "Official Portrait",
    note: "Primary approved portrait for formal media and speaker use.",
    href: "/uploads/portraits/portrait-main.png",
  },
  {
    title: "Alternative Portrait",
    note: "Secondary portrait for editorial layouts and feature profiles.",
    href: "/uploads/portraits/portrait-alt.jpg",
  },
  {
    title: "Editorial Portrait",
    note: "Approved visual for platform features and branded media references.",
    href: "/uploads/media/style.jpg",
  },
  {
    title: "Formal Campaign Portrait",
    note: "Premium image for interviews, profile banners, and event decks.",
    href: "/uploads/media/three-piece.jpg",
  },
];

const approvedLines = [
  "Use Chairman.Official for official platform references, public quotes, and digital profile mentions.",
  "Use Elly Okello when referring to the individual behind the platform.",
  "Use this page for approved bios, project references, and contact direction before publishing public-facing material.",
];

export default function PressKitPage() {
  const projects = getAllProjects();

  return (
    <main id="main-content" className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <p className="section-kicker">Media Kit</p>
            <h1 className="section-title">Approved bio, public references, and media-ready platform details.</h1>
            <p className="section-copy">
              This section is here for media mentions, speaker profiles, partnership decks, event organisers, and anyone who needs the correct public-facing details about Chairman.Official.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="mailto:iamellyokello@gmail.com" className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white">
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
              <p><span className="font-semibold text-white">Email:</span> iamellyokello@gmail.com</p>
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
            <p className="section-kicker">Approved Assets</p>
            <h2 className="section-title">Portraits and visuals for media, event, and profile use.</h2>
            <p className="section-copy">
              Use these when a profile photo or approved public visual is needed for coverage, event posters, interview graphics, or online speaker listings.
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
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_45px_rgba(10,61,98,0.08)] sm:p-10">
            <p className="section-kicker">Short Bio</p>
            <h2 className="section-title">Suggested profile text for features and introductions.</h2>
            <div className="mt-6 rounded-[1.5rem] bg-[var(--color-surface)] p-6 text-sm leading-8 text-[var(--color-muted)]">
              <p>
                Elly Okello is a chairman, innovator, and builder focused on leadership communication, civic execution, and public-facing digital products. Through Chairman.Official, he shares official statements, news, insights, and community-facing work designed to connect vision with visible public value.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_45px_rgba(10,61,98,0.08)] sm:p-10">
            <p className="section-kicker">Community Impact</p>
            <h2 className="section-title">Public repositories and initiative references connected to the platform.</h2>
            <div className="mt-6 grid gap-3">
              {projects.map((project) => (
                <a key={project.slug} href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[1.25rem] border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 text-sm font-medium text-[var(--color-ink)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]">
                  <span>{project.name}</span>
                  <span className="text-xs uppercase tracking-[0.18em]">Open Repo</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
