"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { metricas } from "@/lib/content";
import RevealText from "./RevealText";

/* Os números que antes ficavam soltos no fim da seção "Sobre" agora têm
   seção própria — e cada um diz de onde saiu. Número sem fonte em
   portfólio é decoração; com a fonte ao lado, é evidência. */

export default function Metricas() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      /* Só o trecho numérico anima; sufixos como "+" ficam parados,
         senão viram ruído girando na tela. */
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
      const tweens = counters.map((el) => {
        const raw = el.dataset.count ?? "";
        const match = raw.match(/^(\d+)(.*)$/);
        if (!match) return null;
        const [, digits, suffix] = match;
        const end = parseInt(digits, 10);
        const obj = { v: 0 };

        return gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });

      return () => tweens.forEach((t) => t?.kill());
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="metricas"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{metricas.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {metricas.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {metricas.intro}
          </p>
        </div>

        <dl className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-bone/12 bg-bone/12 sm:grid-cols-3">
          {metricas.items.map((item) => (
            <div
              key={item.value}
              className="group flex flex-col items-center bg-ink p-10 text-center transition-colors duration-500 hover:bg-ink-2"
            >
              <dt className="sr-only">{item.label}</dt>
              <dd className="flex flex-1 flex-col items-center">
                <span
                  data-count={item.value}
                  className="display block text-[clamp(3rem,8vw,5.5rem)] text-plasma"
                >
                  {item.value}
                </span>
                <span className="mt-4 block max-w-[18rem] text-sm leading-relaxed text-bone-dim">
                  {item.label}
                </span>
                <span className="mono-label mt-auto pt-6">{item.source}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
