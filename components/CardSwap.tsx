"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type ReactElement,
} from "react";
import { gsap } from "@/lib/gsap";

/* ============================================================
   CARD SWAP — baralho que se troca sozinho.

   Origem: componente CardSwap do React Bits, adaptado. A carta da frente
   cai, as de trás sobem uma posição e a que caiu volta para o fim da
   fila.

   ---- O que foi mudado em relação ao original ----

   1. TIPADO, e o `gsap` vem de `lib/gsap` (a instância única do projeto,
      já com os plugins registrados) em vez de um import próprio.

   2. `dropDistance`. O original derruba a carta 500px fixos. Aqui a
      seção que usa isso tem altura própria e o baralho é clipado pelo
      container, então a queda é configurável: 500px numa caixa de 300
      atravessa a seção de baixo antes de desaparecer.

   3. PARA QUANDO SAI DA TELA. O original mantém um `setInterval` e uma
      timeline do GSAP rodando desde a montagem, mesmo com a seção longe
      da viewport. Num site de página única isso significa um baralho
      animando sozinho o tempo todo. Aqui um IntersectionObserver liga e
      desliga o ciclo.

   4. `prefers-reduced-motion` não anima: as cartas ficam paradas no
      baralho, empilhadas, e a pessoa ainda vê que há três.

   5. O CSS não posiciona o container no canto inferior direito (o
      original tem `position: absolute; bottom: 0; right: 0` mais um
      translate). Aqui ele é um bloco normal, porque a seção Formação o
      usa dentro de uma coluna, não sangrando de um canto.
   ============================================================ */

type CardProps = React.HTMLAttributes<HTMLDivElement> & { customClass?: string };

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`swap-card ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

type Slot = { x: number; y: number; z: number; zIndex: number };

const fazerSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const posicionar = (el: HTMLDivElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

type Props = {
  width?: number | string;
  height?: number | string;
  /* Distância no eixo X entre as cartas do baralho. */
  cardDistance?: number;
  /* Distância no eixo Y entre as cartas do baralho. */
  verticalDistance?: number;
  /* Intervalo entre as trocas, em ms. */
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  /* Inclinação das bordas de cima e de baixo, em graus. */
  skewAmount?: number;
  easing?: "linear" | "elastic";
  /* Quanto a carta da frente cai antes de voltar para o fim da fila. */
  dropDistance?: number;
  className?: string;
  children: React.ReactNode;
};

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  dropDistance = 500,
  className = "",
  children,
}: Props) {
  const config = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power1.inOut",
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing]
  );

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => ({ current: null as HTMLDivElement | null })),
    [childArr.length] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const ordem = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | undefined>(undefined);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    const cartas = refs.map((r) => r.current).filter(Boolean) as HTMLDivElement[];
    if (cartas.length === 0) return;

    cartas.forEach((el, i) =>
      posicionar(el, fazerSlot(i, cardDistance, verticalDistance, total), skewAmount)
    );

    /* Movimento reduzido: o baralho fica montado e parado. Ver a nota no
       topo do arquivo. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trocar = () => {
      if (ordem.current.length < 2) return;

      const [frente, ...resto] = ordem.current;
      const elFrente = refs[frente].current;
      if (!elFrente) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFrente, {
        y: `+=${dropDistance}`,
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promove", `-=${config.durDrop * config.promoteOverlap}`);
      resto.forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const slot = fazerSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promove");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promove+=${i * 0.15}`
        );
      });

      const slotFundo = fazerSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("volta", `promove+=${config.durMove * config.returnDelay}`);
      tl.call(() => gsap.set(elFrente, { zIndex: slotFundo.zIndex }), undefined, "volta");
      tl.to(
        elFrente,
        {
          x: slotFundo.x,
          y: slotFundo.y,
          z: slotFundo.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "volta"
      );

      tl.call(() => {
        ordem.current = [...resto, frente];
      });
    };

    const parar = () => {
      window.clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    };
    const comecar = () => {
      if (intervalRef.current !== undefined) return;
      trocar();
      intervalRef.current = window.setInterval(trocar, delay);
    };

    /* O ciclo só roda com a seção na tela. Sem isso, o baralho troca de
       carta durante a página inteira, e a primeira troca que a pessoa vê
       acontece no meio do caminho em vez de quando ela chega. */
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? comecar() : parar()),
      { rootMargin: "80px" }
    );
    if (container.current) io.observe(container.current);

    const node = container.current;
    const pausar = () => {
      tlRef.current?.pause();
      parar();
    };
    const retomar = () => {
      tlRef.current?.play();
      comecar();
    };
    if (pauseOnHover && node) {
      node.addEventListener("mouseenter", pausar);
      node.addEventListener("mouseleave", retomar);
    }

    return () => {
      io.disconnect();
      parar();
      tlRef.current?.kill();
      if (pauseOnHover && node) {
        node.removeEventListener("mouseenter", pausar);
        node.removeEventListener("mouseleave", retomar);
      }
    };
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    dropDistance,
    config,
    refs,
  ]);

  const renderizadas = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<CardProps & { ref?: unknown }>, {
          key: i,
          ref: refs[i],
          style: {
            width,
            height,
            ...((child as ReactElement<CardProps>).props.style ?? {}),
          },
          onClick: (e: React.MouseEvent<HTMLDivElement>) => {
            (child as ReactElement<CardProps>).props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div
      ref={container}
      className={`card-swap-container ${className}`.trim()}
      style={{ width, height }}
    >
      {renderizadas}
    </div>
  );
}
