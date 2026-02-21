"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password reset is handled by contacting the bakery directly.
    // Backend endpoint not yet implemented.
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-cream via-cream-dark to-flour flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border shadow-xl p-8">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="font-display text-2xl font-bold text-navy">{t("checkYourEmail")}</h2>
              <p className="text-navy/60 text-sm leading-relaxed">
                {t("resetEmailSent", { email })}
              </p>
              <Button asChild className="w-full bg-navy hover:bg-navy-light mt-4">
                <Link href="/login">{t("backToLogin")}</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center space-y-2 mb-8">
                <div className="w-12 h-12 rounded-full bg-sky/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-sky" />
                </div>
                <h1 className="font-display text-3xl font-bold text-navy">{t("forgotPasswordTitle")}</h1>
                <p className="text-navy/60 text-sm">
                  {t("forgotPasswordSubtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-navy font-medium">
                    {t("email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-navy hover:bg-navy-light"
                >
                  {t("sendResetLink")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-navy/60 hover:text-navy transition-colors inline-flex items-center gap-1"
          >
            <ArrowRight className="h-3 w-3 rotate-180" />
            {t("backToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}
