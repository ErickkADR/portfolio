"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { asset } from "@/lib/asset";

/* ============================================================
   FOTO COM REVELAÇÃO LÍQUIDA

   Duas imagens empilhadas e recortadas em `cover`. A de cima é a foto;
   a de baixo aparece dentro de uma mancha líquida que segue o cursor.

   ---- Por que SVG e não `mask-image` do CSS ----
   Uma máscara CSS aceita um `radial-gradient`, mas nada além disso: não
   dá para passar filtro no conteúdo da máscara. E é justamente o filtro
   que faz o líquido. Dentro de um `<mask>` SVG, o conteúdo é um
   elemento de verdade e pode ser filtrado.

   ---- Como o líquido acontece (metaballs) ----
   A máscara tem QUATRO círculos, não um. Todos perseguem o cursor, mas
   cada um com um atraso diferente — então, quando o cursor anda, eles
   se espalham em fila; quando ele para, se recolhem um sobre o outro.

   O filtro `goo` (borrar + estourar o alfa no `feColorMatrix`) faz esses
   círculos se FUNDIREM em vez de se sobreporem: a borda entre dois
   círculos próximos vira um pescoço curvo, como duas gotas se juntando.
   É daí que vem a sensação de líquido — o rastro estica a mancha e ela
   se recompõe num círculo quando o movimento cessa.

   As gotas ainda "respiram" (escala em laço, cada uma num compasso),
   para a silhueta nunca ficar um círculo parado enquanto o cursor está
   imóvel.

   ---- Sem cursor não há hover ----
   Em tela de toque a mancha não faz sentido: não existe posição de
   ponteiro. Ali (e em `prefers-reduced-motion`) o componente cai para o
   modo simples — as mesmas duas imagens, trocadas por fade. No toque a
   troca é por botão; no desktop com movimento reduzido, no hover.
   ============================================================ */

/* Raio de cada gota, em fração do raio principal. */
const RAIOS = [1, 0.72, 0.52, 0.34];
/* Atraso de cada uma até alcançar o cursor, em segundos. É a diferença
   entre elas que estica o rastro — se fossem iguais, andariam coladas e
   a mancha seria um círculo rígido. */
const ATRASOS = [0.16, 0.28, 0.42, 0.6];

/* O raio principal acompanha o MENOR lado do quadro, com teto e piso.

   Pelo maior lado, numa seção de tela cheia (1600px de largura), a
   mancha saía com 448px de raio: ela virava a imagem inteira trocada, e
   o efeito deixava de ser uma revelação para virar um crossfade. O
   menor lado (a altura, aqui) mantém a proporção de "lupa" em qualquer
   tela, e o clamp impede tanto o furo de agulha no celular quanto o
   rombo em monitor ultrawide. */
const FRACAO_RAIO = 0.11;
const RAIO_MIN = 55;
const RAIO_MAX = 120;

/* A ÁREA QUE A IMAGEM OCUPA, e que a máscara tem de acompanhar.

   No desktop é o bloco inteiro — a foto é o fundo da seção. No celular
   é só a FAIXA DE CIMA: lá o texto não fica sobre a imagem, fica abaixo
   dela, num bloco preto opaco. Esticar a imagem por trás desse bloco
   parece inofensivo mas destrói o enquadramento: o `object-cover`
   passaria a preencher uma caixa de 390×2000, e a 11% da largura da
   foto que sobrariam visíveis na faixa seriam a borda do cabelo, não o
   rosto. A altura aqui é a mesma do espaçador em Sobre.tsx — mexeu numa,
   mexe na outra.

   O ancoramento em esquerda/topo (`object-left-top` no CSS, `xMinYMin`
   no SVG) garante que nenhuma proporção de tela corte a cabeça: as duas
   fotos têm o sujeito no alto à esquerda, então o que sobra do corte é
   sempre fundo. */
const AREA = "absolute inset-x-0 top-0 h-[56svh] w-full lg:h-full";
const ENCAIXE = `${AREA} object-cover object-left-top`;

type Props = {
  /* Caminhos dentro de public/ — quem monta o prefixo é o asset(). */
  base: string;
  reveal: string;
  alt: string;
  revealAlt: string;
  /* Aviso de que a imagem reage ao mouse. Some no primeiro hover. */
  hint: string;
  /* Rótulos do botão no toque: [mostrar, voltar]. */
  tapLabels: [string, string];
  className?: string;
  /* O conteúdo que fica POR CIMA das duas imagens — é ele que dá altura
     ao bloco, já que as imagens são absolutas. Precisa estar aqui
     dentro, e não ao lado: assim o `pointermove` dos filhos borbulha
     até a raiz e a mancha continua seguindo o cursor mesmo quando ele
     passa sobre o texto. */
  children?: React.ReactNode;
};

