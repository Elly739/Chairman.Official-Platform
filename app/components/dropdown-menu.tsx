"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownMenuProps {
  label: string;
  href: string;
  items: DropdownItem[];
  invert?: boolean;
  isActive?: boolean;
}

export function DropdownMenu({ label, href, items, invert = false, isActive = false }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const textClass = invert
    ? isActive || isOpen
      ? "text-white"
      : "text-white/78 hover:text-white"
    : isActive || isOpen
      ? "text-[var(--color-brand)]"
      : "text-[var(--color-muted)] hover:text-[var(--color-brand)]";

  const menuClass = invert
    ? "border-white/15 bg-[rgba(9,48,78,0.96)] text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)]"
    : "border-[var(--color-line)] bg-white/96 text-[var(--color-ink)] shadow-[0_22px_60px_rgba(10,61,98,0.14)]";

  return (
    <div ref={dropdownRef} className="relative">
      <div
        className={`flex items-center gap-1 rounded-full px-2 py-1 transition-colors ${
          invert
            ? isActive || isOpen
              ? "bg-white/12"
              : "hover:bg-white/8"
            : isActive || isOpen
              ? "bg-[var(--color-soft)] shadow-sm"
              : "hover:bg-[var(--color-soft)]"
        }`}
      >
        <Link
          href={href}
          className={`px-1.5 py-1 text-[13px] font-medium leading-tight transition-colors duration-200 xl:text-sm ${textClass}`}
          onMouseEnter={() => router.prefetch(href)}
          aria-current={pathname === href ? "page" : undefined}
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          onMouseEnter={() => setIsOpen(true)}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${
            invert
              ? "text-white/76 hover:bg-white/10 hover:text-white"
              : "text-[var(--color-muted)] hover:bg-[var(--color-soft)] hover:text-[var(--color-brand)]"
          }`}
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="true"
          aria-label={`Open ${label} menu`}
        >
          <svg
            className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute left-0 top-full mt-3 w-72 rounded-[1.4rem] border p-2 backdrop-blur-xl transition-all ${menuClass}`}
          role="menu"
          aria-label={`${label} menu`}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="grid gap-1" role="group">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group block rounded-[1.05rem] px-4 py-3 transition-colors ${
                  invert ? "hover:bg-white/10" : "hover:bg-[var(--color-soft)]"
                } ${pathname === item.href ? (invert ? "bg-white/10" : "bg-[var(--color-soft)]") : ""}`}
                onClick={() => setIsOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setIsOpen(false);
                  }
                }}
                onMouseEnter={() => router.prefetch(item.href)}
                role="menuitem"
              >
                <div className="text-sm font-medium">{item.label}</div>
                {item.description && (
                  <div className={`mt-1 text-xs leading-relaxed ${invert ? "text-white/62" : "text-[var(--color-muted)]"}`}>
                    {item.description}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
