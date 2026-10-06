"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once, on the client only. Import gsap, ScrollTrigger and useGSAP
// from here everywhere so plugins are never registered twice.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

/**
 * Hand control from the CSS pre-animation state (`.anim` on <html>, set by an
 * inline script in layout.tsx) to GSAP. Call it at the top of a setup function,
 * before creating tweens: gsap.from() then reads the natural end state and
 * applies the start state inline in the same frame, with no flash.
 */
export function releaseMotionGuard() {
  document.documentElement.classList.remove("anim");
}

export const REDUCED_MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
