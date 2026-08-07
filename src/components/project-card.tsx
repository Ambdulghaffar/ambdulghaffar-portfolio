"use client";

import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { ProjectImage } from "@/components/project-image";
import { TechBadge } from "@/components/tech-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Locale, Project } from "@/types";

const STACK_PREVIEW_COUNT = 5;

interface ProjectCardLabels {
  viewDetails: string;
  watchDemo: string;
  close: string;
  techStack: string;
}

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  labels: ProjectCardLabels;
}

export function ProjectCard({ project, locale, labels }: ProjectCardProps) {
  const stackPreview = project.stack.slice(0, STACK_PREVIEW_COUNT);
  const extraStackCount = project.stack.length - stackPreview.length;

  const hasVideo = Boolean(project.videoUrl?.trim());
  const links = project.links.filter((link) => link.url.trim() !== "");
  const liveLink = links.find((link) => link.type === "live");
  const codeLinks = links.filter((link) => link.type !== "live");

  return (
    <Dialog>
      <DialogTrigger
        aria-label={`${labels.viewDetails} — ${project.title[locale]}`}
        nativeButton={false}
        render={
          <Card className="h-full cursor-pointer text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-lg" />
        }
      >
        <ProjectImage
          src={project.image}
          alt={project.title[locale]}
          status={project.status[locale]}
          viewDetailsLabel={labels.viewDetails}
        />
        <CardHeader>
          <CardTitle className="text-lg">{project.title[locale]}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3">
          <p className="line-clamp-3 min-h-15 text-sm text-muted-foreground">
            {project.description[locale]}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {stackPreview.map((tech) => (
              <TechBadge key={tech} label={tech} />
            ))}
            {extraStackCount > 0 && <Badge variant="outline">+{extraStackCount}</Badge>}
          </div>
        </CardContent>
      </DialogTrigger>

      <DialogContent
        className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden p-0 sm:max-w-3xl lg:max-w-4xl"
        showCloseButton
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={project.image}
            alt={project.title[locale]}
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
          />
          <Badge
            variant="secondary"
            className="absolute top-4 left-4 bg-background/90 shadow-sm backdrop-blur-sm"
          >
            {project.status[locale]}
          </Badge>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">{project.title[locale]}</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">{project.description[locale]}</p>

          <div>
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {labels.techStack}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {hasVideo && (
              <Dialog>
                <DialogTrigger render={<Button variant="outline" size="sm" />}>
                  <Play data-icon="inline-start" />
                  {labels.watchDemo}
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl lg:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>{project.title[locale]}</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                    <video src={project.videoUrl} controls autoPlay className="size-full" />
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {liveLink && (
              <Button
                size="sm"
                nativeButton={false}
                render={<a href={liveLink.url} target="_blank" rel="noopener noreferrer" />}
              >
                <ExternalLink data-icon="inline-start" />
                {liveLink.label[locale]}
              </Button>
            )}

            {codeLinks.map((link) => (
              <Button
                key={link.type}
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<a href={link.url} target="_blank" rel="noopener noreferrer" />}
              >
                <GitHubIcon className="size-4" data-icon="inline-start" />
                {link.label[locale]}
              </Button>
            ))}

            <DialogClose render={<Button variant="outline" size="sm" />}>
              {labels.close}
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
