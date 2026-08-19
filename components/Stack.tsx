"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useConteudo } from "@/lib/idioma";
import { slugify } from "@/lib/logos";
import { asset } from "@/lib/asset";
import RevealText from "./RevealText";

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

/* Um vizinho é quem está a menos de 1,4 ladrilho de distância nos dois
   eixos — pega os oito ao redor e ignora o resto da linha. */
const ALCANCE = 1.4;

export default function Stack({ logos }: Props) {
  const { stack } = useConteudo();
  const ref = useRef<HTMLElement>(null);

  /* Chave "grupo:índice". Uma só para a seção inteira: só existe um
     ponteiro, então só um ladrilho pode estar sob ele. */
  const [ativo, setAtivo] = useState<string | null>(null);
  const [vizinhos, setVizinhos] = useState<Set<string>>(new Set());

  const entrar = useCallback((e: React.PointerEvent<HTMLLIElement>, chave: string) => {
    const alvo = e.currentTarget;
    const lista = alvo.parentElement;
    if (!lista) return;

    const a = alvo.getBoundingClientRect();
    const perto = new Set<string>();

    for (const outro of lista.children) {
      if (outro === alvo) continue;
      const b = outro.getBoundingClientRect();
      const dx = Math.abs(b.left - a.left);
      const dy = Math.abs(b.top - a.top);
      if (dx <= a.width * ALCANCE && dy <= a.height * ALCANCE) {
        const k = (outro as HTMLElement).dataset.chave;
        if (k) perto.add(k);
      }
    }

    setAtivo(chave);
    setVizinhos(perto);
  }, []);

  const sair = useCallback(() => {
    setAtivo(null);
    setVizinhos(new Set());
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Um trigger só, porque agora é uma parede só. O stagger é curto
           (0.02) porque são 29 ladrilhos numa fileira contínua: com o
           0.035 de antes, o último entrava mais de um segundo depois do
           primeiro e a parede parecia se montar em câmera lenta. */
        const entrada = gsap.from(".stack-wall .stack-tile", {
          y: 22,
          scale: 0.85,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.02,
          /* Devolve o controle ao CSS: o transform do GSAP e o do hover
             disputam a mesma propriedade, e sem isso o primeiro ladrilho
             a receber o mouse dá um salto. */
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".stack-wall", start: "top 88%", once: true },
        });

        return () => entrada.kill();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
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

        {/* `perspective` no container e `translateZ` no ladrilho: é o
            que faz o que cresce vir na direção de quem olha, em vez de
            só ficar maior no plano. */}
        <ul
          onPointerLeave={sair}
          className="stack-wall mt-16 flex flex-wrap justify-center gap-2 [perspective:1200px]"
        >
          {stack.items.map((item, i) => {
            const chave = String(i);
            const logo = logos[slugify(item.name)];
            /* Sem PNG o item não entra na parede — ver a nota no topo. */
            if (!logo) return null;

            const grande = ativo === chave;
            const medio = !grande && vizinhos.has(chave);

            return (
              <li
                key={item.name}
                data-chave={chave}
                onPointerEnter={(e) => entrar(e, chave)}
                className={`stack-tile group/tile relative transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] ${
                  grande
                    ? "z-30 -translate-x-1.5 -translate-y-1.5 scale-[1.22]"
                    : medio
                      ? "z-20 -translate-x-0.5 -translate-y-0.5 scale-[1.07]"
                      : "z-10"
                }`}
              >
                {/* `button` e não `div`: o nome precisa aparecer também
                    no foco por teclado, e só um elemento focável recebe
                    :focus-visible. */}
                <button
                  type="button"
                  aria-label={item.name}
                  className={`grid h-16 w-16 place-items-center rounded-xl border bg-ink p-3 transition-[border-color,box-shadow] duration-300 sm:h-[4.5rem] sm:w-[4.5rem] ${
                    grande
                      ? "border-plasma/60 shadow-[0_0_28px_-6px_var(--color-plasma)]"
                      : "border-bone/12"
                  }`}
                  style={{ color: item.color ?? "var(--color-plasma-soft)" }}
                >
                  <img
                    src={asset(logo)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    /* `brightness-0 invert` achata o PNG para preto e
                       depois inverte: sai branco puro, preservando a
                       silhueta e a transparência. Ver a flag `branco`
                       no content.ts. */
                    className={`h-full w-full object-contain transition-opacity duration-300 ${
                      grande ? "opacity-100" : "opacity-70"
                    } ${item.branco ? "brightness-0 invert" : ""}`}
                  />
                </button>

                {/* Tooltip. `pointer-events-none` para ele nunca roubar o
                    hover do próprio ladrilho e piscar. */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -top-2 left-1/2 z-40 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-bone/15 bg-ink-3 px-2.5 py-1 text-[0.6875rem] tracking-wide opacity-0 shadow-lg transition-all duration-300 group-hover/tile:-translate-y-[calc(100%+0.25rem)] group-hover/tile:opacity-100 group-focus-within/tile:-translate-y-[calc(100%+0.25rem)] group-focus-within/tile:opacity-100"
                >
                  {item.name}
                </span>
              </li>
            );
          })}
        </ul>

        {/* A barra com a distribuição de linguagens dos repositórios
            públicos saiu daqui: 57% de HTML descreve o peso dos arquivos
            no GitHub, não a competência de quem escreveu — e num
            portfólio esse número trabalha contra. As logos já dizem com
            o que ele constrói. */}
      </div>
    </section>
  );
}
