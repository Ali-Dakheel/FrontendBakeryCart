"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
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
      className="text-navy hover:text-sky hover:bg-sky/10 font-semibold"
    >
      {locale === "en" ? "العربية" : "English"}
    </Button>
  );
}
