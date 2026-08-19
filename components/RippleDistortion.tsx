"use client";

import { useEffect, useRef } from "react";
import {
  Renderer,
  Program,
  Mesh,
  Geometry,
  Triangle,
  Texture,
  RenderTarget,
} from "ogl";

/* ============================================================
   RIPPLE DISTORTION — a superfície da imagem ondula onde o ponteiro
   passa. Origem: componente RippleDistortion do React Bits, adaptado.

   Substituiu a máscara líquida do PhotoReveal no hero.

   ---- O que foi mudado em relação ao original ----

   1. TIPADO. O projeto roda `tsc --noEmit` limpo e o original é JSX.

   2. `fit` COVER OU CONTAIN. O original só sabe cobrir o container, e
      cobrir uma tela cheia com uma foto 16:9 corta as bordas (foi o que
      apareceu no hero). Em `contain` a imagem aparece inteira, na
      proporção real, e o que sobra do retângulo recebe `background`.

   3. `anchor` NO MODO COVER. O original centraliza o corte. Atenção ao
      eixo Y: a textura sobe com `flipY`, então **1 é o topo da imagem** e
      0 é a base. "Esquerda no topo" é `[0, 1]`.

   4. O LAÇO PARA QUANDO NÃO HÁ NADA SE MEXENDO. O original mantém um
      `requestAnimationFrame` e dois passes de render por quadro para
      sempre, mesmo com a seção fora da tela e sem nenhuma onda viva. No
      hero isso é uma GPU ocupada durante a página inteira. Aqui o laço
      desliga quando a última onda morre e volta no primeiro movimento,
      e um IntersectionObserver o suspende quando o bloco sai da tela.

   5. `prefers-reduced-motion` não cria ondas (era o comportamento
      original) e agora também não deixa o laço rodando à toa: desenha o
      quadro limpo uma vez e para.
   ============================================================ */

const MAX_WAVES = 100;
/* SLOT DA ONDA SUSTENTADA.

   O componente original só cria onda quando o ponteiro ANDA mais que
   `spacing`, e toda onda decai. Parado, então, não sobra nada — e como a
   revelação da segunda foto depende da onda, o efeito simplesmente
   desaparecia quando ele deixava o mouse quieto. Era o comportamento que
   a máscara do PhotoReveal tinha e este não.

   A última posição do anel é reservada para uma onda que segue o
   ponteiro e NÃO decai enquanto ele está dentro do quadro. O rastro
   continua saindo das outras 99. */
const SLOT_FIXO = MAX_WAVES - 1;
const QUALITY_SCALE = { low: 0.4, medium: 0.7, high: 1 } as const;
const START_SCALE = 1.5;
const LIFE_CONSTANT = Math.log(500);

const waveVertex = `
precision highp float;

attribute vec2 position;
attribute vec2 uv;
attribute vec2 iOffset;
attribute vec2 iScale;
attribute float iOpacity;

varying vec2 vUv;
varying float vOpacity;

void main() {
  vUv = uv;
  vOpacity = iOpacity;
  gl_Position = vec4(iOffset + position * iScale, 0.0, 1.0);
}
`;

const waveFragment = `
precision highp float;

varying vec2 vUv;
varying float vOpacity;

uniform float uRings;

const float PI = 3.141592653589793;
const float EDGE = 0.006737947;

void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = dot(p, p);
  if (r > 1.0) discard;

  float brush = (exp(-r * 5.0) - EDGE) / (1.0 - EDGE);

  brush *= 0.55 + 0.45 * cos(sqrt(r) * PI * 2.0 * uRings);

  gl_FragColor = vec4(vec3(brush * vOpacity * vOpacity), 1.0);
}
`;

const screenVertex = `
precision highp float;
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const compositeFragment = `
precision highp float;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform sampler2D uReveal;
uniform sampler2D uDisplacement;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform vec2 uTexel;
uniform vec2 uAnchor;
uniform vec3 uTint;
uniform vec3 uHighlight;
uniform vec3 uBackground;
uniform float uStrength;
uniform float uSwirl;
uniform float uDispersion;
uniform float uGlint;
uniform float uTintAmount;
uniform float uGrayscale;
/* 0 = cover (preenche e corta), 1 = contain (cabe inteira). */
uniform float uContain;
/* > 0 liga a segunda imagem. */
uniform float uRevealMix;
/* Abaixo deste amount a troca e zero: e o que mata o fantasma. */
uniform float uRevealFloor;
/* Acima deste amount a troca e total. */
uniform float uRevealFull;

