import Image from "next/image";
import type { Post } from "@/lib/content";

type DeskAnnouncementCardVisualProps = {
  post: Post;
  compact?: boolean;
};

export function DeskAnnouncementCardVisual({ post, compact = false }: DeskAnnouncementCardVisualProps) {
  return (
    <div className={`relative overflow-hidden rounded-[1.4rem] bg-[linear-gradient(160deg,_#0a3d62,_#0d517f)] text-white ${compact ? "p-4" : "p-5"}`}>
      <div className="absolute right-[-2.5rem] top-[-2.5rem] h-28 w-28 rounded-full bg-white/14 blur-xl" />
      <div className="absolute bottom-[-2.5rem] left-[-2rem] h-28 w-28 rounded-full bg-cyan-200/18 blur-xl" />

      <div className="relative z-10 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/72">
        <span>Chairman.Official</span>
        <span>{compact ? "Announcement" : "Desk Announcement Card"}</span>
      </div>

      <div className={`relative mt-4 overflow-hidden rounded-[1.1rem] bg-white/10 ${compact ? "h-44" : "h-64"}`}>
        <Image
          src={post.portraitImage ?? post.coverImage ?? "/media/desk-cover.svg"}
          alt={post.portraitAlt ?? post.coverAlt ?? post.title}
          fill
          className="object-cover object-top"
          sizes={compact ? "360px" : "720px"}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent,_rgba(2,17,29,0.55))]" />
      </div>

      <div className="relative z-10 mt-4 rounded-[1rem] border border-white/10 bg-white/10 p-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/68">{post.kicker}</p>
        <h3 className={`${compact ? "mt-2 text-lg leading-7" : "mt-2 text-2xl leading-9"} font-heading font-semibold text-white`}>
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-white/85">{post.socialHook}</p>
      </div>
    </div>
  );
}
