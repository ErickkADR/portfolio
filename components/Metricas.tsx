"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useConteudo } from "@/lib/idioma";
import RevealText from "./RevealText";
import { CMYK, Marcas, TiraCMYK } from "./Prova";

/* Os números que antes ficavam soltos no fim da seção "Sobre" agora têm
   seção própria — e cada um diz de onde saiu. Número sem fonte em
   portfólio é decoração; com a fonte ao lado, é evidência. */

export default function Metricas() {
  const { metricas } = useConteudo();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Só o trecho numérico anima; sufixos como "+" ficam parados,
         senão viram ruído girando na tela. */
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
      const tweens = counters.map((el) => {
        const raw = el.dataset.count ?? "";
        /* Aceita o ponto de milhar ("19.188"): conta até o inteiro e
           devolve com o ponto no lugar. */
        const match = raw.match(/^([\d.]+)(.*)$/);
        if (!match) return null;
        const [, digits, suffix] = match;
        const end = parseInt(digits.replace(/\./g, ""), 10);
        const fmt = (n: number) =>
          digits.includes(".") ? n.toLocaleString("pt-BR") : String(n);
        const obj = { v: 0 };

        return gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${fmt(Math.round(obj.v))}${suffix}`;
          },
        });
      });

      return () => tweens.forEach((t) => t?.kill());
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="metricas"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell">
        <div className="section-head">
          <span className="mono-label">{metricas.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {metricas.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {metricas.intro}
          </p>
          {/* Tira de calibração: os números abaixo vêm nas cores dela. */}
          <TiraCMYK className="mt-8 justify-center" />
        </div>

        {/* O número sozinho não convence: "628 blocos de conhecimento" é
            volume, não resultado. O `outcome` embaixo diz o que aquele
            número mudou na operação, e é ele que transforma entrega em
            impacto.

            CARTÃO SEM NÚMERO: `value` é opcional (ver content.ts). Sem
            ele, o rótulo assume o tamanho do número e o cartão continua
            com o mesmo peso na grade. É o que mantém no ar um resultado
            real que ainda não foi medido, sem inventar cifra nem abrir um
            buraco na composição. */}
        <div className="relative mt-20">
        {/* Marcas de corte: a grade é a "folha" de resultados. */}
        <Marcas />
        <dl className="grid gap-px overflow-hidden rounded-2xl border border-bone/12 bg-bone/12 sm:grid-cols-2 lg:grid-cols-3">
          {metricas.items.map((item, i) => (
            <div
              key={item.label}
              className="group flex flex-col bg-ink p-9 transition-colors duration-500 hover:bg-ink-2 lg:p-10"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="flex flex-1 flex-col">
                {item.value ? (
                  <>
                    <span
                      data-count={item.value}
                      className="display block text-[clamp(2.6rem,7vw,4.5rem)] leading-none"
                      /* Ciano, magenta, amarelo, em rodízio (sem o K: preto
                         no fundo preto não aparece). */
                      style={{ color: CMYK[i % 3] }}
                    >
                      {item.value}
                    </span>

                    <span className="mt-4 block text-lg leading-snug">
                      {item.label}
                    </span>
                  </>
                ) : (
                  /* O rótulo vira o próprio título do cartão. Menor que um
                     número (é frase, não algarismo) mas na mesma família e
                     na mesma cor, para a grade não perder o ritmo. */
                  <span className="display block text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] text-plasma">
                    {item.label}
                  </span>
                )}

                <span className="mt-5 flex gap-3 text-sm leading-relaxed text-bone-dim">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6em] h-px w-5 shrink-0 bg-plasma/50"
                  />
                  {item.outcome}
                </span>

                <span className="mono-label mt-auto pt-7">{item.source}</span>
              </dd>
            </div>
          ))}
        </dl>
        </div>
      </div>
    </section>
  );
}
