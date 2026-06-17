"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleRoutineTaskAction } from "@/lib/actions/routines";
import type { Routine } from "@/types/database";
import { cn } from "@/lib/utils";

export function TodaysRoutineCard({ tasks, dayLabel }: { tasks: Routine[]; dayLabel: string }) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [, startTransition] = useTransition();

  function handleToggle(taskId: string, completed: boolean) {
    setLocalTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed } : task)));

    startTransition(async () => {
      const result = await toggleRoutineTaskAction(taskId, completed);
      if (result.error) {
        setLocalTasks((prev) =>
          prev.map((task) => (task.id === taskId ? { ...task, completed: !completed } : task)),
        );
      }
    });
  }

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="text-base">Today&apos;s routine · {dayLabel}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {localTasks.length === 0 && (
          <p className="text-sm text-muted-foreground">Nothing scheduled today — enjoy the rest day.</p>
        )}
        {localTasks.map((task) => (
          <label
            key={task.id}
            className={cn(
              "flex items-start gap-3 rounded-xl border border-border bg-background/60 px-3 py-3 transition-colors",
              task.completed && "bg-accent/40",
            )}
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) => handleToggle(task.id, checked === true)}
              className="mt-0.5"
            />
            <span className={cn("text-sm", task.completed && "text-muted-foreground line-through")}>
              {task.task}
            </span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}
