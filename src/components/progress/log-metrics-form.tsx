"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { logProgressAction } from "@/lib/actions/progress";

export function LogMetricsForm({
  initialHairFall,
  initialFrizz,
}: {
  initialHairFall: number;
  initialFrizz: number;
}) {
  const [hairFall, setHairFall] = useState(initialHairFall);
  const [frizz, setFrizz] = useState(initialFrizz);
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("hairFallLevel", String(hairFall));
      formData.set("frizzLevel", String(frizz));
      const result = await logProgressAction(formData);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Today's log saved");
    });
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">Log today</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Hair fall</Label>
            <span className="text-sm font-medium text-muted-foreground">{hairFall}/10</span>
          </div>
          <Slider
            value={[hairFall]}
            max={10}
            step={1}
            onValueChange={([value]) => setHairFall(value)}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Frizz</Label>
            <span className="text-sm font-medium text-muted-foreground">{frizz}/10</span>
          </div>
          <Slider value={[frizz]} max={10} step={1} onValueChange={([value]) => setFrizz(value)} />
        </div>
        <Button type="button" onClick={handleSubmit} disabled={isPending} className="w-full gap-1.5">
          {isPending ? <Loader2 className="size-4 animate-spin" /> : "Save today's log"}
        </Button>
      </CardContent>
    </Card>
  );
}
