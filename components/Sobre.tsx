"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { sobre, site } from "@/lib/content";
import { asset } from "@/lib/asset";
import RevealText from "./RevealText";

/* Foto à esquerda, texto à direita.

   Antes esta seção era uma frase gigante ocupando a tela inteira: muito
   destaque para o texto e nenhum rosto. Duas colunas resolvem os dois —
   a foto ancora, e o texto vira leitura em vez de manifesto.

   A foto vem de fora (`photo`), lida da pasta no build. Sem arquivo, o
   lugar dela vira uma moldura com as iniciais: continua composto, e não
   fica um buraco nem uma imagem quebrada. */

type Props = {
  /* Caminho em public/, ou null se ainda não subiu foto nenhuma. */
  photo: string | null;
};

export default function Sobre({ photo }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Os parágrafos acendem palavra a palavra conforme a seção sobe.
           É scrub, não `once`: voltar o scroll desfaz a leitura. */
        const split = SplitText.create(".sobre-copy p", {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.18 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.2,
                scrollTrigger: {
                  trigger: ".sobre-copy",
                  start: "top 80%",
                  end: "bottom 65%",
                  scrub: 0.6,
                },
              }
            );
          },
        });

        const foto = gsap.from(".sobre-foto", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".sobre-foto", start: "top 88%", once: true },
        });

        const ficha = gsap.from(".sobre-fato", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".sobre-ficha", start: "top 92%", once: true },
        });

        return () => {
          split.revert();
          foto.kill();
          ficha.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const iniciais = site.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <section ref={ref} id="sobre" className="relative py-32 sm:py-44">
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{sobre.label}</span>
          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {sobre.title}
          </RevealText>
        </div>

        {/* A coluna da foto é mais estreita que a do texto: um retrato em
            pé ao lado de três parágrafos, meio a meio, deixaria a foto
            grande demais e o texto espremido. */}
        <div className="mt-20 grid items-start gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          <figure className="sobre-foto relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-bone/12 bg-ink-2">
              {photo ? (
                <img
                  src={asset(photo)}
                  alt={sobre.photoAlt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center">
                  <span
                    aria-hidden="true"
                    className="display text-[clamp(4rem,10vw,7rem)] text-bone/10"
                  >
                    {iniciais}
                  </span>
                </div>
              )}

              {/* Halo na cor do site atrás do canto, para a moldura não
                  ficar um retângulo solto no fundo preto. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1/4 -top-1/4 h-1/2 w-1/2 rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--color-plasma) 0%, transparent 70%)",
                }}
              />
            </div>

            <figcaption className="mono-label mt-4 text-center">
              {site.name} · {site.role}
            </figcaption>
          </figure>

          <div>
            <div className="sobre-copy space-y-6">
              {sobre.body.map((p) => (
                <p
                  key={p.slice(0, 32)}
                  className="text-[clamp(1.05rem,1.8vw,1.35rem)] leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            <dl className="sobre-ficha hairline mt-12 grid gap-8 pt-10 sm:grid-cols-2">
              {sobre.facts.map((fato) => (
                <div key={fato.label} className="sobre-fato">
                  <dt className="mono-label">{fato.label}</dt>
                  <dd className="mt-2 leading-snug">{fato.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
