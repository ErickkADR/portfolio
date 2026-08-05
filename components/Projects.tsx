"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";
import RevealText from "./RevealText";

/* ============================================================
   PROJETOS — cards empilhados na vertical.

   Antes a seção ficava presa (pin) e o trilho andava na horizontal
   conforme a página descia. Duas coisas quebravam: o movimento lateral
   só existia enquanto o scroll acontecia, e a leitura de cada card
   dependia de parar no ponto certo. Empilhado, cada projeto tem o seu
   tempo de tela e a seção fica mais longa — que era o objetivo.

   O card inteiro é clicável, capa inclusive: o link do título se estica
   por cima de tudo com o ::after. O link do repositório sobe acima dele
   com z-10, porque um destino dentro do outro seria HTML inválido.
   ============================================================ */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Um trigger por card, não um stagger para a lista toda: a lista
           é mais alta que a viewport e, com um só, os últimos cards
           terminariam a animação antes de aparecerem. */
        const tweens = gsap.utils
          .toArray<HTMLElement>(".projeto-card")
          .map((card) =>
            gsap.from(card, {
              y: 48,
              opacity: 0,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 88%", once: true },
            })
          );

        return () => tweens.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
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

        <ul className="mt-20 space-y-10">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="projeto-card group relative overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-bone/25"
            >
              {/* ---------- capa: tela real do projeto ---------- */}
              {/* <img> e não next/image: no export estático a otimização
                  é desligada de qualquer jeito, e o basePath não chega
                  ao src — quem monta o prefixo é o asset(). */}
              <div className="relative aspect-[16/9] overflow-hidden bg-ink-3 sm:aspect-[2/1]">
                <img
                  src={asset(p.cover.src)}
                  alt={p.cover.alt}
                  width={1800}
                  height={1125}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
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

                <span className="mono-label absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1 backdrop-blur-md">
                  {p.index}
                </span>
                <span className="mono-label absolute right-5 top-5 rounded-full bg-ink/70 px-3 py-1 backdrop-blur-md">
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
              <div className="p-7 lg:p-10">
                <span
                  className="mono-label transition-colors duration-500"
                  style={{ ["--tint" as string]: p.tint }}
                >
                  {p.category}
                </span>

                <h3 className="display mt-3 text-3xl lg:text-4xl">
                  {/* O ::after cobre o card inteiro — capa inclusive —
                      então clicar na imagem também navega. */}
                  <Link
                    href={`/projetos/${p.slug}/`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {p.title}
                  </Link>
                </h3>

                <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">
                  {p.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
                  <ul className="flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-6">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="relative z-10 mono-label transition-colors hover:text-plasma"
                      >
                        Código ↗
                      </a>
                    )}
                    <span className="mono-label inline-flex items-center gap-2 transition-colors duration-500 group-hover:text-plasma">
                      Ver o projeto
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
