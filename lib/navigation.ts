export type NavigationMenuKey = "about" | "media" | "insights";

export type NavigationChild = {
  label: string;
  href: string;
  description: string;
};

export type NavigationItem = {
  label: string;
  href: string;
  menu?: NavigationMenuKey;
};

export const dropdownMenus: Record<NavigationMenuKey, NavigationChild[]> = {
  about: [
    {
      label: "Leadership Journey",
      href: "/about/leadership-journey",
      description: "Background, direction, and the values shaping the platform.",
    },
    {
      label: "Media Kit",
      href: "/press-kit",
      description: "Approved profile details, assets, and community impact references.",
    },
  ],
  media: [
    {
      label: "Posts",
      href: "/media",
      description: "Public photos, visual posts, and branded cards in one feed.",
    },
    {
      label: "Chairman's Desk",
      href: "/chairmans-desk",
      description: "Official announcement cards and public statements.",
    },
    {
      label: "Videos",
      href: "/media/videos",
      description: "Video appearances, clips, and visual moments prepared for release.",
    },
  ],
  insights: [
    {
      label: "News",
      href: "/news",
      description: "Official updates, announcements, and current public communication.",
    },
    {
      label: "Articles",
      href: "/blog",
      description: "Long-form insight pieces, commentary, and thought leadership.",
    },
  ],
};

export const mainNavigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", menu: "about" },
  { label: "Vision", href: "/vision" },
  { label: "Media", href: "/media", menu: "media" },
  { label: "Insights", href: "/blog", menu: "insights" },
  { label: "Contact", href: "/contact" },
];

export const navigation = mainNavigation;
