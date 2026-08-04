# Portfólio — Erick Dantas

Site de portfólio com vídeo controlado pelo scroll, cena 3D interativa e animações
orquestradas com GSAP.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

---

## Onde mexer

**Todo o texto do site está em [`lib/content.ts`](lib/content.ts).** Nenhum componente
tem conteúdo escrito direto no JSX — para trocar projetos, stack, links ou qualquer
frase, edite só esse arquivo.

| O que | Onde |
| --- | --- |
| Nome, cargo, e-mail, redes | `site` e `contact.socials` |
| Título do hero e legendas do vídeo | `hero` |
| Texto "Sobre" e os contadores | `manifesto` |
| Projetos (título, descrição, links, tags, cor) | `projects` |
| Stack e formação | `stack`, `background` |
| URL da cena 3D | `robot.sceneUrl` |

---

## As três peças principais

### 1. Vídeo do hero em loop

`components/HeroVideo.tsx` · o arquivo fica em `public/video/hero.mp4`

O vídeo toca sozinho, em loop, mudo (autoplay só é concedido a vídeo mudo). A barra de
progresso é alimentada pelo `requestVideoFrameCallback`, que dispara uma vez por quadro
efetivamente apresentado — um timer paralelo dessincronizaria a cada engasgo de
decodificação. As legendas se alternam a cada ~4s.

O título é limitado a ~58% da largura em telas grandes: a personagem do vídeo ocupa a
metade direita do quadro, e sem esse limite as letras caem em cima do rosto.

### 2. Robô 3D que segue o mouse

`components/SplineScene.tsx` · cena em `robot.sceneUrl`

A cabeça seguir o cursor é comportamento nativo da cena (Follow Event do Spline) — o
runtime escuta o mouse sobre o `<canvas>` e a cena reage. Não há código nosso ditando
a rotação.

Decisões de implementação:

- **Usamos `@splinetool/runtime` direto, sem o wrapper `@splinetool/react-spline`.**
  O wrapper v4 só declara a condição `import` no seu export map, então o build de
  servidor do Next não consegue resolvê-lo; e a variante `/next` é um Server Component
  assíncrono, inutilizável dentro de um componente cliente.
- **A cena só baixa quando chega perto da viewport** (IntersectionObserver com
  `rootMargin: 900px`). O runtime passa de 1 MB — carregar no mount competiria com o
  vídeo do hero pela banda.
- **O chão da cena é escondido** (`findObjectByName("Plane").visible = false`), deixando
  só o robô sobre o cubo. Junto com ele foi embora a poça de luz que o iluminava, daí o
  `filter: brightness()` no canvas — o runtime não expõe as luzes da cena.
- **O tamanho vem de `setZoom()`, não de escala CSS.** Escalar o canvas por CSS
  desalinharia o mapeamento do cursor que a cena usa para seguir o mouse. Um `translate`
  puro é seguro (o `getBoundingClientRect` já reflete a translação) e é o que
  recentraliza o robô no palco.

Para trocar a cena: no editor do Spline, **Export → Public URL**, copie a URL
`https://prod.spline.design/<id>/scene.splinecode` e cole em `robot.sceneUrl`.
Links `app.spline.design/file/...` são do editor e são privados — não funcionam aqui.

### 3. Scroll suave + animações

`components/SmoothScroll.tsx` amarra o **Lenis** ao **ScrollTrigger**. Os dois precisam
compartilhar o mesmo loop de rAF: com loops separados, o ScrollTrigger mede o scroll
nativo enquanto o Lenis anima um transform, e todo trigger dispara com um frame de
defasagem.

Animações por seção:

| Seção | Efeito |
| --- | --- |
| Hero | Vídeo em loop, título em cascata mascarada, legendas alternando, barra de progresso |
| Sobre | Texto acendendo palavra a palavra com o scroll, contadores, globo 3D com arcos |
| Marquee | Faixa infinita que acelera e inclina conforme a velocidade do scroll |
| Robô | Cena entrando com escala, halo pulsando, cabeça seguindo o cursor |
| Projetos | Scroll horizontal com a seção presa (desktop), snap nativo no mobile |
| Linguagens | Barra empilhada que se desenha + cartões em cascata |
| Carreira | Timeline com a trilha preenchendo conforme o scroll |
| Stack | Cascata por coluna |
| Contato | Título em cascata, botão magnético |
| Global | Cursor discreto, grão animado, revelação de texto por linha, dock no mobile |

### 4. Componentes do Aceternity UI

`components/ui/globe.tsx`, `timeline.tsx` e `floating-dock.tsx` vieram via
`npx shadcn@latest add @aceternity/<nome>`. São **código do projeto**, não dependências —
foram editados para caber aqui:

- as variantes `dark:` foram trocadas pelos tokens da paleta (o site é sempre escuro, não
  usa a classe `dark`, então os `dark:` nunca aplicavam e tudo saía claro);
- o cabeçalho fixo do demo saiu da Timeline;
- `useRef()` sem argumento no globe virou `useRef<Object3D | null>(null)` (React 19 exige
  o valor inicial);
- `@react-three/fiber` está preso na **v9**: a v10-alpha importa `act` do React, que o
  React 19 não exporta, e o build quebra.

O globo precisa de `data/globe.json` (polígonos dos países) e, como three + three-globe +
fiber + drei somam alguns MB, ele também só carrega quando a seção se aproxima.

---

## Acessibilidade

`prefers-reduced-motion` é respeitado em todos os componentes: o Lenis nem inicializa,
o scrub do vídeo é desligado, e as revelações de texto viram estado final imediato.
O cursor customizado e o efeito magnético são desativados em telas de toque.

---

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · GSAP 3.15 (ScrollTrigger +
SplitText) · Lenis · @splinetool/runtime

Tipografia: Bricolage Grotesque (display), Archivo (texto), Instrument Serif (itálico
editorial) — todas via `next/font`, sem requisição externa em runtime.

## Deploy

Projeto Next.js estático — `npm run build` e suba na Vercel (ou qualquer host Node).
O `hero.mp4` tem 7 MB; se reencodar com `-g 1` ele cresce, então vale considerar servir
o vídeo por um CDN caso o limite do plano aperte.
