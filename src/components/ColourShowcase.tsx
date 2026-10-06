import Link from "next/link";
import { findCategory } from "@/lib/catalog";
import { CatalogCard } from "./CatalogCard";

/**
 * A short preview of real Colour PPF products, for pages outside the
 * catalogue itself (home, the film, about) — hover any card to see it cycle
 * through its own photos, same as the category grid. Always pulls live from
 * the catalogue, so it can never list a colour that isn't actually stocked.
 */
export function ColourShowcase({
  heading = "Colour PPF, in every finish",
  text = "Gloss, matte, pearlescent and colour-shift — the same protection as clear film, in a shade that changes the look of the car.",
  limit = 6,
}: {
  heading?: string;
  text?: string;
  limit?: number;
}) {
  const category = findCategory("colour-ppf");
  if (!category) return null;
  const products = category.products.filter((p) => !p.placeholder && p.image).slice(0, limit);
  if (products.length === 0) return null;

  return (
    <section aria-label="Colour PPF" className="bg-ground py-16 split:py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40rem]">
            <h2 className="display text-[1.75rem] leading-[1.12] sm:text-[2.125rem]">{heading}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">{text}</p>
          </div>
          <Link
            href="/products/colour-ppf"
            className="text-sm font-semibold text-deep underline underline-offset-4"
          >
            View all colour PPF ({category.products.filter((p) => !p.placeholder).length})
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 split:grid-cols-3">
          {products.map((p) => (
            <CatalogCard
              key={p.slug}
              href={`/products/colour-ppf/${p.slug}`}
              title={p.name}
              subtitle={p.finish}
              image={p.image}
              gallery={p.gallery}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
