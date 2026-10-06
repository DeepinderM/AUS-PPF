"use client";

import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  releaseMotionGuard,
  REDUCED_MOTION_OK,
} from "@/lib/gsap";

type Feature = { title: string; text: string };

/** A product's feature list, revealed one by one as it scrolls into view. */
export function ProductFeatures({ features }: { features: Feature[] }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);
      mm.add(REDUCED_MOTION_OK, () => {
        releaseMotionGuard();
        const items = gsap.utils.toArray<HTMLElement>("[data-feature]");
        gsap.set(items, { opacity: 0, y: 20 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.08,
              overwrite: true,
              clearProps: "opacity,transform",
            }),
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
      {features.map((f) => (
        <div key={f.title} data-feature className="border-t-2 border-deep pt-4">
          <h3 className="text-base font-semibold text-charcoal">{f.title}</h3>
          <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{f.text}</p>
        </div>
      ))}
    </div>
  );
}
