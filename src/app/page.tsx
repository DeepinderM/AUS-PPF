import type { Metadata } from "next";
import { pages, ctas } from "@/content";
import { pageMetadata } from "@/lib/meta";
import { Hero } from "@/components/Hero";
import { PropertyScrollShow } from "@/components/PropertyScrollShow";
import { CategoriesShowcase } from "@/components/CategoriesShowcase";
import { Sections } from "@/components/Sections";
import { Box } from "@/components/Box";
import { Work } from "@/components/Work";
import { ColourShowcase } from "@/components/ColourShowcase";
import { Closing } from "@/components/Closing";
import { JsonLd } from "@/components/JsonLd";
import { webPageSchema } from "@/lib/schema";

const page = pages.home;

export const metadata: Metadata = pageMetadata("home", page);

export default function Home() {
  const [whatIs, whoSupplies, properties, howItWorks, whySell] = page.sections;

  return (
    <main>
      <JsonLd data={webPageSchema("home", page)} />
      <Hero sub={page.opener} primary={ctas.primary} secondary={ctas.secondary} />
      <Sections sections={[whatIs, whoSupplies]} />
      <CategoriesShowcase />
      <PropertyScrollShow heading={properties.h2} text={properties.answer} items={pages.film.properties ?? []} />
      <ColourShowcase />
      <Box />
      <Sections sections={[howItWorks]} />
      <Work />
      <Sections sections={[whySell]} />
      <Closing />
    </main>
  );
}
