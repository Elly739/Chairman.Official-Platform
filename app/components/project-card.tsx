"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: custom * 0.1,
    },
  }),
};

const imageHover: Variants = {
  hover: { scale: 1.08 },
};

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      className="overflow-hidden rounded-[1.75rem] border border-[var(--color-line)] bg-white shadow-[0_14px_40px_rgba(10,61,98,0.08)]"
      custom={index}
      variants={projectVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover="hover"
      role="article"
      aria-labelledby={`project-title-${project.slug}`}
    >
      <motion.div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-soft)]" variants={imageHover} transition={{ duration: 0.4 }}>
        <Image
          src={project.coverImage ?? "/media/project-cover.svg"}
          alt={project.coverAlt ?? project.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
        />
      </motion.div>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white" aria-label={`Status: ${project.status}`}>
            {project.status}
          </span>
          <span className="text-xl font-bold text-[var(--color-brand)] tabular-nums" aria-label={`Timeline: ${typeof index === "number" ? (index + 1).toString().padStart(2, "0") : project.timeline}`}>
            {typeof index === "number" ? (index + 1).toString().padStart(2, "0") : project.timeline}
          </span>
        </div>
        <h3 id={`project-title-${project.slug}`} className="mt-8 font-heading text-2xl font-semibold text-[var(--color-ink)]">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{project.summary}</p>
        <Link href={`/projects/${project.slug}`} className="btn-brand-subtle mt-6" aria-label={`View project: ${project.name}`}>
          View Project
        </Link>
      </div>
    </motion.article>
  );
}

