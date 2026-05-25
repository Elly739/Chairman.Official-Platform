import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { NextRequest } from "next/server";
import {
  deleteMediaItemFromStore,
  readContentStore,
  upsertMediaItemInStore,
} from "@/lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STUDIO_COOKIE = "chairman_studio_session";
const STUDIO_VALUE = "active";
const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function sanitizeSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "media-asset";
}

function formatDateLabel() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());
}

function isAuthorized(request: NextRequest) {
  return request.cookies.get(STUDIO_COOKIE)?.value === STUDIO_VALUE;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const uploadedFile = formData.get("file");

  if (!(uploadedFile instanceof File) || uploadedFile.size === 0) {
    return Response.json({ message: "Select an image before uploading." }, { status: 400 });
  }

  const extension = uploadedFile.name.includes(".")
    ? uploadedFile.name.slice(uploadedFile.name.lastIndexOf(".")).toLowerCase()
    : "";

  if (!allowedExtensions.has(extension)) {
    return Response.json(
      { message: "Use PNG, JPG, JPEG, WEBP, or GIF images." },
      { status: 400 }
    );
  }

  const uploadDirectory = join(process.cwd(), "public", "uploads");
  await mkdir(uploadDirectory, { recursive: true });

  const baseName = sanitizeSegment(uploadedFile.name.replace(extension, ""));
  const fileName = `${Date.now()}-${baseName}${extension}`;
  const filePath = join(uploadDirectory, fileName);
  const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
  await writeFile(filePath, fileBuffer);

  const title = String(formData.get("title") ?? "").trim() || baseName.replace(/-/g, " ");
  const description =
    String(formData.get("description") ?? "").trim() ||
    "Uploaded studio asset ready for post covers, project visuals, or media features.";
  const alt = String(formData.get("alt") ?? "").trim() || title;
  const caption = String(formData.get("caption") ?? "").trim() || description;
  const channelLabel = String(formData.get("channelLabel") ?? "").trim() || "Media Post";
  const type = String(formData.get("type") ?? "").trim() || "Image Upload";
  const publicPost = String(formData.get("publicPost") ?? "") === "on";

  const item = {
    title,
    type,
    description,
    src: `/uploads/${fileName}`,
    alt,
    createdAt: formatDateLabel(),
    publicPost,
    caption,
    channelLabel,
  };

  upsertMediaItemInStore(item);

  return Response.json({ item }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    src?: string;
    title?: string;
    type?: string;
    description?: string;
    alt?: string;
    publicPost?: boolean;
    caption?: string;
    channelLabel?: string;
  };

  const src = body.src?.trim();
  if (!src) {
    return Response.json({ message: "Choose an asset to update." }, { status: 400 });
  }

  const store = readContentStore();
  const existing = store.mediaItems.find((item) => item.src === src);

  if (!existing) {
    return Response.json({ message: "That asset could not be found." }, { status: 404 });
  }

  const item = {
    ...existing,
    title: body.title?.trim() || existing.title,
    type: body.type?.trim() || existing.type,
    description: body.description?.trim() || existing.description,
    alt: body.alt?.trim() || existing.alt,
    publicPost: typeof body.publicPost === "boolean" ? body.publicPost : existing.publicPost,
    caption: body.caption?.trim() || existing.caption || existing.description,
    channelLabel: body.channelLabel?.trim() || existing.channelLabel || existing.type,
  };

  upsertMediaItemInStore(item);

  return Response.json({ item }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { src } = (await request.json()) as { src?: string };

  if (!src) {
    return Response.json({ message: "Choose an asset to delete." }, { status: 400 });
  }

  if (!src.startsWith("/uploads/")) {
    return Response.json({ message: "Only uploaded assets can be deleted." }, { status: 400 });
  }

  const store = readContentStore();
  const referencedPost = store.posts.find((post) => post.coverImage === src || post.portraitImage === src);
  const referencedProject = store.projects.find((project) => project.coverImage === src);

  if (referencedPost || referencedProject) {
    return Response.json(
      {
        message: `This asset is still in use by ${referencedPost?.title ?? referencedProject?.name}. Remove it from that post or project first.`,
      },
      { status: 409 }
    );
  }

  const filePath = join(process.cwd(), "public", ...src.replace(/^\//, "").split("/"));
  await rm(filePath, { force: true });
  deleteMediaItemFromStore(src);

  return Response.json({ src }, { status: 200 });
}
