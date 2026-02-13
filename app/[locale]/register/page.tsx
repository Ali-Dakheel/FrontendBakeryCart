"use client";

import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormField } from "@/components/forms/FormField";
import { useRegister } from "@/lib/hooks/useAuth";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { createRegisterSchema, type RegisterFormData } from "@/lib/schemas/auth";

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();
  const t = useTranslations();

  // Validation schema with translated messages
  const registerSchema = createRegisterSchema(t);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    register.mutate(data, {
      onSuccess: () => {
        router.push("/");
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
              {t('auth.joinEasyBake')}
            </h1>
            <p className="text-navy/60">
              {t('auth.registerSubtitle')}
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              id="name"
              label={t('auth.fullName')}
              type="text"
              placeholder="John Doe"
              icon={User}
              autoComplete="name"
              register={registerField("name")}
              error={errors.name?.message}
            />

            <FormField
              id="email"
              label={t('auth.email')}
              type="email"
              placeholder="your@email.com"
              icon={Mail}
              autoComplete="email"
              register={registerField("email")}
              error={errors.email?.message}
            />

            <FormField
              id="phone"
              label={t('auth.phone')}
              type="tel"
              placeholder="+973 XXXX XXXX"
              icon={Phone}
              autoComplete="tel"
              register={registerField("phone")}
              error={errors.phone?.message}
            />

            <FormField
              id="password"
              label={t('auth.password')}
              type="password"
              placeholder="••••••••"
              icon={Lock}
              autoComplete="new-password"
              register={registerField("password")}
              error={errors.password?.message}
            />

            <FormField
              id="password_confirmation"
              label={t('auth.confirmPassword')}
              type="password"
              placeholder="••••••••"
              icon={Lock}
              autoComplete="new-password"
              register={registerField("password_confirmation")}
              error={errors.password_confirmation?.message}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-navy hover:bg-navy-light mt-6"
              disabled={isSubmitting || register.isPending}
            >
              {register.isPending ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t('auth.creatingAccount')}
                </div>
              ) : (
                <>
                  {t('auth.createAccount')}
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

          {/* Login Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-navy/60">
              {t('auth.haveAccount')}{" "}
              <Link
                href="/login"
                className="text-sky hover:underline font-semibold"
              >
                {t('auth.signIn')}
              </Link>
            </p>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">{t('auth.continueAsGuest')}</Link>
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-navy/50 text-center mt-6">
            {t('auth.termsAgreement')}{" "}
            <Link href="/terms" className="underline hover:text-navy">
              {t('auth.terms')}
            </Link>{" "}
            {t('common.and')}{" "}
            <Link href="/privacy" className="underline hover:text-navy">
              {t('auth.privacy')}
            </Link>
          </p>
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
