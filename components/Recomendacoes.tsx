"use client";

import { recomendacoes } from "@/lib/content";
import { asset } from "@/lib/asset";
import Carousel from "./Carousel";
import RevealText from "./RevealText";

/* ============================================================
   RECOMENDAÇÕES — o que outras pessoas dizem.

   A seção some por inteiro quando a lista está vazia, em vez de mostrar
   uma moldura com "em breve". Um espaço reservado anunciando que ainda
   não existe recomendação nenhuma trabalha contra a própria seção: é
   pior do que não ter a seção.

   Ver lib/content.ts para o formato de cada item e como preencher.
   ============================================================ */

export default function Recomendacoes() {
  if (recomendacoes.items.length === 0) return null;

  return (
    <section
      id="recomendacoes"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{recomendacoes.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {recomendacoes.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {recomendacoes.intro}
          </p>
        </div>

        <Carousel label="Recomendações" className="mt-16">
          {recomendacoes.items.map((r) => (
            <li
              key={`${r.name}-${r.org}`}
              className="carousel-slide-sm flex snap-start flex-col rounded-2xl border border-bone/12 bg-ink-2 p-8 transition-colors duration-500 hover:border-plasma/40"
            >
              <span
                aria-hidden="true"
                className="display text-5xl leading-none text-plasma/40"
              >
                “
              </span>

              <blockquote className="mt-3 flex-1 leading-relaxed text-bone-dim">
                {r.quote}
              </blockquote>

              <div className="mt-8 flex items-center gap-4 border-t border-bone/10 pt-6">
                {/* Sem foto, as iniciais no mesmo círculo: o card mantém
                    o alinhamento em vez de abrir um buraco à esquerda. */}
                {r.avatar ? (
                  <img
                    src={asset(`/recomendacoes/${r.avatar}.jpg`)}
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="display grid h-12 w-12 shrink-0 place-items-center rounded-full border border-bone/15 bg-ink-3 text-sm"
                  >
                    {r.name
                      .split(" ")
                      .slice(0, 2)
                      .map((p) => p[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                )}

                <div className="min-w-0">
                  <p className="truncate leading-snug">
                    {r.href ? (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-colors hover:text-plasma"
                      >
                        {r.name} ↗
                      </a>
                    ) : (
                      r.name
                    )}
                  </p>
                  <p className="mono-label mt-1 truncate">
                    {r.role} · {r.org}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
