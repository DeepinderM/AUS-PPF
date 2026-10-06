import { site, pageLabels, pageSlugs, type PageContent, type PageKey } from "@/content";
import { plain } from "@/lib/text";
import { getSiteUrl } from "@/lib/site";

const url = (path: string) => getSiteUrl() + (path === "/" ? "/" : path);

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: site.name,
    url: getSiteUrl(),
    logo: url("/logo.png"),
    slogan: site.brandLine,
    description: site.schemaDescription,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    url: getSiteUrl(),
    name: site.name,
    inLanguage: "en-AU",
    publisher: { "@id": `${getSiteUrl()}/#organization` },
  };
}

export function breadcrumbSchema(key: PageKey) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: pageLabels.home, item: url("/") },
      { "@type": "ListItem", position: 2, name: pageLabels[key], item: url(pageSlugs[key]) },
    ],
  };
}

export function webPageSchema(key: PageKey, page: PageContent, type = "WebPage") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url(pageSlugs[key])}#webpage`,
    url: url(pageSlugs[key]),
    name: page.h1,
    description: page.meta.description,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#organization` },
  };
}

/** Product schema for the film page: no price, no rating, no reviews. */
export function productSchema(page: PageContent) {
  const properties = page.properties ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url(pageSlugs.film)}#product`,
    name: "AusPPF Paint Protection Film",
    description:
      "Paint protection film for cars and utes, supplied in rolls. Stated properties: anti-yellowing, scratch resistant, ultra bright, self-healing, easy installation and stain resistant.",
    brand: { "@type": "Brand", name: site.name },
    category: "Paint protection film",
    url: url(pageSlugs.film),
    image: url("/box-front.jpg"),
    additionalProperty: properties.map((p) => ({
      "@type": "PropertyValue",
      name: "Stated property",
      value: p.title,
    })),
  };
}

// ---------------------------------------------------------------------------
// Product catalogue (categories and products in src/lib/catalog.ts)
// ---------------------------------------------------------------------------

type Crumb = { name: string; path: string };

/** BreadcrumbList for any trail, not just the fixed marketing pages above. */
export function catalogBreadcrumbSchema(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: url("/") },
      ...trail.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.name,
        item: url(c.path),
      })),
    ],
  };
}

/**
 * Product schema for a catalogue product page: no price, rating or reviews.
 * Placeholder products (no confirmed specs yet) get no `additionalProperty`
 * claims — there's nothing confirmed to state.
 */
export function catalogProductSchema({
  name,
  path,
  categoryName,
  specs,
  image,
}: {
  name: string;
  path: string;
  categoryName: string;
  specs?: { label: string; value: string }[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url(path)}#product`,
    name,
    brand: { "@type": "Brand", name: site.name },
    category: categoryName,
    url: url(path),
    ...(image ? { image: url(image) } : {}),
    ...(specs && specs.length > 0
      ? {
          additionalProperty: specs.map((s) => ({
            "@type": "PropertyValue",
            name: s.label,
            value: s.value,
          })),
        }
      : {}),
  };
}

/** CollectionPage schema for a category listing page. */
export function catalogCollectionSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url(path)}#collectionpage`,
    name,
    description,
    url: url(path),
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
  };
}

/** FAQPage schema, generated from the visible FAQ answers so the two can't drift. */
export function faqSchema(page: PageContent) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url(pageSlugs.faq)}#faqpage`,
    mainEntity: page.sections.map((s) => ({
      "@type": "Question",
      name: plain(s.h2),
      acceptedAnswer: { "@type": "Answer", text: plain(s.answer) },
    })),
  };
}
