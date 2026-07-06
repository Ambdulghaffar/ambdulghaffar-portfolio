"use client";

import * as React from "react";

interface ProfileAvatarProps {
  src: string;
  alt: string;
  initials: string;
  className?: string;
}

export function ProfileAvatar({ src, alt, initials, className }: ProfileAvatarProps) {
  const [errored, setErrored] = React.useState(!src);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 via-muted to-secondary/40 ring-1 ring-foreground/10 ${className ?? ""}`}
    >
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
        <div className="flex size-full items-center justify-center font-heading text-2xl font-semibold text-foreground/70">
          {initials}
        </div>
      )}
    </div>
  );
}
