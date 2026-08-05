"use client";

import Link from "next/link";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { career } from "@/lib/content";
import RevealText from "./RevealText";

/* A Timeline do Aceternity recebe `content` como ReactNode, então o
   conteúdo de cada etapa é montado aqui — o componente vendido em
   components/ui cuida só da trilha e do scroll.

   Cada etapa leva para /carreira/<slug>/, onde fica o material que
   comprova aquele período. O link se estica sobre o bloco inteiro pelo
   ::after, então a área clicável é a etapa toda e não só o título. */

export default function Career() {
  const data: TimelineEntry[] = career.entries.map((e) => ({
    title: e.period,
    content: (
      <div className="group relative max-w-2xl">
        <h3 className="display text-2xl md:text-3xl">
          <Link
            href={`/carreira/${e.slug}/`}
            className="transition-colors duration-500 after:absolute after:inset-0 after:content-[''] group-hover:text-plasma"
          >
            {e.role}
          </Link>
        </h3>

        {e.org && <p className="mono-label mt-2 text-plasma">{e.org}</p>}

        <p className="mt-4 leading-relaxed text-bone-dim">{e.body}</p>

        {e.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {e.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <span className="mono-label mt-6 inline-flex items-center gap-2 transition-colors duration-500 group-hover:text-plasma">
          {career.entryCta}
          <span
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    ),
  }));

  return (
    <section id="carreira" className="border-t border-bone/10 py-32 sm:py-44">
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{career.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2rem,5vw,3.6rem)]"
          >
            {career.title}
          </RevealText>

          <p className="editorial mx-auto mt-6 max-w-xl text-lg text-bone-dim">
            {career.intro}
          </p>
        </div>

        <div className="mt-20">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  );
}
