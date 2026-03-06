import { z } from "zod";
import { useTranslations } from "next-intl";

type TranslationFn = ReturnType<typeof useTranslations>;

const baseSchema = z.object({
  email: z.string().toLowerCase().min(1).email(),
  password: z.string().min(6).max(72),
});

export type LoginSchema = z.infer<typeof baseSchema>;

export const getLoginSchema = (t: TranslationFn) =>
  baseSchema.extend({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, { message: t("validation.emailRequired") })
      .email({ message: t("validation.invalidEmail") }),
    password: z
      .string()
      .min(6, { message: t("validation.passwordMin") })
      .max(72, { message: t("validation.passwordMax") }),
  });
