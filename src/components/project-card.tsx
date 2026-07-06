import { ExternalLink } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { ProjectImage } from "@/components/project-image";
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
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const links = project.links.filter((link) => link.url.trim() !== "");

  return (
    <Card className="h-full">
      <ProjectImage src={project.image} alt={project.title[locale]} />
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
      {links.length > 0 && (
        <CardFooter className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Button
              key={link.type}
              variant={link.type === "live" ? "default" : "outline"}
              size="sm"
              nativeButton={false}
              render={
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label[locale]}
                />
              }
            >
              {link.type === "live" ? (
                <ExternalLink data-icon="inline-start" />
              ) : (
                <GitHubIcon className="size-4" data-icon="inline-start" />
              )}
              {link.label[locale]}
            </Button>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
