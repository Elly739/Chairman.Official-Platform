"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { dropdownMenus, type NavigationChild, navigation } from "@/lib/navigation";

type MobileNavProps = {
  invert?: boolean;
};

type ExpandedState = Partial<Record<keyof typeof dropdownMenus, boolean>>;

function MobileNavSection({
  label,
  href,
  invert,
  pathname,
  isOpen,
  onToggle,
  onNavigate,
  items,
}: {
  label: string;
  href: string;
  invert: boolean;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
  items: NavigationChild[];
}) {
  const isActive = pathname === href || pathname.startsWith(`${href}/`) || items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <div className={`rounded-[1.25rem] border ${invert ? "border-white/10 bg-white/5" : "border-[var(--color-line)] bg-[var(--color-surface)]"}`}>
      <div className="flex items-center gap-2 p-2">
        <Link
          href={href}
          onClick={() => onNavigate(href)}
          className={`flex-1 rounded-[1rem] px-4 py-3 text-sm font-semibold transition-colors ${
            invert
              ? isActive
                ? "bg-white/10 text-white"
                : "text-white/90 hover:bg-white/8 hover:text-white"
              : isActive
                ? "bg-white text-[var(--color-brand)]"
                : "text-[var(--color-ink)] hover:bg-white hover:text-[var(--color-brand)]"
          }`}
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
            invert ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-[var(--color-muted)] hover:bg-white hover:text-[var(--color-brand)]"
          }`}
          aria-expanded={isOpen ? "true" : "false"}
          aria-label={`Toggle ${label} menu`}
        >
          <svg className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen ? (
        <div className="grid gap-2 px-3 pb-3">
          {items.map((item) => {
            const itemActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onNavigate(item.href)}
                className={`rounded-[1rem] px-4 py-3 transition-colors ${
                  invert
                    ? itemActive
                      ? "bg-white/10 text-white"
                      : "text-white/74 hover:bg-white/8 hover:text-white"
                    : itemActive
                      ? "bg-white text-[var(--color-brand)]"
                      : "text-[var(--color-muted)] hover:bg-white hover:text-[var(--color-brand)]"
                }`}
              >
                <div className="text-sm font-medium">{item.label}</div>
                <div className={`mt-1 text-xs leading-relaxed ${invert ? "text-white/58" : "text-[var(--color-muted)]"}`}>{item.description}</div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function MobileNav({ invert = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (href: string) => {
    setIsOpen(false);
    router.prefetch(href);
  };

  const toggleSection = (key: keyof typeof dropdownMenus) => {
    setExpanded((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const buttonClass = invert
    ? "text-white hover:bg-white/10 focus-visible:outline-white"
    : "text-[var(--color-brand)] hover:bg-[var(--color-soft)] focus-visible:outline-[var(--color-brand)]";

  const panelClass = invert
    ? "border-white/15 bg-[rgba(7,43,69,0.96)] text-white"
    : "border-[var(--color-line)] bg-white/96 text-[var(--color-ink)] shadow-[0_24px_60px_rgba(10,61,98,0.16)]";

  return (
    <>
      <button
        onClick={() => setIsOpen((current) => !current)}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 xl:hidden ${buttonClass}`}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {isOpen ? <div className="fixed inset-0 z-40 bg-slate-950/30 xl:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" /> : null}

      <nav
        className={`fixed left-4 right-4 top-24 z-50 origin-top rounded-[1.75rem] border p-4 backdrop-blur-xl transition-all duration-300 xl:hidden ${panelClass} ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="grid max-h-[calc(100vh-8rem)] gap-3 overflow-y-auto">
          {navigation.map((item) =>
            item.menu ? (
              <MobileNavSection
                key={item.label}
                label={item.label}
                href={item.href}
                invert={invert}
                pathname={pathname}
                isOpen={Boolean(expanded[item.menu])}
                onToggle={() => toggleSection(item.menu!)}
                onNavigate={handleNavigate}
                items={dropdownMenus[item.menu]}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition-colors ${
                  invert
                    ? pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-white/10 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "bg-[var(--color-soft)] text-[var(--color-brand)]"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-soft)] hover:text-[var(--color-brand)]"
                }`}
                onClick={() => handleNavigate(item.href)}
              >
                {item.label}
              </Link>
            ),
          )}

          <div className={`mt-3 border-t pt-4 ${invert ? "border-white/15" : "border-[var(--color-line)]"}`}>
            <Link
              href="/studio/login"
              className={`block rounded-[1.2rem] px-4 py-3 text-center text-sm font-semibold transition-colors ${
                invert ? "bg-white/10 text-white hover:bg-white/20" : "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-deep)]"
              }`}
              onClick={() => handleNavigate("/studio/login")}
            >
              Studio
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
