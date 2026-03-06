import { z } from "zod";
import { useTranslations } from "next-intl";

type TranslationFn = ReturnType<typeof useTranslations>;

const baseSchema = z.object({
  first_name: z.string().trim().min(1).max(50),
  last_name: z.string().trim().min(1).max(50),
  email: z.string().trim().min(1).email().toLowerCase(),
});

export type EditUserSchema = z.infer<typeof baseSchema>;

const nameRegex = /^[a-zA-Zก-ฮะ-์\s]+$/;

export const getEditUserSchema = (t: TranslationFn) =>
  baseSchema.extend({
    first_name: z
      .string()
      .trim()
      .min(1, t("validation.firstNameRequired"))
      .max(50, t("validation.firstNameMax"))
      .regex(nameRegex, t("validation.invalidName")),
    last_name: z
      .string()
      .trim()
      .min(1, t("validation.lastNameRequired"))
      .max(50, t("validation.lastNameMax"))
      .regex(nameRegex, t("validation.invalidLastName")),
    email: z
      .string()
      .trim()
      .min(1, t("validation.emailRequired"))
      .email(t("validation.invalidEmail"))
      .toLowerCase(),
  });
