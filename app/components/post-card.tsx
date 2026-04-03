"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/content";

const colorByCategory = {
  news: "bg-[var(--color-soft)] text-[var(--color-brand)]",
  blog: "bg-white text-[var(--color-brand)] border border-[var(--color-line)]",
  desk: "bg-[var(--color-brand)] text-white",
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function PostCard({ post }: { post: Post }) {
  const postHref = post.category === "desk" ? `/chairmans-desk/${post.slug}` : `/${post.category}/${post.slug}`;

  return (
    <motion.article
      className="group overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      role="article"
      aria-labelledby={`post-title-${post.slug}`}
    >
      <motion.div
        className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#0a3d62,#3e6c8e)]"
        variants={imageVariants}
      >
        <Image
          src={post.coverImage ?? "/media/news-cover.svg"}
          alt={post.coverAlt ?? post.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
        />
        {post.portraitImage && (
          <div className="absolute left-4 top-4 h-16 w-16 overflow-hidden rounded-full border-4 border-white/80 bg-white/90 shadow-lg ring-2 ring-white/50">
            <Image
              src={post.portraitImage}
              alt={post.portraitAlt ?? "Portrait"}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        )}
      </motion.div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${colorByCategory[post.category as keyof typeof colorByCategory]}`}>
            {post.kicker}
          </span>
          <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {post.publishedAt}
          </span>
        </div>
        <h3 id={`post-title-${post.slug}`} className="mt-4 font-heading text-2xl font-semibold leading-snug text-[var(--color-ink)]">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{post.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
              {tag}
            </span>
          ))}
        </div>
        <Link href={postHref} className="btn-brand-subtle mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-brand)]">
          Read More -&gt;
        </Link>
      </div>
    </motion.article>
  );
}
