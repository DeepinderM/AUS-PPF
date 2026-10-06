"use client";

import { useRef } from "react";
import {
  gsap,
  useGSAP,
  releaseMotionGuard,
  REDUCED_MOTION_OK,
} from "@/lib/gsap";

/**
 * The logo as two stacked layers (kangaroo and wordmark) so they can move
 * separately. With `intro` the wordmark wipes in and the kangaroo hops in and
 * lands. Hovering the logo makes the kangaroo hop; with `hopOnScroll` it also
 * hops as the page scrolls down, bigger and snappier the faster you scroll.
 */
export function Logo({
  alt = "",
  intro = false,
  hopOnScroll = false,
}: {
  alt?: string;
  intro?: boolean;
  hopOnScroll?: boolean;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const hopping = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!intro) return;
      const mm = gsap.matchMedia(root.current ?? undefined);

      mm.add(REDUCED_MOTION_OK, () => {
        releaseMotionGuard();
        const tl = gsap.timeline({ delay: 0.1 });

        tl.fromTo(
          "[data-intro-word]",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "power3.out",
            clearProps: "clipPath",
          },
          0.15,
        )
          // Travel in from the left...
          .fromTo(
            "[data-intro-roo]",
            { x: -44, opacity: 0, rotation: -12 },
            { x: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "power2.out" },
            0,
          )
          // ...on a hop: up, then down with a small bounce.
          .fromTo("[data-intro-roo]", { y: 0 }, { y: -16, duration: 0.35, ease: "power2.out" }, 0)
          .to("[data-intro-roo]", { y: 0, duration: 0.45, ease: "bounce.out" }, 0.35);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  // A single hop, its height and speed set by `intensity` (0 to 1). Ignored
  // for reduced motion. Kills any hop in progress (rather than overwriting the
  // individual tweens, which would collapse the up/down pair into nothing) so
  // a fast run of scroll hops can retrigger mid-air.
  const hop = contextSafe((intensity = 1) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const height = 10 + 26 * intensity; // 10 to 36px
    const up = 0.14 + 0.1 * intensity; // fast scrolls snap up quicker
    hopping.current?.kill();
    hopping.current = gsap
      .timeline()
      .to("[data-roo]", {
        y: -height,
        rotation: -7 - 6 * intensity,
        duration: up,
        ease: "power2.out",
        transformOrigin: "50% 100%",
      })
      .to("[data-roo]", { y: 0, rotation: 0, duration: 0.5, ease: "bounce.out" });
  });

  // Scroll-driven hops: the faster the page scrolls down between two scroll
  // events, the bigger and snappier the hop. A short debounce keeps hops
  // discrete rather than firing on every event; a genuinely fast scroll still
  // retriggers well inside that window, so it reads as a quick run of hops.
  useGSAP(
    () => {
      if (!hopOnScroll) return;
      const mm = gsap.matchMedia();
      mm.add(REDUCED_MOTION_OK, () => {
        let lastY = window.scrollY;
        let lastT = performance.now();
        let lastHopT = 0;

        const onScroll = () => {
          const y = window.scrollY;
          const t = performance.now();
          const dy = y - lastY;
          const dt = Math.max(t - lastT, 1);
          lastY = y;
          lastT = t;

          if (dy <= 2 || t - lastHopT < 150) return; // ignore scroll-up and near-still ticks
          lastHopT = t;
          hop(Math.min(1, dy / dt / 2)); // ~2px/ms is a fast fling
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const introAttr = (name: string) => (intro ? { [`data-intro-${name}`]: "" } : {});

  return (
    <span
      ref={root}
      onMouseEnter={() => hop()}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      className="relative block h-8 w-[165px] min-[400px]:h-9 min-[400px]:w-[185px] sm:h-11 sm:w-[226px]"
    >
      {/* Plain <img>: both layers are already sized for 44px at 2x. */}
      <img
        src="/logo-word.png"
        alt=""
        width={226}
        height={44}
        draggable={false}
        data-word
        {...introAttr("word")}
        className="absolute inset-0 h-full w-full"
      />
      <img
        src="/logo-roo.png"
        alt=""
        width={226}
        height={44}
        draggable={false}
        data-roo
        {...introAttr("roo")}
        className="absolute inset-0 h-full w-full"
      />
    </span>
  );
}
