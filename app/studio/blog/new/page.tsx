import { StudioInsightEditorForm } from "@/app/components/studio-insight-editor-form";
import { StudioShell } from "@/app/components/studio-shell";
import { getAllMediaItems, getPostsByCategory } from "@/lib/content";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioNewBlogPage() {
  await requireStudioAuth("/studio/blog/new");
  const mediaItems = getAllMediaItems();
  const suggestedTags = Array.from(
    new Set(getPostsByCategory("blog").flatMap((post) => post.tags))
  ).slice(0, 8);

  return (
    <StudioShell
      title="Create insight"
      intro="Write the article, choose a cover image, and let the Studio detect the summary, read time, share text, and publishing structure automatically."
      wide
    >
      <StudioInsightEditorForm mediaItems={mediaItems} suggestedTags={suggestedTags} />
    </StudioShell>
  );
}
