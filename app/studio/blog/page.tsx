import { StudioPostManager } from "../../components/studio-post-manager";
import { StudioShell } from "../../components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioBlogPage() {
  await requireStudioAuth("/studio/blog");

  return (
    <StudioShell
      title="Insights publishing"
      intro="This section is only for Insights writing so long-form thought pieces are managed separately from News."
    >
      <StudioPostManager
        category="blog"
        createHref="/studio/blog/new"
        createLabel="Create Insight Post"
        scopeLabel="Insights"
        queueNote="Only Insights posts appear here. Publish from this queue to keep long-form writing focused."
        itemLabel="Insights"
      />
    </StudioShell>
  );
}

