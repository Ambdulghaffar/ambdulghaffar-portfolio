"use client";

import { Link } from "@/i18n/navigation";
import { useActiveHash } from "@/lib/use-active-hash";
import { cn } from "@/lib/utils";

interface NavItem {
  hash: string;
  label: string;
}

export function NavLinks({ navItems }: { navItems: NavItem[] }) {
  const activeHash = useActiveHash();

  return (
    <nav className="hidden items-center gap-1 sm:flex">
      {navItems.map((item) => {
        const isActive = item.hash === activeHash;

        return (
          <Link
            key={item.hash}
            href={{ pathname: "/", hash: item.hash }}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
              isActive && "text-foreground"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full bg-primary transition-opacity",
                isActive ? "opacity-100" : "opacity-0"
              )}
              aria-hidden="true"
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
