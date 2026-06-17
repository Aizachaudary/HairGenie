"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, CircleAlert, MailCheck } from "lucide-react";
import { forgotPasswordAction, type ActionResult } from "@/lib/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SubmitButton } from "@/components/auth/submit-button";

const initialState: ActionResult | Record<string, never> = {};

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(
    async (_prevState: ActionResult | Record<string, never>, formData: FormData) =>
      forgotPasswordAction(formData),
    initialState,
  );

  if ("success" in state && state.success) {
    return (
      <Card className="shadow-soft border-border/60 text-center">
        <CardHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <MailCheck className="size-6" />
          </div>
          <CardTitle className="font-heading text-2xl">Check your inbox</CardTitle>
          <CardDescription>
            If an account exists for that email, we&apos;ve sent a link to reset your password.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const error = "error" in state ? state.error : null;

  return (
    <Card className="shadow-soft border-border/60">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Reset your password</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a reset link.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <CircleAlert className="size-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <SubmitButton className="w-full">Send reset link</SubmitButton>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            <ArrowLeft className="size-3.5" /> Back to login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
