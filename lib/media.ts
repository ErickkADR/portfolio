import { readdirSync, statSync } from "node:fs";
import { join, extname, basename } from "node:path";

/* Varredura de pastas de mídia, feita no BUILD.
 *
 * Três seções do site funcionam do mesmo jeito: certificados, feitos na
 * Bannerjet e etapas de carreira. Em todas, o Erick larga o arquivo numa
 * pasta e ele aparece — sem editar código, sem cadastrar caminho.
 *
 * Por que no build e não sondando no navegador: a alternativa era pedir
 * cada arquivo em cada extensão possível e esconder no erro — dezenas de
 * requisições 404 só para descobrir o que existe. Lendo a pasta aqui
 * (Server Component + node:fs), o HTML já nasce sabendo.
 *
 * Só funciona em Server Component — `node:fs` não existe no navegador.
 */

export type MediaKind = "image" | "video" | "pdf";

export type MediaFile = {
  /* Caminho dentro de public/, sem o prefixo do deploy (quem monta é o
     `asset()`). */
  src: string;
  kind: MediaKind;
  /* Nome do arquivo sem extensão — vira a legenda quando não há outra. */
  name: string;
};

const KIND: Record<string, MediaKind> = {
  ".jpg": "image",
  ".jpeg": "image",
  ".png": "image",
  ".webp": "image",
  ".avif": "image",
  ".gif": "image",
  ".mp4": "video",
  ".webm": "video",
  ".mov": "video",
  ".pdf": "pdf",
};

/* Ordem de exibição: imagem primeiro (é o que se lê de relance), depois
   vídeo, PDF por último. */
const PESO: Record<MediaKind, number> = { image: 0, video: 1, pdf: 2 };

function listar(dir: string): MediaFile[] {
  let entradas: string[];
  try {
    entradas = readdirSync(dir);
  } catch {
    // Pasta pode nem existir ainda. Sem mídia não é erro: a seção
    // aparece só com o texto.
    return [];
  }

  const arquivos: MediaFile[] = [];
  for (const entrada of entradas) {
    const ext = extname(entrada).toLowerCase();
    const kind = KIND[ext];
    if (!kind) continue;
    arquivos.push({ src: "", kind, name: basename(entrada, ext) });
    // O src é montado por quem chama, que conhece o caminho público.
    arquivos[arquivos.length - 1].src = entrada;
  }

  return arquivos.sort(
    (a, b) => PESO[a.kind] - PESO[b.kind] || a.name.localeCompare(b.name)
  );
}

/* Mídia de uma pasta com SUBPASTAS por slug:
     public/<raiz>/<slug>/arquivo.jpg  →  { [slug]: MediaFile[] }
   É o formato dos feitos e das etapas de carreira, onde cada item pode
   ter vários arquivos. */
export function mediaPorSlug(raiz: string): Record<string, MediaFile[]> {
  const base = join(process.cwd(), "public", raiz);

  let slugs: string[];
  try {
    slugs = readdirSync(base);
  } catch {
    return {};
  }

  const mapa: Record<string, MediaFile[]> = {};
  for (const slug of slugs) {
    const dir = join(base, slug);
    try {
      if (!statSync(dir).isDirectory()) continue;
    } catch {
      continue;
    }
    const arquivos = listar(dir).map((f) => ({
      ...f,
      src: `/${raiz}/${slug}/${f.src}`,
    }));
    if (arquivos.length > 0) mapa[slug] = arquivos;
  }
  return mapa;
}

/* Mídia de uma pasta PLANA, um arquivo por slug:
     public/<raiz>/<slug>.jpg  →  { [slug]: "/<raiz>/<slug>.jpg" }
   É o formato dos certificados — um documento cada. */
export function arquivoPorSlug(raiz: string): Record<string, string> {
  const base = join(process.cwd(), "public", raiz);

  let entradas: string[];
  try {
    entradas = readdirSync(base);
  } catch {
    return {};
  }

  const mapa: Record<string, string> = {};
  for (const entrada of entradas) {
    const ext = extname(entrada).toLowerCase();
    if (KIND[ext] !== "image") continue;
    const slug = basename(entrada, ext);
    // O primeiro vence: não faz sentido ter duas imagens para o mesmo
    // certificado.
    mapa[slug] ??= `/${raiz}/${entrada}`;
  }
  return mapa;
}

/* Um único arquivo conhecido pelo nome-base, em qualquer extensão de
   imagem. Usado pela foto da seção Sobre. */
export function imagemAvulsa(raiz: string, nomeBase: string): string | null {
  const mapa = arquivoPorSlug(raiz);
  return mapa[nomeBase] ?? null;
}
