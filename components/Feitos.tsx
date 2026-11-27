"use client";

import { useRef, useState } from "react";

import { useConteudo } from "@/lib/idioma";
import type { Feito } from "@/lib/content";
import type { MediaFile } from "@/lib/media";
import { gsap, useGSAP } from "@/lib/gsap";
import MediaViewer from "./MediaViewer";
import FeitoDetalhe from "./FeitoDetalhe";
import PreviaFeito from "./PreviaFeito";

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

   ---- O card inteiro abre a ficha ----
   O texto do card é cortado no quarto verso (`line-clamp-4`) e a intro
   da seção convida a apertar cada item. Antes só a capa e o botão de
   material eram clicáveis, e como NENHUM feito tem arquivo anexado hoje
   (as pastas de `public/feitos/` estão vazias), apertar o card não fazia
   absolutamente nada. Agora o card abre o FeitoDetalhe, com o texto
   completo, e o material continua a um clique de lá.

   A área de clique é um `::after` sobre o card inteiro, o mesmo recurso
   que o Projects usa: mantém um só elemento focável por card em vez de
   aninhar botão dentro de botão. A capa fica acima dele (`z-20`) para
   continuar abrindo a galeria direto.
   ============================================================ */

type Props = {
  /* slug → arquivos, montado no build. */
  media: Record<string, MediaFile[]>;
  /* slug → capa, um quadro do meio do primeiro vídeo, gerado com ffmpeg
     em `public/feitos-capas/<slug>.webp`. Fica FORA de `public/feitos/`
     de propósito: lá dentro ela viraria mais um item da galeria. */
  capas: Record<string, string>;
};

export default function Feitos({ media, capas }: Props) {
  const { feitos, ui, projectsSection } = useConteudo();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const janelaRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [aberto, setAberto] = useState<{
    slug: string;
    title: string;
    index: number;
  } | null>(null);
  /* A ficha do feito. Guarda o grupo junto porque ele é o rótulo do topo
     e não vive dentro do próprio item. */
  const [ficha, setFicha] = useState<{ item: Feito; grupo: string } | null>(
    null
  );

  /* Não sobrou animação própria: os cabeçalhos de grupo saíram quando os
     três carrosséis viraram um, e a entrada dos cards é do <Carousel>. */

  const arquivos = aberto ? media[aberto.slug] ?? [] : [];

  const total = feitos.groups.reduce((n, g) => n + g.items.length, 0);

  /* FAIXA HORIZONTAL PRESA AO SCROLL (26/11/2026), o mesmo esquema dos
     Projetos, a pedido dele: a seção fica parada e o scroll vertical vira
     o X da pista; a próxima seção só chega depois do último feito. Era um
     carrossel que andava sozinho. Sem movimento (reduced-motion), a pista
     vira faixa com scroll lateral nativo. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const janela = janelaRef.current!;
        /* Mesma regra dos Projetos (27/11/2026): a pista corre dentro da
           largura útil do .shell, e não da tela inteira, e esfuma só do
           lado em que ainda há card escondido. Ver Projects.tsx. */
        const distancia = () => Math.max(0, track.scrollWidth - janela.clientWidth);
        const FADE = 72;
        const esfumar = (progresso: number) => {
          janela.style.setProperty("--fl", `${Math.min(1, progresso * 12) * FADE}px`);
          janela.style.setProperty("--fr", `${Math.min(1, (1 - progresso) * 12) * FADE}px`);
        };
        esfumar(0);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distancia()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => esfumar(self.progress),
          },
        });
        tl.to(track, { x: () => -distancia(), ease: "none" }, 0);
        tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="cargo-atual"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden border-t border-bone/10 py-10 motion-reduce:py-32"
    >
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <div className="max-w-2xl">
          <span className="mono-label">
            {feitos.label} · {total.toString().padStart(2, "0")}
          </span>
          <h2 className="display mt-3 text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02]">
            {feitos.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone-dim sm:text-base">
            {feitos.intro}
          </p>
        </div>
        <p className="mono-label flex items-center gap-3 motion-reduce:hidden">
          {projectsSection.scrollHint}
          <span aria-hidden="true" className="inline-block animate-pulse">→</span>
        </p>
      </div>

      <div className="shell mt-8 w-full">
        <div
          ref={janelaRef}
          className="overflow-hidden motion-reduce:overflow-x-auto motion-reduce:pb-6"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0, #000 var(--fl, 0px), #000 calc(100% - var(--fr, 0px)), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 var(--fl, 0px), #000 calc(100% - var(--fr, 0px)), transparent 100%)",
          }}
        >
      <ul
        ref={trackRef}
        aria-label={feitos.title}
        className="flex w-max gap-5 will-change-transform lg:gap-7"
      >
        {feitos.groups.flatMap((grupo) =>
          grupo.items.map((item) => {
            const files = media[item.slug] ?? [];
            const capa = files.find((f) => f.kind === "image");
            const video = files.find((f) => f.kind === "video");

            return (
              <li
                key={item.slug}
                className="group relative flex w-[82vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-plasma/50 sm:w-[60vw] lg:w-[36vw] xl:w-[28rem] [@media(max-height:820px)]:lg:w-[24rem]"
              >
                <PreviaFeito
                  capa={capa?.src ?? capas[item.slug] ?? null}
                  video={video?.src ?? null}
                  title={item.title}
                  onOpen={() => setFicha({ item, grupo: grupo.group })}
                />

                <div className="flex flex-1 flex-col p-5 lg:p-6">
                  <span className="mono-label">{grupo.group}</span>

                  <h3 className="display mt-2 text-xl leading-tight lg:text-2xl">
                    {/* O `::after` cobre o card inteiro: abre a ficha. */}
                    <button
                      type="button"
                      onClick={() => setFicha({ item, grupo: grupo.group })}
                      className="text-left transition-colors duration-500 after:absolute after:inset-0 after:z-10 after:content-[''] group-hover:text-plasma"
                    >
                      {item.title}
                    </button>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-bone-dim">
                    {item.body}
                  </p>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-20 mt-auto pt-5">
                    {files.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => setFicha({ item, grupo: grupo.group })}
                        className="mono-label inline-flex items-center gap-3 rounded-full border border-bone/20 px-4 py-2 transition-colors duration-500 hover:border-plasma hover:text-plasma"
                      >
                        {feitos.mediaLabel}
                        <span aria-hidden="true">
                          {files.length} {ui.itens[files.length === 1 ? 0 : 1]}
                        </span>
                      </button>
                    ) : (
                      <span className="mono-label opacity-60">{feitos.mediaEmpty}</span>
                    )}
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
        </div>
      </div>

      <div className="shell mt-8 motion-reduce:hidden">
        <div className="h-px w-full bg-bone/12">
          <span ref={barRef} className="block h-full w-full origin-left bg-plasma" />
        </div>
      </div>

      {ficha && (
        <FeitoDetalhe
          feito={ficha.item}
          grupo={ficha.grupo}
          arquivos={media[ficha.item.slug] ?? []}
          onClose={() => setFicha(null)}
          /* Imagem ampliada: abre o visualizador por cima da ficha. Vídeo
             não passa por ele, toca dentro da própria ficha. */
          onImagem={(index) =>
            setAberto({ slug: ficha.item.slug, title: ficha.item.title, index })
          }
        />
      )}

      {aberto && arquivos.length > 0 && (
        <MediaViewer
          files={arquivos}
          index={aberto.index}
          title={aberto.title}
          onClose={() => setAberto(null)}
          onIndex={(i) => setAberto({ ...aberto, index: i })}
          rotuloFechar={ui.fechar}
        />
      )}
    </section>
  );
}
