import Link from "next/link";
import { StudioShell } from "@/app/components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";

const pageGroups = [
  {
    label: "Home",
    href: "/",
    studioHref: "/studio/posts",
    note: "Controls the first impression, featured message, calls to action, and section order.",
    action: "Create posts",
  },
  {
    label: "About",
    href: "/about",
    studioHref: "/about",
    note: "Leadership profile, biography tone, and identity positioning for the platform.",
    action: "Open public page",
  },
  {
    label: "Vision",
    href: "/vision",
    studioHref: "/vision",
    note: "Strategic direction, public philosophy, and the message behind the platform.",
    action: "Open public page",
  },
  {
    label: "Media",
    href: "/media",
    studioHref: "/studio/media",
    note: "Public posts and visuals that people can browse, like, comment on, and share.",
    action: "Manage posts",
  },
  {
    label: "Insights",
    href: "/blog",
    studioHref: "/studio/blog",
    note: "Long-form writing, reflections, and editorial insight pieces.",
    action: "Manage insights",
  },
  {
    label: "News",
    href: "/news",
    studioHref: "/studio/news",
    note: "Official updates, announcements, and newsroom publishing.",
    action: "Manage news",
  },
  {
    label: "Chairman's Desk",
    href: "/chairmans-desk",
    studioHref: "/studio/chairmans-desk",
    note: "Official announcement-card publishing for the Desk page.",
    action: "Manage Desk",
  },
  {
    label: "Contact",
    href: "/contact",
    studioHref: "/contact",
    note: "Public contact details, social links, and direct inquiry paths.",
    action: "Open public page",
  },
];

export default async function StudioSiteContentPage() {
  await requireStudioAuth("/studio/site-content");

  return (
    <StudioShell
      title="Site pages control"
      intro="Use this space to understand which Studio workflow controls which public page. This keeps tabs content understandable instead of scattered across unrelated sections."
    >
      <section className="grid gap-6">
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Clean structure</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-[var(--color-ink)]">Each part of the platform should have one obvious home.</h2>
          <div className="mt-6 grid gap-3 text-sm leading-7 text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)]">Posts:</span> the starting point for public visuals, posters, news, insights, and page updates.</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Media Library:</span> existing images and public visibility for the Media page.</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Insights:</span> long-form thought pieces.</p>
            <p><span className="font-semibold text-[var(--color-ink)]">News:</span> official updates and announcements.</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Site pages:</span> public tabs that need content direction and regular review.</p>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pageGroups.map((page) => (
            <article key={page.label} className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Public page</p>
              <h3 className="mt-4 font-heading text-2xl font-semibold text-[var(--color-ink)]">{page.label}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{page.note}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={page.href} className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
                  Open page
                </Link>
                <Link href={page.studioHref} className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white">
                  {page.action}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </StudioShell>
  );
}
