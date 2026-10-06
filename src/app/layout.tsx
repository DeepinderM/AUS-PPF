import type { Metadata, Viewport } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import { site } from "@/content";
import { getSiteUrl } from "@/lib/site";
import { PageMotion } from "@/components/PageMotion";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { nav } from "@/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["wdth"], // width axis, so `font-stretch: 125%` gives the wide box lettering
  variable: "--font-archivo",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    images: [{ url: site.ogImage, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#1E2321",
};

// Runs before first paint. Marks the page as "will animate" only when JS is on
// and the visitor hasn't asked for reduced motion; see .anim in globals.css.
// The timeout is a safety net only — each section removes the class itself,
// within milliseconds of its own GSAP setup running, the moment the JS bundle
// finishes hydrating. It exists purely so that if a bundle is unusually slow
// to arrive (a throttled connection, a dev-mode reload) or a component's
// effect never fires for some other reason, text isn't left invisible
// indefinitely — it's a last-resort reveal, not the normal path.
const motionGuard = `(function(){var d=document.documentElement;if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("anim");setTimeout(function(){d.classList.remove("anim")},1200)}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-AU"
      className={`${archivo.variable} ${publicSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGuard }} />
      </head>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <PageMotion />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-brand focus:bg-lime focus:px-4 focus:py-2 focus:font-semibold focus:text-charcoal"
        >
          {nav.skipLink}
        </a>
        <Nav />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
