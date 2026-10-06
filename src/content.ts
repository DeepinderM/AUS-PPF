/**
 * All site copy lives here. Edit text, swap [BRACKETED PLACEHOLDERS] for real
 * details, and every page updates. Anything still in [SQUARE BRACKETS] is
 * deliberately unknown and shows on the site, highlighted, until you fill it in.
 *
 * Page copy is in `pages` at the bottom. Inline formatting in any string:
 *   [link text](/path)   a link
 *   **bold**             bold text
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][]; note?: string }
  | { type: "h3"; title: string; blocks: Block[] };

export type Section = {
  id: string;
  h2: string;
  /** Direct answer (40 to 60 words), quoted on its own by search and AI answers. */
  answer: string;
  blocks?: Block[];
};

export type PageMeta = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
};

export type PageContent = {
  meta: PageMeta;
  h1: string;
  opener: string;
  updated?: string;
  reviewNote?: string;
  introBlocks?: Block[];
  /** The six film properties (home: names only; film page: with a sentence each). */
  properties?: { title: string; text?: string }[];
  sections: Section[];
};

export type PageKey =
  | "home"
  | "film"
  | "faq"
  | "about"
  | "contact"
  | "privacy"
  | "terms";

export const pageSlugs: Record<PageKey, string> = {
  home: "/",
  film: "/the-film",
  faq: "/faq",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
};

/** Short names for breadcrumbs and schema. */
export const pageLabels: Record<PageKey, string> = {
  home: "Home",
  film: "The film",
  faq: "FAQ",
  about: "About",
  contact: "Contact",
  privacy: "Privacy summary",
  terms: "Terms outline",
};

// ---------------------------------------------------------------------------
// Site-wide
// ---------------------------------------------------------------------------

export const site = {
  name: "AusPPF",
  brandLine: "Made for the trade.",
  title: "Paint protection film supplier Australia | AusPPF",
  description:
    "AusPPF supplies paint protection film for cars and utes in Australia. Browse the range or enquire for pricing and availability.",
  schemaDescription:
    "AusPPF supplies paint protection film (PPF) for cars and utes in Australia.",
  ogImage: "/box-front.jpg",
  locale: "en_AU",
};

