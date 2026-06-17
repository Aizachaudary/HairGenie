export const siteConfig = {
  name: "HairGenie",
  tagline: "Your hair, decoded.",
  description:
    "HairGenie builds a personalized haircare routine around your hair type, scalp, and lifestyle, then tracks your progress with photos and data so you can see what's actually working.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
} as const;

export type SiteConfig = typeof siteConfig;
