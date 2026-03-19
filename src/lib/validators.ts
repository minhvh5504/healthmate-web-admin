import { z } from 'zod';
import i18nInstance from '@/locale/i18n';

/* Helpers */
export const onlyDigits = (v: string) => String(v ?? '').replace(/\D/g, '');
export const formatPhonePretty = (raw: string) => {
  const d = onlyDigits(raw).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
};

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/* Schema factories - tạo schema động theo ngôn ngữ hiện tại */
export const getNameSchema = () => z
  .string()
  .min(2, { message: i18nInstance.t('validation:name.tooShort') })
  .max(60, { message: i18nInstance.t('validation:name.tooLong') });

export const getEmailSchema = () => z
  .string()
  .email({ message: i18nInstance.t('validation:email.invalid') });

export const getPasswordSchema = () => z
  .string()
  .regex(/^\S*$/, { message: i18nInstance.t('validation:password.noWhitespace') })
  .min(8, { message: i18nInstance.t('validation:password.minLength') })
  .max(72, { message: i18nInstance.t('validation:password.tooLong') })
  .regex(/[a-z]/, { message: i18nInstance.t('validation:password.requireLowercase') })
  .regex(/[A-Z]/, { message: i18nInstance.t('validation:password.requireUppercase') })
  .regex(/\d/, { message: i18nInstance.t('validation:password.requireNumber') })
  .regex(/[^A-Za-z0-9]/, { message: i18nInstance.t('validation:password.requireSpecial') });

export const getPhoneSchema = () => z
  .string()
  .min(9, { message: i18nInstance.t('validation:phone.minLength') })
  .max(20, { message: i18nInstance.t('validation:phone.tooLong') })
  .refine(v => {
    const d = onlyDigits(v);
    return d.length >= 9 && d.length <= 11;
  }, { message: i18nInstance.t('validation:phone.invalidDigits') })
  .refine(v => /^(0|84)/.test(onlyDigits(v)), { message: i18nInstance.t('validation:phone.invalidPrefix') });

export const getOtpSchema = () => z
  .string()
  .min(6, { message: i18nInstance.t('validation:otp.length') })
  .max(6, { message: i18nInstance.t('validation:otp.length') })
  .regex(/^\d+$/, { message: i18nInstance.t('validation:otp.digitsOnly') });

export const getConfirmPasswordSchemaConfirm = () => z
  .object({
    password: getPasswordSchema(),
    confirm: z.string(),
  })
  .refine(d => d.password === d.confirm, {
    path: ['confirm'],
    message: i18nInstance.t('validation:password.notMatch'),
  });

export const getConfirmPasswordSchemaConfirmPassword = () => z
  .object({
    password: getPasswordSchema(),
    confirmPassword: z.string(),
  })
  .refine(d => d.password === d.confirmPassword, {
    path: ['confirmPassword'],
    message: i18nInstance.t('validation:password.notMatch'),
  });

/* Legacy exports - giữ lại cho backward compatibility */
export const nameSchema = getNameSchema();
export const emailSchema = getEmailSchema();
export const passwordSchema = getPasswordSchema();
export const phoneSchema = getPhoneSchema();
export const otpSchema = getOtpSchema();
export const confirmPasswordSchemaConfirm = getConfirmPasswordSchemaConfirm();
export const confirmPasswordSchemaConfirmPassword = getConfirmPasswordSchemaConfirmPassword();

export function confirmPasswordByKey(
  key: 'confirm' | 'confirmPassword',
  msg?: string
) {
  const base = z.object({ password: getPasswordSchema(), [key]: z.string() } as const);
  return base.superRefine((data, ctx) => {
    const ok =
      (data as Record<'password' | typeof key, string>).password ===
      (data as Record<string, string>)[key];
    if (!ok) ctx.addIssue({ 
      code: z.ZodIssueCode.custom, 
      path: [key], 
      message: msg || i18nInstance.t('validation:password.notMatch')
    });
  });
}
