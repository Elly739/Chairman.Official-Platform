"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

const MotionLink = motion(Link);

type SiteHeaderProps = {
  invert?: boolean;
};

export function SiteHeader({ invert = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const shellClass = invert
    ? "border-white/15 bg-white/10 text-white backdrop-blur-xl"
    : "border-[var(--color-line)] bg-white/90 text-[var(--color-ink)] backdrop-blur-xl shadow-sm";

  const linkClass = `text-sm font-medium transition-all duration-200 ${
    invert
      ? "text-white/80 hover:text-white hover:underline underline-offset-4"
      : "text-[var(--color-muted)] hover:text-[var(--color-brand)] hover:underline underline-offset-4"
  }`;

  const studioClass = invert
    ? "rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
    : "rounded-full bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-deep)] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2";

  return (
    <motion.header 
      className={`sticky top-6 z-50 rounded-full border px-6 py-4 ${shellClass} backdrop-blur-xl`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Home">
          <motion.span
            className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-bold tracking-[0.3em] shadow-lg ${invert ? "border-2 border-white/30 bg-white/15 text-white" : "bg-[var(--color-brand)] text-white"}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            EO
          </motion.span>
          <span className="hidden font-heading text-base font-bold uppercase tracking-[0.25em] sm:inline-block">
            Chairman.Official
          </span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" role="navigation" aria-label="Main navigation">
          {navigation.map((item, index) => (
            <MotionLink 
              key={item.label} 
              href={item.href} 
              className={linkClass}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ x: 4, scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
              tabIndex={0}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </MotionLink>
          ))}
        </nav>
        <Link
          href="/studio/login"
          className={studioClass}
          aria-label="Access Studio dashboard"
        >
          Studio
        </Link>
      </div>
    </motion.header>
  );
}




