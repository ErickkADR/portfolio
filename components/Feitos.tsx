"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { feitos } from "@/lib/content";
import { asset } from "@/lib/asset";
import type { MediaFile } from "@/lib/media";
import RevealText from "./RevealText";
import MediaViewer from "./MediaViewer";
import Carousel from "./Carousel";

/* ============================================================
   CARGO ATUAL — feitos na Bannerjet.

   A seção existe para provar, não só para listar: cada feito pode
   carregar print, PDF ou vídeo do que foi entregue. O material vem de
   `public/feitos/<slug>/`, varrido no build (ver lib/media.ts), então
   anexar uma prova nova é largar o arquivo na pasta — não tem cadastro
   nem edição de código no meio.

   Feito sem pasta continua na lista, com um rótulo dizendo que o
   material está sendo digitalizado. É mais honesto que sumir com o item
   ou fingir que ele não tem comprovação.
   ============================================================ */

type Props = {
  /* slug → arquivos, montado no build. */
  media: Record<string, MediaFile[]>;
};

export default function Feitos({ media }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [aberto, setAberto] = useState<{
    slug: string;
    title: string;
    index: number;
  } | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Os cards agora entram pelo <Carousel>, que anima os próprios
           filhos. Aqui sobra o cabeçalho de cada grupo. */
        const tweens = gsap.utils
          .toArray<HTMLElement>(".feito-grupo")
          .map((grupo) =>
            gsap.from(grupo.querySelector(".feito-head"), {
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: grupo, start: "top 88%", once: true },
            })
          );

        return () => tweens.forEach((t) => t.kill());
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const arquivos = aberto ? media[aberto.slug] ?? [] : [];

  return (
    <section
      ref={ref}
      id="cargo-atual"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{feitos.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {feitos.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {feitos.intro}
          </p>
        </div>

        {feitos.groups.map((grupo) => (
          <div key={grupo.group} className="feito-grupo mt-20">
            <div className="feito-head hairline flex flex-col gap-2 pt-10 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="mono-label text-plasma">{grupo.group}</h3>
              <p className="max-w-md text-sm leading-relaxed text-bone-dim">
                {grupo.intro}
              </p>
            </div>

            {/* Um carrossel por grupo, e não um só para tudo: os grupos
                têm assuntos diferentes, e misturá-los numa pista única
                apagaria a divisão que o título de cada um estabelece.
                O `destaque` deixou de mudar a largura — numa pista
                horizontal, um card mais largo quebra o ritmo do snap. */}
            <Carousel label={grupo.group} className="mt-10">
              {grupo.items.map((item) => {
                const files = media[item.slug] ?? [];
                const capa = files.find((f) => f.kind === "image");

                return (
                  <li
                    key={item.slug}
                    className="group flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-bone/25 sm:w-[24rem]"
                  >
                    {capa && (
                      <button
                        type="button"
                        onClick={() =>
                          setAberto({
                            slug: item.slug,
                            title: item.title,
                            index: files.indexOf(capa),
                          })
                        }
                        className="relative block aspect-[16/9] w-full overflow-hidden bg-ink-3"
                        aria-label={`Ver o material de ${item.title}`}
                      >
                        <img
                          src={asset(capa.src)}
                          alt={`${item.title} — material de comprovação`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                        />
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent"
                        />
                      </button>
                    )}

                    <div className="flex flex-1 flex-col p-7 lg:p-8">
                      <h4 className="display text-xl leading-tight lg:text-2xl">
                        {item.title}
                      </h4>

                      <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                        {item.body}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-7">
                        {files.length > 0 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setAberto({
                                slug: item.slug,
                                title: item.title,
                                index: 0,
                              })
                            }
                            className="mono-label inline-flex items-center gap-3 rounded-full border border-bone/20 px-5 py-2.5 transition-colors duration-500 hover:border-plasma hover:text-plasma"
                          >
                            {feitos.mediaLabel}
                            <span aria-hidden="true">
                              {files.length} {files.length === 1 ? "item" : "itens"}
                            </span>
                          </button>
                        ) : (
                          <span className="mono-label opacity-60">
                            {feitos.mediaEmpty}
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </Carousel>
          </div>
        ))}
      </div>

      {aberto && arquivos.length > 0 && (
        <MediaViewer
          files={arquivos}
          index={aberto.index}
          title={aberto.title}
          onClose={() => setAberto(null)}
          onIndex={(i) => setAberto({ ...aberto, index: i })}
        />
      )}
    </section>
  );
}
