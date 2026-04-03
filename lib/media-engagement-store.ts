import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { join } from "node:path";

export type MediaComment = {
  id: string;
  mediaSrc: string;
  name: string;
  message: string;
  createdAt: string;
};

export type MediaEngagementEntry = {
  mediaSrc: string;
  likes: number;
  shares: number;
  comments: MediaComment[];
};

export type MediaEngagementStore = {
  entries: MediaEngagementEntry[];
};

const dataDirectory = join(process.cwd(), "data");
const storePath = join(dataDirectory, "media-engagement-store.json");

function getDefaultStore(): MediaEngagementStore {
  return {
    entries: [],
  };
}

function ensureStore() {
  if (!existsSync(dataDirectory)) {
    mkdirSync(dataDirectory, { recursive: true });
  }

  if (!existsSync(storePath)) {
    writeFileSync(storePath, JSON.stringify(getDefaultStore(), null, 2), "utf8");
  }
}

function formatCreatedAt() {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export function readMediaEngagementStore(): MediaEngagementStore {
  ensureStore();
  return JSON.parse(readFileSync(storePath, "utf8")) as MediaEngagementStore;
}

export function writeMediaEngagementStore(store: MediaEngagementStore) {
  ensureStore();
  writeFileSync(storePath, JSON.stringify(store, null, 2), "utf8");
}

export function getMediaEngagementEntry(mediaSrc: string) {
  const store = readMediaEngagementStore();
  return store.entries.find((entry) => entry.mediaSrc === mediaSrc) ?? {
    mediaSrc,
    likes: 0,
    shares: 0,
    comments: [],
  };
}

function upsertEntry(entry: MediaEngagementEntry) {
  const store = readMediaEngagementStore();
  const existingIndex = store.entries.findIndex((candidate) => candidate.mediaSrc === entry.mediaSrc);

  if (existingIndex >= 0) {
    store.entries[existingIndex] = entry;
  } else {
    store.entries.unshift(entry);
  }

  writeMediaEngagementStore(store);
  return entry;
}

export function addMediaLike(mediaSrc: string) {
  const entry = getMediaEngagementEntry(mediaSrc);
  entry.likes += 1;
  return upsertEntry(entry);
}

export function addMediaShare(mediaSrc: string) {
  const entry = getMediaEngagementEntry(mediaSrc);
  entry.shares += 1;
  return upsertEntry(entry);
}

export function addMediaComment(mediaSrc: string, name: string, message: string) {
  const entry = getMediaEngagementEntry(mediaSrc);
  entry.comments.unshift({
    id: randomUUID(),
    mediaSrc,
    name,
    message,
    createdAt: formatCreatedAt(),
  });
  return upsertEntry(entry);
}
