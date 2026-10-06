import type { Metadata } from "next";
import { pages, images, pageLabels } from "@/content";
import { pageMetadata } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { Sections } from "@/components/Sections";
import { Closing } from "@/components/Closing";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";

const page = pages.faq;

export const metadata: Metadata = pageMetadata("faq", page);

export default function FaqPage() {
  const utesSection = page.sections.find((s) => s.id === "utes");

  return (
    <main>
      <JsonLd data={webPageSchema("faq", page)} />
      <JsonLd data={faqSchema(page)} />
      <JsonLd data={breadcrumbSchema("faq")} />
      <PageHero breadcrumb={[{ label: pageLabels.faq }]} h1={page.h1} opener={page.opener} />
      <Sections
        sections={page.sections}
        variant="faq"
        images={utesSection ? { [utesSection.id]: images.ute2 } : {}}
      />
      <Closing />
    </main>
  );
}
