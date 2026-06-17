import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProgressLog } from "@/types/database";

export function RecentEntries({ logs }: { logs: ProgressLog[] }) {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">Recent entries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No entries yet — log today&apos;s metrics to get started.
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
            >
              <span className="text-muted-foreground">
                {format(new Date(log.logged_at), "MMM d, yyyy")}
              </span>
              <div className="flex gap-4">
                <span>
                  Hair fall <strong>{log.hair_fall_level}</strong>
                </span>
                <span>
                  Frizz <strong>{log.frizz_level}</strong>
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
