"use client";

import { useEffect } from "react";
import type { Feito } from "@/lib/content";
import { useConteudo } from "@/lib/idioma";

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
  /* Quantos arquivos de comprovação existem. 0 esconde o botão. */
  arquivos: number;
  onClose: () => void;
  onMaterial: () => void;
};

export default function FeitoDetalhe({
  feito,
  grupo,
  arquivos,
  onClose,
  onMaterial,
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

        <div className="mt-12">
          {arquivos > 0 ? (
            <button
              type="button"
              onClick={onMaterial}
              className="mono-label inline-flex items-center gap-3 rounded-full border border-bone/20 px-5 py-2.5 transition-colors duration-500 hover:border-plasma hover:text-plasma"
            >
              {feitos.mediaLabel}
              <span aria-hidden="true">
                {arquivos} {ui.itens[arquivos === 1 ? 0 : 1]}
              </span>
            </button>
          ) : (
            <span className="mono-label opacity-60">{feitos.mediaEmpty}</span>
          )}
        </div>
      </div>
    </div>
  );
}
