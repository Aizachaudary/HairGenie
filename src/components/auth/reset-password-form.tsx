"use client";

import { useActionState } from "react";
import { CircleAlert } from "lucide-react";
import { resetPasswordAction, type ActionResult } from "@/lib/actions/auth";
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

export function ResetPasswordForm() {
  const [state, formAction] = useActionState(
    async (_prevState: ActionResult | Record<string, never>, formData: FormData) =>
      resetPasswordAction(formData),
    initialState,
  );

  const error = "error" in state ? state.error : null;

  return (
    <Card className="shadow-soft border-border/60">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Set a new password</CardTitle>
        <CardDescription>Choose a strong password you haven&apos;t used before.</CardDescription>
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
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="At least 8 characters"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Re-enter your password"
            />
          </div>
          <SubmitButton className="w-full">Update password</SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
