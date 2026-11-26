"use client";

import { useEffect, useRef, useState } from "react";
import {
  IconSchool,
  IconCertificate,
  IconDeviceDesktopCode,
  IconBook2,
} from "@tabler/icons-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useConteudo } from "@/lib/idioma";
import RevealText from "./RevealText";
import CardSwap, { Card } from "./CardSwap";
import { asset } from "@/lib/asset";

/* Ícone pequeno por tipo de formação — bolsa, curso técnico, graduação.
   `IconBook2` é o padrão para um tipo que ainda não foi mapeado, para a
   moldura nunca ficar vazia. */
function IconeFormacao({ tipo }: { tipo?: string }) {
  if (tipo === "escola") return <IconSchool />;
  if (tipo === "tecnico") return <IconDeviceDesktopCode />;
  if (tipo === "graduacao") return <IconCertificate />;
  return <IconBook2 />;
}

/* AS TRÊS FORMAÇÕES SÃO UM BARALHO QUE SE TROCA SOZINHO (CardSwap), a
   pedido dele em 18/08/2026. Antes eram três cartões empilhados na
   vertical, um embaixo do outro: a informação estava lá, mas a seção era
   a mais parada da página.

   O cabeçalho saiu do centro e foi para a esquerda: com o baralho na
   coluna da direita, um título centralizado brigaria com ele pelo eixo.

   As três vieram por bolsa conquistada pela nota, nenhuma paga com
   mensalidade — é o que o selo no topo de cada carta mostra de relance.

   ---- As medidas vêm da largura da janela, não de breakpoint CSS ----
   O CardSwap recebe largura e altura em número (as cartas são
   absolutas, e é o container que define o quadro), então não há como
   resolver isso com classe do Tailwind. Enquanto a janela não foi medida
   (primeiro render, no servidor), o lugar fica reservado por um bloco da
   altura certa: sem isso a seção pula de altura na hidratação. */

/* Inclinação das cartas, em graus. Vive aqui porque a folga da moldura
   depende dela — ver `folgaSkew`. */
const SKEW = 5;

/* O `dy` precisa ser MAIOR que a distância do topo da carta até a linha
   do ano (o `p-7`, 28px, mais a altura da linha). Com 58 a carta de trás
   assomava exatamente na borda da carta da frente e o ano dela aparecia
   pela metade — lido como corte, não como baralho. */
const MEDIDAS = {
  /* +90px de altura desde 26/11/2026: a faixa da logo no topo. */
  pequeno: { w: 268, h: 440, dx: 26, dy: 44, drop: 480 },
  medio: { w: 340, h: 500, dx: 40, dy: 60, drop: 560 },
  grande: { w: 430, h: 570, dx: 52, dy: 76, drop: 650 },
};

function medidaPara(largura: number) {
  if (largura < 480) return MEDIDAS.pequeno;
  if (largura < 1024) return MEDIDAS.medio;
  return MEDIDAS.grande;
}

type Props = {
  /* slug → caminho, de public/formacao/, montado no build. */
  logos: Record<string, string>;
};

