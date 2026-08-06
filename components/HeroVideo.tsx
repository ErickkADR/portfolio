"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hero, site } from "@/lib/content";
import { getLogo } from "@/lib/logos";

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
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-svh w-full overflow-hidden bg-ink text-bone"
    >
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
        {/* A barra fixa ocupa os dois cantos superiores — logo à
            esquerda, botão de tema à direita. Qualquer coisa colocada
            aqui em cima cai embaixo dela; a localização foi para o pé
            do hero, ao lado da legenda. */}
        <div aria-hidden="true" />

        {/* A personagem do vídeo ocupa a metade direita do quadro, então
            o bloco fica preso à esquerda e não passa de ~58% da largura
            em telas grandes — senão as letras caem em cima do rosto.

            No celular a largura é cheia. O `18ch` que estava aqui media
            contra a fonte do PAI (~16px), não contra a do h1: dava
            ~157px de caixa para um nome desenhado a 46px, e como cada
            linha do título é um `.line-mask` com `overflow: hidden`, o
            "DANTAS" saía cortado no meio do S em qualquer tela abaixo de
            1024px. A largura de leitura de quem manda aqui é o `.shell`. */}
        <div className="w-full lg:max-w-[58%]">
          <p className="hero-fade mono-label mb-3">{hero.greeting}</p>

          {/* O nome em caixa alta e apertado: é a única coisa nesta tela
              que precisa ser lida de longe. */}
          <h1 className="display text-[clamp(2.9rem,9.4vw,8.4rem)] uppercase -ml-[0.05em] leading-[0.86]">
            {hero.nameLines.map((line) => (
              <span key={line} className="line-mask">
                <span className="line-inner hero-line-inner block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="display hero-fade mt-3 text-[clamp(1.05rem,3vw,2.1rem)] uppercase tracking-tight text-plasma">
            {hero.role}
          </p>

          {/* Fila de logos: mostra a stack antes de qualquer texto sobre
              ela. Só entram as chaves que existem no mapa. */}
          <ul className="hero-fade mt-7 flex flex-wrap items-center gap-2.5">
            {hero.techIcons.map((key) => {
              const logo = getLogo(key);
              if (!logo) return null;
              return (
                <li key={key}>
                  <span
                    title={key}
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-bone/12 bg-ink-2/70 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 [&>*]:h-5 [&>*]:w-5"
                    style={{ color: logo.color }}
                  >
                    {logo.node}
                  </span>
                </li>
              );
            })}
          </ul>
          {/* A fila acima é decorativa; a lista real e nomeada das
              tecnologias é a seção Stack. */}
          <span className="sr-only">
            Tecnologias: {hero.techIcons.join(", ")}
          </span>
        </div>

        {/* O canto direito tinha o "role para revelar" com a barra de
            progresso do vídeo ao lado. Saiu: instrução de scroll é
            enfeite — quem chega numa página já sabe rolar — e a barra
            servia a ela. Sobrou a legenda, que é conteúdo. */}
        <div className="flex items-end justify-between gap-8 pb-[max(1rem,env(safe-area-inset-bottom))]">
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

          <span className="mono-label hero-fade hidden text-right sm:block">
            {site.location}
            <br />
            {site.year}
          </span>
        </div>
      </div>
    </section>
  );
}
