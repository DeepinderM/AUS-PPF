"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Wraps a button/link so it leans toward the pointer and springs back on leave.
 * Only for mouse users who haven't asked for reduced motion. The outer span is
 * a slightly larger hit area; the inner span is what moves.
 */
export function Magnetic({
  children,
  strength = 0.3,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const zone = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const zoneEl = zone.current;
          const el = inner.current;
          if (!zoneEl || !el) return;

          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

          const move = (e: PointerEvent) => {
            const r = zoneEl.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * strength);
            yTo((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };

          zoneEl.addEventListener("pointermove", move);
          zoneEl.addEventListener("pointerleave", leave);
          return () => {
            zoneEl.removeEventListener("pointermove", move);
            zoneEl.removeEventListener("pointerleave", leave);
          };
        },
      );
      return () => mm.revert();
    },
    { scope: zone },
  );

  return (
    <span ref={zone} className="-m-3 inline-block p-3">
      <span ref={inner} className="inline-block">
        {children}
      </span>
    </span>
  );
}
