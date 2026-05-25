"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { renderEventCardSvg } from "@/lib/event-card-svg";
import type { EventCardConcept } from "@/lib/event-card-concepts";

type EventCardPreviewProps = {
  event: EventCardConcept;
};

async function convertSvgToPng(dataUrl: string, filename: string) {
  const image = new window.Image();
  image.decoding = "async";

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Could not render the event card image."));
    image.src = dataUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((pngBlob) => resolve(pngBlob), "image/png", 1);
  });

  if (!blob) {
    throw new Error("Could not create the PNG download.");
  }

  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(blobUrl);
}

export function EventCardPreview({ event }: EventCardPreviewProps) {
  const svg = renderEventCardSvg(event);
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const dialogId = useId();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownloadPng = async () => {
    try {
      setIsExporting(true);
      setDownloadError(null);
      await convertSvgToPng(dataUrl, `${event.slug}-chairman-official-card.png`);
    } catch (error) {
      setDownloadError(error instanceof Error ? error.message : "PNG export failed.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <article className="grid gap-4">
        <div className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_18px_45px_rgba(10,61,98,0.12)]">
          <button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="relative block aspect-square w-full overflow-hidden bg-white text-left"
            aria-haspopup="dialog"
            aria-controls={dialogId}
          >
            <Image src={dataUrl} alt={`${event.title} Chairman.Official card`} fill unoptimized className="object-cover" sizes="(max-width: 1280px) 100vw, 360px" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#081f37]/82 via-[#081f37]/24 to-transparent px-4 py-4 text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">Preview scaled to fit</span>
              <span className="rounded-full border border-white/22 bg-white/10 px-3 py-1 text-xs font-semibold">1080 x 1080 export</span>
            </div>
          </button>
          <div className="flex flex-col gap-4 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-brand)]">{event.occasion}</p>
                <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">{event.motif}</p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-center text-sm font-semibold text-[var(--color-brand)]"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={isExporting}
                  className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-center text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70"
                >
                  {isExporting ? "Preparing PNG..." : "Download PNG"}
                </button>
                <a href={dataUrl} download={`${event.slug}-chairman-official-card.svg`} className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-center text-sm font-semibold text-[var(--color-brand)]">
                  Download SVG
                </a>
              </div>
            </div>
            <p className="rounded-[1rem] bg-white px-4 py-3 text-sm leading-7 text-[var(--color-muted)]">{event.message}</p>
            <p className="text-xs leading-6 text-[var(--color-muted)]">
              PNG is the practical file for Instagram, LinkedIn, X, and WhatsApp. SVG stays here as the editable master export.
            </p>
            {downloadError ? <p className="text-sm font-medium text-[#9f2f2f]">{downloadError}</p> : null}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-brand)]">Use case</p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {event.occasion} cards should feel ceremonial, visual, and ready to export quickly for same-day greetings across your main channels.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--color-muted)]">
            {event.channels.map((channel) => (
              <span key={channel} className="rounded-full bg-white px-3 py-1">
                {channel}
              </span>
            ))}
          </div>
        </div>
      </article>

      {isPreviewOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#081f37]/72 p-4" role="dialog" aria-modal="true" aria-labelledby={dialogId}>
          <div className="w-full max-w-4xl rounded-[2rem] bg-white p-4 shadow-[0_30px_80px_rgba(8,31,55,0.35)] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--color-line)] pb-4">
              <div>
                <p id={dialogId} className="text-lg font-semibold text-[var(--color-ink)]">{event.title}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">Scaled preview for review. Final export remains crisp at 1080 x 1080.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)]"
              >
                Close
              </button>
            </div>
            <div className="mt-6 flex justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,_rgba(10,61,98,0.05),_rgba(200,155,60,0.07))] p-4 sm:p-6">
              <div className="relative aspect-square w-full max-w-[680px] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_18px_45px_rgba(10,61,98,0.14)]">
                <Image src={dataUrl} alt={`${event.title} Chairman.Official card preview`} fill unoptimized className="object-contain" sizes="(max-width: 1024px) 90vw, 680px" />
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={isExporting}
                className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70"
              >
                {isExporting ? "Preparing PNG..." : "Download PNG"}
              </button>
              <a href={dataUrl} download={`${event.slug}-chairman-official-card.svg`} className="rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)]">
                Download SVG
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
