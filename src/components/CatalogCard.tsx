"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CardImage = { src: string; alt: string };

/** A tile in a catalogue grid: a category, or a product within one. */
export function CatalogCard({
  href,
  title,
  subtitle,
  placeholder,
  image,
  gallery,
}: {
  href: string;
  title: string;
  subtitle?: string;
  /** True for a product with no confirmed specs yet ("details coming soon"). */
  placeholder?: boolean;
  image?: CardImage;
  /** Extra shots (e.g. swatch, front, side) cycled through on hover. */
  gallery?: CardImage[];
}) {
  // Hero image first, then any gallery shots — deduplicated by src so a
  // gallery that happens to repeat the hero shot doesn't flash it twice.
  const frames: CardImage[] = [];
  if (image) frames.push(image);
  for (const g of gallery ?? []) {
    if (!frames.some((f) => f.src === g.src)) frames.push(g);
  }

  const [active, setActive] = useState(0);
  const hovering = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function stop() {
    hovering.current = false;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setActive(0);
  }

  function start() {
    if (frames.length < 2) return;
    hovering.current = true;
    timer.current = setInterval(() => {
      setActive((i) => (i + 1) % frames.length);
    }, 900);
  }

  useEffect(() => () => stop(), []);

  return (
    <Link
      href={href}
      data-reveal
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      className="group block overflow-hidden rounded-brand border-2 border-charcoal/15 bg-white transition-colors duration-150 hover:border-deep"
    >
      {frames.length > 0 && (
        // A uniform square tile, like the thumbnail strip on the product
        // page — cards in a grid stay the same height regardless of each
        // photo's own aspect ratio. The full adaptive frame is on the
        // product page itself, where there's only one photo to fit.
        <div className="relative aspect-square overflow-hidden border-b-2 border-charcoal/10 bg-white">
          {frames.map((f, i) => (
            <Image
              key={f.src}
              src={f.src}
              alt={f.alt}
              fill
              sizes="(min-width: 1264px) 380px, (min-width: 900px) 31vw, 92vw"
              className={`object-cover transition-opacity duration-500 ease-out group-hover:scale-105 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionProperty: "opacity, transform" }}
            />
          ))}
          {frames.length > 1 && (
            <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5">
              {frames.map((f, i) => (
                <span
                  key={f.src}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                    i === active ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-charcoal group-hover:text-deep">{title}</h3>
        {subtitle && <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{subtitle}</p>}
        {placeholder && (
          <p className="mt-3 text-sm font-medium text-muted">Full details coming soon</p>
        )}
        <span className="mt-4 inline-block text-sm font-semibold text-deep underline underline-offset-4">
          {placeholder ? "Enquire" : "View details"}
        </span>
      </div>
    </Link>
  );
}
