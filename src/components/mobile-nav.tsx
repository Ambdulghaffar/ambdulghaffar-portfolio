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
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label={menuLabel} className="sm:hidden" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>{siteName}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <SheetClose
              key={item.hash}
              nativeButton={false}
              render={
                <Link
                  href={{ pathname: "/", hash: item.hash }}
                  className="rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
                />
              }
            >
              {item.label}
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
