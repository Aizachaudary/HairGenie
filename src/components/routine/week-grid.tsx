"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toggleRoutineTaskAction } from "@/lib/actions/routines";
import { DAY_LABELS, getTodayDayIndex } from "@/lib/routines/week";
import type { Routine } from "@/types/database";
import { cn } from "@/lib/utils";

export function WeekGrid({ routine }: { routine: Routine[] }) {
  const [tasks, setTasks] = useState(routine);
  const [, startTransition] = useTransition();
  const todayIndex = getTodayDayIndex();

  function handleToggle(taskId: string, completed: boolean) {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed } : task)));

    startTransition(async () => {
      const result = await toggleRoutineTaskAction(taskId, completed);
      if (result.error) {
        setTasks((prev) =>
          prev.map((task) => (task.id === taskId ? { ...task, completed: !completed } : task)),
        );
      }
    });
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {DAY_LABELS.map((label, index) => {
        const dayTasks = tasks.filter((task) => task.day_of_week === index);
        const isToday = index === todayIndex;

        return (
          <Card key={label} className={cn("shadow-soft", isToday && "border-primary")}>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-heading text-sm font-semibold">{label}</p>
                {isToday && <span className="text-xs font-medium text-primary">Today</span>}
              </div>
              {dayTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">Rest day</p>
              ) : (
                <div className="space-y-2">
                  {dayTasks.map((task) => (
                    <label key={task.id} className="flex items-start gap-2 text-sm">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={(checked) => handleToggle(task.id, checked === true)}
                        className="mt-0.5"
                      />
                      <span className={cn(task.completed && "text-muted-foreground line-through")}>
                        {task.task}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
