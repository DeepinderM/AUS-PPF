"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content";
import { Logo } from "./Logo";
import { Magnetic } from "./Magnetic";
import { NavEffects } from "./NavEffects";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-charcoal text-white">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-3 px-5 sm:gap-6"
      >
        <Link href="/" className="rounded-brand" aria-label={nav.logoAlt}>
          <Logo intro hopOnScroll />
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-6 split:flex xl:gap-8">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="rounded-brand border-b-2 border-transparent py-2 text-[0.9375rem] font-medium text-white/90 transition-colors duration-150 hover:text-lime aria-[current=page]:border-lime aria-[current=page]:text-lime"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden min-[400px]:block">
            <Magnetic strength={0.25}>
              <Link href={nav.cta.href} className="btn btn-primary btn-sm">
                {nav.cta.label}
              </Link>
            </Magnetic>
          </div>
          <MobileMenu />
        </div>
      </nav>
      <NavEffects />
    </header>
  );
}
