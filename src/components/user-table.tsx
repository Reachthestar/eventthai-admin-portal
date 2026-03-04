"use client";

import { useState, useMemo } from "react";
import { type User } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/pagination";
import { Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EditUserModal, DeleteUserModal } from "@/components/user-modals";
import { useGetUsers } from "@/hooks/apis/use-users";
import { Loader2 } from "lucide-react";

export function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { data: users, isLoading, isError } = useGetUsers(currentPage);

  console.log("UserTable", users);
  console.log("UserTable error", isError);

  const usersList = users?.data || [];
  const totalPages = users?.total_pages || 1;
  const totalUsers = users?.total || 0;
  const perPage = users?.per_page || 6;

  const filtered = useMemo(() => {
    if (!search.trim()) return usersList;
    const s = search.toLowerCase();
    return usersList.filter(
      (u: any) =>
        u.first_name.toLowerCase().includes(s) ||
        u.last_name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s),
    );
  }, [usersList, search]);

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

  const handleSaveUser = (updated: User) => {
    console.log("Save user", updated);
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

  const handleConfirmDelete = (user: User) => {
    console.log("Delete user", user);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[60px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Last</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Loading users...
                  </div>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 || isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="size-9">
                      <AvatarImage
                        src={user?.avatar}
                        alt={`${user?.first_name} ${user?.last_name}`}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {user?.first_name[0]}
                        {user?.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    <div>
                      {user?.first_name}
                      <span className="ml-1 sm:hidden">{user?.last_name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {user?.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-foreground sm:table-cell">
                    {user?.last_name}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {user?.email}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleEdit(user)}
                        aria-label={`Edit ${user?.first_name}`}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(user)}
                        aria-label={`Delete ${user?.first_name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalUsers}
        itemsPerPage={perPage}
        onPageChange={setCurrentPage}
        itemsName="users"
      />

      {/* Modals */}
      <EditUserModal
        user={editUser}
        open={editOpen}
        onOpenChange={handleEditOpen}
        onSave={handleSaveUser}
      />
      <DeleteUserModal
        user={deleteUser}
        open={deleteOpen}
        onOpenChange={handleDeleteOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
