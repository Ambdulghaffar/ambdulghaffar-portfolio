"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";
import { useActiveHash } from "@/lib/use-active-hash";
import { cn } from "@/lib/utils";

interface NavItem {
  hash: string;
  label: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  menuLabel: string;
  siteName: string;
}

export function MobileNav({ navItems, menuLabel, siteName }: MobileNavProps) {
  const activeHash = useActiveHash();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label={menuLabel} className="sm:hidden" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-card text-card-foreground">
        <SheetHeader>
          <SheetTitle>{siteName}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => {
            const isActive = item.hash === activeHash;

            return (
              <SheetClose
                key={item.hash}
                nativeButton={false}
                render={
                  <Link
                    href={{ pathname: "/", hash: item.hash }}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary",
                      isActive && "text-primary"
                    )}
                  />
                }
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full bg-primary transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                  aria-hidden="true"
                />
                {item.label}
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
