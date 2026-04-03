"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ProjectEditorialStatus } from "@/content/projects";
import type { EditorialStatus, PostCategory, SocialCardTemplate } from "@/content/posts";
import {
  deletePostFromStore,
  deleteProjectFromStore,
  readContentStore,
  upsertPostInStore,
  upsertProjectInStore,
} from "@/lib/content-store";
import {
  createStudioSession,
  getStudioPassword,
  requireStudioAuth,
  clearStudioSession,
} from "@/lib/studio-auth";
import { getProject, getStudioPostBySlug } from "@/lib/content";
import { deleteInquiry, deleteSubscriber, markInquiryHandled } from "@/lib/audience-store";

type ActionState = {
  message?: string;
};

function formatDateLabel(value?: string) {
  if (value && value.trim()) {
    return value.trim();
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

function estimateReadTime(body: string[]) {
  const words = body.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getPublicPath(category: PostCategory, slug: string) {
  return category === "desk" ? `/chairmans-desk/${slug}` : `/${category}/${slug}`;
}

function revalidateContentPaths(publicPath: string, studioPath: string) {
  const paths = [
    "/",
    "/news",
    "/blog",
    "/chairmans-desk",
    "/projects",
    "/media",
    "/studio",
    "/studio/posts",
    "/studio/projects",
    "/studio/media",
    publicPath,
    studioPath,
  ];

  for (const path of paths) {
    revalidatePath(path);
  }
}

function sanitizeStudioNextPath(value: string) {
  if (value.startsWith("/studio")) {
    return value;
  }

  return "/studio";
}

export async function loginStudio(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  const nextPath = sanitizeStudioNextPath(String(formData.get("next") ?? "/studio"));

  if (password !== getStudioPassword()) {
    return { message: "Incorrect studio password." };
  }

  await createStudioSession();
  redirect(nextPath);
}

export async function logoutStudio() {
  await clearStudioSession();
  redirect("/studio/login");
}

export async function savePost(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireStudioAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "news") as PostCategory;
  const summary = String(formData.get("summary") ?? "").trim();
  const kicker = String(formData.get("kicker") ?? "").trim();
  const shareCaption = String(formData.get("shareCaption") ?? "").trim();
  const socialHook = String(formData.get("socialHook") ?? "").trim();
  const socialCardTemplate = String(formData.get("socialCardTemplate") ?? "campaign") as SocialCardTemplate;
  const platformCopyInstagram = String(formData.get("platformCopyInstagram") ?? "").trim();
  const platformCopyX = String(formData.get("platformCopyX") ?? "").trim();
  const platformCopyLinkedIn = String(formData.get("platformCopyLinkedIn") ?? "").trim();
  const audience = String(formData.get("audience") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const coverAlt = String(formData.get("coverAlt") ?? "").trim();
  const portraitImage = String(formData.get("portraitImage") ?? "").trim();
  const portraitAlt = String(formData.get("portraitAlt") ?? "").trim();
  const scheduledFor = String(formData.get("scheduledFor") ?? "").trim();
  const publishedAt = formatDateLabel(String(formData.get("publishedAt") ?? "").trim());
  const editorialStatus = String(formData.get("editorialStatus") ?? "draft") as EditorialStatus;
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const distributionChannels = String(formData.get("distributionChannels") ?? "")
    .split(",")
    .map((channel) => channel.trim())
    .filter(Boolean);
  const body = String(formData.get("body") ?? "")
    .split(/\r?\n\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const featured = formData.get("featured") === "on";

  if (!title || !summary || !kicker || !shareCaption || !socialHook || !audience || body.length === 0) {
    return { message: "Fill in the title, summary, hooks, audience, and body before saving." };
  }

  const slug = slugify(String(formData.get("slug") ?? title));

  if (!slug) {
    return { message: "A valid slug is required." };
  }

  const existing = getStudioPostBySlug(slug);
  if (existing && existing.slug !== originalSlug) {
    return { message: "That slug is already in use. Choose a different one." };
  }

  if (originalSlug && originalSlug !== slug) {
    deletePostFromStore(originalSlug);
  }

  const previous = originalSlug ? getStudioPostBySlug(originalSlug) : undefined;

  upsertPostInStore({
    slug,
    title,
    summary,
    category,
    publishedAt,
    updatedAt: formatDateLabel(),
    readTime: estimateReadTime(body),
    kicker,
    shareCaption,
    socialHook,
    platformCopy: {
      instagram: platformCopyInstagram || socialHook,
      x: platformCopyX || socialHook,
      linkedin: platformCopyLinkedIn || socialHook,
    },
    socialCardTemplate,
    portraitImage: portraitImage || undefined,
    portraitAlt: portraitAlt || undefined,
    audience,
    tags,
    distributionChannels,
    editorialStatus,
    scheduledFor: scheduledFor || undefined,
    featured,
    coverImage: coverImage || undefined,
    coverAlt: coverAlt || undefined,
    body,
  });

  const publicPath = getPublicPath(category, slug);
  const studioPath = `/studio/posts/${slug}`;
  revalidateContentPaths(publicPath, studioPath);

  if (previous && previous.category !== category) {
    revalidatePath(getPublicPath(previous.category, previous.slug));
  }

  redirect(studioPath);
}

export async function updatePostEditorialStatus(slug: string, status: EditorialStatus) {
  await requireStudioAuth();

  const post = getStudioPostBySlug(slug);
  if (!post) {
    redirect("/studio/posts");
  }

  upsertPostInStore({
    ...post,
    editorialStatus: status,
    updatedAt: formatDateLabel(),
    publishedAt: status === "published" ? formatDateLabel(post.publishedAt) : post.publishedAt,
  });

  revalidateContentPaths(getPublicPath(post.category, post.slug), `/studio/posts/${post.slug}`);
  redirect("/studio/posts");
}

export async function saveProject(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireStudioAuth();

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? name));
  const owner = String(formData.get("owner") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const editorialStatus = String(formData.get("editorialStatus") ?? "backlog") as ProjectEditorialStatus;
  const nextUpdate = String(formData.get("nextUpdate") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim();
  const coverAlt = String(formData.get("coverAlt") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const impact = String(formData.get("impact") ?? "").trim();
  const highlights = String(formData.get("highlights") ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!name || !slug || !owner || !status || !nextUpdate || !timeline || !summary || !impact || highlights.length === 0) {
    return { message: "Fill in the key project fields and include at least one highlight before saving." };
  }

  const existing = getProject(slug);
  if (existing && existing.slug !== originalSlug) {
    return { message: "That project slug is already in use. Choose a different one." };
  }

  if (originalSlug && originalSlug !== slug) {
    deleteProjectFromStore(originalSlug);
  }

  upsertProjectInStore({
    slug,
    name,
    owner,
    status,
    editorialStatus,
    nextUpdate,
    timeline,
    coverImage: coverImage || undefined,
    coverAlt: coverAlt || undefined,
    summary,
    impact,
    highlights,
  });

  revalidateContentPaths(`/projects/${slug}`, `/studio/projects/${slug}`);
  redirect(`/studio/projects/${slug}`);
}

export async function deletePost(slug: string) {
  await requireStudioAuth();

  const post = getStudioPostBySlug(slug);
  if (!post) {
    redirect("/studio/posts");
  }

  deletePostFromStore(slug);
  revalidateContentPaths(getPublicPath(post.category, slug), `/studio/posts/${slug}`);
  redirect("/studio/posts");
}


export async function setInquiryHandled(id: string, handled: boolean) {
  await requireStudioAuth();
  markInquiryHandled(id, handled);
  revalidatePath("/studio");
  revalidatePath("/studio/audience");
}

export async function removeInquiry(id: string) {
  await requireStudioAuth();
  deleteInquiry(id);
  revalidatePath("/studio");
  revalidatePath("/studio/audience");
}

export async function removeSubscriber(id: string) {
  await requireStudioAuth();
  deleteSubscriber(id);
  revalidatePath("/studio");
  revalidatePath("/studio/audience");
}
export async function initializeContentStore() {
  await requireStudioAuth();
  readContentStore();
  revalidatePath("/studio");
}

