"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hero, site } from "@/lib/content";

/* ============================================================
   HERO — o vídeo roda sozinho, em loop.

   O `requestVideoFrameCallback` alimenta a barra de progresso: ele
   dispara uma vez por quadro efetivamente apresentado, então a barra
   acompanha o vídeo de verdade em vez de um timer paralelo que
   dessincroniza a cada engasgo de decodificação.
   ============================================================ */

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [ready, setReady] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);

  /* ---------- entrada do título ---------- */
  useGSAP(
    () => {
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro.from(".hero-line-inner", {
        yPercent: 115,
        duration: 1.4,
        stagger: 0.11,
        delay: 0.25,
      });
      intro.from(
        ".hero-fade",
        { opacity: 0, y: 22, duration: 1, stagger: 0.1 },
        "-=0.9"
      );
    },
    { scope: sectionRef }
  );

  /* ---------- reprodução em loop ----------
     Com a barra de progresso removida junto do "role para revelar", o
     `requestVideoFrameCallback` que a alimentava saiu também: era um
     callback por quadro apresentado, rodando o tempo todo, para mover um
     elemento que não existe mais. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setReady(true);
    if (video.readyState >= 2) onReady();
    else video.addEventListener("loadeddata", onReady, { once: true });

    /* Autoplay só é concedido a vídeo mudo; se ainda assim for negado
       (economia de bateria, política do navegador), o catch evita uma
       promise rejeitada solta e o pôster estático segue valendo. */
    video.play().catch(() => {});

    return () => video.removeEventListener("loadeddata", onReady);
  }, []);

  /* ---------- rodízio das legendas ---------- */
  useEffect(() => {
    if (hero.captions.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(
      () => setCaptionIndex((i) => (i + 1) % hero.captions.length),
      4200
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-svh w-full overflow-hidden">
      {/* ---------- vídeo ---------- */}
      {/* O basePath do Next não alcança `src` escrito à mão — só o que
          passa por next/link, next/image e pelos chunks. Publicado em
          uma subpasta, um "/video/hero.mp4" cru apontaria para a raiz
          do domínio e daria 404. */}
      <video
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/video/hero.mp4`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Escurecimento em camadas: o vídeo é claro demais para texto
          branco por cima, mas um overlay chapado mata o contraste da
          imagem. Um radial + um linear preservam o centro e afundam
          só as bordas, onde o texto realmente cai. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 25%, rgba(8,9,10,0.55) 70%, rgba(8,9,10,0.9) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, var(--color-ink) 4%, transparent 100%)",
        }}
      />

      {/* ---------- conteúdo ---------- */}
      <div className="shell relative z-10 flex h-full flex-col justify-between py-8">
        {/* O canto esquerdo pertence à logo do nav (fixa por cima);
            repetir um rótulo ali empilharia dois textos no mesmo ponto. */}
        <header className="flex items-start justify-end pt-[max(1rem,env(safe-area-inset-top))]">
          <span className="mono-label hero-fade text-right">
            {site.location}
            <br />
            {site.year}
          </span>
        </header>

        {/* A personagem do vídeo ocupa a metade direita do quadro, então
            o título fica preso à esquerda e não passa de ~52% da largura
            em telas grandes — senão as letras caem em cima do rosto. */}
        <h1 className="display max-w-[min(100%,15ch)] text-[clamp(2.9rem,9.2vw,8.2rem)] -ml-[0.05em] lg:max-w-[58%]">
          {hero.titleLines.map((line, i) => (
            <span key={line} className="line-mask">
              <span className="line-inner hero-line-inner block">
                {line}
                {i === hero.titleLines.length - 1 && (
                  <span
                    className="editorial ml-[0.15em] text-plasma"
                    style={{ fontSize: "0.62em" }}
                  >
                    .
                  </span>
                )}
              </span>
            </span>
          ))}
        </h1>

        {/* O canto direito tinha o "role para revelar" com a barra de
            progresso do vídeo ao lado. Saiu: instrução de scroll é
            enfeite — quem chega numa página já sabe rolar — e a barra
            servia a ela. Sobrou a legenda, que é conteúdo. */}
        <div className="flex items-end pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="hero-fade max-w-xs">
            {/* A que sai e a que entra ocupam a mesma célula do grid
                para o bloco não mudar de altura no meio da transição. */}
            <div className="grid">
              {hero.captions.map((c, i) => (
                <p
                  key={c.text}
                  className="editorial col-start-1 row-start-1 text-lg leading-snug transition-all duration-700"
                  style={{
                    opacity: i === captionIndex ? 1 : 0,
                    transform:
                      i === captionIndex ? "translateY(0)" : "translateY(0.6rem)",
                  }}
                  aria-hidden={i !== captionIndex}
                >
                  {c.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
