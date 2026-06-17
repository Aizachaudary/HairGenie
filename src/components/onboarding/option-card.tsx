"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function OptionCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
}: {
  label: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "relative flex flex-col gap-2 rounded-2xl border p-4 text-left transition-all",
        selected
          ? "border-primary bg-accent shadow-soft"
          : "border-border bg-card hover:border-primary/40 hover:bg-accent/40",
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" strokeWidth={3} />
        </span>
      )}
      {Icon && (
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-lg",
            selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          <Icon className="size-4.5" />
        </span>
      )}
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </button>
  );
}
