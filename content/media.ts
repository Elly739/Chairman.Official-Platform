export type MediaItem = {
  title: string;
  type: string;
  description: string;
  src?: string;
  alt?: string;
  createdAt?: string;
  publicPost?: boolean;
  caption?: string;
  channelLabel?: string;
};

export const mediaItems: MediaItem[] = [
  {
    title: "Leadership Session",
    type: "Personal Photo",
    description: "A personal leadership moment from the Chairman.Official visual archive.",
    src: "/uploads/media/me.jpg",
    alt: "Elly Okello leadership session portrait",
    createdAt: "March 19, 2026",
    publicPost: true,
    caption: "Quiet preparation often says more about leadership than the loudest stage.",
    channelLabel: "Personal Photo",
  },
  {
    title: "Official Portrait",
    type: "Portrait",
    description: "A formal portrait for Chairman.Official public visibility.",
    src: "/uploads/portraits/portrait-main.png",
    alt: "Elly Okello official portrait",
    createdAt: "March 19, 2026",
    publicPost: true,
    caption: "Leadership presence matters when it reflects discipline, clarity, and public purpose.",
    channelLabel: "Portrait Post",
  },
  {
    title: "Three-Piece Moment",
    type: "Personal Photo",
    description: "A polished personal image for premium social and media use.",
    src: "/uploads/media/three-piece.jpg",
    alt: "Elly Okello in a three-piece suit",
    createdAt: "March 19, 2026",
    publicPost: true,
    caption: "The standard behind the image should always match the standard behind the work.",
    channelLabel: "Personal Photo",
  },
  {
    title: "Editorial Portrait",
    type: "Portrait",
    description: "A portrait-led visual for Chairman.Official storytelling.",
    src: "/uploads/media/style.jpg",
    alt: "Elly Okello editorial portrait",
    createdAt: "March 19, 2026",
    publicPost: true,
    caption: "Public confidence grows where leadership carries both calm and conviction.",
    channelLabel: "Portrait Post",
  },
];
