"use client";

import { useRef } from "react";
import {
  IconSchool,
  IconCertificate,
  IconDeviceDesktopCode,
  IconBook2,
} from "@tabler/icons-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useConteudo } from "@/lib/idioma";
import RevealText from "./RevealText";
import { asset } from "@/lib/asset";
import { Marcas } from "./Prova";

/* Ícone pequeno por tipo de formação — bolsa, curso técnico, graduação.
   `IconBook2` é o padrão para um tipo que ainda não foi mapeado, para a
   moldura nunca ficar vazia. */
function IconeFormacao({ tipo }: { tipo?: string }) {
  if (tipo === "escola") return <IconSchool />;
  if (tipo === "tecnico") return <IconDeviceDesktopCode />;
  if (tipo === "graduacao") return <IconCertificate />;
  return <IconBook2 />;
}

type Props = {
  /* slug → caminho, de public/formacao/, montado no build. */
  logos: Record<string, string>;
};

export default function Formacao({ logos }: Props) {
  const { background } = useConteudo();
  const ref = useRef<HTMLElement>(null);

  /* Entrada em cascata, vertical (deslocamento horizontal estoura a página
     no celular: ver as armadilhas no CLAUDE.md). */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const t = gsap.from(".formacao-card", {
          y: 36,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".formacao-card", start: "top 85%", once: true },
        });
        return () => t.kill();
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
      {/* CARTÕES QUADRADOS BRANCOS COM A LOGO (26/11/2026, pedido dele):
          o baralho (CardSwap) saiu. Cada formação é um quadrado branco com a
          logo da instituição e, embaixo, período, título e texto. As três
          lado a lado leem de uma vez, sem esperar a carta trocar. A logo vem
          de public/formacao/<logo>.png; sem arquivo, cai no ícone. */}
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

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {background.items.map((item) => (
            <li key={item.title} className="formacao-card group">
              <div className="relative aspect-square rounded-2xl bg-white shadow-xl shadow-black/40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
                {/* Cartão branco = folha impressa: marcas de corte nos cantos. */}
                <Marcas afastar={10} tamanho={14} />
                {item.logo && logos[item.logo] ? (
                  <img
                    src={asset(logos[item.logo])}
                    alt={item.title}
                    draggable={false}
                    className="absolute inset-[18%] h-[64%] w-[64%] object-contain"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-plasma [&>svg]:h-20 [&>svg]:w-20">
                    <IconeFormacao tipo={item.icon} />
                  </span>
                )}
              </div>

              <p className="mono-label mt-6 text-plasma">{item.period}</p>
              <h3 className="display mt-2 text-xl leading-tight">{item.title}</h3>
              <p className="mono-label mt-2">{item.meta}</p>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">{item.body}</p>
              <span className="mono-label mt-5 inline-block rounded-full border border-plasma/30 px-3 py-1 text-plasma-soft">
                {item.highlight}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
