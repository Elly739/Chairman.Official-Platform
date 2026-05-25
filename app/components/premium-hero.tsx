import Link from "next/link";

export function PremiumHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-brand)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_28%),linear-gradient(135deg,_#072b45_0%,_#0A3D62_55%,_#114f7f_100%)]" />
      <div className="relative mx-auto flex min-h-[80vh] w-full max-w-7xl flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
        <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
          Leadership Platform
        </span>
        <h1 className="mt-6 font-heading text-5xl font-extrabold leading-tight sm:text-6xl xl:text-7xl">
          Thoughts, Projects,
          <span className="mt-2 block text-white/72">and Impact</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
          Official updates, ideas in progress, and the work shaping tomorrow. This is where meaningful stories, public value, and execution meet.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link href="/news" className="btn-primary">
            Explore Latest Updates
          </Link>
          <Link href="/about" className="btn-tertiary">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
