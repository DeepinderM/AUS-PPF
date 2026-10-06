"use client";

import { useState, type FormEvent } from "react";
import { contactForm as copy } from "@/content";

type Status = "idle" | "sending" | "success" | "error";
type Values = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", businessName: "", email: "", phone: "", topic: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = 2000;

const fieldClass =
  "block w-full rounded-brand border border-muted bg-white px-3.5 py-3 text-base text-charcoal transition-colors duration-150 aria-[invalid=true]:border-error aria-[invalid=true]:border-2 disabled:opacity-60";

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.businessName.trim()) e.businessName = "Enter your business name.";
  if (!v.email.trim()) e.email = "Enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address, like name@example.com.";
  if (!v.phone.trim()) e.phone = "Enter your phone number.";
  if (!v.topic) e.topic = copy.fields.topic.helper && "Choose a topic from the list.";
  if (!v.message.trim()) e.message = "Enter a message.";
  else if (v.message.length > MAX) e.message = "That's too long. Please shorten it.";
  return e;
}

export function ContactForm({
  product,
  category,
}: {
  /** Pre-fills from a product's "Enquire now" button (?product=&category=). */
  product?: string;
  category?: string;
}) {
  const [values, setValues] = useState<Values>(() =>
    product ? { ...empty, topic: "A product" } : empty,
  );
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const sending = status === "sending";

  function update(key: keyof Values, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, product, category, website: honeypot }),
      });
      if (res.ok) {
        setValues(empty);
        setErrors({});
        setStatus("success");
        return;
      }
      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as { errors?: Errors } | null;
        setErrors(data?.errors ?? {});
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const describe = (key: keyof Values) => (errors[key] ? `cf-${key}-error` : undefined);
  const Err = ({ name }: { name: keyof Values }) =>
    errors[name] ? (
      <p id={`cf-${name}-error`} className="mt-1.5 text-sm font-medium text-error">
        {errors[name]}
      </p>
    ) : null;

  return (
    <div className="rounded-brand bg-panel p-6 text-charcoal sm:p-9">
      <h2 className="display text-[1.5rem] leading-tight">{copy.heading}</h2>
      <p className="mt-2 text-sm text-muted">{copy.requiredNote}</p>

      {product && (
        <p className="mt-4 rounded-brand border-2 border-deep bg-white px-4 py-3 text-[0.9375rem] font-medium text-charcoal">
          {copy.productLabel}: {product}
          {category ? ` (${category})` : ""}
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold">
              {copy.fields.name.label} *
            </label>
            <input
              id="cf-name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describe("name")}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              disabled={sending}
              className={fieldClass}
            />
            <Err name="name" />
          </div>
          <div>
            <label htmlFor="cf-businessName" className="mb-1.5 block text-sm font-semibold">
              {copy.fields.businessName.label} *
            </label>
            <input
              id="cf-businessName"
              type="text"
              autoComplete="organization"
              aria-invalid={errors.businessName ? true : undefined}
              aria-describedby={describe("businessName")}
              value={values.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              disabled={sending}
              className={fieldClass}
            />
            <Err name="businessName" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold">
              {copy.fields.email.label} *
            </label>
            <input
              id="cf-email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describe("email")}
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={sending}
              className={fieldClass}
            />
            <Err name="email" />
          </div>
          <div>
            <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-semibold">
              {copy.fields.phone.label} *
            </label>
            <input
              id="cf-phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describe("phone")}
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              disabled={sending}
              className={fieldClass}
            />
            <Err name="phone" />
          </div>
        </div>

        <div>
          <label htmlFor="cf-topic" className="mb-1.5 block text-sm font-semibold">
            {copy.fields.topic.label} *
          </label>
          <select
            id="cf-topic"
            aria-invalid={errors.topic ? true : undefined}
            aria-describedby={describe("topic")}
            value={values.topic}
            onChange={(e) => update("topic", e.target.value)}
            disabled={sending}
            className={fieldClass}
          >
            <option value="">{copy.fields.topic.placeholder}</option>
            {copy.fields.topic.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <Err name="topic" />
        </div>

        <div>
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold">
            {copy.fields.message.label} *
          </label>
          <textarea
            id="cf-message"
            rows={4}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describe("message")}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            disabled={sending}
            className={`${fieldClass} resize-y`}
          />
          <Err name="message" />
        </div>

        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="cf-website">Website</label>
          <input
            id="cf-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <button type="submit" disabled={sending} className="btn btn-primary w-full">
          {sending ? copy.sending : copy.submit}
        </button>

        <div aria-live="polite" role="status">
          {status === "success" && (
            <p className="rounded-brand border-2 border-deep bg-white px-4 py-3 text-[0.9375rem] font-medium text-deep">
              {copy.success}
            </p>
          )}
          {status === "error" && (
            <p className="rounded-brand border-2 border-error bg-white px-4 py-3 text-[0.9375rem] font-medium text-error">
              {copy.failure}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
