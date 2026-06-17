import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const PUBLIC_ROUTES = ["", "/login", "/signup", "/forgot-password"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.5,
  }));
}
