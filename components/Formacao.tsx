"use client";

import { useRef } from "react";
import {
  IconSchool,
  IconCertificate,
  IconDeviceDesktopCode,
  IconBook2,
} from "@tabler/icons-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { background } from "@/lib/content";
import RevealText from "./RevealText";

/* Ícone pequeno por tipo de formação — bolsa, curso técnico, graduação.
   `IconBook2` é o padrão para um tipo que ainda não foi mapeado, para a
   moldura nunca ficar vazia. */
function IconeFormacao({ tipo }: { tipo?: string }) {
  if (tipo === "escola") return <IconSchool />;
  if (tipo === "tecnico") return <IconDeviceDesktopCode />;
  if (tipo === "graduacao") return <IconCertificate />;
  return <IconBook2 />;
}

/* A formação era três linhas de texto no rodapé do Stack, sem destaque
   nenhum. Virou seção própria com um cartão por etapa: o ano em número
   grande à esquerda, o selo do que foi conquistado no topo, e o texto
   explicando o porquê. As duas primeiras vieram por nota, não por
   mensalidade — e isso é o que o selo mostra de relance. */

export default function Formacao() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const entrada = gsap.from(".formacao-card", {
          y: 32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".formacao-grid", start: "top 88%", once: true },
        });

        /* Flutuação contínua dos ícones. O `each` no stagger dessincroniza
           os três: subindo juntos pareceriam um bloco só se mexendo, e o
           efeito de "vida" vem justamente de estarem em fases diferentes. */
        const flutua = gsap.to(".formacao-icone", {
          y: -5,
          rotate: 4,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.45, from: "start" },
        });

        return () => {
          entrada.kill();
          flutua.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="formacao"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{background.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {background.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {background.intro}
          </p>
        </div>

        <ol className="formacao-grid mt-20 space-y-6">
          {background.items.map((item) => (
            <li
              key={item.title}
              className="formacao-card group relative overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-plasma/40"
            >
              {/* Fio na cor de acento que se estende no hover, mesmo
                  gesto dos outros cartões do site. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-plasma transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />

              <div className="grid gap-6 p-8 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-10">
                {/* O ano é o âncora visual: grande, na cor de acento e
                    fora do fluxo do texto. Abaixo dele, o ícone pequeno
                    da instituição, flutuando devagar. */}
                <div className="flex items-center gap-4 sm:w-[7.5rem] sm:flex-col sm:items-start sm:gap-3">
                  <span className="display text-[clamp(1.6rem,4vw,2.4rem)] leading-none text-plasma">
                    {item.period}
                  </span>

                  <span
                    aria-hidden="true"
                    className="formacao-icone grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-bone/12 bg-ink-3 text-plasma-soft [&>svg]:h-[18px] [&>svg]:w-[18px]"
                  >
                    <IconeFormacao tipo={item.icon} />
                  </span>
                </div>

                <div>
                  <span className="mono-label inline-block rounded-full border border-plasma/30 px-3 py-1 text-plasma-soft">
                    {item.highlight}
                  </span>

                  <h3 className="display mt-4 text-2xl leading-tight">
                    {item.title}
                  </h3>

                  <p className="mono-label mt-2">{item.meta}</p>

                  <p className="mt-4 max-w-2xl leading-relaxed text-bone-dim">
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
