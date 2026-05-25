"use server";

import { readContentStore } from "./content-store";
import type { Post, PostCategory } from "@/content/posts";
import type { MediaItem } from "@/content/media";
import type { Project } from "@/content/projects";

export async function getAllPosts(): Promise<Post[]> {
  const store = readContentStore();
  return store.posts.filter((post: Post) => post.editorialStatus === "published");
}

export async function getAllProjects(): Promise<Project[]> {
  const store = readContentStore();
  return store.projects;
}

export async function getAllMediaItems(): Promise<MediaItem[]> {
  const store = readContentStore();
  return store.mediaItems;
}

export async function getPostsByCategory(category: PostCategory): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

export async function getFeaturedPost(): Promise<Post> {
  const store = readContentStore();
  const featured = store.posts.find((post: Post) => post.featured && post.editorialStatus === "published");
  return featured || store.posts.find((post: Post) => post.editorialStatus === "published") || store.posts[0];
}

export async function getLatestDeskPost(): Promise<Post | null> {
  const deskPosts = await getPostsByCategory("desk");
  return deskPosts[0] || null;
}

