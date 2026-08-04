"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/content";

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
            /* `article` e não `a`: o card tem dois destinos (site e
               repositório) e âncora dentro de âncora é HTML inválido.
               O link do título se estica sobre o card inteiro via
               ::after, e o do repositório sobe acima dele com z-10. */
            <article
              key={p.index}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="group relative flex aspect-[3/4] w-[78vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 p-7 transition-colors duration-500 sm:w-[52vw] lg:aspect-[4/5] lg:w-[26rem] lg:p-8"
            >
              {/* Preenchimento que sobe no hover, na cor do projeto. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                style={{
                  background: `linear-gradient(to top, ${p.tint}22, transparent 70%)`,
                }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                style={{ background: p.tint }}
              />

              <div className="relative flex items-start justify-between">
                <span className="mono-label">{p.index}</span>
                <div className="flex items-center gap-4">
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
                  <span className="mono-label">{p.year}</span>
                </div>
              </div>

              {/* Espaço reservado para a imagem/thumb do projeto.
                  Troque este bloco por <Image> quando tiver as capas. */}
              <div
                aria-hidden="true"
                className="relative my-6 flex-1 rounded-lg border border-bone/8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                style={{
                  background: `radial-gradient(80% 70% at 50% 30%, ${p.tint}1f, transparent 70%)`,
                }}
              />

              <div className="relative">
                <span
                  className="mono-label transition-colors duration-500"
                  style={{ color: active === i ? p.tint : undefined }}
                >
                  {p.category}
                </span>
                <h3 className="display mt-2 text-3xl lg:text-4xl">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {p.title}
                  </a>
                </h3>
                <p className="mt-3 max-w-[26rem] text-sm leading-relaxed text-bone-dim">
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
