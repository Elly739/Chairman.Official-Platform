export type PostCategory = "news" | "blog" | "desk";
export type EditorialStatus = "draft" | "review" | "published";
export type SocialCardTemplate = "campaign" | "portrait" | "statement";

export type PostPlatformCopy = {
  instagram?: string;
  x?: string;
  linkedin?: string;
};

export type Post = {
  slug: string;
  title: string;
  summary: string;
  category: PostCategory;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  kicker: string;
  shareCaption: string;
  socialHook: string;
  platformCopy?: PostPlatformCopy;
  socialCardTemplate?: SocialCardTemplate;
  portraitImage?: string;
  portraitAlt?: string;
  audience: string;
  tags: string[];
  distributionChannels: string[];
  editorialStatus: EditorialStatus;
  scheduledFor?: string;
  featured?: boolean;
  coverImage?: string;
  coverAlt?: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "civic-innovation-labs-expansion",
    title: "Digital leadership agenda expands across civic innovation labs",
    summary:
      "A broader civic innovation push is creating a more serious working table for builders, policymakers, and young leaders ready to move from ideas into execution.",
    category: "news",
    publishedAt: "March 18, 2026",
    updatedAt: "March 19, 2026",
    readTime: "4 min read",
    kicker: "News Update",
    shareCaption: "A stronger civic innovation agenda is beginning to take shape.",
    socialHook: "A clearer model for public-private innovation conversations is emerging.",
    platformCopy: {
      instagram: "A clearer model for public-private innovation conversations is emerging.",
      x: "Public-private innovation conversations matter more when they are built around action, not optics.",
      linkedin:
        "Digital leadership now depends on spaces where builders, policymakers, and young leaders can move from dialogue into implementation.",
    },
    socialCardTemplate: "portrait",
    portraitImage: "/uploads/portraits/portrait-alt.jpg",
    portraitAlt: "Elly Okello portrait for civic innovation update",
    audience: "Stakeholders, builders, media",
    tags: ["Innovation", "Policy", "Youth Leadership"],
    distributionChannels: ["Website", "WhatsApp", "LinkedIn"],
    editorialStatus: "published",
    featured: true,
    coverImage: "/uploads/posts/innovation-day-3.jpg",
    coverAlt: "Innovation day event moment for civic innovation labs update",
    body: [
      "The next chapter of public leadership will be shaped by people who can turn ambition into systems that actually work. That is the conviction behind the expanding civic innovation lab conversations now gaining momentum.",
      "The format is intentionally practical. Builders, policy actors, and emerging leaders are being brought into one working environment where ideas are tested against implementation, not left floating as good intentions.",
      "That matters because serious leadership communication should do more than announce that a meeting happened. It should show direction, the standard of execution expected afterward, and the seriousness of the partnerships being built.",
    ],
  },
  {
    slug: "quarterly-stakeholder-briefing-series",
    title: "Chairman's office launches quarterly stakeholder briefing series",
    summary:
      "A more disciplined briefing rhythm will give partners, supporters, and the wider public a clearer view of priorities, decisions, and forward movement.",
    category: "news",
    publishedAt: "March 14, 2026",
    updatedAt: "March 17, 2026",
    readTime: "3 min read",
    kicker: "Announcement",
    shareCaption: "A disciplined way to keep stakeholders informed and aligned.",
    socialHook: "Consistency is becoming part of the public communication strategy.",
    platformCopy: {
      instagram: "Consistency is becoming part of the public communication strategy.",
      x: "Trust grows faster when updates are structured, predictable, and useful.",
      linkedin:
        "The quarterly briefing series is designed to make stakeholder communication more disciplined, more transparent, and more useful over time.",
    },
    socialCardTemplate: "campaign",
    portraitImage: "/uploads/portraits/portrait-main.jpg",
    portraitAlt: "Elly Okello portrait for stakeholder briefing cards",
    audience: "Partners, supporters, press",
    tags: ["Announcements", "Governance", "Communications"],
    distributionChannels: ["Website", "Email", "LinkedIn"],
    editorialStatus: "published",
    coverImage: "/uploads/posts/speech.jpg",
    coverAlt: "Public speaking moment for stakeholder briefing series",
    body: [
      "Consistency is one of the clearest ways to build trust. The quarterly stakeholder briefing series has been introduced to ensure that partners, supporters, and the broader public receive timely communication shaped by clarity rather than urgency alone.",
      "Each briefing will carry milestone updates, selected reflections from the Chairman's Desk, and the priorities guiding the next quarter. That rhythm matters because serious communication should feel dependable, not occasional or reactive.",
      "Over time, the series will also create stronger source material for email updates, WhatsApp circulation, social story cards, and follow-up media moments that extend well beyond the website itself.",
    ],
  },
  {
    slug: "product-thinking-for-public-leadership",
    title: "Why modern public leadership needs product thinking",
    summary:
      "Public leadership becomes more trustworthy when ideas are designed with clarity, usability, and measurable outcomes in mind.",
    category: "blog",
    publishedAt: "March 12, 2026",
    updatedAt: "March 18, 2026",
    readTime: "5 min read",
    kicker: "Blog Essay",
    shareCaption: "Public leadership works best when ideas are designed with people in mind.",
    socialHook: "Better governance often starts with better design thinking.",
    platformCopy: {
      instagram: "Better governance often starts with better design thinking.",
      x: "Public leadership improves when ideas are designed around people, clarity, and measurable outcomes.",
      linkedin:
        "Product thinking gives public leadership a practical framework for better communication, sharper service design, and more accountable execution.",
    },
    socialCardTemplate: "statement",
    portraitImage: "/uploads/portraits/portrait-main.jpg",
    portraitAlt: "Elly Okello portrait for leadership essay",
    audience: "Young professionals, civic innovators",
    tags: ["Leadership", "Product Thinking", "Governance"],
    distributionChannels: ["Website", "Instagram Stories", "X"],
    editorialStatus: "published",
    coverImage: "/uploads/posts/design.jpg",
    coverAlt: "Design-focused visual for public leadership essay",
    body: [
      "Product thinking is often associated with startups, but its discipline belongs just as strongly in public leadership. At its core, it asks a simple question: are people actually experiencing the value a system claims to provide?",
      "That question changes the quality of leadership. It calls for clearer promises, less friction, stronger feedback loops, and a constant commitment to improvement. In governance, that translates into better communication, better service design, and more visible accountability.",
      "The same logic applies to public voice. A serious leadership platform should help people understand not only the vision being proposed, but also the structure, evidence, and discipline behind the work.",
    ],
  },
  {
    slug: "innovation-fellowship-youth-execution",
    title: "Innovation fellowship spotlights bold youth-led execution",
    summary:
      "A new fellowship approach is prioritizing visibility, structure, and real problem spaces for young builders ready to move from promise into practice.",
    category: "news",
    publishedAt: "March 8, 2026",
    updatedAt: "March 13, 2026",
    readTime: "4 min read",
    kicker: "Youth Innovation",
    shareCaption: "Young builders deserve structure, visibility, and serious support.",
    socialHook: "Young innovators need more than applause. They need structure and exposure.",
    platformCopy: {
      instagram: "Young innovators need more than applause. They need structure and exposure.",
      x: "Young builders move faster when visibility is matched with support, access, and execution structure.",
      linkedin:
        "Innovation fellowships should do more than celebrate potential. They should create clearer pathways to exposure, credibility, and practical execution.",
    },
    socialCardTemplate: "campaign",
    portraitImage: "/uploads/portraits/portrait-alt.jpg",
    portraitAlt: "Elly Okello portrait for youth innovation story",
    audience: "Founders, students, youth networks",
    tags: ["Youth", "Innovation", "Fellowship"],
    distributionChannels: ["Website", "WhatsApp", "Instagram Stories"],
    editorialStatus: "review",
    coverImage: "/uploads/posts/innovation-day-3.jpg",
    coverAlt: "Young innovators gathered during an innovation program event",
    body: [
      "There is no shortage of talent among young innovators. What is often missing is a stronger bridge between potential and visible execution. That bridge requires structure, exposure, and the kind of support that helps serious work gain public recognition.",
      "The fellowship model now taking shape is built around that need. Selected teams will not only receive attention; they will be connected to real problem spaces, sharper storytelling, and a more disciplined execution environment.",
      "That matters because the future of innovation will not be secured by applause alone. It will be shaped by whether promising builders are given the credibility, support, and visibility required to keep moving.",
    ],
  },
  {
    slug: "discipline-clarity-and-public-value",
    title: "Leadership with clarity, pace, and measurable public value",
    summary:
      "A short statement on disciplined execution, public dignity, and the kind of leadership that must be measured by real outcomes.",
    category: "desk",
    publishedAt: "March 16, 2026",
    updatedAt: "March 19, 2026",
    readTime: "3 min read",
    kicker: "From the Chairman's Desk",
    shareCaption: "Execution, dignity, and durable progress must move together.",
    socialHook: "Visibility matters less than substance, discipline, and real public value.",
    platformCopy: {
      instagram: "Visibility matters less than substance, discipline, and real public value.",
      x: "Durable public value comes from discipline, not performance.",
      linkedin:
        "Leadership should be measured by substance, disciplined execution, and the ability to create visible public value beyond symbolism.",
    },
    socialCardTemplate: "statement",
    portraitImage: "/uploads/media/me.jpg",
    portraitAlt: "Elly Okello portrait for Chairman statement",
    audience: "Public audience, stakeholders",
    tags: ["Statement", "Leadership", "Public Value"],
    distributionChannels: ["Website", "LinkedIn", "Press"],
    editorialStatus: "published",
    coverImage: "/uploads/media/style.jpg",
    coverAlt: "Editorial style portrait for Chairman statement",
    body: [
      "Leadership should never confuse visibility with value. Public life is filled with performance, but trust is built by something quieter and far more demanding: consistency, discipline, and the courage to be measured by outcomes rather than applause.",
      "In this season, the call is clear. We must move with urgency without losing standards, and we must communicate with confidence without sacrificing honesty. Public dignity is protected when leadership treats people with seriousness and responsibility with care.",
      "That is the standard this platform should reflect. Every statement, every project update, and every public message should point back to one principle: leadership must produce value that people can see, feel, and trust.",
    ],
  },
  {
    slug: "founders-breakfast-briefing",
    title: "Founders breakfast briefing sets sharper agenda for execution partnerships",
    summary:
      "A draft reflection on how founder communities and public institutions can build more credible partnerships around urgency, clarity, and follow-through.",
    category: "blog",
    publishedAt: "March 21, 2026",
    updatedAt: "March 19, 2026",
    readTime: "4 min read",
    kicker: "Draft Essay",
    shareCaption: "A stronger partnership agenda for builders and institutions.",
    socialHook: "The right rooms create the right momentum when they are designed for action.",
    platformCopy: {
      instagram: "The right rooms create the right momentum when they are designed for action.",
      x: "Partnership rooms only matter when they produce action, ownership, and follow-through.",
      linkedin:
        "Founder and institutional partnerships work best when they are structured for execution, not symbolism. The room itself should create momentum.",
    },
    socialCardTemplate: "campaign",
    portraitImage: "/uploads/media/elly.png",
    portraitAlt: "Cutout portrait for founders briefing cards",
    audience: "Founders, operators, policy partners",
    tags: ["Founders", "Partnerships", "Execution"],
    distributionChannels: ["Website", "LinkedIn", "Newsletter"],
    editorialStatus: "draft",
    scheduledFor: "2026-03-22T09:00",
    coverImage: "/uploads/posts/wordcamp.jpg",
    coverAlt: "Conference audience visual for founders briefing",
    body: [
      "The most useful partnership rooms are rarely the loudest. They are the spaces where ownership becomes clear, next steps become visible, and people leave with a sharper sense of what must happen after the conversation ends.",
      "That is the spirit behind this breakfast briefing reflection. It asks how founder communities and public institutions can build partnerships rooted not in symbolism, but in execution, responsibility, and measurable follow-through.",
      "If handled well, this kind of conversation can do more than produce a one-day event. It can shape a lasting agenda, stronger collaboration, and a clearer story for the communities watching from the outside.",
    ],
  },
];