"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type CreateMode = "chooser" | "media";

type SelectedUpload = {
  id: string;
  file: File;
  previewUrl: string;
};

const createChoices = [
  {
    label: "Post",
    description: "Fastest flow for personal photos and public visual posts. Choose files, write a caption, and publish.",
    href: "/studio/posts",
    tone: "bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)] text-white",
    cta: "Start post",
    kind: "media" as const,
  },
  {
    label: "Poster",
    description: "Create a branded poster or card for News, Insights, Chairman's Desk, or campaign-style distribution.",
    href: "/studio/posts/new",
    tone: "border border-[var(--color-line)] bg-white text-[var(--color-ink)]",
    cta: "Open poster editor",
  },
  {
    label: "News Update",
    description: "For official announcements, updates, and public newsroom posts.",
    href: "/studio/news/new",
    tone: "border border-[var(--color-line)] bg-white text-[var(--color-ink)]",
    cta: "Open news editor",
  },
  {
    label: "Insight Article",
    description: "For longer reflections, essays, and thought leadership pieces.",
    href: "/studio/blog/new",
    tone: "border border-[var(--color-line)] bg-white text-[var(--color-ink)]",
    cta: "Open article editor",
  },
  {
    label: "Site Pages",
    description: "Review and update the content direction for Home, About, Vision, Media, Contact, and related public pages.",
    href: "/studio/site-content",
    tone: "border border-[var(--color-line)] bg-white text-[var(--color-ink)]",
    cta: "Open site pages",
  },
];

function fileNameLabel(name: string) {
  const trimmed = name.includes(".") ? name.slice(0, name.lastIndexOf(".")) : name;
  return trimmed.replace(/[-_]+/g, " ").trim();
}

