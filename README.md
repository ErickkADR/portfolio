# Portfólio — Erick Dantas

Site de portfólio com vídeo no hero, globo 3D e animações orquestradas com GSAP.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
```

---

## Anexar material sem tocar em código

Três partes do site aceitam arquivo: **basta salvar na pasta e rodar o build.**
Nada de cadastrar caminho, editar componente ou mexer no `content.ts`.

| O que | Onde salvar | Formatos |
| --- | --- | --- |
| Foto da seção Sobre | `public/sobre/erick.jpg` | imagem |
| Comprovação de um feito | `public/feitos/<slug>/` | imagem, vídeo, PDF |
| Material de uma etapa da carreira | `public/carreira/<slug>/` | imagem, vídeo, PDF |
| Imagem de um certificado | `public/certificados/<slug>.jpg` | imagem |

Os `slug` estão em [`lib/content.ts`](lib/content.ts), ao lado de cada item.
Dentro de uma pasta, os arquivos aparecem em ordem alfabética — prefixos como
`01-`, `02-` controlam a sequência. Item sem pasta continua no site, só sem a
galeria: nada quebra e nada some.

**Por que a varredura é no build** ([`lib/media.ts`](lib/media.ts)): sondar no
navegador significaria pedir cada arquivo em cada extensão possível e esconder no
erro — dezenas de 404 só para descobrir o que existe. Lendo a pasta com `node:fs`
num Server Component, o HTML já nasce sabendo. PDF é servido como link, não em
iframe: vários navegadores de celular baixam em vez de renderizar.

---

## Onde mexer no texto

**Todo o texto do site está em [`lib/content.ts`](lib/content.ts).** Nenhum componente
tem conteúdo escrito direto no JSX — para trocar projetos, stack, links ou qualquer
frase, edite só esse arquivo.

| O que | Onde |
| --- | --- |
| Nome, cargo, e-mail, redes | `site` e `contact.socials` |
| Título do hero e legendas do vídeo | `hero` |
| Seção Sobre (foto, parágrafos, ficha) | `sobre` |
| Feitos na Bannerjet | `feitos.groups` |
| Números de resultado | `metricas.items` |
| Carreira e a página de cada etapa | `career.entries` |
| Projetos e a página de cada um | `projects` |
| Stack, logos e formação | `stack`, `background` |
| Certificados | `certificates.items` |
| Meta profissional e destinos do globo | `globe` |

### A ordem das seções

`nav`, em `content.ts`, é a mesma lista que ordena o menu e o dock do celular:

> Início · Sobre · Cargo atual · Carreira · Projetos · Stack · Certificados ·
> Metas · Contato

A leitura é intencional: quem sou → o que faço hoje → o que isso rendeu em número
→ como cheguei aqui → o que já construí → com o que construo → o que está no papel
→ onde estudei → para onde vou → como falar comigo. A ordem de renderização mora
em [`app/page.tsx`](app/page.tsx).

### Largura das seções

Depois do hero, tudo vive numa coluna estreita: `class="shell shell-narrow"`
(68rem) em vez do `shell` cheio (110rem). Foi uma decisão de leitura — com a
largura cheia cada seção virava uma faixa larga e baixa, e a página inteira
encurtava na vertical.

O hero e o nav continuam com a largura cheia.

---

## As peças principais

### 1. Vídeo do hero em loop

`components/HeroVideo.tsx` · o arquivo fica em `public/video/hero.mp4`

O vídeo toca sozinho, em loop, mudo (autoplay só é concedido a vídeo mudo). As
legendas se alternam a cada ~4s.

O título é limitado a ~58% da largura em telas grandes: a personagem do vídeo ocupa a
metade direita do quadro, e sem esse limite as letras caem em cima do rosto.

> A barra de progresso do vídeo e o "role para revelar" saíram. Instrução de
> scroll é enfeite — quem chega numa página já sabe rolar — e a barra existia para
> acompanhá-la. Junto foi o `requestVideoFrameCallback`, que disparava um callback
> por quadro apresentado o tempo inteiro para mover um elemento que não existe
> mais.

> **O robô 3D foi removido** a pedido, junto com a dependência
> `@splinetool/runtime`. O componente e o que foi aprendido sobre o runtime (o
> `setZoom` inerte, a escala CSS como única alavanca real) estão no histórico do
> git, em `components/SplineScene.tsx`, se um dia voltar.

### 2. Scroll suave + animações

`components/SmoothScroll.tsx` amarra o **Lenis** ao **ScrollTrigger**. Os dois precisam
compartilhar o mesmo loop de rAF: com loops separados, o ScrollTrigger mede o scroll
nativo enquanto o Lenis anima um transform, e todo trigger dispara com um frame de
defasagem.

Animações por seção:

| Seção | Efeito |
| --- | --- |
| Hero | Vídeo em loop, título em cascata mascarada, legendas alternando |
| Sobre | Foto entrando por baixo, texto acendendo palavra a palavra com o scroll |
| Cargo atual | Cartões em cascata por grupo; o material abre em tela cheia |
| Métricas | Contadores subindo de zero quando entram na tela |
| Carreira | Timeline com a trilha preenchendo conforme o scroll |
| Projetos | Cards empilhados, um trigger por card |
| Stack | Barra empilhada que se desenha + logos entrando com `back.out` |
| Certificados | Cartões em cascata; a imagem abre em tela cheia |
| Formação | Cartões em cascata, com o ano como âncora visual |
| Metas | Globo 3D com os arcos saindo de São Paulo |
| Marquee | Faixa infinita que acelera e inclina conforme a velocidade do scroll |
| Contato | Título em cascata, cartão de e-mail magnético |
| Global | Cursor discreto, grão animado, revelação de texto por linha, dock no mobile |

**Topo a cada troca de rota.** O App Router navega sem recarregar, e o Lenis
mantém a própria posição num transform — o "próximo projeto" abria no meio da
página, na altura em que o link tinha sido clicado. O `SmoothScroll` observa o
`usePathname` e manda o Lenis para o topo com `immediate` (animar até lá mostraria
o conteúdo errado durante a viagem), seguido de um `ScrollTrigger.refresh()`
porque a página nova tem outra altura. Âncora na URL é a exceção: chegar em
`/#carreira` tem que ir para a carreira.

