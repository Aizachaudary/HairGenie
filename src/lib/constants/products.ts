import type { HairCondition, HairConcern, HairType, ScalpCondition } from "@/types/database";

export type ProductCategory = "shampoo" | "conditioner" | "treatment" | "oil" | "scalp-care" | "styling";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  rating: number; // out of 5
  diyAlternative: string;
  hairTypes?: HairType[];
  hairConditions?: HairCondition[];
  scalpConditions?: ScalpCondition[];
  concerns?: HairConcern[];
  matchesHardWater?: boolean;
};

export const PRODUCT_CATALOG: Product[] = [
  {
    id: "sulfate-free-shampoo",
    name: "Sulfate-Free Hydrating Shampoo",
    category: "shampoo",
    description: "A gentle, sulfate-free cleanse that won't strip natural oils.",
    price: 16,
    rating: 4.6,
    diyAlternative: "Dilute a mild, fragrance-free shampoo 1:1 with water for a gentler everyday cleanse.",
    hairConditions: ["dry", "damaged", "normal"],
  },
  {
    id: "clarifying-shampoo",
    name: "Clarifying Mineral-Removing Shampoo",
    category: "shampoo",
    description: "Strips mineral buildup from hard water and excess oil at the roots.",
    price: 14,
    rating: 4.4,
    diyAlternative: "A diluted apple cider vinegar rinse (1 part ACV to 4 parts water) cuts buildup naturally.",
    hairConditions: ["oily"],
    matchesHardWater: true,
  },
  {
    id: "curl-cowash",
    name: "Curl-Defining Cleansing Co-Wash",
    category: "shampoo",
    description: "A low-foam cleanser that won't strip moisture from curls and coils.",
    price: 19,
    rating: 4.5,
    diyAlternative: "A conditioner-only \"co-wash\" with your regular conditioner works in a pinch.",
    hairTypes: ["curly", "coily"],
  },
  {
    id: "lightweight-conditioner",
    name: "Lightweight Daily Conditioner",
    category: "conditioner",
    description: "Detangles without weighing down fine or oily hair.",
    price: 14,
    rating: 4.3,
    diyAlternative: "A few drops of diluted aloe vera gel smoothed through ends adds slip without heaviness.",
    hairConditions: ["normal", "oily"],
  },
  {
    id: "rich-moisture-conditioner",
    name: "Rich Moisture Conditioner",
    category: "conditioner",
    description: "A deeply moisturizing conditioner for dry, damaged, curly, or coily hair.",
    price: 18,
    rating: 4.7,
    diyAlternative: "Mix a tablespoon of coconut oil into your regular conditioner for extra slip and shine.",
    hairTypes: ["curly", "coily"],
    hairConditions: ["dry", "damaged"],
  },
  {
    id: "bond-repair-mask",
    name: "Bond-Repair Treatment Mask",
    category: "treatment",
    description: "A weekly mask that targets damage and split ends from heat or color.",
    price: 28,
    rating: 4.6,
    diyAlternative: "A mashed-banana and honey mask (15 minutes, rinse well) offers light, low-cost conditioning.",
    hairConditions: ["damaged"],
    concerns: ["split_ends"],
  },
  {
    id: "anti-dandruff-treatment",
    name: "Anti-Dandruff Scalp Treatment",
    category: "scalp-care",
    description: "A scalp treatment formulated to reduce flaking and itchiness.",
    price: 17,
    rating: 4.4,
    diyAlternative: "A diluted tea tree oil rinse (a few drops in a cup of water) has natural anti-flake properties.",
    scalpConditions: ["dandruff"],
  },
  {
    id: "soothing-scalp-oil",
    name: "Soothing Scalp Oil",
    category: "oil",
    description: "A lightweight oil blend to calm an itchy, sensitive scalp.",
    price: 15,
    rating: 4.5,
    diyAlternative: "Warmed plain coconut or jojoba oil massaged in for 5 minutes before washing has a similar calming effect.",
    scalpConditions: ["itchy"],
  },
  {
    id: "strengthening-scalp-serum",
    name: "Strengthening Scalp Serum",
    category: "scalp-care",
    description: "A leave-in serum that supports circulation for thinning hair or excess shedding.",
    price: 26,
    rating: 4.3,
    diyAlternative: "A 5-minute daily scalp massage (no product needed) supports circulation at no cost.",
    concerns: ["hair_fall", "thinning"],
  },
  {
    id: "frizz-control-serum",
    name: "Frizz-Control Smoothing Serum",
    category: "styling",
    description: "A few drops tame flyaways and humidity-driven frizz without weighing hair down.",
    price: 20,
    rating: 4.5,
    diyAlternative: "A pea-sized amount of plain argan or grapeseed oil on dry ends smooths frizz similarly.",
    hairTypes: ["wavy", "curly", "coily"],
    concerns: ["frizz"],
  },
  {
    id: "heat-protectant",
    name: "Heat Protectant Spray",
    category: "styling",
    description: "Shields strands from heat damage before blow-drying, curling, or straightening.",
    price: 18,
    rating: 4.6,
    diyAlternative: "Air-drying 80% of the way before using any hot tool meaningfully cuts heat exposure.",
    hairConditions: ["damaged"],
  },
  {
    id: "leave-in-detangler",
    name: "Leave-In Detangling Cream",
    category: "conditioner",
    description: "Eases detangling and protects ends between wash days.",
    price: 16,
    rating: 4.4,
    diyAlternative: "A diluted conditioner spray (1 part conditioner to 3 parts water) in a spray bottle works well too.",
    hairTypes: ["curly", "coily"],
    concerns: ["split_ends"],
  },
  {
    id: "wide-tooth-comb",
    name: "Wide-Tooth Detangling Comb",
    category: "styling",
    description: "Detangles wet hair with far less breakage than a brush.",
    price: 9,
    rating: 4.7,
    diyAlternative: "Finger-detangling section by section works if you don't have a wide-tooth comb on hand.",
    hairTypes: ["wavy", "curly", "coily"],
  },
  {
    id: "silk-pillowcase",
    name: "Silk Pillowcase",
    category: "styling",
    description: "Cuts overnight friction that causes frizz and breakage.",
    price: 24,
    rating: 4.5,
    diyAlternative: "Wrapping hair in a silk or satin scarf before bed gives a similar friction-reducing effect.",
    concerns: ["frizz", "split_ends"],
  },
];
