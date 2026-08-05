"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";
import type { MediaFile } from "@/lib/media";
import MediaViewer from "./MediaViewer";
import FadeIn from "./FadeIn";

/* Galeria do material de uma etapa da carreira. Cliente porque abre o
   visualizador em tela cheia; a página em volta continua servida como
   HTML estático. */

type Props = {
  files: MediaFile[];
  title: string;
  emptyLabel: string;
};

export default function CareerMedia({ files, title, emptyLabel }: Props) {
  const [index, setIndex] = useState<number | null>(null);

  if (files.length === 0) {
    return (
      <p className="mx-auto max-w-xl text-center leading-relaxed text-bone-dim">
        {emptyLabel}
      </p>
    );
  }

  return (
    <>
      <FadeIn
        className="grid gap-6 sm:grid-cols-2"
        selector="button, a"
        stagger={0.08}
      >
        {files.map((file, i) =>
          file.kind === "pdf" ? (
            <a
              key={file.src}
              href={asset(file.src)}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between gap-4 rounded-xl border border-bone/12 bg-ink-2 p-7 transition-colors duration-500 hover:border-plasma"
            >
              <span className="min-w-0">
                <span className="mono-label block">Documento</span>
                <span className="mt-2 block truncate text-lg">{file.name}</span>
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-bone-dim transition-colors duration-500 group-hover:text-plasma"
              >
                ↗
              </span>
            </a>
          ) : (
            <button
              key={file.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block aspect-[16/10] overflow-hidden rounded-xl border border-bone/12 bg-ink-2"
              aria-label={`Ver ${file.name}`}
            >
              {file.kind === "image" ? (
                <img
                  src={asset(file.src)}
                  alt={`${title} — ${file.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              ) : (
                /* Vídeo entra como <video> sem controles só para render
                   do primeiro quadro — a reprodução acontece no
                   visualizador, em tela cheia. `preload="metadata"`
                   busca o quadro sem baixar o arquivo inteiro. */
                <>
                  <video
                    src={asset(file.src)}
                    preload="metadata"
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink/40">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-bone/30 backdrop-blur-md transition-colors duration-500 group-hover:border-plasma">
                      <span aria-hidden="true" className="ml-1">
                        ▶
                      </span>
                    </span>
                  </span>
                </>
              )}
            </button>
          )
        )}
      </FadeIn>

      {index !== null && (
        <MediaViewer
          files={files}
          index={index}
          title={title}
          onClose={() => setIndex(null)}
          onIndex={setIndex}
        />
      )}
    </>
  );
}
