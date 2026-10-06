"use client";

import { useRef } from "react";
import Image from "next/image";
import { Rich } from "./Rich";
import { propertyIcons } from "./propertyIcons";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  releaseMotionGuard,
  REDUCED_MOTION_OK,
} from "@/lib/gsap";

// Pin + scrub needs room: wide enough for three columns and tall enough for the
// whole grid to fit in one screen while pinned.
const PINNED = "(min-width: 900px) and (min-height: 720px)";

export function FilmProperties({
  id,
  heading,
  answer,
  items,
  image,
}: {
  id: string;
  heading: string;
  answer: string;
  items: { title: string; text?: string }[];
  image: { src: string; alt: string };
}) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);

      mm.add({ motion: REDUCED_MOTION_OK, pinned: PINNED }, (context) => {
        const { motion, pinned } = context.conditions as { motion: boolean; pinned: boolean };
        if (!motion) return;
        releaseMotionGuard();
        const cards = gsap.utils.toArray<HTMLElement>("[data-film-item]");

        if (pinned) {
          // Scroll-driven sequence: the section pins, and as you scroll each
          // property's rule draws across and its content lights up, one by one.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scope.current,
              start: "top top+=72", // clear the sticky nav
              end: () => `+=${window.innerHeight * 1.4}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.fromTo(
            "[data-film-visual]",
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6 },
            0,
          );

          cards.forEach((item, i) => {
            const rule = item.querySelector("[data-rule]");
            const body = item.querySelector("[data-body]");
            tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, i)
              .fromTo(
                body,
                { opacity: 0.18, y: 28 },
                { opacity: 1, y: 0, duration: 0.8 },
                i + 0.1,
              );
          });
          tl.to({}, { duration: 0.6 }); // short hold once all six are lit
        } else {
          // Small or short screens: no pinning, a simple one-off reveal.
          gsap.fromTo(
            "[data-film-visual]",
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power3.out",
              clearProps: "clipPath",
              scrollTrigger: { trigger: "[data-film-visual]", start: "top 85%", once: true },
            },
          );
          gsap.set(cards, { opacity: 0, y: 24 });
          ScrollTrigger.batch(cards, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.08,
                overwrite: true,
                clearProps: "opacity,transform",
              }),
          });
        }
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      id={id}
      ref={scope}
      aria-labelledby={`${id}-title`}
      className="bg-ground py-16 split:flex split:min-h-[calc(100svh-72px)] split:items-center split:py-12"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="grid w-full gap-12 split:grid-cols-[4fr_8fr] split:items-start split:gap-14">
          <div>
            <h2
              id={`${id}-title`}
              className="display text-[1.625rem] leading-[1.12] text-charcoal sm:text-[1.875rem]"
            >
              {heading}
            </h2>
            <p className="mt-4 max-w-[40rem] text-lg leading-relaxed text-charcoal">
              <Rich text={answer} />
            </p>
            <div
              data-film-visual
              className="relative mt-8 aspect-[3/2] overflow-hidden rounded-brand bg-charcoal"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1264px) 380px, (min-width: 900px) 34vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>

          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 split:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.title} data-film-item className="group">
                <div className="relative h-0.5 bg-deep/25" aria-hidden="true">
                  <span data-rule className="absolute inset-0 origin-left bg-deep" />
                </div>
                <div data-body className="pt-6">
                  <svg
                    aria-hidden="true"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-deep transition-[transform,color] duration-200 ease-out group-hover:-translate-y-1.5 group-hover:text-mid"
                  >
                    {propertyIcons[i]}
                  </svg>
                  <h3 className="mt-5 text-xl font-semibold text-charcoal">{item.title}</h3>
                  {item.text && (
                    <p className="mt-2 text-base leading-relaxed text-muted">
                      <Rich text={item.text} />
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
