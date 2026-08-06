"use client";

import { ExternalLink, Play } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { ProjectImage } from "@/components/project-image";
import { TechBadge } from "@/components/tech-badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Locale, Project } from "@/types";

const STACK_PREVIEW_COUNT = 5;

interface ProjectCardLabels {
  viewDetails: string;
  watchDemo: string;
  close: string;
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
    <AlertDialog>
      <AlertDialogTrigger
        aria-label={`${labels.viewDetails} — ${project.title[locale]}`}
        nativeButton={false}
        render={
          <Card className="group h-full cursor-pointer text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg" />
        }
      >
        <ProjectImage
          src={project.image}
          alt={project.title[locale]}
          status={project.status[locale]}
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
        <CardFooter className="mt-auto">
          <span
            aria-hidden="true"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}
          >
            {labels.viewDetails}
          </span>
        </CardFooter>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-lg sm:max-w-xl" size="default">
        <AlertDialogHeader>
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <AlertDialogTitle>{project.title[locale]}</AlertDialogTitle>
            <Badge variant="secondary" className="shrink-0">
              {project.status[locale]}
            </Badge>
          </div>
        </AlertDialogHeader>

        <p className="text-sm text-muted-foreground">{project.description[locale]}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>

        <AlertDialogFooter className="sm:flex-wrap sm:justify-start">
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

          <AlertDialogCancel size="sm">{labels.close}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
