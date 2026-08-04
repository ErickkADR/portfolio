import { readdirSync } from "node:fs";
import { join, extname, basename } from "node:path";

/* Lê public/certificados/ no build e devolve { slug → caminho }.
 *
 * Por que no build, e não sondando no navegador: a alternativa era pedir
 * a imagem em cada extensão possível e esconder no erro — 13 certificados
 * × 4 extensões = até 52 requisições 404 só para descobrir o que existe.
 * Aqui a lista sai do disco de graça, e o HTML já nasce sabendo.
 *
 * Na prática isso significa que o Erick só precisa salvar o arquivo com o
 * nome do slug (`wizard-teens-course.jpg`) e rodar o build. Nenhuma linha
 * de código muda, e a extensão pode ser qualquer uma das aceitas.
 *
 * Só funciona em Server Component — `node:fs` não existe no navegador.
 */

const ACEITAS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export function certificateImages(): Record<string, string> {
  const dir = join(process.cwd(), "public", "certificados");

  let files: string[];
  try {
    files = readdirSync(dir);
  } catch {
    // A pasta pode nem existir ainda: sem imagem, os cartões saem só com
    // o texto. Não é erro.
    return {};
  }

  const map: Record<string, string> = {};
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!ACEITAS.has(ext)) continue;
    const slug = basename(file, extname(file));
    // O primeiro que aparecer vence — não faz sentido ter duas imagens
    // para o mesmo certificado.
    map[slug] ??= `/certificados/${file}`;
  }
  return map;
}
