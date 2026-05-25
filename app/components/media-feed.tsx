"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import type { MediaEngagementEntry } from "@/lib/media-engagement-store";

export type MediaTimelineItem = {
  id: string;
  kind: "photo" | "card";
  mediaSrc: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  caption: string;
  createdAt: string;
  channelLabel: string;
  href?: string;
};

type MediaFeedProps = {
  items: Array<{
    item: MediaTimelineItem;
    engagement: MediaEngagementEntry;
  }>;
};

export function MediaFeed({ items }: MediaFeedProps) {
  const [entries, setEntries] = useState(items);
  const [statusMessage, setStatusMessage] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function updateEntry(mediaSrc: string, nextEntry: MediaEngagementEntry) {
    setEntries((current) =>
      current.map((entry) => (entry.item.mediaSrc === mediaSrc ? { ...entry, engagement: nextEntry } : entry))
    );
  }

  function runAction(mediaSrc: string, payload: Record<string, string>) {
    startTransition(async () => {
      const response = await fetch('/api/media/engagement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mediaSrc, ...payload }),
      });

      const data = (await response.json()) as MediaEngagementEntry & { message?: string };

      if (!response.ok) {
        setStatusMessage((current) => ({ ...current, [mediaSrc]: data.message ?? 'That action could not be completed.' }));
        return;
      }

      updateEntry(mediaSrc, data);
      setStatusMessage((current) => ({
        ...current,
        [mediaSrc]: payload.action === 'share' ? 'Share action recorded.' : 'Thanks for the like.',
      }));
    });
  }

  async function handleShare(mediaSrc: string, title: string, caption: string) {
    const shareUrl = `${window.location.origin}/media`;
    const shareText = `${title} - ${caption}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: shareUrl });
      } catch {
        return;
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      } catch {
        setStatusMessage((current) => ({ ...current, [mediaSrc]: 'Could not copy the share text automatically.' }));
        return;
      }
    }

    runAction(mediaSrc, { action: 'share' });
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {entries.map(({ item, engagement }) => (
        <article
          key={item.id}
          className="group overflow-hidden rounded-[1.8rem] border border-[var(--color-line)] bg-white shadow-[0_16px_40px_rgba(10,61,98,0.1)]"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] px-4 py-4">
            <div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">chairman.official</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">{item.channelLabel}</p>
            </div>
            <p className="text-xs text-[var(--color-muted)]">{item.createdAt}</p>
          </div>

          <div className="relative aspect-square bg-[var(--color-surface)] p-3">
            <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-[var(--color-soft)]">
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 360px"
              />
            </div>
          </div>

          <div className="space-y-4 px-4 py-4">
            <div className="space-y-2">
              <p className="text-base font-semibold leading-6 text-[var(--color-ink)]">{item.title}</p>
              <p className="text-sm leading-7 text-[var(--color-muted)]">{item.caption}</p>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[var(--color-ink)]">
              <button type="button" onClick={() => runAction(item.mediaSrc, { action: 'like' })} disabled={isPending} className="transition hover:text-[var(--color-brand)]">
                Like {engagement.likes}
              </button>
              <button type="button" onClick={() => handleShare(item.mediaSrc, item.title, item.caption)} disabled={isPending} className="transition hover:text-[var(--color-brand)]">
                Share {engagement.shares}
              </button>
              <span>Comments {engagement.comments.length}</span>
            </div>

            {item.href ? (
              <Link href={item.href} className="inline-flex text-sm font-semibold text-[var(--color-brand)]">
                Open related post
              </Link>
            ) : null}

            {statusMessage[item.mediaSrc] ? <p className="text-sm font-medium text-[var(--color-brand)]">{statusMessage[item.mediaSrc]}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}