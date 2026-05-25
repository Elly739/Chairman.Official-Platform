# Chairman's Office Platform

A modern web platform built with [Next.js](https://nextjs.org) for managing and showcasing leadership content, media, and community engagement.

**Live Demo:** [https://chairman-official-platform.vercel.app/](https://chairman-official-platform.vercel.app/)

## Project Overview

The Chairman's Office Platform is a comprehensive digital presence solution featuring:

- **Content Management**: Blog posts, news, chairman's desk announcements, and projects
- **Media Hub**: Videos, media feeds, and engagement analytics
- **Studio**: Comprehensive content creation and management interface
- **Event Management**: Event cards with visual previews and social media integration
- **Leadership Showcase**: About page, leadership journey, and vision statements
- **Press Kit**: Media resources and downloadable materials
- **Newsletter**: Subscriber management and campaign tools
- **Social Integration**: Share actions, social cards, and media engagement tracking

## Tech Stack

- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: CSS with Tailwind support
- **Build Tool**: Next.js built-in compiler
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Elly739/Chairman.Official-Platform.git
cd Chairman.Official-Platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
app/
├── components/        # Reusable React components
├── studio/           # Content management interface
├── api/              # API routes
├── blog/             # Blog pages
├── chairmans-desk/   # Chairman's desk content
├── media/            # Media hub
├── news/             # News pages
├── projects/         # Projects showcase
├── contact/          # Contact page
├── about/            # About and leadership pages
├── vision/           # Vision content
├── press-kit/        # Press resources
└── public-actions.ts # Public action utilities

lib/
├── content-store.ts  # Content data management
├── media-engagement-store.ts  # Media analytics
├── audience-store.ts # Audience management
├── event-card-*.ts   # Event card utilities
└── studio-auth.ts    # Authentication

content/
├── posts.ts          # Blog content
├── projects.ts       # Project data
├── media.ts          # Media content
└── poster-designs.ts # Poster templates
```

## Studio Features

The platform includes a comprehensive Studio with:

- **Post Editor**: Create and manage blog posts with visual previews
- **Media Manager**: Upload and organize media content
- **Event Card Creator**: Design event announcements with custom visuals
- **Social Card Generator**: Create shareable social media cards
- **Publishing Checklist**: Ensure content quality before publishing
- **Audience Analytics**: Track engagement and audience metrics
- **Content Library**: Browse and manage all published content

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The application is deployed on [Vercel](https://vercel.com) and automatically deployed from the `main` branch.

To deploy your own instance:

1. Push changes to the `main` branch
2. Vercel automatically builds and deploys
3. View deployment status at [https://chairman-official-platform.vercel.app/](https://chairman-official-platform.vercel.app/)

## Documentation

- [Navigation Architecture](./NAVIGATION-ARCHITECTURE.md) - Site structure and routing
- [Phase 3 Completion](./PHASE-3-COMPLETION.md) - Project milestones
- [Navigation Implementation](./NAVIGATION-IMPLEMENTATION.md) - Implementation details
- [Final Checklist](./FINAL-CHECKLIST.md) - Feature completeness

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Test locally with `npm run dev`
4. Commit with clear, descriptive messages
5. Push to your branch
6. Create a pull request

## License

All rights reserved. © Chairman's Office Platform

## Support

For issues or questions, please create an issue in the repository or contact the development team.
