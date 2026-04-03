"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import type { MediaItem, Post, Project } from "@/lib/content";

type StudioMediaManagerProps = {
  initialMediaItems: MediaItem[];
  draftPosts: Post[];
  projects: Project[];
};

function getSuggestedPath(item: MediaItem) {
  if (item.publicPost) return "Shown publicly on the Media page where people can like, comment, and share it.";
  if (item.src?.includes("/portraits/")) return "Private studio asset. Best for portrait-led cards and profile visuals.";
  if (item.src?.includes("/projects/")) return "Private studio asset. Best for project updates and project covers.";
  if (item.src?.includes("/posts/")) return "Private studio asset. Best for blog/news covers or card visuals.";
  return "Private studio asset. Available for posts, projects, and design work.";
}

function MediaLibraryCard({
  item,
  isPending,
  onDelete,
  onSave,
}: {
  item: MediaItem;
  isPending: boolean;
  onDelete: (src: string) => void;
  onSave: (src: string, updates: Partial<MediaItem>) => void;
}) {
  const isUploadedAsset = item.src?.startsWith("/uploads/");
  const [title, setTitle] = useState(item.title);
  const [type, setType] = useState(item.type);
  const [caption, setCaption] = useState(item.caption ?? item.description);
  const [channelLabel, setChannelLabel] = useState(item.channelLabel ?? item.type);
  const [publicPost, setPublicPost] = useState(Boolean(item.publicPost));
  const [description, setDescription] = useState(item.description);
  const [alt, setAlt] = useState(item.alt ?? "");

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
      <div className="relative aspect-[16/10] w-full bg-white">
        <Image src={item.src ?? "/media/news-cover.svg"} alt={item.alt ?? item.title} fill className="object-contain" sizes="(max-width: 1280px) 100vw, 360px" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/92 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-brand)] shadow-md">
            {publicPost ? "Public post" : "Studio asset"}
          </span>
          {item.src?.includes("/portraits/") ? (
            <span className="rounded-full bg-[var(--color-brand)] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white shadow-md">
              Portrait-ready
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">{type}</p>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-[var(--color-ink)]">{title}</h3>
          </div>
          {isUploadedAsset ? (
            <button
              type="button"
              onClick={() => onDelete(item.src ?? "")}
              disabled={isPending}
              className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-rose-600 disabled:opacity-50"
            >
              Delete
            </button>
          ) : null}
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{getSuggestedPath({ ...item, publicPost })}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              setPublicPost(true);
              onSave(item.src ?? "", {
                publicPost: true,
                title,
                type,
                description,
                alt,
                caption,
                channelLabel,
              });
            }}
            className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Show publicly
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => {
              setPublicPost(false);
              onSave(item.src ?? "", {
                publicPost: false,
                title,
                type,
                description,
                alt,
                caption,
                channelLabel,
              });
            }}
            className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand)] disabled:opacity-60"
          >
            Keep private
          </button>
        </div>

        <details className="mt-5 rounded-[1.25rem] border border-[var(--color-line)] bg-white p-4">
          <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-ink)]">
            Edit details
          </summary>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Title
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="studio-input" />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Type
                <input value={type} onChange={(event) => setType(event.target.value)} className="studio-input" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Public label
                <input value={channelLabel} onChange={(event) => setChannelLabel(event.target.value)} className="studio-input" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Public caption
              <textarea value={caption} onChange={(event) => setCaption(event.target.value)} rows={3} className="studio-input min-h-24" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Internal description
              <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className="studio-input min-h-24" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Alt text
              <input value={alt} onChange={(event) => setAlt(event.target.value)} className="studio-input" />
            </label>
            <button
              type="button"
              disabled={isPending}
              onClick={() =>
                onSave(item.src ?? "", {
                  title,
                  type,
                  description,
                  alt,
                  publicPost,
                  caption,
                  channelLabel,
                })
              }
              className="w-fit rounded-full bg-[var(--color-brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              Save details
            </button>
          </div>
        </details>

        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">{item.createdAt ?? "Available now"}</p>
      </div>
    </article>
  );
}

