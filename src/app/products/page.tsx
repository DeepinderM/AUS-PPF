import type { Metadata } from "next";
import { categories, totalProductCount } from "@/lib/catalog";
import { catalogMetadata } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { CatalogCard } from "@/components/CatalogCard";
import { Closing } from "@/components/Closing";
import { JsonLd } from "@/components/JsonLd";
import { catalogBreadcrumbSchema, catalogCollectionSchema } from "@/lib/schema";

const path = "/products";
const title = "Products | AusPPF";
const description = `AusPPF's product range across ${categories.length} categories, from paint protection film to window film. Browse a category and enquire — no trade account needed.`;

export const metadata: Metadata = catalogMetadata({ title, description, path });

export default function ProductsPage() {
  return (
    <main>
      <JsonLd data={catalogCollectionSchema({ name: "Products", description, path })} />
      <JsonLd data={catalogBreadcrumbSchema([{ name: "Products", path }])} />
      <PageHero
        breadcrumb={[{ label: "Products" }]}
        h1="Products"
        opener={`AusPPF's full range: ${totalProductCount()} products across ${categories.length} categories. Open to trade installers and everyday customers alike — no trade account needed. Browse a category, then enquire on the product you want.`}
      />
      <section aria-label="Categories" className="bg-ground py-16 split:py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="grid gap-5 sm:grid-cols-2 split:grid-cols-3">
            {categories.map((c) => {
              // A category with nothing in it yet, or where every product is
              // still a placeholder, has nothing to view yet — flag the card
              // itself as "coming soon" instead of promising details that
              // aren't there. Computed live from the catalogue, so this
              // clears on its own the moment real products are added.
              const comingSoon = c.products.length === 0 || c.products.every((p) => p.placeholder);
              return (
                <CatalogCard
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  title={c.name}
                  // The card's own "Full details coming soon" line (below)
                  // already covers an empty category — no need to also say
                  // "0 products" here.
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
      <Closing />
    </main>
  );
}
