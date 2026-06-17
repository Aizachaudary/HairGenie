import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { recommendProducts } from "@/lib/products/recommend";
import { ProductCard } from "@/components/products/product-card";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user!.id)
    .single();

  if (!profile) {
    notFound();
  }

  const ranked = recommendProducts(profile);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight">Products for you</h1>
        <p className="mt-1 text-muted-foreground">
          Picked for your hair profile, with a budget-friendly DIY alternative for every product.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ranked.map(({ product, score }) => (
          <ProductCard key={product.id} product={product} recommended={score > 0} />
        ))}
      </div>
    </div>
  );
}
