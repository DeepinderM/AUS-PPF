"use client";

import { useRef } from "react";
import Image from "next/image";
import { box } from "@/content";
import {
  gsap,
  useGSAP,
  releaseMotionGuard,
  REDUCED_MOTION_OK,
} from "@/lib/gsap";

export function Box() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);

      mm.add(REDUCED_MOTION_OK, () => {
        releaseMotionGuard();

        // One-off clip-path wipe as the photos scroll into view. No parallax.
        gsap.fromTo(
          "[data-clip]",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            clearProps: "clipPath",
            scrollTrigger: {
              trigger: "[data-photos]",
              start: "top 80%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      id="pack"
      ref={scope}
      aria-labelledby="box-title"
      className="relative overflow-hidden bg-charcoal py-20 text-white split:py-28"
    >
      {/* Backdrop, with a flat tint so the caption stays readable. */}
      <Image
        src={box.backdrop}
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-charcoal/45" />
      <div className="relative mx-auto max-w-[1200px] px-5">
        <h2 id="box-title" className="sr-only">
          {box.heading}
        </h2>
        <figure>
          <div data-photos className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {box.photos.map((photo) => (
              <div
                key={photo.src}
                data-clip
                className="group relative aspect-[3/2] overflow-hidden rounded-brand border border-white/15 bg-charcoal"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1264px) 588px, (min-width: 640px) 46vw, 92vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
          <figcaption className="mt-4 max-w-[46rem] text-[0.9375rem] leading-relaxed text-white/90">
            {box.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
