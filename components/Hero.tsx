"use client";

import { useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useConteudo } from "@/lib/idioma";
import { getLogo } from "@/lib/logos";
import { asset } from "@/lib/asset";
import RippleDistortion from "./RippleDistortion";

/* ============================================================
   HERO — a foto é o fundo, e o hover revela a versão androide.

   Este arquivo se chamava HeroVideo e abria a página com o vídeo. O
   vídeo desceu para a seção Sobre e a foto subiu para cá. Duas razões:

   1. a primeira tela passa a mostrar QUEM ele é, e não uma peça de
      motion — o vídeo continua no site, só não é mais a porta;
   2. a revelação líquida só funciona se a pessoa a encontrar sem
      procurar, e no rodapé da página quase ninguém encontrava.

   O CUSTO DA TROCA TAMBÉM CAIU: o hero deixou de puxar 7,7 MB de vídeo
   antes de qualquer coisa. Agora são duas imagens de ~120 KB.

   ---- Por que o texto está à DIREITA ----
   A foto tem o sujeito à esquerda e o fundo vazio à direita. O bloco de
   texto ocupa esse vazio: à esquerda, como estava quando o fundo era
   vídeo, as letras caem em cima do rosto. A conta é a inversa da seção
   Sobre, onde a personagem do vídeo está à direita.

   ---- A ondulação, e a foto de baixo ----
   O efeito de mouse é o RippleDistortion (WebGL, ogl): a superfície da
   foto ondula onde o ponteiro passa. Substituiu a máscara líquida do
   PhotoReveal, mas NÃO substituiu o que ela mostrava: a versão androide
   continua ali, revelada dentro da onda em vez de dentro de um buraco de
   borda dura. Quem decide a troca é a intensidade do deslocamento, então
   a revelação acompanha a água.

   ---- `fit="contain"`, e não cover ----
   A foto é 16:9 (2048x1152) e o hero é uma tela cheia, de proporção
   qualquer. Cobrindo, o corte come as bordas e a composição (ele à
   esquerda, vazio à direita) deixa de fechar. Em `contain` a imagem
   aparece INTEIRA, na proporção real, e a faixa que sobra é `ink`, a
   mesma cor da página, então ela não lê como moldura.

   No celular a imagem não tenta preencher a tela: fica numa faixa 16:9
   no topo, com o texto abaixo dela sobre o preto. Sobrepor sete linhas
   de título a uma foto de 390px de largura não tem saída boa.
   ============================================================ */

type Props = {
  /* Caminhos em public/, ou null se o arquivo não existe. A varredura da
     pasta acontece no Server Component da página (node:fs não existe no
     navegador) e desce como prop. Ver lib/media.ts. */
  photo: string | null;
  /* A versão androide, revelada DENTRO da onda. null = a onda só
     distorce a foto, sem trocar de imagem. */
  photoIA: string | null;
};

