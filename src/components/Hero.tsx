"use client";

import { useRef } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { hero, ctas } from "@/content";
import { Magnetic } from "./Magnetic";
import {
  gsap,
  useGSAP,
  releaseMotionGuard,
  REDUCED_MOTION_OK,
} from "@/lib/gsap";

export function Hero({
  sub,
  primary = ctas.primary,
  secondary = ctas.secondary,
}: {
  sub: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);

      mm.add(
        { motion: REDUCED_MOTION_OK, wide: "(min-width: 900px)" },
        (context) => {
          const { motion, wide } = context.conditions as {
            motion: boolean;
            wide: boolean;
          };
          // The callback runs if ANY condition matches, so check motion explicitly.
          if (!motion) return;
          releaseMotionGuard();

          const tl = gsap.timeline();
          if (wide) {
            tl.from("[data-slab]", {
              xPercent: 120,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.12,
            });
          }
          tl.from(
            "[data-line]",
            { yPercent: 110, duration: 0.7, ease: "power3.out", stagger: 0.1 },
            wide ? "-=0.4" : 0,
          ).from(
            "[data-fade]",
            { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.1 },
            "-=0.3",
          );
        },
      );

      // Pointer parallax: the slabs drift against the cursor at different depths.
      // Mouse users on wide screens only; the hex pattern stays static.
      mm.add(
        {
          motion: REDUCED_MOTION_OK,
          wide: "(min-width: 900px)",
          fine: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { motion, wide, fine } = context.conditions as {
            motion: boolean;
            wide: boolean;
            fine: boolean;
          };
          const section = scope.current;
          if (!motion || !wide || !fine || !section) return;

          const depth = [16, 30, 48];
          const movers = gsap.utils.toArray<HTMLElement>("[data-slab]").map((slab) => ({
            x: gsap.quickTo(slab, "x", { duration: 0.9, ease: "power3.out" }),
            y: gsap.quickTo(slab, "y", { duration: 0.9, ease: "power3.out" }),
          }));

          const move = (e: PointerEvent) => {
            const r = section.getBoundingClientRect();
            const nx = (e.clientX - r.left) / r.width - 0.5;
            const ny = (e.clientY - r.top) / r.height - 0.5;
            movers.forEach((m, i) => {
              m.x(-nx * depth[i] * 2);
              m.y(-ny * depth[i]);
            });
          };
          const reset = () => movers.forEach((m) => (m.x(0), m.y(0)));

          section.addEventListener("pointermove", move);
          section.addEventListener("pointerleave", reset);
          return () => {
            section.removeEventListener("pointermove", move);
            section.removeEventListener("pointerleave", reset);
          };
        },
      );

      // Reduced motion: nothing to do, content is already visible.
      return () => mm.revert();
    },
    { scope },
  );

  // One <picture>, two crops: the wide shot behind the text on desktop, the
  // 3:2 shot under the text on phones. Only the matching one is downloaded.
  const common = { alt: "", fill: true, sizes: "100vw", quality: 65 };
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: hero.images.desktop, width: undefined, height: undefined });
  const {
    props: { srcSet: mobileSet, ...img },
  } = getImageProps({ ...common, src: hero.images.mobile, width: undefined, height: undefined });

  return (
    <section
      id="top"
      ref={scope}
      aria-labelledby="hero-title"
      className="hex-pattern relative flex flex-col overflow-hidden text-white split:min-h-[clamp(600px,46vw,760px)] split:justify-center"
    >
      {/* Photo: under the text on phones, full-bleed behind it from 900px. */}
      <div
        aria-hidden="true"
        className="relative order-2 aspect-[3/2] w-full split:absolute split:inset-0 split:order-none split:aspect-auto"
      >
        <picture>
          <source media="(min-width: 900px)" srcSet={desktopSet} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...img}
            alt=""
            fetchPriority="high"
            loading="eager"
            srcSet={mobileSet}
            className="object-cover split:origin-left split:scale-[1.1]"
          />
        </picture>
        {/* Flat charcoal tint keeps the copy legible over the car. */}
        <div className="absolute inset-0 hidden bg-charcoal/30 split:block" />
      </div>

      {/* Signature motif: three angled slabs, lime / mid / deep. Decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[17%] split:block"
      >
        <div data-slab className="slab bg-lime" style={{ left: "0%" }} />
        <div data-slab className="slab bg-mid" style={{ left: "31%" }} />
        <div data-slab className="slab bg-deep" style={{ left: "62%" }} />
      </div>

      {/* Text sits first on phones, and centred over the photo from 900px up.
          A normal flow item (not absolutely positioned): if the heading ever
          runs taller than the section's min-height, the section grows to fit
          it instead of the text overlapping the nav above or clipping below. */}
      <div className="relative z-10 order-1 mx-auto w-full max-w-[1200px] px-5 pb-12 pt-20 sm:pt-28 split:py-16">
        <div className="split:max-w-[46%]">
          <h1
            id="hero-title"
            className="display text-[2.25rem] leading-[1.08] sm:text-[2.75rem] split:text-[3rem] xl:text-[3.5rem]"
          >
            {hero.headline.map((line) => (
              // Mask: the line slides up from below its own clipped box.
              <span
                key={line}
                className="-my-[0.08em] block overflow-hidden py-[0.08em] pr-[0.1em]"
              >
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-fade
            className="mt-6 max-w-[30rem] text-lg leading-relaxed text-white/90"
          >
            {sub}
          </p>

          <div data-fade className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <Link href={primary.href} className="btn btn-primary">
                {primary.label}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href={secondary.href} className="btn btn-ghost">
                {secondary.label}
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
