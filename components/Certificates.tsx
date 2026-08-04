"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certificates } from "@/lib/content";
import { asset } from "@/lib/asset";
import RevealText from "./RevealText";

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

  /* Mais recente primeiro. A ordenação fica aqui, e não na lista, para
     que dê para inserir um certificado novo em qualquer posição do
     content.ts sem pensar em ordem. */
  const items = [...certificates.items].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const close = useCallback(() => setZoom(null), []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, close]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const t = gsap.from(".cert-card", {
          y: 30,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: ".cert-grid", start: "top 88%", once: true },
        });
        return () => t.kill();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

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

        <ul className="cert-grid mt-20 grid gap-6 sm:grid-cols-2">
          {items.map((cert) => {
            const image = images[cert.slug];

            return (
              <li
                key={cert.slug}
                className="cert-card group flex flex-col overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-bone/25"
              >
                {image && (
                  <button
                    type="button"
                    onClick={() =>
                      setZoom({
                        src: asset(image),
                        alt: `Certificado: ${cert.title} — ${cert.issuer}`,
                      })
                    }
                    className="relative block aspect-[4/3] w-full overflow-hidden bg-ink-3"
                    aria-label={`Ampliar o certificado ${cert.title}`}
                  >
                    <img
                      src={asset(image)}
                      alt={`Certificado: ${cert.title} — ${cert.issuer}`}
                      loading="lazy"
                      decoding="async"
                      /* `contain`, não `cover`: certificado é documento —
                         cortar a borda pode comer o nome ou a assinatura. */
                      className="h-full w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                    <span className="mono-label absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-2 to-transparent px-5 pb-4 pt-10 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      {certificates.imageHint}
                    </span>
                  </button>
                )}

                <div className="flex flex-1 flex-col p-7">
                  <span className="mono-label">
                    {cert.issuer} · {cert.dateLabel}
                  </span>

                  <h3 className="display mt-3 text-xl leading-tight">
                    {cert.title}
                  </h3>

                  {cert.description && (
                    <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                      {cert.description}
                    </p>
                  )}

                  {cert.skills && cert.skills.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* `mt-auto` cola o rodapé na base: os cartões da mesma
                      linha têm alturas diferentes e, sem isso, a linha da
                      credencial flutuaria no meio de uns e no fim de
                      outros. */}
                  {(cert.credentialId || cert.expiresLabel || cert.href) && (
                    <div className="mono-label mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-6">
                      {cert.credentialId && <span>{cert.credentialId}</span>}
                      {cert.expiresLabel && <span>{cert.expiresLabel}</span>}
                      {cert.href && (
                        <a
                          href={cert.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="transition-colors hover:text-plasma"
                        >
                          Credencial ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
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
