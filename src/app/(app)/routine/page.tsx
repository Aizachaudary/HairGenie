import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureWeeklyRoutine } from "@/lib/routines/ensure";
import { WeekGrid } from "@/components/routine/week-grid";
import { CompletionTracker } from "@/components/routine/completion-tracker";
import { RemindersToggle } from "@/components/routine/reminders-toggle";
import { HairMyths } from "@/components/routine/hair-myths";

export const metadata: Metadata = {
  title: "Routine",
};

export default async function RoutinePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user!.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!profile) {
    notFound();
  }

  const routine = await ensureWeeklyRoutine(supabase, userId, profile);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Your routine</h1>
        <p className="mt-1 text-muted-foreground">
          Built around your hair profile, Monday through Sunday.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CompletionTracker routine={routine} />
        </div>
        <RemindersToggle initialEnabled={profile.reminders_enabled} />
      </div>

      <WeekGrid routine={routine} />

      <HairMyths />
    </div>
  );
}
