"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ============================================================
   CARROSSEL — usado por Projetos, Feitos, Certificados e Recomendações.

   ARRASTAR É A INTERAÇÃO PRINCIPAL. As setas continuam existindo (para
   teclado e para quem prefere clicar), mas a pista inteira é uma área
   de arrasto: `cursor: grab` o tempo todo, e o ponteiro captura no
   primeiro pixel de movimento. Antes o arrasto era um extra escondido
   sobre uma faixa estreita; agora é o jeito óbvio de usar.

   O deslocamento continua sendo o scroll horizontal nativo, e não um
   transform: o arrasto por toque, o `scroll-snap` e a navegação por Tab
   vêm de graça e teriam de ser reimplementados à mão de outro jeito.

   NENHUM CARD FICA CORTADO. A pista "sangra" para fora da coluna de
   leitura com margens negativas e recebe o mesmo valor como padding
   interno: o primeiro card começa alinhado ao texto da seção, e o
   último termina com folga na borda da tela, em vez de morrer colado
   nela. O `scroll-padding` faz o snap respeitar essa mesma folga.
   ============================================================ */

type Props = {
  children: React.ReactNode;
  /* Rótulo acessível da região — o que está sendo percorrido. */
  label: string;
  className?: string;
};

export default function Carousel({ children, label, className = "" }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  /* ---------- estado das setas e da barra ---------- */
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    // A tolerância de 4px evita que a seta pisque no fim do curso por
    // causa do arredondamento subpixel do scroll.
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });

    // O conteúdo pode mudar de largura depois (fontes, imagens lazy),
    // e aí o máximo de scroll muda junto.
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  /* ---------- setas ---------- */
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(":scope > *");
    // Anda um card por vez; sem um card medido, cai em 80% da janela.
    const delta = first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  /* ---------- arrastar ---------- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // No toque, o próprio scroll nativo já arrasta melhor que qualquer
    // reimplementação — este bloco é só para ponteiro fino.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let arrastando = false;
    let inicioX = 0;
    let inicioScroll = 0;
    let andou = 0;

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      /* Começar o arrasto em cima de um link é permitido: o card
         inteiro é clicável, e exigir que a pessoa acerte o espaço entre
         cards para arrastar seria absurdo. Quem decide se aquilo virou
         clique ou arrasto é o `andou`, lá embaixo. */
      arrastando = true;
      andou = 0;
      inicioX = e.clientX;
      inicioScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
      // Enquanto arrasta, o snap brigaria puxando a pista de volta.
      el.style.scrollSnapType = "none";
    };

    const move = (e: PointerEvent) => {
      if (!arrastando) return;
      const dx = e.clientX - inicioX;
      andou = Math.abs(dx);
      // Captura já no primeiro movimento real: sem isso, sair de cima
      // da pista no meio do gesto interrompe o arrasto.
      if (andou > 2 && !el.hasPointerCapture(e.pointerId)) {
        el.setPointerCapture(e.pointerId);
      }
      el.scrollLeft = inicioScroll - dx;
    };

    const up = (e: PointerEvent) => {
      if (!arrastando) return;
      arrastando = false;
      el.style.cursor = "";
      el.style.scrollSnapType = "";
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    /* Um arrasto que passou de alguns pixels não deve virar clique no
       card que estava sob o cursor quando o dedo soltou. Na fase de
       captura, para chegar antes do handler do próprio link. */
    const click = (e: MouseEvent) => {
      if (andou > 5) {
        e.preventDefault();
        e.stopPropagation();
        andou = 0;
      }
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    // Arrastar uma imagem dispara o drag nativo do browser e mata o gesto.
    el.addEventListener("dragstart", (e) => e.preventDefault());

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
    };
  }, []);

  /* ---------- entrada dos cards ---------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const t = gsap.from(trackRef.current!.children, {
          x: 60,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: trackRef.current, start: "top 88%", once: true },
        });
        return () => t.kill();
      });
      return () => mm.revert();
    },
    { scope: trackRef }
  );

  const seta =
    "grid h-11 w-11 place-items-center rounded-full border border-bone/15 transition-all duration-300 hover:border-plasma hover:text-plasma disabled:pointer-events-none disabled:opacity-25";

  return (
    <div className={className}>
      {/* A sangria negativa tira a pista da coluna estreita e leva até a
          borda da tela; o padding devolve o alinhamento ao primeiro card
          e dá respiro ao último. `select-none` porque, arrastando, o
          browser selecionaria o texto dos cards no caminho. */}
      <ul
        ref={trackRef}
        aria-label={label}
        tabIndex={0}
        className="carousel-track -mx-[var(--gutter)] flex cursor-grab snap-x snap-mandatory select-none gap-5 overflow-x-auto scroll-pl-[var(--gutter)] px-[var(--gutter)] pb-2 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <div className="mt-8 flex items-center gap-5">
        <div className="flex gap-2.5">
          <button
            type="button"
            className={seta}
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={seta}
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label="Próximo"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Barra de progresso: diz quanto ainda falta, que é o que a
            seta sozinha não comunica. */}
        <div className="h-px flex-1 bg-bone/15" aria-hidden="true">
          <div
            className="h-full origin-left bg-plasma transition-transform duration-300"
            style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }}
          />
        </div>

        <span className="mono-label hidden shrink-0 sm:block">
          Arraste para o lado
        </span>
      </div>
    </div>
  );
}
