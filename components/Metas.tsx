"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { globe } from "@/lib/content";
import { useConteudo } from "@/lib/idioma";
import RevealText from "./RevealText";

/* Meta profissional — o globo com os arcos saindo de São Paulo.

   Antes vivia espremido no meio da seção "Sobre", com o rótulo
   "Alcance". Virou seção própria perto do fim: é onde o site sai do que
   já foi feito e passa a falar do que vem — o lugar certo para vir logo
   antes do contato.

   three + three-globe + fiber + drei somam alguns megabytes, então o
   globo é carregado sob demanda (dynamic + ssr:false).

   O CARREGAMENTO ACONTECE EM DOIS TEMPOS, e é o que consertou o "demora
   demais ou nem carrega":

   1. o BUNDLE é buscado assim que o navegador fica ocioso, ainda com a
      pessoa lendo o topo da página. Antes ele só começava a baixar
      quando a seção chegava perto, então os megabytes disputavam banda
      exatamente no instante em que o globo precisava aparecer;
   2. o COMPONENTE só monta quando a seção se aproxima, porque é a
      montagem que constrói a malha e custa CPU.

   Enquanto nada disso terminou, o lugar não fica vazio: o esqueleto
   abaixo ocupa a área. Um buraco de 38rem sem explicação é o que faz
   parecer que não carregou. */
const importaGlobo = () => import("@/components/ui/globe").then((m) => m.World);

const World = dynamic(importaGlobo, { ssr: false, loading: () => null });

const globeConfig = {
  pointSize: 4,
  globeColor: "#1c1132",
  showAtmosphere: true,
  atmosphereColor: "#cba6f7",
  atmosphereAltitude: 0.14,
  emissive: "#2a1a47",
  emissiveIntensity: 0.35,
  shininess: 0.9,
  // Os continentes são desenhados como milhares de hexágonos pequenos;
  // com pouca opacidade eles somem contra a esfera escura.
  polygonColor: "rgba(216,180,254,0.85)",
  ambientLight: "#a855f7",
  directionalLeftLight: "#f2f0f7",
  directionalTopLight: "#f2f0f7",
  pointLight: "#cba6f7",
  arcTime: 1400,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: globe.origin.lat, lng: globe.origin.lng },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

/* Todos os arcos saem de São Paulo. `order` escalona a entrada para os
   arcos não aparecerem todos no mesmo instante. */
const arcColors = ["#a855f7", "#c026d3", "#6d5cff"];

const arcs = globe.destinations.map((d, i) => ({
  order: (i % 5) + 1,
  startLat: globe.origin.lat,
  startLng: globe.origin.lng,
  endLat: d.lat,
  endLng: d.lng,
  arcAlt: 0.15 + (i % 4) * 0.14,
  color: arcColors[i % arcColors.length],
}));

export default function Metas() {
  /* `globe` (o import de módulo, acima) segue sendo a fonte das
     coordenadas: latitude não se traduz, e os arcos são montados fora do
     componente. Daqui sai só o texto. */
  const { globe: textoGlobo } = useConteudo();
  const ref = useRef<HTMLDivElement>(null);
  /* `montado` é definitivo (uma vez montado, fica). `naTela` acompanha a
     visibilidade e é o que liga e desliga o laço de render. */
  const [montado, setMontado] = useState(false);
  const [naTela, setNaTela] = useState(false);

  /* Busca o bundle na primeira folga do navegador. Só a rede: o
     componente continua montando pelo observer abaixo. */
  useEffect(() => {
    const idle =
      window.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 1500));
    const id = idle(() => {
      importaGlobo().catch(() => {
        /* Falhou o download: o observer tenta de novo na montagem, e até
           lá o esqueleto segue no lugar do globo. */
      });
    });
    return () => {
      if (typeof id === "number") window.clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Dois observers com margens diferentes de propósito: o de montagem
       dispara cedo (600px antes) para a malha já estar construída quando
       a seção chegar; o de atividade usa margem zero, porque render fora
       da tela é desperdício puro. */
    const montagem = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMontado(true);
          montagem.disconnect();
        }
      },
      { rootMargin: "600px" }
    );

    const atividade = new IntersectionObserver(
      ([entry]) => setNaTela(entry.isIntersecting),
      { rootMargin: "100px" }
    );

    montagem.observe(el);
    atividade.observe(el);
    return () => {
      montagem.disconnect();
      atividade.disconnect();
    };
  }, []);

  return (
    <section id="metas" className="border-t border-bone/10 py-32 sm:py-44">
      <div className="shell shell-narrow flex flex-col items-center gap-14">
        <div className="section-head">
          <span className="mono-label">{textoGlobo.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {textoGlobo.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
            {textoGlobo.body}
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {textoGlobo.destinations.map((d) => (
              <li key={d.label} className="mono-label">
                {d.label}
              </li>
            ))}
          </ul>
        </div>

        <div ref={ref} className="relative aspect-square w-full max-w-[38rem]">
          {/* O globo é escuro e some contra o fundo; um halo atrás dá
              volume e separa a esfera da página. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[15%] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-plasma) 0%, transparent 70%)",
            }}
          />
          {/* Esqueleto: o meridiano pontilhado gira no lugar do globo
              enquanto ele não está pronto. Fica ATRÁS do canvas, então
              não precisa ser removido quando o globo aparece. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[8%] animate-[globo-espera_18s_linear_infinite] rounded-full border border-dashed border-plasma/20"
          />

          {montado && (
            <World globeConfig={globeConfig} data={arcs} active={naTela} />
          )}
        </div>
      </div>
    </section>
  );
}
