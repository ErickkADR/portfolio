"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stack } from "@/lib/content";
import { monograma, slugify } from "@/lib/logos";
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

   ---- As logos ----
   PNG de verdade, com fundo transparente, lidos de `public/stack/` no
   build (ver lib/media.ts). Ícone de biblioteca é silhueta de uma cor só,
   e logo de produto tem forma E cor — a cor é metade do reconhecimento.
   Quem ainda não tem PNG cai no monograma, no mesmo ladrilho, sem
   quebrar o alinhamento. Para acrescentar: `public/stack/<slug>.png`,
   onde o slug é o nome do item em minúsculas com hífen.
   ============================================================ */

type Props = {
  /* slug → caminho em public/. Montado no Server Component da página. */
  logos: Record<string, string>;
};

/* Um vizinho é quem está a menos de 1,4 ladrilho de distância nos dois
   eixos — pega os oito ao redor e ignora o resto da linha. */
const ALCANCE = 1.4;

export default function Stack({ logos }: Props) {
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
        /* Um trigger por grupo: a seção é mais alta que a viewport e,
           com um stagger único, os últimos grupos terminariam a animação
           antes mesmo de aparecerem na tela. */
        const grupos = gsap.utils
          .toArray<HTMLElement>(".stack-group")
          .map((col) =>
            gsap.from(col.querySelectorAll(".stack-tile"), {
              y: 22,
              scale: 0.85,
              opacity: 0,
              duration: 0.6,
              ease: "back.out(1.7)",
              stagger: 0.035,
              /* Devolve o controle ao CSS: o transform do GSAP e o do
                 hover disputam a mesma propriedade, e sem isso o
                 primeiro ladrilho a receber o mouse dá um salto. */
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: col, start: "top 90%", once: true },
            })
          );

        return () => grupos.forEach((t) => t.kill());
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

        <div className="mt-16 space-y-10">
          {stack.groups.map((group, gi) => (
            <div key={group.group} className="stack-group">
              <h3 className="mono-label text-center text-plasma">
                {group.group}
              </h3>

              {/* `perspective` no container e `translateZ` no ladrilho: é
                  o que faz o que cresce vir na direção de quem olha, em
                  vez de só ficar maior no plano. */}
              <ul
                onPointerLeave={sair}
                className="mt-5 flex flex-wrap justify-center gap-2 [perspective:1200px]"
              >
                {group.items.map((item, ii) => {
                  const chave = `${gi}:${ii}`;
                  const slug = slugify(item.name);
                  const logo = logos[slug];

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
                      {/* `button` e não `div`: o nome precisa aparecer
                          também no foco por teclado, e só um elemento
                          focável recebe :focus-visible. */}
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
                        {logo ? (
                          <img
                            src={asset(logo)}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className={`h-full w-full object-contain transition-opacity duration-300 ${
                              grande ? "opacity-100" : "opacity-70"
                            }`}
                          />
                        ) : (
                          <span
                            className={`display grid h-full w-full place-items-center text-sm tracking-tight transition-opacity duration-300 ${
                              grande ? "opacity-100" : "opacity-70"
                            }`}
                          >
                            {monograma(item.name)}
                          </span>
                        )}
                      </button>

                      {/* Tooltip. `pointer-events-none` para ele nunca
                          roubar o hover do próprio ladrilho e piscar. */}
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
            </div>
          ))}
        </div>

        {/* A barra com a distribuição de linguagens dos repositórios
            públicos saiu daqui: 57% de HTML descreve o peso dos arquivos
            no GitHub, não a competência de quem escreveu — e num
            portfólio esse número trabalha contra. As logos já dizem com
            o que ele constrói. */}
      </div>
    </section>
  );
}
