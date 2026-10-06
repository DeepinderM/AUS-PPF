/**
 * Product catalogue: categories and the products in them. Real product data
 * (name, finish, thickness, specs, features) goes straight on the object
 * below. A product with no `specs`/`features` renders as a placeholder card
 * with a note that full details aren't published yet, and still gets a
 * working "Enquire now" button — nothing here is invented spec data.
 */

export type ProductSpec = { label: string; value: string };
export type ProductFeature = { title: string; text: string };
/**
 * width/height are the source photo's real pixel dimensions. The gallery
 * sizes its frame to match, so nothing ever gets letterboxed or cropped —
 * without them it falls back to a plain square frame.
 */
export type ProductImage = { src: string; alt: string; width?: number; height?: number };

export type Product = {
  slug: string;
  name: string;
  tagline?: string;
  finish?: string;
  thickness?: string;
  notes?: string;
  /** Primary photo: used as the card thumbnail and the product page hero. */
  image?: ProductImage;
  /** Extra photos shown on the product page, below the specs. */
  gallery?: ProductImage[];
  specs?: ProductSpec[];
  specsNote?: string;
  features?: ProductFeature[];
  /** True once a real name and specs replace this entry. */
  placeholder?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  title: string;
  description: string;
  products: Product[];
};

export const categories: Category[] = [
  {
    slug: "paint-protection-film",
    name: "Paint protection film",
    title: "Paint protection film for cars and utes",
    description:
      "AusPPF's paint protection film range: a clear film for full protection, and a matte finish for a non-reflective look.",
    products: [
      {
        slug: "clear-7-5",
        name: "AusPPF Clear 7.5",
        tagline:
          "AusPPF's premium clear paint protection film, built to shield factory paint with invisible strength while preserving the vehicle's original gloss and colour.",
        finish: "Gloss, clear",
        thickness: "7.5 mil",
        notes: "AusPPF's current Clear stock line.",
        image: {
          src: "/clear-7-5-main.jpg",
          alt: "AusPPF Clear 7.5 paint protection film roll beside a car finished in the film, with feature callouts for heat self-healing, hydrophobic ability, 7.5 mil thickness and 1.52 x 15m roll size.",
          width: 1570,
          height: 1001,
        },
        gallery: [
          {
            src: "/clear-7-5-stretch.jpg",
            alt: "A sheet of AusPPF Clear 7.5 paint protection film held up by hand, showing its optical clarity against a roll printed with the AusPPF logo.",
            width: 1292,
            height: 1217,
          },
          {
            src: "/clear-7-5-roll.jpg",
            alt: "A roll of AusPPF Clear 7.5 paint protection film, printed with the AusPPF logo, resting on its retail box.",
            width: 1326,
            height: 1186,
          },
        ],
        specs: [
          { label: "Paint protection film", value: "Thermoplastic polyurethane (TPU)" },
          { label: "Colour", value: "Transparent" },
          { label: "Thickness", value: "7.5 mil" },
          { label: "Gloss (60°)", value: "≥110%" },
          { label: "Adhesive", value: "Pressure-sensitive acrylic (PSA)" },
          { label: "Self-healing", value: "100% self-healing" },
          { label: "Hydrophobic", value: "Yes" },
          { label: "Application method", value: "Wet only" },
          { label: "Application temperature", value: "15°C to 25°C" },
          { label: "Warranty", value: "10 years" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          {
            title: "Crystal-clear transparency",
            text: "Built with optical-grade TPU for a near-invisible install. The film adds depth and gloss without altering the paint's true colour.",
          },
          {
            title: "Advanced self-healing",
            text: "Minor scratches and swirls heal out with sunlight, warm water or gentle heat, keeping the surface looking new.",
          },
          {
            title: "Hydrophobic nano-coating",
            text: "A built-in water-repellent layer means dirt, water and road grime slide off, so the panel is easier to clean.",
          },
          {
            title: "Anti-yellowing stability",
            text: "Formulated with UV inhibitors and oxidation-resistant additives to hold its clarity and resist discolouration over time.",
          },
          {
            title: "Robust 7.5 mil thickness",
            text: "Strong enough to take stone chips, road debris and daily abrasion, while staying flexible enough to install.",
          },
          {
            title: "Installer-friendly adhesive",
            text: "The pressure-sensitive acrylic adhesive allows repositioning during application, and removes cleanly without damaging factory paint.",
          },
        ],
      },
      {
        slug: "matte",
        name: "AusPPF Matte",
        placeholder: true,
        image: {
          src: "/matte-main.jpg",
          alt: "AusPPF Matte paint protection film on a car finished in the film, with feature callouts for heat self-healing, hydrophobic ability and roll size, and a 10-year warranty badge.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/matte-box-1.jpg",
            alt: "A roll of AusPPF Matte paint protection film unrolled beside its retail box, printed with the film's six stated properties.",
            width: 1254,
            height: 1254,
          },
          {
            src: "/matte-box-2.jpg",
            alt: "Another view of a roll of AusPPF Matte paint protection film beside its retail box.",
            width: 1254,
            height: 1254,
          },
        ],
      },
    ],
  },
  {
    slug: "car-window-film",
    name: "Car window film",
    title: "Car window film",
    description: "Window film for cars, fitted by trade installers.",
    products: [],
  },
  {
    slug: "colour-ppf",
    name: "Colour PPF",
    title: "Colour PPF",
    description: "Colour paint protection film, across a full range of shades.",
    products: [
      {
        slug: "aus-201-gloss-ferrari-red",
        name: "AUS-201 Gloss Ferrari Red PPF",
        tagline:
          "A bright, highly saturated racing red finish, inspired by iconic European performance cars. The finish stays clean and powerful, without a heavy metallic effect, so the red tone dominates the vehicle's look.",
        finish: "High gloss",
        image: {
          src: "/ferrari-red-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-201 Gloss Ferrari Red paint protection film, showing its deep red gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/ferrari-red-front.jpg",
            alt: "A red SUV wrapped in AusPPF Gloss Ferrari Red paint protection film, front three-quarter view in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/ferrari-red-side.jpg",
            alt: "The same red SUV wrapped in AusPPF Gloss Ferrari Red paint protection film, side profile in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
        specs: [
          { label: "Model", value: "AUS-201" },
          { label: "Colour", value: "Gloss Ferrari Red" },
          { label: "Installation method", value: "Wet or dry apply" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Finish", value: "High gloss" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          {
            title: "Wet-apply installation",
            text: "Built for wet installation, giving installers more time to position the film. Alignment, panel positioning and handling on large panels are all easier as a result.",
          },
          {
            title: "Gloss retention",
            text: "Built to hold a deep, wet-look gloss over time, so brightness, colour richness and finish quality last.",
          },
          {
            title: "Self-healing top coat",
            text: "Minor swirl marks and light scratches heal out with heat, helping the finish stay consistent over time.",
          },
          {
            title: "Impact resistance",
            text: "Made from premium aliphatic TPU to absorb everyday road hazards, suited to daily driving and performance cars alike.",
          },
          {
            title: "UV stability",
            text: "UV-resistant construction is built to hold colour under prolonged sun exposure — particularly important for a high-chroma colour like this one.",
          },
          {
            title: "Hydrophobic surface",
            text: "Water and contaminants are less likely to sit on the surface, for faster washing and less water spotting.",
          },
        ],
      },
      {
        slug: "aus-392-liquid-metal-orange",
        name: "AUS-392 Liquid Metal Orange PPF",
        tagline:
          "A metallic orange finish with a satin, liquid-metal effect and real depth — a look factory paint can't match, with the same protection as AusPPF's other colour PPF.",
        finish: "Satin / matte, metallic",
        image: {
          src: "/liquid-metal-orange-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-392 Liquid Metal Orange paint protection film, showing its metallic orange finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/liquid-metal-orange-front.jpg",
            alt: "An SUV wrapped in AusPPF Liquid Metal Orange paint protection film, front three-quarter view in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/liquid-metal-orange-side.jpg",
            alt: "The same SUV wrapped in AusPPF Liquid Metal Orange paint protection film, side profile in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
        specs: [
          { label: "Model", value: "AUS-392" },
          { label: "Colour", value: "Liquid Metal Orange" },
          { label: "Finish", value: "Satin / matte, metallic" },
          { label: "Material", value: "TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          {
            title: "Liquid-metal metallic finish",
            text: "A matte metallic orange with a satin texture and a liquid-metal effect, for a depth and vibrancy factory paint doesn't have.",
          },
          {
            title: "Impact resistance",
            text: "A tough TPU base resists rock chips, scratches and everyday abrasion.",
          },
          {
            title: "Self-healing surface",
            text: "Light swirls heal out with heat, so minor marks don't stick around.",
          },
          {
            title: "Anti-yellowing stability",
            text: "An anti-yellowing formula is built to hold colour stability for years.",
          },
          {
            title: "Hydrophobic, easy to clean",
            text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep.",
          },
          {
            title: "Installer-friendly adhesive",
            text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly.",
          },
        ],
      },
      {
        slug: "aus-234-sahara-yellow",
        name: "AUS-234 Sahara Yellow PPF",
        tagline:
          "A warm, creamy yellow inspired by desert sunlight and sand — a refined, understated look rather than a bright sporty yellow or metallic gold. Built to make the vehicle look cleaner, calmer and more sophisticated.",
        finish: "High gloss",
        image: {
          src: "/sahara-yellow-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-234 Sahara Yellow paint protection film, showing its warm creamy yellow finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/sahara-yellow-front.jpg",
            alt: "An SUV wrapped in AusPPF Sahara Yellow paint protection film, front three-quarter view in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/sahara-yellow-side.jpg",
            alt: "The same SUV wrapped in AusPPF Sahara Yellow paint protection film, side profile in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
        specs: [
          { label: "Model", value: "AUS-234" },
          { label: "Colour", value: "Sahara Yellow" },
          { label: "Finish", value: "High gloss" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Installation method", value: "Wet or dry apply" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Function", value: "Colour change and paint protection" },
          { label: "Roll size", value: "1.52 m wide, 15 m per roll" },
          { label: "Minimum order", value: "1 roll" },
          { label: "Delivery", value: "10 working days" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          {
            title: "Wet or dry apply",
            text: "Suited to both wet and dry installation, for smooth positioning, easy alignment and stable control — even on complex surfaces.",
          },
          {
            title: "High-performance TPU protection",
            text: "An aliphatic TPU structure protects against stone chips, light scratches, road debris and daily wear.",
          },
          {
            title: "Self-healing surface",
            text: "Minor swirl marks and fine scratches recover with heat or sunlight, helping the finish stay clean and glossy.",
          },
          {
            title: "UV and weather resistance",
            text: "Helps reduce yellowing, oxidation and environmental ageing, for long-term colour stability.",
          },
          {
            title: "Hydrophobic, easy to clean",
            text: "A water-repellent surface improves water beading, for easier washing and less water spotting.",
          },
          {
            title: "Flexible for complex surfaces",
            text: "High elasticity and conformability give a smooth install on curves, edges and intricate panels.",
          },
        ],
      },
      {
        slug: "aus-104-shimmering-purple",
        name: "AUS-104 Shimmering Purple PPF",
        tagline: "A soft metallic purple with a fine shimmer, for a light, understated finish.",
        finish: "Gloss, metallic shimmer",
        specs: [
          { label: "Model", value: "AUS-104" },
          { label: "Colour", value: "Shimmering Purple" },
          { label: "Finish", value: "Gloss, metallic shimmer" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Shimmering metallic finish", text: "A soft metallic purple with a fine shimmer, for a light, understated look that still catches the light." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/shimmering-purple-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-104 Shimmering Purple PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/shimmering-purple-front.jpg",
            alt: "A vehicle wrapped in AusPPF Shimmering Purple paint protection film, photographed in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/shimmering-purple-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Shimmering Purple paint protection film, in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
      },
      {
        slug: "aus-236-acid-green",
        name: "AUS-236 Acid Green PPF",
        tagline: "A bright, high-visibility yellow-green gloss finish.",
        finish: "Gloss",
        specs: [
          { label: "Model", value: "AUS-236" },
          { label: "Colour", value: "Acid Green" },
          { label: "Finish", value: "Gloss" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "High-visibility gloss finish", text: "A bright yellow-green gloss finish built to stand out, with the same protection as the rest of the range." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/acid-green-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-236 Acid Green PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/acid-green-front.jpg",
            alt: "A vehicle wrapped in AusPPF Acid Green paint protection film, photographed in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/acid-green-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Acid Green paint protection film, in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
      },
      {
        slug: "aus-356-brilliant-bluestone-mauve",
        name: "AUS-356 Brilliant Bluestone Mauve PPF",
        tagline: "A pale, pearlescent mauve finish with a cool blue shimmer.",
        finish: "Gloss, pearlescent",
        specs: [
          { label: "Model", value: "AUS-356" },
          { label: "Colour", value: "Brilliant Bluestone Mauve" },
          { label: "Finish", value: "Gloss, pearlescent" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Pearlescent shimmer finish", text: "A pale mauve with a cool blue pearlescent shimmer that shifts gently in the light." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/bluestone-mauve-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-356 Brilliant Bluestone Mauve PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/bluestone-mauve-front.jpg",
            alt: "A vehicle wrapped in AusPPF Brilliant Bluestone Mauve paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/bluestone-mauve-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Brilliant Bluestone Mauve paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-360-matte-black-red",
        name: "AUS-360 Matte Black Red PPF",
        tagline: "A matte, colour-shifting finish that moves between deep red and black depending on the light.",
        finish: "Matte, colour-shift",
        specs: [
          { label: "Model", value: "AUS-360" },
          { label: "Colour", value: "Matte Black Red" },
          { label: "Finish", value: "Matte, colour-shift" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Colour-shifting matte finish", text: "A matte finish that shifts between deep red and black depending on the light and viewing angle." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/matte-black-red-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-360 Matte Black Red PPF, showing its matte finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/matte-black-red-front.jpg",
            alt: "A vehicle wrapped in AusPPF Matte Black Red paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/matte-black-red-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Matte Black Red paint protection film, in a showroom.",
            width: 1535,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-361-ideal-green",
        name: "AUS-361 Ideal Green PPF",
        tagline: "A glossy emerald green finish with a fine metallic sparkle.",
        finish: "Gloss, metallic sparkle",
        specs: [
          { label: "Model", value: "AUS-361" },
          { label: "Colour", value: "Ideal Green" },
          { label: "Finish", value: "Gloss, metallic sparkle" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic sparkle finish", text: "A glossy emerald green with a fine metallic sparkle that adds depth to the panel." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/ideal-green-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-361 Ideal Green PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/ideal-green-front.jpg",
            alt: "A vehicle wrapped in AusPPF Ideal Green paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/ideal-green-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Ideal Green paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-363-hosta-charm-gold",
        name: "AUS-363 Hosta Charm Gold PPF",
        tagline: "A deep green gloss finish with fine gold sparkle flecks.",
        finish: "Gloss, metallic sparkle",
        specs: [
          { label: "Model", value: "AUS-363" },
          { label: "Colour", value: "Hosta Charm Gold" },
          { label: "Finish", value: "Gloss, metallic sparkle" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic sparkle finish", text: "A deep green gloss finish with fine gold sparkle flecks running through it." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/hosta-charm-gold-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-363 Hosta Charm Gold PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/hosta-charm-gold-front.jpg",
            alt: "A vehicle wrapped in AusPPF Hosta Charm Gold paint protection film, photographed in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/hosta-charm-gold-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Hosta Charm Gold paint protection film, in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
      },
      {
        slug: "aus-364-matte-purple",
        name: "AUS-364 Matte Purple PPF",
        tagline: "A matte, deep plum-purple finish.",
        finish: "Matte",
        specs: [
          { label: "Model", value: "AUS-364" },
          { label: "Colour", value: "Matte Purple" },
          { label: "Finish", value: "Matte" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Understated matte finish", text: "A matte, deep plum-purple finish for a clean, non-reflective look." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/matte-purple-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-364 Matte Purple PPF, showing its matte finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/matte-purple-front.jpg",
            alt: "A vehicle wrapped in AusPPF Matte Purple paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/matte-purple-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Matte Purple paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-368-purple",
        name: "AUS-368 Purple PPF",
        tagline: "A glossy violet-purple finish with a fine metallic sparkle.",
        finish: "Gloss, metallic sparkle",
        specs: [
          { label: "Model", value: "AUS-368" },
          { label: "Colour", value: "Purple" },
          { label: "Finish", value: "Gloss, metallic sparkle" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic sparkle finish", text: "A glossy violet-purple with a fine metallic sparkle running through the finish." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/sparkle-purple-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-368 Purple PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/sparkle-purple-front.jpg",
            alt: "A vehicle wrapped in AusPPF Purple paint protection film, photographed in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/sparkle-purple-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Purple paint protection film, in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
      },
      {
        slug: "aus-369-matte-hosta-charm-gold",
        name: "AUS-369 Matte Hosta Charm Gold PPF",
        tagline: "A matte, colour-shifting finish that moves between green and gold depending on the light.",
        finish: "Matte, colour-shift",
        specs: [
          { label: "Model", value: "AUS-369" },
          { label: "Colour", value: "Matte Hosta Charm Gold" },
          { label: "Finish", value: "Matte, colour-shift" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Colour-shifting matte finish", text: "A matte finish that shifts between green and gold depending on the light and viewing angle." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/matte-hosta-charm-gold-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-369 Matte Hosta Charm Gold PPF, showing its matte finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/matte-hosta-charm-gold-front.jpg",
            alt: "A vehicle wrapped in AusPPF Matte Hosta Charm Gold paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/matte-hosta-charm-gold-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Matte Hosta Charm Gold paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-371-matte-liquid-metal-silver",
        name: "AUS-371 Matte Liquid Metal Glossy Silver PPF",
        tagline: "A matte, soft metallic silver finish.",
        finish: "Matte, metallic",
        specs: [
          { label: "Model", value: "AUS-371" },
          { label: "Colour", value: "Matte Liquid Metal Glossy Silver" },
          { label: "Finish", value: "Matte, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Soft metallic matte finish", text: "A matte, soft metallic silver finish with a smooth, even tone across the panel." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/matte-liquid-silver-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-371 Matte Liquid Metal Glossy Silver PPF, showing its matte finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/matte-liquid-silver-front.jpg",
            alt: "A vehicle wrapped in AusPPF Matte Liquid Metal Glossy Silver paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/matte-liquid-silver-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Matte Liquid Metal Glossy Silver paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-374-passion-pink",
        name: "AUS-374 Passion Pink PPF",
        tagline: "A glossy metallic pink finish.",
        finish: "Gloss, metallic",
        specs: [
          { label: "Model", value: "AUS-374" },
          { label: "Colour", value: "Passion Pink" },
          { label: "Finish", value: "Gloss, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic gloss finish", text: "A glossy metallic pink finish with a smooth, even shine." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/passion-pink-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-374 Passion Pink PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/passion-pink-front.jpg",
            alt: "A vehicle wrapped in AusPPF Passion Pink paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/passion-pink-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Passion Pink paint protection film, in a showroom.",
            width: 1535,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-376-metal-blue",
        name: "AUS-376 Metal Blue PPF",
        tagline: "A glossy, deep metallic blue finish with a fine sparkle.",
        finish: "Gloss, metallic sparkle",
        specs: [
          { label: "Model", value: "AUS-376" },
          { label: "Colour", value: "Metal Blue" },
          { label: "Finish", value: "Gloss, metallic sparkle" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic sparkle finish", text: "A glossy, deep metallic blue with a fine sparkle that adds depth to the panel." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/metal-blue-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-376 Metal Blue PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/metal-blue-front.jpg",
            alt: "A vehicle wrapped in AusPPF Metal Blue paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/metal-blue-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Metal Blue paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-377-ice-blue",
        name: "AUS-377 Ice Blue PPF",
        tagline: "A cool, icy blue-gray metallic finish with a smooth, even shine.",
        finish: "Gloss, metallic",
        specs: [
          { label: "Model", value: "AUS-377" },
          { label: "Colour", value: "Ice Blue" },
          { label: "Finish", value: "Gloss, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic gloss finish", text: "A cool, icy blue-gray metallic finish with a smooth, even shine." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/ice-blue-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-377 Ice Blue PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/ice-blue-front.jpg",
            alt: "A vehicle wrapped in AusPPF Ice Blue paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/ice-blue-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Ice Blue paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-378-forest-green",
        name: "AUS-378 Forest Green PPF",
        tagline: "A deep, dark green metallic finish with a smooth gloss shine.",
        finish: "Gloss, metallic",
        specs: [
          { label: "Model", value: "AUS-378" },
          { label: "Colour", value: "Forest Green" },
          { label: "Finish", value: "Gloss, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic gloss finish", text: "A deep, dark green metallic finish with a smooth gloss shine." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/forest-green-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-378 Forest Green PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/forest-green-front.jpg",
            alt: "A vehicle wrapped in AusPPF Forest Green paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/forest-green-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Forest Green paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-379-rose-gold",
        name: "AUS-379 Rose Gold PPF",
        tagline: "A warm, pinkish-gold metallic finish with a smooth, even shine.",
        finish: "Gloss, metallic",
        specs: [
          { label: "Model", value: "AUS-379" },
          { label: "Colour", value: "Rose Gold" },
          { label: "Finish", value: "Gloss, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic gloss finish", text: "A warm, pinkish-gold metallic finish with a smooth, even shine." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/rose-gold-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-379 Rose Gold PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/rose-gold-front.jpg",
            alt: "A vehicle wrapped in AusPPF Rose Gold paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/rose-gold-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Rose Gold paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-381-glacial-blue",
        name: "AUS-381 Glacial Blue PPF",
        tagline: "A pale, cool-toned silver-blue metallic finish.",
        finish: "Gloss, metallic",
        specs: [
          { label: "Model", value: "AUS-381" },
          { label: "Colour", value: "Glacial Blue" },
          { label: "Finish", value: "Gloss, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic gloss finish", text: "A pale, cool-toned silver-blue metallic finish." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/glacial-blue-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-381 Glacial Blue PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/glacial-blue-front.jpg",
            alt: "A vehicle wrapped in AusPPF Glacial Blue paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/glacial-blue-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Glacial Blue paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-382-black-rose",
        name: "AUS-382 Black Rose PPF",
        tagline: "A deep maroon-red metallic finish with a dark, smouldering edge.",
        finish: "Gloss, metallic",
        specs: [
          { label: "Model", value: "AUS-382" },
          { label: "Colour", value: "Black Rose" },
          { label: "Finish", value: "Gloss, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic gloss finish", text: "A deep maroon-red metallic finish with a dark, smouldering edge." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/black-rose-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-382 Black Rose PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/black-rose-front.jpg",
            alt: "A vehicle wrapped in AusPPF Black Rose paint protection film, photographed in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/black-rose-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Black Rose paint protection film, in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
      },
      {
        slug: "aus-384-sky-gray",
        name: "AUS-384 Sky Gray PPF",
        tagline: "A mid-tone gunmetal gray metallic finish with a smooth, even shine.",
        finish: "Gloss, metallic",
        specs: [
          { label: "Model", value: "AUS-384" },
          { label: "Colour", value: "Sky Gray" },
          { label: "Finish", value: "Gloss, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic gloss finish", text: "A mid-tone gunmetal gray metallic finish with a smooth, even shine." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/sky-gray-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-384 Sky Gray PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/sky-gray-front.jpg",
            alt: "A vehicle wrapped in AusPPF Sky Gray paint protection film, photographed in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/sky-gray-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Sky Gray paint protection film, in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
      },
      {
        slug: "aus-385-jade-red",
        name: "AUS-385 Jade Red PPF",
        tagline: "A bright, deep red metallic finish with a fine sparkle.",
        finish: "Gloss, metallic",
        specs: [
          { label: "Model", value: "AUS-385" },
          { label: "Colour", value: "Jade Red" },
          { label: "Finish", value: "Gloss, metallic" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Metallic gloss finish", text: "A bright, deep red metallic finish with a fine sparkle." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/jade-red-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-385 Jade Red PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/jade-red-front.jpg",
            alt: "A vehicle wrapped in AusPPF Jade Red paint protection film, photographed in a showroom.",
            width: 1535,
            height: 1024,
          },
          {
            src: "/jade-red-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Jade Red paint protection film, in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
      },
      {
        slug: "aus-387-liquid-metal-sapphire",
        name: "AUS-387 Liquid Metal Sapphire PPF",
        tagline: "A bright sapphire blue with a liquid-metal effect and real depth.",
        finish: "Gloss, liquid-metal",
        specs: [
          { label: "Model", value: "AUS-387" },
          { label: "Colour", value: "Liquid Metal Sapphire" },
          { label: "Finish", value: "Gloss, liquid-metal" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Liquid-metal gloss finish", text: "A bright sapphire blue with a liquid-metal effect and real depth — a look factory paint can't match." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/liquid-metal-sapphire-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-387 Liquid Metal Sapphire PPF, showing its gloss finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/liquid-metal-sapphire-front.jpg",
            alt: "A vehicle wrapped in AusPPF Liquid Metal Sapphire paint protection film, photographed in a showroom.",
            width: 1774,
            height: 887,
          },
          {
            src: "/liquid-metal-sapphire-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Liquid Metal Sapphire paint protection film, in a showroom.",
            width: 1536,
            height: 1024,
          },
        ],
      },
      {
        slug: "aus-389-liquid-metal-matte-sapphire",
        name: "AUS-389 Liquid Metal Matte Sapphire PPF",
        tagline: "The same sapphire blue liquid-metal effect, in a matte finish.",
        finish: "Matte, liquid-metal",
        specs: [
          { label: "Model", value: "AUS-389" },
          { label: "Colour", value: "Liquid Metal Matte Sapphire" },
          { label: "Finish", value: "Matte, liquid-metal" },
          { label: "Material", value: "Premium aliphatic TPU" },
          { label: "Top coat", value: "Self-healing" },
          { label: "Anti-yellowing", value: "Yes" },
          { label: "Adhesive", value: "Smart adhesive — repositionable, bubble-free application" },
          { label: "Function", value: "Colour change and paint protection" },
        ],
        specsNote:
          "Figures are the manufacturer's typical values, not a guarantee for every install. Ask us for the current spec sheet before you quote a job.",
        features: [
          { title: "Liquid-metal matte finish", text: "The same sapphire blue liquid-metal effect as AUS-387, in a matte finish for a non-reflective look." },
          { title: "Impact resistance", text: "A tough TPU base resists rock chips, scratches and everyday abrasion." },
          { title: "Self-healing surface", text: "Light swirls heal out with heat, so minor marks don't stick around." },
          { title: "Anti-yellowing stability", text: "An anti-yellowing formula is built to hold colour stability for years." },
          { title: "Hydrophobic, easy to clean", text: "A hydrophobic nano-coating keeps water, mud and stains from sitting on the surface, for quicker cleaning and less upkeep." },
          { title: "Installer-friendly adhesive", text: "A smart adhesive gives a bubble-free application, stays repositionable during install, and removes cleanly." },
        ],
        image: {
          src: "/liquid-metal-matte-sapphire-swatch.jpg",
          alt: "A gloved hand holding a swatch of AusPPF AUS-389 Liquid Metal Matte Sapphire PPF, showing its matte finish.",
          width: 1254,
          height: 1254,
        },
        gallery: [
          {
            src: "/liquid-metal-matte-sapphire-front.jpg",
            alt: "A vehicle wrapped in AusPPF Liquid Metal Matte Sapphire paint protection film, photographed in a showroom.",
            width: 1536,
            height: 1024,
          },
          {
            src: "/liquid-metal-matte-sapphire-side.jpg",
            alt: "Another view of a vehicle wrapped in AusPPF Liquid Metal Matte Sapphire paint protection film, in a showroom.",
            width: 1774,
            height: 887,
          },
        ],
      },
    ],
  },
  {
    slug: "headlight-ppf",
    name: "Headlight PPF",
    title: "Headlight PPF",
    description: "Paint protection film cut for headlights and light housings.",
    products: [],
  },
];

export function findCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function findProduct(categorySlug: string, productSlug: string): Product | undefined {
  return findCategory(categorySlug)?.products.find((p) => p.slug === productSlug);
}

export function totalProductCount(): number {
  return categories.reduce((n, c) => n + c.products.length, 0);
}
