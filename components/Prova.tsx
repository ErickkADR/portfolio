"use client";

import { useId, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ============================================================
   TEMA "PRÉ-IMPRESSÃO" (proposta de 27/11/2026, branch própria).

   O Erick trabalha com plotter de recorte, laser e impressão: o site
   passa a ter a linguagem de uma PROVA DE IMPRESSÃO. Três peças, todas
   decorativas (aria-hidden), reaproveitadas pelas seções:

   - <Marcas />    marcas de corte nos quatro cantos de um bloco, como as
                   que a gráfica põe fora da área útil;
   - <TiraCMYK />  a tira de calibração de cor que vai na margem da folha;
   - <LinhaCorte /> o contorno tracejado que o plotter "desenha" em volta
                   do card quando ele entra na tela.
   ============================================================ */

/* As quatro cores de processo, ajustadas para fundo escuro: o ciano e o
   magenta "de verdade" ficam opacos sobre preto. */
export const CMYK = ["var(--color-ciano)", "var(--color-magenta)", "var(--color-amarelo)", "var(--color-bone)"];

/* Marcas de corte: um L em cada canto, PARA FORA do bloco (a marca não
   invade a arte). `afastar` é a distância do canto, em px. */
export function Marcas({
  afastar = 14,
  tamanho = 18,
  className = "",
}: {
  afastar?: number;
  tamanho?: number;
  className?: string;
}) {
  const cantos = [
    { top: -afastar, left: -afastar, d: `M0 ${tamanho}V0H${tamanho}` },
    { top: -afastar, right: -afastar, d: `M0 0H${tamanho}V${tamanho}` },
    { bottom: -afastar, left: -afastar, d: `M0 0V${tamanho}H${tamanho}` },
    { bottom: -afastar, right: -afastar, d: `M0 ${tamanho}H${tamanho}V0` },
  ];
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {cantos.map(({ d, ...pos }, i) => (
        <svg
          key={i}
          width={tamanho}
          height={tamanho}
          viewBox={`0 0 ${tamanho} ${tamanho}`}
          className="absolute overflow-visible text-bone/35"
          style={pos}
        >
          <path d={d} fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </span>
  );
}

/* A mira de registro: círculo com cruz. Na gráfica é o que confirma que
   as quatro chapas caíram no mesmo lugar. */
export function Registro({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`h-5 w-5 ${className}`}>
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M12 0v24M0 12h24" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* Tira de calibração: as 4 cores em 100/70/40% e um degradê de cinza. */
export function TiraCMYK({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex items-center gap-px ${className}`}>
      {CMYK.map((cor) =>
        [1, 0.7, 0.4].map((a) => (
          <span key={cor + a} className="h-2.5 w-2.5" style={{ background: cor, opacity: a }} />
        ))
      )}
    </span>
  );
}

/* LINHA DE CORTE: contorno tracejado em volta do card, desenhado como se
   a faca do plotter estivesse passando. O tracejado é o desenho; quem
   avança é uma MÁSCARA de traço contínuo (stroke-dashoffset de 1 a 0 com
   pathLength=1), porque animar o dashoffset do próprio tracejado só faria
   os traços "andarem" em vez de aparecerem.

   Fica 6px PARA DENTRO do card, como o meio-corte de um adesivo: o card
   e as faixas horizontais têm overflow-hidden, e uma linha por fora seria
   cortada.

   `gatilho`: nas faixas horizontais o card entra pela DIREITA, não por
   baixo, então a linha nasce quando a SEÇÃO chega e cada card ganha um
   atraso pelo índice. */
export function LinhaCorte({
  raio = 16,
  atraso = 0,
  gatilho,
}: {
  raio?: number;
  atraso?: number;
  gatilho?: string;
}) {
  const id = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const faca = ref.current!.querySelector(".faca");
        const t = gsap.fromTo(
          faca,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            delay: atraso,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: gatilho ?? ref.current,
              start: "top 75%",
              once: true,
            },
          }
        );
        return () => t.kill();
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-[6px] z-30 h-[calc(100%-12px)] w-[calc(100%-12px)] overflow-visible"
    >
      <defs>
        <mask id={`m${id}`}>
          <rect
            className="faca"
            x="1"
            y="1"
            style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
            rx={Math.max(4, raio - 6)}
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="0"
          />
        </mask>
      </defs>
      <rect
        x="1"
        y="1"
        style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
        rx={Math.max(4, raio - 6)}
        fill="none"
        stroke="var(--color-magenta)"
        strokeOpacity="0.7"
        strokeWidth="1"
        strokeDasharray="6 5"
        mask={`url(#m${id})`}
      />
    </svg>
  );
}
