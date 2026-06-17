"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { progressLogSchema } from "@/lib/validations/progress";

export async function logProgressAction(
  formData: FormData,
): Promise<{ error: string } | { success: true }> {
  const parsed = progressLogSchema.safeParse({
    hairFallLevel: formData.get("hairFallLevel"),
    frizzLevel: formData.get("frizzLevel"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Your session expired. Please log in again." };
  }

  const { hairFallLevel, frizzLevel } = parsed.data;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const { data: existingRows } = await supabase
    .from("progress_logs")
    .select("id")
    .eq("user_id", user.id)
    .gte("logged_at", startOfToday.toISOString())
    .order("logged_at", { ascending: false })
    .limit(1);

  const existing = existingRows?.[0];

  const { error } = existing
    ? await supabase
        .from("progress_logs")
        .update({
          hair_fall_level: hairFallLevel,
          frizz_level: frizzLevel,
          logged_at: new Date().toISOString(),
        })
        .eq("id", existing.id)
    : await supabase.from("progress_logs").insert({
        user_id: user.id,
        hair_fall_level: hairFallLevel,
        frizz_level: frizzLevel,
      });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/progress");
  revalidatePath("/dashboard");
  return { success: true };
}
