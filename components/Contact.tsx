"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact, site } from "@/lib/content";

/* Botão magnético: o alvo se desloca em direção ao cursor dentro de um
   raio, e volta com elástica ao sair. O deslocamento é uma fração da
   distância (0.35) — puxar 1:1 faz o botão fugir do ponteiro e a pessoa
   nunca consegue clicar. */

function Magnetic({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.4)" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={className}>
      {children}
    </a>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // As linhas do título entram em cascata e ganham um parallax
        // suave enquanto a seção sobe, para o rodapé não parecer estático.
        const t = gsap.from(".contact-line", {
          yPercent: 108,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        });
        return () => t.kill();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <footer
      ref={ref}
      id="contato"
      className="relative overflow-hidden border-t border-bone/10 pt-28 sm:pt-40"
    >
      <div className="shell">
        <span className="mono-label">{contact.label}</span>

        <h2 className="display mt-6 text-[clamp(3rem,13vw,11rem)] -ml-[0.05em]">
          {contact.titleLines.map((line, i) => (
            <span key={line} className="line-mask">
              <span className="contact-line block">
                {line}
                {i === contact.titleLines.length - 1 && (
                  <span className="editorial ml-[0.12em] text-plasma">juntos</span>
                )}
              </span>
            </span>
          ))}
        </h2>

        <blockquote className="editorial mt-14 max-w-2xl text-[clamp(1.25rem,2.6vw,1.9rem)] leading-snug text-bone-dim">
          “{contact.quote}”
        </blockquote>

        <div className="mt-14 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-bone-dim">{contact.body}</p>

          <Magnetic href={`mailto:${site.email}`} className="btn self-start">
            {contact.cta}
            <span aria-hidden="true">→</span>
          </Magnetic>
        </div>

        <div className="hairline mt-24 flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono-label transition-colors hover:text-plasma"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="mono-label">
            © {site.year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
