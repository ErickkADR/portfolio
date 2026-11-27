"use client";

import { useConteudo } from "@/lib/idioma";
import RevealText from "./RevealText";
import StackTiles from "./StackTiles";

/* ============================================================
   STACK — parede de logos que reage ao ponteiro.

   O ladrilho sob o cursor cresce e sobe; os VIZINHOS crescem um pouco,
   como se a parede afundasse ao redor do dedo. É o que dá a sensação de
   relevo: sem os vizinhos o ladrilho só incha sozinho, e o efeito lê
   como zoom em vez de profundidade.

   ---- Por que os vizinhos são achados por GEOMETRIA ----
   A implementação óbvia é aritmética de índice numa grade de N colunas:
   i-1, i+1, i-N, i+N. Só que aqui as linhas são `flex-wrap` centralizado,
   e não uma grade fixa — a última linha de cada grupo fica centralizada
   sozinha em vez de encostada à esquerda com buracos à direita. Com o
   número de colunas mudando por breakpoint e a última linha deslocada,
   a conta por índice erra justamente nas bordas. Medir a distância entre
   os retângulos acerta em qualquer arranjo, e roda uma vez por hover —
   não por frame.

   ---- Uma parede, sem categorias ----
   Os cinco grupos saíram: obrigavam a percorrer cinco listas para
   responder "com o que ele trabalha". A ordem do content.ts ainda
   agrupa por afinidade, o que dá o ritmo sem cabeçalho nenhum. Com uma
   lista só, a vizinhança do relevo também melhora: antes o efeito
   parava na borda de cada grupo.

   ---- As logos ----
   PNG de verdade, com fundo transparente, lidos de `public/stack/` no
   build (ver lib/media.ts). Ícone de biblioteca é silhueta de uma cor só,
   e logo de produto tem forma E cor, e a cor é metade do reconhecimento.

   ITEM SEM PNG NÃO É RENDERIZADO. Antes ele caía num monograma com as
   iniciais, e numa parede em que todo o resto é logo colorida aquilo lia
   como ladrilho vazio. Para acrescentar uma ferramenta: largue
   `public/stack/<slug>.png` (slug = nome em minúsculas com hífen) e
   ponha o nome na lista do content.ts. Faltando o arquivo, o nome
   simplesmente não aparece.
   ============================================================ */

type Props = {
  /* slug → caminho em public/. Montado no Server Component da página. */
  logos: Record<string, string>;
};

export default function Stack({ logos }: Props) {
  const { stack } = useConteudo();

  return (
    <section
      id="stack"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{stack.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {stack.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {stack.intro}
          </p>
        </div>

        {/* Os ladrilhos (relevo no hover, entrada em cascata, tooltip)
            moram em StackTiles.tsx desde 27/11/2026: a página de cada
            projeto usa o mesmo componente no topo. */}
        <StackTiles items={stack.items} logos={logos} className="stack-wall mt-16" />

        {/* A barra com a distribuição de linguagens dos repositórios
            públicos saiu daqui: 57% de HTML descreve o peso dos arquivos
            no GitHub, não a competência de quem escreveu — e num
            portfólio esse número trabalha contra. As logos já dizem com
            o que ele constrói. */}
      </div>
    </section>
  );
}
