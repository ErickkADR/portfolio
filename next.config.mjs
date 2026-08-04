/* O site é servido pelo GitHub Pages em erickkadr.github.io/portfolio,
   ou seja, dentro de uma subpasta. Duas consequências:

   1. `basePath`/`assetPrefix` fazem o Next gerar os links e os chunks já
      com o prefixo. Sem isso o site abre e fica em branco: o HTML pede
      /_next/... na raiz do domínio, onde não existe nada.

   2. O prefixo NÃO é aplicado a `src` escrito à mão (o <video> do hero),
      só ao que passa pelo Next. Por isso ele também é exposto como env
      pública, para o componente montar o caminho.

   Rodar `npm run dev` sem a variável mantém tudo na raiz, como antes. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // GitHub Pages serve arquivos estáticos: não há servidor Node para
  // renderizar nada sob demanda.
  output: "export",

  basePath,
  assetPrefix: basePath || undefined,

  // Sem servidor não há otimização de imagem sob demanda.
  images: { unoptimized: true },

  // Cada rota vira uma pasta com index.html, que é o que o Pages espera.
  trailingSlash: true,
};

export default nextConfig;
