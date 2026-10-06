import { Rich } from "./Rich";

type Spec = { label: string; value: string };

/** A product's specs as a clean facts card, not a dense data table. */
export function ProductQuickFacts({ specs, note }: { specs: Spec[]; note?: string }) {
  return (
    <div data-reveal className="rounded-brand border-2 border-charcoal/10 bg-panel p-6 sm:p-7">
      <h2 className="text-[0.8125rem] font-semibold uppercase tracking-wider text-muted">
        Quick facts
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
        {specs.map((s) => (
          <div key={s.label}>
            <dt className="text-[0.8125rem] text-muted">{s.label}</dt>
            <dd className="mt-0.5 font-semibold text-charcoal">
              <Rich text={s.value} />
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-5 border-t border-charcoal/10 pt-4 text-sm text-muted">{note}</p>}
    </div>
  );
}
