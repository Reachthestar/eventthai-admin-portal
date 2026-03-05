"use client";

import { Users } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./ui/language-switcher";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

export function Header() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
  };

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

              <Button size="sm" className="text-sm" onClick={handleLogout}>
                Logout
              </Button>
            </nav>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
