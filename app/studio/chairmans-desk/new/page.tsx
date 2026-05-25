import { StudioPostEditorForm } from "@/app/components/studio-post-editor-form";
import { StudioShell } from "@/app/components/studio-shell";
import { getAllMediaItems } from "@/lib/content";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioNewDeskAnnouncementPage() {
  await requireStudioAuth("/studio/chairmans-desk/new");
  const mediaItems = getAllMediaItems();

  return (
    <StudioShell
      title="Create Desk announcement"
      intro="This editor is preconfigured for Chairman's Desk announcements so you can publish official statements from a dedicated workflow."
    >
      <StudioPostEditorForm
        mediaItems={mediaItems}
        defaultCategory="desk"
        defaultKicker="Chairman's Desk Announcement"
        defaultTemplate="statement"
      />
    </StudioShell>
  );
}
