"use client";

import { useState } from "react";

type ShareActionsProps = {
  postTitle: string;
  shareCaption: string;
  shareUrl: string;
};

export function ShareActions({ postTitle, shareCaption, shareUrl }: ShareActionsProps) {
  const [message, setMessage] = useState("");
  const combinedText = `${postTitle} - ${shareCaption} ${shareUrl}`;

  async function copyLinkedInText() {
    try {
      await navigator.clipboard.writeText(combinedText);
      setMessage("Caption copied. Paste it into LinkedIn after the composer opens.");
    } catch {
      setMessage("Could not copy automatically. Select and copy the caption manually.");
    }
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-brand)]">Share-ready actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href={`https://wa.me/?text=${encodeURIComponent(`${postTitle} - ${shareCaption}`)}`} className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white">
          WhatsApp
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${postTitle} - ${shareCaption}`)}`} className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
          X Post
        </a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
          LinkedIn
        </a>
        <button type="button" onClick={copyLinkedInText} className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
          Copy Caption
        </button>
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
        LinkedIn usually opens the share composer with the link only. Paste the copied caption there if LinkedIn does not prefill the text for you.
      </p>
      {message ? <p className="mt-3 text-sm font-medium text-[var(--color-brand)]">{message}</p> : null}
    </div>
  );
}