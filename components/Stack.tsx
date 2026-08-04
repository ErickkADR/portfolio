"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stack, background } from "@/lib/content";
import RevealText from "./RevealText";

/* Linguagens e ferramentas na mesma seção.

   Antes eram duas: uma com a barra medida do GitHub e outra com os
   grupos do stack. As duas listas se repetiam — JavaScript, HTML, CSS e
   TypeScript apareciam nos dois lugares — e quem lia tinha que juntar
   sozinho. Agora a barra abre a seção (é o dado medido, então merece o
   topo) e os grupos vêm logo abaixo, com as linguagens ocupando a linha
   inteira porque são as únicas que carregam nota por item. */

export default function Stack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Os segmentos crescem a partir da esquerda, em cascata: a barra
        // se "desenha" da maior para a menor fatia.
        const bars = gsap.from(".lang-seg", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".lang-bar", start: "top 85%", once: true },
        });

        // Um tween por grupo, disparado pelo próprio grupo: com um único
        // stagger geral, os grupos do fim da seção já teriam terminado a
        // animação antes de chegarem na tela.
        const cols = gsap.utils
          .toArray<HTMLElement>(".stack-col")
          .map((col) =>
            gsap.from(col.querySelectorAll("li"), {
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.05,
              scrollTrigger: { trigger: col, start: "top 90%", once: true },
            })
          );

        return () => {
          bars.kill();
          cols.forEach((t) => t.kill());
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="stack"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{stack.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {stack.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {stack.intro}
          </p>
        </div>

        {/* ---------- barra medida ---------- */}
        <div className="mt-20">
          <p className="mono-label text-center">{stack.barLabel}</p>

          <div className="lang-bar mt-5 flex h-3 w-full gap-1 overflow-hidden rounded-full">
            {stack.measured.map((l) => (
              <div
                key={l.name}
                className="lang-seg h-full rounded-full"
                style={{
                  // O mínimo de 1.5% mantém a fatia do TypeScript (0,8%)
                  // visível; sem isso ela vira um fio de um pixel.
                  width: `${Math.max(l.pct, 1.5)}%`,
                  background: l.color,
                }}
                title={`${l.name} — ${l.pct}%`}
              />
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-7 gap-y-2">
            {stack.measured.map((l) => (
              <li key={l.name} className="flex items-center gap-2 text-sm">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: l.color }}
                />
                <span>{l.name}</span>
                <span className="text-bone-dim">{l.pct}%</span>
              </li>
            ))}
          </ul>

          <p className="mono-label mt-5 text-center">{stack.note}</p>
        </div>

        {/* ---------- grupos ---------- */}
        <ul className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-bone/12 bg-bone/12 sm:grid-cols-2">
          {stack.groups.map((group) => (
            <li
              key={group.group}
              className={`stack-col bg-ink p-8 sm:p-10 ${
                group.wide ? "sm:col-span-2" : ""
              }`}
            >
              <h3 className="mono-label text-plasma">{group.group}</h3>

              <ul
                className={
                  group.wide
                    ? "mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3"
                    : "mt-6 space-y-3"
                }
              >
                {group.items.map((item) => (
                  <li key={item.name} className="group/item">
                    <div className="flex items-baseline gap-3">
                      {item.color ? (
                        <span
                          aria-hidden="true"
                          className="h-2.5 w-2.5 shrink-0 translate-y-[-0.1em] rounded-sm transition-transform duration-500 group-hover/item:scale-125"
                          style={{ background: item.color }}
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-bone/25 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:w-7 group-hover/item:bg-plasma"
                        />
                      )}

                      <span className="text-lg leading-snug text-bone-dim transition-colors duration-300 group-hover/item:text-bone">
                        {item.name}
                      </span>

                      {item.pct !== undefined && (
                        <span className="mono-label ml-auto shrink-0">
                          {item.pct}%
                        </span>
                      )}
                    </div>

                    {item.note && (
                      <p className="mt-1.5 pl-[1.4rem] text-sm leading-relaxed text-bone-dim">
                        {item.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* ---------- formação ---------- */}
        <div className="hairline mt-24 pt-14">
          <h3 className="mono-label text-center text-plasma">
            {background.label}
          </h3>
          <ul className="stack-col mx-auto mt-10 grid max-w-3xl gap-x-10 gap-y-10 sm:grid-cols-3">
            {background.items.map((item) => (
              <li key={item.title} className="text-center">
                <p className="text-lg leading-snug">{item.title}</p>
                <p className="mono-label mt-2">{item.meta}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
