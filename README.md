# AusPPF site

Marketing site for AusPPF trade installers: home, the film, trade supply, FAQ, about, contact, plus a privacy summary and terms outline. Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP.

## Run it

Needs Node 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in TRADE_WEBHOOK_URL and CONTACT_WEBHOOK_URL
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Pages

| Route | File |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/the-film` | `src/app/the-film/page.tsx` |
| `/trade-supply` | `src/app/trade-supply/page.tsx` (trade account form, `#apply`) |
| `/faq` | `src/app/faq/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/contact` | `src/app/contact/page.tsx` (contact form) |
| `/privacy`, `/terms` | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` — draft outlines, `noindex`, marked "to be reviewed by a lawyer" |

Nav, footer, fonts and site-wide schema are in `src/app/layout.tsx`, so they're the same on every page. `src/app/sitemap.ts` and `robots.ts` list every page automatically except the two `noindex` legal pages.

## Content and placeholders

All copy is in [src/content.ts](src/content.ts), in a `pages` object keyed by page (`home`, `film`, `trade`, `faq`, `about`, `contact`, `privacy`, `terms`). Each page has a `meta` (title tag, meta description), `h1`, `opener` (the direct-answer paragraph) and `sections` (heading, answer, and any list, table or step content).

Most facts are filled in now (contact details, roll size, the product range, delivery, self-healing, storage and more). Every genuinely unknown fact is still a visible `[BRACKETED PLACEHOLDER]`, highlighted in a light green on the page so it's easy to find:

| Placeholder | Where | Why it's still open |
| --- | --- | --- |
| `[COUNTRY OF ORIGIN]` | The film specs table | Whether "Australia" is a safe claim here depends on where the film is actually made — see the note below before filling this in |
| `[WARRANTY TERMS]` | The film (product range table and specs table), Trade supply, Terms outline | Needs the actual signed warranty wording, not marketing copy, before it goes live as a customer-facing commitment |
| `[ABN]` | `contact` (site-wide — Trade supply, Contact, footer, Terms outline) | AusPPF's own ABN hasn't been supplied yet |
| `[POSTCODE]` | `contact.address` (Contact page, footer, Privacy summary) | The rest of the address is filled in; only the postcode is missing |

Everything else still bracketed (returns policy, freight cost, dispatch location, tracking method, and the Privacy/Terms pages' legal specifics) needs either a business decision or a lawyer's input — a product lookup can't answer those, so they're left exactly as flagged.

**Country of origin, specifically:** stating "Australia" here is only safe if it means the film is substantially transformed in Australia — otherwise it can breach the Australian Consumer Law's country-of-origin rules, regardless of where AusPPF as a business is based. "Proudly Australian owned and operated" is a different, safe claim about the business, not the product, and doesn't need this placeholder filled in to use. Check the actual manufacturing origin against the ACCC's country-of-origin guidance (or a lawyer) before publishing either claim.

**Keeping this in sync with `docs/AusPPF-website-content.md`:** that document was the original SEO/AEO plan this content was built from. It has not been updated to match the fills above, and keeping a 65KB planning document in step with every future content edit isn't sustainable — treat `content.ts` as the source of truth from here, and use the doc only as historical background (keyword intent, the content roadmap, the original QA checklist).

To fill one in: find the sentence in `content.ts` (search for the bracketed text) and replace it, brackets and all. The highlight disappears once the text no longer starts with `[`. The footer's email and phone become clickable `mailto:`/`tel:` links the same way, in `src/components/Footer.tsx`.

**Where this content came from:** the fuller SEO/AEO copy plan (title tags, meta descriptions, keyword notes, schema, a 10-topic content roadmap and a QA checklist) is in [docs/AusPPF-website-content.md](docs/AusPPF-website-content.md). `content.ts`'s `pages` object was generated from that document, so the two should read the same; if you edit one, keep the other in sync (or treat `content.ts` as the source of truth from here and archive the doc).

## Images

Originals are in `Assets/`; the web-sized copies live in `public/` and are wired up in `content.ts`:

| File in `public/` | Used for |
| --- | --- |
| `logo-roo.png`, `logo-word.png` | The logo as two layers (kangaroo and wordmark) so the kangaroo can hop. Exported from `Logo AusPPF.pdf` with the background removed. If you get a proper SVG, replace the two `<img>` layers in `src/components/Logo.tsx`. |
| `logo.png`, `src/app/icon.png` | Flat logo (unused by the page) and the favicon (kangaroo only). |
| `hero-desktop.jpg`, `hero-mobile.jpg` | Home page hero background. |
| `film-closeup.jpg` | Beside the pinned properties grid on the film page. |
| `box-front.jpg`, `box-side.jpg`, `box-backdrop.jpg` | The two box photos and the dark backdrop behind them. `box-front.jpg` is also the Open Graph share image. |
| `installer-hands.jpg`, `ute-workshop-1.jpg`, `ute-workshop-2.jpg` | The three-photo band on the trade supply page. |
| `trade-banner.jpg` | Decorative strip above the trade supply form (the clear film roll). |

To swap an image, replace the file in `public/` with the same name (or change the path in `content.ts`, under `images`). Alt text is next to each image in `content.ts`; the hero, box backdrop and trade banner are decorative and have none.

## Forms and webhooks

Two forms, each with its own API route, honeypot field, and shared client/server validation:

| Form | Page | Route | Env var |
| --- | --- | --- | --- |
| Request trade access | Trade supply (`#apply`) | `src/app/api/trade-request/route.ts` | `TRADE_WEBHOOK_URL` |
| Send us a message | Contact | `src/app/api/contact/route.ts` | `CONTACT_WEBHOOK_URL` |

Both POST JSON to a webhook URL (e.g. a GoHighLevel inbound webhook):

1. In GoHighLevel, create a workflow with an **Inbound Webhook** trigger for each form and copy its URL.
2. Put them in `.env.local` as `TRADE_WEBHOOK_URL=...` and `CONTACT_WEBHOOK_URL=...` (and in Vercel, see below). They can point to the same workflow if you'd rather keep one inbox.
3. Submit each form once, then use "Fetch sample requests" in GoHighLevel so it learns the fields.

Trade request payload:

```json
{
  "businessName": "", "name": "", "email": "", "phone": "",
  "state": "VIC", "notes": "",
  "source": "AusPPF website: trade request",
  "submittedAt": "2026-01-01T00:00:00.000Z"
}
```

Contact payload:

```json
{
  "name": "", "businessName": "", "email": "", "phone": "",
  "topic": "A trade account", "message": "",
  "source": "AusPPF website: contact form",
  "submittedAt": "2026-01-01T00:00:00.000Z"
}
```

Responses for both: `200` sent (also returned silently for honeypot hits), `400` validation errors, `500` webhook missing or failed.

## SEO and schema

- Every page sets its own title tag, meta description and Open Graph/Twitter tags from `content.ts`, via `src/lib/meta.ts`.
- `src/lib/schema.ts` builds the JSON-LD: Organization and WebSite site-wide (in `layout.tsx`), plus per page WebPage/AboutPage/ContactPage, BreadcrumbList, a Product block on the film page (no price, rating or reviews) and an FAQPage block on the FAQ page. The FAQ schema text is generated from the visible answers in `content.ts`, so the two can't drift apart — edit the FAQ section text and the schema updates with it.
- `/privacy` and `/terms` are `noindex` until you remove `noindex: true` from their `meta` in `content.ts` (do that only after a lawyer has reviewed them).

## Deploy to Vercel

1. Push the project to a Git repository and import it at vercel.com/new. The Next.js preset is detected automatically.
2. Under **Settings → Environment Variables** add `TRADE_WEBHOOK_URL` and `CONTACT_WEBHOOK_URL` (Production, and Preview if you want to test there).
3. Optional: set `NEXT_PUBLIC_SITE_URL` to the live domain (e.g. `https://yourdomain.com.au`) for canonical, Open Graph and sitemap URLs. If blank, Vercel's production domain is used.
4. Deploy. Add your custom domain under **Settings → Domains**.

## Notes

- Nav, footer and the page-load motion guard live in `src/app/layout.tsx`, so they wrap every page once. `src/components/PageMotion.tsx` re-runs the scroll reveals on each route change.
- The film page's six properties still use the pinned, scroll-scrubbed grid (`src/components/FilmProperties.tsx`); the home page shows a plain teaser version of the same six names (`PropertiesTeaser.tsx`) linking through to it.
- Form validation rules are shared by browser and server in `src/lib/validate.ts` (trade form) and inline in `src/app/api/contact/route.ts` (contact form).
- Reduced-motion and no-JS visitors see everything immediately; nothing depends on GSAP to be readable.
