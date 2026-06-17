import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const todayTasks = [
  { label: "Scalp massage + oiling", done: true },
  { label: "Sulfate-free cleanse", done: true },
  { label: "Leave-in + diffuse dry", done: false },
];

function HeroVisual() {
  return (
    <div className="shadow-soft-lg relative rounded-3xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Good morning, Maya</p>
          <p className="font-heading text-lg font-semibold">Today&apos;s routine</p>
        </div>
        <div
          className="relative flex size-20 items-center justify-center rounded-full"
          style={{ background: "conic-gradient(var(--primary) 295deg, var(--muted) 0deg)" }}
        >
          <div className="flex size-16 flex-col items-center justify-center rounded-full bg-card">
            <span className="font-heading text-xl font-bold">82</span>
            <span className="text-[10px] text-muted-foreground">score</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {todayTasks.map((task) => (
          <div
            key={task.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-3 py-2.5"
          >
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                task.done
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-transparent"
              }`}
            >
              ✓
            </span>
            <span className={`text-sm ${task.done ? "text-muted-foreground line-through" : ""}`}>
              {task.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-secondary px-4 py-3">
        <span className="text-sm font-medium text-secondary-foreground">Frizz level, 4 weeks</span>
        <span className="text-sm font-semibold text-primary">↓ 31%</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="bg-rose-glow relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <Sparkles className="size-3.5 text-primary" />
            Personalized in under 3 minutes
          </div>
          <h1 className="text-balance mt-6 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your hair, <span className="text-primary">decoded</span> — then taken care of.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            HairGenie builds a routine around your actual hair type, scalp, and lifestyle —
            then tracks what&apos;s working with real photos and real data, not guesswork.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" asChild className="shadow-soft-lg">
              <Link href="/signup">
                Get your hair profile <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">No credit card required · Free to start</p>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