export const nav = {
  skipLink: "Skip to content",
  logoAlt: "AusPPF, back to home",
  menuOpen: "Menu",
  menuClose: "Close menu",
  links: [
    { label: "The film", href: "/the-film" },
    { label: "Products", href: "/products" },
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Enquire now", href: "/contact" },
};

export const ctas = {
  primary: { label: "Enquire now", href: "/contact" },
  secondary: { label: "Browse products", href: "/products" },
};

/** Closing call-to-action band shown at the bottom of most pages. */
export const closing = {
  heading: "Ready to enquire?",
  text: "Tell us what you're after. We'll reply with pricing and availability.",
  cta: ctas.primary,
};

export const contact = {
  email: "info@ausppf.com.au",
  phone: "1300 151 616",
  address: "775 Anakie Road, Lovely Banks VIC 3213",
  hours: "Monday to Friday, 9:00 am to 5:00 pm",
  labels: {
    email: "Email",
    phone: "Phone",
    address: "Address or service area",
    hours: "Hours",
  },
};

// ---------------------------------------------------------------------------
// Images (alt text is written to describe what is in each photo)
// ---------------------------------------------------------------------------

export const images = {
  filmCloseup: {
    src: "/film-closeup.jpg",
    alt: "Close-up of glossy green paintwork with water beads sitting on the surface.",
  },
  roll: {
    src: "/trade-banner.jpg",
    alt: "A roll of clear paint protection film on a workbench beside a squeegee and a green microfibre cloth.",
  },
  hands: {
    src: "/installer-hands.jpg",
    alt: "An installer in black gloves squeegeeing paint protection film onto a car bonnet.",
  },
  ute1: {
    src: "/ute-workshop-1.jpg",
    alt: "A white dual-cab ute in a workshop with dark grey walls and a green feature wall.",
  },
  ute2: {
    src: "/ute-workshop-2.jpg",
    alt: "A white dual-cab ute on a polished concrete floor in a dark workshop with a green wall.",
  },
  boxFront: {
    src: "/box-front.jpg",
    alt: "The AusPPF paint protection film box at an angle on a charcoal surface, with the AusPPF logo and green angled panels on the front.",
  },
  boxSide: {
    src: "/box-side.jpg",
    alt: "The AusPPF box straight on, with the six film properties printed along the side as icons: anti-yellowing, scratch resistant, ultra bright, self-healing, easy installation and stain resistant.",
  },
};

export const hero = {
  // One entry per line; each line is revealed separately.
  headline: ["Paint protection", "film for cars", "and utes", "in Australia"],
  // Atmosphere only, so no alt text.
  images: { desktop: "/hero-desktop.jpg", mobile: "/hero-mobile.jpg" },
};

export const box = {
  heading: "The box",
  backdrop: "/box-backdrop.jpg", // decorative, no alt
  photos: [images.boxFront, images.boxSide],
  caption:
    "The AusPPF box: brand and green panels on the front, the six properties along the side.",
};

export const work = {
  heading: "Fitted on cars and utes",
  photos: [images.hands, images.ute1, images.ute2],
};

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------

export const states = [
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NSW", label: "New South Wales" },
  { value: "NT", label: "Northern Territory" },
  { value: "QLD", label: "Queensland" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "VIC", label: "Victoria" },
  { value: "WA", label: "Western Australia" },
];

/** Enquiry form (Contact page, and every product's "Enquire now" button). */
export const contactForm = {
  heading: "Send us a message",
  requiredNote: "Fields marked * are required.",
  productLabel: "Enquiring about",
  fields: {
    name: { label: "Your name", helper: "First and last name." },
    businessName: { label: "Business name", helper: "The business you're enquiring on behalf of." },
    email: { label: "Email", helper: "We reply here." },
    phone: { label: "Phone", helper: "So we can call you back if needed." },
    topic: {
      label: "What is your enquiry about?",
      helper: "Choose the closest match.",
      placeholder: "Select…",
      options: [
        "A product",
        "An order",
        "Trade supply",
        "Something else",
      ],
    },
    message: {
      label: "Message",
      helper: "Give us the detail we need to answer properly the first time.",
    },
  },
  privacy: "We use these details to reply to your message. Read our [privacy summary](/privacy).",
  submit: "Send message",
  sending: "Sending…",
  success: "Thanks, we've got your message. We'll reply during business hours.",
  failure: `Sorry, we couldn't send your message. Please try again, or email ${contact.email}.`,
  fixErrors: "Please fix the highlighted fields and try again.",
};

// ---------------------------------------------------------------------------
// Footer, 404, cookies
// ---------------------------------------------------------------------------

export const footer = {
  tagline: "Paint protection film for cars and utes.",
  brandLine: "Made for the trade — and open to everyone who wants the same protection.",
  contactHeading: "Contact",
  linksHeading: "On this site",
  links: [
    { label: "The film", href: "/the-film" },
    { label: "Products", href: "/products" },
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy summary", href: "/privacy" },
    { label: "Terms outline", href: "/terms" },
  ],
  copyright: "© 2026 AusPPF",
  productNote:
    "Product properties are AusPPF's stated properties. Results vary with the vehicle, the install and aftercare.",
};

export const notFound = {
  title: "Page not found | AusPPF",
  h1: "Page not found",
  body: "That page has moved or does not exist. Try our products, or get in touch.",
  links: [
    { label: "Products", href: "/products" },
    { label: "Enquire now", href: "/contact" },
    { label: "Back to home", href: "/" },
  ],
};

/** Not shown yet: the site sets no analytics cookies. Use if that changes. */
export const cookies = {
  heading: "Cookies",
  text: "We use [ANALYTICS TOOL] to see how this site is used. It only runs if you accept. Read our [privacy summary](/privacy).",
  accept: "Accept analytics",
  decline: "Decline",
};

// ---------------------------------------------------------------------------
// Page copy
// ---------------------------------------------------------------------------

export const pages: Record<PageKey, PageContent> = {
  home: {
    meta: {
      title: "Paint protection film supplier Australia | AusPPF",
      description: "AusPPF supplies paint protection film for cars and utes in Australia. Browse the range, then enquire for pricing and availability.",
      ogTitle: "AusPPF: paint protection film for cars and utes",
      ogDescription: "Paint protection film for cars and utes in Australia. Browse the range and enquire — open to installers and everyday customers.",
    },
    h1: "Paint protection film for cars and utes in Australia",
    opener: "AusPPF supplies paint protection film (PPF) for cars and utes in Australia. Trade installers fit it every day, and you don't need a trade account to buy it — browse the range and enquire, and we'll reply with pricing and availability.",
    sections: [
      {
        id: "what-is-ausppf",
        h2: "What is AusPPF?",
        answer: "AusPPF is a paint protection film brand for cars and utes. The film comes in rolls, cut and fitted to panels, and is stocked across several lines and finishes. Six properties are printed on the box: anti-yellowing, scratch resistant, ultra bright, self-healing, easy installation and stain resistant.",
        blocks: [
          {
            type: "p",
            text: "Made for the trade means plain specs and straight answers, whether you're a professional installer or fitting it yourself. Full details, including the specs table, are on the [film page](/the-film).",
          },
        ],
      },
      {
        id: "who-buys-ausppf-paint-protection-film",
        h2: "Who buys AusPPF paint protection film in Australia?",
        answer: "AusPPF supplies paint protection film in Australia to trade installers and everyday customers alike. There's no trade account or ABN needed to buy — browse the [products catalogue](/products) and enquire on any line for pricing and availability.",
        blocks: [
          {
            type: "p",
            text: "AusPPF is used by:",
          },
          {
            type: "ul",
            items: [
              "PPF installers",
              "Detailing shops that offer PPF",
              "Wrap shops that fit PPF",
              "Anyone fitting it themselves",
            ],
          },
          {
            type: "p",
            text: "See the full range on the [products page](/products).",
          },
        ],
      },
      {
        id: "properties",
        h2: "What are the six properties of AusPPF film?",
        answer: "The AusPPF box lists six properties. They are the brand's stated properties, not test results. Each one is explained in plain words on the [film page](/the-film), so you can decide if the film suits your work and your customers' cars before you apply.",
      },
      {
        id: "how-do-i-buy-ausppf-film",
        h2: "How do I buy AusPPF film?",
        answer: "Buying AusPPF takes two steps. You browse the range and enquire on the product you want, and we reply with pricing and availability. There's no account to open first, and no minimum order beyond a single roll.",
        blocks: [
          {
            type: "ol",
            items: [
              "**Browse.** Find the line and finish you want in the [products catalogue](/products).",
              "**Enquire.** Tell us what you're after on the product page, or [contact us](/contact) directly.",
            ],
          },
          {
            type: "p",
            text: "Trade installers ordering regularly can ask about trade pricing when they enquire.",
          },
        ],
      },
      {
        id: "why-buy-from-ausppf",
        h2: "Why buy from AusPPF?",
        answer: "AusPPF is made for the trade: plain specs, straight answers, and a supplier that says what it knows and marks what it doesn't. That standard applies whether you're a professional installer or fitting the film yourself.",
      },
    ],
    properties: [
      {
        title: "Anti-yellowing",
      },
      {
        title: "Scratch resistant",
      },
      {
        title: "Ultra bright",
      },
      {
        title: "Self-healing",
      },
      {
        title: "Easy installation",
      },
      {
        title: "Stain resistant",
      },
    ],
  },
  film: {
    meta: {
      title: "Paint protection film for installers | AusPPF",
      description: "AusPPF Paint Protection Film has six stated properties, from anti-yellowing to self-healing. See the range and specs, then enquire — open to everyone.",
      ogTitle: "AusPPF Paint Protection Film",
      ogDescription: "Six stated properties, from anti-yellowing to self-healing. Browse the range and enquire.",
    },
    h1: "AusPPF Paint Protection Film",
    opener: "AusPPF Paint Protection Film is supplied in rolls, cut and fitted to cars and utes. The box lists six properties: anti-yellowing, scratch resistant, ultra bright, self-healing, easy installation and stain resistant. The full range, with specs for each line, is on the [products page](/products/paint-protection-film).",
    sections: [
      {
        id: "what-ppf-rolls-does-ausppf-supply",
        h2: "What PPF does AusPPF supply?",
        answer: "AusPPF supplies paint protection film for cars and utes, across AusPPF Clear 7.5 and AusPPF Matte, plus a full Colour PPF range. Roll widths and lengths are 1.52 m wide, 15 m per roll. There's no trade account needed — browse the range and enquire, and we reply with pricing and availability.",
        blocks: [
          {
            type: "p",
            text: "See the full range, with specs for each line, on the [products page](/products/paint-protection-film). Plan your panels against the roll size before you order — if you're unsure, read the [FAQ on roll sizes](/faq#roll-sizes) or ask us.",
          },
        ],
      },
      {
        id: "properties",
        h2: "What are the six properties of AusPPF film?",
        answer: "These are the six properties printed on the AusPPF box. They are the brand's stated properties, not test results. How any film performs also depends on the vehicle, the install, the conditions and the care it gets after fitting. Ask us if you need more detail.",
      },
      {
        id: "who-is-ausppf-film-for",
        h2: "Who is AusPPF film for?",
        answer: "AusPPF film is for anyone protecting a car or ute: trade installers, detailing shops, wrap shops, and people fitting it themselves. There's no account or minimum order beyond a single roll — the specs for each line are on the [products page](/products/paint-protection-film).",
      },
      {
        id: "how-do-i-compare-ppf-rolls-before-i-buy",
        h2: "How do I compare PPF rolls before I buy?",
        answer: "Compare the same five things on every spec sheet: film thickness, finish, roll width and length, warranty terms and support. Ask each supplier for the figures in writing. Then set AusPPF's confirmed specs beside the rest and choose the film that suits the panels you fit most.",
        blocks: [
          {
            type: "p",
            text: "Use the specs table above to see where AusPPF's figures stand.",
          },
        ],
      },
      {
        id: "how-do-i-buy-ausppf-rolls",
        h2: "How do I buy AusPPF rolls?",
        answer: "Find the line and finish you want in the [products catalogue](/products), then enquire on that product's page. We reply with pricing and availability — no trade account required. Read the [FAQ](/faq) first if you have questions.",
      },
    ],
    properties: [
      {
        title: "Anti-yellowing",
        text: "The film is made to stay clear over time instead of turning yellow. [What anti-yellowing means](/faq#anti-yellowing).",
      },
      {
        title: "Scratch resistant",
        text: "The film is made to take everyday scuffs so the paint underneath does not.",
      },
      {
        title: "Ultra bright",
        text: "The film has a bright, glossy look that lets the paint colour show through.",
      },
      {
        title: "Self-healing",
        text: "Light marks in the film are made to heal out. [What self-healing means](/faq#self-healing).",
      },
      {
        title: "Easy installation",
        text: "The film is designed to be straightforward to fit.",
      },
      {
        title: "Stain resistant",
        text: "The film is made to resist stains so the surface stays clean.",
      },
    ],
  },
  faq: {
    meta: {
      title: "Paint protection film Australia FAQ | AusPPF",
      description: "Paint protection film FAQ: answers on PPF vs vinyl wrap, self-healing, utes, roll sizes, ordering, delivery and warranty. No trade account needed.",
      ogTitle: "Paint protection film Australia: FAQ",
      ogDescription: "PPF vs vinyl wrap, self-healing, utes, roll sizes, ordering, delivery and warranty. Straight answers, open to everyone.",
    },
    h1: "Paint protection film Australia: FAQ",
    updated: "22 September 2026",
    opener: "AusPPF supplies paint protection film (PPF) in Australia, open to trade installers and everyday customers alike. These answers cover what PPF is, how it compares with vinyl wrap and ceramic coating, how AusPPF film suits utes, and how roll sizes, ordering, delivery, pricing, warranty, returns and storage work.",
    sections: [
      {
        id: "what-is-ppf",
        h2: "What is paint protection film (PPF)?",
        answer: "Paint protection film (PPF) is a protective film fitted over a vehicle's paint. It is made to take the knocks that would otherwise mark the paint, such as stone chips, scuffs and light scratches. Trade installers cut and fit it to panels, and it can be self-fitted too. AusPPF supplies PPF for cars and utes.",
      },
      {
        id: "wholesale",
        h2: "Do you sell paint protection film in Australia?",
        answer: "Yes, and it's open to everyone — no trade account needed. AusPPF supplies paint protection film in Australia to professional installers, detailing shops, wrap shops and people fitting it themselves. Pricing isn't published on this site; enquire on the [products page](/products) and we reply with pricing and availability.",
      },
      {
        id: "who-can-buy",
        h2: "Who can buy AusPPF film?",
        answer: "Anyone. AusPPF is open to trade installers, detailing shops, wrap shops and DIY fitters — there's no ABN or trade account needed. If you're not sure a line suits your job, [contact us](/contact) and ask before you order.",
      },
      {
        id: "ppf-vs-vinyl-vs-ceramic",
        h2: "What is the difference between PPF, vinyl wrap and ceramic coating?",
        answer: "PPF is a protective film for impacts and scuffs. Vinyl wrap changes the colour or finish of a vehicle and adds some surface cover. Ceramic coating is a liquid layer that adds gloss and makes washing easier. Many shops offer more than one. This is a general comparison, not AusPPF test data.",
        blocks: [
          {
            type: "h3",
            title: "Quick comparison",
            blocks: [
              {
                type: "table",
                head: ["", "PPF", "Vinyl wrap", "Ceramic coating"],
                rows: [
                  [
                    "Main job",
                    "Protect paint from impacts and scuffs",
                    "Change colour or finish",
                    "Add gloss and ease of cleaning",
                  ],
                  [
                    "Form",
                    "Film, fitted in panels",
                    "Film, fitted in panels",
                    "Liquid, applied and cured",
                  ],
                  [
                    "Usually chosen for",
                    "Bonnets, guards, mirrors and other high-wear panels",
                    "Full colour changes",
                    "Long-term gloss and easier washing",
                  ],
                  ["Can be combined", "Yes", "Yes", "Yes"],
                ],
                note: "General industry comparison. It does not describe AusPPF test results.",
              },
            ],
          },
        ],
      },
      {
        id: "self-healing",
        h2: "What does self-healing mean in PPF?",
        answer: "In PPF, self-healing usually means light surface marks fade out of the film, often with warmth from the sun or warm water. AusPPF lists self-healing as a stated property. On AusPPF film, light marks heal out with heat — installers use sunlight, warm water or a heat gun. Cuts that go through the film will not heal.",
      },
      {
        id: "anti-yellowing",
        h2: "What does anti-yellowing mean in PPF?",
        answer: "Anti-yellowing means the film is made to stay clear over time instead of turning yellow. AusPPF lists it as a stated property. It is not a guarantee. Sun, heat, care and install quality all affect how any film ages. Warranty cover for yellowing, if any, is set out in the product's warranty terms, available on request.",
      },
      {
        id: "utes",
        h2: "Is AusPPF film suited to utes?",
        answer: "AusPPF film is sold for cars and utes. Utes have large flat panels, tray edges and tailgates that take knocks. Which panels to cover depends on the ute and how it is used. Check the roll size (1.52 m wide, 15 m per roll) to plan your panels before you order. Read the [film page](/the-film) for the specs.",
      },
      {
        id: "roll-sizes",
        h2: "What roll sizes does AusPPF supply?",
        answer: "AusPPF rolls come in one size: 1.52 m wide, 15 m per roll. AusPPF doesn't offer custom cutting — every order is for one or more full rolls. Ask for the current stock and lead time when you enquire.",
      },
      {
        id: "ordering",
        h2: "How do I order AusPPF rolls?",
        answer: "Find the line you want on the [products page](/products) and enquire on that product, or [contact us](/contact) directly. The minimum order is one roll. AusPPF supplies full rolls only, no custom cutting. We confirm your order and delivery details by phone or email.",
      },
      {
        id: "pricing",
        h2: "How much does AusPPF film cost?",
        answer: "Pricing isn't published on this site. Enquire on the product you want and we reply with pricing and availability. Prices are in Australian dollars and exclude GST. Ask us if you want a quote for a larger order or a regular supply.",
      },
      {
        id: "delivery",
        h2: "Where and how fast do you deliver?",
        answer: "We deliver Australia-wide, typically within 8 to 10 business days. Freight is quoted with your order. Orders ship from Victoria. We email tracking details once your order ships. Check the delivery details for your state or territory when you apply.",
      },
      {
        id: "warranty",
        h2: "Does AusPPF film come with a warranty?",
        answer: "Warranty terms for each AusPPF product line are available on request. Australian Consumer Law guarantees may also apply to your purchase, and no warranty removes them. If you think a roll is faulty, contact us and keep your order details.",
      },
      {
        id: "returns",
        h2: "What is your returns policy?",
        answer: "Unopened, undamaged rolls can be returned within 14 days with our prior approval. The buyer pays return freight unless the return is due to a fault or our error. We don't accept change-of-mind returns on opened rolls. If a roll arrives damaged or faulty, contact us as soon as you can with your order number and photos. Your rights under the Australian Consumer Law still apply. Read our [terms outline](/terms) for the full order terms.",
      },
      {
        id: "storage",
        h2: "How should I store PPF rolls?",
        answer: "Store rolls upright, in the original packaging, in a cool, dry place away from direct sunlight and extreme temperatures. Check each roll for damage when it arrives, before you cut. If you are unsure how to store a roll, ask us before you open it. We would rather answer a quick question than see a spoiled roll.",
      },
      {
        id: "samples",
        h2: "Can I get a sample?",
        answer: "We don't currently supply samples. See the [specs table](/the-film) for the figures we have confirmed.",
      },
    ],
  },
  about: {
    meta: {
      title: "About AusPPF | PPF installer supplies for the trade",
      description: "About AusPPF: PPF installer supplies made for the trade. Who is behind the brand, why it exists and who we sell to in Australia.",
      ogTitle: "About AusPPF: made for the trade",
      ogDescription: "AusPPF supplies paint protection film for cars and utes in Australia. Meet the brand, and see who it's for.",
    },
    h1: "About AusPPF: paint protection film made for the trade",
    opener: "AusPPF is a paint protection film (PPF) brand for cars and utes in Australia, used by trade installers and everyday customers alike. AusPPF is run by the team behind Quick Signage, a Geelong-based trade signage and printing business. Made for the trade, and open to everyone. Plain specs, straight answers.",
    sections: [
      {
        id: "who-is-behind-ausppf",
        h2: "Who is behind AusPPF?",
        answer: "AusPPF is run by the team behind Quick Signage, a Geelong-based trade signage and printing business. We supply trade installers directly, so a question about an order or a spec reaches a real person, not a call centre.",
      },
      {
        id: "why-does-ausppf-exist",
        h2: "Why does AusPPF exist?",
        answer: "AusPPF exists to supply paint protection film to the trade in Australia. Installers need a supplier that answers plainly about roll sizes, pricing and delivery, and treats them as professionals.",
      },
      {
        id: "what-does-made-for-the-trade-mean",
        h2: "What does \"made for the trade\" mean?",
        answer: "Made for the trade means AusPPF is written and specced to a professional standard — and open to anyone, not sold through a trade account. We keep specs plain, we say what we know, and we mark what we do not. That is the standard we hold ourselves to on this site.",
        blocks: [
          {
            type: "ul",
            items: [
              "**Open to everyone.** No trade account or ABN needed to enquire or buy.",
              "**Plain specs.** Six properties, stated as the brand's properties. No inflated numbers.",
              "**Straight answers.** Roll sizes, pricing, delivery and warranty are explained in the [FAQ](/faq).",
            ],
          },
        ],
      },
      {
        id: "what-does-ausppf-sell",
        h2: "What does AusPPF sell?",
        answer: "AusPPF supplies paint protection film for cars and utes. See the full range on the [products page](/products).",
      },
      {
        id: "where-does-ausppf-supply",
        h2: "Where does AusPPF supply?",
        answer: "AusPPF supplies trade installers Australia-wide. Delivery is typically within 8 to 10 business days. If you are outside that area, [contact us](/contact) and ask before you apply. We will tell you plainly whether we can supply your shop.",
      },
    ],
  },
  contact: {
    meta: {
      title: "Contact AusPPF | Buy PPF rolls",
      description: "Buy PPF rolls from AusPPF: contact us by email, phone or form. Open to installers, detailing and wrap shops, and everyday customers.",
      ogTitle: "Contact AusPPF",
      ogDescription: "Buy PPF rolls, no trade account needed. Contact AusPPF by email, phone or form.",
    },
    h1: "Contact AusPPF to buy PPF rolls",
    opener: "To buy PPF rolls from AusPPF, browse the [products page](/products) and enquire, or contact us with the details below. We answer enquiries from installers, detailing shops, wrap shops and everyday customers. Expect a reply during business hours.",
    sections: [
      {
        id: "how-do-i-buy-ppf-rolls-from-ausppf",
        h2: "How do I buy PPF rolls from AusPPF?",
        answer: "Find the line you want on the [products page](/products) and enquire on that product's page, or use the form below. We reply with pricing and availability — no trade account needed. Read the [FAQ](/faq) first if you have questions.",
      },
    ],
  },
  privacy: {
    meta: {
      title: "Privacy summary | AusPPF",
      description: "How AusPPF collects, uses, stores and shares the details you give us when you enquire or contact us. To be reviewed by a lawyer before publishing.",
      noindex: true,
    },
    h1: "Privacy summary",
    updated: "5 October 2026",
    reviewNote: "To be reviewed by a lawyer before publishing.",
    opener: "This summary explains what AusPPF collects when you use this site, why we collect it and who to ask about it. We collect only what we need to reply to enquiries and orders. This is a short summary, not the full privacy policy.",
    sections: [
      {
        id: "what-information-does-ausppf-collect",
        h2: "What information does AusPPF collect?",
        answer: "We collect what you type into our forms: business name, your name, email, phone, state or territory, and any notes you add. We also collect basic website usage data, such as pages viewed and device and browser type, using analytics tools and cookies.",
      },
      {
        id: "how-does-ausppf-use-and-share-it",
        h2: "How does AusPPF use and share it?",
        answer: "We use your details to reply to your enquiry and manage your order. We do not sell your details. We share them only with providers that help us run the business, such as our CRM, email and website hosting providers. Some of these providers may store data outside Australia. We take reasonable steps to make sure they handle your details securely.",
        blocks: [
          {
            type: "p",
            text: "We only send you emails about your enquiry or order. If we send marketing emails, each one includes an unsubscribe link.",
          },
        ],
      },
      {
        id: "how-long-does-ausppf-keep-it-and-who-do-i-contac",
        h2: "How long does AusPPF keep it, and who do I contact?",
        answer: "We keep enquiry details for 2 years. We keep account and order details for 7 years, as business and tax records require. You can ask to see, correct or delete your details. Email info@ausppf.com.au or write to 775 Anakie Road, Lovely Banks VIC 3213, and use \"Privacy\" in the subject line.",
        blocks: [
          {
            type: "p",
            text: "We'll reply within 30 days. If you're not happy with our response, you can complain to the [Office of the Australian Information Commissioner](https://www.oaic.gov.au). Privacy enquiries go to our Privacy Officer.",
          },
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: "Terms outline | AusPPF",
      description: "AusPPF's terms of sale: trade accounts, pricing, ordering, payment, delivery, returns, warranty and liability. To be reviewed by a lawyer before publishing.",
      noindex: true,
    },
    h1: "Terms outline",
    updated: "5 October 2026",
    reviewNote: "To be reviewed by a lawyer before publishing.",
    opener: "These are AusPPF's terms of sale, in plain language. Buying from AusPPF does not require a trade account — anyone can enquire and buy. A lawyer should review the final wording before this page is relied on as binding terms.",
    sections: [
      {
        id: "who-can-buy",
        h2: "Who can buy",
        answer: "Open to everyone — no trade account required.",
      },
      {
        id: "applications-and-approval",
        h2: "Applications and approval",
        answer: "Trade accounts are open to any installer with a valid ABN. Apply through the enquiry form. We may ask for proof of trade. We may decline or close an account at our discretion.",
      },
      {
        id: "pricing-and-quotes",
        h2: "Pricing and quotes",
        answer: "We don't publish prices. We provide a written quote on request. Quotes are valid for 14 days and state whether GST is included.",
      },
      {
        id: "ordering-and-minimum-order",
        h2: "Ordering and minimum order",
        answer: "Submit the enquiry form and our team will contact you to confirm your order. The minimum order is one full roll. We don't cut custom sizes.",
      },
      {
        id: "payment-terms",
        h2: "Payment terms",
        answer: "Payment terms are confirmed in writing when your trade account is set up. Late payment may result in account suspension.",
      },
      {
        id: "delivery-risk-and-title",
        h2: "Delivery, risk and title",
        answer: "We deliver Australia-wide. Typical delivery is 8–10 business days from order confirmation. Delivery times are estimates. Risk passes to you when the goods are delivered. Title passes to you when we receive payment in full.",
      },
      {
        id: "returns-faults-and-refunds",
        h2: "Returns, faults and refunds",
        answer: "Our goods come with guarantees under the Australian Consumer Law that can't be excluded. If a roll is faulty or not as described, contact us promptly with your order number and photos, and we'll remedy it as the law requires.",
        blocks: [
          {
            type: "p",
            text: "We don't accept change-of-mind returns on opened rolls. Unopened, undamaged rolls may be returned within 14 days with our prior approval. The buyer pays return freight unless the return is due to a fault or our error.",
          },
        ],
      },
      {
        id: "warranty",
        h2: "Warranty",
        answer: "Warranty terms for each AusPPF product line are provided in writing on request. Warranty doesn't cover damage from incorrect installation, impact, chemicals or neglect. Nothing in this section limits your rights under the Australian Consumer Law.",
      },
      {
        id: "product-information",
        h2: "Product information",
        answer: "Properties listed for our films are AusPPF's stated properties. Results vary with the vehicle, the installation and aftercare.",
      },
      {
        id: "liability",
        h2: "Liability",
        answer: "To the extent the law allows, our liability is limited to replacing the goods or refunding the price paid. We aren't liable for indirect or consequential loss, including installation labour. Nothing in these terms limits your rights under the Australian Consumer Law.",
      },
      {
        id: "intellectual-property",
        h2: "Intellectual property",
        answer: "The AusPPF name, logo and website content belong to AusPPF. You may not copy, alter or use them without our written permission. Installers may state that they install AusPPF film. They may not imply they are AusPPF or part of Quick Signage.",
      },
      {
        id: "privacy",
        h2: "Privacy",
        answer: "See our [privacy summary](/privacy).",
      },
      {
        id: "governing-law-and-disputes",
        h2: "Governing law and disputes",
        answer: "These terms are governed by the laws of Victoria, Australia, and both parties submit to the courts of Victoria. Please contact us first so we can try to resolve any dispute directly.",
      },
      {
        id: "changes-to-these-terms",
        h2: "Changes to these terms",
        answer: "We may update these terms from time to time. The current version is always on this page with its last-updated date. Changes apply to orders placed after the update.",
      },
    ],
  },
};
