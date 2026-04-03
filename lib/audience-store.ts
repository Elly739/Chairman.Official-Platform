import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

export type ContactInquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  handled?: boolean;
};

export type Subscriber = {
  id: string;
  email: string;
  source: string;
  createdAt: string;
};

export type AudienceStore = {
  inquiries: ContactInquiry[];
  subscribers: Subscriber[];
};

const dataDirectory = join(process.cwd(), "data");
const storePath = join(dataDirectory, "audience-store.json");

function getDefaultStore(): AudienceStore {
  return {
    inquiries: [],
    subscribers: [],
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

export function readAudienceStore(): AudienceStore {
  ensureStore();
  const store = JSON.parse(readFileSync(storePath, "utf8")) as AudienceStore;

  return {
    inquiries: store.inquiries.map((inquiry) => ({ ...inquiry, handled: inquiry.handled ?? false })),
    subscribers: store.subscribers,
  };
}

export function writeAudienceStore(store: AudienceStore) {
  ensureStore();
  writeFileSync(storePath, JSON.stringify(store, null, 2), "utf8");
}

export function addContactInquiry(input: Omit<ContactInquiry, "id" | "createdAt" | "handled">) {
  const store = readAudienceStore();
  const inquiry: ContactInquiry = {
    id: randomUUID(),
    createdAt: formatCreatedAt(),
    handled: false,
    ...input,
  };

  store.inquiries.unshift(inquiry);
  writeAudienceStore(store);
  return inquiry;
}

export function addSubscriber(input: Omit<Subscriber, "id" | "createdAt">) {
  const store = readAudienceStore();
  const normalizedEmail = input.email.trim().toLowerCase();
  const existing = store.subscribers.find((subscriber) => subscriber.email.toLowerCase() === normalizedEmail);

  if (existing) {
    return existing;
  }

  const subscriber: Subscriber = {
    id: randomUUID(),
    createdAt: formatCreatedAt(),
    email: normalizedEmail,
    source: input.source,
  };

  store.subscribers.unshift(subscriber);
  writeAudienceStore(store);
  return subscriber;
}

export function markInquiryHandled(id: string, handled: boolean) {
  const store = readAudienceStore();
  store.inquiries = store.inquiries.map((inquiry) =>
    inquiry.id === id ? { ...inquiry, handled } : inquiry
  );
  writeAudienceStore(store);
}

export function deleteInquiry(id: string) {
  const store = readAudienceStore();
  store.inquiries = store.inquiries.filter((inquiry) => inquiry.id !== id);
  writeAudienceStore(store);
}

export function deleteSubscriber(id: string) {
  const store = readAudienceStore();
  store.subscribers = store.subscribers.filter((subscriber) => subscriber.id !== id);
  writeAudienceStore(store);
}
