import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioPostEditorForm } from "@/app/components/studio-post-editor-form";
import { StudioShell } from "@/app/components/studio-shell";
import { StudioSocialCardPanel } from "@/app/components/studio-social-card-panel";
import { getAllMediaItems, getAllStudioPosts, getStudioPostBySlug } from "@/lib/content";
import { requireStudioAuth } from "@/lib/studio-auth";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllStudioPosts().map((post) => ({ slug: post.slug }));
}

export default async function StudioPostDetailPage({ params }: PageProps) {
  await requireStudioAuth();
  const { slug } = await params;
  const post = getStudioPostBySlug(slug);
  const mediaItems = getAllMediaItems();

  if (!post) {
    notFound();
  }

  return (
    <StudioShell
      title={post.title}
      intro="This workspace is now split into two clearer parts: edit the post first, then review the saved export cards underneath after you click Save Changes."
    >
      <div className="mb-6 flex justify-end">
        <Link href={post.category === "desk" ? `/chairmans-desk/${post.slug}` : `/${post.category}/${post.slug}`} className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]">
          Open Public Page
        </Link>
      </div>
      <StudioPostEditorForm post={post} mediaItems={mediaItems} />
      <StudioSocialCardPanel post={post} />
    </StudioShell>
  );
}