export function StudioCreateFlow() {
  const router = useRouter();
  const [mode, setMode] = useState<CreateMode>("chooser");
  const [step, setStep] = useState(1);
  const [uploads, setUploads] = useState<SelectedUpload[]>([]);
  const [caption, setCaption] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [channelLabel, setChannelLabel] = useState("Public Media Post");
  const [mediaType, setMediaType] = useState("Personal Photo");
  const [publishMessage, setPublishMessage] = useState("");
  const [isPublishing, startPublishing] = useTransition();

  useEffect(() => {
    return () => {
      uploads.forEach((upload) => URL.revokeObjectURL(upload.previewUrl));
    };
  }, [uploads]);

  const primaryUpload = uploads[0];
  const generatedTitle = useMemo(() => {
    if (postTitle.trim()) {
      return postTitle.trim();
    }

    if (primaryUpload) {
      return fileNameLabel(primaryUpload.file.name);
    }

    return "New media post";
  }, [postTitle, primaryUpload]);

  function handleFileSelection(files: FileList | null) {
    if (!files?.length) {
      return;
    }

    setPublishMessage("");
    setUploads((current) => {
      current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      return Array.from(files).map((file, index) => ({
        id: `${file.name}-${file.size}-${index}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));
    });
    setStep(2);

    if (!postTitle.trim()) {
      setPostTitle(fileNameLabel(files[0].name));
    }

    if (!altText.trim()) {
      setAltText(fileNameLabel(files[0].name));
    }
  }

  function moveToFront(id: string) {
    setUploads((current) => {
      const selected = current.find((item) => item.id === id);
      if (!selected) return current;
      return [selected, ...current.filter((item) => item.id !== id)];
    });
  }

  function removeUpload(id: string) {
    setUploads((current) => {
      const match = current.find((item) => item.id === id);
      if (match) {
        URL.revokeObjectURL(match.previewUrl);
      }

      const next = current.filter((item) => item.id !== id);
      if (next.length === 0) {
        setStep(1);
      }
      return next;
    });
  }

  function publishMediaPost() {
    if (!uploads.length) {
      setPublishMessage("Choose at least one file first.");
      setStep(1);
      return;
    }

    if (!caption.trim()) {
      setPublishMessage("Write a caption before publishing.");
      setStep(2);
      return;
    }

    setPublishMessage("");
    startPublishing(async () => {
      try {
        for (const [index, upload] of uploads.entries()) {
          const title = uploads.length === 1 ? generatedTitle : `${generatedTitle} ${index + 1}`;
          const formData = new FormData();
          formData.append("file", upload.file);
          formData.append("title", title);
          formData.append("alt", altText || title);
          formData.append("description", caption);
          formData.append("caption", caption);
          formData.append("channelLabel", channelLabel);
          formData.append("type", mediaType);
          formData.append("publicPost", "on");

          const response = await fetch("/api/studio/media", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const payload = (await response.json().catch(() => null)) as { message?: string } | null;
            throw new Error(payload?.message ?? "Publishing failed.");
          }
        }

        router.push("/studio/media");
        router.refresh();
      } catch (error) {
        setPublishMessage(error instanceof Error ? error.message : "Publishing failed.");
      }
    });
  }

  if (mode === "chooser") {
    return (
      <section className="grid gap-6">
        <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">New flow</p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-[var(--color-ink)]">Create posts the easy way.</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
            Start with the content type. Public posts follow a simple step-by-step flow like a social app, while posters, news, insights, and page updates each keep their own clearer space.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {createChoices.map((choice) =>
            choice.kind === "media" ? (
              <button
                key={choice.label}
                type="button"
                onClick={() => {
                  setMode("media");
                  setStep(1);
                }}
                className={`rounded-[1.8rem] p-6 text-left shadow-[0_18px_45px_rgba(10,61,98,0.08)] transition hover:translate-y-[-2px] hover:shadow-[0_26px_60px_rgba(10,61,98,0.14)] ${choice.tone}`}
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/72">Fast publish</p>
                    <h3 className="mt-4 font-heading text-2xl font-semibold">{choice.label}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/82">{choice.description}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)] shadow-sm">
                    {choice.cta}
                  </span>
                </div>
              </button>
            ) : (
              <Link
                key={choice.label}
                href={choice.href}
                className={`rounded-[1.8rem] p-6 text-left shadow-[0_18px_45px_rgba(10,61,98,0.08)] transition hover:translate-y-[-2px] hover:border-[var(--color-line-strong)] hover:shadow-[0_26px_60px_rgba(10,61,98,0.14)] ${choice.tone}`}
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Guided editor</p>
                    <h3 className="mt-4 font-heading text-2xl font-semibold">{choice.label}</h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{choice.description}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-full bg-[var(--color-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-brand)] shadow-sm">
                    {choice.cta}
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
        <div className="flex flex-wrap items-center gap-3">
          {[
            { id: 1, label: "Files" },
            { id: 2, label: "Caption" },
            { id: 3, label: "Preview" },
          ].map((item) => (
            <div
              key={item.id}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                step === item.id
                  ? "bg-[var(--color-brand)] text-white shadow-[0_12px_28px_rgba(10,61,98,0.2)]"
                  : step > item.id
                    ? "bg-[var(--color-soft-strong)] text-[var(--color-brand)]"
                    : "border border-[var(--color-line)] bg-white text-[var(--color-muted)]"
              }`}
            >
              <span className="text-xs uppercase tracking-[0.16em]">{item.id}</span>
              {item.label}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)]">Post</p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-[var(--color-ink)]">Choose photos, write a caption, then publish.</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setMode("chooser");
              setStep(1);
            }}
            className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)] shadow-sm transition hover:border-[var(--color-line-strong)] hover:bg-[var(--color-soft)]"
          >
            Back
          </button>
        </div>

        <div className="mt-8 grid gap-8">
          <section className={`rounded-[1.7rem] border p-5 ${step === 1 ? "border-[var(--color-brand)] bg-[var(--color-soft)]" : "border-[var(--color-line)] bg-[var(--color-surface)]"}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 1</p>
            <h3 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Choose one or multiple files</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              Start like a social app. Pick your visuals first, then we move to the caption.
            </p>

            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--color-line-strong)] bg-white px-6 py-12 text-center transition hover:border-[var(--color-brand)] hover:bg-[var(--color-soft)]">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-soft)] text-3xl text-[var(--color-brand)] shadow-inner">+</span>
              <span className="mt-4 font-heading text-xl font-semibold text-[var(--color-ink)]">Select photos</span>
              <span className="mt-2 text-sm leading-7 text-[var(--color-muted)]">JPG, PNG, WEBP, or GIF. You can choose multiple files.</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                multiple
                className="hidden"
                onChange={(event) => handleFileSelection(event.target.files)}
              />
            </label>

            {uploads.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {uploads.map((upload, index) => (
                  <article key={upload.id} className="rounded-[1.25rem] border border-[var(--color-line)] bg-white p-3 shadow-sm">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-[var(--color-soft)]">
                      <Image src={upload.previewUrl} alt={upload.file.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[var(--color-ink)]">{fileNameLabel(upload.file.name)}</p>
                        <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">{index === 0 ? "Primary image" : "Additional image"}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {index !== 0 ? (
                        <button
                          type="button"
                          onClick={() => moveToFront(upload.id)}
                          className="rounded-full border border-[var(--color-line)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-brand)] shadow-sm transition hover:border-[var(--color-line-strong)] hover:bg-[var(--color-soft)]"
                        >
                          Make primary
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => removeUpload(upload.id)}
                        className="rounded-full border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </section>

          <section className={`rounded-[1.7rem] border p-5 ${step === 2 ? "border-[var(--color-brand)] bg-[var(--color-soft)]" : "border-[var(--color-line)] bg-[var(--color-surface)]"}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 2</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Write the caption</h3>
              </div>
              {uploads.length ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)] shadow-sm transition hover:border-[var(--color-line-strong)] hover:bg-[var(--color-soft)]"
                >
                  Continue
                </button>
              ) : null}
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Caption
                <textarea
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  rows={4}
                  placeholder="Write the public caption people should read with this post."
                  className="studio-input min-h-32"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                  Post title
                  <input value={postTitle} onChange={(event) => setPostTitle(event.target.value)} className="studio-input" placeholder="Optional internal title" />
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                  Alt text
                  <input value={altText} onChange={(event) => setAltText(event.target.value)} className="studio-input" placeholder="Describe the main image" />
                </label>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                  Type
                  <select value={mediaType} onChange={(event) => setMediaType(event.target.value)} className="studio-input">
                    <option value="Personal Photo">Personal Photo</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Public Event">Public Event</option>
                    <option value="Media Post Card">Media Post Card</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                  Channel label
                  <input value={channelLabel} onChange={(event) => setChannelLabel(event.target.value)} className="studio-input" placeholder="Public Media Post" />
                </label>
              </div>
              <p className="text-sm leading-6 text-[var(--color-muted)]">
                Music and location can come next. For now, this flow focuses on the essentials: files, caption, preview, publish.
              </p>
            </div>
          </section>

          <section className={`rounded-[1.7rem] border p-5 ${step === 3 ? "border-[var(--color-brand)] bg-[var(--color-soft)]" : "border-[var(--color-line)] bg-[var(--color-surface)]"}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Step 3</p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-[var(--color-ink)]">Preview and publish</h3>
              </div>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)] shadow-sm transition hover:border-[var(--color-line-strong)] hover:bg-[var(--color-soft)]"
              >
                Preview
              </button>
            </div>

            <div className="mt-5 rounded-[1.4rem] border border-[var(--color-line)] bg-white p-4 text-sm leading-7 text-[var(--color-muted)]">
              This will publish directly into the public Media page as a post. If you selected multiple files, each image will be posted into the media library with the same caption.
            </div>

            {publishMessage ? (
              <p className="mt-4 rounded-[1rem] bg-rose-50 px-4 py-3 text-sm text-rose-700">{publishMessage}</p>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={publishMediaPost}
                disabled={isPublishing}
                className="rounded-full bg-[var(--color-brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(10,61,98,0.18)] transition hover:bg-[var(--color-brand-deep)] disabled:opacity-60"
              >
                {isPublishing ? "Publishing..." : "Publish post"}
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-full border border-[var(--color-line)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-brand)] shadow-sm transition hover:border-[var(--color-line-strong)] hover:bg-[var(--color-soft)]"
              >
                Back to caption
              </button>
            </div>
          </section>
        </div>
      </article>

      <div className="grid gap-6 xl:sticky xl:top-24 xl:self-start">
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Live preview</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-ink)]">{generatedTitle}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            This is the simpler posting flow for the public media feed. Posters, news, insights, and Chairman&apos;s Desk publishing stay in their own clearer editors.
          </p>
        </article>

        <article className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <div className="relative aspect-[4/5] bg-[linear-gradient(145deg,_#0a3d62,_#0d517f)]">
            {primaryUpload ? (
              <Image src={primaryUpload.previewUrl} alt={altText || primaryUpload.file.name} fill className="object-cover" unoptimized />
            ) : (
              <div className="flex h-full items-center justify-center px-8 text-center text-sm leading-7 text-white/76">
                Your main selected image will appear here.
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(4,23,37,0.88))] p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/68">{channelLabel}</p>
              <p className="mt-3 text-base leading-7 text-white/88">{caption || "Your caption preview will appear here once you write it."}</p>
            </div>
          </div>
        </article>

        {uploads.length > 1 ? (
          <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-5 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)]">Selected files</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {uploads.map((upload, index) => (
                <div key={upload.id} className="overflow-hidden rounded-[1rem] border border-[var(--color-line)]">
                  <div className="relative aspect-[1/1] bg-[var(--color-soft)]">
                    <Image src={upload.previewUrl} alt={upload.file.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                    {index === 0 ? "Primary" : `Image ${index + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
