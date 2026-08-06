"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { career } from "@/lib/content";
import RevealText from "./RevealText";

/* ============================================================
   CARREIRA — linha do tempo central, etapas alternando os lados.

   No desktop a trilha corre no meio e cada etapa cai de um lado: a
   primeira à esquerda, a segunda à direita, e assim por diante. É o
   `lg:col-start-*` que faz isso — a grade tem duas colunas de conteúdo
   com a trilha entre elas, e cada card escolhe em qual coluna entra.

   No celular a alternância não existe: com ~380px de largura, duas
   colunas dariam ~150px cada e o texto quebraria a cada duas palavras.
   Lá a trilha vai para a esquerda e todos os cards ficam à direita dela.

   A trilha se preenche conforme o scroll — o traço colorido cresce de
   cima para baixo acompanhando a leitura, e não aparece de uma vez.
   ============================================================ */

export default function Career() {
  const ref = useRef<HTMLElement>(null);
  const trilhaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* Duas condições: a de movimento e a de largura. A segunda existe
         por causa da entrada dos cards — ver o comentário lá embaixo. */
      mm.add(
        {
          anima: "(prefers-reduced-motion: no-preference)",
          largo: "(min-width: 1024px)",
        },
        (ctx) => {
          const { anima, largo } = ctx.conditions as {
            anima: boolean;
            largo: boolean;
          };
          if (!anima) return;
        /* O traço acompanha o scroll. `scaleY` a partir do topo em vez de
           animar `height`: escala é composta na GPU, altura força o
           layout a ser recalculado a cada frame. */
        const linha = gsap.fromTo(
          trilhaRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 65%",
              end: "bottom 85%",
              scrub: 0.5,
            },
          }
        );

        /* Cada etapa entra pelo lado em que está: as da esquerda vêm da
           esquerda, as da direita vêm da direita. O movimento reforça a
           alternância em vez de brigar com ela.

           SÓ NO DESKTOP. No celular não há alternância — os cards são de
           largura cheia — e o `x: 40` do estado inicial fazia o card
           nascer 40px fora da tela. Como o `gsap.from` já aplica esse
           deslocamento ANTES do trigger disparar, todos os cards abaixo
           da dobra ficavam empurrados para fora, e a página inteira
           ganhava 20px de rolagem horizontal. Aqui embaixo a entrada é
           vertical, que não tem para onde vazar. */
        const cards = gsap.utils
          .toArray<HTMLElement>(".career-item")
          .map((item, i) =>
            gsap.from(item, {
              ...(largo ? { x: i % 2 === 0 ? -40 : 40 } : { y: 28 }),
              opacity: 0,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: { trigger: item, start: "top 85%", once: true },
            })
          );

        const pontos = gsap.utils
          .toArray<HTMLElement>(".career-dot")
          .map((dot) =>
            gsap.from(dot, {
              scale: 0,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: { trigger: dot, start: "top 88%", once: true },
            })
          );

          return () => {
            linha.kill();
            cards.forEach((t) => t.kill());
            pontos.forEach((t) => t.kill());
          };
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="carreira"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{career.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {career.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {career.intro}
          </p>
        </div>

        {/* ---------- linha do tempo ---------- */}
        <div className="relative mt-20">
          {/* Trilha: base apagada + traço que cresce com o scroll.
              À esquerda no celular, centralizada a partir de lg. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[11px] w-px bg-bone/12 lg:left-1/2 lg:-translate-x-1/2"
          >
            <div
              ref={trilhaRef}
              className="h-full w-full origin-top bg-gradient-to-b from-plasma via-plasma-soft to-transparent"
            />
          </div>

          <ol className="space-y-14 lg:space-y-4">
            {career.entries.map((entry, i) => {
              const naEsquerda = i % 2 === 0;

              return (
                <li
                  key={entry.slug}
                  className="relative grid grid-cols-[24px_1fr] gap-x-6 lg:grid-cols-[1fr_56px_1fr] lg:gap-x-0"
                >
                  {/* ---------- ponto na trilha ---------- */}
                  <div className="relative lg:col-start-2 lg:row-start-1 lg:flex lg:justify-center">
                    <span
                      className="career-dot mt-2 grid h-6 w-6 place-items-center rounded-full border border-plasma/40 bg-ink"
                      aria-hidden="true"
                    >
                      <span className="h-2 w-2 rounded-full bg-plasma" />
                    </span>
                  </div>

                  {/* ---------- card ---------- */}
                  <article
                    className={`career-item group relative rounded-2xl border border-bone/12 bg-ink-2 p-7 transition-colors duration-500 hover:border-plasma/40 lg:row-start-1 lg:my-6 ${
                      naEsquerda
                        ? "lg:col-start-1 lg:text-right"
                        : "lg:col-start-3"
                    }`}
                  >
                    <span className="mono-label text-plasma">
                      {entry.period}
                    </span>

                    <h3 className="display mt-3 text-xl leading-tight lg:text-2xl">
                      {entry.role}
                    </h3>

                    {entry.org && (
                      <p className="mono-label mt-2">{entry.org}</p>
                    )}

                    <p className="mt-4 leading-relaxed text-bone-dim">
                      {entry.body}
                    </p>

                    {entry.tags.length > 0 && (
                      <ul
                        className={`mt-5 flex flex-wrap gap-1.5 ${
                          naEsquerda ? "lg:justify-end" : ""
                        }`}
                      >
                        {entry.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* O ::after estica o link sobre o card inteiro, então
                        clicar em qualquer ponto abre a etapa. */}
                    <p className="mono-label mt-6 inline-flex items-center gap-2 transition-colors duration-500 group-hover:text-plasma">
                      <Link
                        href={`/carreira/${entry.slug}/`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {career.entryCta}
                      </Link>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
