import type { NextRequest } from "next/server";
import { notFound } from "next/navigation";
import { createSocialCardImage, type SocialCardPlatform } from "@/lib/social-card";
import { getPostBySlug } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const platforms = new Set<SocialCardPlatform>(["instagram", "x", "linkedin"]);

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: RouteProps) {
  const { slug } = await params;
  const platform = request.nextUrl.searchParams.get("platform") as SocialCardPlatform | null;
  const shouldDownload = request.nextUrl.searchParams.get("download") === "1";

  if (!platform || !platforms.has(platform)) {
    return Response.json({ message: "Choose instagram, x, or linkedin." }, { status: 400 });
  }

  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  try {
    const image = await createSocialCardImage(post, platform);
    image.headers.set("Cache-Control", "public, max-age=300, stale-while-revalidate=600");

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
