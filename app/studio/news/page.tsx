import { StudioPostManager } from "../../components/studio-post-manager";
import { StudioShell } from "../../components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioNewsPage() {
  await requireStudioAuth("/studio/news");

  return (
    <StudioShell
      title="News desk"
      intro="Use News for official announcements, release notes, scheduled drops, and statements. The card carries the headline; the caption explains the update."
    >
      <StudioPostManager
        category="news"
        createHref="/studio/news/new"
        createLabel="Create News Card"
        scopeLabel="News"
        queueNote="Only official news items appear here: announcements, product updates, event drops, and public statements."
        itemLabel="News"
      />
    </StudioShell>
  );
}
