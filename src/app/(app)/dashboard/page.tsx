import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CloudDrizzle, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ensureWeeklyRoutine } from "@/lib/routines/ensure";
import { DAY_LABELS, getTodayDayIndex } from "@/lib/routines/week";
import { computeHairHealthScore } from "@/lib/scoring";
import { getClimateTip, getDailyTip } from "@/lib/content/tips";
import { GreetingHeader } from "@/components/dashboard/greeting-header";
import { ReminderBanner } from "@/components/dashboard/reminder-banner";
import { HealthScoreCard } from "@/components/dashboard/health-score-card";
import { TodaysRoutineCard } from "@/components/dashboard/todays-routine-card";
import { WeekProgressCard } from "@/components/dashboard/week-progress-card";
import { TodayProgressCard } from "@/components/dashboard/today-progress-card";
import { TipCard } from "@/components/dashboard/tip-card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // `(app)/layout.tsx` already guarantees an authenticated, onboarded user.
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
  const todayIndex = getTodayDayIndex();
  const todayTasks = routine.filter((task) => task.day_of_week === todayIndex);

  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const { data: recentLogs } = await supabase
    .from("progress_logs")
    .select("hair_fall_level, frizz_level, logged_at")
    .eq("user_id", userId)
    .gte("logged_at", fourteenDaysAgo.toISOString())
    .order("logged_at", { ascending: false });

  const logs = recentLogs ?? [];
  const healthScore = computeHairHealthScore(logs, routine);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const loggedToday = logs.some((log) => new Date(log.logged_at) >= startOfToday);
  const latestLog = logs[0] ?? null;

  const firstName = (profile.full_name ?? "there").split(" ")[0] || "there";
  const hasUnfinishedToday = todayTasks.some((task) => !task.completed);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <GreetingHeader name={firstName} />

      {profile.reminders_enabled && hasUnfinishedToday && <ReminderBanner />}

      <div className="grid gap-6 lg:grid-cols-3">
        <HealthScoreCard score={healthScore} />
        <TodayProgressCard loggedToday={loggedToday} latestLog={latestLog} />
        <WeekProgressCard routine={routine} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TodaysRoutineCard tasks={todayTasks} dayLabel={DAY_LABELS[todayIndex]} />
        <div className="space-y-6">
          <TipCard title="Daily hair tip" tip={getDailyTip()} icon={Sparkles} />
          <TipCard
            title="Water & climate tip"
            tip={getClimateTip(profile.water_type)}
            icon={CloudDrizzle}
          />
        </div>
      </div>
    </div>
  );
}
