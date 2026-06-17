import { Progress } from "@/components/ui/progress";

export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>
          Step {step} of {total}
        </span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <Progress value={(step / total) * 100} />
    </div>
  );
}
