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

export function getEventCardConcept(slug: string) {
  return eventCardConcepts.find((event) => event.slug === slug);
}
