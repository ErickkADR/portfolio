"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/* ============================================================
   PRÉVIA DO FEITO — a capa do card, que vira vídeo.

   Pedido do Erick (26/11/2026): todo card dos feitos com imagem, e os
   vídeos vistos DENTRO do site, não numa tela à parte. Aqui o card
   mostra a capa (um quadro do meio do vídeo) e, quando a pessoa olha
   para ele, o próprio vídeo começa a tocar, mudo e em loop, no lugar.

   Quando toca:
   - com mouse: no hover. O carrossel já pausa no hover, então o card
     fica parado enquanto o vídeo roda;
   - no toque: quando o card está quase inteiro na tela (60%). Sem hover,
     é o único sinal de que a pessoa está olhando para ele.

   `preload="none"` até a primeira vez: são 22 cards e 79 MB de vídeo.
   Só baixa o que alguém de fato olhou.
   ============================================================ */

type Props = {
  capa: string | null;
  video: string | null;
  title: string;
  onOpen: () => void;
};

export default function PreviaFeito({ capa, video, title, onOpen }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ativo, setAtivo] = useState(false);
  const [pronto, setPronto] = useState(false);

  /* Toque: toca quando o card está visível. */
  useEffect(() => {
    const el = ref.current;
    if (!el || !video) return;
    if (window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => setAtivo(e.intersectionRatio >= 0.6),
      { threshold: [0, 0.6, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (ativo) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [ativo]);

  if (!capa && !video) return null;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseEnter={() => video && setAtivo(true)}
      onMouseLeave={() => setAtivo(false)}
      className="group/previa relative z-20 block aspect-[16/9] w-full overflow-hidden bg-ink-3"
      aria-label={title}
    >
      {capa && (
        <img
          src={asset(capa)}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      )}

      {video && (ativo || pronto) && (
        <video
          ref={videoRef}
          src={asset(video)}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onPlaying={() => setPronto(true)}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${
            ativo && pronto ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-2/80 via-transparent to-transparent"
      />

      {video && (
        <span
          aria-hidden="true"
          className={`absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full border border-bone/25 bg-ink/70 backdrop-blur-md transition-opacity duration-500 ${
            ativo ? "opacity-0" : "opacity-100"
          }`}
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-bone">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
      )}
    </button>
  );
}
