"use client";

import { Header } from "@/components/header";
import { UserTable } from "@/components/user-table";
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <Users className="size-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t("title")}
              </h1>
            </div>
            <p className="text-base text-muted-foreground">
              {t("description")}
            </p>
          </div>
          <div className="flex-1 pb-10">
            <UserTable />
          </div>
        </div>
      </main>
    </div>
  );
}
