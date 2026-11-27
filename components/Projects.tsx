"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useConteudo } from "@/lib/idioma";
import { asset } from "@/lib/asset";
import { site } from "@/lib/content";
import { LinhaCorte } from "./Prova";

/* ============================================================
   PROJETOS — faixa horizontal presa ao scroll (26/11/2026).

   Pedido dele: ao rolar para baixo, os projetos passam na horizontal, e
   só depois de ver todos a pessoa chega na próxima seção. É um `pin` do
   ScrollTrigger: a seção fica parada na tela e o scroll vertical vira o
   deslocamento X da pista. A distância do pin é exatamente o quanto a
   pista é mais larga que a janela, então a saída acontece no último card.

   O que muda em relação ao carrossel antigo:
   - o card mostra a capa SEMPRE (antes o texto só aparecia no hover, e
     no celular nunca aparecia);
   - no fim da pista entra um card "Mais no GitHub", que dá destino a
     quem chegou até ali.

   Sem movimento (prefers-reduced-motion) não há pin: a pista vira uma
   faixa com scroll lateral nativo, e nada fica escondido.

   O Lenis já repassa o scroll ao ScrollTrigger (SmoothScroll.tsx), então
   o scrub acompanha a rolagem suave sem tranco.
   ============================================================ */

export default function Projects() {
  const { projects, projectsSection } = useConteudo();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const janelaRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const janela = janelaRef.current!;
        /* A pista corre dentro da JANELA (a largura útil do .shell), não da
           tela inteira: os cards respeitam a margem lateral do site. */
        const distancia = () => Math.max(0, track.scrollWidth - janela.clientWidth);

        /* Esfumaçado nas bordas da janela. Só aparece do lado em que ainda
           há card escondido: no começo a borda esquerda é seca (o primeiro
           card fica alinhado ao título), no fim é a direita. */
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
        tl.fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0
        );

      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="projetos"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden border-t border-bone/10 py-10 motion-reduce:py-32"
    >
      <div className="shell flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
        <div className="max-w-2xl">
          <span className="mono-label">
            {projects.length.toString().padStart(2, "0")} {projectsSection.countLabel}
          </span>
          <h2 className="display mt-3 text-[clamp(1.7rem,3.4vw,2.9rem)] leading-[1.02]">
            {projectsSection.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone-dim sm:text-base">
            {projectsSection.intro}
          </p>
        </div>
        <p className="mono-label flex items-center gap-3 motion-reduce:hidden">
          {projectsSection.scrollHint}
          <span aria-hidden="true" className="inline-block animate-pulse">→</span>
        </p>
      </div>

      {/* A janela: mesma largura útil do título (.shell) e corta o que
          passa dela, com o esfumaçado das variáveis --fl/--fr (ver acima).
          Antes a pista ocupava a tela de ponta a ponta e os cards passavam
          por cima da margem lateral. */}
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
        aria-label={projectsSection.carouselLabel}
        className="flex w-max gap-5 will-change-transform lg:gap-7"
      >
        {projects.map((p, i) => (
          <li
            key={p.slug}
            className="group relative flex w-[82vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-bone/12 bg-ink-2 transition-colors duration-500 hover:border-plasma/50 sm:w-[60vw] lg:w-[36vw] xl:w-[30rem] [@media(max-height:820px)]:lg:w-[25rem]"
          >
            <LinhaCorte gatilho="#projetos" atraso={Math.min(i, 4) * 0.15} />
            <div className="relative aspect-[16/9] overflow-hidden bg-ink-3">
              <img
                src={asset(p.cover.src)}
                alt={p.cover.alt}
                width={1800}
                height={1125}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              <span className="mono-label absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 backdrop-blur-md">
                {p.index}
              </span>
              {/* Filete no roxo do site, igual em todos (27/11/2026): cada
                  card tinha a cor do próprio projeto e a faixa virava um
                  arco-íris. O `tint` continua no conteúdo para a página do
                  projeto. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px bg-plasma/60"
              />
            </div>

            <div className="flex flex-1 flex-col p-5 lg:p-6">
              <span className="mono-label">
                {p.category} · {p.year}
              </span>
              <h3 className="display mt-2 text-2xl leading-tight">
                {/* O ::after cobre o card inteiro: clicar em qualquer ponto
                    abre a página do projeto. */}
                <Link
                  href={`/projetos/${p.slug}/`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-bone-dim">
                {p.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="mono-label inline-flex items-center gap-2 text-plasma">
                  {projectsSection.cta}
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </span>
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mono-label relative z-10 rounded-full border border-bone/20 px-3 py-1.5 transition-colors hover:border-plasma hover:text-plasma"
                  >
                    {projectsSection.codeLabel} ↗
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}

        {/* Fim da pista: destino para quem viu tudo. */}
        <li className="flex w-[70vw] shrink-0 flex-col justify-center rounded-2xl border border-dashed border-bone/20 p-8 sm:w-[40vw] lg:w-[24rem]">
          <span className="mono-label">GitHub</span>
          <p className="display mt-3 text-3xl leading-tight">{projectsSection.moreLabel}</p>
          <p className="mt-3 text-sm leading-relaxed text-bone-dim">{projectsSection.moreBody}</p>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            className="btn mt-8 self-start"
          >
            @ErickkADR <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
        </div>
      </div>

      <div className="shell mt-8 motion-reduce:hidden">
        <div className="h-px w-full bg-bone/12">
          <span
            ref={barRef}
            className="block h-full w-full origin-left bg-plasma"
          />
        </div>
      </div>
    </section>
  );
}
