"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/catalog";
import { CatalogCard } from "./CatalogCard";

/**
 * The product grid for a category page. For a small category this is just
 * the grid. Once there's enough products that scanning the whole thing is a
 * chore (colour ranges especially), it grows a search box and finish-type
 * chips, filtered entirely client-side — the catalogue is already in the
 * page, so there's nothing to fetch.
 */
export function CategoryProductGrid({
  products,
  categoryPath,
}: {
  products: Product[];
  categoryPath: string;
}) {
  const [query, setQuery] = useState("");
  const [finish, setFinish] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // "Gloss, metallic sparkle" -> "Gloss". Groups products by their first,
  // broadest finish word so the chips stay short and the count per chip
  // stays meaningful, rather than one chip per exact finish string.
  const finishOf = (p: Product) => p.finish?.split(",")[0]?.trim();

  const finishes = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) {
      const f = finishOf(p);
      if (f) set.add(f);
    }
    return Array.from(set).sort();
  }, [products]);

  const showFilters = products.length >= 6 && finishes.length > 1;
  const showSearch = products.length >= 6;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (finish && finishOf(p) !== finish) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.finish?.toLowerCase().includes(q)
      );
    });
  }, [products, query, finish]);

  // The site-wide scroll-reveal only ever fires once per card, the first
  // time it scrolls into view — so a card still below the fold (never yet
  // revealed) is sitting at its pre-animation opacity:0. Filtering can move
  // such a card to a new position with no further scrolling to trigger it,
  // which would leave it permanently invisible. Skip the very first render
  // (let the normal scroll reveal play for an untouched page), but on every
  // filter/search change after that, make sure whatever's now on screen is
  // actually visible rather than relying on a scroll event that may never
  // come.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const cards = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    cards.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }, [filtered]);

  return (
    <div ref={rootRef}>
      {(showSearch || showFilters) && (
        <div data-reveal className="mb-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            {showSearch && (
              <div className="relative w-full max-w-[22rem]">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or finish…"
                  aria-label="Search products"
                  className="w-full rounded-brand border-2 border-charcoal/15 bg-white px-4 py-2.5 text-base text-charcoal placeholder:text-muted focus:border-deep focus:outline-none"
                />
              </div>
            )}
            <p className="text-sm font-medium text-muted" aria-live="polite">
              Showing {filtered.length} of {products.length}
            </p>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFinish(null)}
                className={`rounded-full border-2 px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                  finish === null
                    ? "border-deep bg-deep text-white"
                    : "border-charcoal/15 text-charcoal hover:border-deep hover:text-deep"
                }`}
              >
                All finishes
              </button>
              {finishes.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFinish(f === finish ? null : f)}
                  className={`rounded-full border-2 px-3.5 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                    finish === f
                      ? "border-deep bg-deep text-white"
                      : "border-charcoal/15 text-charcoal hover:border-deep hover:text-deep"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {filtered.length === 0 ? (
        <p data-reveal className="rounded-brand border-2 border-charcoal/15 bg-white p-8 text-center text-muted">
          No products match that search. Try a different term, or{" "}
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFinish(null);
            }}
            className="font-semibold text-deep underline underline-offset-4"
          >
            clear the filters
          </button>
          .
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 split:grid-cols-3">
          {filtered.map((p) => (
            <CatalogCard
              key={p.slug}
              href={`${categoryPath}/${p.slug}`}
              title={p.name}
              subtitle={p.tagline ?? [p.finish, p.thickness].filter(Boolean).join(" · ")}
              placeholder={p.placeholder}
              image={p.image}
              gallery={p.gallery}
            />
          ))}
        </div>
      )}
    </div>
  );
}
