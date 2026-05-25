import type { Metadata } from "next";
import Link from "next/link";
import { StudioLoginForm } from "@/app/components/studio-login-form";

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export const metadata: Metadata = {
  title: "Studio Login | Chairman.Official",
  description: "Protected local entry point for the Chairman.Official editorial studio.",
};

export default async function StudioLoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  const nextPath = next && next.startsWith("/studio") ? next : "/studio";

  return (
    <main className="min-h-screen bg-[var(--color-surface)] px-6 py-10 lg:px-10">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_20px_60px_rgba(10,61,98,0.18)]">
          <p className="text-xs uppercase tracking-[0.24em] text-white/68">Chairman.Official</p>
          <h1 className="mt-8 font-heading text-4xl font-bold">Editorial Studio Access</h1>
          <p className="mt-5 text-base leading-8 text-white/78">
            This local sign-in protects the studio workspace where posts are drafted, edited, reviewed, and published into the site content store.
          </p>
          {nextPath !== "/studio" ? (
            <p className="mt-5 rounded-[1rem] border border-white/14 bg-white/10 px-4 py-3 text-sm leading-7 text-white/84">
              Sign in and you will go straight to <span className="font-semibold">{nextPath}</span>.
            </p>
          ) : null}
          <div className="mt-8 flex gap-3">
            <Link href="/" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
              Back to Site
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="section-kicker">Protected access</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Enter the studio</h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            Use your local studio password. For stronger protection later, we can swap this for full authentication.
          </p>
          <StudioLoginForm nextPath={nextPath} />
        </section>
      </div>
    </main>
  );
}
