import { PRODUCT_CATALOG, type Product } from "@/lib/constants/products";
import type { Profile } from "@/types/database";

type RecommendProfile = Pick<
  Profile,
  "hair_type" | "hair_condition" | "scalp_condition" | "concerns" | "water_type"
>;

export type RankedProduct = {
  product: Product;
  score: number;
};

function scoreProduct(product: Product, profile: RecommendProfile): number {
  let score = 0;

  if (profile.hair_type && product.hairTypes?.includes(profile.hair_type)) {
    score += 2;
  }
  if (profile.hair_condition && product.hairConditions?.includes(profile.hair_condition)) {
    score += 2;
  }
  if (profile.scalp_condition && product.scalpConditions?.includes(profile.scalp_condition)) {
    score += 2;
  }
  if (product.matchesHardWater && profile.water_type === "hard") {
    score += 2;
  }

  const concernMatches = product.concerns?.filter((concern) =>
    profile.concerns.includes(concern),
  ).length;
  score += (concernMatches ?? 0) * 2;

  return score;
}

/** All catalog products ranked by relevance to the profile, most relevant first. */
export function recommendProducts(profile: RecommendProfile): RankedProduct[] {
  return PRODUCT_CATALOG.map((product) => ({ product, score: scoreProduct(product, profile) })).sort(
    (a, b) => b.score - a.score,
  );
}