export default function Formacao({ logos }: Props) {
  const { background } = useConteudo();
  const ref = useRef<HTMLElement>(null);
  const [largura, setLargura] = useState<number | null>(null);

  useEffect(() => {
    const ler = () => setLargura(window.innerWidth);
    ler();
    window.addEventListener("resize", ler);
    return () => window.removeEventListener("resize", ler);
  }, []);

  const medida = medidaPara(largura ?? 1280);

  /* A CONTA DA MOLDURA, e por que ela precisa de um deslocamento.

     Cada carta é posicionada no CENTRO do container e depois empurrada
     para o slot dela: a de índice i vai para (i*dx, -i*dy). Ou seja, o
     baralho cresce para a DIREITA e para CIMA a partir do centro, e
     nunca para a esquerda nem para baixo.

     Então a caixa que contém tudo mede:
       largura = w + dx * (n - 1)
       altura  = h + dy * (n - 1)
     e o centro dela NÃO é o centro do container: está deslocado
     (dx*(n-1)/2) à direita e (dy*(n-1)/2) acima.

     Foi esse deslocamento que faltou na primeira versão. A moldura tinha
     o tamanho certo mas o container ficava centralizado nela, então a
     carta de trás vazava pelo topo e pela direita e aparecia cortada. O
     `translate` abaixo empurra o baralho de volta para dentro. */
  const extraX = medida.dx * (background.items.length - 1);
  const extraY = medida.dy * (background.items.length - 1);

  /* FOLGA PARA A INCLINAÇÃO. As cartas entram com `skewY`, e um skew em Y
     desloca cada ponto verticalmente em proporção ao x dele: y' = y +
     x·tan(a). Nas bordas esquerda e direita da carta isso vale
     tan(5°) · (w/2), que numa carta de 430px dá ~19px para cada lado.

     Sem essa folga a conta fecha no papel e os CANTOS aparecem cortados,
     que foi exatamente o que ele viu depois da primeira correção. */
  const folgaSkew = Math.ceil(Math.tan((SKEW * Math.PI) / 180) * (medida.w / 2));

  const larguraMoldura = medida.w + extraX + 8;
  const alturaMoldura = medida.h + extraY + folgaSkew * 2 + 8;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* A entrada dos cartões saiu junto com a grade: o CardSwap
           posiciona as cartas por conta própria com `gsap.set`, e um
           `from` de opacidade/posição por cima disso brigava pelo mesmo
           transform e deixava a carta da frente fora de lugar.

           Sobrou a flutuação dos ícones. O `each` no stagger dessincroniza
           os três: subindo juntos pareceriam um bloco só se mexendo, e o
           efeito de "vida" vem justamente de estarem em fases diferentes. */
        const flutua = gsap.to(".formacao-icone", {
          y: -5,
          rotate: 4,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.45, from: "start" },
        });

        return () => flutua.kill();
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="formacao"
      className="border-t border-bone/10 py-32 sm:py-44"
    >
      {/* `shell` largo e não `shell-narrow`: com o baralho numa coluna, a
          coluna de leitura de 68rem deixava metade da seção vazia. */}
      <div className="shell">
        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 xl:gap-24">
          {/* ---------- cabeçalho ---------- */}
          <div className="max-w-2xl">
            <span className="mono-label">{background.label}</span>

            <RevealText
              as="h2"
              className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]"
            >
              {background.title}
            </RevealText>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
              {background.intro}
            </p>

            {/* Os anos em fila: o baralho mostra uma carta por vez, e sem
                isso não há como saber de relance que período a seção
                cobre. */}
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {background.items.map((item) => (
                <li key={item.period} className="mono-label">
                  {item.period}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- o baralho ----------
              `overflow-hidden` na moldura de propósito: a carta da frente
              cai para fora do quadro antes de voltar para o fim da fila, e
              é justamente sair de vista que faz a troca ler como troca.
              Sem o clipe, ela desce por cima da seção seguinte. */}
          <div
            className="relative mx-auto mt-16 flex items-center justify-center overflow-hidden lg:mt-0"
            style={{ height: alturaMoldura, width: larguraMoldura }}
          >
            {largura !== null && (
              /* O deslocamento que recentraliza o baralho na moldura.
                 Ver a conta acima. */
              <div
                style={{
                  transform: `translate(${-extraX / 2}px, ${extraY / 2}px)`,
                }}
              >
              <CardSwap
                width={medida.w}
                height={medida.h}
                cardDistance={medida.dx}
                verticalDistance={medida.dy}
                dropDistance={medida.drop}
                delay={4200}
                pauseOnHover
                skewAmount={SKEW}
              >
                {background.items.map((item) => (
                  <Card
                    key={item.title}
                    className="group flex flex-col justify-between overflow-hidden p-7 transition-colors duration-500 hover:border-plasma/40"
                  >
                    {/* Fio na cor de acento que se estende no hover, mesmo
                        gesto dos outros cartões do site. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-plasma transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />

                    <div>
                      {/* A LOGO DA INSTITUIÇÃO, numa faixa no topo da carta.
                          Vem de public/formacao/<logo>.png (lista montada no
                          build); sem arquivo, a faixa mostra o ícone. */}
                      <div className="-mx-7 -mt-7 mb-6 grid h-24 place-items-center border-b border-bone/10 bg-bone px-7">
                        {item.logo && logos[item.logo] ? (
                          <img
                            src={asset(logos[item.logo])}
                            alt={item.title}
                            draggable={false}
                            className="formacao-icone max-h-16 max-w-[70%] object-contain"
                          />
                        ) : (
                          <span className="formacao-icone text-plasma [&>svg]:h-9 [&>svg]:w-9">
                            <IconeFormacao tipo={item.icon} />
                          </span>
                        )}
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className="display text-[clamp(1.5rem,2.6vw,2rem)] leading-none text-plasma">
                          {item.period}
                        </span>

                      </div>

                      <span className="mono-label mt-5 inline-block rounded-full border border-plasma/30 px-3 py-1 text-plasma-soft">
                        {item.highlight}
                      </span>

                      <h3 className="display mt-4 text-xl leading-tight">
                        {item.title}
                      </h3>

                      <p className="mono-label mt-2">{item.meta}</p>
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-bone-dim">
                      {item.body}
                    </p>
                  </Card>
                ))}
                </CardSwap>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
