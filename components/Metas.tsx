"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { globe } from "@/lib/content";
import RevealText from "./RevealText";

/* Meta profissional — o globo com os arcos saindo de São Paulo.

   Antes vivia espremido no meio da seção "Sobre", com o rótulo
   "Alcance". Virou seção própria perto do fim: é onde o site sai do que
   já foi feito e passa a falar do que vem — o lugar certo para vir logo
   antes do contato.

   three + three-globe + fiber + drei somam alguns megabytes, então o
   globo é carregado sob demanda (dynamic + ssr:false) e só quando a
   seção se aproxima da viewport. */
const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  { ssr: false, loading: () => null }
);

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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="metas" className="border-t border-bone/10 py-32 sm:py-44">
      <div className="shell shell-narrow flex flex-col items-center gap-14">
        <div className="section-head">
          <span className="mono-label">{globe.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {globe.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
            {globe.body}
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {globe.destinations.map((d) => (
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
          {visible && <World globeConfig={globeConfig} data={arcs} />}
        </div>
      </div>
    </section>
  );
}
