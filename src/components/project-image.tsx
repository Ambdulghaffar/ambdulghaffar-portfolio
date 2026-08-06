"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  status: string;
  className?: string;
}

export function ProjectImage({ src, alt, status, className }: ProjectImageProps) {
  const [errored, setErrored] = useState(!src);

  return (
    <div
      className={cn(
        "relative -mx-(--card-spacing) -mt-(--card-spacing) aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/15 via-muted to-secondary/30",
        className
      )}
    >
      {!errored && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          onError={() => setErrored(true)}
        />
      )}
      {errored && (
        <div className="flex size-full items-center justify-center">
          <ImageOff className="size-8 text-muted-foreground/60" />
        </div>
      )}
      <Badge
        variant="secondary"
        className="absolute top-3 left-3 bg-background/90 shadow-sm backdrop-blur-sm"
      >
        {status}
      </Badge>
    </div>
  );
}
