"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

interface SectionHeaderProps {
  emoji?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

interface SectionGridProps {
  children: ReactNode;
  columns?: number;
  className?: string;
}

export function Section({ children, className = "", dark = false }: SectionProps) {
  return (
    <section
      className={`space-section ${dark ? "bg-[var(--color-primary)] text-white" : "bg-white"} ${className}`}
    >
      <div className="container-max">{children}</div>
    </section>
  );
}

export function SectionHeader({ emoji, title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      className={`mb-12 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {emoji && <span className="text-4xl block mb-3">{emoji}</span>}
      <h2 className="text-h2 mb-3">{title}</h2>
      {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
    </motion.div>
  );
}

export function SectionGrid({ children, columns = 3, className = "" }: SectionGridProps) {
  const colsClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "grid-cols-1 md:grid-cols-3";

  return (
    <div className={`grid ${colsClass} gap-8 ${className}`}>
      {children}
    </div>
  );
}
