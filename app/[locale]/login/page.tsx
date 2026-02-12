"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormField } from "@/components/forms/FormField";
import { useLogin } from "@/lib/hooks/useAuth";

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useLogin();

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
              Welcome Back
            </h1>
            <p className="text-navy/60">
              Sign in to your Easy Bake account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              id="email"
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              icon={Mail}
              autoComplete="email"
              register={register("email")}
              error={errors.email?.message}
            />

            <FormField
              id="password"
              label="Password"
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
                  Forgot password?
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
                  <div className="h-5 w-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-navy/60">
              or
            </span>
          </div>

          {/* Register Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-navy/60">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-sky hover:underline font-semibold"
              >
                Create one
              </Link>
            </p>

            <Button
              asChild
              variant="outline"
              className="w-full"
            >
              <Link href="/">Continue as Guest</Link>
            </Button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-navy/60 hover:text-navy transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
