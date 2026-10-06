import Link from "next/link";
import type { ReactNode } from "react";

// [text](url) links, **bold**, and [CAPITAL PLACEHOLDERS] (shown highlighted).
const TOKEN =
  /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\[[A-Z][A-Z0-9 /:,.'()&+-]*[A-Z0-9)]\])/g;

export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    const [token] = m;
    if (m[1]) {
      const [, label, href] = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)!;
      out.push(
        href.startsWith("/") ? (
          <Link key={i++} href={href} className="underline underline-offset-4 hover:text-mid">
            {label}
          </Link>
        ) : (
          <a key={i++} href={href} className="underline underline-offset-4 hover:text-mid">
            {label}
          </a>
        ),
      );
    } else if (m[2]) {
      out.push(<strong key={i++}>{token.slice(2, -2)}</strong>);
    } else {
      out.push(
        <span key={i++} className="ph">
          {token}
        </span>,
      );
    }
    last = at + token.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
