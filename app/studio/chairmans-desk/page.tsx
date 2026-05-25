import Link from "next/link";
import { StudioShell } from "../../components/studio-shell";
import { updatePostEditorialStatus } from "../actions";
import { requireStudioAuth } from "@/lib/studio-auth";
import { getAllStudioPosts, getStudioPostHref } from "@/lib/content";

const statusClasses = {
  published: "bg-emerald-100 text-emerald-700",
  review: "bg-amber-100 text-amber-700",
  draft: "bg-slate-100 text-slate-700",
};

function DeskAnnouncementCard({
  post,
}: {
  post: ReturnType<typeof getAllStudioPosts>[number];
}) {
  const sendToDraft = updatePostEditorialStatus.bind(null, post.slug, "draft");
  const sendToReview = updatePostEditorialStatus.bind(null, post.slug, "review");
  const publishNow = updatePostEditorialStatus.bind(null, post.slug, "published");

  return (
    <article className="rounded-[1.6rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">{post.kicker}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusClasses[post.editorialStatus]}`}>
          {post.editorialStatus}
        </span>
      </div>
      <h3 className="mt-4 font-heading text-2xl font-semibold text-[var(--color-ink)]">{post.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{post.summary}</p>
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
        <span>{post.updatedAt}</span>
        <span>{post.distributionChannels.join(" | ")}</span>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={getStudioPostHref(post)} className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
          Open Announcement
        </Link>
        {post.editorialStatus !== "draft" ? (
          <form action={sendToDraft}>
            <button type="submit" className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)]">
              Move to Draft
            </button>
          </form>
        ) : null}
        {post.editorialStatus !== "review" ? (
          <form action={sendToReview}>
            <button type="submit" className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)]">
              Send to Review
            </button>
          </form>
        ) : null}
        {post.editorialStatus !== "published" ? (
          <form action={publishNow}>
            <button type="submit" className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white">
              Publish Now
            </button>
          </form>
        ) : null}
      </div>
    </article>
  );
}

export default async function StudioChairmansDeskPage() {
  await requireStudioAuth("/studio/chairmans-desk");
  const deskAnnouncements = getAllStudioPosts().filter((post) => post.category === "desk");

  return (
    <StudioShell
      title="Chairman's Desk announcements"
      intro="Create and manage official Chairman's Desk announcement cards separately from regular posts."
    >
      <div className="mb-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_20px_60px_rgba(10,61,98,0.18)]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/68">Dedicated workflow</p>
          <h2 className="mt-6 font-heading text-3xl font-semibold">Separate space for Desk announcements.</h2>
          <p className="mt-4 text-sm leading-7 text-white/82">
            Build official Chairman&apos;s Desk cards here, publish them, and keep this editorial track independent from news/blog operations.
          </p>
          <div className="mt-8">
            <Link href="/studio/chairmans-desk/new" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
              Create Desk Announcement
            </Link>
          </div>
        </article>
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Desk queue</p>
          <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">
            Total Desk announcements: <span className="font-semibold text-[var(--color-ink)]">{deskAnnouncements.length}</span>
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            This list controls what appears publicly on the Chairman&apos;s Desk page.
          </p>
        </article>
      </div>

      <section className="grid gap-6">
        {deskAnnouncements.length ? (
          deskAnnouncements.map((post) => <DeskAnnouncementCard key={post.slug} post={post} />)
        ) : (
          <article className="rounded-[1.6rem] border border-dashed border-[var(--color-line)] bg-white p-8 text-sm leading-7 text-[var(--color-muted)]">
            No Chairman&apos;s Desk announcements yet. Create your first one to populate the public desk page.
          </article>
        )}
      </section>
    </StudioShell>
  );
}
