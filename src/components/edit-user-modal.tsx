"use client";

import { useEffect } from "react";
import type { User } from "@/types/users";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getEditUserSchema,
  EditUserSchema,
} from "@/schemas/edite-user-validation";
import { toast } from "sonner";
import { isAxiosError } from "axios";

interface EditUserModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (user: User) => void;
}

export function EditUserModal({
  user,
  open,
  onOpenChange,
  onSave,
}: EditUserModalProps) {
  const t = useTranslations("editUserModal");

  const {
    register: editUserRegister,
    handleSubmit: editUserSubmit,
    reset: editUserReset,
    formState: { errors: editUserErrors, isSubmitting: editUserSubmitting },
  } = useForm<EditUserSchema>({
    resolver: zodResolver(getEditUserSchema(t)),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (open && user) {
      editUserReset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
    } else if (!open) {
      editUserReset({
        first_name: "",
        last_name: "",
        email: "",
      });
    }
  }, [user, open, editUserReset]);

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  const onSubmit = async (data: EditUserSchema) => {
    try {
      if (user) {
        await onSave({
          ...user,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        });
      }
      onOpenChange(false);
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        toast.error(message || t("error"));
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("error"));
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-foreground">{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={editUserSubmit(onSubmit)}
          className="grid gap-4 py-2"
          noValidate
        >
          <div className="grid gap-2">
            <Label htmlFor="edit-first-name">{t("firstName")}</Label>
            <Input
              id="edit-first-name"
              {...editUserRegister("first_name")}
              placeholder={t("firstNamePlaceholder")}
            />
            {editUserErrors.first_name && (
              <p className="text-sm text-red-500">
                {editUserErrors.first_name.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-last-name">{t("lastName")}</Label>
            <Input
              id="edit-last-name"
              {...editUserRegister("last_name")}
              placeholder={t("lastNamePlaceholder")}
            />
            {editUserErrors.last_name && (
              <p className="text-sm text-red-500">
                {editUserErrors.last_name.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-email">{t("email")}</Label>
            <Input
              id="edit-email"
              type="email"
              {...editUserRegister("email")}
              placeholder={t("emailPlaceholder")}
            />
            {editUserErrors.email && (
              <p className="text-sm text-red-500">
                {editUserErrors.email.message}
              </p>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={editUserSubmitting}>
              {t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditUserModal;
