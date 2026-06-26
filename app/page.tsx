import Image from "next/image";
import Link from "next/link";
import { PostCard } from "./components/post-card";
import { NewsletterForm } from "./components/newsletter-form";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import {
  getAllMediaItems,
  getFeaturedPost,
  getLatestDeskPost,
  getPostsByCategory,
} from "@/lib/content";

export default function Home() {
  const featuredPost = getFeaturedPost();
  const latestDeskPost = getLatestDeskPost();
  const mediaItems = getAllMediaItems();
  const homepageNews = getPostsByCategory("news").slice(0, 3);
  const homepageBlog = getPostsByCategory("blog").slice(0, 1);

  return (
    <main id="main-content" className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_32%),linear-gradient(135deg,_#072b45_0%,_#0A3D62_55%,_#114f7f_100%)]" />
        <div className="absolute inset-x-0 top-[-12rem] h-80 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_60%)] blur-3xl" />
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-6 lg:px-10">
          <SiteHeader invert />

          <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
            <div className="relative">
              <div className="hero-grid absolute -inset-6 rounded-[2rem] opacity-25" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/18 bg-white/6 shadow-[0_28px_100px_rgba(1,12,24,0.38)] backdrop-blur-xl">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(7,43,69,0.42),rgba(7,43,69,0.08)_42%,rgba(255,255,255,0.02))]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent,rgba(3,19,31,0.82))]" />
                <div className="relative min-h-[30rem] sm:min-h-[36rem]">
                  <Image
                    src="/uploads/portraits/Hero.png"
                    alt="Elly Okello portrait hero image"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 720px"
                  />
                  <div className="absolute left-6 right-6 bottom-6 sm:left-8 sm:right-8 sm:bottom-8">
                    <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                      Chairman.Official
                    </p>
                    <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl xl:text-6xl">
                      Elly Okello
                      <span className="mt-2 block text-white/72">Chairman, Innovator, Builder</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
                      Thought Leadership. Innovation. Impact.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Link href="/news" className="btn-primary">
                        Read Latest Updates
                      </Link>
                      <Link href="/vision" className="btn-tertiary">
                        Read the Vision
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/12 to-white/6 p-8 shadow-[0_28px_100px_rgba(1,12,24,0.38)] backdrop-blur-xl sm:p-10">
                <div className="absolute right-[-2rem] top-[-1.5rem] h-32 w-32 rounded-full bg-white/12 blur-3xl" />
                <div className="absolute bottom-[-1.5rem] left-[-1rem] h-32 w-32 rounded-full bg-cyan-300/15 blur-3xl" />
                <div className="relative flex min-h-[28rem] flex-col justify-between">
                  {featuredPost ? (
                    <>
                      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.28em] text-white/70">
                        <span>Featured Story</span>
                        <span>{featuredPost.publishedAt}</span>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-white/65">{featuredPost.kicker}</p>
                        <h2 className="mt-3 max-w-md font-heading text-4xl font-semibold leading-tight text-white">
                          {featuredPost.title}
                        </h2>
                        <p className="mt-4 max-w-sm text-base leading-7 text-white/80">{featuredPost.summary}</p>
                      </div>
                    </>
                  ) : (
                    <div className="grid gap-2">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/65">Welcome</p>
                      <h2 className="mt-3 max-w-md font-heading text-4xl font-semibold leading-tight text-white">
                        Chairman.Official Platform
                      </h2>
                      <p className="mt-4 max-w-sm text-base leading-7 text-white/80">A platform for vision, discipline, and visible work.</p>
                    </div>
                  )}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <article className="rounded-[1.25rem] border border-white/15 bg-white/8 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/12 hover:border-white/25">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/65">Public Voice</p>
                      <h3 className="mt-2 font-heading text-lg font-semibold">Clarity in Every Message</h3>
                      <p className="mt-2 text-sm leading-6 text-white/75">Statements, commentary, and updates shaped with discipline and conviction.</p>
                    </article>
                    <article className="rounded-[1.25rem] border border-white/15 bg-white/8 p-4 text-white backdrop-blur-sm transition-all hover:bg-white/12 hover:border-white/25">
                      <p className="text-xs uppercase tracking-[0.24em] text-white/65">Audience</p>
                      <h3 className="mt-2 font-heading text-lg font-semibold">Built to Travel</h3>
                      <p className="mt-2 text-sm leading-6 text-white/75">A strong idea should move from the website into conversations, communities, and action.</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_18px_45px_rgba(10,61,98,0.08)] sm:p-10">
            <p className="section-kicker">Public Identity</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold text-[var(--color-ink)]">A place for vision, discipline, and visible work.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)]">
              Chairman.Official brings together leadership communication, project visibility, and ideas worth carrying into the public sphere.
            </p>
          </article>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link href="/about" className="rounded-[1.75rem] bg-[var(--color-brand)] p-8 text-white shadow-[0_20px_55px_rgba(10,61,98,0.18)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/68">About</p>
              <h3 className="mt-8 font-heading text-2xl font-semibold">Read the profile and leadership direction.</h3>
            </Link>
            <Link href="/contact" className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-strong)] p-8 shadow-[0_14px_40px_rgba(10,61,98,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Contact</p>
              <h3 className="mt-8 font-heading text-2xl font-semibold text-[var(--color-ink)]">Open the direct contact and social channels.</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="rounded-[2rem] bg-white p-8 shadow-[0_18px_45px_rgba(10,61,98,0.08)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="section-kicker">Stay Connected</p>
              <h2 className="section-title">Receive updates, statements, and major moments directly.</h2>
              <p className="section-copy">
                Join the audience list for leadership notes, official announcements, and the strongest ideas moving into public view.
              </p>
            </div>
          </div>
          <NewsletterForm source="Homepage" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Latest News / Updates</p>
            <h2 className="section-title">The stories shaping the moment.</h2>
            <p className="section-copy">Recent announcements, leadership reflections, and ideas moving into the public conversation.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/news" className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">All News</Link>
            <Link href="/blog" className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">All Insights</Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[...homepageNews, ...homepageBlog].map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {latestDeskPost ? (
        <section className="bg-white py-24">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <div className="rounded-[2rem] bg-[var(--color-brand)] p-8 text-white shadow-[0_24px_60px_rgba(10,61,98,0.18)] sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/68">From the Chairman&apos;s Desk</p>
              <h2 className="mt-6 font-heading text-4xl font-bold leading-tight">{latestDeskPost.title}</h2>
              <p className="mt-6 text-base leading-8 text-white/78">{latestDeskPost.summary}</p>
              <Link href={`/chairmans-desk/${latestDeskPost.slug}`} className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--color-brand)]">Read Full Statement</Link>
            </div>

            <div className="rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface-strong)] p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-muted)]">Vision Note</p>
              <blockquote className="mt-6 font-heading text-3xl font-semibold leading-[1.5] text-[var(--color-ink)] sm:text-4xl">
                &ldquo;Leadership earns trust when words, action, and public value move together.&rdquo;
              </blockquote>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">A disciplined public direction where clarity, ideas, and action stay aligned.</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Community Impact</p>
            <h2 className="section-title">A stronger public presence needs visible work behind it.</h2>
            <p className="section-copy">The Media Kit now carries the public-facing portfolio of initiatives, repositories, and impact references connected to the platform.</p>
          </div>
          <Link href="/press-kit" className="inline-flex items-center rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">Open Community Impact</Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Public Repositories",
              body: "Selected builds, experiments, and civic-tech work now sit under Media Kit so public navigation stays clean while proof of execution remains visible.",
            },
            {
              title: "Platform Narrative",
              body: "Home, Vision, Media, and Insights now carry the main public story, while supporting references live one layer deeper where they are easier to browse.",
            },
            {
              title: "Partnership Readiness",
              body: "Organisers, collaborators, and media teams can still reach approved project references quickly without the main navigation feeling heavy.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.06)]">
              <h3 className="font-heading text-2xl font-semibold text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="section-kicker">Media and Distribution</p>
            <h2 className="section-title">Images, moments, and messages that travel well.</h2>
            <p className="section-copy">Public visuals, shareable moments, and media surfaces shaped for reach without losing identity.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="group relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_24px_60px_rgba(10,61,98,0.2)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.22),_transparent_30%)]" />
              <div className="relative flex min-h-[22rem] flex-col justify-between">
                <span className="inline-flex w-fit rounded-full border border-white/18 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/78">Media</span>
                <div>
                  <h3 className="font-heading text-4xl font-semibold">Presence that holds attention</h3>
                  <p className="mt-4 max-w-xl text-base leading-8 text-white/76">Portraits, public moments, and visual statements that carry the tone of the platform beyond the page.</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/media" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">Open Media</Link>
                  <Link href="/contact" className="rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-semibold text-white">Partnership & Contact</Link>
                </div>
              </div>
            </article>

            <div className="grid gap-6">
              {mediaItems.map((item) => (
                <article key={item.title} className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-strong)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">{item.type}</p>
                  <h3 className="mt-12 font-heading text-2xl font-semibold text-[var(--color-ink)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
