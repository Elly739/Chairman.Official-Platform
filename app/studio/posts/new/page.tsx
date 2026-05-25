import { StudioPosterCreateFlow } from "@/app/components/studio-poster-create-flow";
import { StudioShell } from "@/app/components/studio-shell";
import { requireStudioAuth } from "@/lib/studio-auth";

export default async function StudioNewPostPage() {
  await requireStudioAuth("/studio/posts/new");

  return (
    <StudioShell
      title="Create a poster"
      intro="Create a poster in the simplest possible way: write the note, choose a ready-made design with its own picture, preview it, then publish."
      wide
    >
      <StudioPosterCreateFlow />
    </StudioShell>
  );
}
