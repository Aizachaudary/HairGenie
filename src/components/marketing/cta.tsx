import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Cta() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:pb-28">
      <Reveal
        className="bg-rose-glow shadow-soft-lg mx-auto max-w-5xl rounded-3xl border border-border bg-card px-8 py-14 text-center sm:px-16"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to stop guessing with your hair?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Build your hair profile in under three minutes and get a routine made for you, not the
          average person.
        </p>
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild className="shadow-soft-lg">
            <Link href="/signup">
              Get started free <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
