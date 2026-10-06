import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, findCategory, type Category } from "@/lib/catalog";
import { catalogMetadata } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { CategorySwitcher } from "@/components/CategorySwitcher";
import { CategoryProductGrid } from "@/components/CategoryProductGrid";
import { Magnetic } from "@/components/Magnetic";
import { Closing } from "@/components/Closing";
import { JsonLd } from "@/components/JsonLd";
import { catalogBreadcrumbSchema, catalogCollectionSchema } from "@/lib/schema";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

function describe(category: Category | undefined) {
  if (!category) return "";
  return category.products.length === 0
    ? `${category.description} Coming soon — enquire and we'll let you know as soon as it's available.`
    : `${category.description} ${category.products.length} products, open to trade installers and everyday customers — no trade account needed.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = findCategory(slug);
  if (!category) return {};
  const path = `/products/${category.slug}`;
  return catalogMetadata({
    title: `${category.title} | AusPPF`,
    description: describe(category),
    path,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const path = `/products/${category.slug}`;
  const description = describe(category);
  const comingSoon = category.products.length === 0;
  const enquireHref = `/contact?category=${encodeURIComponent(category.name)}`;

  return (
    <main>
      <JsonLd data={catalogCollectionSchema({ name: category.title, description, path })} />
      <JsonLd
        data={catalogBreadcrumbSchema([
          { name: "Products", path: "/products" },
          { name: category.name, path },
        ])}
      />
      <PageHero
        breadcrumb={[{ label: "Products", href: "/products" }, { label: category.name }]}
        h1={category.title}
        opener={description}
      />
      <CategorySwitcher active={category.slug} />
      <section aria-label={category.name} className="bg-ground py-16 split:py-20">
        <div className="mx-auto max-w-[1200px] px-5">
          {comingSoon ? (
            <div data-reveal className="max-w-[36rem] rounded-brand border-2 border-charcoal/15 bg-white p-8 sm:p-10">
              <h2 className="display text-[1.5rem] leading-tight sm:text-[1.75rem]">
                {category.name} is coming soon
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                We&rsquo;re still finalising this range. Enquire below and we&rsquo;ll let you know as soon as it&rsquo;s
                available, with pricing and specs.
              </p>
              <Magnetic>
                <Link href={enquireHref} className="btn btn-primary mt-6">
                  Enquire now
                </Link>
              </Magnetic>
            </div>
          ) : (
            <CategoryProductGrid products={category.products} categoryPath={path} />
          )}
        </div>
      </section>
      <Closing />
    </main>
  );
}
