import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "@/content";

export const metadata: Metadata = { title: notFound.title, robots: { index: false } };

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center bg-ground">
      <div className="mx-auto max-w-[1200px] px-5 py-20">
        <h1 className="display text-[2rem] leading-tight sm:text-[2.5rem]">{notFound.h1}</h1>
        <p className="mt-4 max-w-[36rem] text-lg leading-relaxed text-muted">{notFound.body}</p>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          {notFound.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline underline-offset-4 hover:text-mid">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
