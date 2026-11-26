"use client";

import { useEffect } from "react";
import type { Feito } from "@/lib/content";
import { useConteudo } from "@/lib/idioma";
import { asset } from "@/lib/asset";
import type { MediaFile } from "@/lib/media";

/* Ficha de um feito, em tela cheia.

   Por que ela existe: o card do carrossel corta o texto no quarto verso
   (`line-clamp-4`) e o convite da seção é "aperte em cada item para saber
   mais". Sem isso, apertar o card não levava a nada quando o feito não
   tinha material anexado, e nenhum tem hoje: as pastas de
   `public/feitos/` estão vazias. O texto completo já estava escrito no
   content.ts, só não tinha onde aparecer.

   Segue o mesmo desenho do MediaViewer (véu escuro, clique fora fecha,
   Esc fecha) para as duas telas cheias da seção lerem como a mesma
   coisa. */

type Props = {
  feito: Feito;
  grupo: string;
  /* O material de comprovação. Vídeo toca AQUI, embutido na ficha (pedido
     do Erick, 26/11/2026: nada de player à parte); imagem abre ampliada
     no MediaViewer; PDF vira botão. */
  arquivos: MediaFile[];
  onClose: () => void;
  onImagem: (index: number) => void;
};

export default function FeitoDetalhe({
  feito,
  grupo,
  arquivos,
  onClose,
  onImagem,
}: Props) {
  const { feitos, ui } = useConteudo();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={feito.title}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-sm"
    >
      <header className="flex shrink-0 items-center justify-between gap-4 px-6 py-5">
        <p className="mono-label truncate text-plasma">{grupo}</p>
        <button
          type="button"
          onClick={onClose}
          className="mono-label shrink-0 rounded-full border border-bone/20 px-4 py-2 transition-colors hover:border-plasma hover:text-plasma"
        >
          {ui.fechar}
        </button>
      </header>

      <div
        /* O clique no conteúdo não fecha: quem abriu quer ler. */
        onClick={(e) => e.stopPropagation()}
        className="shell shell-narrow flex-1 pb-24 pt-6"
      >
        <h3 className="display text-[clamp(2rem,5vw,3.4rem)]">{feito.title}</h3>

        <p className="mt-8 max-w-2xl text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-bone-dim">
          {feito.body}
        </p>

        <ul className="mt-9 flex flex-wrap gap-2">
          {feito.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-bone/15 px-3 py-1.5 text-[0.6875rem] tracking-wide text-bone-dim"
            >
              {tag}
            </li>
          ))}
        </ul>

        {arquivos.length > 0 ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {arquivos.map((f, i) => (
              <figure
                key={f.src}
                className={`overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 ${
                  arquivos.length === 1 ? "lg:col-span-2" : ""
                }`}
              >
                {f.kind === "video" && (
                  <video
                    /* `#t=0.1`: sem ele o Safari mostra a caixa cinza em vez
                       do primeiro quadro até a pessoa dar play. */
                    src={`${asset(f.src)}#t=0.1`}
                    controls
                    playsInline
                    preload="metadata"
                    autoPlay={i === 0}
                    muted={i === 0}
                    className="block aspect-video w-full bg-ink"
                  />
                )}
                {f.kind === "image" && (
                  <button
                    type="button"
                    onClick={() => onImagem(i)}
                    className="block w-full"
                  >
                    <img
                      src={asset(f.src)}
                      alt={`${feito.title}: ${legenda(f.name)}`}
                      loading="lazy"
                      className="block aspect-video w-full object-cover"
                    />
                  </button>
                )}
                {f.kind === "pdf" && (
                  <a
                    href={asset(f.src)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn m-6"
                  >
                    {ui.documento} <span aria-hidden="true">↗</span>
                  </a>
                )}
                <figcaption className="mono-label px-5 py-4">
                  {legenda(f.name)}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="mono-label mt-12 opacity-60">{feitos.mediaEmpty}</p>
        )}
      </div>
    </div>
  );
}

/* "02-cortes-em-folhas" → "Cortes em folhas". O nome do arquivo já é a
   legenda: o prefixo numérico só ordena. */
function legenda(nome: string) {
  const t = nome.replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}
