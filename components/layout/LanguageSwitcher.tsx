"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Locale } from "@/i18n.config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const newLocale: Locale = locale === "en" ? "ar" : "en";
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

    startTransition(() => {
      router.push(`/${newLocale}${pathnameWithoutLocale || "/"}`);
      router.refresh();
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      disabled={isPending}
      aria-busy={isPending}
      aria-label="Change language"
      className="text-navy hover:text-sky hover:bg-sky/10 font-semibold gap-1.5 px-2 md:px-3"
    >
      <Globe className="h-4 w-4 shrink-0" />
      <span className="hidden md:inline">{locale === "en" ? "العربية" : "English"}</span>
    </Button>
  );
}
