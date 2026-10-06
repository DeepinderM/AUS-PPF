import type { Metadata } from "next";
import { pages, images, ctas, pageLabels } from "@/content";
import { pageMetadata } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { Sections } from "@/components/Sections";
import { ColourShowcase } from "@/components/ColourShowcase";
import { Closing } from "@/components/Closing";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const page = pages.about;

export const metadata: Metadata = pageMetadata("about", page);

export default function AboutPage() {
  const [who, why, madeFor, supplies, where] = page.sections;

  return (
    <main>
      <JsonLd data={webPageSchema("about", page, "AboutPage")} />
      <JsonLd data={breadcrumbSchema("about")} />
      <PageHero breadcrumb={[{ label: pageLabels.about }]} h1={page.h1} opener={page.opener} ctas={[ctas.primary]} />
      <Sections sections={[who]} images={{ [who.id]: images.boxFront }} />
      <Sections sections={[why, madeFor, supplies, where]} />
      <ColourShowcase />
      <Closing />
    </main>
  );
}
