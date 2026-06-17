"use client";

import { cn } from "@/lib/utils";

export function SegmentedChoice<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; description: string }[];
  value: T | null;
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-xl border px-4 py-3 text-left transition-all",
              selected
                ? "border-primary bg-accent shadow-soft"
                : "border-border bg-card hover:border-primary/40 hover:bg-accent/40",
            )}
          >
            <p className="text-sm font-medium">{option.label}</p>
            <p className="text-xs text-muted-foreground">{option.description}</p>
          </button>
        );
      })}
    </div>
  );
}
