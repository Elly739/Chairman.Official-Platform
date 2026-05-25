"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPosterDesignPreset, type PosterKind } from "@/content/poster-designs";
import type { ProjectEditorialStatus } from "@/content/projects";
import type { EditorialStatus, PostCategory, SocialCardTemplate } from "@/content/posts";
import { getEventOccasionOption } from "@/lib/event-card-concepts";
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

function buildUniqueSlug(base: string) {
  const initial = slugify(base) || `poster-${Date.now()}`;
  let candidate = initial;
  let counter = 2;

  while (getStudioPostBySlug(candidate)) {
    candidate = `${initial}-${counter}`;
    counter += 1;
  }

  return candidate;
}

function buildPosterTitle(note: string, destination: PostCategory, kind: PosterKind) {
  const cleaned = note.replace(/\s+/g, " ").trim();
  const fallback =
    kind === "event"
      ? "Event poster"
      : destination === "desk"
        ? "Chairman's Desk poster"
        : destination === "blog"
          ? "Insight poster"
          : "News poster";

  if (!cleaned) {
    return fallback;
  }

  const sentence = cleaned.split(/[.!?]/)[0]?.trim() || cleaned;
  if (sentence.length <= 72) {
    return sentence;
  }

  return `${sentence.slice(0, 69).trimEnd()}...`;
}

function getPosterKicker(destination: PostCategory, kind: PosterKind) {
  if (kind === "event") return "Event Poster";
  if (kind === "quote") return "Quote Card";
  if (destination === "desk") return "Chairman's Desk Announcement";
  if (destination === "blog") return "Insight Poster";
  return "News Poster";
}

function getPosterAudience(destination: PostCategory) {
  if (destination === "desk") return "Public audience, stakeholders";
  if (destination === "blog") return "Readers, partners, digital audience";
  return "Public audience, media, supporters";
}

function getPosterChannels(destination: PostCategory) {
  if (destination === "desk") return ["Website", "LinkedIn", "WhatsApp"];
  if (destination === "blog") return ["Website", "Instagram Stories", "LinkedIn"];
  return ["Website", "Instagram", "X", "LinkedIn"];
}

function buildEventPosterTitle(occasionId: string, recipientName?: string) {
  const option = getEventOccasionOption(occasionId);
  if (!option) {
    return "Event poster";
  }

  if (option.requiresRecipient && recipientName?.trim()) {
    return `${option.title}, ${recipientName.trim()}`;
  }

  return option.title;
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

  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = slugify(requestedSlug || title);

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

export async function savePosterQuick(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireStudioAuth();

  const note = String(formData.get("note") ?? "").trim();
  const destination = String(formData.get("destination") ?? "news") as PostCategory;
  const kind = String(formData.get("kind") ?? "quote") as PosterKind;
  const designId = String(formData.get("designId") ?? "").trim();
  const eventOccasion = String(formData.get("eventOccasion") ?? "").trim();
  const recipientName = String(formData.get("recipientName") ?? "").trim();

  if (!note) {
    return { message: "Write the note that should appear on the poster before publishing." };
  }

  const design = getPosterDesignPreset(designId);
  if (!design) {
    return { message: "Choose one poster design before publishing." };
  }

  if (kind === "event") {
    const option = getEventOccasionOption(eventOccasion);
    if (!option) {
      return { message: "Choose the event occasion before publishing the card." };
    }

    if (option.requiresRecipient && !recipientName) {
      return { message: "Add the name of the person you are wishing before publishing the birthday card." };
    }
  }

  const title = kind === "event" ? buildEventPosterTitle(eventOccasion, recipientName) : buildPosterTitle(note, destination, kind);
  const slug = buildUniqueSlug(title);
  const kicker = kind === "event" ? "Event Greeting" : getPosterKicker(destination, kind);
  const publishedAt = formatDateLabel();

  upsertPostInStore({
    slug,
    title,
    summary: note,
    category: destination,
    publishedAt,
    updatedAt: publishedAt,
    readTime: estimateReadTime([note]),
    kicker,
    shareCaption: note,
    socialHook: note,
    platformCopy: {
      instagram: note,
      x: note,
      linkedin: note,
    },
    socialCardTemplate: kind === "event" ? "statement" : design.template,
    portraitImage: kind === "event" ? undefined : design.portraitImage,
    portraitAlt: kind === "event" ? undefined : design.portraitAlt,
    audience: getPosterAudience(destination),
    tags: [
      "Poster",
      kind === "event" ? "Event" : kind === "announcement" ? "Announcement" : "Quote Card",
      ...(kind === "event" && eventOccasion ? [eventOccasion] : []),
      destination === "blog" ? "Insight" : destination === "desk" ? "Chairman's Desk" : "News",
    ],
    distributionChannels: getPosterChannels(destination),
    editorialStatus: "published",
    featured: false,
    coverImage: kind === "event" ? undefined : design.coverImage,
    coverAlt: kind === "event" ? undefined : design.coverAlt,
    body: [note],
  });

  const publicPath = getPublicPath(destination, slug);
  const studioPath = `/studio/posts/${slug}`;
  revalidateContentPaths(publicPath, studioPath);

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
  const repoUrl = String(formData.get("repoUrl") ?? "").trim();
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
    repoUrl: repoUrl || undefined,
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
