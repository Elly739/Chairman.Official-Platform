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

export const projects: Project[] = [];