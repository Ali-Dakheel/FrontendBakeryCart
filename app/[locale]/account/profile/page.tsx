"use client";

import { useState } from "react";
import { Mail, User, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountLayout } from "@/components/account/AccountLayout";
import { useUser, useChangePassword } from "@/lib/hooks/useAuth";
import { useTranslations } from "next-intl";

export default function ProfilePage() {
  const t = useTranslations();
  const { data: user, isLoading } = useUser();
  const changePassword = useChangePassword();

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.password !== passwordForm.password_confirmation) {
      return;
    }
    changePassword.mutate(passwordForm, {
      onSuccess: () => {
        setPasswordForm({
          current_password: "",
          password: "",
          password_confirmation: "",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <AccountLayout>
        <div className="space-y-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </AccountLayout>
    );
  }

  if (!user) {
    return (
      <AccountLayout>
        <div className="bg-white rounded-lg border border-border p-8 text-center">
          <p className="text-navy/60">{t("profile.loginRequired")}</p>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout>
      <div className="space-y-6">
        {/* Profile Information */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            {t("profile.personalInfo")}
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("auth.fullName")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
                <Input value={user.name} disabled className="pl-10 bg-cream-dark" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("auth.email")}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
                <Input value={user.email} disabled className="pl-10 bg-cream-dark" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("auth.phone")}</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
                <Input
                  value={user.phone || "Not provided"}
                  disabled
                  className="pl-10 bg-cream-dark"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-navy/50 mt-4">
            {t("profile.contactSupport")}
          </p>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            {t("profile.changePassword")}
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_password">{t("profile.currentPassword")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
                <Input
                  id="current_password"
                  type="password"
                  value={passwordForm.current_password}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      current_password: e.target.value,
                    })
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_password">{t("profile.newPassword")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
                <Input
                  id="new_password"
                  type="password"
                  value={passwordForm.password}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, password: e.target.value })
                  }
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">{t("profile.confirmNewPassword")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
                <Input
                  id="confirm_password"
                  type="password"
                  value={passwordForm.password_confirmation}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      password_confirmation: e.target.value,
                    })
                  }
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
              {passwordForm.password &&
                passwordForm.password_confirmation &&
                passwordForm.password !== passwordForm.password_confirmation && (
                  <p className="text-xs text-red-600">{t("profile.passwordMismatch")}</p>
                )}
            </div>
            <Button
              type="submit"
              className="bg-navy hover:bg-navy-light"
              disabled={
                changePassword.isPending ||
                passwordForm.password !== passwordForm.password_confirmation
              }
            >
              {changePassword.isPending ? t("profile.updating") : t("profile.updatePassword")}
            </Button>
          </form>
        </div>
      </div>
    </AccountLayout>
  );
}
