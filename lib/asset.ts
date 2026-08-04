/* Monta o caminho de um arquivo de public/ já com o prefixo do deploy.
 *
 * O basePath do Next só alcança o que passa por ele — rotas, next/link e
 * os chunks. Um `src="/projetos/x/cover.jpg"` cru apontaria para a raiz
 * do domínio, e o site vive em /portfolio. É a mesma armadilha que o
 * <video> do hero já tratava; aqui ela virou função porque agora são
 * dezenas de imagens.
 *
 * `next/image` não resolve isso: com `images.unoptimized` (obrigatório
 * no export estático) o src vai para o HTML como veio.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
