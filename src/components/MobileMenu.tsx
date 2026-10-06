"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content";

/** Full-screen nav panel under 640px, since five links no longer fit inline. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const prev = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="split:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-brand text-white"
      >
        <span className="sr-only">{open ? nav.menuClose : nav.menuOpen}</span>
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-charcoal"
      >
        <nav aria-label="Mobile" className="px-5 py-8">
          <ul className="space-y-1">
            {nav.links.map((link) => (
              <li key={link.href} className="border-b border-white/15">
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="block py-4 text-lg font-medium text-white/90 aria-[current=page]:text-lime"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={nav.cta.href} className="btn btn-primary mt-8 w-full">
            {nav.cta.label}
          </Link>
        </nav>
      </div>
    </div>
  );
}
