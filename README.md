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
| Página de cada projeto (texto longo, ficha, telas) | `projects[].overview`, `.facts`, `.gallery` |
| Stack e formação | `stack`, `background` |
| URL da cena 3D | `robot.sceneUrl` |

### Largura das seções

Depois do hero, tudo vive numa coluna estreita: `class="shell shell-narrow"`
(68rem) em vez do `shell` cheio (110rem). Foi uma decisão de leitura — com a
largura cheia cada seção virava uma faixa larga e baixa, e a página inteira
encurtava na vertical. As grades acompanham: stack e linguagens em 2 colunas,
não 4; globo, robô e "o que eu faço" empilhados, não lado a lado.

O hero e o nav continuam com a largura cheia.

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
- **O tamanho vem de escala CSS no canvas — `setZoom()` não funciona.** Medindo o
  robô na tela, ele fica em ~138px de largura com `setZoom` em 2.4, 4.8, 10 ou 20:
  o runtime reenquadra a cena no resize e descarta o valor. A alavanca real é
  `scale()` no canvas. Isso é seguro para o follow porque o Spline normaliza o
  cursor com `(clientX - rect.left) / rect.width`, tudo do mesmo
  `getBoundingClientRect` — que reflete o transform. Como `left` e `width` escalam
  juntos, uma escala **uniforme** preserva o mapeamento (o mesmo não vale para
  escala não-uniforme).
- **A escala CSS não custa GPU.** O buffer de render sai do tamanho de *layout* do
  canvas, que o transform não muda. O preço é a imagem ser ampliada, um pouco mais
  macia nas bordas.
- **O `translate` vem depois da escala.** As propriedades individuais compõem como
  `translate rotate scale`, com o translate por fora e em porcentagem da caixa sem
  escala. Por isso os valores de translate tiveram que crescer junto com a escala
  para o robô continuar centralizado.

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

### 4. Projetos: card com capa e página própria

`components/Projects.tsx` · `app/projetos/[slug]/page.tsx` · imagens em
`public/projetos/<slug>/`

Cada card mostra **uma tela real do projeto** como capa, e o card inteiro leva
para `/projetos/<slug>/`: uma página com a descrição completa, uma ficha e
quatro telas. O link externo para o site no ar mora lá dentro, não mais no card.

Como o site é exportado estaticamente, as rotas dinâmicas precisam existir no
build — quem gera as seis é o `generateStaticParams` da página, lendo o
`projects` de `lib/content.ts`. Slug fora dessa lista não existe no site.

**As imagens são `<img>` cru, não `next/image`.** No export estático a otimização
é desligada de qualquer forma, e o basePath não chega ao `src` — quem monta o
prefixo é o `asset()` de `lib/asset.ts`, mesma armadilha do `<video>` do hero.

#### Capas dos projetos

As trinta imagens em `public/projetos/` são capturas de tela reais, feitas com
Playwright em 1440×900 @2x, reduzidas para 1800px de largura em WebP (2 MB no
total). Para regravar, é uma tela do site publicado — com duas exceções que valem
saber:

- **Central Técnica**: o site publicado é fechado (tudo redireciona para
  `login.html`), então as telas saem do projeto rodando localmente.
- **Atomai**: a raiz do Pages serve o README, e as páginas do app carregam o CSS
  por caminho absoluto (`href="/css/style.css"`), que dentro da subpasta do Pages
  dá 404 — no ar o app aparece sem estilo. As telas também saem do local.

### 5. Componentes do Aceternity UI

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

No ar em **https://erickkadr.github.io/portfolio/**

```bash
npm run deploy    # build + publica na branch gh-pages
```

O site é exportado estaticamente (`output: "export"`) e servido pelo GitHub Pages a
partir da branch `gh-pages`. A `main` guarda o código; a `gh-pages` guarda só o build.

Três detalhes que fazem esse deploy funcionar, e que quebram o site se forem removidos:

- **`.nojekyll`** na raiz do build. Sem ele o Pages trata a pasta `_next` como interna
  do Jekyll (nomes com underscore) e a ignora — o site sobe sem CSS nem JavaScript.
- **`basePath` + `assetPrefix`**, porque o site vive numa subpasta (`/portfolio`). Sem
  eles o HTML pede `/_next/...` na raiz do domínio, onde não há nada, e a página abre
  em branco. Vêm de `NEXT_PUBLIC_BASE_PATH` no `.env.production`, que o Next carrega
  sozinho no `next build` e ignora no `next dev`.
- **O `src` do vídeo monta o prefixo à mão.** O `basePath` do Next só alcança o que
  passa por ele (rotas, `next/link`, `next/image`, chunks) — um `src="/video/hero.mp4"`
  cru apontaria para a raiz do domínio.

> Se um dia o repositório virar `ErickkADR.github.io` ou o site ganhar domínio próprio,
> basta esvaziar `NEXT_PUBLIC_BASE_PATH` no `.env.production`.

O `hero.mp4` tem 7 MB, bem dentro dos limites do Pages (1 GB por site, 100 MB por
arquivo). Se um dia o vídeo crescer muito, vale servi-lo por um CDN.
