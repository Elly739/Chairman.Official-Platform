export type EventCardConcept = {
  slug: string;
  occasion: string;
  title: string;
  message: string;
  signature: string;
  motif: string;
  channels: string[];
  primary: string;
  accent: string;
  background: string;
  icon: "crescent" | "tree" | "balloons";
};

export type EventOccasionOption = {
  id: string;
  occasion: string;
  title: string;
  defaultMessage: string;
  signature: string;
  motif: string;
  channels: string[];
  primary: string;
  accent: string;
  background: string;
  icon: EventCardConcept["icon"];
  requiresRecipient?: boolean;
};

export const eventCardConcepts: EventCardConcept[] = [
  {
    slug: "eid-mubarak",
    occasion: "Eid Ul-Fitr",
    title: "Eid Mubarak",
    message: "May this season bring peace to every home, and blessings that inspire growth and unity.",
    signature: "Chairman.Official festive message",
    motif: "Decorated crescent and lanterns",
    channels: ["WhatsApp Status", "Instagram Story", "X Post"],
    primary: "#0A3D62",
    accent: "#D4AF60",
    background: "#F7F1E3",
    icon: "crescent",
  },
  {
    slug: "christmas-message",
    occasion: "Christmas Message",
    title: "Merry Christmas",
    message: "May this Christmas be marked by warmth, gratitude, and the kind of hope that gathers families and communities together.",
    signature: "Chairman.Official seasonal message",
    motif: "Tree and stars",
    channels: ["Instagram Post", "LinkedIn Greeting", "Website Banner"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#F4F7F2",
    icon: "tree",
  },
  {
    slug: "birthday-honours",
    occasion: "Birthday Tribute",
    title: "Happy Birthday",
    message: "Celebrating a life of service, vision, and meaningful impact. May the year ahead carry wisdom, favour, and fresh momentum.",
    signature: "Chairman.Official tribute card",
    motif: "Elegant balloons",
    channels: ["X Post", "Instagram Story", "Printable Tribute"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#FAF5EE",
    icon: "balloons",
  },
];

export const eventOccasionOptions: EventOccasionOption[] = [
  {
    id: "birthday",
    occasion: "Birthday Tribute",
    title: "Happy Birthday",
    defaultMessage: "Wishing you a year marked by grace, strength, joy, and meaningful progress in every season ahead.",
    signature: "Chairman.Official birthday message",
    motif: "Elegant balloons",
    channels: ["Instagram Story", "WhatsApp Status", "X Post"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#FAF5EE",
    icon: "balloons",
    requiresRecipient: true,
  },
  {
    id: "christmas",
    occasion: "Christmas Message",
    title: "Merry Christmas",
    defaultMessage: "May this Christmas be marked by warmth, gratitude, and the kind of hope that gathers families and communities together.",
    signature: "Chairman.Official seasonal message",
    motif: "Tree and stars",
    channels: ["Instagram Post", "LinkedIn Greeting", "Website Banner"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#F4F7F2",
    icon: "tree",
  },
  {
    id: "mashujaa-day",
    occasion: "Mashujaa Day",
    title: "Happy Mashujaa Day",
    defaultMessage: "Honouring the courage, sacrifice, and service that continue to shape the strength and dignity of our nation.",
    signature: "Chairman.Official public holiday message",
    motif: "Ceremonial national tribute",
    channels: ["Instagram Post", "X Post", "LinkedIn Greeting"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#F7F3E7",
    icon: "crescent",
  },
  {
    id: "jamhuri-day",
    occasion: "Jamhuri Day",
    title: "Happy Jamhuri Day",
    defaultMessage: "Celebrating the freedom, responsibility, and shared national purpose that continue to define our journey forward.",
    signature: "Chairman.Official public holiday message",
    motif: "Ceremonial national tribute",
    channels: ["Instagram Post", "X Post", "LinkedIn Greeting"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#F6F2E8",
    icon: "crescent",
  },
  {
    id: "labour-day",
    occasion: "Labour Day",
    title: "Happy Labour Day",
    defaultMessage: "Honouring the dedication, resilience, and contribution of every worker building a stronger future for our communities and country.",
    signature: "Chairman.Official public holiday message",
    motif: "Ceremonial national tribute",
    channels: ["Instagram Post", "X Post", "LinkedIn Greeting"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#F8F4EA",
    icon: "crescent",
  },
  {
    id: "womens-day",
    occasion: "International Women's Day",
    title: "Happy Women's Day",
    defaultMessage: "Celebrating the strength, brilliance, and leadership of women whose work continues to shape families, institutions, and the future.",
    signature: "Chairman.Official commemorative message",
    motif: "Ceremonial tribute",
    channels: ["Instagram Post", "LinkedIn Greeting", "WhatsApp Status"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#FBF5F2",
    icon: "balloons",
  },
  {
    id: "environment-day",
    occasion: "World Environment Day",
    title: "Happy Environment Day",
    defaultMessage: "A reminder that stewardship, sustainability, and everyday responsibility are part of the future we are all called to protect.",
    signature: "Chairman.Official commemorative message",
    motif: "Tree and stars",
    channels: ["Instagram Post", "X Post", "Website Banner"],
    primary: "#0A3D62",
    accent: "#C89B3C",
    background: "#F3F7F1",
    icon: "tree",
  },
];

export function getEventCardConcept(slug: string) {
  return eventCardConcepts.find((event) => event.slug === slug);
}

export function getEventOccasionOption(id: string) {
  return eventOccasionOptions.find((occasion) => occasion.id === id);
}

export function buildEventCardConcept(
  occasionId: string,
  message?: string,
  recipientName?: string
): EventCardConcept | null {
  const option = getEventOccasionOption(occasionId);
  if (!option) {
    return null;
  }

  const trimmedRecipient = recipientName?.trim();
  const title =
    option.requiresRecipient && trimmedRecipient
      ? `${option.title}, ${trimmedRecipient}`
      : option.title;

  return {
    slug: option.id,
    occasion: option.occasion,
    title,
    message: message?.trim() || option.defaultMessage,
    signature: option.signature,
    motif: option.motif,
    channels: option.channels,
    primary: option.primary,
    accent: option.accent,
    background: option.background,
    icon: option.icon,
  };
}
