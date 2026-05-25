import Link from "next/link";
import { updatePostEditorialStatus } from "@/app/studio/actions";
import { getAllStudioPosts, getStudioPostHref, type PostCategory } from "@/lib/content";

const statusClasses = {
  published: "bg-emerald-100 text-emerald-700",
  review: "bg-amber-100 text-amber-700",
  draft: "bg-slate-100 text-slate-700",
};

function formatScheduleLabel(value?: string) {
  if (!value) {
    return "No schedule";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function PostListCard({
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
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">{post.kicker}</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-ink)]">{post.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusClasses[post.editorialStatus]}`}>
          {post.editorialStatus}
        </span>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">{post.summary}</p>

      <div className="mt-5 flex flex-wrap gap-3 text-xs text-[var(--color-muted)]">
        <span>{post.category}</span>
        <span>{post.updatedAt}</span>
        <span>{post.distributionChannels.join(" | ")}</span>
        <span>Schedule: {formatScheduleLabel(post.scheduledFor)}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={getStudioPostHref(post)} className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
          Open Editor
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

function PostSection({
  title,
  intro,
  posts,
  label,
}: {
  title: string;
  intro: string;
  posts: ReturnType<typeof getAllStudioPosts>;
  label: string;
}) {
  return (
    <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">{label}</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">{title}</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">{intro}</p>
      </div>

      {posts.length ? (
        <div className="mt-8 grid gap-4">
          {posts.map((post) => (
            <PostListCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-[1.4rem] bg-[var(--color-surface)] px-5 py-4 text-sm leading-7 text-[var(--color-muted)]">
          Nothing is sitting in this state right now.
        </p>
      )}
    </section>
  );
}

type StudioPostManagerProps = {
  category?: PostCategory;
  createHref: string;
  createLabel: string;
  scopeLabel: string;
  queueNote: string;
  itemLabel?: string;
};

export function StudioPostManager({
  category,
  createHref,
  createLabel,
  scopeLabel,
  queueNote,
  itemLabel,
}: StudioPostManagerProps) {
  const resolvedLabel = itemLabel ?? scopeLabel;
  const allPosts = category ? getAllStudioPosts().filter((post) => post.category === category) : getAllStudioPosts();
  const draftPosts = allPosts.filter((post) => post.editorialStatus === "draft");
  const reviewPosts = allPosts.filter((post) => post.editorialStatus === "review");
  const publishedPosts = allPosts.filter((post) => post.editorialStatus === "published");
  const scheduledPosts = allPosts.filter((post) => Boolean(post.scheduledFor));

  return (
    <>
      <div className="mb-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] p-8 text-white shadow-[0_20px_60px_rgba(10,61,98,0.18)]">
          <p className="text-xs uppercase tracking-[0.2em] text-white/68">Faster publishing flow</p>
          <h2 className="mt-6 font-heading text-3xl font-semibold">Create, review, publish from one place.</h2>
          <div className="mt-6 grid gap-3 text-sm leading-7 text-white/82">
            <p><span className="font-semibold text-white">1.</span> Create content in this section.</p>
            <p><span className="font-semibold text-white">2.</span> Use quick actions when the next step is obvious.</p>
            <p><span className="font-semibold text-white">3.</span> Open editor only when changing wording, image, or cards.</p>
          </div>
          <div className="mt-8">
            <Link href={createHref} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
              {createLabel}
            </Link>
          </div>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">{scopeLabel} queue</p>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)]">Drafts:</span> {draftPosts.length}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">In review:</span> {reviewPosts.length}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Published:</span> {publishedPosts.length}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Scheduled:</span> {scheduledPosts.length}</p>
          </div>
          <div className="mt-8 rounded-[1.4rem] bg-[var(--color-surface)] p-5 text-sm leading-7 text-[var(--color-muted)]">
            {queueNote}
          </div>
        </article>
      </div>

      <div className="grid gap-8">
        <PostSection title={`Draft ${resolvedLabel.toLowerCase()}`} intro="Early-stage ideas and pieces still being shaped." posts={draftPosts} label={resolvedLabel} />
        <PostSection title="Review queue" intro={`${resolvedLabel} that are nearly ready and need final approval or polishing.`} posts={reviewPosts} label={resolvedLabel} />
        <PostSection title={`Published ${resolvedLabel.toLowerCase()}`} intro={`Live ${resolvedLabel.toLowerCase()} that are already visible or waiting on a schedule.`} posts={publishedPosts} label={resolvedLabel} />
      </div>
    </>
  );
}