export default function Hero({ photo, photoIA }: Props) {
  const { hero, site } = useConteudo();

  /* ---------- entrada do título ----------
     Sem `scope`: os seletores já são próprios do hero (`.hero-*`), então
     não há risco de pegar outra seção. */
  useGSAP(() => {
    const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
    intro.from(".hero-line-inner", {
      yPercent: 115,
      duration: 1.4,
      stagger: 0.11,
      delay: 0.25,
    });
    intro.from(
      ".hero-fade",
      { opacity: 0, y: 22, duration: 1, stagger: 0.1 },
      "-=0.9"
    );
  }, []);

  const iniciais = site.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  /* O conteúdo é o mesmo com foto, sem a segunda foto ou sem nenhuma,
     então mora numa variável em vez de ser copiado em cada ramo. */
  const conteudo = (
    <>
      {/* ---------- véus ----------
          Dois, e não um chapado: o rosto precisa continuar visível e o
          texto precisa de contraste, e são lados opostos do quadro.

          Desktop: degradê da direita para a esquerda, sólido sob a
          coluna de texto e transparente sobre ele.
          Celular: o texto desce para o pé, então o degradê vira
          vertical. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_0%,rgba(7,6,11,0.92)_26%,rgba(7,6,11,0.45)_58%,rgba(7,6,11,0.15)_100%)] lg:bg-[linear-gradient(to_left,var(--color-ink)_0%,rgba(7,6,11,0.9)_30%,rgba(7,6,11,0.45)_52%,transparent_74%)]"
      />
      {/* Pé esmaecido para o hero se dissolver na seção seguinte em vez
          de terminar num corte reto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,transparent,var(--color-ink))]"
      />

      {/* ---------- conteúdo ----------
          No celular o texto não pode ficar preso ao pé da tela: a faixa da
          imagem tem 56.25vw de altura (16:9 na largura da janela) e o resto
          virava um vão preto de umas 400px entre a foto e o nome. O
          espaçador abaixo reserva exatamente a faixa, e o bloco de texto
          centraliza no que sobra.

          `56.25vw` e não `aspect-video`: o espaçador vive dentro do
          `.shell`, que tem o gutter lateral, então a conta pela PRÓPRIA
          largura daria 22px menos que a faixa, que é filha da seção. */}
      <div className="shell relative z-10 flex h-svh flex-col pb-[max(2rem,env(safe-area-inset-bottom))] lg:justify-center lg:pb-8">
        <div aria-hidden="true" className="h-[56.25vw] shrink-0 lg:hidden" />

        <div className="flex flex-1 items-center lg:block lg:flex-none">
        {/* CENTRALIZADO a pedido dele. O bloco continua na metade
            DIREITA porque é lá que a foto tem fundo vazio; o que mudou é
            o alinhamento interno, que era à esquerda. `text-center` +
            `mx-auto` nos filhos: sem os dois, o texto centraliza mas as
            logos e o parágrafo ficam colados na borda. */}
        <div className="w-full text-center lg:ml-auto lg:w-1/2 lg:max-w-xl">
          <p className="hero-fade mono-label mb-3">{hero.greeting}</p>

          {/* O nome em caixa alta e apertado: é a única coisa nesta tela
              que precisa ser lida de longe. */}
          <h1 className="display text-[clamp(2.9rem,9.4vw,7rem)] uppercase leading-[0.86]">
            {hero.nameLines.map((line) => (
              <span key={line} className="line-mask">
                <span className="line-inner hero-line-inner block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="display hero-fade mt-3 text-[clamp(1.05rem,3vw,1.9rem)] uppercase tracking-tight text-plasma">
            {hero.role}
          </p>

          {/* Fila de logos: mostra a stack antes de qualquer texto sobre
              ela. Só entram as chaves que existem no mapa. */}
          <ul className="hero-fade mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {hero.techIcons.map((key) => {
              const logo = getLogo(key);
              if (!logo) return null;
              return (
                <li key={key}>
                  <span
                    title={key}
                    aria-hidden="true"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-bone/12 bg-ink-2/70 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 [&>*]:h-5 [&>*]:w-5"
                    style={{ color: logo.color }}
                  >
                    {logo.node}
                  </span>
                </li>
              );
            })}
          </ul>
          {/* A fila acima é decorativa; a lista real e nomeada das
              tecnologias é a seção Stack. */}
          <span className="sr-only">
            Tecnologias: {hero.techIcons.join(", ")}
          </span>

          {/* A DESCRIÇÃO, no lugar das legendas que se alternavam.

              A rotação obrigava a pessoa a esperar para ler o resto e
              ocupava uma linha só, deixando o hero vazio embaixo do nome.
              Um parágrafo fixo preenche a coluna e diz de uma vez o que
              ele faz. O texto é recorte do Sobre — ver a nota no
              content.ts. */}
          <p className="hero-fade editorial mx-auto mt-8 max-w-xl text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-bone-dim">
            {hero.description}
          </p>

          <p className="mono-label hero-fade mt-10 hidden sm:block">
            {site.location} · {site.year}
          </p>
        </div>
        </div>
      </div>
    </>
  );

  return (
    <section
      id="hero"
      className="group/hero relative h-svh w-full overflow-hidden bg-ink text-bone"
    >
      {/* `hero-foto` alinha a borda esquerda da foto com a borda
          esquerda do conteúdo do `.shell`, para a margem da esquerda
          bater com a do texto à direita. Ver a nota em globals.css. */}
      {photo ? (
        /* A faixa da imagem: 16:9 no topo no celular, tela inteira no
           desktop. O canvas preenche este bloco e o `contain` do shader
           cuida da proporção dentro dele. */
        <div className="hero-foto absolute inset-x-0 top-0 aspect-video lg:inset-0 lg:aspect-auto">
          {/* Costura entre a faixa e o preto abaixo dela, no celular.
              No desktop a costura das bordas da foto é feita no SHADER,
              com uma transição macia em vez de corte reto — ver a nota
              sobre COSTURA em RippleDistortion.tsx. Em CSS não resolvia:
              no modo `contain` a emenda cai no meio da tela, e não na
              borda, então um degradê de altura fixa não a alcança. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-[linear-gradient(to_bottom,transparent,var(--color-ink))] lg:hidden"
          />
          <RippleDistortion
            src={asset(photo)}
            /* A REVELAÇÃO. É o que a máscara líquida do PhotoReveal
               fazia, agora comandada pela própria onda: onde a água
               levanta, aparece a versão androide. */
            revealSrc={photoIA ? asset(photoIA) : undefined}
            revealMix={1}
            /* Limiares da mancha. O piso alto é o que impede a cauda da
               onda de pintar o androide de leve pelo quadro inteiro (ele
               reportou como "previsualização transparente por baixo"); o
               teto baixo garante o núcleo cheio mesmo no rastro já
               esmaecido. */
            revealFloor={0.1}
            revealFull={0.4}
            /* `contain` com âncora na ESQUERDA. Contain porque a foto é
               16:9 e o hero é de proporção qualquer: cobrindo, o corte
               come o rodapé dele em janela larga e baixa. A âncora em 0
               joga toda a sobra para a DIREITA, onde está o texto, então
               ele fica encostado na borda esquerda da tela em vez de
               centralizado com faixa dos dois lados. */
            fit="contain"
            anchor={[0, 0.5]}
            background="#07060b"
            /* Onda LARGA e RASA. A primeira versão usava strength 0.16 e
               swirl 1.2: a imagem torcia tanto que a versão androide
               virava borrão e não se reconhecia nada dentro da mancha. O
               empurrão caiu para menos da metade, o giro para 0.5, e o
               pincel cresceu: é a área que deixa ver a troca de foto. */
            brushSize={190}
            strength={0.06}
            swirl={0.5}
            rings={1}
            spread={3}
            fade={2.4}
            spacing={16}
            /* O roxo do site, de leve: mais que isso e a onda vira uma
               mancha lilás em vez de água pegando a luz. */
            tint="#a855f7"
            tintAmount={0.08}
            glint={0.12}
            highlightColor="#cba6f7"
            trigger="both"
            quality="medium"
          />
        </div>
      ) : (
        /* Sem foto nenhuma: as iniciais gigantes seguram o fundo, no
           lugar de um vazio sem explicação. */
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute left-[6vw] top-1/2 -translate-y-1/2 text-[22vw] leading-none text-bone/5"
        >
          {iniciais}
        </span>
      )}

      {conteudo}

      {/* O aviso de que a imagem reage ao mouse. Some no primeiro hover
          em qualquer parte do hero. */}
      <span className="mono-label pointer-events-none absolute right-5 top-20 z-20 hidden rounded-full bg-ink/70 px-3 py-1 backdrop-blur-md transition-opacity duration-500 group-hover/hero:opacity-0 sm:block lg:right-8 lg:top-24">
        {hero.photoHint}
      </span>
    </section>
  );
}
