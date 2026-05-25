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
    slug: "unified-create-flow-introduced",
    title: "Chairman.Official introduces unified Create flow across all content types",
    summary:
      "The Studio now routes public posts, posters, insights, news, and site updates through a clearer creation structure with fewer duplicate entry points.",
    category: "news",
    publishedAt: "May 25, 2026",
    updatedAt: "May 25, 2026",
    readTime: "2 min read",
    kicker: "Announcement",
    shareCaption: "Chairman.Official now has a clearer creation flow across public content types.",
    socialHook: "A unified Create flow is now live inside Chairman.Official Studio.",
    platformCopy: {
      instagram: "A unified Create flow is now live inside Chairman.Official Studio.",
      x: "Chairman.Official now routes content creation through a clearer, simpler Studio flow.",
      linkedin:
        "Chairman.Official Studio now uses a unified creation structure that reduces duplicate entry points and makes publishing easier to understand.",
    },
    socialCardTemplate: "portrait",
    portraitImage: "/uploads/portraits/portrait-main.png",
    portraitAlt: "Elly Okello portrait for official platform announcement",
    audience: "Public audience, media, supporters",
    tags: ["Announcement", "News", "Official"],
    distributionChannels: ["Website", "WhatsApp", "Instagram", "LinkedIn"],
    editorialStatus: "published",
    featured: true,
    coverImage: "/uploads/portraits/portrait-main.png",
    coverAlt: "Official portrait used for Chairman.Official announcement card",
    body: [
      "Chairman.Official has introduced a unified Create flow across the Studio so public posts, posters, insights, news updates, and site-page work are easier to begin from the right place.",
      "The update removes duplicate entry points and gives each content type a clearer publishing path. Posts now start in Posts, Insights use a simple article-first editor, and News is organized around official cards with captions.",
      "This change is part of a broader effort to make the platform easier to operate while keeping public communication structured, polished, and consistent.",
    ],
  },
  {
    slug: "release-1-2-0-studio-publishing-refinement",
    title: "Version 1.2.0 refines Studio publishing and announcement cards",
    summary:
      "The latest Studio release simplifies content creation, moves announcement cards into News, and removes old duplicated editor paths.",
    category: "news",
    publishedAt: "May 25, 2026",
    updatedAt: "May 25, 2026",
    readTime: "2 min read",
    kicker: "Release Notes",
    shareCaption: "Version 1.2.0 brings a cleaner Studio publishing structure.",
    socialHook: "Studio publishing is now cleaner, simpler, and more clearly separated.",
    platformCopy: {
      instagram: "Version 1.2.0 brings a cleaner Studio publishing structure.",
      x: "Version 1.2.0 simplifies Studio publishing and moves announcement cards into News.",
      linkedin:
        "Chairman.Official Studio version 1.2.0 refines publishing by simplifying creation paths, improving Insights, and making News the home for official announcement cards.",
    },
    socialCardTemplate: "campaign",
    portraitImage: "/uploads/portraits/portrait-main.png",
    portraitAlt: "Elly Okello portrait for release notes card",
    audience: "Public audience, media, supporters",
    tags: ["Product Update", "Release Notes", "Official"],
    distributionChannels: ["Website", "WhatsApp", "Instagram", "LinkedIn"],
    editorialStatus: "published",
    coverImage: "/uploads/media/style.jpg",
    coverAlt: "Editorial portrait used for Studio release notes card",
    body: [
      "Version 1.2.0 is focused on making the Studio easier to use and easier to understand.",
      "- Unified Create system introduced\n- Insight editor simplified around article body and cover image\n- Announcement cards moved into the News workflow\n- Duplicate Create entry points removed",
      "These refinements make the platform feel less like a set of disconnected editors and more like a structured publishing system.",
    ],
  },
  {
    slug: "elly-birthday-scheduled-drop",
    title: "Elly to celebrate his birthday on 16 June",
    summary:
      "A scheduled Chairman.Official birthday drop is being prepared for 16 June with a dedicated card and public caption.",
    category: "news",
    publishedAt: "May 25, 2026",
    updatedAt: "May 25, 2026",
    readTime: "1 min read",
    kicker: "Scheduled Drop",
    shareCaption: "A birthday card and public update are scheduled for 16 June.",
    socialHook: "A Chairman.Official birthday drop is scheduled for 16 June.",
    platformCopy: {
      instagram: "A Chairman.Official birthday drop is scheduled for 16 June.",
      x: "Elly's birthday update is scheduled for 16 June.",
      linkedin: "A birthday card and public update are being prepared as a scheduled Chairman.Official drop for 16 June.",
    },
    socialCardTemplate: "portrait",
    portraitImage: "/uploads/portraits/Hero.png",
    portraitAlt: "Elly Okello portrait for birthday scheduled drop",
    audience: "Public audience, supporters",
    tags: ["Event", "Scheduled Drop", "Official"],
    distributionChannels: ["Website", "Instagram", "WhatsApp"],
    editorialStatus: "published",
    coverImage: "/uploads/portraits/Hero.png",
    coverAlt: "Portrait card image for birthday scheduled drop",
    body: [
      "A birthday card and public update for Elly is being prepared for 16 June as part of the Chairman.Official scheduled drops.",
      "The update will use the News layer because it is time-based, public-facing, and better handled as an official card with a caption rather than a regular post.",
      "Scheduled for 16 June.",
    ],
  },
  {
    slug: "official-statement-news-direction",
    title: "News section repositioned as the official voice layer",
    summary:
      "The News section is being repositioned for announcements, release notes, scheduled drops, and official statements instead of regular posts.",
    category: "news",
    publishedAt: "May 25, 2026",
    updatedAt: "May 25, 2026",
    readTime: "2 min read",
    kicker: "Official Statement",
    shareCaption: "News now carries the official voice of Chairman.Official.",
    socialHook: "News is now the official voice layer of Chairman.Official.",
    platformCopy: {
      instagram: "News is now the official voice layer of Chairman.Official.",
      x: "News now carries official announcements, release notes, scheduled drops, and statements.",
      linkedin:
        "Chairman.Official News is being repositioned as the official voice layer for announcements, release notes, scheduled drops, and public statements.",
    },
    socialCardTemplate: "statement",
    portraitImage: "/uploads/media/me.jpg",
    portraitAlt: "Elly Okello portrait for official statement",
    audience: "Public audience, media, supporters",
    tags: ["Statement", "Official Statement", "Official"],
    distributionChannels: ["Website", "LinkedIn", "WhatsApp"],
    editorialStatus: "published",
    coverImage: "/uploads/media/me.jpg",
    coverAlt: "Official statement card image",
    body: [
      "The News section is being repositioned as the official voice layer of Chairman.Official.",
      "That means it should carry announcements, release notes, scheduled drops, and official statements. Regular photos belong in Posts, long-form thinking belongs in Insights, and ceremonial cards should be treated according to their publishing purpose.",
      "This separation keeps the platform clearer for both the people publishing and the people reading.",
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
    kicker: "Insight Essay",
    shareCaption: "Public leadership works best when ideas are designed with people in mind.",
    socialHook: "Better governance often starts with better design thinking.",
    platformCopy: {
      instagram: "Better governance often starts with better design thinking.",
      x: "Public leadership improves when ideas are designed around people, clarity, and measurable outcomes.",
      linkedin:
        "Product thinking gives public leadership a practical framework for better communication, sharper service design, and more accountable execution.",
    },
    socialCardTemplate: "statement",
    portraitImage: "/uploads/portraits/portrait-main.png",
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
    kicker: "Draft Insight",
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
