"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TablePagination } from "@/components/ui/pagination";
import { Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EditUserModal } from "@/components/edit-user-modal";
import { DeleteUserModal } from "@/components/delete-user-modal";
import { UserTableSkeleton } from "@/components/skeletons/user-table-skeleton";
import {
  useGetUsers,
  useUpdateUser,
  useDeleteUser,
} from "@/hooks/apis/use-users";
import { User } from "@/types/users";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { isAxiosError } from "axios";

export function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteUserValue, setDeleteUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { data: users, isLoading, isError } = useGetUsers(currentPage);
  const { mutateAsync: updateUser } = useUpdateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const t = useTranslations("userTable");
  const tEditUserModalError = useTranslations("editUserModal");
  const tDeleteUserModalError = useTranslations("deleteUserModal");

  const usersList = users?.data || [];
  const totalPages = users?.total_pages || 1;
  const totalUsers = users?.total || 0;
  const perPage = users?.per_page || 6;

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return usersList;
    const searchValue = debouncedSearch.toLowerCase();
    return usersList.filter(
      (u: User) =>
        u.first_name.toLowerCase().includes(searchValue) ||
        u.last_name.toLowerCase().includes(searchValue) ||
        u.email.toLowerCase().includes(searchValue),
    );
  }, [usersList, debouncedSearch]);

  const handleEdit = (user: User) => {
    setEditUser(user);
    setEditOpen(true);
  };

  const handleEditOpen = (open: boolean) => {
    setEditOpen(open);
    if (!open) {
      setTimeout(() => setEditUser(null), 200);
    }
  };

  const handleSaveUser = async (updated: User) => {
    try {
      await updateUser(updated);
      toast.success(tEditUserModalError("success"));
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        toast.error(message || tEditUserModalError("error"));
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(tEditUserModalError("error"));
      }
    }
  };

  const handleDelete = (user: User) => {
    setDeleteUser(user);
    setDeleteOpen(true);
  };

  const handleDeleteOpen = (open: boolean) => {
    setDeleteOpen(open);
    if (!open) {
      setTimeout(() => setDeleteUser(null), 200);
    }
  };

  const handleConfirmDelete = async (user: User) => {
    try {
      await deleteUser(user.id);
      toast.success(tDeleteUserModalError("success"));
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        toast.error(message || tDeleteUserModalError("error"));
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(tDeleteUserModalError("error"));
      }
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 pb-8">
      {/* Search bar */}
      <div className="flex flex-col items-center justify-end gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm sm:flex-row">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            data-testid="user-search-input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="h-[46px] rounded-full border-border bg-background pl-11 text-base shadow-sm ring-offset-background transition-colors focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex min-h-[400px] flex-1 flex-col rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm sm:p-6 text-card-foreground">
        {isLoading ? (
          <UserTableSkeleton />
        ) : filtered.length === 0 || isError ? (
          <div className="flex min-h-[300px] flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                <Search className="size-6 text-muted-foreground/50" />
              </div>
              <span className="font-medium">{t("noItems")}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((user: User) => (
              <div
                key={user.id}
                className="group relative flex flex-col justify-between gap-5 rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <Avatar className="size-16 shrink-0 rounded-2xl border-2 border-background shadow-sm ring-1 ring-border/10 transition-transform duration-300 group-hover:scale-105">
                    <AvatarImage
                      src={user?.avatar}
                      alt={`${user?.first_name} ${user?.last_name}`}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-2xl bg-primary/10 text-xl font-semibold text-primary">
                      {user?.first_name?.[0]}
                      {user?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex shrink-0 items-center gap-1.5 cursor-pointer">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary cursor-pointer"
                      onClick={() => handleEdit(user)}
                      aria-label={`Edit ${user?.first_name}`}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
                      onClick={() => handleDelete(user)}
                      aria-label={`Delete ${user?.first_name}`}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-lg font-bold tracking-tight text-foreground">
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span className="truncate text-sm font-medium text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-auto flex justify-end rounded-xl border border-border/50 bg-card p-4 shadow-sm">
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalUsers}
          itemsPerPage={perPage}
          onPageChange={setCurrentPage}
          itemsName="users"
        />
      </div>

      {/* Modals */}
      <EditUserModal
        user={editUser}
        open={editOpen}
        onOpenChange={handleEditOpen}
        onSave={handleSaveUser}
      />
      <DeleteUserModal
        user={deleteUserValue}
        open={deleteOpen}
        onOpenChange={handleDeleteOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
