import { ExternalLink } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TechBadge } from "@/components/tech-badge";
import type { Locale, Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  viewProjectLabel: string;
  viewCodeLabel: string;
}

export function ProjectCard({
  project,
  locale,
  viewProjectLabel,
  viewCodeLabel,
}: ProjectCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{project.title[locale]}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {project.status[locale]}
          </Badge>
        </div>
        <CardDescription>{project.description[locale]}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </CardContent>
      {(project.githubUrl || project.liveUrl) && (
        <CardFooter className="flex gap-2">
          {project.liveUrl && (
            <Button
              variant="default"
              size="sm"
              render={
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={viewProjectLabel}
                />
              }
            >
              <ExternalLink data-icon="inline-start" />
              {viewProjectLabel}
            </Button>
          )}
          {project.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              render={
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={viewCodeLabel}
                />
              }
            >
              <GitHubIcon className="size-4" data-icon="inline-start" />
              {viewCodeLabel}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
