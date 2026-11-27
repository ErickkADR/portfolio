"use client";

import { useCallback, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { slugify } from "@/lib/logos";
import { asset } from "@/lib/asset";
import type { StackItem } from "@/lib/content";

/* ============================================================
   Os ladrilhos de logo da seção Stack, num componente só (27/11/2026).

   Nasceu dentro do Stack.tsx e saiu daqui quando o Erick pediu a mesma
   visualização no topo de cada página de projeto: mesma entrada em
   cascata, mesmo relevo no hover (o ladrilho cresce e os vizinhos
   acompanham), mesmo tooltip. Duas cópias desse comportamento iam
   divergir na primeira mudança.

   ---- Por que os vizinhos são achados por GEOMETRIA ----
   As linhas são `flex-wrap` centralizado, não uma grade fixa: o número de
   colunas muda por breakpoint e a última linha fica deslocada. Conta por
   índice (i-1, i+1, i-N, i+N) erra justamente nas bordas. Medir a
   distância entre os retângulos acerta em qualquer arranjo, e roda uma
   vez por hover, não por frame.

   ---- Item sem PNG ----
   `semLogo: "ocultar"` (a parede) não renderiza: um monograma lia como
   ladrilho vazio no meio de logos coloridas. `semLogo: "nome"` (página de
   projeto) mostra o nome numa pílula da mesma altura, porque ali a lista é
   curta e cada ferramenta é informação, não enfeite.
   ============================================================ */

/* Um vizinho é quem está a menos de 1,4 ladrilho de distância nos dois
   eixos: pega os oito ao redor e ignora o resto da linha. */
const ALCANCE = 1.4;

type Props = {
  items: StackItem[];
  /* slug → caminho em public/, montado no Server Component. */
  logos: Record<string, string>;
  semLogo?: "ocultar" | "nome";
  className?: string;
};

export default function StackTiles({
  items,
  logos,
  semLogo = "ocultar",
  className = "",
}: Props) {
  const ref = useRef<HTMLUListElement>(null);
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
      if (
        Math.abs(b.left - a.left) <= a.width * ALCANCE &&
        Math.abs(b.top - a.top) <= a.height * ALCANCE
      ) {
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
        /* Stagger curto: com 29 ladrilhos, 0.035 fazia a parede se montar
           em câmera lenta. `clearProps` devolve o transform ao CSS do
           hover; sem isso o primeiro ladrilho tocado dá um salto. */
        const entrada = gsap.from(ref.current!.querySelectorAll(".stack-tile"), {
          y: 22,
          scale: 0.85,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.02,
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: ref.current, start: "top 92%", once: true },
        });
        return () => entrada.kill();
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    /* `perspective` no container e `translateZ` implícito no ladrilho: o
       que cresce vem na direção de quem olha, em vez de só inchar no plano. */
    <ul
      ref={ref}
      onPointerLeave={sair}
      className={`flex flex-wrap justify-center gap-2 [perspective:1200px] ${className}`}
    >
      {items.map((item, i) => {
        const chave = String(i);
        const logo = logos[slugify(item.name)];
        if (!logo && semLogo === "ocultar") return null;

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
            {/* `button`: o nome aparece também no foco por teclado, e só
                elemento focável recebe :focus-visible. */}
            <button
              type="button"
              aria-label={item.name}
              className={`grid h-16 place-items-center rounded-xl border bg-ink transition-[border-color,box-shadow] duration-300 sm:h-[4.5rem] ${
                logo ? "w-16 p-3 sm:w-[4.5rem]" : "px-4"
              } ${
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
                  /* `brightness-0 invert`: achata para preto e inverte,
                     sai branco puro com a silhueta intacta (flag `branco`). */
                  className={`h-full w-full object-contain transition-opacity duration-300 ${
                    grande ? "opacity-100" : "opacity-70"
                  } ${item.branco ? "brightness-0 invert" : ""}`}
                />
              ) : (
                <span
                  className={`mono-label text-bone transition-opacity duration-300 ${
                    grande ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {item.name}
                </span>
              )}
            </button>

            {/* Tooltip. `pointer-events-none` para nunca roubar o hover do
                próprio ladrilho e piscar. Pílula com nome não precisa. */}
            {logo && (
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-2 left-1/2 z-40 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-bone/15 bg-ink-3 px-2.5 py-1 text-[0.6875rem] tracking-wide opacity-0 shadow-lg transition-all duration-300 group-hover/tile:-translate-y-[calc(100%+0.25rem)] group-hover/tile:opacity-100 group-focus-within/tile:-translate-y-[calc(100%+0.25rem)] group-focus-within/tile:opacity-100"
              >
                {item.name}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
