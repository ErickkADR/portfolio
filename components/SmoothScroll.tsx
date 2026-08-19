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

  /* ---------- para onde ir a cada troca de rota ----------

     O App Router navega sem recarregar a página, e o Lenis mantém a
     própria posição de scroll num transform. Sem isto, abrir o "próximo
     projeto" caía no meio da página, na altura em que o link tinha sido
     clicado.

     SEM ÂNCORA vai para o topo. `immediate` porque animar até o topo de
     uma página que acabou de trocar mostra o conteúdo errado durante a
     viagem.

     COM ÂNCORA vai para a seção. Antes este efeito só DESISTIA quando
     havia âncora (`if (hash) return`) e não rolava para lugar nenhum: o
     resultado é que voltar de um projeto para /#projetos deixava a página
     exatamente onde ela estava, que foi o que ele reportou.

     O `requestAnimationFrame` duplo não é superstição: no primeiro quadro
     a página nova ainda não tem o layout final (fontes, imagens e os
     `svh` do hero), e medir a posição da seção ali erra o alvo. O
     `ScrollTrigger.refresh()` vem antes da medida pelo mesmo motivo. */
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;

    const irParaTopo = () => {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };

    if (!hash) {
      irParaTopo();
      return;
    }

    /* ---------- por que UM alinhamento não basta ----------
       A primeira versão media a seção depois de dois quadros e rolava uma
       vez. Errava por milhares de pixels: a home CRESCE depois do
       primeiro layout (as imagens dos carrosséis, os PNG da parede de
       logos, o vídeo, as fontes), então o alvo desce e a posição medida
       antes fica curta. Na medida real: parou em 3361px quando a seção
       tinha ido para 8415px.

       Então o alinhamento é REPETIDO em marcos de tempo e no `load`,
       recalculando a posição a cada vez. Converge sozinho, porque cada
       correção parte da altura atual da página.

       E para quando a PESSOA assume o scroll: corrigir a posição de
       alguém que já começou a rolar é arrancar a página da mão dela. */
    const alinhar = () => {
      ScrollTrigger.refresh();
      const alvo = document.querySelector<HTMLElement>(hash);
      if (!alvo) return;
      if (lenis) lenis.scrollTo(alvo, { immediate: true, offset: 0 });
      /* Sem Lenis (movimento reduzido) o scroll é o nativo, e `auto`
         evita a animação que a pessoa pediu para não ter. */
      else alvo.scrollIntoView({ behavior: "auto", block: "start" });
    };

    let cancelado = false;
    const desistir = () => {
      cancelado = true;
    };
    /* `wheel` e `touchstart` chegam antes de qualquer scroll acontecer,
       então dão para abortar a correção seguinte em tempo. */
    window.addEventListener("wheel", desistir, { passive: true, once: true });
    window.addEventListener("touchstart", desistir, { passive: true, once: true });
    window.addEventListener("keydown", desistir, { once: true });

    const tentar = () => {
      if (!cancelado) alinhar();
    };

    const quadro = requestAnimationFrame(() => requestAnimationFrame(tentar));
    /* Os marcos cobrem os três momentos em que a altura muda: layout
       inicial, imagens acima da dobra e o resto da página. */
    const marcos = [120, 400, 900, 1600].map((ms) => window.setTimeout(tentar, ms));
    if (document.readyState !== "complete") {
      window.addEventListener("load", tentar, { once: true });
    }

    return () => {
      cancelAnimationFrame(quadro);
      marcos.forEach(window.clearTimeout);
      window.removeEventListener("wheel", desistir);
      window.removeEventListener("touchstart", desistir);
      window.removeEventListener("keydown", desistir);
      window.removeEventListener("load", tentar);
    };
  }, [pathname]);

  return null;
}
