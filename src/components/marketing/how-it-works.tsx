import { CalendarCheck, ClipboardList, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/reveal";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell us about your hair",
    description:
      "A quick 7-step profile covers your hair type, condition, scalp, top concerns, lifestyle, and water type.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Get your personalized routine",
    description:
      "A weekly Mon–Sun routine plus product recommendations — built specifically around your profile, not a generic checklist.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Track your progress",
    description:
      "Log hair fall and frizz, snap progress photos, and watch the trend lines move as your routine takes effect.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            From quiz to routine in minutes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No appointments, no guesswork — just a clear plan built around you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.step} delay={index * 100} className="relative">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft">
                <step.icon className="size-5" />
              </div>
              <span className="mt-4 block font-heading text-sm font-semibold text-primary">
                {step.step}
              </span>
              <h3 className="mt-1 font-heading text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
