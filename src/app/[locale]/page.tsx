import { Header } from "@/components/header";
import { UserTable } from "@/components/user-table";
import { Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Users className="size-5 text-primary" />
              <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                User Management
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              View, edit, and manage all registered users in one place.
            </p>
          </div>
          <UserTable />
        </div>
      </main>
    </div>
  );
}
