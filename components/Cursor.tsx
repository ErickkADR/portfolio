"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/* Um único anel fino que acompanha o ponteiro de perto.

   O cursor nativo continua visível de propósito: escondê-lo transfere
   toda a responsabilidade de precisão para um elemento que anda com
   atraso, e clicar passa a exigir mira. O anel aqui é enfeite, não
   substituto — por isso ele é discreto e nunca cobre o ponto de clique. */

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    // quickTo mantém um tween vivo por eixo em vez de criar um novo a
    // cada mousemove — a diferença entre 60fps e um coletor de lixo
    // trabalhando sem parar.
    const xTo = gsap.quickTo(ring, "x", { duration: 0.32, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.32, ease: "power3" });

    let revealed = false;
    const onMove = (e: PointerEvent) => {
      if (!revealed) {
        revealed = true;
        // Sem tween: posiciona no ponto real antes de aparecer, senão
        // o anel voa do canto da tela até o cursor.
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        gsap.to(ring, { opacity: 1, duration: 0.4 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    // Delegação: elementos que entram na página depois ganham o estado
    // de hover sem precisar religar listeners.
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as HTMLElement).closest(
        'a, button, [data-cursor="hover"]'
      );
      ring.dataset.state = hit ? "hover" : "";
    };

    const onLeave = () => gsap.to(ring, { opacity: 0, duration: 0.25 });
    const onEnter = () => revealed && gsap.to(ring, { opacity: 1, duration: 0.25 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
