"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stack } from "@/lib/content";
import { getLogo, monograma } from "@/lib/logos";
import RevealText from "./RevealText";

/* ============================================================
   STACK — parede de logos.

   Antes cada ferramenta era um cartão com logo, nome e nota embaixo.
   Ficava uma tabela: muito texto repetido, e a leitura acontecia palavra
   por palavra em vez de por reconhecimento. Agora o ladrilho carrega só
   a logo, e o nome aparece no hover — quem reconhece a marca não precisa
   ler nada, e quem não reconhece descobre passando o mouse.

   As linhas usam flex-wrap centralizado, e não uma grade de N colunas:
   a última linha de cada grupo fica centralizada sozinha, em vez de
   ficar encostada à esquerda com buracos à direita.
   ============================================================ */

export default function Stack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Um trigger por grupo: a seção é mais alta que a viewport e,
           com um stagger único, os últimos grupos terminariam a animação
           antes mesmo de aparecerem na tela. */
        const grupos = gsap.utils
          .toArray<HTMLElement>(".stack-group")
          .map((col) =>
            gsap.from(col.querySelectorAll(".stack-tile"), {
              y: 22,
              scale: 0.85,
              opacity: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              stagger: 0.035,
              scrollTrigger: { trigger: col, start: "top 90%", once: true },
            })
          );

        return () => grupos.forEach((t) => t.kill());
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

        {/* ---------- parede de logos ----------
            Compacta de propósito: com os grupos que entraram, ladrilhos
            de 80px e 14 de respiro entre grupos faziam a seção sozinha
            ocupar duas telas e meia de rolagem. Em 56px o conjunto cabe
            de uma vez, que é o ponto de uma parede de logos — ela existe
            para ser lida de relance, não percorrida. */}
        <div className="mt-16 space-y-9">
          {stack.groups.map((group) => (
            <div key={group.group} className="stack-group">
              <h3 className="mono-label text-center text-plasma">
                {group.group}
              </h3>

              <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
                {group.items.map((item) => {
                  const logo = getLogo(item.icon);
                  const cor = logo?.color ?? "var(--color-plasma-soft)";

                  return (
                    <li key={item.name} className="stack-tile group/tile relative">
                      {/* `button` e não `div`: o tooltip precisa aparecer
                          também no foco por teclado, e só um elemento
                          focável recebe :focus-visible. */}
                      <button
                        type="button"
                        aria-label={item.name}
                        className="grid h-14 w-14 place-items-center rounded-xl border border-bone/10 bg-ink-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-bone/25 hover:bg-ink-3 [&>*]:h-6 [&>*]:w-6"
                        style={{ color: cor }}
                      >
                        {logo?.node ?? (
                          <span className="display grid h-6 w-6 place-items-center text-xs tracking-tight">
                            {monograma(item.name)}
                          </span>
                        )}
                      </button>

                      {/* Tooltip. `pointer-events-none` para ele nunca
                          roubar o hover do próprio ladrilho e piscar. */}
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-bone/15 bg-ink-3 px-2.5 py-1 text-[0.6875rem] tracking-wide opacity-0 shadow-lg transition-all duration-300 group-hover/tile:-translate-y-[calc(100%+0.25rem)] group-hover/tile:opacity-100 group-focus-within/tile:-translate-y-[calc(100%+0.25rem)] group-focus-within/tile:opacity-100"
                      >
                        {item.name}
                        {item.pct !== undefined && (
                          <span className="ml-1.5 text-bone-dim">{item.pct}%</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* A barra com a distribuição de linguagens dos repositórios
            públicos saiu daqui: 57% de HTML descreve o peso dos arquivos
            no GitHub, não a competência de quem escreveu — e num
            portfólio esse número trabalha contra. As logos já dizem com
            o que ele constrói. */}
      </div>
    </section>
  );
}
