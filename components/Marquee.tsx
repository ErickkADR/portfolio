"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { marquee } from "@/lib/content";

/* Faixa infinita que reage ao scroll: acelera na direção em que a
   pessoa está rolando e inclina de leve com a velocidade. O detalhe
   que vende o efeito é o `timeScale` voltando devagar ao normal —
   sem isso a faixa dá um tranco a cada parada. */

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".marquee-row");

        // Anima -50%: a lista está duplicada, então meio ciclo já
        // devolve o conteúdo à posição original e o loop é invisível.
        const loop = gsap.to(items, {
          xPercent: -50,
          ease: "none",
          duration: 22,
          repeat: -1,
        });

        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = self.getVelocity();
            const dir = self.direction;

            gsap.to(loop, {
              timeScale: dir * gsap.utils.clamp(1, 4, 1 + Math.abs(v) / 900),
              duration: 0.4,
              overwrite: true,
            });
            gsap.to(items, {
              skewX: gsap.utils.clamp(-9, 9, v / 320),
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
          },
          onScrubComplete: () => {
            gsap.to(loop, { timeScale: 1, duration: 0.8 });
            gsap.to(items, { skewX: 0, duration: 0.6, ease: "power3.out" });
          },
        });

        return () => {
          st.kill();
          loop.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const row = (
    <div className="marquee-row flex shrink-0 items-center gap-8 pr-8">
      {[...marquee, ...marquee].map((word, i) => (
        <span key={`${word}-${i}`} className="flex items-center gap-8">
          <span className="display text-[clamp(2rem,6vw,4.5rem)] whitespace-nowrap">
            {word}
          </span>
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-plasma"
            aria-hidden="true"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className="relative flex overflow-hidden border-y border-bone/10 py-8"
      aria-hidden="true"
    >
      {row}
    </div>
  );
}
