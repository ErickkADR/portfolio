"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { sobre, site } from "@/lib/content";
import { asset } from "@/lib/asset";
import RevealText from "./RevealText";
import PhotoReveal from "./PhotoReveal";

/* A FOTO É O FUNDO DA SEÇÃO — não um quadro dentro dela.

   Antes o retrato vivia numa moldura 4:5 à esquerda, com o texto ao
   lado. As duas fotos que o Erick fez são largas, com ele no canto
   esquerdo e o resto do quadro vazio: é composição de fundo de página,
   e espremê-la num quadradinho jogava fora justamente esse vazio, que é
   onde o texto deveria estar.

   Agora a seção é uma faixa de tela cheia. A imagem sangra de borda a
   borda, o texto ocupa o vazio da direita (embaixo, no celular) e um
   véu em degradê garante o contraste sem apagar a foto.

   O hover revela a versão androide por baixo — a mancha líquida segue o
   cursor pela seção inteira, texto incluído. Ver PhotoReveal.

   Sem os arquivos de imagem a seção continua de pé: só perde o fundo. */

type Props = {
  /* Caminho em public/, ou null se ainda não subiu foto nenhuma. */
  photo: string | null;
  /* A imagem revelada no hover. null = sem efeito, só a foto de fundo. */
  photoIA: string | null;
};

export default function Sobre({ photo, photoIA }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Os parágrafos acendem palavra a palavra conforme a seção sobe.
           É scrub, não `once`: voltar o scroll desfaz a leitura. */
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
                  end: "bottom 65%",
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

        return () => {
          split.revert();
          ficha.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const iniciais = site.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  /* O texto é o mesmo nos três cenários de fundo (as duas fotos, só uma,
     nenhuma), então mora numa variável em vez de ser copiado em cada
     ramo. */
  const conteudo = (
    <>
      {/* ---------- véu (só no desktop) ----------
          Degradê da esquerda para a direita: transparente sobre o rosto,
          sólido sob a coluna de texto. No celular ele não existe porque
          lá o texto não fica sobre a imagem — ver o espaçador abaixo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(7,6,11,0)_0%,rgba(7,6,11,0.28)_30%,rgba(7,6,11,0.86)_52%,var(--color-ink)_72%)] lg:block"
      />
      {/* Esmaecido no topo e no pé, para a faixa se dissolver nas seções
          vizinhas em vez de virar um retângulo colado. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-ink)_0%,transparent_14%,transparent_90%,var(--color-ink)_100%)]"
      />

      {/* ---------- celular: a foto ganha faixa própria ----------
          Sobrepor texto e rosto numa tela de 390px não tem saída boa: a
          largura obriga o texto a cruzar a imagem inteira, e escurecer o
          bastante para ele ser legível apaga a foto. Então aqui a imagem
          fica com a parte de cima da seção só para ela, e o texto vem
          abaixo, sobre o preto — o degradê no pé da faixa costura as
          duas partes. No desktop este bloco não existe. */}
      {/* A altura é a mesma do `AREA` em PhotoReveal.tsx — é ela que
          define até onde a imagem vai no celular. */}
      <div aria-hidden="true" className="relative h-[56svh] lg:hidden">
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_bottom,transparent,var(--color-ink))]" />
      </div>

      <div className="shell relative bg-ink pb-24 pt-4 lg:flex lg:min-h-[100svh] lg:items-center lg:bg-transparent lg:py-36">
        {/* Metade da largura no desktop: é exatamente a área de fundo
            vazio da foto, então o texto nunca cobre o rosto. */}
        <div className="w-full lg:ml-auto lg:w-1/2 lg:max-w-xl">
          <span className="mono-label">{sobre.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,5.5vw,4.2rem)]"
          >
            {sobre.title}
          </RevealText>

          <div className="sobre-copy mt-10 space-y-6">
            {sobre.body.map((p) => (
              <p
                key={p.slice(0, 32)}
                className="text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          <dl className="sobre-ficha hairline mt-12 grid gap-8 pt-10 sm:grid-cols-2">
            {sobre.facts.map((fato) => (
              <div key={fato.label} className="sobre-fato">
                <dt className="mono-label">{fato.label}</dt>
                <dd className="mt-2 leading-snug">{fato.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );

  return (
    <section ref={ref} id="sobre" className="relative isolate">
      {photo && photoIA ? (
        <PhotoReveal
          base={photo}
          reveal={photoIA}
          alt={sobre.photoAlt}
          revealAlt={sobre.photoIAAlt}
          hint={sobre.photoHint}
          tapLabels={sobre.photoTap}
        >
          {conteudo}
        </PhotoReveal>
      ) : (
        <div className="relative overflow-hidden">
          {photo ? (
            <img
              src={asset(photo)}
              alt={sobre.photoAlt}
              loading="lazy"
              decoding="async"
              /* Mesma área do PhotoReveal: no celular a foto vive só na
                 faixa de cima. */
              className="absolute inset-x-0 top-0 h-[56svh] w-full object-cover object-left-top lg:h-full"
            />
          ) : (
            /* Sem foto nenhuma: as iniciais gigantes seguram o fundo, no
               lugar de um vazio sem explicação. */
            <span
              aria-hidden="true"
              className="display pointer-events-none absolute left-[6vw] top-1/2 -translate-y-1/2 text-[22vw] leading-none text-bone/5"
            >
              {iniciais}
            </span>
          )}
          <div className="relative z-10">{conteudo}</div>
        </div>
      )}
    </section>
  );
}
