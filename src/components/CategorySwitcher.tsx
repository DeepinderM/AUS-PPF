import Link from "next/link";
import { categories } from "@/lib/catalog";

/** Quick links across all categories, shown on every category page so a
 * visitor browsing Colour PPF can jump straight to Car window film without
 * backing out to /products first. */
export function CategorySwitcher({ active }: { active: string }) {
  return (
    <nav aria-label="Product categories" className="border-b border-charcoal/10 bg-white">
      <div className="mx-auto max-w-[1200px] overflow-x-auto px-5">
        <ul className="flex gap-2 py-3">
          {categories.map((c) => {
            const isActive = c.slug === active;
            return (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/products/${c.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-block rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? "border-deep bg-deep text-white"
                      : "border-charcoal/15 text-charcoal hover:border-deep hover:text-deep"
                  }`}
                >
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
