"use client";

import Link from "next/link";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";
import Carousel from "./Carousel";
import RevealText from "./RevealText";

/* ============================================================
   PROJETOS — carrossel de cards.

   A largura do card vem de `.carousel-slide`: uma fração exata da
   pista, para caber sempre um número inteiro deles e nenhum ficar
   cortado na borda.

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
            className="display mt-4 text-[clamp(2.1rem,5vw,3.8rem)]"
          >
            Conheça os meus principais projetos desenvolvidos
          </RevealText>
        </div>

        {/* `auto`: a pista anda sozinha em loop, como a dos certificados.
            Pausa no hover, no foco, durante o arrasto e quando a seção
            sai da tela. */}
        <Carousel label="Projetos" className="mt-16" auto>
          {projects.map((p) => (
            <li
              key={p.slug}
              className="carousel-slide-sm group relative snap-start overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-plasma/50"
            >
              {/* ---------- capa: tela real do projeto ---------- */}
              {/* <img> e não next/image: no export estático a otimização
                  é desligada de qualquer jeito, e o basePath não chega
                  ao src — quem monta o prefixo é o asset(). */}
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
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

                <span className="mono-label absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 backdrop-blur-md">
                  {p.index}
                </span>
                <span className="mono-label absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 backdrop-blur-md">
                  {p.year}
                </span>

                {/* Véu + informações, entrando juntos no hover — o mesmo
                    gesto dos certificados. As capas são claras em uns
                    projetos e escuras em outros; o véu opaco garante o
                    contraste do texto sobre qualquer uma delas. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-ink/92 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
                />

                <div className="absolute inset-0 flex translate-y-3 flex-col justify-end p-6 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <span className="mono-label" style={{ color: p.tint }}>
                    {p.category}
                  </span>

                  <h3 className="display mt-2 text-xl leading-tight">
                    {/* O ::after cobre o card inteiro — capa inclusive —
                        então clicar em qualquer ponto navega. */}
                    <Link
                      href={`/projetos/${p.slug}/`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {p.title}
                    </Link>
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-bone-dim">
                    {p.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-bone/20 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className="mono-label mt-4 inline-flex items-center gap-2 text-plasma">
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

              {/* Fora do véu: o repositório precisa continuar clicável
                  por cima dele, e link dentro de link seria inválido. */}
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono-label absolute bottom-5 right-5 z-10 rounded-full border border-bone/25 bg-ink/80 px-3 py-1.5 opacity-0 backdrop-blur-md transition-all duration-500 hover:border-plasma hover:text-plasma group-hover:opacity-100 focus-visible:opacity-100"
                >
                  Código ↗
                </a>
              )}
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
