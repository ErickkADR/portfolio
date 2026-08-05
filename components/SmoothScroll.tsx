"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* Lenis dirige o scroll da página inteira e o ScrollTrigger passa a
   ler a posição dele. Sem essa amarração os dois brigam: o ScrollTrigger
   mede o scroll nativo enquanto o Lenis anima um transform, e todo
   trigger dispara no momento errado. */

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Quem pediu menos movimento não recebe scroll com inércia.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Um único rAF para o Lenis e o GSAP: dois loops separados geram
    // um frame de defasagem entre o scroll e as animações presas a ele.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Âncoras do menu passam a usar o scroll suave.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ---------- topo a cada troca de rota ----------
     O App Router navega sem recarregar a página, e o Lenis mantém a
     própria posição de scroll num transform. O resultado era abrir o
     "próximo projeto" no meio da página, na altura em que o link tinha
     sido clicado. `immediate` porque animar até o topo de uma página que
     acabou de trocar mostra o conteúdo errado durante a viagem.

     A âncora na URL é a exceção: chegar em /#carreira tem que ir para a
     carreira, não para o topo. */
  useEffect(() => {
    if (window.location.hash) return;

    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    // A página nova tem outra altura; sem remedir, os triggers ficam
    // presos nas posições da página anterior.
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
