"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useConteudo } from "@/lib/idioma";
import { asset } from "@/lib/asset";
import RevealText from "./RevealText";

/* ============================================================
   SOBRE — o relato à esquerda, o crachá pendurado à direita.

   Esta seção já foi duas coisas antes: a faixa com a foto de fundo (que
   subiu para o hero) e, por algumas horas, o vídeo que abria a página.
   Agora é o crachá, a pedido dele: "no lugar do vídeo, o layout fica
   mais clean".

   E fica: o vídeo era uma peça de motion cheia de neon competindo com
   sete parágrafos de texto, e qualquer véu forte o bastante para o texto
   ser legível apagava o próprio vídeo. O crachá é um objeto só, escuro,
   do lado oposto da leitura, e é o único elemento da página com o nome
   dele em três dimensões.

   ---- Duas colunas, e o crachá é `sticky` ----
   A coluna de texto é longa. Se o crachá ficasse preso no topo, ele
   sairia de cena no primeiro parágrafo. `sticky` de altura de janela o
   mantém pendurado ao lado durante a leitura inteira, balançando quando
   a pessoa o arrasta.

   ---- Só a partir de lg ----
   Num celular a coluna dupla não existe e o crachá roubaria a tela do
   texto, que é o conteúdo desta seção. É também o dispositivo em que uma
   simulação de corda em WebGL custa mais caro. Abaixo de lg a seção é
   texto puro, e é a mais limpa da página.

   ---- Não é WebGL ----
   Já foi: o `Lanyard` do React Bits, com física de corda e um modelo de
   2,4 MB. Quebrou duas vezes na máquina dele e virou um retângulo branco.
   Hoje é `Cracha.tsx`, em transform e GSAP — mesmo balanço, mesmo
   arrasto, sem contexto de GPU para perder. Ver a nota lá.
   ============================================================ */

type Props = {
  /* As fotos de `public/sobre/`, em ordem de nome. A PRIMEIRA é a grande
     (5:4, largura toda); as outras duas ficam lado a lado embaixo (3:4).
     Desde 27/11/2026 são as reais: ele na mesa, o notebook na sala e a
     fachada da sede. A legenda de cada uma é `sobre.photoAlts`, na mesma
     ordem. */
  fotos: string[];
};

export default function Sobre({ fotos }: Props) {
  const { sobre } = useConteudo();
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Os parágrafos acendem palavra a palavra conforme a seção sobe.
           É scrub, não `once`: voltar o scroll desfaz a leitura.

           O `end` é "bottom 90%" e não "bottom 65%": com sete parágrafos
           a coluna passou a ser mais alta que a janela, e terminar a
           leitura antes do fim do bloco deixava os últimos parágrafos
           acesos desde sempre. */
        const split = SplitText.create(".sobre-copy p", {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.18 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.2,
                scrollTrigger: {
                  trigger: ".sobre-copy",
                  start: "top 80%",
                  end: "bottom 90%",
                  scrub: 0.6,
                },
              }
            );
          },
        });

        const ficha = gsap.from(".sobre-fato", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: ".sobre-ficha", start: "top 92%", once: true },
        });

        const fotosAnim = gsap.from(".sobre-foto", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".sobre-foto", start: "top 85%", once: true },
        });

        return () => {
          split.revert();
          ficha.kill();
          fotosAnim.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="sobre"
      className="relative border-t border-bone/10 py-28 sm:py-36"
    >
      {/* `shell` largo (110rem) e não `shell-narrow`: a coluna estreita
          empilhava sete parágrafos num pilar de umas três telas de altura.
          Aqui o texto ocupa a largura e quebra em DUAS colunas, então a
          seção fica larga em vez de alta. */}
      <div className="shell lg:grid lg:grid-cols-[1fr_24rem] lg:gap-16 xl:grid-cols-[1fr_28rem] xl:gap-24">
        {/* ---------- o relato ---------- */}
        <div>
          <span className="mono-label">{sobre.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,5.5vw,4.2rem)]"
          >
            {sobre.title}
          </RevealText>

          {/* UMA coluna, parágrafos LARGOS.

              A primeira tentativa foi quebrar em duas colunas de texto
              para encurtar a seção. Ele vetou: quer o parágrafo largo,
              não a coluna dupla. O efeito na altura é o mesmo — o que
              deixava a seção alta era a medida estreita de 36rem, não o
              número de colunas — e a leitura fica corrida, sem o pulo de
              volta ao topo que a coluna dupla obriga. */}
          <div className="sobre-copy mt-10 max-w-5xl space-y-6">
            {sobre.body.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          <dl className="sobre-ficha hairline mt-10 grid gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {sobre.facts.map((fato) => (
              <div key={fato.label} className="sobre-fato">
                <dt className="mono-label">{fato.label}</dt>
                <dd className="mt-2 leading-snug">{fato.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------- as fotos ----------
            O crachá saiu em 26/11/2026, a pedido dele: um cartão com nome
            e cargo repetia o que o texto já dizia. As fotos mostram a
            pessoa e o trabalho, que é o que o crachá não mostrava. */}
        {fotos.length > 0 && (
          <div className="mt-16 lg:mt-0">
            {/* Mosaico em GRADE, sem sobreposição (27/11/2026). As duas
                fotos menores ficavam por cima da grande e cobriam o rosto
                dele; agora a grande ocupa a largura toda em 5:4 (âncora no
                alto, para o quadro e o rosto entrarem inteiros) e as duas
                retrato ficam lado a lado embaixo, em 3:4. */}
            <div className="mx-auto grid max-w-md grid-cols-2 gap-3 lg:sticky lg:top-24">
              {fotos.slice(0, 3).map((f, i) => (
                <div
                  key={f}
                  className={`sobre-foto overflow-hidden border border-bone/12 bg-ink-3 ${
                    i === 0 ? "col-span-2 rounded-2xl" : "rounded-xl"
                  }`}
                >
                  <img
                    src={asset(f)}
                    alt={sobre.photoAlts[i] ?? sobre.photoAlt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className={`w-full object-cover ${
                      i === 0 ? "aspect-[5/4] object-top" : "aspect-[3/4] object-center"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
