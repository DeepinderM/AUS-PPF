import type { Metadata } from "next";
import { pageSlugs, site, type PageContent, type PageKey } from "@/content";
import { getSiteUrl } from "@/lib/site";

/** Metadata shared by every content page, built from its content.ts entry. */
export function pageMetadata(key: PageKey, page: PageContent): Metadata {
  const path = pageSlugs[key];
  const ogTitle = page.meta.ogTitle ?? page.meta.title;
  const ogDescription = page.meta.ogDescription ?? page.meta.description;
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: path },
    robots: page.meta.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title: ogTitle,
      description: ogDescription,
      url: path,
      images: [{ url: site.ogImage, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [site.ogImage],
    },
  };
}

/** Same shape as pageMetadata, for pages not in the `pages` content object (the product catalogue). */
export function catalogMetadata({
  title,
  description,
  path,
  ogImage,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  /** For a placeholder product page: nothing confirmed yet to rank on. */
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      title,
      description,
      url: path,
      images: [{ url: ogImage ?? site.ogImage, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage ?? site.ogImage],
    },
  };
}

export { getSiteUrl };
