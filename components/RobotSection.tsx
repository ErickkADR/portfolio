"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { robot } from "@/lib/content";
import RevealText from "./RevealText";
import SplineScene, { type SplineApp } from "./SplineScene";

export default function RobotSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Estável entre renders: o SplineScene tem `onLoad` nas dependências
  // do efeito que carrega a cena, e uma função nova a cada render faria
  // a cena recarregar do zero.
  const handleLoad = useCallback((app: SplineApp) => {
    /* O "Plane" é o chão da cena — o losango escuro sob o robô, com a
       poça de luz roxa projetada nele. Escondê-lo deixa só o robô sobre
       o cubo, flutuando no fundo da página. Os nomes vêm da cena
       original (em espanhol: Cuerpo, Cabeza, Ojos); "Plane" e "Cube"
       são os que o Spline gera por padrão. */
    const plane = app.findObjectByName("Plane");
    if (plane) plane.visible = false;

    // Zoom da câmera em vez de escala CSS: escalar o canvas por CSS
    // distorceria o mapeamento do cursor que a cena usa para seguir
    // o mouse. setZoom mexe na câmera e preserva a interação.
    app.setZoom(2.4);

    setLoaded(true);
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      // A cena entra escalando de leve enquanto a seção sobe: dá a
      // impressão de que o robô se aproxima em vez de simplesmente
      // aparecer no lugar.
      gsap.fromTo(
        stageRef.current,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "top 25%",
            scrub: 0.8,
          },
        }
      );

      // Halo pulsando atrás da cena, bem devagar, só para o fundo não
      // ficar morto enquanto ninguém interage.
      // Discreto de propósito: o halo é ambiente atrás do robô, não um
      // holofote. Forte demais ele lava o contraste da cena.
      gsap.to(".robot-halo", {
        scale: 1.1,
        opacity: 0.28,
        duration: 4.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="robo"
      className="relative overflow-hidden border-t border-bone/10 py-24 sm:py-32"
    >
      <div className="shell grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:items-center lg:gap-10">
        {/* ---------- texto ---------- */}
        <div className="relative z-10">
          <span className="mono-label">{robot.label}</span>

          <RevealText
            as="h2"
            className="display mt-5 text-[clamp(2.6rem,7vw,5.5rem)]"
          >
            {robot.title}
          </RevealText>

          <RevealText
            as="p"
            split="words"
            stagger={0.02}
            className="mt-6 max-w-md text-bone-dim"
          >
            {robot.body}
          </RevealText>

          <p className="mono-label mt-8 flex items-center gap-3">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-plasma"
              aria-hidden="true"
            />
            {robot.hint}
          </p>
        </div>

        {/* ---------- palco 3D ---------- */}
        <div
          ref={stageRef}
          className="relative aspect-square w-full sm:aspect-[4/3] lg:aspect-[5/4] lg:min-h-[38rem]"
        >
          <div
            className="robot-halo pointer-events-none absolute inset-[22%] rounded-full opacity-15 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--color-plasma) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />

          {/* Placeholder enquanto o WebGL sobe: a cena leva alguns
              segundos e um buraco vazio parece bug. */}
          {!loaded && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border border-bone/15 border-t-plasma" />
                <span className="mono-label">Carregando cena 3D</span>
              </div>
            </div>
          )}

          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* A poça de luz roxa era projetada no plano que escondemos,
                e com ele foi embora boa parte do que iluminava o robô.
                Um realce no canvas devolve a leitura sem precisar mexer
                nas luzes da cena (que o runtime não expõe). */}
            <SplineScene
              scene={robot.sceneUrl}
              onLoad={handleLoad}
              /* A cena posiciona o robô à esquerda do quadro, deixando
                 metade do palco vazia. Um translate puro recentraliza
                 sem quebrar o follow: o Spline mapeia o cursor pelo
                 getBoundingClientRect do canvas, que já reflete a
                 translação. Escala, essa sim, desalinharia. */
              className="h-full w-full translate-x-[13%] [filter:brightness(1.35)_saturate(1.15)_contrast(1.05)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
