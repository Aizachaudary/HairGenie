import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";

export const metadata: Metadata = {
  title: "Build your hair profile",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("user_id", user!.id)
    .maybeSingle();

  return <OnboardingWizard initialFullName={profile?.full_name ?? ""} />;
}
