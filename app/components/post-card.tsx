"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/lib/content";

const colorByCategory = {
  news: "bg-[var(--color-soft)] text-[var(--color-brand)]",
  blog: "bg-white text-[var(--color-brand)] border border-[var(--color-line)]",
  desk: "bg-[var(--color-brand)] text-white",
};

export function PostCard({ post }: { post: Post }) {
  const postHref = post.category === "desk" ? `/chairmans-desk/${post.slug}` : `/${post.category}/${post.slug}`;

  return (
    <motion.article
      className="group overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]"
      role="article"
      aria-labelledby={`post-title-${post.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, boxShadow: "0 24px 56px rgba(10,61,98,0.15)" }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#0a3d62,#3e6c8e)]">
        <Image
          src={post.coverImage ?? "/media/news-cover.svg"}
          alt={post.coverAlt ?? post.title}
          fill
          className="object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
        />
        {post.portraitImage && (
          <motion.div
            className="absolute left-4 top-4 h-16 w-16 overflow-hidden rounded-full border-4 border-white/80 bg-white/90 shadow-lg ring-2 ring-white/50"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src={post.portraitImage}
              alt={post.portraitAlt ?? "Portrait"}
              fill
              className="object-cover"
              sizes="64px"
            />
          </motion.div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${colorByCategory[post.category as keyof typeof colorByCategory]}`}>
            {post.kicker}
          </span>
          <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">{post.publishedAt}</span>
        </div>
        <h3 id={`post-title-${post.slug}`} className="mt-4 font-heading text-2xl font-semibold leading-snug text-[var(--color-ink)]">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{post.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-gradient-to-r from-[var(--color-accent-soft)] to-[var(--color-soft)] px-3 py-1 text-xs font-medium text-[var(--color-brand)]">
              {tag}
            </span>
          ))}
        </div>
        <Link href={postHref} className="btn-brand-subtle mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
          Read More <span>→</span>
        </Link>
      </div>
    </motion.article>
  );
}
