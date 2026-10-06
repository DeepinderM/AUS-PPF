import type { MetadataRoute } from "next";
import { pages, pageSlugs } from "@/content";
import { categories } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const marketing = (Object.keys(pages) as (keyof typeof pages)[])
    .filter((key) => !pages[key].meta.noindex)
    .map((key) => ({
      url: base + (pageSlugs[key] === "/" ? "" : pageSlugs[key]),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.7,
    }));

  const productsIndex = [
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  ];

  const categoryPages = categories.map((c) => ({
    url: `${base}/products/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Placeholder products (no confirmed specs yet) are noindex on the page
  // itself, so they're left out here too — nothing to rank on until real
  // product data replaces them.
  const productPages = categories.flatMap((c) =>
    c.products
      .filter((p) => !p.placeholder)
      .map((p) => ({
        url: `${base}/products/${c.slug}/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  );

  return [...marketing, ...productsIndex, ...categoryPages, ...productPages];
}
