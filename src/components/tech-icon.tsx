import type { IconType } from "react-icons";
import {
  SiBootstrap,
  SiCss,
  SiDart,
  SiDocker,
  SiFastapi,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiHibernate,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiJira,
  SiJsonwebtokens,
  SiJunit5,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedux,
  SiShadcnui,
  SiSpringboot,
  SiSqlite,
  SiStreamlit,
  SiSupabase,
  SiSwagger,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiUml,
} from "react-icons/si";
import {
  Code2,
  FlaskConical,
  Globe,
  KeyRound,
  Layers,
  Lock,
  MapPin,
  Rows3,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Simple Icons has no authentic brand logo for these — a generic Lucide icon stands in instead. */
const LUCIDE_FALLBACKS: Record<string, LucideIcon> = {
  "Context API": Layers,
  Riverpod: Waves,
  "REST APIs": Globe,
  "PostGIS": MapPin,
  "Spring Security": ShieldCheck,
  OAuth2: KeyRound,
  "NextAuth.js": Lock,
  "Row Level Security": Rows3,
  "Groq API": Zap,
  "LLMs / Prompt Engineering": Sparkles,
  "Docker Compose": Layers,
  Mockito: FlaskConical,
};

const SIMPLE_ICONS: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  PHP: SiPhp,
  Dart: SiDart,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Spring Boot": SiSpringboot,
  Flutter: SiFlutter,
  Laravel: SiLaravel,
  FastAPI: SiFastapi,
  "Tailwind CSS": SiTailwindcss,
  "Shadcn/UI": SiShadcnui,
  Bootstrap: SiBootstrap,
  "Redux Toolkit": SiRedux,
  "Swagger/OpenAPI": SiSwagger,
  Postman: SiPostman,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  Supabase: SiSupabase,
  "JPA/Hibernate": SiHibernate,
  JWT: SiJsonwebtokens,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  Streamlit: SiStreamlit,
  Git: SiGit,
  GitHub: SiGithub,
  Jira: SiJira,
  UML: SiUml,
  "JUnit 5": SiJunit5,
  Jest: SiJest,
  "React Testing Library": SiTestinglibrary,
};

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className }: TechIconProps) {
  const SimpleIcon = SIMPLE_ICONS[name];
  if (SimpleIcon) return <SimpleIcon className={className} aria-hidden="true" />;

  const LucideFallback = LUCIDE_FALLBACKS[name] ?? Code2;
  return <LucideFallback className={className} aria-hidden="true" />;
}
