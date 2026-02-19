"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormField } from "@/components/forms/FormField";
import { useLogin } from "@/lib/hooks/useAuth";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { createLoginSchema, type LoginFormData } from "@/lib/schemas/auth";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useParams<{ locale: string }>();
  const login = useLogin();
  const t = useTranslations();

  // proxy.ts stores the path without locale prefix (e.g. /checkout)
  const redirectPath = searchParams.get('redirect');

  // Validation schema with translated messages
  const loginSchema = createLoginSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data: LoginFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        const destination = redirectPath
          ? `/${locale}${redirectPath}`
          : `/${locale}`;
        router.push(destination);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-cream-dark to-flour flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border shadow-xl p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="font-display text-4xl font-bold text-navy">
              {t('auth.welcomeBack')}
            </h1>
            <p className="text-navy/60">
              {t('auth.loginSubtitle')}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              id="email"
              label={t('auth.email')}
              type="email"
              placeholder="your@email.com"
              icon={Mail}
              autoComplete="email"
              register={register("email")}
              error={errors.email?.message}
            />

            <FormField
              id="password"
              label={t('auth.password')}
              type="password"
              placeholder="••••••••"
              icon={Lock}
              autoComplete="current-password"
              register={register("password")}
              error={errors.password?.message}
              helperText={
                <Link
                  href="/forgot-password"
                  className="text-sm text-sky hover:underline"
                >
                  {t('auth.forgotPassword')}
                </Link>
              }
            />

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-navy hover:bg-navy-light"
              disabled={isSubmitting || login.isPending}
            >
              {login.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('auth.signingIn')}
                </div>
              ) : (
                <>
                  {t('auth.signIn')}
                  <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-4 w-4 rtl:rotate-180" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-navy/60">
              {t('common.or')}
            </span>
          </div>

          {/* Register Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-navy/60">
              {t('auth.noAccount')}{" "}
              <Link
                href="/register"
                className="text-sky hover:underline font-semibold"
              >
                {t('auth.createAccount')}
              </Link>
            </p>

            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link href="/">{t('auth.continueAsGuest')}</Link>
            </Button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-navy/60 hover:text-navy transition-colors inline-flex items-center gap-1"
          >
            <ArrowRight className="h-3 w-3 rotate-180 rtl:rotate-0" />
            {t('auth.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
