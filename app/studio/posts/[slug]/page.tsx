import Link from "next/link";
import { notFound } from "next/navigation";
import { StudioEventCardPanel } from "@/app/components/studio-event-card-panel";
import { StudioPostEditorForm } from "@/app/components/studio-post-editor-form";
import { StudioShell } from "@/app/components/studio-shell";
import { StudioSocialCardPanel } from "@/app/components/studio-social-card-panel";
import { getAllMediaItems, getAllStudioPosts, getStudioPostBySlug } from "@/lib/content";
import { getEventConceptFromPost, isEventGreetingPost } from "@/lib/event-card-post";
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

  const isEventPost = isEventGreetingPost(post);
  const eventConcept = isEventPost ? getEventConceptFromPost(post) : null;

  return (
    <StudioShell
      title={post.title}
      intro={
        isEventPost
          ? "This event workflow now keeps ceremonial greeting cards in their own export experience. Edit the message first, then use the dedicated event-card downloads underneath."
          : "This workspace is now split into two clearer parts: edit the post first, then review the saved export cards underneath after you click Save Changes."
      }
    >
      <div className="mb-6 flex justify-end">
        <Link
          href={post.category === "desk" ? `/chairmans-desk/${post.slug}` : `/${post.category}/${post.slug}`}
          className="rounded-full border border-[var(--color-line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-brand)]"
        >
          Open Public Page
        </Link>
      </div>
      <StudioPostEditorForm post={post} mediaItems={mediaItems} />
      {isEventPost && eventConcept ? <StudioEventCardPanel post={post} event={eventConcept} /> : <StudioSocialCardPanel post={post} />}
    </StudioShell>
  );
}
