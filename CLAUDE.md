# Portfólio — Nocturne Lab

Portfólio pessoal do Erick (@ErickkADR). Next.js 15 (App Router) + React 19 + TypeScript +
Tailwind v4 + GSAP + Lenis. Iniciado em 03/08/2026.

No ar em **https://erickkadr.github.io/portfolio/** — repo `ErickkADR/portfolio`.

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
em 04/08/2026. Fontes: Bricolage Grotesque (display), Archivo (texto), Instrument Serif (itálico).

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

3. **O vídeo do hero toca em loop simples.** Já teve scrub por scroll; foi removido a pedido
   dele em 04/08/2026. Não reintroduzir sem ele pedir.

4. **`@react-three/fiber` está preso na v9.** A v10-alpha importa `act` do React 19 e quebra.

## Deploy — o que derruba o site

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

## Pendências

- Os períodos em `career` (`lib/content.ts`) estão marcados como `[CONFIRMAR período]`.
  Vieram do README do GitHub porque o **LinkedIn dele bloqueia leitura automatizada (HTTP 999)**.

## Notas

- `.gitignore` exclui `.claude/` e `PERFEITA.mp4` (cópia duplicada; o usado é
  `public/video/hero.mp4`).
- As skills que ficavam em `.claude/skills` foram movidas para `~/claude-config/skills`,
  onde valem para todos os projetos e estão versionadas.