export function StudioMediaManager({ initialMediaItems, draftPosts, projects }: StudioMediaManagerProps) {
  const [mediaItems, setMediaItems] = useState(initialMediaItems);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleUpload(formData: FormData) {
    setMessage("");

    startTransition(async () => {
      const response = await fetch("/api/studio/media", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as {
        message?: string;
        item?: MediaItem;
      };

      if (!response.ok || !payload.item) {
        setMessage(payload.message ?? "Upload failed. Try again.");
        return;
      }

      setMediaItems((current) => [payload.item!, ...current.filter((item) => item.src !== payload.item!.src)]);
      setMessage(`Uploaded ${payload.item.title}. Now choose whether it stays private or appears publicly in Media.`);
      formRef.current?.reset();
    });
  }

  function handleDelete(src: string) {
    setMessage("");

    startTransition(async () => {
      const response = await fetch("/api/studio/media", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ src }),
      });

      const payload = (await response.json()) as {
        message?: string;
        src?: string;
      };

      if (!response.ok || !payload.src) {
        setMessage(payload.message ?? "Delete failed. Try again.");
        return;
      }

      setMediaItems((current) => current.filter((item) => item.src !== payload.src));
      setMessage("Asset deleted from the library.");
    });
  }

  function handleSave(src: string, updates: Partial<MediaItem>) {
    setMessage("");

    startTransition(async () => {
      const response = await fetch("/api/studio/media", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ src, ...updates }),
      });

      const payload = (await response.json()) as {
        message?: string;
        item?: MediaItem;
      };

      if (!response.ok || !payload.item) {
        setMessage(payload.message ?? "Save failed. Try again.");
        return;
      }

      setMediaItems((current) => current.map((item) => (item.src === src ? payload.item! : item)));
      setMessage(`${payload.item.title} updated.`);
    });
  }

  return (
    <div className="grid gap-6">
      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Simple media workflow</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-[var(--color-ink)]">Upload once, then choose one of two paths.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
            Every image can either stay as a private studio asset or become a public media post on the Media page. This section is only for making that decision.
          </p>

          <div className="mt-6 grid gap-3 text-sm leading-7 text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)]">Private studio asset:</span> use it for blog/news covers, portraits, projects, or card design.</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Public media post:</span> show it on the Media page so people can like, comment, and share it.</p>
          </div>

          <form
            ref={formRef}
            className="mt-8 grid gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              handleUpload(new FormData(event.currentTarget));
            }}
          >
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Image file
              <input name="file" type="file" accept="image/png,image/jpeg,image/webp,image/gif" required className="studio-input file:mr-4 file:rounded-full file:border-0 file:bg-[var(--color-brand)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Name
                <input name="title" placeholder="Leadership photo" className="studio-input" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
                Type
                <input name="type" placeholder="Photo Post" className="studio-input" />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-medium text-[var(--color-ink)]">
              Public caption
              <textarea name="caption" rows={3} placeholder="Only needed if this may become a public media post." className="studio-input min-h-24" />
            </label>
            <label className="flex items-center gap-3 text-sm font-medium text-[var(--color-ink)]">
              <input type="checkbox" name="publicPost" />
              Put this on the public Media page immediately
            </label>

            {message ? <p className="rounded-[1rem] bg-[var(--color-soft)] px-4 py-3 text-sm text-[var(--color-brand)]">{message}</p> : null}

            <button type="submit" disabled={isPending} className="w-fit rounded-full bg-[var(--color-brand)] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
              {isPending ? "Working..." : "Upload image"}
            </button>
          </form>
        </article>

        <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Quick actions</p>
          <div className="mt-6 grid gap-4">
            <Link href="/studio/posts/new" className="rounded-[1.3rem] border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:border-[var(--color-brand)]">
              Create a new post
            </Link>
            <Link href="/studio/posts" className="rounded-[1.3rem] border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:border-[var(--color-brand)]">
              Open post library
            </Link>
            <Link href="/studio/projects" className="rounded-[1.3rem] border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:border-[var(--color-brand)]">
              Open project library
            </Link>
            <Link href="/media" className="rounded-[1.3rem] border border-[var(--color-line)] bg-[var(--color-surface)] px-5 py-4 text-sm font-semibold text-[var(--color-brand)] transition hover:border-[var(--color-brand)]">
              Review public media page
            </Link>
          </div>

          <div className="mt-8 grid gap-4 text-sm leading-7 text-[var(--color-muted)]">
            <p><span className="font-semibold text-[var(--color-ink)]">Assets in library:</span> {mediaItems.length}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Public media posts:</span> {mediaItems.filter((item) => item.publicPost).length}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Draft or scheduled posts:</span> {draftPosts.length}</p>
            <p><span className="font-semibold text-[var(--color-ink)]">Projects available:</span> {projects.length}</p>
          </div>

          <div className="mt-8 rounded-[1.4rem] bg-[var(--color-surface)] p-5 text-sm leading-7 text-[var(--color-muted)]">
            If an image feels like a social/photo moment, make it a <span className="font-semibold text-[var(--color-ink)]">public media post</span>. If it is only for design or publishing support, keep it private.
          </div>
        </article>
      </section>

      <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-[0_14px_40px_rgba(10,61,98,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Media library</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Private or public, nothing in between</h2>
          </div>
          <p className="text-sm text-[var(--color-muted)]">{mediaItems.length} assets available</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mediaItems.map((item) => (
            <MediaLibraryCard key={`${item.src}-${item.title}`} item={item} isPending={isPending} onDelete={handleDelete} onSave={handleSave} />
          ))}
        </div>
      </section>
    </div>
  );
}
