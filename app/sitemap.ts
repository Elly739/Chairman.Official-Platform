import type { MetadataRoute } from "next";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const projects = getAllProjects();
  const staticRoutes = ["/", "/news", "/blog", "/chairmans-desk", "/projects", "/media", "/studio/login"];

  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  })) satisfies MetadataRoute.Sitemap;

  const postEntries = posts.map((post) => ({
    url: absoluteUrl(`/${post.category === "desk" ? "chairmans-desk" : post.category}/${post.slug}`),
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: post.featured ? 0.9 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const projectEntries = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  })) satisfies MetadataRoute.Sitemap;

  return [...staticEntries, ...postEntries, ...projectEntries];
}
