"use client";

import { useState } from "react";
import { Mail, User, Phone, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountLayout } from "@/components/account/AccountLayout";
import { useUser, useChangePassword } from "@/lib/hooks/useAuth";

export default function ProfilePage() {
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
          <p className="text-navy/60">Please log in to view your profile</p>
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
            Profile Information
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
                <Input value={user.name} disabled className="pl-10 bg-cream-dark" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-navy/40" />
                <Input value={user.email} disabled className="pl-10 bg-cream-dark" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
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
            To update your profile information, please contact support.
          </p>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="font-display text-2xl font-bold text-navy mb-6">
            Change Password
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_password">Current Password</Label>
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
              <Label htmlFor="new_password">New Password</Label>
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
              <Label htmlFor="confirm_password">Confirm New Password</Label>
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
                  <p className="text-xs text-red-600">Passwords do not match</p>
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
              {changePassword.isPending ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </AccountLayout>
  );
}
