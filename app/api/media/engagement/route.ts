import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addMediaComment, addMediaLike, addMediaShare, getMediaEngagementEntry } from "@/lib/media-engagement-store";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    action?: "like" | "share" | "comment";
    mediaSrc?: string;
    name?: string;
    message?: string;
  };

  const mediaSrc = body.mediaSrc?.trim();
  if (!mediaSrc) {
    return NextResponse.json({ message: "A media item is required." }, { status: 400 });
  }

  if (body.action === "like") {
    const entry = addMediaLike(mediaSrc);
    revalidatePath("/media");
    return NextResponse.json(entry);
  }

  if (body.action === "share") {
    const entry = addMediaShare(mediaSrc);
    revalidatePath("/media");
    return NextResponse.json(entry);
  }

  if (body.action === "comment") {
    const name = body.name?.trim();
    const message = body.message?.trim();

    if (!name || !message) {
      return NextResponse.json({ message: "Add your name and comment before posting." }, { status: 400 });
    }

    const entry = addMediaComment(mediaSrc, name, message);
    revalidatePath("/media");
    return NextResponse.json(entry);
  }

  return NextResponse.json(getMediaEngagementEntry(mediaSrc));
}
