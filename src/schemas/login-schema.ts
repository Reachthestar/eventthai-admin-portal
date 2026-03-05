import { z } from "zod";
import { useTranslations } from "next-intl";

type TranslationFn = ReturnType<typeof useTranslations>;

const baseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof baseSchema>;

export const getLoginSchema = (t: TranslationFn) =>
  baseSchema.extend({
    email: z.string().email({ message: t("validation.invalidEmail") }),
    password: z.string().min(6, { message: t("validation.passwordMin") }),
  });