export default function PhotoReveal({
  base,
  reveal,
  alt,
  revealAlt,
  hint,
  tapLabels,
  className = "",
  children,
}: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const gotas = useRef<SVGCircleElement[]>([]);

  const [toque, setToque] = useState(false);
  const [reduzido, setReduzido] = useState(false);
  const [aberto, setAberto] = useState(false);

  const simples = toque || reduzido;

  /* Dois PhotoReveal na mesma página dividiriam a máscara se o id fosse
     fixo — o segundo apagaria o primeiro. O `useId` resolve; a limpeza é
     porque ele devolve caracteres (`:` no React 18, `«»` no 19) que não
     sobrevivem dentro de `url(#...)`. */
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const idMascara = `pr-mask-${uid}`;
  const idGoo = `pr-goo-${uid}`;

  /* Os dois modos são decididos no cliente: no HTML do build não há
     ponteiro nem preferência de movimento para consultar. */
  useEffect(() => {
    const ponteiro = window.matchMedia("(pointer: coarse)");
    const movimento = window.matchMedia("(prefers-reduced-motion: reduce)");

    const ler = () => {
      setToque(ponteiro.matches);
      setReduzido(movimento.matches);
    };
    ler();

    ponteiro.addEventListener("change", ler);
    movimento.addEventListener("change", ler);
    return () => {
      ponteiro.removeEventListener("change", ler);
      movimento.removeEventListener("change", ler);
    };
  }, []);

  useGSAP(
    () => {
      if (simples) return;
      const el = raiz.current;
      const alvos = gotas.current.filter(Boolean);
      if (!el || alvos.length === 0) return;

      gsap.set(alvos, { attr: { r: 0 }, xPercent: 0, yPercent: 0 });

      /* `quickTo` e não `gsap.to` a cada `pointermove`: o move dispara
         dezenas de vezes por segundo e criar um tween novo em cada um
         seria jogar fora um objeto por evento. O quickTo reaproveita o
         mesmo tween e só troca o destino. */
      const paraX = alvos.map((gota, i) =>
        gsap.quickTo(gota, "x", { duration: ATRASOS[i], ease: "power3" })
      );
      const paraY = alvos.map((gota, i) =>
        gsap.quickTo(gota, "y", { duration: ATRASOS[i], ease: "power3" })
      );

      /* Respiração contínua. `overwrite` fica em "auto" nos tweens de
         raio justamente para não matar estes aqui: são propriedades
         diferentes (scale × attr.r) e devem conviver. */
      const respiro = alvos.map((gota, i) =>
        gsap.to(gota, {
          scale: 0.84,
          duration: 1.4 + i * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "center",
        })
      );

      const raio = () =>
        gsap.utils.clamp(
          RAIO_MIN,
          RAIO_MAX,
          Math.min(el.clientWidth, el.clientHeight) * FRACAO_RAIO
        );

      const mirar = (e: PointerEvent, colar = false) => {
        const caixa = el.getBoundingClientRect();
        const x = e.clientX - caixa.left;
        const y = e.clientY - caixa.top;

        // Ao entrar, as gotas nascem já sob o cursor: deixá-las voarem
        // do centro até ele daria uma entrada de foguete, não de gota.
        if (colar) gsap.set(alvos, { x, y });

        alvos.forEach((_, i) => {
          paraX[i](x);
          paraY[i](y);
        });
      };

      /* Aberto/fechado é controlado aqui, e NÃO deduzido do
         `pointerenter`. O enter é traiçoeiro: ele não dispara quando o
         cursor já estava parado sobre a área (a seção rolou por baixo
         dele) nem quando o ponteiro desce de um elemento fixo que está
         por cima, como o menu. Nesses casos chegava `pointermove` sem
         `pointerenter`, e a mancha ficava com raio 0 — o efeito
         simplesmente não existia até a pessoa sair e voltar. */
      let aberta = false;

      const abrir = () => {
        if (aberta) return;
        aberta = true;
        const r = raio();
        alvos.forEach((gota, i) => {
          gsap.to(gota, {
            attr: { r: r * RAIOS[i] },
            duration: 0.75,
            delay: i * 0.04,
            // O elástico é o "plop" da gota caindo — sem ele a mancha
            // só incha, e incha parecendo um zoom.
            ease: "elastic.out(1, 0.75)",
            overwrite: "auto",
          });
        });
      };

      const sair = () => {
        aberta = false;
        gsap.to(alvos, {
          attr: { r: 0 },
          duration: 0.45,
          ease: "power3.in",
          overwrite: "auto",
        });
      };

      const entrar = (e: PointerEvent) => {
        mirar(e, true);
        abrir();
      };

      const mover = (e: PointerEvent) => {
        // Primeiro movimento sem enter: cola as gotas no cursor antes de
        // abrir, senão elas nascem no canto e voam até ele.
        mirar(e, !aberta);
        abrir();
      };

      el.addEventListener("pointerenter", entrar);
      el.addEventListener("pointermove", mover);
      el.addEventListener("pointerleave", sair);
      el.addEventListener("pointercancel", sair);

      return () => {
        el.removeEventListener("pointerenter", entrar);
        el.removeEventListener("pointermove", mover);
        el.removeEventListener("pointerleave", sair);
        el.removeEventListener("pointercancel", sair);
        respiro.forEach((t) => t.kill());
      };
    },
    { scope: raiz, dependencies: [simples], revertOnUpdate: true }
  );

  /* Onde o aviso/botão pousa:

     - celular: alto à direita, sobre o fundo vazio da foto (embaixo é a
       coluna de texto);
     - desktop: pé da PRIMEIRA tela, não do bloco. A seção é mais alta
       que a janela — ancorado em `bottom-8` o aviso caía fora do campo
       de visão de quem acabou de chegar nela, que é exatamente quem
       precisa dele. */
  const cantoAviso =
    "absolute right-5 top-5 z-20 lg:left-8 lg:right-auto lg:top-[calc(100svh-5rem)]";

  /* ---------- modo simples: fade, sem mancha ---------- */
  if (simples) {
    return (
      <div className={`group relative overflow-hidden ${className}`}>
        <img
          src={asset(reveal)}
          alt={revealAlt}
          loading="lazy"
          decoding="async"
          draggable={false}
          className={ENCAIXE}
        />

        <img
          src={asset(base)}
          alt={alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={aberto ? { opacity: 0 } : undefined}
          className={`${ENCAIXE} transition-opacity duration-700 group-hover:opacity-0`}
        />

        {/* No toque não existe hover: sem este botão, a segunda imagem
            ficaria inalcançável no celular. */}
        {toque && (
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-pressed={aberto}
            className={`mono-label rounded-full border border-bone/25 bg-ink/80 px-3 py-1.5 backdrop-blur-md transition-colors hover:border-plasma hover:text-plasma ${cantoAviso}`}
          >
            {aberto ? tapLabels[1] : tapLabels[0]}
          </button>
        )}

        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  /* ---------- modo líquido ---------- */
  return (
    <div ref={raiz} className={`group relative overflow-hidden ${className}`}>
      <img
        src={asset(base)}
        alt={alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={ENCAIXE}
      />

      {/* Sem `viewBox`: assim uma unidade do SVG é um pixel do quadro, e
          a posição do cursor entra nos círculos sem conversão nenhuma.
          `pointer-events-none` para o SVG não roubar os eventos de quem
          está ouvindo o ponteiro — o container. */}
      <svg
        role="img"
        aria-label={revealAlt}
        className={`pointer-events-none ${AREA}`}
      >
        <defs>
          <filter
            id={idGoo}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="borrado" />
            {/* O alfa é multiplicado por 24 e puxado de volta em -11: o
                degradê do blur vira quase binário, e é esse corte que
                cola as gotas numa massa só em vez de deixá-las
                translúcidas uma sobre a outra. */}
            <feColorMatrix
              in="borrado"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11"
            />
          </filter>

          <mask id={idMascara}>
            <g filter={`url(#${idGoo})`}>
              {RAIOS.map((_, i) => (
                <circle
                  key={i}
                  ref={(node) => {
                    if (node) gotas.current[i] = node;
                  }}
                  cx="0"
                  cy="0"
                  r="0"
                  fill="#fff"
                />
              ))}
            </g>
          </mask>
        </defs>

        {/* `slice` é o `object-fit: cover` do SVG, e `xMin` ancora à
            esquerda — o mesmo enquadramento da foto de baixo, para as
            duas coincidirem pixel a pixel dentro da mancha. */}
        <image
          href={asset(reveal)}
          width="100%"
          height="100%"
          preserveAspectRatio="xMinYMin slice"
          mask={`url(#${idMascara})`}
        />
      </svg>

      <span
        className={`mono-label pointer-events-none rounded-full bg-ink/70 px-3 py-1 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-0 ${cantoAviso}`}
      >
        {hint}
      </span>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
