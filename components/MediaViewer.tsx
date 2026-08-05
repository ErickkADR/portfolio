"use client";

import { useCallback, useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import type { MediaFile } from "@/lib/media";

/* Visualizador em tela cheia para o material de comprovação.

   Print, PDF e vídeo no mesmo lugar porque é assim que a prova aparece
   na vida real: um projeto tem a tela, o outro tem o PDF assinado, o
   terceiro só existe em vídeo. Cada tipo é renderizado do jeito que
   funciona — imagem inline, vídeo com controles, PDF como link, já que
   embutir PDF em iframe quebra no celular. */

type Props = {
  files: MediaFile[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  title: string;
};

export default function MediaViewer({
  files,
  index,
  onClose,
  onIndex,
  title,
}: Props) {
  const [carregando, setCarregando] = useState(true);
  const file = files[index];

  const anterior = useCallback(
    () => onIndex((index - 1 + files.length) % files.length),
    [index, files.length, onIndex]
  );
  const proximo = useCallback(
    () => onIndex((index + 1) % files.length),
    [index, files.length, onIndex]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") proximo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, anterior, proximo]);

  useEffect(() => setCarregando(true), [index]);

  if (!file) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Material de ${title}`}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex flex-col bg-ink/95 backdrop-blur-sm"
    >
      <header className="flex shrink-0 items-center justify-between gap-4 px-6 py-5">
        <p className="mono-label truncate">
          {title} · {index + 1}/{files.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mono-label shrink-0 rounded-full border border-bone/20 px-4 py-2 transition-colors hover:border-plasma hover:text-plasma"
        >
          Fechar ✕
        </button>
      </header>

      <div
        className="flex min-h-0 flex-1 items-center justify-center px-6 pb-6"
        /* O clique no conteúdo não fecha: quem abriu quer olhar. Fechar
           no primeiro clique dentro seria hostil. */
        onClick={(e) => e.stopPropagation()}
      >
        {file.kind === "image" && (
          <img
            src={asset(file.src)}
            alt={`${title} — ${file.name}`}
            onLoad={() => setCarregando(false)}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        )}

        {file.kind === "video" && (
          <video
            src={asset(file.src)}
            controls
            playsInline
            onLoadedData={() => setCarregando(false)}
            className="max-h-full max-w-full rounded-lg"
          />
        )}

        {file.kind === "pdf" && (
          /* PDF embutido em iframe é loteria no celular — vários
             navegadores abrem download em vez de renderizar. Um link
             explícito sempre funciona. */
          <a
            href={asset(file.src)}
            target="_blank"
            rel="noreferrer noopener"
            className="btn"
          >
            Abrir {file.name}.pdf
            <span aria-hidden="true">↗</span>
          </a>
        )}

        {carregando && file.kind !== "pdf" && (
          <div className="pointer-events-none absolute grid place-items-center">
            <div className="h-10 w-10 animate-spin rounded-full border border-bone/15 border-t-plasma" />
          </div>
        )}
      </div>

      {files.length > 1 && (
        <footer
          className="flex shrink-0 items-center justify-center gap-3 px-6 pb-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={anterior}
            aria-label="Material anterior"
            className="mono-label rounded-full border border-bone/20 px-5 py-2 transition-colors hover:border-plasma hover:text-plasma"
          >
            ←
          </button>
          <button
            type="button"
            onClick={proximo}
            aria-label="Próximo material"
            className="mono-label rounded-full border border-bone/20 px-5 py-2 transition-colors hover:border-plasma hover:text-plasma"
          >
            →
          </button>
        </footer>
      )}
    </div>
  );
}
