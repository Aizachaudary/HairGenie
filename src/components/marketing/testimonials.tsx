import { Star } from "lucide-react";
import { Reveal } from "@/components/reveal";

const testimonials = [
  {
    quote:
      "I finally stopped buying random products. The routine takes my actual scalp condition into account, not just my hair length.",
    name: "Maya R.",
    detail: "Curly, dry scalp",
  },
  {
    quote:
      "The before/after photos made it obvious my frizz was actually improving — I wasn't just imagining it after switching products.",
    name: "Priya S.",
    detail: "Wavy, frizz-prone",
  },
  {
    quote:
      "Hard water in my city was wrecking my hair and I had no idea until the quiz asked about it. Small detail, big difference.",
    name: "Jordan L.",
    detail: "Straight, thinning concerns",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          People notice the difference
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Real routines, built around real hair concerns.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 80}>
            <figure className="shadow-soft flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.detail}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
