import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "./post-card";
import { ShareActions } from "./share-actions";
import { SiteFooter } from "./site-footer";
import { getPostHref, getRelatedPosts, type Post } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type ArticleShellProps = {
  post: Post;
  accent?: "brand" | "surface";
  children: ReactNode;
};

export function ArticleShell({ post, accent = "surface", children }: ArticleShellProps) {
  const relatedPosts = getRelatedPosts(post);
  const accentClass =
    accent === "brand"
      ? "bg-[var(--color-brand)] text-white shadow-[0_14px_40px_rgba(10,61,98,0.16)]"
      : "border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]";

  const bodyClass = accent === "brand" ? "text-white/82" : "text-[var(--color-muted)]";
  const shareUrl = absoluteUrl(getPostHref(post));
  const isArticleCover = post.category === "news" || post.category === "blog";
  const showPortraitBadge = post.category === "news" && Boolean(post.portraitImage);

  return (
    <main className="bg-[var(--color-surface)] text-[var(--color-ink)]">
      <article className="mx-auto w-full max-w-5xl px-6 py-20 lg:px-10">
        <p className="section-kicker">{post.kicker}</p>
        <h1 className="section-title">{post.title}</h1>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--color-muted)]">
          <span>{post.publishedAt}</span>
          <span>{post.readTime}</span>
          <span>{post.audience}</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand)]">
              {tag}
            </span>
          ))}
        </div>
        <p className="section-copy">{post.summary}</p>

        {isArticleCover ? (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-soft)] shadow-[0_14px_40px_rgba(10,61,98,0.12)]">
            <Image
              src={post.coverImage ?? "/media/news-cover.svg"}
              alt={post.coverAlt ?? post.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1280px) 100vw, 960px"
            />
            {showPortraitBadge ? (
              <div className="absolute left-6 top-6 h-20 w-20 overflow-hidden rounded-full border-4 border-white/90 bg-white/95 shadow-xl ring-4 ring-white/60">
                <Image src={post.portraitImage ?? "/media/news-cover.svg"} alt={post.portraitAlt ?? "Portrait"} fill className="object-cover" sizes="80px" />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.12)]">
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[320px] bg-[var(--color-soft)]">
                <Image
                  src={post.portraitImage ?? post.coverImage ?? "/media/desk-cover.svg"}
                  alt={post.portraitAlt ?? post.coverAlt ?? post.title}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1280px) 100vw, 420px"
                />
              </div>
              <div className="flex flex-col justify-between bg-[linear-gradient(160deg,_#0a3d62,_#0d517f)] p-8 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/68">Chairman.Official Statement</p>
                  <h2 className="mt-6 font-heading text-4xl font-semibold leading-tight">{post.title}</h2>
                  <p className="mt-6 text-base leading-8 text-white/78">{post.socialHook}</p>
                </div>
                <div className="mt-8 rounded-[1.4rem] border border-white/12 bg-white/10 px-5 py-4 text-sm leading-7 text-white/82">
                  Portrait-led cards drive this kind of post more than article covers.
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`mt-10 rounded-[2rem] p-8 ${accentClass}`}>
          <div className={`grid gap-6 text-base leading-8 ${bodyClass}`}>{children}</div>
        </div>

        <div className="mt-10 grid gap-6 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]">Social hook</p>
            <p className="mt-4 text-lg leading-8 text-[var(--color-ink)]">{post.socialHook}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{post.shareCaption}</p>
          </div>
          <ShareActions postTitle={post.title} shareCaption={post.shareCaption} shareUrl={shareUrl} />
        </div>

        {relatedPosts.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="section-kicker">Related Reading</p>
                <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Keep the story moving.</h2>
              </div>
              <Link href="/news" className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
                Visit Newsroom
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <SiteFooter />
    </main>
  );
}
