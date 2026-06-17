import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Routine } from "@/types/database";
import { generateWeeklyRoutine } from "@/lib/routines/generate";
import { getCurrentWeekStart } from "@/lib/routines/week";

type RoutineProfile = Parameters<typeof generateWeeklyRoutine>[0];

/**
 * Returns this week's routine tasks for the user, generating and inserting
 * them from the profile on first visit of the week. Never overwrites
 * existing rows, so completed checkmarks persist for the rest of the week.
 */
export async function ensureWeeklyRoutine(
  supabase: SupabaseClient<Database>,
  userId: string,
  profile: RoutineProfile,
): Promise<Routine[]> {
  const weekStartDate = getCurrentWeekStart();

  const { data: existing } = await supabase
    .from("routines")
    .select("*")
    .eq("user_id", userId)
    .eq("week_start_date", weekStartDate)
    .order("day_of_week", { ascending: true });

  if (existing && existing.length > 0) {
    return existing;
  }

  const generated = generateWeeklyRoutine(profile).map((task) => ({
    ...task,
    user_id: userId,
    week_start_date: weekStartDate,
  }));

  const { data: inserted, error } = await supabase.from("routines").insert(generated).select("*");

  if (error || !inserted) {
    return [];
  }

  return inserted.sort((a, b) => a.day_of_week - b.day_of_week);
}
