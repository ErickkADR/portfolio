"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/* Lista fechada em vez de `ElementType`: o @react-three/fiber amplia o
   JSX global com os elementos do three.js, e um `as` genérico passa a
   inferir também `<mesh>`, `<group>` etc. — cujo `children` é `never`,
   o que quebra a tipagem deste componente. */
type Tag = "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span" | "blockquote";

type Props = {
  children: ReactNode;
  as?: Tag;
  className?: string;
  /* "lines" para títulos, "words" para parágrafos longos. */
  split?: "lines" | "words";
  delay?: number;
  stagger?: number;
  /* Onde no viewport a revelação dispara. */
  start?: string;
};

/* Revelação com máscara: cada linha vive dentro de um bloco com overflow
   hidden e entra por baixo. O `mask` do SplitText cria esse wrapper
   sozinho — fazer na mão exige duplicar a árvore e quebra a seleção
   de texto. `autoSplit` refaz a divisão quando a fonte carrega ou o
   container muda de largura, senão as linhas quebram no lugar errado. */

export default function RevealText({
  children,
  as: Tag = "div",
  className = "",
  split = "lines",
  delay = 0,
  stagger = 0.09,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };

          if (reduced) {
            gsap.set(el, { opacity: 1 });
            return;
          }

          const instance = SplitText.create(el, {
            type: split,
            mask: split,
            autoSplit: true,
            onSplit(self) {
              const targets = split === "lines" ? self.lines : self.words;
              return gsap.from(targets, {
                yPercent: 110,
                opacity: 0,
                duration: 1.1,
                ease: "expo.out",
                stagger,
                delay,
                scrollTrigger: {
                  trigger: el,
                  start,
                  once: true,
                },
              });
            },
          });

          return () => instance.revert();
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  /* A união de tags faz o TS exigir uma interseção dos tipos de ref
     (HTMLQuoteElement & HTMLDivElement & ...), que nenhum elemento
     satisfaz. Um único ponto de cast resolve, em vez de espalhar
     `any` pelos pontos de uso. No React 19 `ref` é prop comum. */
  const Component = Tag as unknown as React.FC<{
    ref?: React.Ref<HTMLElement>;
    className?: string;
    children?: ReactNode;
  }>;

  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
