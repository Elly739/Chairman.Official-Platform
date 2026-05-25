"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { dropdownMenus, navigation } from "@/lib/navigation";
import { DropdownMenu } from "./dropdown-menu";
import { MobileNav } from "./mobile-nav";

type SiteHeaderProps = {
  invert?: boolean;
};

export function SiteHeader({ invert = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const matchesPath = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const menuIsActive = (items: { href: string }[]) => items.some((item) => matchesPath(item.href));

  const shellClass = invert
    ? "border-white/15 bg-white/10 text-white backdrop-blur-xl"
    : "border-[var(--color-line)] bg-white/90 text-[var(--color-ink)] backdrop-blur-xl shadow-sm";

  const studioClass = invert
    ? "rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:shadow-md focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
    : "rounded-full bg-[var(--color-brand)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-deep)] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2";

  return (
    <header className={`sticky top-6 z-50 rounded-full border px-5 py-4 xl:px-6 ${shellClass} backdrop-blur-xl`}>
      <div className="flex items-center justify-between gap-3 xl:gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3 focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Home" onMouseEnter={() => router.prefetch("/")}>
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold tracking-[0.3em] shadow-lg xl:h-12 xl:w-12 xl:text-base ${invert ? "border-2 border-white/30 bg-white/15 text-white" : "bg-[var(--color-brand)] text-white"}`}
          >
            EO
          </span>
          <span className="hidden font-heading text-sm font-bold uppercase tracking-[0.18em] sm:inline-block xl:text-[15px] xl:tracking-[0.2em] 2xl:text-base">
            Chairman.Official
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 xl:flex xl:px-2 2xl:gap-3" role="navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            item.menu ? (
              <DropdownMenu
                key={item.label}
                label={item.label}
                href={item.href}
                items={dropdownMenus[item.menu]}
                invert={invert}
                isActive={matchesPath(item.href) || menuIsActive(dropdownMenus[item.menu])}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-full px-3 py-2 text-[13px] font-medium leading-tight transition-all duration-200 xl:text-sm ${
                  invert
                    ? matchesPath(item.href)
                      ? "bg-white/14 text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                      : "text-white/82 hover:bg-white/10 hover:text-white"
                    : matchesPath(item.href)
                      ? "bg-[var(--color-soft)] text-[var(--color-brand)] shadow-sm"
                      : "text-[var(--color-muted)] hover:bg-[var(--color-soft)] hover:text-[var(--color-brand)]"
                }`}
                tabIndex={0}
                prefetch
                onMouseEnter={() => router.prefetch(item.href)}
                aria-current={matchesPath(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3 xl:gap-4">
          <Link
            href="/studio/login"
            prefetch
            onMouseEnter={() => router.prefetch("/studio/login")}
            className={`${studioClass} hidden xl:inline-flex`}
            aria-label="Access Studio dashboard"
          >
            Studio
          </Link>
          <MobileNav invert={invert} />
        </div>
      </div>
    </header>
  );
}
