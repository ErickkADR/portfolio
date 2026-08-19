"use client";

import { useRef } from "react";
import { useConteudo } from "@/lib/idioma";
import { asset } from "@/lib/asset";
import RevealText from "./RevealText";
import CardMarquee, { type CardMarqueeItem } from "./ui/card-marquee";

/* ============================================================
   RECOMENDAÇÕES — o que outras pessoas dizem, numa esteira.

   Era um carrossel de arrastar; virou esteira deslizante a pedido dele.
   A esteira pausa no hover, então continua possível ler o cartão inteiro.

   ---- O AVISO DE RASCUNHO SAIU DO CARTÃO (19/08/2026) ----
   Os cinco textos de hoje foram escritos por mim, não pelas pessoas. O
   cartão trazia um selo âmbar dizendo isso; ele pediu para remover, e
   isso é decisão dele. A flag `rascunho: true` CONTINUA em cada item no
   content.ts, agora só como registro de quem ainda não aprovou o texto —
   ela não é mais renderizada.

   Consequência, para quem mexer nisso depois: do jeito que está, o site
   apresenta os cinco como palavra das próprias pessoas. Antes de
   publicar, cada uma precisa ter lido e aprovado (ou reescrito) o que
   está no nome dela. Ver a nota longa em lib/content.ts.

   O selo azul de verificado aparece em todos: no formato de post do X
   ele é parte do desenho e significa "perfil verificado", não "citação
   conferida", e as cinco pessoas são reais.

   Com a lista vazia a seção não aparece — nada quebra.
   ============================================================ */

function Verificado({ rotuloVerificado }: { rotuloVerificado: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-label={rotuloVerificado}
      role="img"
      className="h-[15px] w-[15px] shrink-0"
    >
      {/* Azul do X (#1d9bf0), com o tique em branco por dentro. */}
      <polygon
        fill="#1d9bf0"
        points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"
      />
      <polygon
        fill="#fff"
        points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"
      />
    </svg>
  );
}

export default function Recomendacoes() {
  const { recomendacoes, ui } = useConteudo();
  const ref = useRef<HTMLElement>(null);

  if (recomendacoes.items.length === 0) return null;

  const itens: CardMarqueeItem[] = recomendacoes.items.map((r) => ({
    id: r.name,
    node: (
      /* CARTÃO BRANCO, no formato de um post do X. Ele pediu assim, e
         sobre o preto da página o contraste faz cada depoimento ler como
         algo publicado em outro lugar, e não como caixa de texto do site.

         Por isso nenhuma classe daqui usa os tokens do tema: `mono-label`,
         `text-bone-dim` e afins pintam de cor clara e desapareceriam no
         branco. As cores são explícitas, na escala slate. A FONTE continua
         a do site (Archivo) — o componente original importava Poppins e
         aplicava no seletor `*`, o que trocaria a tipografia da página
         inteira. */
      <article className="flex h-full flex-col rounded-2xl bg-white px-6 py-5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-translate-y-0.5">
        {/* ---------- cabeça do post ---------- */}
        <div className="flex gap-3">
          {r.avatar ? (
            <img
              src={asset(`/recomendacoes/${r.avatar}.jpg`)}
              alt=""
              width={192}
              height={192}
              loading="lazy"
              decoding="async"
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
          ) : (
            /* Sem foto, as iniciais no mesmo círculo: o cartão mantém o
               alinhamento em vez de abrir um buraco à esquerda. */
            <span
              aria-hidden="true"
              className="display grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-200 text-sm text-slate-600"
            >
              {r.name
                .split(" ")
                .slice(0, 2)
                .map((p) => p[0])
                .join("")
                .toUpperCase()}
            </span>
          )}

          <div className="min-w-0">
            <p className="flex items-center gap-1 font-medium leading-snug text-slate-900">
              {r.href ? (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="truncate hover:underline"
                >
                  {r.name}
                </a>
              ) : (
                <span className="truncate">{r.name}</span>
              )}
              <Verificado rotuloVerificado={ui.perfilVerificado} />
            </p>
            {/* O lugar do @handle no formato original: aqui vai o cargo
                como a própria pessoa se apresenta. */}
            <p className="mt-0.5 text-xs leading-snug text-slate-500">
              {r.headline ?? [r.role, r.org].filter(Boolean).join(" · ")}
            </p>
          </div>
        </div>

        <blockquote className="mt-3.5 text-[0.9375rem] leading-relaxed text-slate-700">
          {r.quote}
        </blockquote>
      </article>
    ),
  }));

  return (
    <section
      ref={ref}
      id="recomendacoes"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{recomendacoes.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {recomendacoes.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {recomendacoes.intro}
          </p>
        </div>
      </div>

      {/* A esteira sangra além da coluna de leitura de propósito: é ela que
          faz o movimento parecer contínuo, e o degradê nas duas pontas dá o
          corte em vez de a borda do `.shell`. */}
      <CardMarquee itens={itens} className="mt-16" />
    </section>
  );
}
