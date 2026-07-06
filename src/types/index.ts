export type Locale = "fr" | "en";

export type LocalizedText = Record<Locale, string>;

/** Some legacy JSON entries store a single string instead of a per-locale object. */
export type MaybeLocalizedText = string | LocalizedText;

export interface Profile {
  name: string;
  initials: string;
  title: LocalizedText;
  tagline: LocalizedText;
  bio: LocalizedText;
  location: LocalizedText;
  email: string;
  phone: string;
  availability: LocalizedText;
  socials: {
    linkedin: string;
    github: string;
  };
  cvUrl: string;
}

export interface StackCategory {
  id: string;
  category: LocalizedText;
  items: string[];
}

export interface Project {
  id: string;
  title: LocalizedText;
  status: LocalizedText;
  description: LocalizedText;
  stack: string[];
  githubUrl: string;
  liveUrl: string;
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
