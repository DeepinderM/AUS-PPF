import Image from "next/image";
import type { Block, Section } from "@/content";
import { Rich } from "./Rich";

type Tone = "light" | "deep";
type SectionImage = { src: string; alt: string };

export function Blocks({ blocks, tone = "light" }: { blocks: Block[]; tone?: Tone }) {
  const deep = tone === "deep";
  const body = deep ? "text-white/90" : "text-muted";
  return (
    <div className="space-y-5">
      {blocks.map((b, n) => {
        switch (b.type) {
          case "p":
            return (
              <p key={n} className={`text-base leading-relaxed ${body}`}>
                <Rich text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={n} className="space-y-2.5">
                {b.items.map((item) => (
                  <li key={item} className={`flex gap-3 text-base leading-relaxed ${body}`}>
                    {/* Small leaning slab as the bullet: echoes the hero motif. */}
                    <span
                      aria-hidden="true"
                      className={`mt-[0.62rem] h-2 w-2 shrink-0 -skew-x-[20deg] ${deep ? "bg-lime" : "bg-deep"}`}
                    />
                    <span>
                      <Rich text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={n}>
                {b.items.map((item, i) => (
                  <li
                    key={item}
                    className={`grid grid-cols-[3rem_1fr] gap-3 border-t py-5 ${deep ? "border-white/30" : "border-charcoal/20"}`}
                  >
                    <span className={`display text-2xl leading-none ${deep ? "text-lime" : "text-deep"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-base leading-relaxed ${deep ? "text-white" : "text-charcoal"}`}>
                      <Rich text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={n}>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[30rem] border-collapse text-left text-[0.9375rem]">
                    <thead>
                      <tr>
                        {b.head.map((h, i) => (
                          <th
                            key={i}
                            scope="col"
                            className={`border-b-2 py-3 pr-4 text-[0.8125rem] font-semibold uppercase tracking-wider ${deep ? "border-white/60" : "border-deep text-charcoal"}`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r} className={`border-b ${deep ? "border-white/25" : "border-charcoal/15"}`}>
                          {row.map((cell, c) =>
                            c === 0 ? (
                              <th key={c} scope="row" className="py-3 pr-4 align-top font-semibold text-charcoal">
                                <Rich text={cell} />
                              </th>
                            ) : (
                              <td key={c} className={`py-3 pr-4 align-top ${body}`}>
                                <Rich text={cell} />
                              </td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {b.note && <p className={`mt-3 text-sm ${body}`}>{b.note}</p>}
              </div>
            );
          case "h3":
            return (
              <div key={n} className="space-y-4 pt-2">
                <h3 className={`text-lg font-semibold ${deep ? "text-white" : "text-charcoal"}`}>{b.title}</h3>
                <Blocks blocks={b.blocks} tone={tone} />
              </div>
            );
        }
      })}
    </div>
  );
}

/**
 * Renders content sections as a ruled two-column layout: heading (and an
 * optional photo) on the left, the direct answer and detail on the right.
 */
export function Sections({
  sections,
  variant = "editorial",
  align,
  tones = {},
  images = {},
}: {
  sections: readonly Section[];
  variant?: "editorial" | "faq";
  /**
   * Vertical alignment of the two columns. "center" (the editorial default)
   * suits a short heading beside a modest amount of detail. Pass "top" for a
   * section whose right column runs much longer than its heading (a full
   * spec table, say) — centering there would strand the heading in the
   * middle of a tall block, disconnected from where the content starts.
   */
  align?: "center" | "top";
  tones?: Record<string, Tone>;
  images?: Record<string, SectionImage>;
}) {
  return (
    <>
      {sections.map((s) => {
        const tone = tones[s.id] ?? "light";
        const deep = tone === "deep";
        const img = images[s.id];
        const faq = variant === "faq";
        const centered = (align ?? (faq ? "top" : "center")) === "center";
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={deep ? "bg-deep text-white" : "bg-ground text-charcoal"}
          >
            <div className="mx-auto max-w-[1200px] px-5 py-3 split:py-4">
              <div
                className={`grid gap-6 border-t-2 pb-8 pt-8 split:gap-14 split:pb-10 split:pt-10 ${faq ? "split:grid-cols-[5fr_7fr]" : "split:grid-cols-[4fr_8fr]"} ${centered ? "split:items-center" : ""} ${deep ? "border-white/40" : "border-deep"}`}
              >
                <div data-reveal className="min-w-0">
                  <h2
                    id={`${s.id}-title`}
                    className={
                      faq
                        ? "text-xl font-semibold leading-snug"
                        : "display text-[1.625rem] leading-[1.12] sm:text-[1.875rem]"
                    }
                  >
                    {s.h2}
                  </h2>
                  {img && (
                    <div
                      data-page-clip
                      className="relative mt-6 aspect-[3/2] overflow-hidden rounded-brand bg-charcoal"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1264px) 380px, (min-width: 900px) 34vw, 92vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
                <div data-reveal className="min-w-0 space-y-5">
                  <p className={`text-lg leading-relaxed ${deep ? "text-white" : "text-charcoal"}`}>
                    <Rich text={s.answer} />
                  </p>
                  {s.blocks && <Blocks blocks={s.blocks} tone={tone} />}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
