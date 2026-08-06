"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { nav, site } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

/* Barra que some ao descer e volta ao subir. O gatilho é a direção do
   scroll, não a posição: esconder por posição faz a barra piscar toda
   vez que o usuário passa pelo limiar. */

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const show = gsap.to(el, {
      yPercent: -140,
      opacity: 0,
      duration: 0.45,
      ease: "power2.inOut",
      paused: true,
    });

    const st = ScrollTrigger.create({
      start: "top -120",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === 1) show.play();
        else show.reverse();
      },
    });

    return () => {
      st.kill();
      show.kill();
    };
  }, []);

  return (
    <nav
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 hidden md:block"
      aria-label="Navegação principal"
    >
      {/* Grade de três colunas, com os controles ocupando a terceira: a
          pílula fica no centro da tela, não no centro do espaço que
          sobra ao lado da logo. */}
      <div className="shell grid grid-cols-[1fr_auto_1fr] items-center py-5">
        {/* Logo e botão de tema ganham a mesma pílula da lista de links.
            A barra é fixa e começa sobre o vídeo escuro do hero: no tema
            claro, texto escuro solto ali sumiria. Sobre a pílula — que
            acompanha o tema — o contraste é o mesmo em qualquer fundo. */}
        <a
          href="#hero"
          className="display justify-self-start rounded-full border border-bone/12 bg-ink-2/60 px-4 py-1.5 text-lg tracking-tight backdrop-blur-xl transition-colors hover:text-plasma"
        >
          {site.name.split(" ")[0]}
          <span className="text-plasma">*</span>
        </a>

        <ul className="flex items-center gap-1 rounded-full border border-bone/12 bg-ink-2/60 px-2 py-1.5 backdrop-blur-xl">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative block rounded-full px-4 py-1.5 text-[0.8rem] text-bone-dim transition-colors hover:text-bone"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="justify-self-end rounded-full border border-bone/12 bg-ink-2/60 p-1 backdrop-blur-xl">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
