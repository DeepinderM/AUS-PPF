import type { Metadata } from "next";
import { pages, pageLabels, images, ctas } from "@/content";
import { pageMetadata } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { FilmProperties } from "@/components/FilmProperties";
import { Sections } from "@/components/Sections";
import { ColourShowcase } from "@/components/ColourShowcase";
import { Closing } from "@/components/Closing";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, productSchema, webPageSchema } from "@/lib/schema";

const page = pages.film;

export const metadata: Metadata = pageMetadata("film", page);

export default function FilmPage() {
  const [rolls, properties, who, compare, buy] = page.sections;

  return (
    <main>
      <JsonLd data={webPageSchema("film", page, "WebPage")} />
      <JsonLd data={productSchema(page)} />
      <JsonLd data={breadcrumbSchema("film")} />
      <PageHero
        breadcrumb={[{ label: pageLabels.film }]}
        h1={page.h1}
        opener={page.opener}
        ctas={[ctas.primary]}
      />
      <Sections sections={[rolls]} />
      <FilmProperties
        id="properties"
        heading={properties.h2}
        answer={properties.answer}
        items={page.properties ?? []}
        image={images.filmCloseup}
      />
      <ColourShowcase
        heading="Want colour instead of clear?"
        text="Everything above applies to AusPPF's clear film — the same base properties also come in colour, across gloss, matte, pearlescent and colour-shift finishes."
      />
      <Sections
        sections={[who, compare]}
        images={{ [who.id]: images.roll }}
      />
      <Sections sections={[buy]} />
      <Closing />
    </main>
  );
}
