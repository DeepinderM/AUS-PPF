"use client";

import { useRef } from "react";
import Link from "next/link";
import { pageLabels } from "@/content";
import { Magnetic } from "./Magnetic";
import { Rich } from "./Rich";
import { gsap, useGSAP, releaseMotionGuard, REDUCED_MOTION_OK } from "@/lib/gsap";

type Cta = { label: string; href: string; variant?: "primary" | "ghost" };
type Crumb = { label: string; href?: string };

/** Header for inner pages: breadcrumb, H1, the direct answer, and buttons. */
export function PageHero({
  breadcrumb,
  h1,
  opener,
  updated,
  reviewNote,
  ctas = [],
}: {
  /** Trail after Home, e.g. [{label:"Products",href:"/products"},{label:"Car window film"}]. */
  breadcrumb: Crumb[];
  h1: string;
  opener: string;
  updated?: string;
  reviewNote?: string;
  ctas?: Cta[];
}) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);
      mm.add(
        { motion: REDUCED_MOTION_OK, wide: "(min-width: 900px)" },
        (context) => {
          const { motion, wide } = context.conditions as { motion: boolean; wide: boolean };
          if (!motion) return;
          releaseMotionGuard();
          const tl = gsap.timeline();
          if (wide) {
            tl.from("[data-slab]", { xPercent: 120, duration: 0.8, ease: "power3.out", stagger: 0.12 });
          }
          tl.from(
            "[data-fade]",
            { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.08 },
            wide ? "-=0.6" : 0,
          );
        },
      );
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      aria-labelledby="page-title"
      className="hex-pattern relative overflow-hidden text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[13%] split:block"
      >
        <div data-slab className="slab bg-lime" style={{ left: "0%" }} />
        <div data-slab className="slab bg-mid" style={{ left: "31%" }} />
        <div data-slab className="slab bg-deep" style={{ left: "62%" }} />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 pb-14 pt-10 sm:pb-16 sm:pt-12 split:pb-20">
        <nav aria-label="Breadcrumb" data-fade>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
            <li>
              <Link href="/" className="rounded-brand underline-offset-4 hover:text-lime hover:underline">
                {pageLabels.home}
              </Link>
            </li>
            {breadcrumb.map((c, i) => (
              <span key={c.label} className="contents">
                <li aria-hidden="true">/</li>
                <li aria-current={i === breadcrumb.length - 1 ? "page" : undefined}>
                  {c.href ? (
                    <Link href={c.href} className="rounded-brand underline-offset-4 hover:text-lime hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    c.label
                  )}
                </li>
              </span>
            ))}
          </ol>
        </nav>

        <div className="mt-8 split:max-w-[60%]">
          <h1
            id="page-title"
            data-fade
            className="display text-[2rem] leading-[1.08] sm:text-[2.75rem] xl:text-[3.25rem]"
          >
            {h1}
          </h1>
          {updated && (
            <p data-fade className="mt-4 text-sm text-white/80">
              Last updated: <Rich text={updated} />
              {reviewNote && <> · {reviewNote}</>}
            </p>
          )}
          <p data-fade className="mt-5 max-w-[40rem] text-lg leading-relaxed text-white/90">
            <Rich text={opener} />
          </p>
          {ctas.length > 0 && (
            <div data-fade className="mt-8 flex flex-wrap gap-3">
              {ctas.map((c) => (
                <Magnetic key={c.href + c.label}>
                  <Link
                    href={c.href}
                    className={`btn ${c.variant === "ghost" ? "btn-ghost" : "btn-primary"}`}
                  >
                    {c.label}
                  </Link>
                </Magnetic>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

