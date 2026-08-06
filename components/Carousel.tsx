"use client";

import { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* ============================================================
   CARROSSEL — usado por Projetos, Feitos, Certificados e Recomendações.

   ARRASTAR É A INTERAÇÃO PRINCIPAL. A pista inteira é área de arrasto
   (`cursor: grab`), e o ponteiro é capturado no primeiro pixel de
   movimento. As setas continuam existindo para teclado e para quem
   prefere clicar.

   O deslocamento é o scroll horizontal nativo, e não um transform: o
   arrasto por toque, o `scroll-snap` e a navegação por Tab vêm de graça.

   ---- Por que a barra de progresso NÃO é estado do React ----
   Ela era. Cada evento de scroll disparava três setState, e arrastar
   dispara scroll a cada frame — ou seja, o React re-renderizava a lista
   inteira (nos Certificados, 20 cards) 60 vezes por segundo. Era isso
   que travava o arrasto. Agora a barra é escrita direto no DOM por um
   ref, e só o estado das setas (dois booleanos que mudam raramente)
   continua no React.

   ---- Por que nenhum card fica cortado ----
   A largura do card é uma fração exata da pista (ver .carousel-slide no
   globals.css), então sempre cabe um número inteiro deles. Com largura
   fixa em rem, a conta nunca fechava e sobrava meio card na borda.
   ============================================================ */

type Props = {
  children: React.ReactNode;
  /* Rótulo acessível da região — o que está sendo percorrido. */
  label: string;
  className?: string;
  /* Anda sozinho, em loop contínuo. Pausa no hover, no foco e enquanto
     a pessoa arrasta. Ver o bloco de auto-scroll abaixo. */
  auto?: boolean;
};

export default function Carousel({
  children,
  label,
  className = "",
  auto = false,
}: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const barraRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  /* No modo automático o gesto e o hover precisam parar a deriva. */
  const pausado = useRef(false);

  /* Uma leitura por frame, no máximo. Sem o rAF, um arrasto rápido
     dispara dezenas de scrolls por frame e cada um força o layout. */
  const pendente = useRef(0);

  const sync = useCallback(() => {
    if (pendente.current) return;
    pendente.current = requestAnimationFrame(() => {
      pendente.current = 0;
      const el = trackRef.current;
      if (!el) return;

      /* No modo automático a lista está duplicada, então o curso "real"
         é metade da pista — sem isso a barra nunca passaria de 50%. */
      const largura = auto ? el.scrollWidth / 2 : el.scrollWidth;
      const max = largura - el.clientWidth;
      // A tolerância de 4px evita a seta piscando no fim do curso por
      // causa do arredondamento subpixel do scroll.
      const prev = el.scrollLeft > 4;
      const next = el.scrollLeft < max - 4;

      // setState com o mesmo valor booleano não re-renderiza (o React
      // compara por Object.is), então isto é barato.
      setCanPrev(prev);
      setCanNext(next);

      if (barraRef.current) {
        const p = max > 0 ? el.scrollLeft / max : 0;
        barraRef.current.style.transform = `scaleX(${Math.max(Math.min(p, 1), 0.04)})`;
      }
    });
  }, [auto]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });

    // O conteúdo pode mudar de largura depois (fontes, imagens lazy).
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
      if (pendente.current) cancelAnimationFrame(pendente.current);
    };
  }, [sync]);

  /* ---------- setas ---------- */
  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>(":scope > *");
    const delta = first ? first.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  /* ---------- arrastar ---------- */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // No toque o scroll nativo já arrasta melhor que qualquer
    // reimplementação — este bloco é só para ponteiro fino.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let arrastando = false;
    let inicioX = 0;
    let inicioScroll = 0;
    let andou = 0;

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      /* Começar o arrasto em cima de um link é permitido: o card
         inteiro é clicável, e exigir que a pessoa acerte o vão entre
         cards seria absurdo. Quem decide se virou clique ou arrasto é
         o `andou`, no handler de click. */
      arrastando = true;
      andou = 0;
      inicioX = e.clientX;
      inicioScroll = el.scrollLeft;
      el.style.cursor = "grabbing";
      // O snap puxaria a pista de volta no meio do gesto.
      el.style.scrollSnapType = "none";
      // E o smooth do scrollBy das setas brigaria com o valor direto.
      el.style.scrollBehavior = "auto";
    };

    const move = (e: PointerEvent) => {
      if (!arrastando) return;
      const dx = e.clientX - inicioX;
      andou = Math.abs(dx);
      // Captura no primeiro movimento real: sem isso, sair de cima da
      // pista no meio do gesto interrompe o arrasto.
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
      el.style.scrollBehavior = "";
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    /* Um arrasto de mais de alguns pixels não deve virar clique no card
       que estava sob o cursor. Fase de captura, para chegar antes do
       handler do próprio link. */
    const click = (e: MouseEvent) => {
      if (andou > 5) {
        e.preventDefault();
        e.stopPropagation();
        andou = 0;
      }
    };

    const semDrag = (e: Event) => e.preventDefault();

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("click", click, true);
    // Arrastar uma imagem dispara o drag nativo e mata o gesto.
    el.addEventListener("dragstart", semDrag);

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("click", click, true);
      el.removeEventListener("dragstart", semDrag);
    };
  }, []);

  /* ---------- deriva automática ----------
     A lista é renderizada duas vezes (ver `conteudo`, no fim). Quando o
     scroll chega à metade da pista, ele volta para zero — e como a
     segunda metade é idêntica à primeira, o salto é invisível. É o
     mesmo truque do marquee, feito com scroll em vez de transform para
     não perder o arrasto e o snap.

     Velocidade em pixels por SEGUNDO, multiplicada pelo delta de tempo:
     somar um valor fixo por frame amarraria a velocidade à taxa de
     quadros, e a faixa correria ao dobro num monitor de 120Hz. */
  useEffect(() => {
    if (!auto) return;
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const VELOCIDADE = 40;
    let raf = 0;
    let anterior = performance.now();

    /* A posição é acumulada AQUI, e não lida de `el.scrollLeft` a cada
       frame. Motivo: a 40px/s cada quadro avança ~0,66px, e o browser
       devolve `scrollLeft` arredondado — somar 0,66 a um valor que volta
       arredondado dá sempre o mesmo número, e a faixa fica parada. Com
       o acumulador em ponto flutuante, a fração se soma de verdade. */
    let pos = el.scrollLeft;

    const passo = (agora: number) => {
      const dt = Math.min((agora - anterior) / 1000, 0.05);
      anterior = agora;

      if (pausado.current) {
        // Enquanto pausado, quem manda é a pessoa: ressincroniza para
        // retomar de onde ela parou, em vez de dar um salto.
        pos = el.scrollLeft;
      } else {
        const metade = el.scrollWidth / 2;
        pos += VELOCIDADE * dt;
        if (metade > 0 && pos >= metade) pos -= metade;
        el.scrollLeft = pos;
      }

      raf = requestAnimationFrame(passo);
    };
    raf = requestAnimationFrame(passo);

    const parar = () => (pausado.current = true);
    const seguir = () => (pausado.current = false);

    el.addEventListener("pointerenter", parar);
    el.addEventListener("pointerleave", seguir);
    el.addEventListener("focusin", parar);
    el.addEventListener("focusout", seguir);
    // Fora da tela, animar é gasto de bateria sem ninguém olhando.
    const io = new IntersectionObserver(
      ([e]) => (pausado.current = !e.isIntersecting)
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", parar);
      el.removeEventListener("pointerleave", seguir);
      el.removeEventListener("focusin", parar);
      el.removeEventListener("focusout", seguir);
      io.disconnect();
    };
  }, [auto]);

  /* ---------- entrada dos cards ---------- */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Só os primeiros: os de fora da tela entrariam animando sem
           ninguém ver, e o `clearProps` devolve o controle ao CSS para
           o transform do GSAP não competir com o scroll depois. */
        const t = gsap.from(
          Array.from(trackRef.current!.children).slice(0, 4),
          {
            x: 60,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            clearProps: "transform",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
        return () => t.kill();
      });
      return () => mm.revert();
    },
    { scope: trackRef }
  );

  const seta =
    "grid h-11 w-11 place-items-center rounded-full border border-bone/15 transition-all duration-300 hover:border-plasma hover:text-plasma disabled:pointer-events-none disabled:opacity-25";

  /* A cópia que fecha o loop. `cloneElement` com key nova evita o aviso
     de chave duplicada, e `aria-hidden` impede que um leitor de tela
     anuncie a lista inteira duas vezes. */
  const copia = auto
    ? Children.map(children, (filho, i) =>
        isValidElement(filho)
          ? cloneElement(filho as React.ReactElement<{ "aria-hidden"?: boolean }>, {
              key: `loop-${i}`,
              "aria-hidden": true,
            })
          : filho
      )
    : null;

  return (
    <div className={className}>
      {/* `select-none` porque, arrastando, o browser selecionaria o
          texto dos cards no caminho. No modo automático o snap sai: ele
          brigaria com a deriva, travando a pista em cada card. */}
      <ul
        ref={trackRef}
        aria-label={label}
        tabIndex={0}
        className={`carousel-track flex cursor-grab select-none gap-5 overflow-x-auto pb-2 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden ${
          auto ? "" : "snap-x snap-mandatory"
        }`}
      >
        {children}
        {copia}
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

        <div className="h-px flex-1 bg-bone/15" aria-hidden="true">
          <div
            ref={barraRef}
            className="h-full origin-left scale-x-[0.04] bg-plasma"
          />
        </div>

        <span className="mono-label hidden shrink-0 sm:block">
          Arraste para o lado
        </span>
      </div>
    </div>
  );
}
