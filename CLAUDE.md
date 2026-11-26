# Portfólio — Nocturne Lab

Portfólio pessoal do Erick (@ErickkADR). Next.js 15 (App Router) + React 19 + TypeScript +
Tailwind v4 + GSAP + Lenis. Iniciado em 03/08/2026.

Três bibliotecas de WebGL convivem aqui, cada uma por um motivo:
- **ogl** — a ondulação do hero (`RippleDistortion`). Pequena e sem React no meio.
- **three + @react-three/fiber + drei** — o globo das Metas e o crachá do Sobre.
- **@react-three/rapier + meshline** — só a física do cordão do crachá.

No ar em **https://erickdantas-portfolio.vercel.app** (produção, Vercel) — repo `ErickkADR/portfolio`.
**Publicar = `git push` no `main`**: a Vercel está ligada ao GitHub e builda sozinha, na raiz (sem
basePath). O `npm run deploy` (branch `gh-pages`, https://erickkadr.github.io/portfolio/) é o
caminho ANTIGO: não é o endereço que o Erick divulga (ele corrigiu em 26/11/2026).

## Comandos

```bash
npm run dev       # dev server
npm run build     # build estático (output: export)
npm run deploy    # build + scripts/deploy.mjs -> publica na branch gh-pages
```

> **Nunca rodar `npm run build` com o `npm run dev` no ar.** Os dois compartilham `.next` e
> o build de produção apaga os chunks do dev, derrubando o dev server. Parar o dev antes.

## Onde mexer

**Todo o conteúdo do site vive em `lib/content.ts`.** Nenhum componente tem texto no JSX.
Para trocar textos, projetos, links ou dados de carreira, é só esse arquivo.

```
app/            layout, page, /carreira, /projetos/[slug], globals.css
components/     componentes de seção
components/ui/  componentes do Aceternity UI já vendorizados
lib/content.ts  TODO o conteúdo textual
scripts/        deploy.mjs
```

## Design

Paleta **preto e roxo**. Acento `--color-plasma: #a855f7`, pretos puxando para o violeta.
O token se chamava `magma` quando o site era laranja — o Erick pediu para abandonar o laranja
em 04/08/2026. Fontes (desde 26/11/2026, eram Bricolage + Archivo): **Space Grotesk** (display),
**Geist** (texto), **Geist Mono** (`mono-label`), Instrument Serif (itálico de acento). O
`line-height` do `.display` subiu para 0.96 porque a Space Grotesk cortava no `.line-mask`.

O site é **sempre escuro** e não usa a classe `dark`. Componentes trazidos do Aceternity via
`npx shadcn@latest add @aceternity/<nome>` precisam ter as variantes `dark:` removidas — elas
nunca aplicam e o componente sai claro.

## Decisões deliberadas — não "consertar"

1. **Spline entra por `@splinetool/runtime` direto, sem `@splinetool/react-spline`.**
   O wrapper v4 só declara a condição `import` no export map, então o build de servidor do
   Next não resolve; e a variante `/next` é Server Component assíncrono, inutilizável dentro
   de client component. Não voltar para o wrapper.

2. **O robô segue o mouse por comportamento nativo da cena** (Follow Event do Spline), não por
   código nosso — e **não** por scroll; o Erick corrigiu isso explicitamente.
   Cena: `https://prod.spline.design/KsIHnT1RVW8Wrgal/scene.splinecode`.
   O chão (`Plane`) fica escondido. Tamanho vem de `setZoom()`, **nunca** de escala CSS —
   escalar o canvas desalinha o mapeamento do cursor. `translate` puro é seguro.

3. **O vídeo saiu do site** (18/08/2026). Ele abria a página; desceu para o fundo da seção
   Sobre no mesmo dia e, horas depois, saiu de vez quando o crachá tomou aquele lugar. O
   arquivo `public/video/hero.mp4` (7,7 MB) **continua no repo sem nenhum uso**, mantido de
   propósito para o caso de ele querer o vídeo em outro lugar. Se for reintroduzir: o `src`
   precisa montar o basePath à mão e vale carregar por proximidade, porque era o maior
   download do site.

4. **`@react-three/fiber` está preso na v9.** A v10-alpha importa `act` do React 19 e quebra.

5. **O HERO é a foto; o SOBRE é o crachá.** (18/08/2026)
   - As duas fotos (`public/hero/erick.webp` e `erick-ia.webp`, 2048x1152) têm o sujeito à
     **esquerda** e fundo vazio à direita, então o texto do hero mora na metade **direita**.
   - O Sobre virou duas colunas: o relato à esquerda, o crachá pendurado (`Lanyard`) numa
     coluna `sticky` à direita. Abaixo de `lg` o crachá não existe e a seção é texto puro.
   - Trocar a foto do hero por outra de enquadramento diferente inverte essa conta e quebra a
     composição da seção.
   - **A foto do hero usa `contain`, não `cover`, com âncora na esquerda** (`anchor={[0, 0.5]}`).
     Cobrindo, uma janela larga e baixa corta o rodapé dele; a âncora em 0 joga toda a sobra
     para a direita, onde o texto está, e ele fica encostado na borda esquerda da tela. Ele
     pediu as duas coisas explicitamente: nada de corte e a foto na esquerda.

6. **A revelação no hover é o `RippleDistortion` (WebGL/ogl), desde 18/08/2026.** A onda
   distorce a foto E revela a versão androide dentro dela. Ver `components/RippleDistortion.tsx`,
   adaptado do componente do React Bits. O que mudou em relação ao original está comentado no
   topo do arquivo; o essencial:
   - `fit: cover | contain` e `anchor` (o original só centraliza e cobre);
   - `revealSrc`, a segunda imagem, misturada pela intensidade do deslocamento — é o que
     substituiu a máscara do PhotoReveal;
   - o `requestAnimationFrame` **para** quando a última onda morre e quando o bloco sai da
     tela. O original roda dois passes de render por quadro para sempre.
   - **A revelação é `smoothstep` com PISO, e passou por três versões.** Elevar o `amount` ao
     quadrado matava o efeito (o shader da onda já escreve `brush * vOpacity * vOpacity` e a
     opacidade cai exponencialmente: 250ms depois do gesto a troca valia 10%, e ele reportou
     "não dá para ver o robô"). Multiplicar linear por 6 resolveu isso e criou o problema
     inverso: a cauda da gaussiana cobre uma área enorme com valores baixinhos, e 6x um valor
     baixinho é visível, então o androide aparecia de leve no quadro inteiro — ele descreveu
     como "uma previsualização transparente por baixo". O `smoothstep(uRevealFloor,
     uRevealFull, amount)` resolve os dois: abaixo do piso a troca é exatamente zero.
   - **A segunda imagem é amostrada em `base`, SEM o `push` da onda.** Com o push, no núcleo o
     empurrão chega perto de vertical puro (swirl 0.5 leva theta a PI) e vale 6% da altura, uns
     69px numa foto de 1152: o androide aparecia SUBIDO em relação à foto ao redor. Na beirada,
     onde o push é quase zero, as duas coincidiam — foi por isso que o fantasma parecia alinhado
     e a revelação não.
   - **Existe uma onda SUSTENTADA, no último slot do anel** (`SLOT_FIXO`). O componente original
     só cria onda quando o ponteiro anda mais que `spacing`, e toda onda decai: parado, o efeito
     desaparecia. A sustentada segue o ponteiro e não decai enquanto ele está sobre o quadro.
   - `strength` fica **baixo** (0.06). A 0.16 a imagem torce tanto que o androide vira borrão
     e não se reconhece nada dentro da mancha: ele reportou como "animação muito forte".

   `components/PhotoReveal.tsx` (a máscara SVG anterior) **continua no repo mas não é usado
   por ninguém**. Foi mantido de propósito, para o caso de ele querer o efeito antigo de volta.

   A máscara SVG antiga funcionava assim, se precisar reconstituir: máscara CSS não aceita
   filtro no conteúdo, e era o filtro `goo` (borrar + estourar o alfa) que fundia as quatro
   gotas numa massa só.
   - As gotas cresciam no `pointermove`, **não** só no `pointerenter`: o enter não dispara
     quando o cursor já está parado sobre a área ou quando desce de um elemento fixo por cima
     (o menu). Amarrar só ao enter deixava o efeito morto em metade das entradas. Vale a
     mesma lição para qualquer efeito de ponteiro nesta página.

   **A altura da faixa da mídia no celular está em DOIS lugares em cada seção**, porque a
   mídia é filha da seção e o espaçador é filho do `.shell` (que tem gutter lateral):
   - hero: `aspect-video` na faixa e `h-[56.25vw]` no espaçador (as duas dão a mesma altura);
   - Sobre: `h-[52svh]` no container do vídeo e no espaçador.
   Mexeu numa, mexe na outra.

7. **O carrossel só anda sozinho a partir de 1024px e com hover disponível.** No celular
   cabe um card por tela e não há hover para pausar a esteira: a pessoa encarava um card
   que nunca parava e nunca estava inteiro no quadro (o modo automático desliga o
   `scroll-snap`). Abaixo disso ele volta a ser um carrossel normal, com encaixe.

## Rodada de 26/11/2026 — o que mudou e por quê

- **Hero sem descrição.** O parágrafo virou o primeiro do Sobre.
- **Sobre: 3 parágrafos profissionais + mosaico de fotos.** A história de origem (4 anos, escola,
  APDADOS) saiu do Sobre: está na Carreira. O **crachá saiu** (o `Cracha.tsx` continua no repo sem
  uso). As fotos vêm de `public/sobre/` em ordem de nome: a 1ª é o retrato grande (4:5), a 2ª e a
  3ª ficam sobrepostas (4:3). **Hoje são PROVISÓRIAS** (recorte da foto do hero + duas telas do
  trabalho): trocar pelos arquivos reais mantendo os prefixos `01-`, `02-`, `03-`.
- **Feitos: faixa horizontal presa ao scroll, igual aos Projetos** (pedido dele, 26/11/2026; era
  carrossel automático). O `Carousel.tsx` continua em uso pelos Certificados.
- **Feitos: vídeo dentro do site, nunca em player à parte** (pedido explícito). O card mostra a
  capa `public/feitos-capas/<slug>.webp` (quadro do meio do 1º vídeo, tirado com ffmpeg; fica
  FORA de `public/feitos/` para não virar item da galeria) e o próprio vídeo toca mudo no hover
  (`PreviaFeito.tsx`; no toque, quando 60% do card está na tela). A ficha (`FeitoDetalhe`) embute
  todos os vídeos com controles; o `MediaViewer` só abre imagem ampliada. Vídeo novo num feito
  sem capa: gerar a capa com ffmpeg (`-ss <metade> -frames:v 1`, 1280px, webp).
- **Resultados: 6 números do banco**, cada um com a consulta no comentário do `content.ts`
  (atividade_usuarios, jetia_interacoes, garantias_bjcontrol, documents da Jet IA, erp_produtos,
  laudos_gerados). Os antigos 50%/65%/200+ eram estimativa e saíram. Tabelas vazias que NÃO servem
  de número: quiz_attempts, pecas, estoque_pecas, tecnicos, atendimentos. O contador do
  `Metricas.tsx` aceita ponto de milhar ("19.188").
- **Carreira: imagem em todo card**, de `public/carreira-capas/<slug>.webp`. **PROVISÓRIAS**
  (prints de certificado/projeto), a pedido dele, só para ver o layout.
- **Projetos: só pessoais, em faixa horizontal presa ao scroll** (pin do ScrollTrigger, distância
  = largura da pista menos a janela). Central Técnica e Campro A3 saíram (são Bannerjet e já estão
  nos Feitos). Arise e Dispensa ficaram de fora: só têm tela de login / rodam local, sem tela
  pública para capa. O `projects` do content-en foi reordenado junto (mescla por índice!). A
  altura do card cai em janela baixa (`max-height: 820px`) para a seção caber presa na tela.
- **Formação: cartão QUADRADO BRANCO com a logo e, embaixo, período, título e texto** (pedido dele,
  26/11/2026; o baralho CardSwap saiu, o componente continua no repo sem uso). Logo em
  `public/formacao/<logo>.png`. O curso técnico foi na EMEFM Prof. Derville Allegretti (escola municipal, Santana); a logo ainda não veio: largar
  `curso-tecnico.png` resolve.
- **Projetos: Arise e Print Your Toy entraram** (26/11/2026). Telas do Arise tiradas com o login desviado
  só no dev (permissão dele) e o `proxy.ts` revertido; sem Início/Notas (finanças e notas pessoais).
  **Capa do Print Your Toy é PROVISÓRIA** (ícones do jogo + título): a oficial foi gerada no Magnific mas
  não estava na conta conectada. Trocar `public/projetos/print-your-toy/cover.webp` e pôr o link do jogo
  no `href` (hoje é a busca do Roblox).
- **Página de projeto aceita `features`** (título, texto e imagem por função; seção "As ferramentas, uma
  por uma"). Usada na Nexus Print com as 6 ferramentas (`f-*.webp`, capturadas do site publicado).
  Galeria vazia não renderiza a seção "Telas".
- **Meta profissional (globo) removida** da página e do nav. `Metas.tsx` e o `globe` do conteúdo
  continuam no repo sem uso.
- **Contato refeito**: duas colunas (convite + status "Disponível" + e-mail | canais grandes, um
  por linha, LinkedIn primeiro) e o nome em contorno como assinatura. A citação do Claude Code
  saiu. O `.display-accent` tem `text-shadow`, que é cortado num retângulo dentro de `.line-mask`:
  ali usa `[text-shadow:none]`.

## Deploy — o que derruba o site

> **Produção é a Vercel** (push no `main` publica). O que segue vale para o espelho antigo do
> GitHub Pages, que só existe se alguém rodar `npm run deploy`.

`main` guarda o código, `gh-pages` guarda só o build estático.

1. **`.nojekyll` na raiz do build.** Sem ele o Pages ignora a pasta `_next` (underscore =
   interno do Jekyll) e o site sobe sem CSS nem JS.
2. **`NEXT_PUBLIC_BASE_PATH=/portfolio` no `.env.production`.** O site vive numa subpasta; sem
   o basePath o HTML pede `/_next/...` na raiz do domínio e a página abre em branco. Fica no
   `.env.production` de propósito — o Next carrega sozinho no build e ignora no dev.
   Se o repo virar `ErickkADR.github.io` ou ganhar domínio próprio, **esvaziar essa variável**.
3. **O `src` do `<video>` monta o prefixo à mão.** O basePath do Next não alcança `src` escrito
   manualmente — só rotas, `next/link`, `next/image` e chunks.

O deploy é por branch e não por GitHub Actions porque o token `gh` do Erick não tem escopo
`workflow` — commitar `.github/workflows/*` falha no push. Para mudar: `gh auth refresh -s workflow`.

## As logos da seção Stack

São PNG de verdade, com fundo transparente, em `public/stack/<slug>.png` — o slug é o nome do
item no `content.ts` em minúsculas com hífen ("Claude Code" → `claude-code`). A pasta é lida
no build, como a dos certificados: **largar o arquivo já coloca a logo no ar**, sem cadastrar
caminho em lugar nenhum. Item sem PNG cai no monograma, no mesmo ladrilho.

`node scripts/baixa-logos.mjs` baixa o que falta e rasteriza com o sharp. Ele pula o que já
existe, então rodar de novo é seguro — para trocar uma logo, apague o PNG antes.

- O **simple-icons removeu** as marcas que pediram (Microsoft, Adobe, OpenAI): `visualstudiocode`,
  `adobephotoshop`, `powershell`, `windows11` e `openai` respondem **404** hoje. O devicon tem
  todas essas, e coloridas. A do Codex sai de uma **versão antiga** do pacote no npm.
- Ícone de biblioteca (Tabler) não serve aqui: é silhueta de uma cor só, e numa parede de logos
  a cor é metade do reconhecimento. O hero ainda usa o Tabler — lá são 8 ícones pequenos.
- **Logo preta some no fundo escuro.** O Cursor caiu nisso na hora de baixar: a cor de marca
  dele é um cubo preto, e o ladrilho ficava vazio. Ali a correção foi forçar branco no `siCor`.
  Para um PNG que JÁ ESTÁ no repo, a correção é a flag `branco: true` no item do `content.ts`,
  que aplica `brightness-0 invert` no render — achata para preto e inverte, saindo branco puro
  com a silhueta e a transparência intactas. Está ligada em **CorelDraw, Fusion 360 e Miro**,
  que ele reportou como "quase invisíveis". Resolver por flag mantém o PNG original.
- **Item sem PNG não aparece mais na parede** (18/08/2026, a pedido dele): o monograma com as
  iniciais lia como ladrilho vazio no meio de logos coloridas. Saíram da lista do `content.ts`
  por isso: Spline, MakerWorld, RAG, VBA, Callbell, SignMaster, CameraCut, LightBurn e EzCad.
  Para trazer qualquer um de volta, largue o PNG em `public/stack/` **e** reinsira o nome na
  lista — só o arquivo não basta, e só o nome também não.
- **A seção não tem mais categorias.** Eram cinco grupos (IA, front, back, design, ferramentas)
  e viraram uma parede única de 29 ladrilhos, a pedido dele. A ordem da lista no `content.ts`
  ainda agrupa por afinidade, o que dá o ritmo sem cabeçalho.

## Os dois componentes do React Bits (18/08/2026)

Ele pediu os dois pelo nome, com a fonte do React Bits. Os dois foram **adaptados**, não
copiados: o que mudou está comentado no topo de cada arquivo. O padrão das três adaptações
(contando o `RippleDistortion`) é o mesmo, e vale para a próxima:

1. **tipar** — o projeto roda `tsc --noEmit` limpo e os originais são JSX;
2. **assets por `public/` + `asset()`** — `import` de `.glb`/`.png` exigiria loader no Next e
   não recebe o basePath do GitHub Pages, então daria 404 no site publicado;
3. **parar o laço quando ninguém está olhando** — os originais mantêm `requestAnimationFrame`
   e `setInterval` rodando desde a montagem. Numa página única isso significa física, render e
   timeline correndo durante a página inteira, e esta página tem TRÊS coisas de WebGL;
4. **respeitar `prefers-reduced-motion`** — enfeite não force movimento em quem pediu para não
   ter.

### O crachá do Sobre: `Cracha.tsx`, e NÃO o `Lanyard` (19/08/2026)

**O Lanyard do React Bits foi abandonado.** Ele quebrou duas vezes na máquina do Erick — o
crachá saía um retângulo branco com a carinha de processo derrubado — e não houve como
reproduzir aqui, porque este ambiente não tem GPU: no SwiftShader o canvas monta, os três
assets vêm com 200, o `tsc` passa e o console fica limpo, mas nada é desenhado. Depurar às
cegas um efeito decorativo não valia mais tentativas.

`components/Cracha.tsx` entrega as três coisas que ele pediu — pendurado, balançando e
arrastável — com `transform` e uma timeline do GSAP. Sem contexto de GPU para perder, sem
modelo para baixar, e roda igual em qualquer máquina. A frente do cartão é a MESMA imagem de
`scripts/gera-cracha.mjs`.

Duas coisas que importam se alguém mexer nele:
- **O giro acontece no PÊNDULO, com `origin-top`**, e não no cartão. Girar o cartão sozinho o
  faria rodar no meio dele, como um ponteiro de relógio, em vez de pendurar.
- **No arrasto o giro é uma fração da distância do ponteiro (÷ 9), com teto de 26°.** Puxar 1:1
  faz o crachá fugir do cursor e ninguém consegue segurá-lo.

`components/Lanyard.tsx` continua no repo **sem ninguém importando**, junto de `card.glb`
(2,4 MB), `lanyard.png` e das dependências `@react-three/rapier` e `meshline`. Ficou para uma
nova tentativa com GPU de verdade à mão. Se decidir que não volta: apagar o componente, os dois
assets e as duas dependências.

### `Lanyard` — a tentativa em WebGL (não usada)

- Assets em `public/lanyard/`: `card.glb` (2,4 MB, do repo do React Bits) e `lanyard.png` (a
  textura do cordão). A frente do crachá é **nossa**, gerada por `scripts/gera-cracha.mjs`
  (nome, cargo e paleta do site); a textura que vem no `.glb` é a marca do React Bits.
- **A prop `origin` é a que faz ele caber.** No original o canvas é 100vw x 100vh e o crachá
  nasce em `x=2`, o que sobra dentro de um quadro largo. Numa coluna estreita a largura visível
  cai para ~4 unidades e ele fica metade fora. `origin` puxa a corda inteira para a esquerda.
- **Nunca foi verificado num navegador com GPU de verdade.** No Chrome headless com SwiftShader
  o canvas monta, os três assets vêm com 200 e o console fica limpo, mas nada é desenhado:
  `meshPhysicalMaterial` com clearcoat e o `Environment` do drei costumam sair vazios ali.
  Conferir no navegador antes de confiar.

### `CardSwap` — o baralho da Formação

- As três formações eram três cartões empilhados na vertical; viraram um baralho que se troca
  sozinho a cada 4,2s, com o cabeçalho movido para a esquerda.
- **`dropDistance` é adição nossa.** O original derruba a carta 500px fixos; aqui a moldura tem
  altura própria e clipa a queda, e 500px numa caixa de 340 atravessa a seção de baixo.
- **A moldura tem `overflow-hidden` de propósito**: a carta sair de vista é o que faz a troca
  ler como troca. Ela também é o que impede o baralho (que cresce para a direita) de gerar
  estouro horizontal no celular.
- **As medidas vêm da largura da janela, em número, não de breakpoint CSS**, porque as cartas
  são absolutas e é o container que define o quadro. Enquanto a janela não foi medida, a
  moldura reserva o espaço — sem isso a seção pula de altura na hidratação.
- A entrada `gsap.from` dos cartões antigos **foi removida**: o CardSwap posiciona as cartas
  com `gsap.set` e um `from` por cima disputava o mesmo transform.

## O botão PT/EN (19/08/2026)

O site é bilíngue. Três peças:

1. **`lib/content.ts`** continua sendo a fonte em português, e no fim dele há um `export const
   conteudo = { ... }` que junta todas as seções numa árvore só. **Seção nova no arquivo precisa
   entrar nesse objeto**, senão nunca terá versão em inglês.
2. **`lib/content-en.ts`** é um dicionário **parcial**. Só precisa ter o que está traduzido.
3. **`lib/idioma.tsx`** tem o provedor, o botão e a função `mesclar`, que sobrepõe o inglês
   sobre o português campo por campo. **O que faltar cai no português sozinho** — foi essa
   decisão que permitiu traduzir aos poucos sem nunca deixar a página com buraco.

**Array é mesclado POR ÍNDICE.** É o que permite traduzir o `body` de um item e deixar as
`tags` dele intactas, mas exige que a ordem dos itens seja a mesma nos dois arquivos. Reordenou
no português (as recomendações já foram reordenadas uma vez), reordene no inglês.

**Componente lê por `useConteudo()`**, nunca importando o `export const` direto — quem importa
direto fica preso ao português. A conversão é mecânica: trocar o import pelo hook e destruturar
na primeira linha do componente.

Duas exceções, ambas comentadas no código:
- **`Metas.tsx`** ainda importa `globe` como módulo, porque os arcos são montados FORA do
  componente e latitude não se traduz. O hook ali serve só ao texto.
- **As páginas de projeto e de carreira** viraram **casca de servidor + view em cliente**
  (`page.tsx` + `view.tsx`). O `generateStaticParams` é obrigatório num site exportado e o
  `generateMetadata` roda no build, então os dois têm de ficar no servidor; a varredura de
  `public/carreira/<slug>/` com `node:fs` também. O `slug` é a chave que atravessa os dois
  idiomas. **Os metadados ficam em português**: são gerados no build e não acompanham um botão
  que é estado de cliente.

**O botão mostra a bandeira do idioma de DESTINO** (em português, a dos Estados Unidos e "EN"),
porque é a leitura que se faz de um botão: a pergunta "quer em inglês?". Mostrar a bandeira do
Brasil enquanto o site já está em português não ofereceria nada.

**As bandeiras são SVG, nunca emoji.** `🇧🇷` e `🇺🇸` são pares de indicadores regionais e só viram
bandeira se a fonte do sistema tiver o glifo — **no Windows não tem, aparecem as letras "BR" e
"US"**, e duas das três máquinas dele são Windows. Ver `components/Bandeiras.tsx`; o `clipPath` da
americana usa `useId` porque id fixo faria a segunda bandeira da página apagar a primeira.

**O botão aparece em DOIS lugares** (`components/BotaoIdioma.tsx`): na barra do topo e, no
celular, solto no canto superior direito. A barra é `hidden md:block`, então abaixo de md não
havia controle de idioma nenhum — quem abria no telefone ficava preso no português. Não entrou
como item do dock porque o `FloatingDock` é feito de links (`href`) e isto é uma ação.

Os `aria-label` do botão (`ui.mudarParaIngles`, `ui.mudarParaPortugues`) **não têm par no
content-en.ts de propósito**: cada um já está no idioma de destino, que é o idioma da ação.

O estado inicial é sempre `pt` nos dois lados, e a preferência salva no `localStorage` é
aplicada num efeito — ler o storage no `useState` daria divergência de hidratação num site
`output: export`.

**Texto de interface fica em `ui` e `projectsSection`** (fim do content.ts). Rótulo de botão,
de leitor de tela e de contagem estavam chumbados no JSX e só apareceram quando o site ficou
bilíngue: "Copiar e-mail", "Fechar ✕", "item/itens", "Documento", os `aria-label` e o título da
seção de projetos. **Texto visível novo vai para o conteúdo, não para o JSX** — é a regra que o
botão de idioma impõe. `MediaViewer` e `CareerMedia` recebem o rótulo por prop, porque são
usados por quem já tem o `ui` em mão.

**Falta traduzir** (cai no português sozinho, sem quebrar): as legendas das telas dos projetos
(`gallery[].alt` e `cover.alt`), os 22 certificados (`dateLabel` e os `skills` do tipo
"40 horas") e as `tags` dos feitos.

## Voltar de uma subpágina para a seção certa

O link de voltar aponta para `/#projetos` ou `/#carreira`, e é o efeito de troca de rota do
`SmoothScroll` que executa isso. Duas coisas que já deram errado ali:

1. **O efeito só DESISTIA quando havia âncora** (`if (hash) return`) e não rolava para lugar
   nenhum: voltar de um projeto deixava a página exatamente onde estava.
2. **Um alinhamento só não basta.** A home CRESCE depois do primeiro layout (imagens dos
   carrosséis, os 29 PNG da parede de logos, o vídeo, as fontes), então a posição medida cedo
   fica curta: na medida real, parou em 3361px quando a seção tinha ido para 8415px. Hoje o
   alinhamento é repetido em marcos (120/400/900/1600ms) e no `load`, recalculando a cada vez,
   e **para na hora em que a pessoa toca no scroll** (`wheel`, `touchstart`, `keydown`) —
   corrigir a posição de quem já começou a rolar é arrancar a página da mão dela.

## Armadilhas de responsividade (já custaram caro uma vez)

- **`gsap.from({ x: … })` em card de largura cheia estoura a página na horizontal.** O `from`
  aplica o deslocamento inicial ANTES do trigger disparar, então todo card abaixo da dobra
  fica empurrado para fora e a página inteira ganha rolagem lateral. Foi o que aconteceu na
  Carreira: 20px de estouro em qualquer celular. No desktop não aparecia porque lá o card
  tem metade da largura. Regra: deslocamento horizontal de entrada só em `(min-width: 1024px)`.
- **`ch` mede contra a fonte do elemento em que está escrito, não contra a do filho.** O
  `max-w-[18ch]` do hero valia ~157px (fonte do pai, 16px) para um nome desenhado a 46px —
  e como cada linha do título é um `.line-mask` com `overflow: hidden`, o sobrenome saía
  **cortado no meio da letra** em toda tela abaixo de 1024px, sem gerar estouro que
  denunciasse o problema.
- Conferir estouro horizontal é barato e pega os dois casos:
  `document.documentElement.scrollWidth - clientWidth` a 360px e 390px tem que dar **0**.
  Ao listar os culpados, ignore quem está dentro de um ancestral com `overflow-x`
  auto/scroll/hidden — os slides do carrossel sempre aparecem e nunca são o problema.

## Verificação com Playwright

`window.scrollTo` **não funciona** nesta página: o Lenis devolve a posição dele no frame
seguinte. Para levar a página até uma seção, clique num `<a href="#secao">` — o SmoothScroll
intercepta cliques em âncora no documento inteiro, então serve até um link criado na hora.
Rodinha (`mouse.wheel`) tem inércia e sempre passa do ponto.

O dev server desta máquina compila devagar (projeto dentro do OneDrive): um primeiro
`GET /` de 25s é normal, então use `timeout: 120000` no `goto`.

## O globo da seção Metas

Ele reclamou que o globo "demora demais para carregar ou nem carrega" (18/08/2026). Eram três
coisas somadas, e as três estão corrigidas:

1. **`hexPolygonResolution` era 3.** Cada passo de resolução do h3 multiplica por ~7 o número
   de células, e a malha é construída de forma síncrona na thread principal: os 177 países
   viravam dezenas de milhares de hexágonos e a página congelava ao chegar na seção. Hoje é 2.
   **Não voltar para 3** sem medir.
2. **`Scene` e `PerspectiveCamera` eram criados no corpo do componente**, ou seja, um par novo
   a cada render, entregue ao `Canvas`. Agora vão em `useMemo`.
3. **Sem teto no `devicePixelRatio`.** Num Mac Retina o renderer desenhava 4x a área de pixels.
   Hoje o teto é 1.5.

Além disso: o bundle (three + three-globe + fiber + drei) é buscado no primeiro `requestIdleCallback`,
o componente só monta 600px antes da seção, o `frameloop` desliga quando a seção sai da tela, e
um meridiano pontilhado gira no lugar dele enquanto nada disso terminou — um buraco de 38rem sem
explicação é o que faz parecer que não carregou.

## Recomendações: os cinco textos são RASCUNHO (19/08/2026)

O bloco era vazio de propósito, e a razão continua valendo: citação inventada atribuída a
alguém real é endosso fabricado, e dois dos cinco não são da empresa (Rene é da UNIP, Davis é
da APDADOS).

Ele pediu "comentários ilustrativos", e a saída foi entregar os textos com
**`rascunho: true`** em cada item. A flag põe um selo âmbar bem visível no cartão
("Texto provisório · aguardando aprovação"), então nenhum visitante lê aquilo como palavra da
pessoa, e o texto fica pronto para ser mandado para aprovação.

**Para liberar um: troque o `quote` pelo texto que a pessoa aprovou ou reescreveu e apague a
linha `rascunho`. Não apague o selo antes do OK dela.** O caminho curto é o "Solicitar
recomendação" do LinkedIn, que devolve o texto pronto para colar.

Uma escolha de redação que vale revisão dele: **Davis Alves** tem um título enorme (ITIL
Expert, PMP, CEH, CHFI, DPO, ex-CNPD…) e no cartão cabe uma linha, então ficou
"Presidente · APDADOS". O **Marden** se apresenta como "Founder of Bannerjet International", e
é assim que o cartão diz.

**As fotos são recorte MANUAL, com FOLGA.** A primeira leva ficou apertada no rosto e, dentro da
máscara circular do cartão, cabelo e queixo encostavam na borda: ele reportou como "zoom errado".
Hoje cada caixa é bem maior, com a cabeça a ~40% da altura. Para julgar um recorte novo, gere a
prévia **já com a máscara circular** — no quadrado o problema não aparece.

O do **Marden** é a exceção: a foto dele é de palco, corpo inteiro e fora do centro, e nenhum
retângulo escolhido a olho centralizava o rosto. Ali funciona recortar a metade de cima primeiro
(`extract` até y=380) e deixar o `sharp.strategy.attention` achar o rosto dentro dessa faixa.

**A receita que funciona para um retrato novo**, e que economiza umas três tentativas:
1. gere uma prévia do original com uma **grade de 10%** por cima e leia a posição do rosto ali;
2. calcule a caixa com a cabeça a ~40% da altura, bem mais aberta do que parece necessário;
3. confira **com a máscara circular**, nunca no quadrado.

O passo 1 não é luxo: no Davis eu li a altura errada na grade (estimei y=560 quando a cabeça está
em ~1344 de um 3024x4032) e o recorte saiu um retângulo de céu. O `attention` também não salva
sozinho — no Guilherme ele pegou as pessoas do fundo, e no Artur cortou cabelo e queixo.

A foto atual do **Davis** não veio como imagem: ele salvou a página do perfil, e o retrato está em
`~/Downloads/davis alves_files/757699204_*.jpg`.

**Sobre o método:** Os originais que ele mandou (todos 800x800,
menos o do Leandro, 640x640) viraram `public/recomendacoes/<slug>.jpg` em 192x192. A primeira
tentativa usou `sharp.strategy.attention`, que escolhe a região de maior informação, e errou em
dois: pegou o corpo inteiro do Marden (numa foto de palco, rosto minúsculo) e cortou a testa do
Leandro. Os cinco recortes de hoje são retângulos escolhidos a olho sobre o original, com o
rosto centrado e a cabeça a ~38% da altura.

Se precisar refazer um: a extensão **tem** de ser `.jpg`, porque o componente monta o caminho
com `/recomendacoes/${avatar}.jpg` chumbado. Sem arquivo, o cartão cai nas iniciais e continua
alinhado.

## A esteira das Recomendações (`components/ui/card-marquee.tsx`)

Adaptado de um componente de marquee de cards que ele trouxe, em 19/08/2026. Cinco mudanças
obrigatórias em relação ao original, todas comentadas no arquivo:

1. **Tema escuro.** O original é `bg-white` no card e `from-white` nos degradês de borda.
2. **Sem Poppins.** O original injeta um `@import` do Google Fonts e aplica `font-family` no
   seletor `*`, o que trocaria a tipografia do site inteiro.
3. **Keyframes no `globals.css`**, não num `<style>` dentro do JSX: duas fileiras montariam a
   mesma regra duas vezes.
4. **`mx-3` no card, nunca `gap` na trilha.** O laço é `translateX(-50%)` sobre a lista
   duplicada, e isso só fecha sem salto se o espaçamento fizer parte da largura de cada item;
   um `gap` acrescenta um vão entre as duas metades e a emenda pisca a cada volta.
5. **Pausa no hover e `prefers-reduced-motion`.** O conteúdo é depoimento: esteira que não para
   impede a leitura de quem se interessou. Em movimento reduzido a animação para e a fileira
   vira faixa arrastável — desligar sem isso esconderia para sempre os cartões que não couberam.

Ela divide em duas fileiras só com **seis itens ou mais**; com cinco, duas fileiras mostrariam o
mesmo cartão ao mesmo tempo. Com os sete de hoje ela está em duas fileiras, em sentidos opostos,
que é o formato original. A ordem do `content.ts` define quem cai em qual: os quatro da Bannerjet
na de cima, os três de fora na de baixo. O `cards.tsx` que veio junto (grid "Latest Blog") não foi usado:
é outro componente, não tem relação com a seção.

**Os cartões são BRANCOS, no formato de um post do X** (a pedido dele, 19/08/2026): avatar, nome
com o tique azul do X ao lado, o cargo no lugar do @handle e a citação embaixo. Sobre o preto da
página, o contraste faz cada depoimento ler como algo publicado em outro lugar, e não como caixa
de texto do site.

Consequência prática: **nenhuma classe do cartão pode usar os tokens do tema.** `mono-label`,
`text-bone-dim` e companhia pintam de cor clara e desaparecem no branco — as cores ali são
explícitas, na escala slate. A fonte continua a do site.

**O selo azul aparece em todos.** Naquele desenho ele significa "perfil verificado", não
"citação conferida", e as cinco pessoas são reais.

**O aviso de "texto provisório" SAIU do cartão a pedido dele (19/08/2026).** A flag
`rascunho: true` continua em cada item, agora só como registro de quem ainda não aprovou o
texto. Do jeito que está, o site apresenta os cinco como palavra das próprias pessoas: antes de
publicar, cada uma precisa ter lido e aprovado o que está no nome dela.

**Cartão largo e baixo:** `w-[20rem] sm:w-[27rem]`. Ele pediu o inverso do que estava saindo, e
alargar é o que encurta — o mesmo texto ocupa menos linhas. Os 20rem do celular são o teto que
cabe numa tela de 390px sem o cartão nascer cortado.

## Pendências

- Os períodos em `career` (`lib/content.ts`) estão marcados como `[CONFIRMAR período]`.
  Vieram do README do GitHub porque o **LinkedIn dele bloqueia leitura automatizada (HTTP 999)**.
- ~~Dois cartões de `metricas` sem número~~ **resolvido em 19/08/2026**: ele passou os quatro
  (50% do suporte por IA, 65% de redução no tempo de atendimento, 200+ materiais, 628 blocos).
  O `value` opcional continua suportado no tipo, para o próximo resultado que ainda não tiver
  medição.
- **Estouro horizontal de ~5px abaixo de 390px de largura.** Vem de uma entrada `gsap.from`
  com deslocamento horizontal (a armadilha documentada acima), não do hero: esconder qualquer
  seção zera o número. Não foi caçado ainda.
- **`erick-ia.webp` só existe para a revelação do hero.** Se o efeito da onda sair, o arquivo
  fica órfão.
- **`public/video/hero.mp4` (7,7 MB) está órfão hoje** — ver a decisão 3.
- ~~O crachá do Sobre não foi visto renderizado~~ **resolvido**: o WebGL saiu e entrou o
  `Cracha.tsx`, que renderiza em qualquer máquina.
- **A amplitude do balanço do crachá é perceptiva, não técnica.** Ele reportou "não está se
  movendo" quando a animação estava rodando: 2.6° num cartão de 200px desloca 9px e lê como
  imóvel. Hoje são 6° num cartão de ~270px. Se diminuir o cartão, aumentar o ângulo.

## Notas

- `.gitignore` exclui `.claude/` e `PERFEITA.mp4` (cópia duplicada; o usado é
  `public/video/hero.mp4`).
- As skills que ficavam em `.claude/skills` foram movidas para `~/claude-config/skills`,
  onde valem para todos os projetos e estão versionadas.
