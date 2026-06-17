"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert, MailCheck } from "lucide-react";
import { signupAction, type ActionResult } from "@/lib/actions/auth";
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

export function SignupForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (_prevState: ActionResult | Record<string, never>, formData: FormData) =>
      signupAction(formData),
    initialState,
  );

  const succeeded = "success" in state && state.success;
  const needsEmailConfirmation = succeeded && "needsEmailConfirmation" in state && state.needsEmailConfirmation;

  useEffect(() => {
    if (succeeded && !needsEmailConfirmation) {
      router.push("/onboarding");
    }
  }, [succeeded, needsEmailConfirmation, router]);

  if (succeeded) {
    return (
      <Card className="shadow-soft border-border/60 text-center">
        <CardHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <MailCheck className="size-6" />
          </div>
          <CardTitle className="font-heading text-2xl">
            {needsEmailConfirmation ? "Check your email" : "You're all set"}
          </CardTitle>
          <CardDescription>
            {needsEmailConfirmation
              ? "We sent you a confirmation link. Click it to activate your account and start building your hair profile."
              : "Taking you to your hair profile..."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const error = "error" in state ? state.error : null;

  return (
    <Card className="shadow-soft border-border/60">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Create your account</CardTitle>
        <CardDescription>Takes two minutes. Cancel anytime.</CardDescription>
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
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              name="fullName"
              autoComplete="name"
              required
              placeholder="Jordan Lee"
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="At least 8 characters"
            />
          </div>
          <SubmitButton className="w-full">Create account</SubmitButton>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
