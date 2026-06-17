import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/constants/products";

const CATEGORY_LABEL: Record<Product["category"], string> = {
  shampoo: "Shampoo",
  conditioner: "Conditioner",
  treatment: "Treatment",
  oil: "Oil & Serum",
  "scalp-care": "Scalp Care",
  styling: "Styling",
};

export function ProductCard({ product, recommended }: { product: Product; recommended: boolean }) {
  return (
    <Card className="shadow-soft flex flex-col">
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{CATEGORY_LABEL[product.category]}</Badge>
          {recommended && <Badge>For you</Badge>}
        </div>

        <div>
          <h3 className="font-heading font-semibold">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="size-3.5 fill-primary text-primary" />
            {product.rating.toFixed(1)}
          </div>
          <span className="font-heading font-semibold">${product.price}</span>
        </div>

        <div className="mt-auto rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">DIY alternative: </span>
          {product.diyAlternative}
        </div>
      </CardContent>
    </Card>
  );
}
