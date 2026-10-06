import Link from "next/link";
import { closing } from "@/content";
import { Magnetic } from "./Magnetic";

/** Closing call to action, shown at the bottom of most pages. */
export function Closing() {
  return (
    <section aria-label="Apply for a trade account" className="bg-deep text-white">
      <div
        data-reveal
        className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-14 split:flex-row split:items-center split:justify-between split:py-16"
      >
        <div>
          <p className="display text-[1.75rem] leading-tight sm:text-[2.125rem]">{closing.heading}</p>
          <p className="mt-3 max-w-[32rem] text-lg text-white/90">{closing.text}</p>
        </div>
        <Magnetic>
          <Link href={closing.cta.href} className="btn btn-primary">
            {closing.cta.label}
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
