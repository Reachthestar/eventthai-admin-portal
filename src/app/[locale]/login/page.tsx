"use client";

export const runtime = "edge";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useLogin } from "@/hooks/apis/use-auth";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLoginSchema, LoginSchema } from "@/schemas/login-schema";
import { isAxiosError } from "axios";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: loginMutation, isPending } = useLogin();
  const { login } = useAuthStore();

  const {
    register: loginForm,
    handleSubmit: loginFormSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(getLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: LoginSchema) => {
    try {
      const res = await loginMutation({ email, password });
      login(res.token);
      router.push("/");
      toast.success(t("success"));
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401) {
          toast.error(t("invalidCredentials"));
        } else {
          toast.error(message || t("error"));
        }
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(t("error"));
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="relative flex flex-1 items-center justify-center px-4 py-12">
        {/* Subtle decorative background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-24 right-0 size-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-24 left-0 size-72 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Card className="relative z-10 w-full max-w-md border-border bg-card shadow-xl shadow-foreground/5">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              {t("title")}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t("description")}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form
              onSubmit={loginFormSubmit(onSubmit)}
              className="grid gap-5"
              noValidate
            >
              {/* Email field */}
              <div className="grid gap-2">
                <Label
                  htmlFor="login-email"
                  className="text-sm font-medium text-foreground"
                >
                  {t("email")}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    data-testid="login-email"
                    type="email"
                    placeholder="name@example.com"
                    {...loginForm("email")}
                    autoComplete="email"
                    required
                    disabled={isPending}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm" data-testid="email-error">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="grid gap-2">
                <Label
                  htmlFor="login-password"
                  className="text-sm font-medium text-foreground"
                >
                  {t("password")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    data-testid="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("enterYourPassword")}
                    {...loginForm("password")}
                    autoComplete="current-password"
                    required
                    disabled={isPending}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={isPending}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    className="text-red-500 text-sm"
                    data-testid="password-error"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                data-testid="login-submit"
                className="w-full"
                size="lg"
              >
                {t("login")}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {t("or")}
                </span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              {t("registerDescription")}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                {t("register")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="py-4 text-center text-xs text-muted-foreground">
        {"UserHub \u00A9 2026. All rights reserved."}
      </footer>
    </div>
  );
}
