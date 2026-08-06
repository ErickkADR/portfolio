import type { ReactNode } from "react";
import {
  IconBrandJavascript,
  IconBrandTypescript,
  IconBrandHtml5,
  IconBrandCss3,
  IconBrandPython,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandGit,
  IconBrandGithub,
  IconBrandNotion,
  IconBrandWindows,
  IconBrandSupabase,
  IconBrandPowershell,
  IconBrandAdobe,
  IconBrandGoogle,
  IconBrandOpenai,
  IconBrandVscode,
  IconBrandFigma,
  IconBrandNodejs,
  IconBrandThreejs,
} from "@tabler/icons-react";

/* ============================================================
   Logos das tecnologias — fonte única para o hero e a seção Stack.

   Vêm do @tabler/icons-react, que já era dependência do dock: nenhum
   pacote novo e nenhum SVG buscado em CDN, o que importa porque o site
   é exportado estático e não pode depender de rede em runtime.

   Cada logo carrega a cor da própria marca. Aqui elas são exceção à
   regra roxa do site: uma parede de logos monocromáticas vira um borrão,
   e é justamente o reconhecimento instantâneo de cada marca que faz a
   seção funcionar.

   Quem não tem ícone de marca pronto (n8n, Callbell, ElevenLabs, os
   softwares de equipamento) não fica de fora nem quebra o alinhamento:
   cai no monograma, as iniciais dentro do mesmo ladrilho.
   ============================================================ */

export type Logo = { node: ReactNode; color: string };

export const LOGOS: Record<string, Logo> = {
  javascript: { node: <IconBrandJavascript />, color: "#f7df1e" },
  typescript: { node: <IconBrandTypescript />, color: "#3178c6" },
  html: { node: <IconBrandHtml5 />, color: "#e34f26" },
  css: { node: <IconBrandCss3 />, color: "#1572b6" },
  python: { node: <IconBrandPython />, color: "#3776ab" },
  react: { node: <IconBrandReact />, color: "#61dafb" },
  /* As marcas cuja logo é branca (Next.js, GitHub, Notion, three.js) não
     podem ter "#ffffff" fixo: no tema claro elas desapareceriam no
     fundo. `var(--color-bone)` é a cor de texto do tema em vigor, então
     elas ficam claras no escuro e escuras no claro — que é exatamente
     como essas marcas se comportam nos próprios sites. */
  nextjs: { node: <IconBrandNextjs />, color: "var(--color-bone)" },
  tailwind: { node: <IconBrandTailwind />, color: "#38bdf8" },
  git: { node: <IconBrandGit />, color: "#f05032" },
  github: { node: <IconBrandGithub />, color: "var(--color-bone)" },
  notion: { node: <IconBrandNotion />, color: "var(--color-bone)" },
  windows: { node: <IconBrandWindows />, color: "#0078d4" },
  supabase: { node: <IconBrandSupabase />, color: "#3ecf8e" },
  powershell: { node: <IconBrandPowershell />, color: "#5391fe" },
  adobe: { node: <IconBrandAdobe />, color: "#ff0000" },
  google: { node: <IconBrandGoogle />, color: "#4285f4" },
  openai: { node: <IconBrandOpenai />, color: "#10a37f" },
  vscode: { node: <IconBrandVscode />, color: "#007acc" },
  figma: { node: <IconBrandFigma />, color: "#f24e1e" },
  node: { node: <IconBrandNodejs />, color: "#5fa04e" },
  three: { node: <IconBrandThreejs />, color: "var(--color-bone)" },
};

/* Nome do item → nome do arquivo em public/stack/.
   "Claude Code" → claude-code, "Next.js" → next-js, "Fusion 360" →
   fusion-360. É o que permite acrescentar uma ferramenta no content.ts e
   a logo aparecer só por existir o PNG na pasta, sem cadastrar caminho
   em lugar nenhum. */
export function slugify(nome: string) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    // Tira os acentos que o NFD separou da letra.
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* Monograma: até duas letras. "Claude Code" vira CC, "n8n" vira N8. */
export function monograma(nome: string) {
  const palavras = nome.split(/[\s.]+/).filter(Boolean);
  if (palavras.length > 1) {
    return (palavras[0][0] + palavras[1][0]).toUpperCase();
  }
  return nome.slice(0, 2).toUpperCase();
}

export function getLogo(icon?: string): Logo | null {
  return icon ? LOGOS[icon] ?? null : null;
}