const float TAU = 6.283185307179586;

/* Mesma conta do object-fit do CSS: max cobre o retangulo e corta o
   excedente, min faz a imagem inteira caber e sobra moldura. */
vec2 fitUV(vec2 uv) {
  vec2 safe = max(uTextureSize, vec2(1.0));
  vec2 s = uResolution / safe;
  float k = uContain > 0.5 ? min(s.x, s.y) : max(s.x, s.y);
  vec2 scaledSize = safe * k;
  vec2 offset = (uResolution - scaledSize) * uAnchor;
  return (uv * uResolution - offset) / scaledSize;
}

void main() {
  float amount = texture2D(uDisplacement, vUv).r;
  vec2 base = fitUV(vUv);

  float theta = amount * uSwirl * TAU;
  vec2 dir = vec2(sin(theta), cos(theta));
  vec2 push = dir * amount * uStrength;
  vec2 suv = base + push;

  /* Fora do retangulo da imagem entra o fundo, e nao o pixel da borda
     esticado pelo CLAMP_TO_EDGE. Sem isso, em contain a moldura fica
     com um rastro da ultima linha de pixels.

     A TRANSICAO E MACIA (smoothstep), e nao um corte (step). Com o corte,
     a borda da imagem encostava no fundo da pagina numa linha reta, e o
     hero lia como um retangulo colado; pior no modo contain, onde a tarja
     que sobra poe essa linha no meio da tela em vez de na borda dela.

     O 0.035 e em UV, ou seja fracao da PROPRIA imagem: a costura acompanha
     a escala do encaixe sozinha, em qualquer proporcao de janela. Fazer
     isso em CSS nao resolveria, porque a posicao da emenda muda com a
     proporcao e um degrade de altura fixa nao a alcanca. */
  const float COSTURA = 0.035;
  vec2 dentro = smoothstep(0.0, COSTURA, suv) * (1.0 - smoothstep(1.0 - COSTURA, 1.0, suv));
  float mascara = dentro.x * dentro.y;
  vec2 amostra = clamp(suv, vec2(0.0), vec2(1.0));

  vec3 color;
  if (uDispersion > 0.001) {
    float split = uDispersion * 0.25;
    color.r = texture2D(uTexture, clamp(base + push * (1.0 + split), 0.0, 1.0)).r;
    color.g = texture2D(uTexture, amostra).g;
    color.b = texture2D(uTexture, clamp(base + push * (1.0 - split), 0.0, 1.0)).b;
  } else {
    color = texture2D(uTexture, amostra).rgb;
  }

  /* A SEGUNDA IMAGEM APARECE DENTRO DA ONDA.
     A mancha liquida do PhotoReveal fazia isso com uma mascara SVG; aqui
     quem decide e a propria intensidade do deslocamento, entao a
     revelacao acompanha a agua em vez de ser um buraco de borda dura.

     A mistura usa SMOOTHSTEP com piso, e nao multiplicacao linear.

     Duas tentativas antes desta falharam por motivos opostos. Elevar o
     amount ao quadrado matava a revelacao (a opacidade ja chega elevada
     do shader da onda, que escreve brush * vOpacity * vOpacity, e cai
     exponencialmente: 250ms depois do gesto a troca valia 10%).
     Multiplicar linear por um numero grande resolveu isso mas criou o
     problema inverso - a cauda da gaussiana da onda cobre uma area
     enorme com valores baixinhos, e 6x um valor baixinho e visivel: a
     foto de baixo aparecia de leve em quase todo o quadro, o que ele
     descreveu como "uma previsualizacao transparente por baixo".

     O smoothstep tem PISO: abaixo de uRevealFloor a troca e exatamente
     zero, o que apaga o fantasma; acima de uRevealFull e um, o que
     garante o nucleo cheio. Entre os dois, transicao suave. */
  if (uRevealMix > 0.001) {
    float troca = smoothstep(uRevealFloor, uRevealFull, amount);
    /* A SEGUNDA IMAGEM E AMOSTRADA EM base, SEM O EMPURRAO DA ONDA.

       Antes ela usava amostra, que e base + push, o mesmo UV
       deslocado que a imagem de cima. No nucleo da onda o empurrao chega
       perto de vertical puro (swirl 0.5 leva theta a PI, e dir vira
       (0,-1)), com 6% da altura: uns 69px numa foto de 1152. Resultado,
       o androide aparecia SUBIDO em relacao a foto ao redor, que era o
       "fica desalinhado para cima" que ele reportou. Na beirada da
       mancha, onde o amount e baixo e o push quase zero, as duas
       coincidiam - foi por isso que a versao esmaecida parecia alinhada
       e a revelada nao.

       Sem o push, a troca fica registrada pixel a pixel com a foto, que
       e a condicao para as duas lerem como a mesma cabeca. A ondulacao
       continua acontecendo na imagem de cima e na borda da mancha. */
    vec2 amostraReveal = clamp(base, vec2(0.0), vec2(1.0));
    color = mix(color, texture2D(uReveal, amostraReveal).rgb, troca);
  }

  if (uGrayscale > 0.001) {
    color = mix(color, vec3(dot(color, vec3(0.2126, 0.7152, 0.0722))), uGrayscale);
  }

  if (uTintAmount > 0.001) {
    color = mix(color, color * uTint * 1.9, clamp(amount * 1.6, 0.0, 1.0) * uTintAmount);
  }

  if (uGlint > 0.001) {
    float ex = texture2D(uDisplacement, vUv + vec2(uTexel.x, 0.0)).r - texture2D(uDisplacement, vUv - vec2(uTexel.x, 0.0)).r;
    float ey = texture2D(uDisplacement, vUv + vec2(0.0, uTexel.y)).r - texture2D(uDisplacement, vUv - vec2(0.0, uTexel.y)).r;
    vec3 normal = normalize(vec3(-ex * 26.0, -ey * 26.0, 1.0));
    vec3 light = normalize(vec3(-0.35, 0.55, 1.0));
    float raw = pow(max(dot(normal, light), 0.0), 22.0);
    float flatSpec = pow(max(light.z, 0.0), 22.0);
    color += uHighlight * clamp((raw - flatSpec) / max(1.0 - flatSpec, 0.0001), 0.0, 1.0) * uGlint;
  }

  gl_FragColor = vec4(mix(uBackground, color, mascara), 1.0);
}
`;

const hexToRGB = (hex: string): [number, number, number] => {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [1, 1, 1];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export type RippleDistortionProps = {
  /* Caminho da imagem, já com o prefixo do deploy (use `asset()`). */
  src: string;
  /* Segunda imagem, revelada DENTRO da onda. Precisa ter o mesmo
     enquadramento da primeira: a troca acontece no lugar, e qualquer
     diferença de posição vira um pulo dentro da mancha. Sem isso, a onda
     só distorce. */
  revealSrc?: string;
  /* > 0 liga a revelação. O quanto ela abre é controlado pelos dois
     limiares abaixo. */
  revealMix?: number;
  /* Intensidade de onda abaixo da qual a segunda imagem NÃO aparece.
     Subir este número encolhe a mancha e limpa o fantasma; descer demais
     traz a segunda foto de volta para o quadro inteiro. */
  revealFloor?: number;
  /* Intensidade a partir da qual a troca é total. */
  revealFull?: number;
  /* Diâmetro de cada onda, em px. */
  brushSize?: number;
  /* Quanto a imagem é empurrada, como fração do próprio tamanho. */
  strength?: number;
  /* Voltas que a direção do empurrão percorre enquanto a onda cresce. */
  swirl?: number;
  /* Anéis concêntricos dentro de cada onda. 0 = uma bolha lisa. */
  rings?: number;
  /* Quantas vezes o próprio tamanho a onda cresce antes de morrer. */
  spread?: number;
  /* Quanto tempo a onda sobrevive, em segundos. */
  fade?: number;
  /* Distância que o ponteiro percorre entre duas ondas, em px. */
  spacing?: number;
  /* Separação cromática entre os canais vermelho e azul. */
  dispersion?: number;
  /* Brilho especular na crista da onda. */
  glint?: number;
  /* Cor que a água perturbada assume. */
  tint?: string;
  tintAmount?: number;
  highlightColor?: string;
  /* Tira a cor da imagem para o relevo ler só por tom. */
  grayscale?: boolean;
  /* O que perturba a superfície. */
  trigger?: "hover" | "click" | "both";
  clickStrength?: number;
  /* Resolução do buffer de deslocamento. `low` basta em tela cheia. */
  quality?: "low" | "medium" | "high";
  enabled?: boolean;
  /* Como a imagem se encaixa no container. Ver a nota em fitUV. */
  fit?: "cover" | "contain";
  /* Ancoragem do corte em `cover`. Y invertido: 1 é o topo da imagem. */
  anchor?: [number, number];
  /* Cor da moldura que sobra em `contain`. */
  background?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function RippleDistortion({
  src,
  revealSrc,
  revealMix = 3,
  revealFloor = 0.05,
  revealFull = 0.28,
  brushSize = 150,
  strength = 0.2,
  swirl = 1,
  rings = 4,
  spread = 5,
  fade = 3,
  spacing = 15,
  dispersion = 0,
  glint = 0,
  tint = "#a855f7",
  tintAmount = 0.1,
  grayscale = false,
  highlightColor = "#ffffff",
  trigger = "hover",
  clickStrength = 2,
  quality = "low",
  enabled = true,
  fit = "cover",
  anchor = [0.5, 0.5],
  background = "#000000",
  className = "",
  style,
}: RippleDistortionProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  /* O que o laço lê a cada quadro sem forçar recriação do contexto. */
  const configRef = useRef({
    brushSize,
    spread,
    fade,
    spacing,
    clickStrength,
    trigger,
    enabled,
  });
  configRef.current = {
    brushSize,
    spread,
    fade,
    spacing,
    clickStrength,
    trigger,
    enabled,
  };

  /* Uniformes expostos para o efeito de atualização abaixo mexer nos
     valores sem reconstruir nada. */
  const uniformsRef = useRef<{
    wave: { uRings: { value: number } };
    composite: Record<string, { value: unknown }>;
  } | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new Renderer({
      alpha: false,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    const fundo = hexToRGB(background);
    gl.clearColor(fundo[0], fundo[1], fundo[2], 1);
    const canvas = gl.canvas;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    mount.appendChild(canvas);

    const opcoesTextura = {
      generateMipmaps: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
    };
    const imageTexture = new Texture(gl, opcoesTextura);
    /* Nasce vazia. Sem `revealSrc` ela nunca recebe imagem, e o
       `uRevealMix` em 0 garante que ela também nunca é lida. */
    const revealTexture = new Texture(gl, opcoesTextura);

    const offsets = new Float32Array(MAX_WAVES * 2);
    const scales = new Float32Array(MAX_WAVES * 2);
    const opacities = new Float32Array(MAX_WAVES);

    const waves = Array.from({ length: MAX_WAVES }, () => ({
      x: 0,
      y: 0,
      scale: START_SCALE,
      target: START_SCALE,
      size: 1,
      opacity: 0,
    }));
    let current = 0;

    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      },
      uv: { size: 2, data: new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]) },
      iOffset: { instanced: 1, size: 2, data: offsets },
      iScale: { instanced: 1, size: 2, data: scales },
      iOpacity: { instanced: 1, size: 1, data: opacities },
    });

    const waveUniforms = { uRings: { value: rings } };
    const waveProgram = new Program(gl, {
      vertex: waveVertex,
      fragment: waveFragment,
      uniforms: waveUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      cullFace: false,
    });
    waveProgram.setBlendFunc(gl.ONE, gl.ONE);
    const waveMesh = new Mesh(gl, {
      geometry,
      program: waveProgram,
      frustumCulled: false,
    });

    const displacementTarget = new RenderTarget(gl, {
      width: 2,
      height: 2,
      depth: false,
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
    });

    const compositeUniforms = {
      uTexture: { value: imageTexture },
      uReveal: { value: revealTexture },
      uDisplacement: { value: displacementTarget.texture },
      uResolution: { value: [1, 1] },
      uTextureSize: { value: [1, 1] },
      uTexel: { value: [1, 1] },
      uAnchor: { value: [anchor[0], anchor[1]] },
      uTint: { value: hexToRGB(tint) },
      uHighlight: { value: hexToRGB(highlightColor) },
      uBackground: { value: fundo },
      uStrength: { value: strength },
      uSwirl: { value: swirl },
      uDispersion: { value: dispersion },
      uGlint: { value: glint },
      uTintAmount: { value: tintAmount },
      uGrayscale: { value: grayscale ? 1 : 0 },
      uContain: { value: fit === "contain" ? 1 : 0 },
      uRevealMix: { value: revealSrc ? revealMix : 0 },
      uRevealFloor: { value: revealFloor },
      uRevealFull: { value: revealFull },
    };

    const compositeMesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, {
        vertex: screenVertex,
        fragment: compositeFragment,
        uniforms: compositeUniforms,
        depthTest: false,
        depthWrite: false,
      }),
    });

    uniformsRef.current = { wave: waveUniforms, composite: compositeUniforms };

    let disposed = false;
    let raf = 0;
    let previousTime = 0;
    let rodando = false;
    let naTela = true;
    /* Quantos quadros ainda desenhar depois da última onda morrer. Um só
       não basta: o buffer de deslocamento precisa de um passe limpo para
       a imagem voltar ao lugar. */
    let quadrosDeSobra = 2;

    let width = 1;
    let height = 1;

    const resize = () => {
      width = Math.max(1, mount.clientWidth);
      height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height);
      compositeUniforms.uResolution.value = [width, height];

      const scale = QUALITY_SCALE[quality] ?? QUALITY_SCALE.high;
      const fieldW = Math.max(2, Math.round(width * scale));
      const fieldH = Math.max(2, Math.round(height * scale));
      displacementTarget.setSize(fieldW, fieldH);
      compositeUniforms.uTexel.value = [1 / fieldW, 1 / fieldH];
      acordar();
    };

    /* ---------- o laço ----------
       `acordar` é chamado por movimento, clique, resize e pela imagem ao
       carregar. Enquanto houver onda viva o laço se mantém; quando a
       última morre ele desenha os quadros de sobra e desliga. */
    function acordar() {
      if (disposed || !naTela || rodando) return;
      quadrosDeSobra = 2;
      rodando = true;
      previousTime = 0;
      raf = requestAnimationFrame(loop);
    }

    function dormir() {
      rodando = false;
      cancelAnimationFrame(raf);
    }

    function loop(now: number) {
      const delta = previousTime ? Math.min(0.05, (now - previousTime) / 1000) : 0;
      previousTime = now;
      const cfg = configRef.current;

      const growth = reduceMotion ? 0 : 1 - Math.exp(-delta * 1.09);
      const decay = reduceMotion
        ? 1
        : Math.exp((-delta * LIFE_CONSTANT) / Math.max(0.15, cfg.fade));

      let vivas = 0;

      for (let i = 0; i < MAX_WAVES; i += 1) {
        const wave = waves[i];
        if (wave.opacity <= 0) {
          opacities[i] = 0;
          continue;
        }

        /* O slot reservado não decai enquanto o ponteiro está no quadro:
           é ele que mantém a revelação de pé com o mouse parado. */
        if (i === SLOT_FIXO && dentro) wave.opacity = 1;
        else wave.opacity *= decay;
        wave.scale += (wave.target - wave.scale) * growth;

        if (wave.opacity < 0.002) {
          wave.opacity = 0;
          opacities[i] = 0;
          continue;
        }

        vivas += 1;
        const half = (wave.scale * wave.size) / 2;
        offsets[i * 2] = (wave.x / width) * 2 - 1;
        offsets[i * 2 + 1] = (wave.y / height) * 2 - 1;
        scales[i * 2] = (half / width) * 2;
        scales[i * 2 + 1] = (half / height) * 2;
        opacities[i] = wave.opacity;
      }

      geometry.attributes.iOffset.needsUpdate = true;
      geometry.attributes.iScale.needsUpdate = true;
      geometry.attributes.iOpacity.needsUpdate = true;

      renderer.render({ scene: waveMesh, target: displacementTarget, clear: true });
      renderer.render({ scene: compositeMesh });

      if (vivas > 0) {
        quadrosDeSobra = 2;
      } else if (quadrosDeSobra > 0) {
        quadrosDeSobra -= 1;
      } else {
        dormir();
        return;
      }

      raf = requestAnimationFrame(loop);
    }

    /* As duas imagens entram pelo mesmo caminho. Só a primeira define
       `uTextureSize`, que é o que o encaixe (cover/contain) usa: as duas
       têm o mesmo enquadramento por contrato, e medir pela segunda só
       criaria uma chance de desalinhar. */
    const carregar = (url: string, textura: Texture, principal: boolean) => {
      const image = new window.Image();
      image.crossOrigin = "anonymous";
      image.decoding = "async";
      image.onload = () => {
        if (disposed) return;
        textura.image = image;
        if (principal) {
          compositeUniforms.uTextureSize.value = [
            image.naturalWidth || 1,
            image.naturalHeight || 1,
          ];
        }
        acordar();
      };
      image.src = url;
      return image;
    };

    carregar(src, imageTexture, true);
    if (revealSrc) carregar(revealSrc, revealTexture, false);

    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    resize();

    /* Fora da tela o laço nem começa: no hero, isso cobre a página
       inteira depois que a pessoa desce. */
    const io = new IntersectionObserver(
      ([entry]) => {
        naTela = entry.isIntersecting;
        if (naTela) acordar();
        else dormir();
      },
      { rootMargin: "100px" }
    );
    io.observe(mount);

    const setNewWave = (x: number, y: number, power: number) => {
      const cfg = configRef.current;
      const wave = waves[current];
      // O anel não encosta no slot reservado.
      current = (current + 1) % SLOT_FIXO;
      wave.x = x;
      wave.y = y;
      wave.scale = START_SCALE * power;
      wave.target = START_SCALE * Math.max(1, cfg.spread) * power;
      wave.size = Math.max(1, cfg.brushSize);
      wave.opacity = 1;
      acordar();
    };

    /* O ponteiro é ouvido na JANELA e não no container: o conteúdo do
       hero fica por cima do canvas, e ouvir no elemento faria a onda
       morrer sempre que o cursor cruzasse o texto. */
    const localPoint = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return null;
      }
      // Y invertido: o clip space do WebGL cresce para cima.
      return [clientX - rect.left, rect.height - (clientY - rect.top)] as const;
    };

    let previousX = 0;
    let previousY = 0;
    /* O ponteiro está sobre o quadro? É o que segura a onda sustentada. */
    let dentro = false;

    /* Mantém a onda sustentada sob o ponteiro. Ela nasce com o alvo de
       escala já fixo (não cresce sem parar como as do rastro) e a
       opacidade é reposta a cada quadro pelo laço, enquanto `dentro`. */
    const sustentar = (x: number, y: number) => {
      const cfg = configRef.current;
      const wave = waves[SLOT_FIXO];
      wave.x = x;
      wave.y = y;
      wave.size = Math.max(1, cfg.brushSize);
      wave.target = START_SCALE * 1.6;
      if (wave.opacity <= 0) wave.scale = START_SCALE;
      wave.opacity = 1;
      dentro = true;
      acordar();
    };

    const onMove = (event: PointerEvent) => {
      const cfg = configRef.current;
      if (!cfg.enabled || reduceMotion || cfg.trigger === "click") return;
      const point = localPoint(event.clientX, event.clientY);
      if (!point) return;
      /* A sustentada acompanha TODO movimento, inclusive o micro que não
         passa do limiar de `spacing`. É o rastro que respeita o limiar. */
      sustentar(point[0], point[1]);

      const step = Math.max(1, cfg.spacing);
      if (
        Math.abs(point[0] - previousX) > step ||
        Math.abs(point[1] - previousY) > step
      ) {
        setNewWave(point[0], point[1], 1);
        previousX = point[0];
        previousY = point[1];
      }
    };

    /* Ao sair, a sustentada volta a decair como qualquer outra. */
    const onLeave = () => {
      dentro = false;
      acordar();
    };

    const onDown = (event: PointerEvent) => {
      const cfg = configRef.current;
      if (!cfg.enabled || reduceMotion || cfg.trigger === "hover") return;
      const point = localPoint(event.clientX, event.clientY);
      if (!point) return;
      setNewWave(point[0], point[1], Math.max(1, cfg.clickStrength));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    mount.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      dormir();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      mount.removeEventListener("pointerleave", onLeave);
      uniformsRef.current = null;
      if (canvas.parentNode === mount) mount.removeChild(canvas);
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
    /* Só `src`, `quality` e o encaixe reconstroem o contexto. O resto
       entra pelos uniformes no efeito abaixo. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, revealSrc, quality, fit, background]);

  useEffect(() => {
    const u = uniformsRef.current;
    if (!u) return;
    u.wave.uRings.value = rings;
    u.composite.uStrength.value = strength;
    u.composite.uSwirl.value = swirl;
    u.composite.uDispersion.value = dispersion;
    u.composite.uGlint.value = glint;
    u.composite.uTintAmount.value = tintAmount;
    u.composite.uGrayscale.value = grayscale ? 1 : 0;
    u.composite.uHighlight.value = hexToRGB(highlightColor);
    u.composite.uTint.value = hexToRGB(tint);
    u.composite.uAnchor.value = [anchor[0], anchor[1]];
    u.composite.uRevealMix.value = revealSrc ? revealMix : 0;
    u.composite.uRevealFloor.value = revealFloor;
    u.composite.uRevealFull.value = revealFull;
  }, [
    revealSrc,
    revealMix,
    revealFloor,
    revealFull,
    rings,
    strength,
    swirl,
    dispersion,
    glint,
    tintAmount,
    grayscale,
    highlightColor,
    tint,
    anchor,
  ]);

  return (
    <div
      ref={mountRef}
      className={`ripple-distortion ${className}`.trim()}
      style={style}
    />
  );
}
