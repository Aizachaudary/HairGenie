import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Reset password",
};

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Card className="shadow-soft border-border/60 text-center">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Link expired</CardTitle>
          <CardDescription>
            This password reset link is invalid or has expired.{" "}
            <Link href="/forgot-password" className="font-medium text-primary hover:underline">
              Request a new one
            </Link>
            .
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return <ResetPasswordForm />;
}
