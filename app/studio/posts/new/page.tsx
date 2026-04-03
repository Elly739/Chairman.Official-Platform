import { StudioPostEditorForm } from "@/app/components/studio-post-editor-form";
import { StudioShell } from "@/app/components/studio-shell";
import { getAllMediaItems } from "@/lib/content";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioNewPostPage() {
  await requireStudioAuth("/studio/posts/new");
  const mediaItems = getAllMediaItems();

  return (
    <StudioShell
      title="Create a new post"
      intro="Draft a new story, choose its cover, shape the message, and save it into the local content store without leaving this workspace."
    >
      <StudioPostEditorForm mediaItems={mediaItems} />
    </StudioShell>
  );
}
