"use client";

import NextLink from "next/link";
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

interface NavItem {
  href: string;
  label: string;
}

interface MobileNavProps {
  navItems: NavItem[];
  loginLabel: string;
  loginHref: string;
  menuLabel: string;
  siteName: string;
}

export function MobileNav({
  navItems,
  loginLabel,
  loginHref,
  menuLabel,
  siteName,
}: MobileNavProps) {
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
              key={item.href}
              render={
                <a
                  href={item.href}
                  className="rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
                />
              }
            >
              {item.label}
            </SheetClose>
          ))}
          <SheetClose
            render={
              <NextLink
                href={loginHref}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
              />
            }
          >
            {loginLabel}
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
