export type ProjectEditorialStatus = "backlog" | "active" | "ready";

export type Project = {
  slug: string;
  name: string;
  status: string;
  timeline: string;
  summary: string;
  impact: string;
  highlights: string[];
  owner: string;
  editorialStatus: ProjectEditorialStatus;
  nextUpdate: string;
  repoUrl?: string;
  coverImage?: string;
  coverAlt?: string;
};

export const projects: Project[] = [
  {
    slug: "portfolio",
    name: "Portfolio",
    status: "Published Repository",
    timeline: "Live showcase",
    summary:
      "A modern, responsive portfolio website showcasing software engineering work, innovation, and a strong personal digital presence.",
    impact:
      "The portfolio project acts as a polished public entry point, bringing together proof of work, services, experience, and contact pathways in one place that is easy for collaborators, recruiters, and partners to review.",
    highlights: [
      "Modern responsive interface with dark and light theme support",
      "Combines work samples, services, testimonials, and contact flow",
      "Strengthens public credibility through a refined personal web presence",
    ],
    owner: "Elly Okello",
    editorialStatus: "ready",
    nextUpdate: "April 30, 2026",
    repoUrl: "https://github.com/Elly739/Portfolio",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for Portfolio",
  },
  {
    slug: "smartwaste-ke",
    name: "Smartwaste.ke",
    status: "Active Build",
    timeline: "Ongoing development",
    summary:
      "A digital waste collection and tracking system powered by youth, technology, and a circular economy model.",
    impact:
      "Smartwaste.ke connects civic technology to environmental action by making waste pickup, recycling incentives, and operational visibility more practical, measurable, and easier to coordinate in real time.",
    highlights: [
      "Real-time waste pickup and tracking direction",
      "Built around youth participation and circular economy thinking",
      "Strong civic-tech flagship for public value and sustainability storytelling",
    ],
    owner: "Elly Okello",
    editorialStatus: "ready",
    nextUpdate: "April 30, 2026",
    repoUrl: "https://github.com/Elly739/Smartwaste.ke",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for Smartwaste.ke",
  },
  {
    slug: "learnlight",
    name: "learnlight",
    status: "Prototype",
    timeline: "Learning platform in progress",
    summary:
      "A full-stack learning platform with an Express and PostgreSQL backend and a Vite plus React frontend.",
    impact:
      "learnlight expands the platform into education technology by focusing on how learners access content, interact with a structured product experience, and move through a more modern digital learning flow.",
    highlights: [
      "Full-stack architecture spanning backend and frontend",
      "Built for structured learning delivery and platform growth",
      "Shows execution beyond static websites into product systems",
    ],
    owner: "Elly Okello",
    editorialStatus: "active",
    nextUpdate: "April 30, 2026",
    repoUrl: "https://github.com/Elly739/learnlight",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for learnlight",
  },
  {
    slug: "be-my-valentine",
    name: "BeMyValentine",
    status: "Published App",
    timeline: "Seasonal interactive release",
    summary:
      "A playful Valentine desktop app built with Python and Tkinter, featuring a dodging 'No' button, celebration effects, and a cinematic 'Yes' flow.",
    impact:
      "BeMyValentine shows range in experience design by turning a simple emotional prompt into a polished interactive product with humour, motion, and shareable personality.",
    highlights: [
      "Python desktop app rather than a web-only concept",
      "Includes celebratory effects, hidden surprises, and playful interaction",
      "Demonstrates creativity and product personality alongside formal work",
    ],
    owner: "Elly Okello",
    editorialStatus: "backlog",
    nextUpdate: "April 30, 2026",
    repoUrl: "https://github.com/Elly739/BeMyValentine",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for BeMyValentine",
  },
  {
    slug: "teachable-machine-image-model",
    name: "Teachable Machine Image Model",
    status: "Experiment",
    timeline: "ML starter repository",
    summary:
      "A simple starter project for running image classification models exported from Google's Teachable Machine using JavaScript and TensorFlow.js.",
    impact:
      "This repository adds practical AI experimentation to the platform by showing how trained image models can move from prototype export into usable JavaScript-based prediction workflows.",
    highlights: [
      "Applies TensorFlow.js to image classification workflows",
      "Connects no-code model training with code-based implementation",
      "Adds visible machine-learning experimentation to the project mix",
    ],
    owner: "Elly Okello",
    editorialStatus: "active",
    nextUpdate: "April 30, 2026",
    repoUrl: "https://github.com/Elly739/Teachable-Machine-Image-Model",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for Teachable Machine Image Model",
  },
];
