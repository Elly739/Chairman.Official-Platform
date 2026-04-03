"use client";

import { useEffect, useRef } from 'react';

export default function SkipNav() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      linkRef.current?.focus();
    }
  }, []);

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-50 rounded-md bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-200 focus:opacity-100 focus-visible:opacity-100 lg:left-6 lg:top-6 print:hidden"
      ref={linkRef}
    >
      Skip to content
    </a>
  );
}
