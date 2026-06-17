import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function TodayProgressCard({
  loggedToday,
  latestLog,
}: {
  loggedToday: boolean;
  latestLog: { hair_fall_level: number; frizz_level: number } | null;
}) {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">Today&apos;s progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loggedToday && latestLog ? (
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-muted-foreground">Hair fall</p>
              <p className="font-heading text-lg font-semibold">{latestLog.hair_fall_level}/10</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Frizz</p>
              <p className="font-heading text-lg font-semibold">{latestLog.frizz_level}/10</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">You haven&apos;t logged today yet.</p>
        )}
        <Button asChild size="sm" variant="outline" className="w-full">
          <Link href="/progress">{loggedToday ? "Update today's log" : "Log today"}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
