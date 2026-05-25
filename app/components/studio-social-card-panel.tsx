import Image from "next/image";
import type { Post, SocialCardTemplate } from "@/lib/content";
import { getPostHref } from "@/lib/content";
import { StudioPublishingChecklist } from "@/app/components/studio-publishing-checklist";
import { StudioShareQuickActions } from "@/app/components/studio-share-quick-actions";
import { absoluteUrl } from "@/lib/site";
import { SOCIAL_CARD_RENDER_VERSION } from "@/lib/social-card";

const cardPlatforms = [
  {
    label: "Instagram",
    id: "instagram",
    size: "1080 x 1350",
    aspect: "aspect-[4/5]",
  },
  {
    label: "X",
    id: "x",
    size: "1200 x 675",
    aspect: "aspect-[16/9]",
  },
  {
    label: "LinkedIn",
    id: "linkedin",
    size: "1080 x 1080",
    aspect: "aspect-square",
  },
] as const;

const templateLabels: Record<SocialCardTemplate, string> = {
  campaign: "Campaign",
  portrait: "Portrait",
  statement: "Statement",
};

export function StudioSocialCardPanel({ post }: { post: Post }) {
  const templateLabel = templateLabels[post.socialCardTemplate ?? "campaign"];
  const version = encodeURIComponent(`${SOCIAL_CARD_RENDER_VERSION}-${post.updatedAt}-${post.socialCardTemplate ?? "campaign"}-${post.portraitImage ?? "none"}`);
  const postUrl = absoluteUrl(getPostHref(post));

  return (
    <section className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_14px_40px_rgba(10,61,98,0.08)] lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-brand)]">Saved Export Cards</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[var(--color-ink)]">Open or download the latest saved version.</h2>
        </div>
        <div className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
          <p>These cards are generated from the last saved version of this post.</p>
          <p className="mt-2">If you change text or images in the editor above, click <span className="font-semibold text-[var(--color-ink)]">Save Changes</span> first, then come back here.</p>
          <p className="mt-2 text-[var(--color-ink)]">
            Current template: <span className="font-semibold">{templateLabel}</span>
            {post.socialCardTemplate === "portrait"
              ? post.portraitImage
                ? " with a dedicated portrait image."
                : " with a branded fallback until you add a portrait image."
              : " for this post."}
          </p>
          <p className="mt-2 text-[var(--color-muted)]">
            Studio distribution flow: click <span className="font-semibold text-[var(--color-ink)]">Copy + Open</span> for each platform.
          </p>
        </div>
      </div>
      <StudioPublishingChecklist postSlug={post.slug} />

      <div className="mt-8 grid gap-6 xl:grid-cols-2 2xl:grid-cols-3">
        {cardPlatforms.map((platform) => {
          const previewSrc = `/api/studio/social-card/${post.slug}?platform=${platform.id}&v=${version}`;
          const downloadSrc = `/api/studio/social-card/${post.slug}?platform=${platform.id}&download=1&v=${version}`;
          const quote = post.platformCopy?.[platform.id] ?? post.socialHook;
          const caption = `${post.title}. ${quote}`;

          return (
            <article key={platform.id} className="flex h-full flex-col rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-4 lg:p-5">
              <div className={`relative overflow-hidden rounded-[1.4rem] bg-[var(--color-soft)] ${platform.aspect}`}>
                <Image src={previewSrc} alt={`${post.title} ${platform.label} card`} fill unoptimized className="object-cover" sizes="(max-width: 1536px) 100vw, 420px" />
              </div>

              <div className="mt-5 flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-brand)]">{platform.label}</p>
                    <p className="mt-2 whitespace-nowrap text-sm font-medium text-[var(--color-ink)]">{platform.size}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">{templateLabel} template</p>
                  </div>
                  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                    <a
                      href={previewSrc}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-center text-sm font-semibold text-[var(--color-brand)]"
                    >
                      Open
                    </a>
                    <a
                      href={downloadSrc}
                      className="rounded-full bg-[var(--color-brand)] px-4 py-2 text-center text-sm font-semibold text-white"
                    >
                      Download
                    </a>
                  </div>
                </div>

                <p className="rounded-[1rem] bg-white px-4 py-3 text-sm leading-7 text-[var(--color-muted)]">&quot;{quote}&quot;</p>
                <StudioShareQuickActions platformId={platform.id} platformLabel={platform.label} caption={caption} postUrl={postUrl} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
