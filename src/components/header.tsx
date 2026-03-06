"use client";

import { useState } from "react";
import { Users, Menu, X, LogOut, Globe } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./ui/language-switcher";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const { logout } = useAuthStore();
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success(t("auth.logout.logoutSuccess"));
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Users className="size-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold text-foreground">
            {t("header.brandName")}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 sm:flex">
          {!isAuthPage && (
            <Button size="sm" className="text-sm" onClick={handleLogout}>
              {t("auth.logout.logoutButton")}
            </Button>
          )}
          <LanguageSwitcher />
        </div>

        {/* Mobile: show LanguageSwitcher + burger on auth pages, just burger otherwise */}
        <div className="flex items-center gap-2 sm:hidden">
          {isAuthPage ? (
            <LanguageSwitcher />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {!isAuthPage && (
        <>
          <div
            className={`fixed inset-0 z-[45] bg-background/80 backdrop-blur-sm transition-all duration-300 sm:hidden ${
              mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile drawer menu */}
          <div
            className={`fixed inset-y-0 right-0 z-[50] flex w-[280px] flex-col gap-6 border-l bg-card p-6 shadow-xl transition-transform duration-300 ease-in-out sm:hidden ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                {t("header.brandName")}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              {/* Language switcher row */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="size-4 shrink-0" />
                  <span>{t("header.language")}</span>
                </div>
                <div className="w-full">
                  <LanguageSwitcher />
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-6">
                <div className="h-px w-full bg-border" />

                {/* Logout button at bottom */}
                <Button
                  variant="destructive"
                  className="w-full justify-start gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="size-4" />
                  {t("auth.logout.logoutButton")}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
