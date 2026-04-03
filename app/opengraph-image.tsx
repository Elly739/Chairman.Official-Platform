import { createOgImage, ogContentType, ogSize } from "@/lib/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} homepage preview`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: siteConfig.name,
    title: "Elly Okello | Chairman, Innovator, Builder",
    summary:
      "A personal media platform for statements, projects, news updates, and public-facing storytelling.",
  });
}