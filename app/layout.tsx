import type { Metadata } from "next";
import { GlobalHeader } from "./components/global-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

function SkipNav() {
  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-50 rounded-md bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white opacity-0 transition-all focus:opacity-100 focus-visible:opacity-100 lg:left-6 lg:top-6 print:hidden"
    >
      Skip to content
    </a>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full">
        <SkipNav />
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}
