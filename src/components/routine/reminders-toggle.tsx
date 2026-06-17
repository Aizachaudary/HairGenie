"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toggleRemindersAction } from "@/lib/actions/routines";

export function RemindersToggle({ initialEnabled }: { initialEnabled: boolean }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [, startTransition] = useTransition();

  function handleChange(checked: boolean) {
    setEnabled(checked);
    startTransition(async () => {
      const result = await toggleRemindersAction(checked);
      if (result.error) {
        setEnabled(!checked);
        toast.error(result.error);
      }
    });
  }

  return (
    <Card className="shadow-soft">
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <Label htmlFor="reminders" className="text-sm font-medium">
            Daily reminders
          </Label>
          <p className="mt-1 text-sm text-muted-foreground">
            Get a nudge on your dashboard if today&apos;s routine isn&apos;t finished yet.
          </p>
        </div>
        <Switch id="reminders" checked={enabled} onCheckedChange={handleChange} />
      </CardContent>
    </Card>
  );
}
