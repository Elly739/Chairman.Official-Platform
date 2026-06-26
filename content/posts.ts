export type PostCategory = "news" | "blog" | "desk";
export type EditorialStatus = "draft" | "review" | "published";
export type SocialCardTemplate = "campaign" | "portrait" | "statement";

export type PostPlatformCopy = {
  instagram?: string;
  x?: string;
  linkedin?: string;
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: PostCategory;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  kicker: string;
  shareCaption: string;
  socialHook: string;
  platformCopy?: PostPlatformCopy;
  socialCardTemplate?: SocialCardTemplate;
  portraitImage?: string;
  portraitAlt?: string;
  audience: string;
  tags: string[];
  distributionChannels: string[];
  editorialStatus: EditorialStatus;
  scheduledFor?: string;
  featured?: boolean;
  coverImage?: string;
  coverAlt?: string;
  body: string[];
};

export const posts: Post[] = [];