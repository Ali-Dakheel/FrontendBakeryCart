/**
 * Authentication Schemas
 * Base validation schemas for authentication forms
 *
 * These schemas provide the base validation logic without translations,
 * making them reusable and testable. Components apply translations using
 * the schema factory functions.
 */

import { z } from "zod";

/**
 * Base login schema (no translations)
 * Reusable for API calls, tests, and server actions
 */
export const loginBaseSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).min(6),
});

/**
 * Base register schema (no translations)
 * Reusable for API calls, tests, and server actions
 */
export const registerBaseSchema = z
  .object({
    name: z.string().min(1).min(2),
    email: z.string().min(1).email(),
    phone: z.string().optional(),
    password: z.string().min(1).min(8),
    password_confirmation: z.string().min(1),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
  });

/**
 * Type exports
 */
export type LoginFormData = z.infer<typeof loginBaseSchema>;
export type RegisterFormData = z.infer<typeof registerBaseSchema>;

/**
 * Schema factory with translations
 * Use these in components to get schemas with localized error messages
 */
export function createLoginSchema(t: (key: string) => string) {
  return z.object({
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .email(t('validation.emailInvalid')),
    password: z
      .string()
      .min(1, t('validation.passwordRequired'))
      .min(6, t('validation.passwordMinLogin')),
  });
}

export function createRegisterSchema(t: (key: string) => string) {
  return z
    .object({
      name: z
        .string()
        .min(1, t('validation.nameRequired'))
        .min(2, t('validation.nameMin')),
      email: z
        .string()
        .min(1, t('validation.emailRequired'))
        .email(t('validation.emailInvalid')),
      phone: z.string().optional(),
      password: z
        .string()
        .min(1, t('validation.passwordRequired'))
        .min(8, t('validation.passwordMinRegister')),
      password_confirmation: z.string().min(1, t('validation.passwordConfirmRequired')),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t('validation.passwordsNoMatch'),
      path: ["password_confirmation"],
    });
}
