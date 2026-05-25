import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { mediaItems as seedMediaItems, type MediaItem } from "@/content/media";
import { posts as seedPosts, type Post, type PostCategory, type SocialCardTemplate } from "@/content/posts";
import { projects as seedProjects, type Project } from "@/content/projects";

export type ContentStore = {
  posts: Post[];
  projects: Project[];
  mediaItems: MediaItem[];
};

const dataDirectory = join(process.cwd(), "data");
const storePath = join(dataDirectory, "content-store.json");

function getDefaultPostCover(category: PostCategory) {
  if (category === "blog") return "/media/blog-cover.svg";
  if (category === "desk") return "/media/desk-cover.svg";
  return "/media/news-cover.svg";
}

function getDefaultSocialCardTemplate(category: PostCategory): SocialCardTemplate {
  if (category === "desk") return "statement";
  return "campaign";
}

function normalizePost(post: Post): Post {
  return {
    ...post,
    scheduledFor: post.scheduledFor?.trim() || undefined,
    platformCopy: {
      instagram: post.platformCopy?.instagram?.trim() || post.socialHook,
      x: post.platformCopy?.x?.trim() || post.socialHook,
      linkedin: post.platformCopy?.linkedin?.trim() || post.socialHook,
    },
    socialCardTemplate: post.socialCardTemplate ?? getDefaultSocialCardTemplate(post.category),
    portraitImage: post.portraitImage?.trim() || undefined,
    portraitAlt: post.portraitAlt?.trim() || (post.portraitImage ? `${post.title} portrait` : undefined),
    coverImage: post.coverImage ?? getDefaultPostCover(post.category),
    coverAlt: post.coverAlt ?? `${post.title} cover image`,
  };
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    repoUrl: project.repoUrl?.trim() || undefined,
    coverImage: project.coverImage ?? "/media/project-cover.svg",
    coverAlt: project.coverAlt ?? `${project.name} cover image`,
  };
}

function normalizeMediaItem(item: MediaItem): MediaItem {
  return {
    ...item,
    src: item.src ?? "/media/news-cover.svg",
    alt: item.alt ?? `${item.title} asset`,
    createdAt:
      item.createdAt ??
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    publicPost: item.publicPost ?? Boolean(item.src),
    caption: item.caption?.trim() || item.description,
    channelLabel: item.channelLabel?.trim() || item.type,
  };
}

function getSeedStore(): ContentStore {
  return {
    posts: seedPosts.map(normalizePost),
    projects: seedProjects.map(normalizeProject),
    mediaItems: seedMediaItems.map(normalizeMediaItem),
  };
}

function ensureStore() {
  if (!existsSync(dataDirectory)) {
    mkdirSync(dataDirectory, { recursive: true });
  }

  if (!existsSync(storePath)) {
    writeFileSync(storePath, JSON.stringify(getSeedStore(), null, 2), "utf8");
  }
}

export function readContentStore(): ContentStore {
  ensureStore();
  const store = JSON.parse(readFileSync(storePath, "utf8")) as ContentStore;

  return {
    posts: store.posts.map(normalizePost),
    projects: store.projects.map(normalizeProject),
    mediaItems: store.mediaItems.map(normalizeMediaItem),
  };
}

export function writeContentStore(store: ContentStore) {
  ensureStore();
  writeFileSync(storePath, JSON.stringify(store, null, 2), "utf8");
}

export function upsertPostInStore(post: Post) {
  const store = readContentStore();
  const existingIndex = store.posts.findIndex((candidate) => candidate.slug === post.slug);
  const normalizedPost = normalizePost(post);

  if (existingIndex >= 0) {
    store.posts[existingIndex] = normalizedPost;
  } else {
    store.posts.unshift(normalizedPost);
  }

  writeContentStore(store);
}

export function deletePostFromStore(slug: string) {
  const store = readContentStore();
  store.posts = store.posts.filter((post) => post.slug !== slug);
  writeContentStore(store);
}

export function upsertProjectInStore(project: Project) {
  const store = readContentStore();
  const existingIndex = store.projects.findIndex((candidate) => candidate.slug === project.slug);
  const normalizedProject = normalizeProject(project);

  if (existingIndex >= 0) {
    store.projects[existingIndex] = normalizedProject;
  } else {
    store.projects.unshift(normalizedProject);
  }

  writeContentStore(store);
}

export function deleteProjectFromStore(slug: string) {
  const store = readContentStore();
  store.projects = store.projects.filter((project) => project.slug !== slug);
  writeContentStore(store);
}

export function upsertMediaItemInStore(item: MediaItem) {
  const store = readContentStore();
  const normalizedItem = normalizeMediaItem(item);
  const existingIndex = store.mediaItems.findIndex((candidate) => candidate.src === normalizedItem.src);

  if (existingIndex >= 0) {
    store.mediaItems[existingIndex] = normalizedItem;
  } else {
    store.mediaItems.unshift(normalizedItem);
  }

  writeContentStore(store);
}

export function deleteMediaItemFromStore(src: string) {
  const store = readContentStore();
  store.mediaItems = store.mediaItems.filter((item) => item.src !== src);
  writeContentStore(store);
}
