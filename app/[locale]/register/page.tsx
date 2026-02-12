"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Phone, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormField } from "@/components/forms/FormField";
import { useRegister } from "@/lib/hooks/useAuth";

// Validation schema
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    phone: z.string().optional(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();

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
              Join Easy Bake
            </h1>
            <p className="text-navy/60">
              Create your account and start shopping
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              id="name"
              label="Full Name"
              type="text"
              placeholder="John Doe"
              icon={User}
              autoComplete="name"
              register={registerField("name")}
              error={errors.name?.message}
            />

            <FormField
              id="email"
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              icon={Mail}
              autoComplete="email"
              register={registerField("email")}
              error={errors.email?.message}
            />

            <FormField
              id="phone"
              label="Phone Number (Optional)"
              type="tel"
              placeholder="+973 XXXX XXXX"
              icon={Phone}
              autoComplete="tel"
              register={registerField("phone")}
              error={errors.phone?.message}
            />

            <FormField
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              autoComplete="new-password"
              register={registerField("password")}
              error={errors.password?.message}
            />

            <FormField
              id="password_confirmation"
              label="Confirm Password"
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
                  <div className="h-5 w-5 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <>
                  Create Account
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

          {/* Login Link */}
          <div className="text-center space-y-4">
            <p className="text-sm text-navy/60">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-sky hover:underline font-semibold"
              >
                Sign in
              </Link>
            </p>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">Continue as Guest</Link>
            </Button>
          </div>

          {/* Terms */}
          <p className="text-xs text-navy/50 text-center mt-6">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-navy">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-navy">
              Privacy Policy
            </Link>
          </p>
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
