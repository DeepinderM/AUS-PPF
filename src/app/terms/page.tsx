import type { Metadata } from "next";
import Link from "next/link";
import { pages, pageLabels } from "@/content";
import { pageMetadata } from "@/lib/meta";
import { Rich } from "@/components/Rich";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

const page = pages.terms;

export const metadata: Metadata = pageMetadata("terms", page);

// A plain, minimal layout for a document people read and reference, rather
// than the marketing pages' bold hero treatment — one column, quiet type,
// thin rules between sections, nothing decorative competing with the text.
export default function TermsPage() {
  return (
    <main>
      <JsonLd data={webPageSchema("terms", page)} />
      <JsonLd data={breadcrumbSchema("terms")} />
      <div className="mx-auto max-w-[640px] px-5 py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" className="underline-offset-4 hover:underline">
            {pageLabels.home}
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{pageLabels.terms}</span>
        </nav>

        <h1 className="mt-6 text-[1.75rem] font-semibold leading-tight text-charcoal sm:text-[2rem]">
          {page.h1}
        </h1>
        {page.updated && (
          <p className="mt-2 text-sm text-muted">
            Last updated: <Rich text={page.updated} />
            {page.reviewNote && <> · {page.reviewNote}</>}
          </p>
        )}
        <p className="mt-5 text-base leading-relaxed text-muted">
          <Rich text={page.opener} />
        </p>

        <div className="mt-10 divide-y divide-charcoal/15 border-t border-charcoal/15">
          {page.sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="py-6">
              <h2 id={`${s.id}-title`} className="text-base font-semibold text-charcoal">
                {s.h2}
              </h2>
              <p className="mt-2 text-base leading-relaxed text-muted">
                <Rich text={s.answer} />
              </p>
              {s.blocks?.map((b, i) =>
                b.type === "p" ? (
                  <p key={i} className="mt-3 text-base leading-relaxed text-muted">
                    <Rich text={b.text} />
                  </p>
                ) : null,
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
