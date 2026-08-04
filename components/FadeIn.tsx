"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/* Entrada em cascata dos filhos diretos quando o bloco chega na tela.
   As páginas de projeto são feitas de blocos empilhados (parágrafos,
   cartões, telas) e todos querem o mesmo gesto — em vez de repetir o
   mesmo useGSAP em cada um, o wrapper resolve.

   `once: true`: a página de projeto é para ler, e um elemento que
   desaparece ao voltar o scroll atrapalha a leitura. */

type Props = {
  children: ReactNode;
  className?: string;
  /* Quando presente, anima só o que casar com o seletor (dentro do
     bloco). Sem ele, anima os filhos diretos. */
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
};

export default function FadeIn({
  children,
  className = "",
  selector,
  y = 30,
  stagger = 0.08,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = selector
          ? Array.from(el.querySelectorAll(selector))
          : Array.from(el.children);
        if (targets.length === 0) return;

        const t = gsap.from(targets, {
          y,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        });

        return () => t.kill();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
