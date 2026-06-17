import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DAY_LABELS } from "@/lib/routines/week";
import type { Routine } from "@/types/database";
import { cn } from "@/lib/utils";

export function CompletionTracker({ routine }: { routine: Routine[] }) {
  const total = routine.length;
  const done = routine.filter((task) => task.completed).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">This week&apos;s completion</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="font-heading text-2xl font-bold">
            {done}/{total}
          </span>
          <span className="text-sm text-muted-foreground">tasks done</span>
        </div>
        <Progress value={percent} />
        <div className="flex justify-between gap-1">
          {DAY_LABELS.map((label, index) => {
            const dayTasks = routine.filter((task) => task.day_of_week === index);
            const dayDone = dayTasks.length > 0 && dayTasks.every((task) => task.completed);

            return (
              <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-xs font-medium",
                    dayDone
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {label[0]}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
