"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { certificates } from "@/lib/content";
import { asset } from "@/lib/asset";
import Carousel from "./Carousel";
import RevealText from "./RevealText";

/* NOTA: as imagens chegam prontas de `arquivoPorSlug("certificados")`,
   chamado no Server Component da página. Ver lib/media.ts. */

/* Certificado é documento: o valor está em conseguir ler o papel, não em
   ver uma miniatura. Por isso a imagem do cartão abre em tela cheia.

   As imagens vêm de fora (`images`), montadas no build a partir do que
   existe em public/certificados/ — ver lib/certificados.ts. Certificado
   sem arquivo simplesmente não mostra imagem, e o cartão continua
   completo com o texto. */

type Props = {
  /* slug → caminho em public/. Ausente = ainda não tem imagem. */
  images: Record<string, string>;
};

export default function Certificates({ images }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  /* A ordem é a do content.ts, sem reordenar por data: o diploma da UNIP
     precisa abrir a lista e as duas da Wizard vir logo atrás, e isso é
     uma decisão editorial — "mais recente primeiro" jogaria o inglês
     para o meio do meio. O campo `date` continua existindo porque é o
     que aparece no cartão. */
  const items = certificates.items;

  const close = useCallback(() => setZoom(null), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, close]);

  /* A entrada em cascata dos cards agora é do <Carousel>, que anima os
     próprios filhos — manter um tween aqui, mirando classes que não
     existem mais, só criaria um ScrollTrigger órfão. */

  return (
    <section
      ref={ref}
      id="certificados"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{certificates.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {certificates.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {certificates.intro}
          </p>
        </div>

        {/* O CARD É O CERTIFICADO. Antes o documento ocupava o topo e o
            resto era um bloco de texto — os certificados ficavam
            pequenos e cada card tinha altura diferente, o que serrilhava
            a base da pista. Agora a imagem preenche o card inteiro e o
            texto só aparece no hover, por cima.

            `object-cover` corta um pouco das bordas, e isso é aceitável
            porque o clique abre o documento inteiro em tela cheia — o
            card é vitrine, não é o lugar de ler o papel. `object-top`
            garante que o que sobrevive ao corte é o cabeçalho: logo da
            instituição e nome. */}
        <Carousel label="Certificados" className="mt-16">
          {items.map((cert) => {
            const image = images[cert.slug];

            return (
              <li
                key={cert.slug}
                className="group relative w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-plasma/50 sm:w-[24rem]"
              >
                <button
                  type="button"
                  onClick={() =>
                    image &&
                    setZoom({
                      src: asset(image),
                      alt: `Certificado: ${cert.title} — ${cert.issuer}`,
                    })
                  }
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-ink-3 text-left"
                  aria-label={`Ampliar o certificado ${cert.title}`}
                >
                  {image ? (
                    <img
                      src={asset(image)}
                      alt={`Certificado: ${cert.title} — ${cert.issuer}`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span className="mono-label absolute inset-0 grid place-items-center px-6 text-center">
                      {cert.title}
                    </span>
                  )}

                  {/* Véu + informações: entram juntos no hover. O véu
                      escurece o documento o bastante para o texto branco
                      ficar legível sobre qualquer certificado — os do
                      Cate são brancos, os da APDADOS são azul-escuros. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/92 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />

                  <div className="absolute inset-0 flex translate-y-3 flex-col justify-end p-6 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <span className="mono-label text-plasma">
                      {cert.issuer}
                    </span>

                    <h3 className="display mt-2 text-lg leading-tight">
                      {cert.title}
                    </h3>

                    <span className="mono-label mt-2">{cert.dateLabel}</span>

                    {cert.skills && cert.skills.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full border border-bone/20 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    )}

                    <span className="mono-label mt-4 text-plasma">
                      {certificates.imageHint} →
                    </span>
                  </div>
                </button>

                {/* Fora do botão: link dentro de botão é HTML inválido, e
                    a credencial precisa continuar clicável por cima do
                    véu. Só aparece no hover, como o resto. */}
                {cert.href && (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono-label absolute right-5 top-5 z-10 rounded-full border border-bone/25 bg-ink/80 px-3 py-1.5 opacity-0 backdrop-blur-md transition-all duration-500 hover:border-plasma hover:text-plasma group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    Credencial ↗
                  </a>
                )}
              </li>
            );
          })}
        </Carousel>
      </div>

      {/* ---------- visualização em tela cheia ---------- */}
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          onClick={close}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 p-6 backdrop-blur-sm sm:p-12"
        >
          <button
            type="button"
            onClick={close}
            className="mono-label absolute right-6 top-6 rounded-full border border-bone/20 px-4 py-2 transition-colors hover:border-plasma hover:text-plasma"
          >
            Fechar ✕
          </button>
          {/* O clique na imagem não fecha: quem ampliou quer olhar, e
              fechar no primeiro clique dentro seria hostil. */}
          <img
            src={zoom.src}
            alt={zoom.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </section>
  );
}
