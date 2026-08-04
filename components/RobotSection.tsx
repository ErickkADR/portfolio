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

    /* Não há setZoom aqui, e é de propósito.
       O `app.setZoom()` que existia antes não mudava nada: medindo o
       robô no canvas, ele fica em ~138px de largura com zoom 2.4, 4.8,
       10 ou 20 — o runtime reenquadra a cena no resize e descarta o
       valor. Quem controla o tamanho é a escala CSS no canvas (veja o
       comentário lá embaixo). */

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
      className="relative overflow-hidden border-t border-bone/10 py-28 sm:py-36"
    >
      {/* ---------- texto ---------- */}
      {/* Empilhado (texto em cima, palco embaixo) em vez das duas colunas
          de antes: lado a lado, o robô ficava limitado a ~2/3 da largura
          e preso na altura da coluna de texto. Sozinho numa faixa larga
          ele cabe no dobro do tamanho. */}
      <div className="shell shell-narrow">
        <div className="section-head relative z-10">
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
            className="mx-auto mt-6 max-w-md text-bone-dim"
          >
            {robot.body}
          </RevealText>

          <p className="mono-label mt-8 flex items-center justify-center gap-3">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-plasma"
              aria-hidden="true"
            />
            {robot.hint}
          </p>
        </div>
      </div>

      {/* ---------- palco 3D ---------- */}
      <div className="shell mt-4">
        <div
          ref={stageRef}
          className="relative mx-auto aspect-square w-full max-w-[88rem] sm:aspect-[16/9] lg:min-h-[40rem]"
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
              /* Tamanho e posição do robô saem daqui.

                 O Spline normaliza o cursor com
                 `(clientX - rect.left) / rect.width`, tudo do mesmo
                 getBoundingClientRect — que reflete transform. Como
                 `left` e `width` escalam juntos, uma escala UNIFORME
                 preserva o follow tão bem quanto um translate. (Não vale
                 para escala não-uniforme, que descola os dois eixos.)

                 A escala é 2,25 e não 2 porque o palco também mudou de
                 proporção: medida na tela, a cabeça do robô ia de 130px
                 (site publicado) para 230px com escala 2 — 1,8x. Com
                 2,25 ela chega aos 260px, que é o dobro pedido.

                 O translate vem DEPOIS da escala (é assim que as
                 propriedades individuais compõem: translate, rotate,
                 scale, com o translate por fora), e a porcentagem se
                 refere à caixa sem escala. Ou seja: os 13% de antes
                 deixaram de compensar o desvio do robô, que dobrou
                 junto com a cena. Daí os 25% — medidos na tela, não
                 chutados.

                 A escala CSS não custa GPU: o buffer de render sai do
                 tamanho de layout do canvas, que o transform não muda.
                 O preço é a imagem ser ampliada 2x, um pouco mais macia
                 nas bordas. */
              className="h-full w-full translate-x-[24%] translate-y-[8%] scale-[2.25] [filter:brightness(1.35)_saturate(1.15)_contrast(1.05)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
