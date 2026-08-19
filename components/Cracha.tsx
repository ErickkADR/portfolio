"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { asset } from "@/lib/asset";
import { useConteudo } from "@/lib/idioma";

/* ============================================================
   CRACHÁ PENDURADO — cordão, clipe e cartão, balançando.

   ---- Por que NÃO é o Lanyard do React Bits ----
   Foi, por algumas horas. Aquele componente é WebGL: three + fiber +
   drei + rapier (física de corda) + meshline, mais um `card.glb` de
   2,4 MB. Na máquina dele o canvas quebrou duas vezes — o crachá saía um
   retângulo branco com a carinha de processo derrubado — e não houve como
   reproduzir aqui, porque este ambiente não tem GPU: no SwiftShader o
   canvas monta, os assets vêm com 200 e o console fica limpo, mas nada é
   desenhado. Depurar às cegas um efeito decorativo não valia mais
   tentativas.

   Esta versão entrega as três coisas que ele pediu — crachá pendurado,
   balançando, e dá para arrastar — com transform e uma timeline. Não tem
   contexto de GPU para perder, não baixa modelo nenhum e roda igual em
   qualquer máquina. A frente do cartão é a MESMA imagem gerada por
   `scripts/gera-cracha.mjs`.

   `components/Lanyard.tsx` continua no repo, sem ninguém importando, para
   o caso de valer uma nova tentativa com GPU de verdade à mão.

   ---- Como o balanço funciona ----
   Tudo (cordão + clipe + cartão) vive num pêndulo só, com
   `transform-origin` no TOPO: girar esse bloco gira a coisa inteira em
   volta do ponto onde ela está pendurada, que é como um crachá se move.
   Rodar o cartão sozinho o faria girar no meio dele, como um ponteiro.

   No arrasto, o giro é uma FRAÇÃO da distância do ponteiro (÷ 9) e com
   teto de 26°: puxar 1:1 faz o crachá fugir do cursor. Ao soltar, volta
   com elástica e o balanço ocioso reassume.
   ============================================================ */

const CRACHA = "/lanyard/cracha-frente.png";

/* Amplitude do balanço ocioso, em graus.

   Começou em 2.6 e ele reportou o crachá como "não está se movendo".
   Medindo, a animação estava rodando: o problema era escala. 2.6° num
   cartão de 200px desloca a borda de baixo uns 9px, o que a esta
   distância lê como imóvel. A 6° num cartão de 320px são uns 34px, que é
   movimento que se vê sem procurar. */
const REPOUSO = 6;

export default function Cracha() {
  const { ui } = useConteudo();
  const raiz = useRef<HTMLDivElement>(null);
  const pendulo = useRef<HTMLDivElement>(null);
  const balanco = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const el = pendulo.current;
      if (!el) return;

      const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* Movimento reduzido: o crachá fica pendurado e parado. Continua
         arrastável, porque arrastar é ação da pessoa, não animação
         imposta a ela. */
      if (!reduzido) {
        gsap.set(el, { rotate: -REPOUSO });
        balanco.current = gsap.to(el, {
          rotate: REPOUSO,
          duration: 3.9,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      const girar = gsap.quickTo(el, "rotate", {
        duration: 0.5,
        ease: "power3.out",
      });

      let arrastando = false;
      let centroX = 0;

      const pegar = (e: PointerEvent) => {
        arrastando = true;
        balanco.current?.pause();
        const caixa = el.getBoundingClientRect();
        // O eixo é o topo do pêndulo: é dali que o giro é medido.
        centroX = caixa.left + caixa.width / 2;
        el.setPointerCapture(e.pointerId);
        document.body.style.cursor = "grabbing";
      };

      const mover = (e: PointerEvent) => {
        if (!arrastando) return;
        girar(gsap.utils.clamp(-26, 26, (e.clientX - centroX) / 9));
      };

      const soltar = (e: PointerEvent) => {
        if (!arrastando) return;
        arrastando = false;
        el.releasePointerCapture?.(e.pointerId);
        document.body.style.cursor = "";
        /* Volta ao repouso com elástica e devolve o balanço ocioso. O
           `onComplete` religa a timeline em vez de deixá-la retomar de
           onde parou, que daria um salto. */
        gsap.to(el, {
          rotate: -REPOUSO,
          duration: 1.2,
          ease: "elastic.out(1, 0.45)",
          onComplete: () => {
            if (balanco.current) {
              balanco.current.restart();
              balanco.current.play();
            }
          },
        });
      };

      el.addEventListener("pointerdown", pegar);
      el.addEventListener("pointermove", mover);
      el.addEventListener("pointerup", soltar);
      el.addEventListener("pointercancel", soltar);

      return () => {
        el.removeEventListener("pointerdown", pegar);
        el.removeEventListener("pointermove", mover);
        el.removeEventListener("pointerup", soltar);
        el.removeEventListener("pointercancel", soltar);
        balanco.current?.kill();
        document.body.style.cursor = "";
      };
    },
    { scope: raiz }
  );

  return (
    <div ref={raiz} className="relative h-full w-full">
      <div
        ref={pendulo}
        /* `origin-top` é o que faz o giro acontecer no ponto onde o
           crachá está pendurado. `touch-none` para o arrasto não virar
           rolagem da página no celular. */
        className="absolute left-1/2 top-0 flex -translate-x-1/2 origin-top cursor-grab touch-none flex-col items-center active:cursor-grabbing"
      >
        {/* ---------- cordão ----------
            Dois tons no degradê para dar volume à fita sem imagem
            nenhuma: a borda escurece e o meio acende. */}
        <div
          aria-hidden="true"
          className="h-[clamp(5rem,15vh,9rem)] w-[11px] rounded-b-sm bg-[linear-gradient(to_right,#4c1d95_0%,#a855f7_45%,#c4b5fd_55%,#4c1d95_100%)] shadow-[0_0_18px_-4px_var(--color-plasma)]"
        />

        {/* ---------- clipe de metal ---------- */}
        <div
          aria-hidden="true"
          className="-mt-px h-5 w-12 rounded-sm border border-bone/25 bg-[linear-gradient(to_bottom,#e6e3ee,#9c97ad_55%,#5b5768)]"
        />
        <div
          aria-hidden="true"
          className="h-2 w-3 rounded-b-sm border-x border-b border-bone/20 bg-ink-3"
        />

        {/* ---------- o cartão ---------- */}
        <img
          src={asset(CRACHA)}
          alt={ui.crachaAlt}
          draggable={false}
          className="mt-1 w-[clamp(14rem,24vw,21rem)] select-none rounded-xl border border-bone/15 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.9)]"
        />
      </div>
    </div>
  );
}
