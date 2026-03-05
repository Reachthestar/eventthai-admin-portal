import { z } from "zod";
import { useTranslations } from "next-intl";

type TranslationFn = ReturnType<typeof useTranslations>;

const baseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export type RegisterSchema = z.infer<typeof baseSchema>;

export const getRegisterSchema = (t: TranslationFn) =>
  baseSchema
    .extend({
      email: z.string().email({ message: t("validation.invalidEmail") }),
      password: z.string().min(6, { message: t("validation.passwordMin") }),
      confirmPassword: z
        .string()
        .min(6, { message: t("validation.passwordMin") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordMismatch"),
      path: ["confirmPassword"],
    });
