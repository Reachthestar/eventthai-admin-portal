"use client";

import { ChevronDown, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const getLanguageLabel = (language: string) => {
    switch (language) {
      case "en":
        return "EN";
      case "th":
        return "ไทย";
      default:
        return language.toUpperCase();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 gap-1.5 rounded-full px-2.5 cursor-pointer"
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium">{getLanguageLabel(locale)}</span>
          <ChevronDown className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={locale === "en" ? "bg-accent" : ""}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("th")}
          className={locale === "th" ? "bg-accent" : ""}
        >
          ภาษาไทย (Thai)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
