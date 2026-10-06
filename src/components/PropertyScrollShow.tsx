"use client";

import { useRef } from "react";
import Link from "next/link";
import { Rich } from "./Rich";
import { propertyIcons } from "./propertyIcons";
import {
  gsap,
  ScrollTrigger,
  useGSAP,
  releaseMotionGuard,
  REDUCED_MOTION_OK,
} from "@/lib/gsap";

// Pin + horizontal scrub needs real room: a viewport wide enough that a row
// of cards reads properly, and tall enough that a pinned stage doesn't feel
// cramped. Below this, the row is just a plain swipeable strip — no pin, no
// scroll hijack, nothing hidden from a touch or keyboard user.
const PINNED = "(min-width: 760px) and (min-height: 600px)";

/**
 * Home page "premium feature": the six stated properties as a continuous
 * horizontal track, pinned while you scroll — the whole row translates left
 * in direct lock-step with the scrollbar (not a slideshow jumping between
 * discrete slides), while each card's icon and text animate in and a small
 * decorative symbol behind it spins on its own, independent loop. Falls back
 * to a plain swipeable row on small/short screens and for reduced-motion
 * visitors, so nothing here is ever scroll-locked away from anyone.
 */
export function PropertyScrollShow({
  heading,
  text,
  items,
}: {
  heading: string;
  text: string;
  items: { title: string; text?: string }[];
}) {
  const scope = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope.current ?? undefined);

      mm.add({ motion: REDUCED_MOTION_OK, pinned: PINNED }, (context) => {
        const { motion, pinned } = context.conditions as { motion: boolean; pinned: boolean };
        if (!motion) return;
        releaseMotionGuard();

        const cards = gsap.utils.toArray<HTMLElement>("[data-htrack-card]");

        // The small symbol behind every icon turns slowly, on its own clock
        // — pure decoration, not tied to scroll, so the section never looks
        // static even while you're reading rather than scrolling.
        gsap.to("[data-htrack-symbol]", {
          rotate: 360,
          duration: 22,
          ease: "none",
          repeat: -1,
          transformOrigin: "50% 50%",
        });

        if (pinned && track.current && stage.current) {
          gsap.set(stage.current, { overflow: "hidden" });

          const distance = () =>
            Math.max(0, track.current!.scrollWidth - stage.current!.clientWidth);

          const scrollTween = gsap.to(track.current, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: stage.current,
              start: "top top+=72",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                gsap.set("[data-htrack-bar]", { scaleX: self.progress });
              },
            },
          });

          // Each card animates in (and back out) as the horizontal track
          // carries it across the middle of the screen — driven by the same
          // scroll position as the track itself via containerAnimation, so
          // it's one continuous scroll, not a sequence of separate slides.
          cards.forEach((card) => {
            const icon = card.querySelector("[data-htrack-icon]");
            const body = card.querySelector("[data-htrack-body]");
            if (icon) {
              gsap.fromTo(
                icon,
                { scale: 0.5, opacity: 0.25, rotate: -20 },
                {
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left 85%",
                    end: "left 45%",
                    scrub: true,
                  },
                },
              );
            }
            if (body) {
              gsap.fromTo(
                body,
                { opacity: 0, y: 28 },
                {
                  opacity: 1,
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left 80%",
                    end: "left 50%",
                    scrub: true,
                  },
                },
              );
            }
          });
        } else {
          // Small or short screens: a plain reveal, and the row is a normal
          // swipeable strip (overflow-x auto from the base styles) rather
          // than a pinned, scroll-hijacked track. Targets the same icon/body
          // elements as the pinned branch (not the card wrapper) so the
          // pre-animation CSS guard — which hides those same elements before
          // this effect runs — is handled by whichever branch actually runs.
          ScrollTrigger.batch(cards, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              batch.forEach((card) => {
                const parts = card.querySelectorAll("[data-htrack-icon], [data-htrack-body]");
                gsap.to(parts, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  stagger: 0.05,
                  overwrite: true,
                  clearProps: "opacity,transform",
                });
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
      ref={scope}
      aria-label="AusPPF's stated properties"
      className="bg-charcoal py-16 text-white split:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-5">
        <div data-reveal className="mx-auto max-w-[40rem] text-center">
          <h2 className="display text-[1.75rem] leading-[1.12] sm:text-[2.125rem]">{heading}</h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            <Rich text={text} />
          </p>
        </div>

        <div
          ref={stage}
          className="relative mt-10 split:mt-14 split:min-h-[62vh] split:flex split:items-center"
        >
          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 split:snap-none split:gap-10 split:overflow-visible split:pb-0"
          >
            {/* Opens the sequence: sets up what's coming, before the six properties. */}
            <div className="flex w-[78vw] shrink-0 snap-center flex-col justify-center px-2 sm:w-[320px] split:w-[22rem]">
              <span className="display text-sm text-lime/70">Scroll to see all six</span>
              <h3 className="display mt-3 text-[1.75rem] leading-[1.1] sm:text-[2rem]">
                Six properties. One roll.
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                Every AusPPF roll carries the same six stated properties — keep scrolling to see
                each one.
              </p>
            </div>

            {items.map((item, i) => (
              <div
                key={item.title}
                data-htrack-card
                className="relative flex w-[78vw] shrink-0 snap-center flex-col items-center px-4 text-center sm:w-[320px] split:w-[22rem]"
              >
                <span className="display text-sm text-lime/70">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <div className="relative mt-5 flex h-20 w-20 items-center justify-center">
                  <svg
                    data-htrack-symbol
                    aria-hidden="true"
                    viewBox="0 0 36 36"
                    className="absolute inset-0 h-full w-full text-lime/20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <circle cx="18" cy="18" r="16" strokeDasharray="3 5" />
                  </svg>
                  <svg
                    data-htrack-icon
                    aria-hidden="true"
                    width="44"
                    height="44"
                    viewBox="0 0 36 36"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative text-lime"
                  >
                    {propertyIcons[i]}
                  </svg>
                </div>
                <div data-htrack-body>
                  <h3 className="display mt-5 text-[1.5rem] leading-tight sm:text-[1.875rem]">
                    {item.title}
                  </h3>
                  {item.text && (
                    <p className="mt-3 text-base leading-relaxed text-white/80">
                      <Rich text={item.text} />
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Closes the sequence with the next step. */}
            <div className="flex w-[78vw] shrink-0 snap-center flex-col justify-center px-2 sm:w-[320px] split:w-[22rem]">
              <span className="display text-sm text-lime/70">See it specced out</span>
              <h3 className="display mt-3 text-[1.75rem] leading-[1.1] sm:text-[2rem]">
                Read the full specs
              </h3>
              <p className="mt-3 text-base leading-relaxed text-white/70">
                Every property, explained, with the figures behind it.
              </p>
              <Link
                href="/the-film#properties"
                className="mt-5 inline-block w-fit rounded-brand underline underline-offset-4 hover:text-lime"
              >
                Go to the film page
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mx-auto mt-8 hidden h-0.5 w-full max-w-[22rem] overflow-hidden rounded-full bg-white/15 split:block"
          aria-hidden="true"
        >
          <div
            data-htrack-bar
            className="h-full w-full origin-left scale-x-0 bg-lime"
          />
        </div>
      </div>
    </section>
  );
}
