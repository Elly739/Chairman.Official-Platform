"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";

export function GlobalHeader() {
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pt-6 lg:px-10">
      <SiteHeader />
    </div>
  );
}
