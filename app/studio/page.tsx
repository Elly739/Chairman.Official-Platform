import Link from "next/link";
import { StudioShell } from "../components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";
import { readAudienceStore } from "@/lib/audience-store";
import { readMediaEngagementStore } from "@/lib/media-engagement-store";
import {
  getPostsByEditorialStatus,
  getScheduledPosts,
  getStudioFeaturedPost,
  getStudioStats,
  getAllProjects,
  getPublicMediaPosts,
  getAllStudioPosts,
  getPublishingCalendar,
  getStudioPostHref,
} from "@/lib/content";

export default async function StudioOverviewPage() {
  await requireStudioAuth("/studio");
  const stats = getStudioStats();
  const projects = getAllProjects();
  const featuredPost = getStudioFeaturedPost();
  const nextProject = projects.find((project) => project.editorialStatus !== "backlog") ?? projects[0];
  const scheduledPosts = getScheduledPosts();
  const reviewPosts = getPostsByEditorialStatus("review");
  const draftPosts = getPostsByEditorialStatus("draft");
  const recentPosts = getAllStudioPosts().slice(0, 4);
  const calendar = getPublishingCalendar();
  const publicMediaPosts = getPublicMediaPosts().slice(0, 3);
  const audience = readAudienceStore();
  const mediaEngagementStore = readMediaEngagementStore();
  const latestAudienceName = audience.inquiries[0]?.name ?? audience.subscribers[0]?.email ?? "No audience activity yet";
  const totalMediaLikes = mediaEngagementStore.entries.reduce((sum, entry) => sum + entry.likes, 0);
  const totalMediaShares = mediaEngagementStore.entries.reduce((sum, entry) => sum + entry.shares, 0);
  const totalMediaComments = mediaEngagementStore.entries.reduce((sum, entry) => sum + entry.comments.length, 0);
  const topMediaEntries = [...mediaEngagementStore.entries]
    .sort((a, b) => b.likes + b.shares + b.comments.length - (a.likes + a.shares + a.comments.length))
    .slice(0, 3);
  const subscriberGrowth = audience.subscribers.slice(0, 4);
  const openInquiries = audience.inquiries.filter((inquiry) => !inquiry.handled).length;
  const handledInquiries = audience.inquiries.filter((inquiry) => inquiry.handled).length;

  return (
    <StudioShell
      title="Publishing control center"
      intro="Start here each day: see what needs review, what is scheduled, what is already public, and which public-facing surfaces need your attention next."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
        <article className="rounded-[1.75rem] bg-[var(--color-brand)] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/68">Published posts</p>
          <p className="mt-5 font-heading text-5xl font-bold">{stats.publishedPosts}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">In review</p>
          <p className="mt-5 font-heading text-5xl font-bold text-[var(--color-ink)]">{stats.reviewPosts}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Drafts</p>
          <p className="mt-5 font-heading text-5xl font-bold text-[var(--color-ink)]">{stats.draftPosts}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Scheduled</p>
          <p className="mt-5 font-heading text-5xl font-bold text-[var(--color-ink)]">{stats.scheduledPosts}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Public media posts</p>
          <p className="mt-5 font-heading text-5xl font-bold text-[var(--color-ink)]">{publicMediaPosts.length}</p>
        </article>
        <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Audience items</p>
          <p className="mt-5 font-heading text-5xl font-bold text-[var(--color-ink)]">{audience.inquiries.length + audience.subscribers.length}</p>
        </article>
      </div>


      <section className="mt-8 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Analytics</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">What is getting attention right now</h2>
          </div>
          <div className="text-sm leading-7 text-[var(--color-muted)] lg:max-w-xl">
            Use this as a quick read on public attention, media performance, and audience movement before you decide what to publish next.
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[1.5rem] bg-[var(--color-surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">Media likes</p>
            <p className="mt-4 font-heading text-4xl font-bold text-[var(--color-ink)]">{totalMediaLikes}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">Total likes recorded across visible media posts and cards.</p>
          </article>
          <article className="rounded-[1.5rem] bg-[var(--color-surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">Shares</p>
            <p className="mt-4 font-heading text-4xl font-bold text-[var(--color-ink)]">{totalMediaShares}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">A quick signal for which visuals are travelling beyond the site.</p>
          </article>
          <article className="rounded-[1.5rem] bg-[var(--color-surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">Comments</p>
            <p className="mt-4 font-heading text-4xl font-bold text-[var(--color-ink)]">{totalMediaComments}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">Audience responses coming in through the public media surface.</p>
          </article>
          <article className="rounded-[1.5rem] bg-[var(--color-surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">Open inquiries</p>
            <p className="mt-4 font-heading text-4xl font-bold text-[var(--color-ink)]">{openInquiries}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{handledInquiries} already marked handled in the audience inbox.</p>
          </article>
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_20px_60px_rgba(10,61,98,0.18)]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/68">Primary focus</p>
          {featuredPost ? (
            <>
              <h2 className="mt-8 font-heading text-3xl font-semibold">{featuredPost.title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">{featuredPost.shareCaption}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {featuredPost.distributionChannels.map((channel) => (
                  <span key={channel} className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-medium text-white/84">
                    {channel}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/studio/posts/${featuredPost.slug}`} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
                  Open featured poster
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-8 font-heading text-3xl font-semibold">No featured post yet</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/78">Create and publish your first post to see it featured here.</p>
            </>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/studio/posts" className="rounded-full border border-white/16 bg-white/10 px-5 py-3 text-sm font-semibold text-white">
              Create post
            </Link>
            <Link href="/studio/posts/new" className="rounded-full border border-white/24 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
              Create poster
            </Link>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Quick launch</p>
          <div className="mt-6 grid gap-4">
            <Link href="/studio/posts" className="rounded-[1.3rem] bg-[var(--color-surface)] px-5 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-soft)]">
              Create posts
            </Link>
            <Link href="/studio/media" className="rounded-[1.3rem] bg-[var(--color-surface)] px-5 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-soft)]">
              Manage media library
            </Link>
            <Link href="/studio/news" className="rounded-[1.3rem] bg-[var(--color-surface)] px-5 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-soft)]">
              Manage news
            </Link>
            <Link href="/studio/site-content" className="rounded-[1.3rem] bg-[var(--color-surface)] px-5 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:bg-[var(--color-soft)]">
              Manage site pages
            </Link>
          </div>

          <div className="mt-8 rounded-[1.4rem] bg-[var(--color-surface)] p-5 text-sm leading-7 text-[var(--color-muted)]">
            {scheduledPosts.length
              ? `Next scheduled drop: ${scheduledPosts[0].title}.`
              : "No scheduled post is waiting right now. Use scheduling when you want content to go live later."}
          </div>
        </article>
      </div>

      <section className="mt-8 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Next phase</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">What can make this feel like a full media house</h2>
          </div>
          <Link href="/studio/media" className="text-sm font-semibold text-[var(--color-brand)]">
            Open studio media
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[1.5rem] bg-[var(--color-surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">Distribution</p>
            <h3 className="mt-3 font-heading text-xl font-semibold text-[var(--color-ink)]">Daily social newsroom</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">Turn each published story into ready-to-post Instagram, X, LinkedIn, and WhatsApp assets with one click and a clearer approval flow.</p>
          </article>
          <article className="rounded-[1.5rem] bg-[var(--color-surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">Authority</p>
            <h3 className="mt-3 font-heading text-xl font-semibold text-[var(--color-ink)]">Press kit and official bio</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">Add a proper media kit with downloadable portraits, official biography, approved logos, and press-ready facts for journalists and partners.</p>
          </article>
          <article className="rounded-[1.5rem] bg-[var(--color-surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">Audience</p>
            <h3 className="mt-3 font-heading text-xl font-semibold text-[var(--color-ink)]">Newsletter and alerts</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">Let people subscribe to breaking updates, weekly briefings, event greetings, and Chairman&apos;s Desk messages instead of only browsing the site passively.</p>
          </article>
          <article className="rounded-[1.5rem] bg-[var(--color-surface)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">Operations</p>
            <h3 className="mt-3 font-heading text-xl font-semibold text-[var(--color-ink)]">Publishing calendar</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">Plan news, statements, campaigns, project milestones, and event greetings on a visual calendar so the whole platform feels intentional and consistent.</p>
          </article>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Publishing calendar</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">See the month like a newsroom schedule</h2>
          </div>
          <div className="text-sm leading-7 text-[var(--color-muted)] lg:max-w-xl">
            {calendar.upcoming.length
              ? `Next on the schedule: ${calendar.upcoming[0].post.title}.`
              : "No future publishing date is set right now. Add schedule times to make this board more useful."}
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[1.6rem] bg-[var(--color-surface)] p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-heading text-2xl font-semibold text-[var(--color-ink)]">{calendar.monthLabel}</h3>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
                {calendar.events.length} dated items
              </span>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-2 text-center text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="py-2">{day}</div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {Array.from({ length: calendar.firstWeekday }).map((_, index) => (
                <div key={`blank-${index}`} className="min-h-[88px] rounded-[1.2rem] border border-dashed border-[var(--color-line)]/60 bg-white/40" />
              ))}
              {Array.from({ length: calendar.daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayEvents = calendar.events.filter((event) => event.day === day);
                return (
                  <div key={day} className="min-h-[88px] rounded-[1.2rem] border border-[var(--color-line)] bg-white p-3">
                    <div className="text-sm font-semibold text-[var(--color-ink)]">{day}</div>
                    <div className="mt-2 grid gap-2">
                      {dayEvents.slice(0, 2).map((event) => (
                        <Link
                          key={`${event.post.slug}-${event.kind}`}
                          href={getStudioPostHref(event.post)}
                          className={`rounded-[0.85rem] px-2 py-2 text-left text-[11px] font-semibold leading-5 ${
                            event.kind === 'scheduled'
                              ? 'bg-[var(--color-brand)] text-white'
                              : event.kind === 'published'
                                ? 'bg-[var(--color-soft)] text-[var(--color-brand)]'
                                : 'bg-[var(--color-surface)] text-[var(--color-ink)]'
                          }`}
                        >
                          <span className="block uppercase tracking-[0.14em] opacity-80">{event.kind}</span>
                          <span className="mt-1 block line-clamp-2">{event.post.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.6rem] bg-[var(--color-surface)] p-5">
            <h3 className="font-heading text-2xl font-semibold text-[var(--color-ink)]">Upcoming items</h3>
            <div className="mt-5 grid gap-4">
              {calendar.upcoming.length ? (
                calendar.upcoming.map((entry) => (
                  <Link key={`${entry.post.slug}-${entry.kind}`} href={getStudioPostHref(entry.post)} className="rounded-[1.2rem] border border-[var(--color-line)] bg-white px-4 py-4 transition hover:bg-[var(--color-soft)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">{entry.kind}</span>
                      <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(entry.timestamp))}</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[var(--color-ink)]">{entry.post.title}</p>
                  </Link>
                ))
              ) : (
                <p className="rounded-[1.2rem] border border-[var(--color-line)] bg-white px-4 py-4 text-sm leading-7 text-[var(--color-muted)]">
                  Add a schedule time in a post to make upcoming drops appear here.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>


      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Top media</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">The posts and cards with the most traction</h2>
            </div>
            <Link href="/studio/media" className="text-sm font-semibold text-[var(--color-brand)]">
              Open media board
            </Link>
          </div>

          <div className="mt-8 grid gap-4">
            {topMediaEntries.length ? (
              topMediaEntries.map((entry) => (
                <div key={entry.mediaSrc} className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                  <span className="block font-semibold text-[var(--color-ink)]">{entry.mediaSrc.replace(/^card:/, "").replace(/^\/uploads\//, "")}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">
                    {entry.likes} likes | {entry.shares} shares | {entry.comments.length} comments
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                No media engagement has been recorded yet. Likes, shares, and comments will begin surfacing here as people interact.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Audience growth</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">The newest subscribers and contacts</h2>
            </div>
            <Link href="/studio/audience" className="text-sm font-semibold text-[var(--color-brand)]">
              Open inbox
            </Link>
          </div>

          <div className="mt-8 grid gap-4">
            {subscriberGrowth.length ? (
              subscriberGrowth.map((subscriber) => (
                <div key={subscriber.id} className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                  <span className="block font-semibold text-[var(--color-ink)]">{subscriber.email}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">{subscriber.source}</span>
                  <p className="mt-2">Joined on {subscriber.createdAt}.</p>
                </div>
              ))
            ) : (
              <p className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                Subscriber growth will show up here as soon as people begin joining the list.
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Needs attention</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">What to act on next</h2>
            </div>
            <Link href="/studio/posts" className="text-sm font-semibold text-[var(--color-brand)]">
              Open queue
            </Link>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
              <span className="font-semibold text-[var(--color-ink)]">Review queue:</span> {reviewPosts.length ? `${reviewPosts[0].title} is first in line.` : "No posts waiting for review right now."}
            </div>
            <div className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
              <span className="font-semibold text-[var(--color-ink)]">Draft queue:</span> {draftPosts.length ? `${draftPosts[0].title} is your newest draft.` : "No drafts are sitting idle."}
            </div>
            <div className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
              <span className="font-semibold text-[var(--color-ink)]">Project track:</span> {nextProject ? `Prepare the next update for ${nextProject.name}.` : "No projects yet. Add your first project."}
            </div>
            <div className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
              <span className="font-semibold text-[var(--color-ink)]">Audience:</span> Latest activity is from {latestAudienceName}.
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Recent work</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Posts you touched most recently</h2>
            </div>
            <Link href="/studio/posts" className="text-sm font-semibold text-[var(--color-brand)]">
              View all posts
            </Link>
          </div>

          <div className="mt-8 grid gap-4">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/studio/posts/${post.slug}`} className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)] transition hover:bg-[var(--color-soft)]">
                <span className="block font-semibold text-[var(--color-ink)]">{post.title}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">{post.editorialStatus} | {post.updatedAt}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Public media</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Media posts currently visible</h2>
            </div>
            <Link href="/studio/media" className="text-sm font-semibold text-[var(--color-brand)]">
              Open media board
            </Link>
          </div>

          <div className="mt-8 grid gap-4">
            {publicMediaPosts.length ? (
              publicMediaPosts.map((item) => (
                <div key={`${item.src}-${item.title}`} className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                  <span className="block font-semibold text-[var(--color-ink)]">{item.title}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">{item.channelLabel ?? item.type}</span>
                  <p className="mt-2">{item.caption ?? item.description}</p>
                </div>
              ))
            ) : (
              <p className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                No public media posts yet. Mark one from the media board when you want it to appear publicly.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Audience snapshot</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Latest public responses</h2>
            </div>
            <Link href="/studio/audience" className="text-sm font-semibold text-[var(--color-brand)]">
              Open inbox
            </Link>
          </div>

          <div className="mt-8 grid gap-4">
            {audience.inquiries.length ? (
              audience.inquiries.slice(0, 2).map((inquiry) => (
                <div key={inquiry.id} className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                  <span className="block font-semibold text-[var(--color-ink)]">{inquiry.name}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">{inquiry.subject}</span>
                  <p className="mt-2">{inquiry.message}</p>
                </div>
              ))
            ) : audience.subscribers.length ? (
              audience.subscribers.slice(0, 3).map((subscriber) => (
                <div key={subscriber.id} className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                  <span className="block font-semibold text-[var(--color-ink)]">{subscriber.email}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[var(--color-brand)]">{subscriber.source}</span>
                  <p className="mt-2">Joined on {subscriber.createdAt}.</p>
                </div>
              ))
            ) : (
              <p className="rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
                No audience activity has come in yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </StudioShell>
  );
}

