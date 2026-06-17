"use client";

import { format } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProgressLog } from "@/types/database";

export function TrendChart({ logs }: { logs: ProgressLog[] }) {
  if (logs.length < 2) {
    return (
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Log a few more entries to see your trend line.
          </p>
        </CardContent>
      </Card>
    );
  }

  const data = [...logs]
    .sort((a, b) => new Date(a.logged_at).getTime() - new Date(b.logged_at).getTime())
    .map((log) => ({
      date: format(new Date(log.logged_at), "MMM d"),
      hairFall: log.hair_fall_level,
      frizz: log.frizz_level,
    }));

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">Trends</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="hairFall"
              name="Hair fall"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="frizz"
              name="Frizz"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
