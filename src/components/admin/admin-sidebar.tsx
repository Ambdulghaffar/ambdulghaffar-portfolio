"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderKanban, Briefcase, Layers, UserRound, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/experience", label: "Expérience", icon: Briefcase },
  { href: "/admin/stack", label: "Stack", icon: Layers },
  { href: "/admin/profile", label: "Profil", icon: UserRound },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border/60 bg-card/40 p-4">
      <p className="mb-6 px-2 font-heading text-sm font-semibold tracking-tight">
        Administration
      </p>
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/"
        className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <LogOut className="size-4" />
        Quitter
      </Link>
    </aside>
  );
}
