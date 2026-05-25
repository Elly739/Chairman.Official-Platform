import { StudioCreateFlow } from "@/app/components/studio-create-flow";
import { StudioShell } from "../../components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioPostsPage() {
  await requireStudioAuth("/studio/posts");

  return (
    <StudioShell
      title="Create posts"
      intro="Start here when you want to create a public post, poster, news update, insight, or site-page update. The first step is simple, then each content type opens the right focused flow."
    >
      <StudioCreateFlow />
    </StudioShell>
  );
}
