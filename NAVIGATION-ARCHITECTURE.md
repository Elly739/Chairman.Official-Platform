# Navigation Architecture Diagram

## Component Hierarchy

```
SiteHeader (sticky, scroll-aware)
├── Logo & Branding
├── Desktop Navigation
│   ├── Link (Home)
│   ├── DropdownMenu (About)
│   │   ├── Link (Chairman's Desk)
│   │   ├── Link (Leadership Journey)
│   │   └── Link (Media Kit)
│   ├── Link (Vision)
│   ├── DropdownMenu (Media)
│   │   ├── Link (Posts)
│   │   ├── Link (Photos)
│   │   └── Link (Videos)
│   ├── DropdownMenu (Insights)
│   │   ├── Link (News)
│   │   └── Link (Articles)
│   └── Link (Contact)
├── Studio Button (desktop only)
└── MobileNav
    └── Hamburger Menu
        ├── Main Links
        │   ├── Home
        │   └── Vision
        │   └── Contact
        ├── Expandable Section (About)
        │   ├── Chairman's Desk
        │   ├── Leadership Journey
        │   └── Media Kit
        ├── Expandable Section (Media)
        │   ├── Posts
        │   ├── Photos
        │   └── Videos
        ├── Expandable Section (Insights)
        │   ├── News
        │   └── Articles
        └── Studio Button
```

---

## State Flow Diagram

```
User Action Flow:

DESKTOP:
─────────────────────────────────────────
1. User hovers over "About"
   └─> onMouseEnter → DropdownMenu state: isOpen = true
   └─> Dropdown renders below button

2. User moves mouse away
   └─> onMouseLeave or click-outside detected
   └─> DropdownMenu state: isOpen = false
   └─> Dropdown hides smoothly

3. User clicks dropdown item
   └─> Router.prefetch(href) called
   └─> Page transitions to new route
   └─> Active state updates (pathname comparison)


MOBILE:
─────────────────────────────────────────
1. User taps hamburger icon
   └─> MobileNav state: isOpen = true
   └─> Mobile menu overlay appears

2. User taps "About" section
   └─> MobileNav state: expandedSections['About'] = true
   └─> Chevron rotates 180°
   └─> Sub-items fade in (nested list)

3. User taps sub-item (e.g., "Chairman's Desk")
   └─> Navigation happens
   └─> MobileNav state: isOpen = false
   └─> Menu closes automatically
   └─> Page updates with active state


KEYBOARD (Desktop + Mobile):
─────────────────────────────────────────
1. User presses Tab
   └─> Focus moves through links
   └─> Visual focus indicator shown

2. User presses Escape (in dropdown)
   └─> DropdownMenu state: isOpen = false
   └─> Menu closes
   └─> Focus returns to trigger button

3. User presses Enter/Space
   └─> Navigation or toggle action triggered
   └─> Appropriate route/state change happens
```

---

## Data Structure Flow

```
lib/navigation.ts
│
├── mainNavigation (Const)
│   ├── { label: "Home", href: "/" }
│   ├── { label: "About", href: "/about", hasDropdown: true }
│   ├── { label: "Vision", href: "/chairmans-desk" }
│   ├── { label: "Media", href: "/media", hasDropdown: true }
│   ├── { label: "Insights", href: "/blog", hasDropdown: true }
│   └── { label: "Contact", href: "/contact" }
│
└── dropdownMenus (Const)
    ├── about: [
    │   { label: "Chairman's Desk", href: "/chairmans-desk", description: "..." },
    │   { label: "Leadership Journey", href: "/about", description: "..." },
    │   { label: "Media Kit", href: "/press-kit", description: "..." }
    │]
    ├── media: [
    │   { label: "Posts", href: "/news", description: "..." },
    │   { label: "Photos", href: "/media", description: "..." },
    │   { label: "Videos", href: "/media", description: "..." }
    │]
    └── insights: [
        { label: "News", href: "/news", description: "..." },
        { label: "Articles", href: "/blog", description: "..." }
    ]
        │
        ├─> Consumed by SiteHeader
        │   ├─> Maps mainNavigation for desktop
        │   ├─> Renders DropdownMenu for hasDropdown: true items
        │   ├─> Compares dropdownMenus[label.toLowerCase()] for active state
        │
        └─> Consumed by MobileNav
            ├─> Maps mainNavigation without dropdowns (main links)
            ├─> Maps mainNavigation with dropdowns (expandable sections)
            ├─> Uses dropdownMenus to render nested items
            └─> Manages expandedSections state
```

---

## Rendering Tree (Desktop - Expanded)

```
┌─ SiteHeader (sticky top-6 z-50)
│  ├─ Logo/Brand (rounded-full with EO avatar)
│  │
│  ├─ Desktop Nav (hidden md:flex xl:flex)
│  │  ├─ Link "Home" ────────────────────── Active: pathname === "/"
│  │  │
│  │  ├─ DropdownMenu "About" (isOpen)
│  │  │  ├─ Header Button "About" (text-blue-600 with chevron)
│  │  │  └─ Dropdown Panel (w-56 bg-white/95 rounded-lg)
│  │  │     ├─ Link "Chairman's Desk" ─── Active: pathname === "/chairmans-desk"
│  │  │     ├─ Link "Leadership Journey" ─ Active: pathname === "/about"
│  │  │     └─ Link "Media Kit" ────────── Active: pathname === "/press-kit"
│  │  │
│  │  ├─ Link "Vision" ───────────────────  Active: pathname === "/chairmans-desk"
│  │  │
│  │  ├─ DropdownMenu "Media" (isOpen: false)
│  │  │  └─ Hidden (will show on hover)
│  │  │
│  │  ├─ DropdownMenu "Insights" (isOpen: false)
│  │  │  └─ Hidden (will show on hover)
│  │  │
│  │  └─ Link "Contact" ─────────────────── Active: pathname === "/contact"
│  │
│  ├─ Studio Button (hidden sm:inline-flex)
│  │  └─ Link "/studio/login"
│  │
│  └─ MobileNav (hidden xl:inline) ──────── Hidden on desktop
│     └─ Hamburger Button (invisible on desktop)
│
└─ [Backdrop: z-40] ────────────────────── Only visible on mobile when menu open
```

