import type { ReactNode } from "react";

// 36px stroke icons, one per property, matched by position (0 to 5). Plain
// data, no "use client": FilmProperties and PropertyScrollShow (both client
// components) import from here. Exporting this array from a "use client"
// file instead silently breaks it for server-component importers — across
// that boundary Next.js turns client-module exports into opaque references,
// so indexing into the array returns undefined and every icon renders empty.
export const propertyIcons: ReactNode[] = [
  // Sun, with a clear ring: stays clear (anti-yellowing).
  <>
    <circle cx="18" cy="18" r="6" />
    <path d="M18 4v4M18 28v4M4 18h4M28 18h4M8.1 8.1l2.8 2.8M25.1 25.1l2.8 2.8M8.1 27.9l2.8-2.8M25.1 10.9l2.8-2.8" />
  </>,
  // Shield with a scuff mark across it (scratch resistant).
  <>
    <path d="M18 4l12 4.5v8.5c0 7.5-5 12.5-12 15-7-2.5-12-7.5-12-15V8.5L18 4z" />
    <path d="M12 21l9-9M15 24l9-9" />
  </>,
  // Four-point sparkle (ultra bright).
  <path d="M18 4c1 8 4 11 12 14-8 3-11 6-12 14-1-8-4-11-12-14 8-3 11-6 12-14z" />,
  // Circular arrows: heals itself (self-healing).
  <>
    <path d="M30 18a12 12 0 0 1-20.5 8.5M6 18A12 12 0 0 1 26.5 9.5" />
    <path d="M27 3v7h-7M9 33v-7h7" />
  </>,
  // Squeegee on a panel (easy installation).
  <>
    <rect x="4" y="6" width="28" height="12" rx="2" />
    <path d="M18 18v8M13 26h10v6H13z" />
  </>,
  // Droplet with a shine (stain resistant).
  <>
    <path d="M18 4c6 8 10 12.5 10 18a10 10 0 0 1-20 0c0-5.5 4-10 10-18z" />
    <path d="M13 23a5 5 0 0 0 4 4" />
  </>,
];
