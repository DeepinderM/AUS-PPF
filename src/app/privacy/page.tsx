import type { Metadata } from "next";
import { pages, pageLabels } from "@/content";
import { pageMetadata } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { Sections } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const page = pages.privacy;

export const metadata: Metadata = pageMetadata("privacy", page);

export default function PrivacyPage() {
  return (
    <main>
      <JsonLd data={webPageSchema("privacy", page)} />
      <JsonLd data={breadcrumbSchema("privacy")} />
      <PageHero breadcrumb={[{ label: pageLabels.privacy }]} h1={page.h1} opener={page.opener} updated={page.updated} reviewNote={page.reviewNote} />
      <Sections sections={page.sections} />
    </main>
  );
}
