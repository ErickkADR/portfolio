"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { manifesto } from "@/lib/content";
import GlobeSection from "./GlobeSection";

/* O parágrafo acende palavra por palavra conforme a seção atravessa a
   tela: o texto começa apagado e o scroll funciona como um marca-texto.
   É scrub (e não `once`), então voltar o scroll desfaz a leitura. */

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(copyRef.current, {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.12 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.35,
                scrollTrigger: {
                  trigger: copyRef.current,
                  start: "top 78%",
                  end: "bottom 55%",
                  scrub: 0.6,
                },
              }
            );
          },
        });

        return () => split.revert();
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const t = gsap.from(".manifesto-doing", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: ".manifesto-doing",
            start: "top 88%",
            once: true,
          },
        });
        return () => t.kill();
      });

      /* Contadores. Só o trecho numérico anima; sufixos como "+" ou
         "fps" ficam parados, senão viram ruído girando na tela. */
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
      counters.forEach((el) => {
        const raw = el.dataset.count ?? "";
        const match = raw.match(/^(\d+)(.*)$/);
        if (!match) return;
        const [, digits, suffix] = match;
        const end = parseInt(digits, 10);
        const obj = { v: 0 };

        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative py-32 sm:py-48"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{manifesto.label}</span>
        </div>

        <p
          ref={copyRef}
          className="mx-auto mt-10 max-w-[54rem] text-center text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.24] tracking-[-0.02em]"
        >
          {manifesto.body}
        </p>

        {/* Empilhado, não em duas colunas: lado a lado a lista virava uma
            faixa larga de seis linhas curtas. Numa coluna só ela ocupa a
            altura que o conteúdo realmente pede. */}
        <div className="hairline mt-24 pt-14">
          <h3 className="mono-label text-center text-plasma">O que eu faço</h3>
          <ul className="mx-auto mt-10 max-w-3xl space-y-6">
            {manifesto.doing.map((item) => (
              <li
                key={item}
                className="manifesto-doing flex gap-4 text-bone-dim md:text-lg"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] h-px w-5 shrink-0 bg-plasma/50"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hairline mt-28 pt-20">
          <GlobeSection />
        </div>

        <dl className="hairline mt-28 grid gap-12 pt-14 sm:grid-cols-3">
          {manifesto.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  data-count={stat.value}
                  className="display block text-[clamp(2.5rem,6vw,4.5rem)] text-plasma"
                >
                  {stat.value}
                </span>
                <span className="mx-auto mt-3 block max-w-[16rem] text-sm text-bone-dim">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
