"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, REDUCED_MOTION_OK } from "@/lib/gsap";

type GalleryImage = { src: string; alt: string; width?: number; height?: number };

/**
 * Product photo gallery: a large main image with a thumbnail strip below.
 * The main frame is sized to each photo's real aspect ratio (a square swatch
 * and a landscape lifestyle shot both fill their frame exactly, no empty
 * letterbox bars either side). Switching photos crossfades the main image,
 * and a lime indicator slides to sit under the active thumbnail. Hovering
 * the main image gives it a slight zoom. All GSAP motion is skipped under
 * reduced motion.
 */
export function ProductGallery({ images, productName }: { images: GalleryImage[]; productName: string }) {
  const [active, setActive] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const firstRender = useRef(true);

  // Crossfade the main image in when the active photo changes — but not on
  // first mount, so the hero photo is simply visible immediately rather than
  // fading in (it's already rendered in the static HTML, no flash to avoid).
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      const mm = gsap.matchMedia(scope.current ?? undefined);
      mm.add(REDUCED_MOTION_OK, () => {
        gsap.fromTo(
          "[data-main-photo]",
          { opacity: 0, scale: 1.02 },
          { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" },
        );
      });
      return () => mm.revert();
    },
    { scope, dependencies: [active] },
  );

  // Slide the active-thumbnail indicator into place.
  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);
      mm.add(REDUCED_MOTION_OK, () => {
        const el = thumbRefs.current[active];
        const indicator = scope.current?.querySelector<HTMLElement>("[data-thumb-indicator]");
        if (!el || !indicator) return;
        gsap.to(indicator, {
          x: el.offsetLeft,
          width: el.offsetWidth,
          duration: 0.35,
          ease: "power2.out",
        });
      });
      return () => mm.revert();
    },
    { scope, dependencies: [active] },
  );

  // Subtle hover zoom on the main image. Fine-pointer, hover-capable, motion-ok only.
  const { contextSafe } = useGSAP(() => {}, { scope });
  const onEnter = contextSafe(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to("[data-main-photo]", { scale: 1.05, duration: 0.6, ease: "power2.out" });
  });
  const onLeave = contextSafe(() => {
    gsap.to("[data-main-photo]", { scale: 1, duration: 0.5, ease: "power2.out" });
  });

  if (images.length === 0) return null;
  const current = images[Math.min(active, images.length - 1)];
  const ratio = current.width && current.height ? current.width / current.height : 1;

  return (
    <div ref={scope} className="split:sticky split:top-[96px]">
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ aspectRatio: ratio }}
        className="relative overflow-hidden rounded-brand border-2 border-charcoal/10 bg-white"
      >
        {/* The frame's aspect ratio matches this exact photo (set above), so
            object-cover never needs to crop anything away. */}
        <Image
          key={current.src}
          data-main-photo
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1264px) 560px, (min-width: 900px) 50vw, 92vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div
          role="group"
          aria-label={`${productName} photos`}
          className="relative mt-4 flex gap-3 border-b-2 border-charcoal/10 pb-3"
        >
          <span
            data-thumb-indicator
            aria-hidden="true"
            className="absolute bottom-[-2px] left-0 h-[2px] bg-deep"
            style={{ width: 0 }}
          />
          {images.map((img, i) => (
            <button
              key={img.src}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              aria-current={i === active}
              aria-label={`View photo ${i + 1} of ${images.length}`}
              onClick={() => setActive(i)}
              className="relative aspect-square w-16 shrink-0 overflow-hidden rounded-brand border-2 border-charcoal/10 bg-white opacity-60 transition-[opacity,border-color] duration-150 hover:opacity-100 aria-[current=true]:border-deep aria-[current=true]:opacity-100"
            >
              {/* Thumbnails stay uniform squares, cropped where needed — a
                  small fixed strip, unlike the big adaptive main frame. */}
              <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
