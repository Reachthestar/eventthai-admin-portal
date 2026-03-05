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
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

interface DeleteUserModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (user: User) => void;
}

export function DeleteUserModal({
  user,
  open,
  onOpenChange,
  onConfirm,
}: DeleteUserModalProps) {
  const t = useTranslations("deleteUserModal");
  const handleDelete = () => {
    if (user) {
      onConfirm(user);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <div className="flex flex-col items-center gap-3 pt-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="size-6 text-destructive" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-center text-foreground">
              {t("title")}
            </DialogTitle>
            <DialogDescription className="text-center">
              {user
                ? t.rich("description", {
                    userName: `${user.first_name} ${user.last_name}`,
                    name: (chunks) => (
                      <span className="font-medium text-foreground">
                        {chunks}
                      </span>
                    ),
                  })
                : ""}
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteUserModal;
