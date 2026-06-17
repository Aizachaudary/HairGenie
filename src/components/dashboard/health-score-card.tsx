import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HairHealthScore } from "@/lib/scoring";

export function HealthScoreCard({ score }: { score: HairHealthScore }) {
  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">Hair health score</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div
          className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(var(--primary) ${score.score * 3.6}deg, var(--muted) 0deg)`,
          }}
        >
          <div className="flex size-16 items-center justify-center rounded-full bg-card">
            <span className="font-heading text-xl font-bold">{score.score}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{score.summary}</p>
      </CardContent>
    </Card>
  );
}
