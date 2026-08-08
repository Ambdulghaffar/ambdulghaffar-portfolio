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
              "rounded-md px-3 py-1.5 text-base font-semibold text-muted-foreground underline decoration-2 underline-offset-4 decoration-transparent outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              isActive && "text-primary decoration-primary"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
