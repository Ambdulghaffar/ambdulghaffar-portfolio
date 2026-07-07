export type Locale = "fr" | "en";

export type LocalizedText = Record<Locale, string>;

/** Some legacy JSON entries store a single string instead of a per-locale object. */
export type MaybeLocalizedText = string | LocalizedText;

export interface Profile {
  name: string;
  initials: string;
  photoUrl: string;
  title: LocalizedText;
  tagline: LocalizedText;
  heroSummary: LocalizedText;
  bio: LocalizedText;
  location: LocalizedText;
  email: string;
  phone: string;
  availability: LocalizedText;
  socials: {
    linkedin: string;
    github: string;
    kaggle: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
  };
  cvUrl: string;
}

export interface StackCategory {
  id: string;
  category: LocalizedText;
  items: string[];
}

export type ProjectLinkType =
  | "github-backend"
  | "github-frontend"
  | "github-mobile"
  | "github"
  | "live";

export interface ProjectLink {
  type: ProjectLinkType;
  label: LocalizedText;
  url: string;
}

export interface Project {
  id: string;
  title: LocalizedText;
  status: LocalizedText;
  description: LocalizedText;
  stack: string[];
  image: string;
  links: ProjectLink[];
  videoUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: LocalizedText;
  contractType: LocalizedText;
  location: LocalizedText;
  period: MaybeLocalizedText;
  bullets: Record<Locale, string[]>;
}

export interface Education {
  id: string;
  degree: LocalizedText;
  institution: string;
  detail: LocalizedText;
  period: MaybeLocalizedText;
}
