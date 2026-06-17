import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Routine } from "@/types/database";

export function WeekProgressCard({ routine }: { routine: Routine[] }) {
  const total = routine.length;
  const done = routine.filter((task) => task.completed).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">This week</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="font-heading text-2xl font-bold">
            {done}/{total}
          </span>
          <span className="text-sm text-muted-foreground">tasks done</span>
        </div>
        <Progress value={percent} />
      </CardContent>
    </Card>
  );
}
