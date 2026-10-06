import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, findCategory, findProduct } from "@/lib/catalog";
import { catalogMetadata } from "@/lib/meta";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductQuickFacts } from "@/components/ProductQuickFacts";
import { ProductFeatures } from "@/components/ProductFeatures";
import { CatalogCard } from "@/components/CatalogCard";
import { Magnetic } from "@/components/Magnetic";
import { JsonLd } from "@/components/JsonLd";
import { catalogBreadcrumbSchema, catalogProductSchema } from "@/lib/schema";

export function generateStaticParams() {
  return categories.flatMap((c) => c.products.map((p) => ({ category: c.slug, product: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const category = findCategory(categorySlug);
  const product = findProduct(categorySlug, productSlug);
  if (!category || !product) return {};
  const path = `/products/${category.slug}/${product.slug}`;
  const description =
    product.tagline ??
    `${product.name}, part of AusPPF's ${category.name} range. Enquire for pricing and availability — no trade account needed.`;
  return catalogMetadata({
    title: `${product.name} | AusPPF`,
    description,
    path,
    noindex: product.placeholder,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = findCategory(categorySlug);
  const product = findProduct(categorySlug, productSlug);
  if (!category || !product) notFound();

  const path = `/products/${category.slug}/${product.slug}`;
  const categoryPath = `/products/${category.slug}`;
  const enquireHref = `/contact?product=${encodeURIComponent(product.name)}&category=${encodeURIComponent(category.name)}`;
  const opener =
    product.tagline ??
    `${product.name} is part of AusPPF's ${category.name} range. Full specs for this product aren't published yet — enquire and we'll get you the details.`;

  const gallery = product.image ? [product.image, ...(product.gallery ?? [])] : [];
  // The full specs table already covers finish/thickness when it exists —
  // only fall back to the plain fields for a product that has just those.
  const quickFacts =
    product.specs && product.specs.length > 0
      ? product.specs
      : [
          ...(product.finish ? [{ label: "Finish", value: product.finish }] : []),
          ...(product.thickness ? [{ label: "Thickness", value: product.thickness }] : []),
        ];

  // Other products in the same category, photographed ones first so the
  // strip isn't mostly "coming soon" cards — falls back to whatever's left
  // in smaller categories.
  const others = category.products.filter((p) => p.slug !== product.slug);
  const related = [...others.filter((p) => p.image), ...others.filter((p) => !p.image)].slice(0, 3);

  return (
    <main>
      <JsonLd
        data={catalogProductSchema({
          name: product.name,
          path,
          categoryName: category.name,
          specs: product.specs,
          image: product.image?.src,
        })}
      />
      <JsonLd
        data={catalogBreadcrumbSchema([
          { name: "Products", path: "/products" },
          { name: category.name, path: categoryPath },
          { name: product.name, path },
        ])}
      />

      {/* Slim breadcrumb bar, not the full dark page hero: a product page gets
          straight to the photography instead of a big intro banner. */}
      <div className="border-b border-charcoal/10 bg-white">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1200px] px-5 py-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="rounded-brand underline-offset-4 hover:text-deep hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="rounded-brand underline-offset-4 hover:text-deep hover:underline">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={categoryPath} className="rounded-brand underline-offset-4 hover:text-deep hover:underline">
                {category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-charcoal">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <section aria-label={`${product.name} details`} className="bg-ground py-10 split:py-14">
        <div className="mx-auto max-w-[1200px] px-5">
          {gallery.length > 0 ? (
            <div className="grid gap-10 split:grid-cols-2 split:gap-16">
              <ProductGallery images={gallery} productName={product.name} />

              <div data-reveal className="min-w-0">
                <Link
                  href={categoryPath}
                  className="text-[0.8125rem] font-semibold uppercase tracking-wider text-deep underline-offset-4 hover:underline"
                >
                  {category.name}
                </Link>
                <h1 className="display mt-2 text-[2rem] leading-[1.08] sm:text-[2.5rem]">{product.name}</h1>
                <p className="mt-4 text-lg leading-relaxed text-muted">{opener}</p>

                <Magnetic>
                  <Link href={enquireHref} className="btn btn-primary mt-7">
                    Enquire now
                  </Link>
                </Magnetic>

                {quickFacts.length > 0 && (
                  <div className="mt-8">
                    <ProductQuickFacts specs={quickFacts} note={product.specsNote} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div data-reveal className="max-w-[40rem]">
              <Link
                href={categoryPath}
                className="text-[0.8125rem] font-semibold uppercase tracking-wider text-deep underline-offset-4 hover:underline"
              >
                {category.name}
              </Link>
              <h1 className="display mt-2 text-[2rem] leading-[1.08] sm:text-[2.5rem]">{product.name}</h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{opener}</p>
              {product.placeholder && (
                <p className="mt-4 text-base leading-relaxed text-muted">
                  This product isn&rsquo;t fully listed yet. Enquire below and we&rsquo;ll reply with the current
                  specs, pricing and availability.
                </p>
              )}
              <Magnetic>
                <Link href={enquireHref} className="btn btn-primary mt-7">
                  Enquire now
                </Link>
              </Magnetic>
              {quickFacts.length > 0 && (
                <div className="mt-8 max-w-[28rem]">
                  <ProductQuickFacts specs={quickFacts} note={product.specsNote} />
                </div>
              )}
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="mt-16 border-t border-charcoal/10 pt-12 split:mt-20 split:pt-16">
              <h2 className="display text-[1.625rem] leading-[1.12] sm:text-[1.875rem]">
                Why choose {product.name}?
              </h2>
              <div className="mt-8">
                <ProductFeatures features={product.features} />
              </div>
            </div>
          )}

          {related.length > 0 && (
            <div className="mt-16 border-t border-charcoal/10 pt-12 split:mt-20 split:pt-16">
              <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="display text-[1.625rem] leading-[1.12] sm:text-[1.875rem]">
                  More from {category.name}
                </h2>
                <Link
                  href={categoryPath}
                  className="text-sm font-semibold text-deep underline underline-offset-4"
                >
                  View all {category.name}
                </Link>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 split:grid-cols-3">
                {related.map((p) => (
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
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
