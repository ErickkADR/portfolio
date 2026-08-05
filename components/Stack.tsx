"use client";

import { useRef, type ReactNode } from "react";
import {
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandPython,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandGit,
  IconBrandGithub,
  IconBrandNotion,
  IconBrandWindows,
  IconBrandSupabase,
  IconBrandPowershell,
  IconBrandAdobe,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stack } from "@/lib/content";
import RevealText from "./RevealText";

/* Linguagens e ferramentas na mesma seção, cada uma com a sua logo.

   As logos vêm do @tabler/icons-react, que já era dependência do dock
   no celular — nenhum pacote novo, nenhum SVG baixado de CDN (o export
   é estático e não pode depender de rede em runtime).

   Quem não tem ícone de marca pronto (n8n, Callbell, ElevenLabs, os
   softwares de equipamento) cai no monograma: as iniciais dentro do
   mesmo ladrilho. O resultado fica uniforme em vez de virar uma parede
   com buracos. */

const LOGOS: Record<string, ReactNode> = {
  javascript: <IconBrandJavascript />,
  typescript: <IconBrandTypescript />,
  html: <IconBrandHtml5 />,
  css: <IconBrandCss3 />,
  python: <IconBrandPython />,
  react: <IconBrandReact />,
  nextjs: <IconBrandNextjs />,
  tailwind: <IconBrandTailwind />,
  git: <IconBrandGit />,
  github: <IconBrandGithub />,
  notion: <IconBrandNotion />,
  windows: <IconBrandWindows />,
  supabase: <IconBrandSupabase />,
  powershell: <IconBrandPowershell />,
  adobe: <IconBrandAdobe />,
  google: <IconBrandGoogle />,
};

/* Monograma: até duas letras. "Claude Code" vira CC, "n8n" vira N8. */
function monograma(nome: string) {
  const palavras = nome.split(/[\s.]+/).filter(Boolean);
  if (palavras.length > 1) {
    return (palavras[0][0] + palavras[1][0]).toUpperCase();
  }
  return nome.slice(0, 2).toUpperCase();
}

export default function Stack() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Os segmentos crescem a partir da esquerda, em cascata: a barra
        // se "desenha" da maior para a menor fatia.
        const bars = gsap.from(".lang-seg", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".lang-bar", start: "top 85%", once: true },
        });

        /* As logos entram girando de leve e crescendo — é o gesto que dá
           vida à parede sem cada ladrilho pedir atenção sozinho. Um
           trigger por grupo, porque a seção é mais alta que a tela. */
        const grupos = gsap.utils
          .toArray<HTMLElement>(".stack-col")
          .map((col) =>
            gsap.from(col.querySelectorAll(".stack-tile"), {
              y: 24,
              scale: 0.86,
              opacity: 0,
              duration: 0.7,
              ease: "back.out(1.6)",
              stagger: 0.045,
              scrollTrigger: { trigger: col, start: "top 90%", once: true },
            })
          );

        return () => {
          bars.kill();
          grupos.forEach((t) => t.kill());
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="stack"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      <div className="shell shell-narrow">
        <div className="section-head">
          <span className="mono-label">{stack.label}</span>

          <RevealText
            as="h2"
            className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
          >
            {stack.title}
          </RevealText>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-bone-dim">
            {stack.intro}
          </p>
        </div>

        {/* ---------- barra medida ---------- */}
        <div className="mt-20">
          <p className="mono-label text-center">{stack.barLabel}</p>

          <div className="lang-bar mt-5 flex h-3 w-full gap-1 overflow-hidden rounded-full">
            {stack.measured.map((l) => (
              <div
                key={l.name}
                className="lang-seg h-full rounded-full"
                style={{
                  // O mínimo de 1.5% mantém a fatia do TypeScript (0,8%)
                  // visível; sem isso ela vira um fio de um pixel.
                  width: `${Math.max(l.pct, 1.5)}%`,
                  background: l.color,
                }}
                title={`${l.name} — ${l.pct}%`}
              />
            ))}
          </div>

          <ul className="mt-5 flex flex-wrap justify-center gap-x-7 gap-y-2">
            {stack.measured.map((l) => (
              <li key={l.name} className="flex items-center gap-2 text-sm">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: l.color }}
                />
                <span>{l.name}</span>
                <span className="text-bone-dim">{l.pct}%</span>
              </li>
            ))}
          </ul>

          <p className="mono-label mt-5 text-center">{stack.note}</p>
        </div>

        {/* ---------- parede de logos ---------- */}
        <div className="mt-20 space-y-16">
          {stack.groups.map((group) => (
            <div key={group.group} className="stack-col">
              <h3 className="mono-label text-center text-plasma">
                {group.group}
              </h3>

              <ul
                className={`mx-auto mt-8 grid gap-4 ${
                  group.wide
                    ? "grid-cols-2 sm:grid-cols-3"
                    : "max-w-3xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                }`}
              >
                {group.items.map((item) => {
                  const logo = item.icon ? LOGOS[item.icon] : null;

                  return (
                    <li
                      key={item.name}
                      className="stack-tile group/tile flex flex-col items-center gap-3 rounded-2xl border border-bone/12 bg-ink-2 p-6 text-center transition-colors duration-500 hover:border-plasma/50 hover:bg-ink-3"
                    >
                      <span
                        aria-hidden="true"
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-110 [&>svg]:h-7 [&>svg]:w-7"
                        style={{
                          color: item.color ?? "var(--color-plasma-soft)",
                          background: `color-mix(in oklab, ${
                            item.color ?? "var(--color-plasma)"
                          } 14%, transparent)`,
                        }}
                      >
                        {logo ?? (
                          <span className="display text-sm tracking-tight">
                            {monograma(item.name)}
                          </span>
                        )}
                      </span>

                      <span className="text-sm leading-snug">{item.name}</span>

                      {item.pct !== undefined && (
                        <span className="mono-label">{item.pct}%</span>
                      )}

                      {item.note && (
                        <span className="text-xs leading-relaxed text-bone-dim">
                          {item.note}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
