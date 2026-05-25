import type { Post } from "@/lib/content";
import { buildEventCardConcept, eventOccasionOptions, type EventCardConcept } from "@/lib/event-card-concepts";

function extractRecipientName(title: string, baseTitle: string) {
  const prefix = `${baseTitle},`;
  if (!title.startsWith(prefix)) {
    return undefined;
  }

  const recipient = title.slice(prefix.length).trim();
  return recipient || undefined;
}

export function getEventOccasionIdFromPost(post: Post) {
  return eventOccasionOptions.find((occasion) => post.tags.includes(occasion.id))?.id;
}

export function isEventGreetingPost(post: Post) {
  return post.tags.includes("Event") && Boolean(getEventOccasionIdFromPost(post));
}

export function getEventConceptFromPost(post: Post): EventCardConcept | null {
  const occasionId = getEventOccasionIdFromPost(post);
  if (!occasionId) {
    return null;
  }

  const option = eventOccasionOptions.find((occasion) => occasion.id === occasionId);
  if (!option) {
    return null;
  }

  const recipientName = option.requiresRecipient ? extractRecipientName(post.title, option.title) : undefined;
  return buildEventCardConcept(occasionId, post.summary || post.socialHook || post.shareCaption, recipientName);
}