> **Linguagens e Stack são uma seção só** (`components/Stack.tsx`, `#stack`).
> Eram duas, e as listas se repetiam — JavaScript, HTML, CSS e TypeScript
> apareciam nas duas, e quem lia tinha que juntar sozinho. Hoje a barra medida
> do GitHub abre a seção e as logos vêm abaixo, agrupadas.
>
> As logos saem do `@tabler/icons-react`, que já era dependência do dock. Quem não
> tem ícone de marca pronto (n8n, Callbell, ElevenLabs, os softwares de
> equipamento) cai no monograma — as iniciais dentro do mesmo ladrilho, para a
> parede ficar uniforme em vez de cheia de buracos.

### 3. Comprovação: feitos e etapas de carreira

`components/Feitos.tsx` · `app/carreira/[slug]/page.tsx` · `components/MediaViewer.tsx`

Portfólio costuma afirmar sem provar. Estas duas partes existem para o contrário:
cada feito na Bannerjet e cada etapa da carreira carregam o material que mostra o
trabalho — print, PDF ou vídeo, lidos das pastas descritas lá em cima.

O `MediaViewer` abre em tela cheia com navegação por seta e `Esc`, e trata cada
tipo do jeito que funciona: imagem inline, vídeo com controles, PDF como link.

As etapas de carreira viram rotas estáticas via `generateStaticParams`. Etapa sem
material continua tendo página — ela diz que o material está sendo digitalizado,
em vez de fingir que a etapa não existiu.

### 4. Projetos: card com capa e página própria

`components/Projects.tsx` · `app/projetos/[slug]/page.tsx` · imagens em
`public/projetos/<slug>/`

Cada card mostra **uma tela real do projeto** como capa, e o card inteiro leva
para `/projetos/<slug>/`: uma página com a descrição completa, uma ficha e
quatro telas. O link externo para o site no ar mora lá dentro, não mais no card.

Os cards são empilhados na vertical. Antes a seção ficava presa (pin) e o trilho
andava na horizontal conforme a página descia — o movimento lateral só existia
enquanto o scroll acontecia, e a leitura de cada card dependia de parar no ponto
certo. Empilhado, cada projeto tem o seu tempo de tela. A área clicável é o card
inteiro, capa inclusive: o link do título se estica por cima de tudo com o
`::after`, e o link do repositório sobe acima dele com `z-10` — um destino dentro
do outro seria HTML inválido.

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

### 5. Certificados — como subir as imagens

`components/Certificates.tsx` · `lib/certificados.ts` · imagens em
`public/certificados/`

**Não precisa mexer em código.** Salve o arquivo do certificado em
`public/certificados/` com o nome do `slug` e rode o build: a imagem aparece no
cartão e abre em tela cheia ao clicar. Sem arquivo, o cartão sai só com o texto —
nada de imagem quebrada.

Extensões aceitas: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`.

| Certificado | Nome do arquivo |
| --- | --- |
| Panorama da LGPD em Cada Estado do Brasil | `lgpd-panorama-estados.jpg` |
| Cenário de Multas e Condutas para um DPO | `dpo-multas-e-condutas.jpg` |
| Orientação de Carreira para Profissionais de T.I | `orientacao-carreira-ti.jpg` |
| Inteligências Artificiais para DPOs | `ia-para-dpos.jpg` |
| User Experience — UX Design | `ux-design.jpg` |
| Banco de Dados Relacional | `banco-de-dados-relacional.jpg` |
| Wizard — Teens Course | `wizard-teens-course.jpg` |
| JavaScript — 40 horas | `javascript-curso-em-video.jpg` |
| HTML5 e CSS3 — módulo 4 | `html5-css3-modulo-4.jpg` |
| HTML5 e CSS3 — módulo 3 | `html5-css3-modulo-3.jpg` |
| HTML5 e CSS3 — módulo 2 | `html5-css3-modulo-2.jpg` |
| HTML5 e CSS3 — módulo 1 | `html5-css3-modulo-1.jpg` |
| Aluno Destaque | `aluno-destaque.jpg` |

Os certificados em PDF precisam virar imagem antes (um print da primeira página
resolve) — o cartão exibe imagem, não documento.

A lista `certificates.items` em `lib/content.ts` é ordenada por data pelo próprio
componente, então dá para inserir um certificado novo em qualquer posição.

**Por que a varredura é no build:** sondar no navegador significaria pedir cada
imagem em cada extensão possível e esconder no erro — 13 certificados × 4
extensões = até 52 requisições 404 só para descobrir o que existe. Lendo a pasta
no build (`node:fs`, Server Component), o HTML já nasce sabendo.

### 6. Componentes do Aceternity UI

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
SplitText) · Lenis · three + three-globe (globo das Metas) · @tabler/icons-react

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