---

## CSS Classes Application

```
Desktop Navigation Item (active):
┌─────────────────────────────────────────────┐
│ text-[var(--color-brand)]                   │ ← Active text color
│ font-medium text-sm                         │ ← Typography
│ hover:text-[var(--color-brand)]             │ ← Hover state
│ transition-all duration-200                 │ ← Smooth animation
└─────────────────────────────────────────────┘

Dropdown Button:
┌─────────────────────────────────────────────┐
│ flex items-center gap-1.5                   │ ← Flex layout
│ text-sm font-medium                         │ ← Typography
│ text-[var(--color-muted)] hover:text-[...] │ ← Colors
│ transition-all duration-200                 │ ← Smooth transition
└─────────────────────────────────────────────┘

Dropdown Panel:
┌─────────────────────────────────────────────┐
│ absolute right-0 top-full mt-3              │ ← Positioning
│ w-56 rounded-lg border                      │ ← Size & border
│ bg-white/95 backdrop-blur-sm                │ ← Glass morphism
│ shadow-xl                                   │ ← Depth
│ transition-all                              │ ← Smooth show/hide
└─────────────────────────────────────────────┘

Mobile Menu Item (expanded):
┌─────────────────────────────────────────────┐
│ w-full flex items-center justify-between    │ ← Full width layout
│ rounded-lg px-4 py-3                        │ ← Spacing & radius
│ text-sm font-medium                         │ ← Typography
│ bg-[var(--color-soft)] text-[var(...)]     │ ← Expanded state colors
│ transition-colors                           │ ← Smooth color change
└─────────────────────────────────────────────┘
```

---

## Accessibility Tree

```
<header role="banner">
  ├─ <a href="/" aria-label="Home">
  │  └─ Logo (EO)
  │
  ├─ <nav role="navigation" aria-label="Main navigation">
  │  ├─ <a href="/">Home</a> [aria-current="page"]
  │  │
  │  ├─ <div role="group">
  │  │  ├─ <button aria-expanded="true" aria-haspopup="true">About</button>
  │  │  └─ <div role="menu" aria-label="About menu">
  │  │     ├─ <a role="menuitem" href="/chairmans-desk">Chairman's Desk</a>
  │  │     ├─ <a role="menuitem" href="/about">Leadership Journey</a>
  │  │     └─ <a role="menuitem" href="/press-kit">Media Kit</a>
  │  │
  │  ├─ <a href="/chairmans-desk">Vision</a>
  │  └─ ... more items ...
  │
  ├─ <a href="/studio/login">Studio</a>
  │
  └─ <button aria-label="Toggle navigation" aria-expanded="false">
     ☰ (hamburger icon - mobile only)
```

---

## Performance Metrics

```
Component Rendering:
────────────────────────────────────────
SiteHeader:
  └─ Renders on: pathname change, scroll event, dropdown state
  └─ Re-render optimization: Active state comparison cached

DropdownMenu:
  └─ Renders on: hover (desktop), click (mobile)
  └─ Re-render optimization: Only re-renders when isOpen changes

MobileNav:
  └─ Renders on: isOpen state, expandedSections changes
  └─ Re-render optimization: Expandable sections memoized


Prefetching Strategy:
────────────────────────────────────────
Desktop:
  └─ onMouseEnter → router.prefetch(href)
  └─ Link prefetch={true} → automatic prefetch

Mobile:
  └─ onClick → router.prefetch(href)
  └─ Navigation triggered after prefetch

Result:
  └─ Near-instant page transitions
  └─ Reduced perceived latency
```

---

## Scroll Detection Flow

```
User scrolls down page (Y > 10px)
    │
    ├─> Scroll listener triggered
    │
    ├─> setIsScrolled(true)
    │
    ├─> Header className updated
    │
    └─> Background opacity increases (smooth transition)
        From: bg-white/90
        To:   bg-white/95 shadow-md
        Duration: transition-all duration-300

Result:
└─ Subtle visual enhancement
└─ Draws attention to navigation
└─ Professional polish
└─ No performance impact
```

---

## Responsive Breakpoints

```
MOBILE (<1024px / <xl)
──────────────────────────────────────
Desktop Nav:  HIDDEN
Mobile Menu:  VISIBLE (hamburger button)
Studio Link:  HIDDEN
Layout:       Single column, full width
Menu:         Full-screen overlay
Touch:        All targets ≥48px

TABLET (768px - 1024px / md to lg)
──────────────────────────────────────
Desktop Nav:  HIDDEN
Mobile Menu:  VISIBLE (adjusting for larger screen)
Studio Link:  HIDDEN
Layout:       Multi-column, responsive
Menu:         Full-screen overlay
Touch:        All targets ≥48px

DESKTOP (≥1024px / ≥xl)
──────────────────────────────────────
Desktop Nav:  VISIBLE (flex layout)
Mobile Menu:  HIDDEN
Studio Link:  VISIBLE (inline)
Layout:       Full horizontal layout
Dropdowns:    Hover to open
Keyboard:     Tab, Enter, Escape support

LARGE DESKTOP (≥1536px / ≥2xl)
──────────────────────────────────────
Gaps:         Increase (gap-5 → gap-7)
Padding:      Increase (px-5 → px-6)
Spacing:      Generous whitespace
All other:    Same as desktop
```
