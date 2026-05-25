"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { navigation } from "@/lib/navigation";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/okello-elly-102788312/" },
  { label: "Instagram", href: "https://www.instagram.com/chairman.official/" },
  { label: "X", href: "https://x.com/OkelloElly018" },
];

const footerGroups = [
  {
    title: "Explore",
    links: navigation.filter((item) => item.label !== "Home").map((item) => ({ label: item.label, href: item.href })),
  },
  {
    title: "Browse",
    links: [
      { label: "Leadership Journey", href: "/about/leadership-journey" },
      { label: "Chairman's Desk", href: "/chairmans-desk" },
      { label: "News", href: "/news" },
      { label: "Articles", href: "/blog" },
      { label: "Videos", href: "/media/videos" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-[var(--color-line)] bg-[var(--color-surface-strong)]">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.15fr_0.95fr_0.8fr] lg:px-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            href="/"
            className="flex items-center gap-3 text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-deep)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold tracking-[0.35em] text-white">
              EO
            </span>
            <span className="font-heading text-lg font-semibold">Chairman.Official</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-muted)]">
            A public-facing digital platform for leadership communication, media presence, official updates, and thoughtful civic storytelling.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-brand)] transition-all duration-200 hover:border-[var(--color-brand)] hover:bg-[var(--color-soft)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand)] focus-visible:outline-offset-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: socialLinks.length * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/studio/login"
                className="inline-block rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--color-brand-deep)] hover:shadow-md focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                Studio Login
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2"
        >
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="font-heading text-lg font-semibold text-[var(--color-ink)]">{group.title}</p>
              <div className="mt-4 grid gap-2 text-sm">
                {group.links.map((item) => (
                  <Link
                    key={`${group.title}-${item.label}`}
                    href={item.href}
                    className="text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-brand)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="font-heading text-lg font-semibold text-[var(--color-ink)]">Contact</p>
          <div className="mt-4 grid gap-2 text-sm">
            <a
              href="mailto:iamellyokello@gmail.com"
              className="text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-brand)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
            >
              iamellyokello@gmail.com
            </a>
            <a
              href="tel:+254769182575"
              className="text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-brand)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
            >
              +254 769 182 575
            </a>
            <Link
              href="/contact"
              className="text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-brand)] focus-visible:outline-2 focus-visible:outline-[var(--color-brand)]"
            >
              Public Contact Page
            </Link>
            <p className="mt-2 border-t border-[var(--color-line)] pt-2 text-[var(--color-muted)]">
              © 2026 Chairman.Official
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
