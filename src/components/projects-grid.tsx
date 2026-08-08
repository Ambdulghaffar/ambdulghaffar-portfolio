"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import type { Locale, Project } from "@/types";

const INITIAL_VISIBLE_COUNT = 6;

interface ProjectsGridLabels {
  viewDetails: string;
  watchDemo: string;
  close: string;
  techStack: string;
  showMore: string;
  showLess: string;
}

interface ProjectsGridProps {
  projects: Project[];
  locale: Locale;
  labels: ProjectsGridLabels;
}

export function ProjectsGrid({ projects, locale, labels }: ProjectsGridProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleProjects = projects.slice(0, INITIAL_VISIBLE_COUNT);
  const extraProjects = projects.slice(INITIAL_VISIBLE_COUNT);

  function handleToggle() {
    if (expanded) {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpanded((value) => !value);
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.id} delay={Math.min(index * 0.1, 0.5)}>
            <ProjectCard project={project} locale={locale} labels={labels} />
          </Reveal>
        ))}

        <AnimatePresence>
          {expanded &&
            extraProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ProjectCard project={project} locale={locale} labels={labels} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {extraProjects.length > 0 && (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" onClick={handleToggle}>
            {expanded ? labels.showLess : labels.showMore}
            {expanded ? (
              <ChevronUp data-icon="inline-end" />
            ) : (
              <ChevronDown data-icon="inline-end" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
