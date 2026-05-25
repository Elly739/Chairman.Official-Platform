import type { PostCategory, SocialCardTemplate } from "@/content/posts";

export type PosterKind = "event" | "announcement" | "quote";

export type PosterDesignPreset = {
  id: string;
  kind: PosterKind;
  label: string;
  blurb: string;
  template: SocialCardTemplate;
  previewImage: string;
  previewAlt: string;
  coverImage: string;
  coverAlt: string;
  portraitImage: string;
  portraitAlt: string;
  recommendedFor: PostCategory;
};

export const posterDesignPresets: PosterDesignPreset[] = [
  {
    id: "leadership-portrait",
    kind: "announcement",
    label: "Leadership portrait",
    blurb: "A polished portrait-led design for announcements, positioning notes, and public-facing posters.",
    template: "portrait",
    previewImage: "/uploads/portraits/portrait-main.png",
    previewAlt: "Portrait preview for leadership poster design",
    coverImage: "/uploads/portraits/portrait-main.png",
    coverAlt: "Portrait image for leadership poster design",
    portraitImage: "/uploads/portraits/portrait-main.png",
    portraitAlt: "Leadership portrait for poster",
    recommendedFor: "news",
  },
  {
    id: "innovation-stage",
    kind: "event",
    label: "Innovation stage",
    blurb: "A public-stage visual for innovation updates, event-led news, and outward-facing momentum pieces.",
    template: "campaign",
    previewImage: "/uploads/posts/innovation-day-3.jpg",
    previewAlt: "Innovation event preview for poster design",
    coverImage: "/uploads/posts/innovation-day-3.jpg",
    coverAlt: "Innovation event image for poster design",
    portraitImage: "/uploads/portraits/edited.png",
    portraitAlt: "Chairman portrait paired with innovation poster design",
    recommendedFor: "news",
  },
  {
    id: "chairman-address",
    kind: "announcement",
    label: "Chairman address",
    blurb: "A stronger statement-style design for public notes, official addresses, and Chairman's Desk updates.",
    template: "statement",
    previewImage: "/uploads/media/style.jpg",
    previewAlt: "Editorial portrait preview for Chairman statement design",
    coverImage: "/uploads/media/style.jpg",
    coverAlt: "Editorial portrait image for statement design",
    portraitImage: "/uploads/media/me.jpg",
    portraitAlt: "Chairman portrait for statement poster",
    recommendedFor: "desk",
  },
  {
    id: "editorial-insight",
    kind: "quote",
    label: "Editorial insight",
    blurb: "A cleaner thought-leadership format for insight cards, article promos, and idea-led campaign pieces.",
    template: "campaign",
    previewImage: "/uploads/posts/design.jpg",
    previewAlt: "Design-focused preview for insight poster design",
    coverImage: "/uploads/posts/design.jpg",
    coverAlt: "Design-focused image for insight poster design",
    portraitImage: "/uploads/portraits/Hero.png",
    portraitAlt: "Portrait used in insight poster design",
    recommendedFor: "blog",
  },
  {
    id: "eid-greeting",
    kind: "event",
    label: "Ceremonial greeting",
    blurb: "A festive event-greeting direction for Eid, Christmas, birthdays, and calendar moments that need warmth.",
    template: "statement",
    previewImage: "/uploads/portraits/Hero.png",
    previewAlt: "Poster design preview for ceremonial event greeting",
    coverImage: "/uploads/portraits/Hero.png",
    coverAlt: "Ceremonial event greeting poster image",
    portraitImage: "/uploads/portraits/Hero.png",
    portraitAlt: "Poster portrait for ceremonial greeting design",
    recommendedFor: "news",
  },
  {
    id: "public-voice-quote",
    kind: "quote",
    label: "Public voice quote",
    blurb: "A quote-first poster for sharp hooks, short notes, and shareable leadership lines across platforms.",
    template: "campaign",
    previewImage: "/uploads/posts/Main.jpg",
    previewAlt: "Quote card visual preview with leadership backdrop",
    coverImage: "/uploads/posts/Main.jpg",
    coverAlt: "Leadership backdrop for public voice quote card",
    portraitImage: "/uploads/portraits/edited.png",
    portraitAlt: "Portrait for public voice quote card",
    recommendedFor: "blog",
  },
];

export function getPosterDesignPreset(id: string) {
  return posterDesignPresets.find((preset) => preset.id === id);
}
