"use client";

import { Globe, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const languages = [
  { code: "EN", label: "English" },
  { code: "TH", label: "ไทย" },
];

export function Header() {
  const pathname = usePathname();
  const [language, setLanguage] = useState("EN");

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Users className="size-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold text-foreground">
            UserHub
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {!isAuthPage && (
            <nav className="mr-2 hidden items-center gap-1 sm:flex">
              <Link href="/">
                <Button
                  variant={pathname === "/" ? "secondary" : "ghost"}
                  size="sm"
                  className="text-sm"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant={pathname === "/login" ? "secondary" : "ghost"}
                  size="sm"
                  className="text-sm"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant={pathname === "/register" ? "secondary" : "ghost"}
                  size="sm"
                  className="text-sm"
                >
                  Register
                </Button>
              </Link>
            </nav>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Globe className="size-4" />
                <span className="text-xs font-medium">{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={
                    language === lang.code ? "bg-accent font-medium" : ""
                  }
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
