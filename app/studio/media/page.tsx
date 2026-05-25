import { StudioMediaManager } from "../../components/studio-media-manager";
import { StudioShell } from "../../components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";
import { getAllMediaItems, getAllStudioPosts } from "@/lib/content";

export default async function StudioMediaPage() {
  await requireStudioAuth("/studio/media");
  const mediaItems = getAllMediaItems();
  const upcomingStories = getAllStudioPosts().filter((post) => post.editorialStatus !== "published" || post.scheduledFor);

  return (
    <StudioShell
      title="Media library"
      intro="Manage images that are already in the studio. Keep them private as assets or mark them public so they appear in the Media tab of the website."
    >
      <StudioMediaManager initialMediaItems={mediaItems} draftPosts={upcomingStories} />
    </StudioShell>
  );
}
