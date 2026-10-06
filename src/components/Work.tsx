"use client";

import { useRef } from "react";
import Image from "next/image";
import { work } from "@/content";
import {
  gsap,
  useGSAP,
  releaseMotionGuard,
  REDUCED_MOTION_OK,
} from "@/lib/gsap";

export function Work() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);

      mm.add(REDUCED_MOTION_OK, () => {
        releaseMotionGuard();

        // Same one-off wipe as the box photos, staggered left to right.
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
              start: "top 85%",
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
      ref={scope}
      aria-label={work.heading}
      className="bg-ground py-20 split:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <div data-photos className="grid gap-4 split:grid-cols-3 split:gap-6">
          {work.photos.map((photo) => (
            <div
              key={photo.src}
              data-clip
              className="group relative aspect-[4/3] overflow-hidden rounded-brand bg-charcoal"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1264px) 380px, (min-width: 900px) 31vw, 92vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
