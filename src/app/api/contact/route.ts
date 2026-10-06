import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactRequest = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  /** Set when the enquiry came from a product's "Enquire now" button. */
  product: string;
  category: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = new Set(["A product", "An order", "Trade supply", "Something else"]);
const MAX: Record<keyof ContactRequest, number> = {
  name: 120,
  businessName: 120,
  email: 254,
  phone: 40,
  topic: 40,
  message: 2000,
  product: 200,
  category: 200,
};

function validate(input: unknown) {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const str = (k: keyof ContactRequest) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  const values: ContactRequest = {
    name: str("name"),
    businessName: str("businessName"),
    email: str("email"),
    phone: str("phone"),
    topic: str("topic"),
    message: str("message"),
    product: str("product"),
    category: str("category"),
  };
  const errors: Partial<Record<keyof ContactRequest, string>> = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.businessName) errors.businessName = "Enter your business name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Enter a valid email address, like name@example.com.";
  if (!values.phone) errors.phone = "Enter your phone number.";
  if (!values.topic || !TOPICS.has(values.topic)) errors.topic = "Choose a topic from the list.";
  if (!values.message) errors.message = "Enter a message.";
  for (const key of Object.keys(MAX) as (keyof ContactRequest)[]) {
    if (!errors[key] && values[key].length > MAX[key]) errors[key] = "That's too long. Please shorten it.";
  }
  return { values, errors };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const honeypot = (body as { website?: unknown } | null)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { values, errors } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("contact: CONTACT_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false, error: "Form is not configured." }, { status: 500 });
  }

  const source = values.product ? "AusPPF website: product enquiry" : "AusPPF website: contact form";

  // FormSubmit rejects any request with no Referer header — and it does so
  // with HTTP 200 and a JSON body like {"success":"false","message":"..."},
  // not a non-2xx status. Since this fetch runs server-side (not from the
  // browser), it carries no Referer by default, so we set one explicitly to
  // the site's own origin — the same thing a real browser submission would
  // send — and we must inspect the response body, not just res.ok, or a
  // silent FormSubmit-side rejection looks identical to success.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: `${siteUrl}/contact`,
      },
      body: JSON.stringify({
        // FormSubmit (formsubmit.co) control fields — harmless no-ops if
        // CONTACT_WEBHOOK_URL points at a different kind of webhook instead.
        _subject: `New enquiry — ${values.topic || "AusPPF"}`,
        _replyto: values.email,
        _captcha: "false",
        _template: "table",
        // Capitalized labels so a Zapier/Odoo-side parser can pattern-match
        // consistent field names, same convention used on quicksignage.com.au.
        Name: values.name,
        Company: values.businessName,
        Email: values.email,
        Phone: values.phone,
        Topic: values.topic,
        Message: values.message,
        Product: values.product,
        Category: values.category,
        Source: source,
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    const rawBody = await res.text();
    let parsed: { success?: string | boolean; message?: string } | null = null;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      // Non-JSON body — fall through to the res.ok check below.
    }
    const webhookFailed = !res.ok || parsed?.success === false || parsed?.success === "false";

    if (webhookFailed) {
      console.error(
        `contact: webhook rejected the lead (status ${res.status}): ${parsed?.message ?? rawBody}`,
      );
      return NextResponse.json({ ok: false, error: "Could not send message." }, { status: 500 });
    }
  } catch (err) {
    console.error("contact: webhook call failed", err);
    return NextResponse.json({ ok: false, error: "Could not send message." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
