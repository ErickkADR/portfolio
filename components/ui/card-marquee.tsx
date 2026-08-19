"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   ESTEIRA DE CARDS — uma fileira deslizando sozinha.

   Adaptado do componente de marquee de cards que o Erick trouxe. O que
   mudou, e por quê:

   1. TEMA ESCURO. O original é claro: `bg-white` no card e
      `from-white` nos degradês de borda. Aqui os dois viraram token do
      site (`bg-ink-2`, `from-ink`), senão a esteira entra como um bloco
      branco no meio de uma página preta.

   2. SEM A FONTE POPPINS. O original injeta um `@import` do Google Fonts
      e aplica `font-family` no seletor `*`, o que trocaria a tipografia
      do site INTEIRO por Poppins — as três famílias do projeto vêm do
      `next/font` e são parte da identidade.

   3. A ANIMAÇÃO MORA NO globals.css, não num `<style>` dentro do JSX.
      Duas fileiras montariam a mesma regra duas vezes, e o projeto já
      guarda os keyframes lá.

   4. `mx-3` NO CARD, e não `gap` na trilha. O laço é um
      `translateX(-50%)` sobre a lista duplicada, e isso só fecha sem
      salto se o espaçamento fizer parte da largura de cada item: um
      `gap` acrescenta um vão a mais entre as duas metades e a emenda
      aparece a cada volta.

   5. PAUSA NO HOVER e respeito a `prefers-reduced-motion` (ver as regras
      da `.esteira` no globals.css). Uma esteira que não para é hostil
      para quem está tentando LER o cartão — e aqui o conteúdo é
      depoimento, não enfeite.

   6. UMA fileira, sempre. O original tem duas, em sentidos opostos; ele
      preferiu a única — mais calma, e sem o mesmo cartão aparecendo em
      duas alturas da tela.
   ============================================================ */

export type CardMarqueeItem = {
  id: string;
  /* Renderizado como está: quem chama monta o cartão. Assim a esteira não
     precisa saber nada sobre depoimento, projeto ou o que vier depois. */
  node: React.ReactNode;
};

function Fileira({
  itens,
  segundos = 34,
}: {
  itens: CardMarqueeItem[];
  segundos?: number;
}) {
  /* A lista duplicada é o que permite o laço: quando a trilha andou
     metade da própria largura, o segundo conjunto está exatamente onde o
     primeiro começou. */
  const dobrado = useMemo(() => [...itens, ...itens], [itens]);

  return (
    <div className="esteira relative isolate w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-ink to-transparent sm:w-28"
      />

      <div
        className="esteira-trilha flex min-w-[200%] py-3"
        style={{ ["--esteira-dur" as string]: `${segundos}s` }}
      >
        {dobrado.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            /* LARGO E BAIXO. Começou em 19rem e ele pediu o inverso do
               que estava saindo: mais horizontal, menos vertical. Alargar
               é o que encurta — o mesmo texto ocupa menos linhas. Os 20rem
               do celular são o teto que caiba numa tela de 390px sem o
               cartão nascer cortado. */
            className="mx-3 w-[20rem] shrink-0 sm:w-[27rem]"
            /* A segunda metade é cópia visual: quem usa leitor de tela
               ouviria cada depoimento duas vezes. */
            aria-hidden={i >= itens.length ? "true" : undefined}
          >
            {item.node}
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-ink to-transparent sm:w-28"
      />
    </div>
  );
}

export default function CardMarquee({
  itens,
  className,
  segundos = 34,
}: {
  itens: CardMarqueeItem[];
  className?: string;
  segundos?: number;
}) {
  /* UMA FILEIRA, a pedido dele. A versão anterior dividia em duas em
     sentidos opostos quando havia seis itens ou mais (é o formato do
     componente de origem); com sete depoimentos ele preferiu a fileira
     única, que é mais calma e não repete o mesmo cartão em duas alturas.
     A variante de duas fileiras está no histórico do git. */
  return (
    <div className={cn("flex flex-col", className)}>
      <Fileira itens={itens} segundos={segundos} />
    </div>
  );
}
