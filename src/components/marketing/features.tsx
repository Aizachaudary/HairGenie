import { Camera, CalendarCheck, LineChart, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

const features = [
  {
    icon: Sparkles,
    title: "Built around your hair profile",
    description:
      "Hair type, condition, scalp, concerns, sleep, stress, and even your water type — every recommendation accounts for the full picture.",
  },
  {
    icon: CalendarCheck,
    title: "A routine you'll actually follow",
    description:
      "A simple Mon–Sun checklist with reminders, so the right products and habits become routine instead of one more thing to remember.",
  },
  {
    icon: Camera,
    title: "Before & after, side by side",
    description:
      "Capture progress photos right from your phone and watch your hair journey unfold in a chronological before/after gallery.",
  },
  {
    icon: LineChart,
    title: "Track what's working",
    description:
      "Log hair fall and frizz in seconds and see the trend lines over weeks — so you know if a product is helping before you run out of it.",
  },
  {
    icon: ShoppingBag,
    title: "Products that fit your hair and your budget",
    description:
      "Curated picks matched to your profile, plus budget-friendly DIY alternatives for every recommendation.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "Your photos and data are yours alone, protected with row-level security and never sold to third parties.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Everything your hair actually needs
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Not generic tips — a routine and product list built from your specific hair, scalp, and lifestyle.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 80}>
            <div className="shadow-soft h-full rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-soft-lg">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
