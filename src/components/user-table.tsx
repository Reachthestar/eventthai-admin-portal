"use client";

import { useState, useMemo } from "react";
import { dummyUsers, type User } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pencil, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EditUserModal, DeleteUserModal } from "@/components/user-modals";

const ITEMS_PER_PAGE = 6;

const roleBadgeVariant: Record<string, string> = {
  Admin: "bg-primary/10 text-primary border-primary/20",
  Editor: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  Viewer:
    "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
};

export function UserTable() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const s = search.toLowerCase();
    return users.filter(
      (u) =>
        u.first_name.toLowerCase().includes(s) ||
        u.last_name.toLowerCase().includes(s) ||
        u.email.toLowerCase().includes(s) ||
        u.role.toLowerCase().includes(s),
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

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
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
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
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
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
              <TableHead className="hidden lg:table-cell">Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="size-9">
                      <AvatarImage
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {user.first_name[0]}
                        {user.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    <div>
                      {user.first_name}
                      <span className="ml-1 sm:hidden">{user.last_name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-foreground sm:table-cell">
                    {user.last_name}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge
                      variant="outline"
                      className={roleBadgeVariant[user.role] || ""}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleEdit(user)}
                        aria-label={`Edit ${user.first_name}`}
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(user)}
                        aria-label={`Delete ${user.first_name}`}
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
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}
          </span>
          {" - "}
          <span className="font-medium text-foreground">
            {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filtered.length)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{filtered.length}</span>{" "}
          users
        </p>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.max(1, p - 1));
                }}
                className={
                  safeCurrentPage <= 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page} className="hidden sm:block">
                <PaginationLink
                  href="#"
                  isActive={page === safeCurrentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  className={
                    page === safeCurrentPage
                      ? "border-primary bg-primary/10 text-primary"
                      : "cursor-pointer"
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                }}
                className={
                  safeCurrentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

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
