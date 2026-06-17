import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HAIR_MYTHS } from "@/lib/content/hair-myths";

export function HairMyths() {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-lg font-semibold">Hair myths, debunked</h2>
      <Accordion
        type="single"
        collapsible
        className="shadow-soft rounded-2xl border border-border bg-card px-4"
      >
        {HAIR_MYTHS.map((myth, index) => (
          <AccordionItem key={myth.claim} value={`myth-${index}`}>
            <AccordionTrigger className="text-left text-sm font-medium">
              {myth.claim}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">
              {myth.verdict}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
