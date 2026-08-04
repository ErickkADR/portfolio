"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stack, background } from "@/lib/content";
import RevealText from "./RevealText";

export default function Stack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Cada coluna revela seus itens em cascata quando entra na tela.
        // O batch agrupa colunas que entram juntas num único stagger, em
        // vez de disparar quatro sequências desencontradas.
        const tweens = gsap.utils
          .toArray<HTMLElement>(".stack-col")
          .map((col, i) =>
            gsap.from(col.querySelectorAll("li"), {
              y: 26,
              opacity: 0,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.06,
              delay: i * 0.08,
              scrollTrigger: { trigger: col, start: "top 88%", once: true },
            })
          );

        return () => tweens.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="stack" className="py-32 sm:py-44">
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">Stack</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            Ferramentas do ofício
          </RevealText>
        </div>

        {/* Duas colunas em vez de quatro: em quatro os grupos ficavam
            lado a lado numa faixa rasa, cada lista com meia dúzia de
            itens curtos. Em duas, a seção respira e ganha altura. */}
        <div className="hairline mt-20 grid gap-x-12 gap-y-16 pt-14 sm:grid-cols-2">
          {stack.map((group) => (
            <div key={group.group} className="stack-col">
              <h3 className="mono-label text-plasma">{group.group}</h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 text-lg text-bone-dim transition-colors duration-300 hover:text-bone"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-4 bg-bone/25 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-8 group-hover:bg-plasma"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-24 pt-14">
          <h3 className="mono-label text-center text-plasma">
            {background.label}
          </h3>
          <ul className="stack-col mx-auto mt-10 grid max-w-3xl gap-x-10 gap-y-10 sm:grid-cols-3">
            {background.items.map((item) => (
              <li key={item.title} className="text-center">
                <p className="text-lg leading-snug">{item.title}</p>
                <p className="mono-label mt-2">{item.meta}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
