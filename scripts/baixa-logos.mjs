#!/usr/bin/env node
/* Baixa as logos da seção Stack e grava PNG com fundo transparente em
 * public/stack/<slug>.png.
 *
 * POR QUE PNG E NÃO O ÍCONE DA BIBLIOTECA: o @tabler/icons-react entrega
 * silhueta monocromática — o desenho é sempre de uma cor só. Logo de
 * produto tem forma, cor e, em várias marcas, gradiente; a silhueta some
 * com o que faz a marca ser reconhecida de relance, que é o único
 * trabalho de uma parede de logos.
 *
 * POR QUE BAIXAR EM VEZ DE APONTAR PARA A CDN: o site é exportado
 * estático e não pode depender de rede em runtime — uma CDN fora do ar
 * viraria uma parede de imagens quebradas.
 *
 * A fonte é o simple-icons (cdn.simpleicons.org, que já devolve o SVG na
 * cor da marca) e o devicon para o que o simple-icons não tem. O sharp
 * rasteriza o SVG em 256px com fundo transparente.
 *
 * Rodar: node scripts/baixa-logos.mjs
 * Quem não tem logo em nenhuma das duas fontes é listado no fim — para
 * esses, basta largar um PNG à mão em public/stack/<slug>.png e ele
 * aparece sozinho (a pasta é lida no build, como a dos certificados).
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const DESTINO = join(process.cwd(), "public", "stack");
const TAMANHO = 256;

/* slug do item no site → como buscar.
   - `si`: slug no simple-icons (cor da marca vem de graça)
   - `siCor`: força uma cor (marcas pretas/brancas que sumiriam no fundo escuro)
   - `devicon`: caminho no devicon, para o que falta no simple-icons */
const FONTES = {
  /* ---- IA & Automações ---- */
  "claude-code": { si: "claude" },
  codex: { si: "openai", siCor: "ffffff" },
  antigravity: { si: "google" },
  /* A cor de marca do Cursor é um cubo PRETO: rasterizado como está, ele
     é um quadrado invisível no fundo escuro do site. Forçar branco. */
  cursor: { si: "cursor", siCor: "ffffff" },
  n8n: { si: "n8n" },
  "gemini-api": { si: "googlegemini" },
  elevenlabs: { si: "elevenlabs", siCor: "ffffff" },

  /* ---- Front-end ---- */
  html: { si: "html5" },
  css: { si: "css" },
  javascript: { si: "javascript" },
  typescript: { si: "typescript" },
  react: { si: "react" },
  "next-js": { si: "nextdotjs", siCor: "ffffff" },
  "tailwind-css": { si: "tailwindcss" },
  gsap: { si: "greensock" },
  spline: { si: "spline", siCor: "ffffff" },

  /* ---- Back-end ---- */
  python: { si: "python" },
  supabase: { si: "supabase" },
  powershell: { si: "powershell" },

  /* ---- Design & 3D ---- */
  figma: { si: "figma" },
  photoshop: { si: "adobephotoshop" },
  coreldraw: { si: "coreldraw" },
  blender: { si: "blender" },
  "fusion-360": { si: "autodesk" },
  makerworld: { si: "makerworld" },

  /* ---- Ferramentas ---- */
  git: { si: "git" },
  github: { si: "github", siCor: "ffffff" },
  "vs-code": { si: "visualstudiocode" },
  notion: { si: "notion", siCor: "ffffff" },
  miro: { si: "miro" },
  windows: { si: "windows" },
};

/* Segunda tentativa: o devicon.
   O simple-icons TIROU do catálogo as marcas que pediram (Microsoft,
   Adobe, OpenAI) — os slugs `visualstudiocode`, `adobephotoshop`,
   `powershell`, `windows11` e `openai` respondem 404 hoje. O devicon tem
   todas essas, e ainda por cima coloridas ("original" em vez da
   silhueta). */
const DEVICON = {
  powershell: "powershell/powershell-original.svg",
  photoshop: "photoshop/photoshop-original.svg",
  "vs-code": "vscode/vscode-original.svg",
  windows: "windows11/windows11-original.svg",
};

/* Terceira tentativa: URL direta. A do Codex é uma versão ANTIGA do
   pacote simple-icons no npm — a marca saiu do catálogo depois, mas as
   versões publicadas continuam lá. Vem sem cor (`fill` herdado), então
   é preciso pintar antes de rasterizar; ver `pintar` abaixo. */
const DIRETO = {
  codex: {
    url: "https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/openai.svg",
    cor: "#ffffff",
  },
};

/* SVG de silhueta não declara cor: quem pinta é o CSS que o envolve.
   Rasterizado sem isso, sai preto sobre transparente e some no fundo. */
function pintar(svg, cor) {
  return svg.replace("<svg", `<svg fill="${cor}"`);
}

async function baixar(url) {
  const r = await fetch(url, { headers: { "User-Agent": "portfolio-build" } });
  if (!r.ok) return null;
  const txt = await r.text();
  // A CDN devolve 200 com uma página de erro em HTML quando o slug não
  // existe; um SVG de verdade começa com <svg.
  if (!txt.trim().startsWith("<svg")) return null;
  return txt;
}

const faltando = [];
mkdirSync(DESTINO, { recursive: true });

for (const [slug, fonte] of Object.entries(FONTES)) {
  const destino = join(DESTINO, `${slug}.png`);
  if (existsSync(destino)) {
    console.log(`· ${slug} — já existe, pulando`);
    continue;
  }

  let svg = null;

  if (fonte.si) {
    const cor = fonte.siCor ? `/${fonte.siCor}` : "";
    svg = await baixar(`https://cdn.simpleicons.org/${fonte.si}${cor}`);
  }

  if (!svg && DEVICON[slug]) {
    svg = await baixar(
      `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${DEVICON[slug]}`
    );
  }

  if (!svg && DIRETO[slug]) {
    svg = await baixar(DIRETO[slug].url);
    if (svg) svg = pintar(svg, DIRETO[slug].cor);
  }

  if (!svg) {
    faltando.push(slug);
    console.log(`✗ ${slug} — não achei em nenhuma fonte`);
    continue;
  }

  await sharp(Buffer.from(svg), { density: 384 })
    .resize(TAMANHO, TAMANHO, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(destino);

  console.log(`✓ ${slug}.png`);
}

if (faltando.length) {
  console.log(
    `\nSem logo (ficam com o monograma até alguém largar o PNG em public/stack/):\n  ${faltando.join(
      ", "
    )}`
  );
}
