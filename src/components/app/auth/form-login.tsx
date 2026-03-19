'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useNextAuth } from '@/hooks/use-next-auth';
import { useTranslation } from 'react-i18next';

import { getPasswordSchema } from '@/lib/validators';
import { otpStorage } from '@/lib/otp-storage';
import { authService } from '@/services/auth-service';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { CustomButton } from '@/components/custom/custom-button';
import { toast } from 'sonner';
import { CustomInput } from '@/components/custom/custom-input';
import { CustomCheckbox } from '@/components/custom/custom-checkbox';
import Loading from '@/components/custom/custom-loading';
import Image from 'next/image';
import { BackButton } from '@/components/custom/back-button';
import { customSonner } from '@/components/custom/cusrom-sonner';

export default function LoginForm() {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();
  const { login, isLoading } = useNextAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const { t, i18n } = useTranslation('auth');

  const loginSchema = React.useMemo(() => {
    return z.object({
      username: z.string()
        .min(1, { message: t('validation.usernameRequired') })
        .refine((val) => {
          const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
          const isUsername = val.length >= 3;
          return isEmail || isUsername;
        }, { message: t('validation.invalidUsernameOrEmail') }),
      password: getPasswordSchema(),
      remember: z.boolean().catch(false),
    });
  }, [i18n.language, t]);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit' as const,
    reValidateMode: 'onSubmit' as const,
    defaultValues: { username: '', password: '', remember: false },
  });

  type LoginFormValues = z.infer<typeof loginSchema>;

  const lockRef = React.useRef(false);

  async function onSubmit(values: LoginFormValues) {
    if (lockRef.current) return;
    lockRef.current = true;

    try {
      const result = await login(values.username, values.password);

      if (result?.error) {
        if (result.error === 'User not verified') {
          customSonner({
            title: 'Info',
            description: t('login.otpRequired'),
            variant: 'info',
          });
          const otpResult = await authService.resendCode({
            email: values.username,
          });

          if (!otpResult.ok) {
            customSonner({
              title: 'Error',
              description: otpResult.message || t('login.failed'),
              variant: 'destructive',
            });
            return;
          }

          otpStorage.set({
            phone: values.username,
            purpose: 'register',
            tempData: {
              password: values.password,
            },
          });
          router.push('/otp');
          return;
        }

        customSonner({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result?.success) {
        customSonner({
          title: 'Success',
          description: t('login.success'),
          variant: 'success',
        });
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : t('login.failed');
      customSonner({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      // toast.error(errorMessage);
    } finally {
      lockRef.current = false;
    }
  }

  return (
    <>
      <Loading loading={form.formState.isSubmitting || isLoading || googleLoading} />
      <div className="mx-auto w-full max-w-sm">
        <h1 className="mb-2 text-4xl font-bold text-[#238C98]">
          {t('login.title')}
        </h1>
        <div className="mb-6 text-[#1A5F6A]">
          {t('login.subtitle')}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email or Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="username" className="text-[#5C6169]">
                    {t('login.username')}
                  </Label>
                  <FormControl>
                    <CustomInput
                      id="username"
                      type="text"
                      placeholder="joyer@example.com"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password" className="text-[#5C6169]">
                    {t('login.password')}
                  </Label>
                  <div className="relative">
                    <FormControl>
                      <CustomInput
                        id="password"
                        type={showPw ? 'text' : 'password'}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPw(v => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                    >
                      {showPw ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember + Forgot password */}
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <CustomCheckbox
                      id="remember"
                      checked={field.value as boolean}
                      onCheckedChange={(checked) => field.onChange(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="font-normal">
                      {t('login.remember')}
                    </Label>
                  </div>
                )}
              />
              <CustomButton variant="link">
                <Link href="/forgot-password">{t('login.forgotPassword')}</Link>
              </CustomButton>
            </div>

            {/* Submit */}
            <CustomButton
              variant="default"
              type="submit"
              className="mt-6 w-full font-semibold"
              disabled={form.formState.isSubmitting || lockRef.current || isLoading}
            >
              {form.formState.isSubmitting || isLoading ? 'Processing...' : t('login.loginButton')}
            </CustomButton>


          </form>
        </Form>

        <div className="mt-4 text-center text-base text-[#1A5F6A]">
          {t('login.noAccount')}{' '}
          <CustomButton variant="link" className="p-1 text-base">
            <Link href="/register">{t('login.signUp')}</Link>
          </CustomButton>
        </div>
      </div>
    </>
  );
}
