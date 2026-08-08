import { Database, MessageCircle } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, LinkedInIcon, InstagramIcon, FacebookIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types";

type SocialKey = keyof Profile["socials"];

const SOCIAL_ICONS: Record<SocialKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  kaggle: Database,
  whatsapp: MessageCircle,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
};

const SOCIAL_LABELS: Record<SocialKey, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  kaggle: "Kaggle",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
};

interface SocialLinksProps {
  socials: Profile["socials"];
  className?: string;
}

export function SocialLinks({ socials, className }: SocialLinksProps) {
  const entries = (Object.keys(socials) as SocialKey[]).filter(
    (key) => socials[key].trim() !== ""
  );

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {entries.map((key) => {
        const Icon = SOCIAL_ICONS[key];

        return (
          <a
            key={key}
            href={socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={SOCIAL_LABELS[key]}
            className="flex size-10 items-center justify-center rounded-full bg-muted text-foreground outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Icon className="size-4" />
          </a>
        );
      })}
    </div>
  );
}
