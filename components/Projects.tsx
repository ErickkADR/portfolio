"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/content";
import { asset } from "@/lib/asset";

/* Galeria que anda na horizontal enquanto a página anda na vertical.
   A seção fica presa (pin) e o trilho é deslocado pelo mesmo scroll.
   `end` e a distância são funções para o ScrollTrigger recalcular no
   resize — fixar em número deixa o trilho parando antes do fim quando
   a janela muda de largura. */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      // Só na horizontal em telas largas. No celular o pin brigaria com
      // a barra de endereço que aparece e some, remedindo a viewport.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative overflow-hidden border-t border-bone/10 py-24 lg:overflow-visible lg:py-0"
    >
      <div className="lg:flex lg:h-screen lg:flex-col lg:justify-center">
        <div className="shell mb-12 flex items-end justify-between gap-6 lg:mb-14">
          <div>
            <span className="mono-label">Projetos</span>
            <h2 className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]">
              Trabalho
              <span className="editorial text-plasma"> selecionado</span>
            </h2>
          </div>
          <span className="mono-label hidden shrink-0 lg:block">
            {projects.length.toString().padStart(2, "0")} projetos · role →
          </span>
        </div>

        {/* No mobile o trilho vira um scroll horizontal nativo com snap;
            no desktop o GSAP assume o controle do x. */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none] lg:overflow-visible lg:pb-0 lg:[&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => (
            /* `article` e não `a`: o card tem dois destinos (a página do
               projeto e o repositório) e âncora dentro de âncora é HTML
               inválido. O link do título se estica sobre o card inteiro
               via ::after, e o do repositório sobe acima dele com z-10. */
            <article
              key={p.slug}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative flex w-[78vw] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-bone/25 sm:w-[52vw] lg:w-[30rem]"
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
                  className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                {/* A captura é clara em alguns projetos e escura em
                    outros; o degradê para o fundo do card costura os
                    dois casos e sustenta o texto logo abaixo. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, var(--color-ink-2) 2%, ${p.tint}00 55%)`,
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
              <div className="relative flex flex-1 flex-col p-7 lg:p-8">
                <span
                  className="mono-label transition-colors duration-500"
                  style={{ color: active === i ? p.tint : undefined }}
                >
                  {p.category}
                </span>

                <h3 className="display mt-2 text-3xl lg:text-4xl">
                  <Link
                    href={`/projetos/${p.slug}/`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {p.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                  {p.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between pt-4">
                  <span
                    className="mono-label transition-colors duration-500"
                    style={{ color: active === i ? p.tint : undefined }}
                  >
                    Ver o projeto →
                  </span>
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
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
