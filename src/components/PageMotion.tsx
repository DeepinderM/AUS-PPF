"use client";

import { usePathname } from "next/navigation";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  releaseMotionGuard,
  REDUCED_MOTION_OK,
} from "@/lib/gsap";

/**
 * One quiet reveal for every content section on the page: blocks rise in once
 * as they scroll into view, and photos wipe open once. Re-runs on each route.
 * Reduced-motion visitors see everything immediately.
 */
export function PageMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION_OK, () => {
        releaseMotionGuard();

        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        gsap.set(items, { opacity: 0, y: 24 });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.09,
              overwrite: true,
              clearProps: "opacity,transform",
            }),
        });

        gsap.utils.toArray<HTMLElement>("[data-page-clip]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 100% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power3.out",
              clearProps: "clipPath",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
