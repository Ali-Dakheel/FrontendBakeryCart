"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLinks } from "@/components/layout/NavLinks";
import { useUser } from "@/lib/hooks/useAuth";
import { useTranslations } from "next-intl";

export function MobileNav() {
  const t = useTranslations();
  const { data: user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-navy hover:text-sky hover:bg-sky/10"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("nav.menu")}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-75 bg-white">
        <SheetHeader>
          <SheetTitle className="font-display text-navy">{t("nav.menu")}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <NavLinks
            user={user}
            orientation="vertical"
            onLinkClick={() => setOpen(false)}
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
