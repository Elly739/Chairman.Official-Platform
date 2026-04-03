import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/contact-form";
import { NewsletterForm } from "../components/newsletter-form";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";


export const metadata: Metadata = {
  title: "Contact | Chairman.Official",
  description: "Contact Chairman.Official for direct communication, partnerships, media, and official inquiries.",
};

const contactMethods = [
  {
    label: "Email",
    value: "iamellyokello@gmail.om",
    href: "mailto:iamellyokello@gmail.om",
    note: "For direct communication, official requests, partnerships, and editorial conversations.",
  },
  {
    label: "Phone",
    value: "+254 769 182 575",
    href: "tel:+254769182575",
    note: "For urgent coordination, priority communication, and media-related outreach.",
  },
];

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

export default function ContactPage() {
  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
        <SiteHeader />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="section-kicker">Contact</p>
            <h1 className="section-title">For partnerships, official inquiries, and direct conversation.</h1>
            <p className="section-copy">
              Reach out for media requests, collaboration, speaking invitations, project conversations, and official communication.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="mailto:iamellyokello@gmail.om" className="inline-flex items-center justify-center rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white">
                Send Email
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-brand)]">
                About Elly Okello
              </Link>
            </div>

            <div className="mt-10 grid gap-6">
              {contactMethods.map((method) => (
                <article key={method.label} className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">{method.label}</p>
                  <a href={method.href} className="mt-6 block font-heading text-3xl font-semibold text-[var(--color-ink)]">
                    {method.value}
                  </a>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{method.note}</p>
                </article>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
            <div>
              <p className="section-kicker">Social Channels</p>
              <h2 className="section-title">Follow the public conversation across key platforms.</h2>
              <p className="section-copy">
                Stay connected through the channels carrying announcements, public reflections, visual updates, and professional communication.
              </p>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {socialLinks.map((link) => (
                  <article key={link.label} className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-8 shadow-[0_14px_40px_rgba(10,61,98,0.06)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">{link.label}</p>
                    <a href={link.href} target="_blank" rel="noreferrer" className="mt-6 block font-heading text-2xl font-semibold text-[var(--color-ink)]">
                      {link.handle}
                    </a>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                      Official public-facing channel for updates, visibility, and audience engagement.
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_24px_60px_rgba(10,61,98,0.2)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">Audience List</p>
              <h2 className="mt-6 font-heading text-3xl font-semibold">Subscribe for updates and major moments.</h2>
              <p className="mt-4 text-base leading-8 text-white/76">
                Join the list for statements, key updates, project milestones, and future media drops.
              </p>
              <NewsletterForm source="Contact Page" />
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

