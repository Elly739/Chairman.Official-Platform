# 🗺️ Navigation System - Complete Reference

## Table of Contents

1. **[Quick Start](#quick-start)** - Get up and running fast
2. **[Navigation Structure](#navigation-structure)** - Current hierarchy
3. **[Components](#components)** - How each piece works
4. **[Customization](#customization)** - Adding/removing items
5. **[Accessibility](#accessibility)** - WCAG compliance
6. **[Best Practices](#best-practices)** - Patterns to follow
7. **[Troubleshooting](#troubleshooting)** - Common issues
8. **[Files Reference](#files-reference)** - Where things live

---

## Quick Start

### View Current Navigation

```bash
# All navigation configuration lives here:
cat lib/navigation.ts
```

### Add a New Item

**Example 1: Add to Top-Level Navigation**
```typescript
// lib/navigation.ts
export const mainNavigation = [
  // ... existing items ...
  { label: "Tools", href: "/tools" }, // ← Add new item
] as const;
```

**Example 2: Add to Existing Dropdown**
```typescript
// lib/navigation.ts
export const dropdownMenus = {
  about: [
    // ... existing items ...
    { label: "Our Team", href: "/about/team", description: "Meet the team" }, // ← Add new item
  ],
  // ... other dropdowns ...
} as const;
```

**Example 3: Create New Dropdown Section**
```typescript
// lib/navigation.ts

// 1. Add to main navigation with hasDropdown flag
export const mainNavigation = [
  // ... existing items ...
  { label: "Resources", href: "/resources", hasDropdown: true }, // ← New section
] as const;

// 2. Add corresponding dropdown menu
export const dropdownMenus = {
  // ... existing menus ...
  resources: [
    { label: "Blog", href: "/blog", description: "Read our blog" },
    { label: "FAQ", href: "/faq", description: "Common questions" },
    { label: "Downloads", href: "/downloads", description: "Download resources" },
  ],
} as const;
```

Done! Both desktop and mobile menus auto-update.

---

## Navigation Structure

### Current Hierarchy

```
MAIN NAVIGATION (6 items - Always Visible)
├── Home
├── About ▼ (Dropdown)
│   ├── Chairman's Desk
│   ├── Leadership Journey
│   └── Media Kit
├── Vision
├── Media ▼ (Dropdown)
│   ├── Posts
│   ├── Photos
│   └── Videos
├── Insights ▼ (Dropdown)
│   ├── News
│   └── Articles
└── Contact

HIDDEN NAVIGATION
└── Studio (Private route: /studio/login)
```

### URLs Mapping

| Display | Route | Category |
|---------|-------|----------|
| Home | `/` | Main |
| About | `/about` | Main (Parent) |
| → Chairman's Desk | `/chairmans-desk` | Dropdown |
| → Leadership Journey | `/about` | Dropdown |
| → Media Kit | `/press-kit` | Dropdown |
| Vision | `/chairmans-desk` | Main |
| Media | `/media` | Main (Parent) |
| → Posts | `/news` | Dropdown |
| → Photos | `/media` | Dropdown |
| → Videos | `/media` | Dropdown |
| Insights | `/blog` | Main (Parent) |
| → News | `/news` | Dropdown |
| → Articles | `/blog` | Dropdown |
| Contact | `/contact` | Main |
| Studio | `/studio/login` | Private |

---

## Components

### SiteHeader

**Location:** `app/components/site-header.tsx`

**Purpose:** Main navigation bar (sticky, responsive)

**Props:**
```typescript
type SiteHeaderProps = {
  invert?: boolean; // Light theme for dark backgrounds
};
```

**Features:**
- Sticky positioning (top: 24px, z-index: 50)
- Scroll detection (subtle background enhancement)
- Desktop dropdown menus
- Mobile hamburger menu
- Active link highlighting
- Logo and branding

**Usage:**
```tsx
import { SiteHeader } from "@/app/components/site-header";

export default function Layout() {
  return (
    <>
      <SiteHeader invert={false} />
      {/* Page content */}
    </>
  );
}
```

### DropdownMenu

**Location:** `app/components/dropdown-menu.tsx`

**Purpose:** Reusable dropdown component for desktop navigation

**Props:**
```typescript
interface DropdownMenuProps {
  label: string;        // Button text (e.g., "About")
  items: DropdownItem[]; // Menu items with href, description
  invert?: boolean;     // Light theme
  isActive?: boolean;   // Highlight if any child is active
}

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}
```

**Features:**
- Hover/click to open
- Keyboard navigation (Escape to close)
- Click-outside detection
- ARIA compliant
- Smooth animations
- Item descriptions

**Usage:**
```tsx
import { DropdownMenu } from "@/app/components/dropdown-menu";
import { dropdownMenus } from "@/lib/navigation";

<DropdownMenu 
  label="About"
  items={dropdownMenus.about}
  isActive={isAboutPageActive}
/>
```

### MobileNav

**Location:** `app/components/mobile-nav.tsx`

**Purpose:** Mobile navigation with expandable sections

**Props:**
```typescript
type MobileNavProps = {
  invert?: boolean; // Light theme
};
```

**Features:**
- Hamburger button (hidden on desktop)
- Full-screen overlay menu
- Expandable dropdown sections
- Nested item display
- Touch-friendly spacing
- Auto-closes on navigation

**Usage:**
```tsx
import { MobileNav } from "@/app/components/mobile-nav";

<MobileNav invert={false} />
```

### Navigation Config

**Location:** `lib/navigation.ts`

**Exports:**
```typescript
// Main navigation items (use this!)
export const mainNavigation = [...]

// Dropdown menus organization
export const dropdownMenus = { ... }

// Legacy (backwards compatibility)
export const navigation = mainNavigation
```

---

## Customization

### Adding a New Top-Level Item

```typescript
// lib/navigation.ts
export const mainNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", hasDropdown: true },
  // ... existing items ...
  
  // Add new item here:
  { 
    label: "Tools",           // Display text
    href: "/tools",           // URL path
    hasDropdown: false        // Optional (defaults to false)
  },
] as const;
```

### Adding a Dropdown Item

```typescript
// lib/navigation.ts
export const dropdownMenus = {
  about: [
    { label: "Chairman's Desk", href: "/chairmans-desk", description: "..." },
    // ... existing items ...
    
    // Add new item here:
    {
      label: "Advisory Board",
      href: "/about/advisors",
      description: "Meet our advisors and partners"
    },
  ],
  // ... other dropdowns ...
} as const;
```

### Creating a New Dropdown Section

```typescript
// lib/navigation.ts

// Step 1: Add to main navigation
export const mainNavigation = [
  // ... existing items ...
  {
    label: "Learn",
    href: "/learn",
    hasDropdown: true  // ← Important!
  },
] as const;

// Step 2: Add corresponding dropdown
export const dropdownMenus = {
  // ... existing menus ...
  learn: [
    {
      label: "Courses",
      href: "/learn/courses",
      description: "Online learning platform"
    },
    {
      label: "Webinars",
      href: "/learn/webinars",
      description: "Live training sessions"
    },
    {
      label: "Resources",
      href: "/learn/resources",
      description: "Downloads and guides"
    },
  ],
} as const;
```

### Removing Items

```typescript
// lib/navigation.ts

// To remove from main nav:
export const mainNavigation = [
  // Just delete the item you don't want
  { label: "Home", href: "/" },
  { label: "About", href: "/about", hasDropdown: true },
  // { label: "Vision", href: "/chairmans-desk" }, ← Removed
] as const;

// To remove from dropdown:
export const dropdownMenus = {
  about: [
    { label: "Chairman's Desk", href: "/chairmans-desk", description: "..." },
    // { label: "Leadership Journey", href: "/about", description: "..." }, ← Removed
  ],
} as const;
```

### Renaming Items

```typescript
// lib/navigation.ts

export const mainNavigation = [
  // ...
  { 
    label: "News & Updates",  // Changed from "Insights"
    href: "/blog", 
    hasDropdown: true 
  },
] as const;
```

### Changing URLs

```typescript
// lib/navigation.ts

export const mainNavigation = [
  // ...
  { 
    label: "About", 
    href: "/about-me",  // Changed from "/about"
    hasDropdown: true 
  },
] as const;
```

---

## Accessibility

### WCAG 2.1 Level AA Compliance

✅ **Semantic HTML**
```html
<nav role="navigation" aria-label="Main navigation">
  <button aria-expanded="false" aria-haspopup="true">About</button>
  <div role="menu" aria-label="About menu">
    <a role="menuitem">Chairman's Desk</a>
  </div>
</nav>
```

✅ **Keyboard Navigation**
- `Tab` - Navigate through items
- `Enter/Space` - Open dropdown or follow link
- `Escape` - Close dropdown
- Arrow Keys - (Future enhancement)

✅ **Screen Reader Support**
- All buttons have `aria-label` or text content
- Dropdowns announced with `aria-expanded`
- Current page indicated with `aria-current="page"`
- Menu structure clear with ARIA roles

✅ **Color Contrast**
- Text ratios meet WCAG AA standards (4.5:1 minimum)
- Focus indicators clearly visible
- No color-only information

✅ **Touch Targets**
- All interactive elements ≥48px minimum
- Adequate spacing between targets
- Mobile-optimized tap zones

### Testing Keyboard Navigation

```
Desktop:
1. Press Tab to move through nav items
2. Press Enter/Space on "About" button
3. Dropdown should open
4. Press Escape to close
5. Tab should move to next item

Mobile:
1. Press Tab to reach hamburger button
2. Press Enter/Space to open menu
3. Tab through menu items
4. Press Enter/Space on expandable section
5. Items should expand
6. Press Escape to close entire menu
```

### Testing Screen Reader

```
NVDA (Windows) / JAWS:
1. Navigate to nav area
2. Should announce "navigation region: main navigation"
3. Should announce each button with aria-label
4. When dropdown opens, should announce "menu popup"
5. Each menu item announced as "menu item"

VoiceOver (Mac):
1. Use VO + Right Arrow to navigate
2. Should announce nav role and label
3. When on button: "button, has popup menu, collapsed"
4. After opening: "button, has popup menu, expanded"
5. Menu items announced as "menu items"
```

---

## Best Practices

### DO ✅

- Keep main navigation items to 5-7 items (reduces cognitive load)
- Use clear, descriptive labels ("Blog" not "Posts")
- Add descriptions to dropdown items (helps users)
- Keep dropdown menus to 3-6 items each
- Test on real devices (mobile, tablet, desktop)
- Use consistent terminology across site
- Keep URLs lowercase and simple
- Update navigation config, not components

### DON'T ❌

- Don't create more than 3-4 dropdown sections
- Don't nest dropdowns within dropdowns (megamenus)
- Don't change component files to add items (use config)
- Don't use vague labels ("Other", "More")
- Don't duplicate items across dropdowns
- Don't put rarely-used items in main nav
- Don't forget to update both mainNavigation and dropdownMenus
- Don't hardcode navigation in components

### Naming Conventions

```typescript
// Good names:
{ label: "Blog", ... }           // Clear
{ label: "Case Studies", ... }   // Descriptive
{ label: "Download Resources", ... } // Action-oriented

// Avoid:
{ label: "More", ... }           // Vague
{ label: "Stuff", ... }          // Unclear
{ label: "...", ... }            // Cryptic
{ label: "Go to News", ... }     // Redundant with link
```

### Description Guidelines

```typescript
// Good descriptions:
{ 
  label: "Blog", 
  href: "/blog",
  description: "Articles, thoughts, and insights"
}

// Avoid:
{ 
  label: "Blog", 
  href: "/blog",
  description: "Blog page"  // Redundant with label
}

{ 
  label: "Blog", 
  href: "/blog"
  // No description needed for simple items
}
```

---

## Troubleshooting

### Items Not Showing Up

**Problem:** Added item to navigation, but it doesn't appear

**Solution:**
1. Check spelling in `mainNavigation` or `dropdownMenus`
2. Verify you're using the correct export (`mainNavigation`, not `navigation`)
3. Ensure `hasDropdown: true` if it should be a dropdown parent
4. Clear browser cache and rebuild

```bash
npm run build
```

### Dropdown Not Opening

**Problem:** Dropdown button exists but menu doesn't open on click

**Solution:**
1. Check if `DropdownMenu` is correctly imported
2. Verify `items` prop is being passed correctly
3. Check browser console for errors
4. Ensure you're passing correct dropdown key:
   ```typescript
   // WRONG: lowercase of label
   const dropdownKey = item.label; // ❌ "About" != "about"
   
   // RIGHT: convert to lowercase
   const dropdownKey = item.label.toLowerCase(); // ✅ "about"
   ```

### Mobile Menu Not Showing Dropdowns

**Problem:** Mobile menu shows main items but dropdowns aren't expandable

**Solution:**
1. Check if `MobileNav` has latest code (expandable sections)
2. Verify `expandedSections` state is being used
3. Check if dropdown items are in `dropdownMenus` object
4. Ensure `hasDropdown: true` is set on parent items

### Active State Not Highlighting

**Problem:** Current page isn't highlighted in navigation

**Solution:**
1. Check if pathname matches exactly:
   ```typescript
   // Debug
   console.log("Current pathname:", pathname);
   console.log("Link href:", item.href);
   console.log("Match?", pathname === item.href);
   ```
2. Dropdowns should highlight if ANY child is active:
   ```typescript
   const isDropdownActive = (items) =>
     items.some((item) => pathname === item.href);
   ```
3. Ensure you're using `usePathname()` from Next.js

### Mobile Menu Closes Too Quickly

**Problem:** Menu closes immediately after clicking item

**Solution:**
This is intentional! `MobileNav` calls:
```typescript
const handleNavClick = (href: string) => {
  setIsOpen(false);  // ← Closes immediately
  router.prefetch(href);
};
```

To change this behavior, edit `mobile-nav.tsx`:
```typescript
// To keep menu open:
const handleNavClick = (href: string) => {
  // Remove: setIsOpen(false);
  router.prefetch(href);
};
```

### Scroll Detection Not Working

**Problem:** Header background doesn't change on scroll

**Solution:**
1. Check if `isScrolled` state is being used in className:
   ```typescript
   className={`${isScrolled ? "bg-white/95" : "bg-white/90"}`}
   ```
2. Verify scroll listener is attached:
   ```typescript
   useEffect(() => {
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
   ```
3. Check if header is sticky:
   ```typescript
   className="sticky top-6"  // ← Must be sticky
   ```

---

## Files Reference

### Configuration
- **`lib/navigation.ts`** - Navigation structure and data
  - `mainNavigation` - Top-level items
  - `dropdownMenus` - Dropdown content
  - `navigation` - Legacy export

### Components
- **`app/components/site-header.tsx`** - Main header (sticky)
  - Handles desktop/mobile routing
  - Scroll detection
  - Active state logic
  
- **`app/components/dropdown-menu.tsx`** - Reusable dropdown
  - Desktop hover/click support
  - Keyboard navigation
  - ARIA attributes
  
- **`app/components/mobile-nav.tsx`** - Mobile menu
  - Hamburger button
  - Expandable sections
  - Touch-friendly

### Documentation
- **`NAVIGATION.md`** - Architecture guide
- **`NAVIGATION-IMPLEMENTATION.md`** - Implementation summary
- **`NAVIGATION-SUMMARY.md`** - Executive summary
- **`NAVIGATION-ARCHITECTURE.md`** - Detailed diagrams
- **`NAVIGATION-CODE-COMPARISON.md`** - Before/after code
- **`NAVIGATION-README.md`** - This file

---

## Quick Reference

### View Navigation Config
```bash
cat lib/navigation.ts
```

### Edit Navigation
```bash
# Edit configuration file
nano lib/navigation.ts
# or use VS Code
code lib/navigation.ts
```

### Test Changes
```bash
# Rebuild to catch TypeScript errors
npm run build

# Start dev server
npm run dev

# Open in browser
# http://localhost:3000
```

### Check Accessibility
```bash
# Use browser DevTools
# 1. Open DevTools (F12)
# 2. Go to Accessibility Tree
# 3. Expand nav elements
# 4. Verify ARIA attributes
```

---

## Need Help?

### Common Questions

**Q: How do I add a new section?**  
A: Add to `mainNavigation` with `hasDropdown: true`, then create corresponding `dropdownMenus` entry.

**Q: Can I have nested dropdowns (3+ levels)?**  
A: Not currently. Keep to 2-level hierarchy for UX clarity.

**Q: How do I hide items from certain users?**  
A: Use Next.js middleware to conditionally show items based on authentication.

**Q: Can I add icons to nav items?**  
A: Yes! Add optional `icon` property to items and render in components.

**Q: How do I track navigation analytics?**  
A: Add onClick handler that triggers analytics event tracking.

---

**Version:** 1.0  
**Last Updated:** May 4, 2026  
**Status:** ✅ Production Ready
