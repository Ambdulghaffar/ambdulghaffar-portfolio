import { ProjectCard } from "@/components/project-card";
import type { Locale, Project } from "@/types";

interface ProjectsGridProps {
  projects: Project[];
  locale: Locale;
  watchDemoLabel: string;
}

export function ProjectsGrid({ projects, locale, watchDemoLabel }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          locale={locale}
          watchDemoLabel={watchDemoLabel}
        />
      ))}
    </div>
  );
}
