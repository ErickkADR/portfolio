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
      className="relative py-28 sm:py-40"
    >
      <div className="shell">
        <span className="mono-label">{manifesto.label}</span>

        <p
          ref={copyRef}
          className="mt-8 max-w-5xl text-[clamp(1.5rem,4vw,3.1rem)] leading-[1.22] tracking-[-0.02em]"
        >
          {manifesto.body}
        </p>

        <div className="hairline mt-20 grid gap-10 pt-12 lg:grid-cols-[0.4fr_1fr]">
          <h3 className="mono-label text-plasma">O que eu faço</h3>
          <ul className="space-y-4">
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

        <div className="hairline mt-24 pt-16">
          <GlobeSection />
        </div>

        <dl className="hairline mt-20 grid gap-10 pt-12 sm:grid-cols-3">
          {manifesto.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  data-count={stat.value}
                  className="display block text-[clamp(2.5rem,6vw,4.5rem)] text-plasma"
                >
                  {stat.value}
                </span>
                <span className="mt-2 block max-w-[16rem] text-sm text-bone-dim">
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
