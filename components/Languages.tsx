"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { languages } from "@/lib/content";
import RevealText from "./RevealText";

/* Duas leituras da mesma coisa: a barra empilhada mostra a proporção
   medida (bytes reais do GitHub), os cartões mostram onde cada linguagem
   é usada. A barra sozinha exageraria o HTML; os cartões sozinhos não
   diriam nada sobre volume. Juntos, cada um cobre o ponto cego do outro. */

export default function Languages() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Os segmentos crescem a partir da esquerda, em cascata: a barra
        // se "desenha" da maior para a menor fatia.
        const bars = gsap.from(".lang-seg", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".lang-bar", start: "top 85%", once: true },
        });

        const cards = gsap.from(".lang-card", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".lang-grid", start: "top 88%", once: true },
        });

        return () => {
          bars.kill();
          cards.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="linguagens"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{languages.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {languages.title}
          </RevealText>
        </div>

        {/* ---------- barra empilhada ---------- */}
        <div className="mt-16">
          <div className="lang-bar flex h-3 w-full gap-1 overflow-hidden rounded-full">
            {languages.measured.map((l) => (
              <div
                key={l.name}
                className="lang-seg h-full rounded-full"
                style={{
                  // O mínimo de 1.5% mantém a fatia do TypeScript (0,8%)
                  // visível; sem isso ela vira um fio de um pixel.
                  width: `${Math.max(l.pct, 1.5)}%`,
                  background: l.color,
                }}
                title={`${l.name} — ${l.pct}%`}
              />
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-7 gap-y-2">
            {languages.measured.map((l) => (
              <li key={l.name} className="flex items-center gap-2 text-sm">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: l.color }}
                />
                <span>{l.name}</span>
                <span className="text-bone-dim">{l.pct}%</span>
              </li>
            ))}
          </ul>

          <p className="mono-label mt-5 text-center">{languages.note}</p>
        </div>

        {/* ---------- cartões ----------
            Duas colunas, não três: com três, os seis cartões viravam duas
            fileiras achatadas e a seção quase não ocupava tela. */}
        <ul className="lang-grid mt-20 grid gap-px overflow-hidden rounded-2xl border border-bone/12 bg-bone/12 sm:grid-cols-2">
          {languages.all.map((l) => (
            <li
              key={l.name}
              className="lang-card group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 sm:p-10"
            >
              {/* Fio na cor da linguagem que se estende no hover. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 sm:inset-x-10"
                style={{ background: l.color }}
              />
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 rounded-sm transition-transform duration-500 group-hover:scale-125"
                  style={{ background: l.color }}
                />
                <h3 className="display text-2xl">{l.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                {l.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
