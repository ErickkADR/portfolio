"use client";

import Link from "next/link";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";
import Carousel from "./Carousel";
import RevealText from "./RevealText";

/* ============================================================
   PROJETOS — carrossel de cards.

   Cada card é um slide de largura fixa: com largura fluida os cards
   mudariam de proporção conforme a janela e as capas cortariam em
   pontos diferentes. O `snap-start` encaixa o começo do card na borda
   esquerda da pista, então nunca sobra meio card colado no canto.

   O card inteiro é clicável, capa inclusive: o link do título se estica
   por cima de tudo com o ::after. O link do repositório sobe acima dele
   com z-10, porque um destino dentro do outro seria HTML inválido.
   ============================================================ */

export default function Projects() {
  return (
    <section id="projetos" className="border-t border-bone/10 py-32 sm:py-44">
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">
            {projects.length.toString().padStart(2, "0")} projetos
          </span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            Projetos
          </RevealText>
        </div>

        <Carousel label="Projetos" className="mt-16">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="group relative w-[85vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-bone/25 sm:w-[26rem]"
            >
              {/* ---------- capa: tela real do projeto ---------- */}
              {/* <img> e não next/image: no export estático a otimização
                  é desligada de qualquer jeito, e o basePath não chega
                  ao src — quem monta o prefixo é o asset(). */}
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">
                <img
                  src={asset(p.cover.src)}
                  alt={p.cover.alt}
                  width={1800}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />

                {/* A captura é clara em alguns projetos e escura em
                    outros; o degradê para o fundo do card costura os
                    dois casos e sustenta o texto logo abaixo. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, var(--color-ink-2) 2%, ${p.tint}00 60%)`,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to top, ${p.tint}33, transparent 60%)`,
                  }}
                />

                <span className="mono-label absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 backdrop-blur-md">
                  {p.index}
                </span>
                <span className="mono-label absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 backdrop-blur-md">
                  {p.year}
                </span>
              </div>

              {/* Fio na cor do projeto, no pé do card. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ background: p.tint }}
              />

              {/* ---------- texto ---------- */}
              <div className="flex flex-col p-7">
                <span className="mono-label">{p.category}</span>

                <h3 className="display mt-3 text-2xl lg:text-3xl">
                  {/* O ::after cobre o card inteiro — capa inclusive —
                      então clicar na imagem também navega. */}
                  <Link
                    href={`/projetos/${p.slug}/`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {p.title}
                  </Link>
                </h3>

                <p className="mt-3 line-clamp-3 leading-relaxed text-bone-dim">
                  {p.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-bone/10 pt-5">
                  {p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="relative z-10 mono-label transition-colors hover:text-plasma"
                    >
                      Código ↗
                    </a>
                  ) : (
                    <span />
                  )}

                  <span className="mono-label inline-flex items-center gap-2 transition-colors duration-500 group-hover:text-plasma">
                    Ver mais
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
