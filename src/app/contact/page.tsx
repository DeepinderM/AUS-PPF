import type { Metadata } from "next";
import { pages, pageLabels, contact } from "@/content";
import { pageMetadata } from "@/lib/meta";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { isPlaceholder } from "@/lib/text";
import { Rich } from "@/components/Rich";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const page = pages.contact;

export const metadata: Metadata = pageMetadata("contact", page);

const rows: { label: string; value: string; href?: string }[] = [
  { label: contact.labels.email, value: contact.email, href: `mailto:${contact.email}` },
  { label: contact.labels.phone, value: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, "")}` },
  { label: contact.labels.address, value: contact.address },
  { label: contact.labels.hours, value: contact.hours },
];

export default async function ContactPage({
  searchParams,
}: {
  // A product's "Enquire now" button links here with these set, so the form
  // arrives pre-filled with what the visitor was looking at.
  searchParams: Promise<{ product?: string; category?: string }>;
}) {
  const { product, category } = await searchParams;
  const [howBuy] = page.sections;

  return (
    <main>
      <JsonLd data={webPageSchema("contact", page, "ContactPage")} />
      <JsonLd data={breadcrumbSchema("contact")} />
      <PageHero breadcrumb={[{ label: pageLabels.contact }]} h1={page.h1} opener={page.opener} />

      <section aria-label="Contact details and form" className="bg-ground py-16 split:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 split:grid-cols-2 split:gap-16">
          <div data-reveal>
            <dl>
              {rows.map((r) => (
                <div key={r.label} className="grid gap-1 border-t border-charcoal/20 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">{r.label}</dt>
                  <dd className={`font-medium text-charcoal ${isPlaceholder(r.value) ? "ph" : ""}`}>
                    {r.href && !isPlaceholder(r.value) ? (
                      <a href={r.href} className="underline underline-offset-4 hover:text-mid">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
              <div className="border-t border-charcoal/20" />
            </dl>

            <div className="mt-10 space-y-6 border-t-2 border-deep pt-8">
              <div>
                <h2 className="text-xl font-semibold text-charcoal">{howBuy.h2}</h2>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  <Rich text={howBuy.answer} />
                </p>
              </div>
            </div>
          </div>

          <div data-reveal>
            <ContactForm product={product} category={category} />
          </div>
        </div>
      </section>
    </main>
  );
}
