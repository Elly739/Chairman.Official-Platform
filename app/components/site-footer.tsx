import Link from "next/link";
import { navigation } from "@/lib/navigation";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/okello-elly-102788312/" },
  { label: "Instagram", href: "https://www.instagram.com/chairman.official/" },
  { label: "X", href: "https://x.com/OkelloElly018" },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-[var(--color-line)] bg-[var(--color-surface-strong)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-10">
        <div>
          <Link href="/" className="flex items-center gap-3 text-[var(--color-brand)]">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold tracking-[0.35em] text-white">
              EO
            </span>
            <span className="font-heading text-lg font-semibold">Chairman.Official</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-muted)]">
            A personal digital platform for official statements, projects, publishing, and public-facing storytelling.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-brand)]"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/studio/login"
              className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white"
            >
              Studio Login
            </Link>
          </div>
        </div>

        <div>
          <p className="font-heading text-lg font-semibold text-[var(--color-ink)]">Quick Links</p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--color-muted)]">
            {navigation.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/studio/login">Studio Login</Link>
          </div>
        </div>

        <div>
          <p className="font-heading text-lg font-semibold text-[var(--color-ink)]">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-[var(--color-muted)]">
            <a href="mailto:iamellyokello@gmail.om">iamellyokello@gmail.om</a>
            <a href="tel:+254769182575">+254 769 182 575</a>
            <Link href="/contact">Public Contact Page</Link>
            <span>Copyright 2026 Chairman.Official</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

