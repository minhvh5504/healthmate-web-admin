"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useNextAuth } from "@/hooks/use-next-auth";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import { getPasswordSchema } from "@/lib/validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CustomInput } from "@/components/custom/custom-input";
import Loading from "@/components/custom/custom-loading";
import { customSonner } from "@/components/custom/custom-sonner";

export default function LoginForm() {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();
  const { login, isLoading } = useNextAuth();
  const { t } = useTranslation(["auth", "common", "validation"]);

  const loginSchema = React.useMemo(() => {
    return z.object({
      username: z
        .string()
        .min(1, { message: t("validation:usernameRequired") }),
      password: getPasswordSchema(),
    });
  }, [t]);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const result = await login(values.username, values.password);

      if (result?.error) {
        customSonner({
          title: t("common:status.error"),
          description: result.error,
          variant: "destructive",
        });
      } else if (result?.success) {
        customSonner({
          title: t("common:status.success"),
          description: t("auth:login.success"),
          variant: "success",
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : t("auth:login.failed");
      customSonner({
        title: t("common:status.error"),
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Loading loading={form.formState.isSubmitting || isLoading} />

      <div className="flex w-full flex-col items-center">
        {/* Logo Section - Premium Presentation */}
        <div className="mb-10 flex w-full justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
            <Image
              className="relative"
              src="/logo.svg"
              alt="Health Mate Logo"
              width={64}
              height={64}
              priority
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-10 w-full text-center">
          <h1 className="mb-3 text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-500">
            Health Mate
          </h1>
          <p className="text-[15px] font-medium text-slate-400">
            {t("auth:login.subtitle")}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            {/* Email Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <Label
                    htmlFor="username"
                    className="text-[13px] font-bold text-slate-600"
                  >
                    {t("auth:login.username")}
                  </Label>
                  <FormControl>
                    <div className="relative group w-full">
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-500 transition-colors"
                        size={18}
                      />
                      <CustomInput
                        id="username"
                        type="text"
                        placeholder={t("auth:login.username")}
                        className="h-14 pl-12 pr-4 rounded-2xl border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/20 transition-all text-[15px] placeholder:text-slate-300 autofill:shadow-[0_0_0_1000px_white_inset]"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-[13px] font-bold text-slate-600"
                  >
                    {t("auth:login.password")}
                  </Label>
                  <FormControl>
                    <div className="relative group w-full">
                      <Lock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-500 transition-colors"
                        size={18}
                      />
                      <CustomInput
                        id="password"
                        type={showPw ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-14 pl-12 pr-12 rounded-2xl border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF]/20 transition-all text-[15px] placeholder:text-slate-300 autofill:shadow-[0_0_0_1000px_white_inset]"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                      >
                        {showPw ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Login Button */}
            <div className="pt-4">
              <Button
                variant="default"
                type="submit"
                className="h-14 w-full rounded-2xl bg-[#007BFF] text-[16px] font-bold text-white hover:bg-[#0069d9] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20"
                disabled={form.formState.isSubmitting || isLoading}
              >
                {t("auth:login.loginButton")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
