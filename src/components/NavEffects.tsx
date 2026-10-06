"use client";

import { useRef } from "react";
import { gsap, useGSAP, REDUCED_MOTION_OK } from "@/lib/gsap";

/** Thin lime bar under the nav that fills with page scroll. */
export function NavEffects() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION_OK, () => {
        gsap.to(bar.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
      });
      return () => mm.revert();
    },
    { scope: bar },
  );

  return (
    <div
      ref={bar}
      aria-hidden="true"
      className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-lime"
    />
  );
}
