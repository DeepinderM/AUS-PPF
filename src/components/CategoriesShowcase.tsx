import Link from "next/link";
import { categories } from "@/lib/catalog";
import { CatalogCard } from "./CatalogCard";

/**
 * Home page "shop by category" section: one card per product category,
 * pulled live from the catalogue (capped at 5, though there are 4 today) so
 * it never drifts out of sync with what /products actually lists.
 */
export function CategoriesShowcase({
  heading = "Browse by category",
  text,
  limit = 5,
}: {
  heading?: string;
  text?: string;
  limit?: number;
}) {
  const shown = categories.slice(0, limit);
  if (shown.length === 0) return null;
  const body =
    text ??
    `${categories.length} categor${categories.length === 1 ? "y" : "ies"}, one place to enquire — pick the range you're after.`;

  return (
    <section aria-label="Product categories" className="bg-ground py-16 split:py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40rem]">
            <h2 className="display text-[1.75rem] leading-[1.12] sm:text-[2.125rem]">{heading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{body}</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-deep underline underline-offset-4">
            View all products
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {shown.map((c) => {
            const comingSoon = c.products.length === 0 || c.products.every((p) => p.placeholder);
            return (
              <CatalogCard
                key={c.slug}
                href={`/products/${c.slug}`}
                title={c.name}
                subtitle={
                  c.products.length === 0
                    ? undefined
                    : `${c.products.length} product${c.products.length === 1 ? "" : "s"}`
                }
                placeholder={comingSoon}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
