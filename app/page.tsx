import Link from "next/link";
import { PostCard } from "./components/post-card";
import { ProjectCard } from "./components/project-card";
import { NewsletterForm } from "./components/newsletter-form";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import {
  getAllMediaItems,
  getAllProjects,
  getFeaturedPost,
  getLatestDeskPost,
  getPostsByCategory,
} from "@/lib/content";


export default function Home() {
  const featuredPost = getFeaturedPost();
  const latestDeskPost = getLatestDeskPost();
  const projects = getAllProjects();
  const mediaItems = getAllMediaItems();
  const homepageNews = getPostsByCategory("news").slice(0, 3);
  const homepageBlog = getPostsByCategory("blog").slice(0, 1);

  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_32%),linear-gradient(135deg,_#072b45_0%,_#0A3D62_55%,_#114f7f_100%)]" />
        <div className="absolute inset-x-0 top-[-12rem] h-80 bg-[radial-gradient(circle,_rgba(255,255,255,0.18),_transparent_60%)] blur-3xl" />
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-12 pt-6 lg:px-10">
          <SiteHeader invert />

          <div className="grid flex-1 items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="max-w-2xl text-white">
              <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/80">
                Chairman.Official
              </p>
              <h1 className="font-heading text-5xl font-extrabold leading-tight sm:text-6xl xl:text-7xl">
                Elly Okello
                <span className="mt-2 block text-white/72">Chairman, Innovator, Builder</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/78 sm:text-xl">
                Thought Leadership. Innovation. Impact.
              </p>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/72 sm:text-lg">
                Official updates, leadership reflections, public ideas, and the work shaping tomorrow&apos;s conversations.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Link href="/news" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,255,255,0.2)]">
                  Read Latest Updates
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-white/24 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
                  About Elly Okello
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/16">
                  Contact
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="hero-grid absolute -inset-6 rounded-[2rem] opacity-35" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/16 bg-white/10 p-5 shadow-[0_28px_100px_rgba(1,12,24,0.38)] backdrop-blur-xl">
                <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(160deg,_rgba(255,255,255,0.14),_rgba(255,255,255,0.03))] p-5">
                  <div className="relative overflow-hidden rounded-[1.4rem] bg-[linear-gradient(140deg,_rgba(6,25,40,0.9),_rgba(14,74,115,0.72)),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_30%)] px-6 pb-6 pt-7">
                    <div className="absolute right-[-3rem] top-[-2rem] h-32 w-32 rounded-full bg-white/15 blur-3xl" />
                    <div className="absolute bottom-[-2rem] left-[-1rem] h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />
                    <div className="relative flex min-h-[28rem] flex-col justify-between">
                      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.28em] text-white/65">
                        <span>Featured Story</span>
                        <span>{featuredPost.publishedAt}</span>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-white/60">{featuredPost.kicker}</p>
                        <h2 className="mt-3 max-w-md font-heading text-4xl font-semibold leading-tight text-white">
                          {featuredPost.title}
                        </h2>
                        <p className="mt-4 max-w-sm text-sm leading-7 text-white/72">{featuredPost.summary}</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <article className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4 text-white backdrop-blur-sm">
                          <p className="text-xs uppercase tracking-[0.24em] text-white/60">Public Voice</p>
                          <h2 className="mt-2 font-heading text-xl font-semibold">Clarity in Every Message</h2>
                          <p className="mt-2 text-sm leading-6 text-white/72">Statements, commentary, and updates shaped with discipline and conviction.</p>
                        </article>
                        <article className="rounded-[1.25rem] border border-white/10 bg-white/10 p-4 text-white backdrop-blur-sm">
                          <p className="text-xs uppercase tracking-[0.24em] text-white/60">Audience</p>
                          <h2 className="mt-2 font-heading text-xl font-semibold">Built to Travel</h2>
                          <p className="mt-2 text-sm leading-6 text-white/72">A strong idea should move from the website into conversations, communities, and action.</p>
                        </article>
                      </div>
                    </div>
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
                Join the audience list for leadership notes, official announcements, and key publishing moments.
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
            <Link href="/blog" className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">All Blog Posts</Link>
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
              <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-muted)]">Chairman&apos;s Note</p>
              <blockquote className="mt-6 font-heading text-3xl font-semibold leading-[1.5] text-[var(--color-ink)] sm:text-4xl">
                &ldquo;Leadership earns trust when words, action, and public value move together.&rdquo;
              </blockquote>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)]">A space for official notes, longer reflections, and disciplined public communication.</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker">Projects</p>
            <h2 className="section-title">Visible execution across meaningful initiatives.</h2>
            <p className="section-copy">Initiatives, partnerships, and ideas moving from intention into measurable work.</p>
          </div>
          <Link href="/projects" className="inline-flex items-center rounded-full border border-[var(--color-line)] px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">See All Projects</Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
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

