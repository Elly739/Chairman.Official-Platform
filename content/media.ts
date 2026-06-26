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

export const mediaItems: MediaItem[] = [];