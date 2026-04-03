import Link from "next/link";
import { logoutStudio } from "@/app/studio/actions";

const studioNav = [
  { label: "Overview", href: "/studio" },
  { label: "Posts", href: "/studio/posts" },
  { label: "Desk Announcements", href: "/studio/chairmans-desk" },
  { label: "Projects", href: "/studio/projects" },
  { label: "Media", href: "/studio/media" },
  { label: "Audience", href: "/studio/audience" },
];

export function StudioShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[17rem_1fr] lg:px-10">
        <aside className="rounded-[2rem] bg-[var(--color-brand)] p-6 text-white shadow-[0_20px_60px_rgba(10,61,98,0.18)]">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/10 text-sm font-semibold tracking-[0.35em]">
              EO
            </span>
            <span className="font-heading text-lg font-semibold">Studio</span>
          </Link>
          <p className="mt-6 text-sm leading-7 text-white/76">
            Local editorial workspace for planning, reviewing, and preparing content before a full CMS lands.
          </p>
          <div className="mt-8 grid gap-3">
            {studioNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/12 px-4 py-3 text-sm font-medium text-white/84 transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <form action={logoutStudio} className="mt-8">
            <button type="submit" className="rounded-full border border-white/18 px-4 py-3 text-sm font-semibold text-white/86 transition hover:bg-white/10">
              Sign Out
            </button>
          </form>
        </aside>

        <section>
          <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
            <p className="section-kicker">Editorial Studio</p>
            <h1 className="mt-3 font-heading text-4xl font-bold text-[var(--color-ink)]">{title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">{intro}</p>
          </div>
          <div className="mt-8">{children}</div>
        </section>
      </div>
    </main>
  );
}
