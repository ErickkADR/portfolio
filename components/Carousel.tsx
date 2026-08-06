"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ============================================================
   CARROSSEL — usado por Projetos, Feitos e Certificados.

   O deslocamento é o scroll horizontal nativo do container, não um
   transform. Três coisas vêm de graça com isso e teriam de ser
   reimplementadas à mão num carrossel de transform: o arrasto por toque
   no celular, a navegação por teclado (Tab leva ao próximo card e o
   container acompanha) e o `scroll-snap`, que encaixa o card no lugar
   sem uma linha de JavaScript.

   O que o JavaScript acrescenta: as setas, o indicador de progresso, o
   arrasto com o mouse no desktop (que o scroll nativo não dá) e a
   entrada animada dos cards.
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

  /* ---------- arrastar com o mouse ---------- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;

    const down = (e: PointerEvent) => {
      // Só botão principal, e nunca a partir de um link ou botão: senão
      // arrastar de leve sobre um card cancelaria o clique dele.
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest("a, button")) return;
      dragging = true;
      moved = 0;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
    };

    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      moved = Math.abs(dx);
      if (moved > 3) el.setPointerCapture(e.pointerId);
      el.scrollLeft = startScroll - dx;
    };

    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = "";
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    // Um arrasto que passou de alguns pixels não deve virar clique no
    // card que estava sob o cursor quando o dedo soltou.
    const click = (e: MouseEvent) => {
      if (moved > 5) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);

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
      <ul
        ref={trackRef}
        aria-label={label}
        tabIndex={0}
        className="carousel-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
      </div>
    </div>
  );
}
