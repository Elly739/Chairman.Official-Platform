import type { NextRequest } from "next/server";
import { notFound } from "next/navigation";
import { createSocialCardImage, type SocialCardPlatform } from "@/lib/social-card";
import { getStudioPostBySlug } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STUDIO_COOKIE = "chairman_studio_session";
const STUDIO_VALUE = "active";
const platforms = new Set<SocialCardPlatform>(["instagram", "x", "linkedin"]);

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { slug } = await params;
  const platform = request.nextUrl.searchParams.get("platform") as SocialCardPlatform | null;
  const shouldDownload = request.nextUrl.searchParams.get("download") === "1";
  const isAuthenticated = request.cookies.get(STUDIO_COOKIE)?.value === STUDIO_VALUE;

  if (shouldDownload && !isAuthenticated) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!platform || !platforms.has(platform)) {
    return Response.json({ message: "Choose instagram, x, or linkedin." }, { status: 400 });
  }

  const post = getStudioPostBySlug(slug);
  if (!post) {
    notFound();
  }

  try {
    const image = await createSocialCardImage(post, platform);
    image.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    image.headers.set("Pragma", "no-cache");
    image.headers.set("Expires", "0");

    if (shouldDownload) {
      image.headers.set("Content-Disposition", `attachment; filename="${post.slug}-${platform}-card.png"`);
    }

    return image;
  } catch (error) {
    return Response.json(
      {
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
