import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-heading font-bold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Sparkles className="size-4" strokeWidth={2.25} />
      </span>
      <span className="text-lg">HairGenie</span>
    </Link>
  );
}
