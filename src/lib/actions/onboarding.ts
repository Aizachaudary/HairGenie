"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { onboardingSchema, type OnboardingInput } from "@/lib/validations/onboarding";
import { ensureWeeklyRoutine } from "@/lib/routines/ensure";

export type OnboardingActionResult = { error: string } | { success: true };

export async function completeOnboardingAction(
  input: OnboardingInput,
): Promise<OnboardingActionResult> {
  const parsed = onboardingSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your answers" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session expired. Please log in again." };
  }

  const {
    fullName,
    hairType,
    hairCondition,
    scalpCondition,
    concerns,
    sleepQuality,
    stressLevel,
    location,
    waterType,
  } = parsed.data;

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      hair_type: hairType,
      hair_condition: hairCondition,
      scalp_condition: scalpCondition,
      concerns,
      sleep_quality: sleepQuality,
      stress_level: stressLevel,
      location,
      water_type: waterType,
      onboarding_completed: true,
    })
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  await ensureWeeklyRoutine(supabase, user.id, {
    hair_type: hairType,
    hair_condition: hairCondition,
    scalp_condition: scalpCondition,
    concerns,
  });

  redirect("/dashboard");
}
