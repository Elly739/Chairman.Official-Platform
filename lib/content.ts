import { readContentStore } from "@/lib/content-store";
import type { EditorialStatus, Post, PostCategory } from "@/content/posts";
import type { ProjectEditorialStatus } from "@/content/projects";

export type { EditorialStatus, Post, PostCategory, SocialCardTemplate } from "@/content/posts";
export type { MediaItem } from "@/content/media";
export type { Project, ProjectEditorialStatus } from "@/content/projects";



function isScheduledForFuture(post: Post) {
  if (!post.scheduledFor) {
    return false;
  }

  const publishAt = new Date(post.scheduledFor).getTime();
  return Number.isFinite(publishAt) && publishAt > Date.now();
}

function isPubliclyVisible(post: Post) {
  return post.editorialStatus === "published" && !isScheduledForFuture(post);
}

export function getAllStudioPosts() {
  return readContentStore().posts;
}

export function getAllPosts() {
  return getAllStudioPosts().filter(isPubliclyVisible);
}

export function getAllProjects() {
  return readContentStore().projects;
}

export function getAllMediaItems() {
  return readContentStore().mediaItems;
}

export function getPublicMediaPosts() {
  return getAllMediaItems().filter((item) => item.publicPost);
}

export function getPostsByCategory(category: PostCategory) {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPost(category: PostCategory, slug: string) {
  return getAllPosts().find((post) => post.category === category && post.slug === slug);
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getStudioPostBySlug(slug: string) {
  return getAllStudioPosts().find((post) => post.slug === slug);
}

export function getProject(slug: string) {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getPostHref(post: Post) {
  return `/${post.category === "desk" ? "chairmans-desk" : post.category}/${post.slug}`;
}

export function getStudioPostHref(post: Post) {
  return `/studio/posts/${post.slug}`;
}

export function getStudioProjectHref(slug: string) {
  return `/studio/projects/${slug}`;
}

export function getRelatedPosts(post: Post, limit = 2) {
  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug && candidate.category !== "desk")
    .filter((candidate) => candidate.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, limit);
}

export function getPostsByEditorialStatus(status: EditorialStatus) {
  return getAllStudioPosts().filter((post) => post.editorialStatus === status);
}

export function getProjectsByEditorialStatus(status: ProjectEditorialStatus) {
  return getAllProjects().filter((project) => project.editorialStatus === status);
}

export function getScheduledPosts() {
  return getAllStudioPosts().filter(isScheduledForFuture);
}

export function getStudioStats() {
  return {
    publishedPosts: getPostsByEditorialStatus("published").length,
    reviewPosts: getPostsByEditorialStatus("review").length,
    draftPosts: getPostsByEditorialStatus("draft").length,
    scheduledPosts: getScheduledPosts().length,
    readyProjects: getProjectsByEditorialStatus("ready").length,
  };
}

export type PublishingCalendarEntry = {
  day: number;
  isoDate: string;
  label: string;
  post: Post;
  kind: "scheduled" | "published" | "updated";
};

function toTimestampFromPublishedLabel(value: string) {
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function getCalendarEventTimestamp(post: Post) {
  if (post.scheduledFor) {
    const scheduled = new Date(post.scheduledFor).getTime();
    if (Number.isFinite(scheduled)) {
      return { kind: "scheduled" as const, timestamp: scheduled };
    }
  }

  const updated = new Date(post.updatedAt).getTime();
  if (Number.isFinite(updated) && updated > 0) {
    return { kind: "updated" as const, timestamp: updated };
  }

  return { kind: "published" as const, timestamp: toTimestampFromPublishedLabel(post.publishedAt) };
}

export function getPublishingCalendar(referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(year, month, 1));
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const events = getAllStudioPosts()
    .map((post) => {
      const { kind, timestamp } = getCalendarEventTimestamp(post);
      if (!timestamp) {
        return null;
      }

      const eventDate = new Date(timestamp);
      if (eventDate.getFullYear() !== year || eventDate.getMonth() !== month) {
        return null;
      }

      return {
        day: eventDate.getDate(),
        isoDate: eventDate.toISOString(),
        label: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(eventDate),
        post,
        kind,
      } satisfies PublishingCalendarEntry;
    })
    .filter((event): event is PublishingCalendarEntry => Boolean(event))
    .sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());

  const upcoming = getAllStudioPosts()
    .map((post) => {
      const { kind, timestamp } = getCalendarEventTimestamp(post);
      return { post, kind, timestamp };
    })
    .filter((entry) => entry.timestamp >= referenceDate.getTime())
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(0, 4);

  return {
    monthLabel,
    firstWeekday,
    daysInMonth,
    events,
    upcoming,
  };
}

export function getFeaturedPost() {
  const posts = getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getStudioFeaturedPost() {
  const posts = getAllStudioPosts();
  return posts.find((post) => post.featured) ?? posts[0];
}

export function getLatestDeskPost() {
  return getPostsByCategory("desk")[0];
}



