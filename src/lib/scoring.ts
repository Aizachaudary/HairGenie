import type { ProgressLog, Routine } from "@/types/database";

export type HairHealthScore = {
  score: number; // 0-100
  hasLogData: boolean;
  summary: string;
  routineCompletionRate: number; // 0-1
};

export function computeHairHealthScore(
  recentLogs: Pick<ProgressLog, "hair_fall_level" | "frizz_level">[],
  weekRoutine: Pick<Routine, "completed">[],
): HairHealthScore {
  const routineTotal = weekRoutine.length;
  const routineDone = weekRoutine.filter((task) => task.completed).length;
  const routineCompletionRate = routineTotal > 0 ? routineDone / routineTotal : 0;

  if (recentLogs.length === 0) {
    return {
      // Neutral baseline so a brand-new user isn't greeted with a 0 — the
      // score moves up from here as they complete routine tasks and log data.
      score: Math.round(50 + routineCompletionRate * 50),
      hasLogData: false,
      summary: "Log your hair fall and frizz to get a more accurate score",
      routineCompletionRate,
    };
  }

  const avgLevel =
    recentLogs.reduce((sum, log) => sum + log.hair_fall_level + log.frizz_level, 0) /
    (recentLogs.length * 2);

  const metricScore = Math.max(0, 100 - avgLevel * 10);
  const blended =
    routineTotal > 0 ? metricScore * 0.7 + routineCompletionRate * 100 * 0.3 : metricScore;

  return {
    score: Math.round(Math.min(100, Math.max(0, blended))),
    hasLogData: true,
    summary: "Based on your recent logs and routine consistency",
    routineCompletionRate,
  };
}
