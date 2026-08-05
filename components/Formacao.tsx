"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { background } from "@/lib/content";
import RevealText from "./RevealText";

/* A formação era três linhas de texto no rodapé do Stack, sem destaque
   nenhum. Virou seção própria com um cartão por etapa: o ano em número
   grande à esquerda, o selo do que foi conquistado no topo, e o texto
   explicando o porquê. As duas primeiras vieram por nota, não por
   mensalidade — e isso é o que o selo mostra de relance. */

export default function Formacao() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const t = gsap.from(".formacao-card", {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".formacao-grid", start: "top 88%", once: true },
        });
        return () => t.kill();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="formacao"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{background.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {background.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {background.intro}
          </p>
        </div>

        <ol className="formacao-grid mt-20 space-y-6">
          {background.items.map((item) => (
            <li
              key={item.title}
              className="formacao-card group relative overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-plasma/40"
            >
              {/* Fio na cor de acento que se estende no hover, mesmo
                  gesto dos outros cartões do site. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-plasma transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />

              <div className="grid gap-6 p-8 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-10">
                {/* O ano é o âncora visual: grande, na cor de acento e
                    fora do fluxo do texto. */}
                <span className="display text-[clamp(1.6rem,4vw,2.4rem)] leading-none text-plasma sm:w-[7.5rem]">
                  {item.period}
                </span>

                <div>
                  <span className="mono-label inline-block rounded-full border border-plasma/30 px-3 py-1 text-plasma-soft">
                    {item.highlight}
                  </span>

                  <h3 className="display mt-4 text-2xl leading-tight">
                    {item.title}
                  </h3>

                  <p className="mono-label mt-2">{item.meta}</p>

                  <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
