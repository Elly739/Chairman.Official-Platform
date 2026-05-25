export const siteConfig = {
  name: "Chairman.Official",
  title: "Chairman.Official | Elly Okello",
  description:
    "A personal media platform for Elly Okello featuring news, statements, projects, and public-facing storytelling.",
  url: "https://chairman.official",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}