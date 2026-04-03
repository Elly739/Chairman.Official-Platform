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
  coverImage?: string;
  coverAlt?: string;
};

export const projects: Project[] = [
  {
    slug: "smartwaste",
    name: "SmartWaste",
    status: "Active Deployment",
    timeline: "2026 rollout",
    summary:
      "A civic operations project using reporting, routing, and visibility tools to improve sanitation response in fast-growing urban communities.",
    impact:
      "SmartWaste is designed to shorten response time, make sanitation workflows easier to track, and give communities more confidence that reported issues will actually be handled.",
    highlights: [
      "Real-time issue escalation and prioritization",
      "Clearer reporting loops for teams and city stakeholders",
      "A visible public-interest flagship with practical urban value",
    ],
    owner: "Chairman's Office",
    editorialStatus: "ready",
    nextUpdate: "March 24, 2026",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for SmartWaste",
  },
  {
    slug: "civicsignal",
    name: "CivicSignal",
    status: "Pilot Phase",
    timeline: "Pilot in progress",
    summary:
      "A citizen feedback channel built to turn public complaints, ideas, and reports into structured signals teams can act on.",
    impact:
      "CivicSignal helps move citizen voice from scattered frustration into trackable workflow, giving public teams a clearer basis for response, follow-up, and accountability.",
    highlights: [
      "Public feedback intake with cleaner categorization",
      "Simple issue tracking workflows for operational teams",
      "More credible accountability and reporting over time",
    ],
    owner: "Public Engagement Team",
    editorialStatus: "active",
    nextUpdate: "March 28, 2026",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for CivicSignal",
  },
  {
    slug: "futurefounders-lab",
    name: "FutureFounders Lab",
    status: "Open Applications",
    timeline: "Applications now open",
    summary:
      "A builder-development program combining mentorship, visibility, and execution support for ambitious young founders.",
    impact:
      "FutureFounders Lab helps promising builders strengthen their ideas, sharpen their public story, and move with more confidence from concept into visible progress.",
    highlights: [
      "Mentor access and practical founder guidance",
      "Storytelling support for stronger public visibility",
      "Execution-focused growth structure instead of passive inspiration",
    ],
    owner: "Innovation Programs",
    editorialStatus: "active",
    nextUpdate: "March 22, 2026",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for FutureFounders Lab",
  },
  {
    slug: "bluegrid-forum",
    name: "BlueGrid Forum",
    status: "Strategic Planning",
    timeline: "Planning 2026",
    summary:
      "A leadership and policy forum designed to connect technology, governance, and practical public-private collaboration.",
    impact:
      "BlueGrid Forum is being shaped as a serious convening space where leaders, builders, and institutions can move beyond noise into durable alignment and execution partnerships.",
    highlights: [
      "Cross-sector leadership convening",
      "Policy, technology, and systems dialogue",
      "Long-term partnership pipeline for future initiatives",
    ],
    owner: "Strategy Desk",
    editorialStatus: "backlog",
    nextUpdate: "April 4, 2026",
    coverImage: "/media/project-cover.svg",
    coverAlt: "Project cover for BlueGrid Forum",
  },
];