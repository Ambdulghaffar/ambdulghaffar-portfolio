"use client";

import * as React from "react";
import { ImageOff } from "lucide-react";

export function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = React.useState(!src);

  return (
    <div className="relative -mx-(--card-spacing) -mt-(--card-spacing) aspect-video overflow-hidden rounded-t-xl bg-gradient-to-br from-primary/15 via-muted to-secondary/30">
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className="size-full object-cover"
        />
      )}
      {errored && (
        <div className="flex size-full items-center justify-center">
          <ImageOff className="size-8 text-muted-foreground/60" />
        </div>
      )}
    </div>
  );
}
