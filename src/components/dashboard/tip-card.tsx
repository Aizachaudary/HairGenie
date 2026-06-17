import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TipCard({
  title,
  tip,
  icon: Icon,
}: {
  title: string;
  tip: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="shadow-soft">
      <CardContent className="flex gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Icon className="size-4.5" />
        </span>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{tip}</p>
        </div>
      </CardContent>
    </Card>
  );
}
