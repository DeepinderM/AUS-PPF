import Link from "next/link";
import { contact, footer, nav } from "@/content";
import { Logo } from "./Logo";

/** Render as a link only once the placeholder has been replaced with a real value. */
function ContactLine({ value, href }: { value: string; href?: string }) {
  const isPlaceholder = value.trim().startsWith("[");
  if (!href || isPlaceholder) return <span>{value}</span>;
  return (
    <a href={href} className="rounded-brand underline underline-offset-4 hover:text-lime">
      {value}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="grid gap-10 split:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo alt={nav.logoAlt} />
            <p className="mt-5 max-w-[22rem] text-white/85">{footer.tagline}</p>
          </div>

          <div>
            <h2 className="text-[0.8125rem] font-semibold uppercase tracking-wider text-white/85">
              {footer.contactHeading}
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <ContactLine
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
              </li>
              <li>
                <ContactLine
                  value={contact.phone}
                  href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                />
              </li>
              <li>
                <ContactLine value={contact.address} />
              </li>
            </ul>
          </div>

          <nav aria-label="On this page">
            <h2 className="text-[0.8125rem] font-semibold uppercase tracking-wider text-white/85">
              {footer.linksHeading}
            </h2>
            <ul className="mt-4 space-y-2">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-brand underline-offset-4 transition-colors duration-150 hover:text-lime hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-6 max-w-[28rem] text-sm text-white/70">{footer.brandLine}</p>
        <p className="mt-6 max-w-[28rem] text-sm text-white/70">{footer.productNote}</p>

        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1 border-t border-white/25 pt-6 text-sm text-white/85">
          <span>{footer.copyright}</span>
        </p>
      </div>
    </footer>
  );
}
