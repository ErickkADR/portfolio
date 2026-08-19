/* Gera a frente do crachá do Lanyard (seção Carreira).
 *
 * Por que um gerador e não um PNG solto: o crachá é tipografia e cor do
 * site, não uma foto. Assim, mudar nome, cargo ou paleta é mexer aqui e
 * rodar `node scripts/gera-cracha.mjs`, em vez de reabrir um editor de
 * imagem e perder o arquivo-fonte.
 *
 * A textura padrão do card.glb é a marca do React Bits. Num portfólio
 * isso seria estranho, então a face da frente entra pelo `frontImage` do
 * componente, que compõe a imagem no atlas do modelo em tempo de
 * execução.
 *
 * Proporção 1:1.4, a mesma do colisor do card no modelo (meia-extensão
 * 0.8 x 1.125).
 */
import sharp from "sharp";

const W = 800;
const H = 1120;

const barras = Array.from({ length: 34 }, (_, i) => {
  const x = 70 + i * 19;
  const largura = [3, 6, 9, 4][i % 4];
  return `<rect x="${x}" y="930" width="${largura}" height="86" fill="#f2f0f7" fill-opacity="0.7"/>`;
}).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="fundo" x1="0" y1="0" x2="0.4" y2="1">
      <stop offset="0%" stop-color="#141024"/>
      <stop offset="55%" stop-color="#0b0814"/>
      <stop offset="100%" stop-color="#07060b"/>
    </linearGradient>
    <radialGradient id="brilho" cx="0.5" cy="0.12" r="0.75">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#fundo)"/>
  <rect width="${W}" height="${H}" fill="url(#brilho)"/>

  <rect x="26" y="26" width="${W - 52}" height="${H - 52}" rx="26"
        fill="none" stroke="#f2f0f7" stroke-opacity="0.16" stroke-width="3"/>

  <text x="70" y="150" fill="#9c97ad" font-family="Helvetica,Arial,sans-serif"
        font-size="30" letter-spacing="7">BANNERJET GROUP</text>
  <circle cx="710" cy="140" r="13" fill="#a855f7"/>

  <text x="66" y="470" fill="#f2f0f7" font-family="Helvetica,Arial,sans-serif"
        font-size="112" font-weight="bold" letter-spacing="-3">ERICK</text>
  <text x="66" y="580" fill="#f2f0f7" font-family="Helvetica,Arial,sans-serif"
        font-size="112" font-weight="bold" letter-spacing="-3">DANTAS</text>

  <rect x="70" y="628" width="150" height="7" rx="3" fill="#a855f7"/>

  <text x="70" y="712" fill="#cba6f7" font-family="Helvetica,Arial,sans-serif"
        font-size="37" font-weight="bold">Criador de Produto</text>
  <text x="70" y="762" fill="#cba6f7" font-family="Helvetica,Arial,sans-serif"
        font-size="37" font-weight="bold">Técnico</text>

  <text x="70" y="838" fill="#9c97ad" font-family="Helvetica,Arial,sans-serif"
        font-size="27" letter-spacing="3">IA · AUTOMAÇÃO · FRONT-END</text>

  ${barras}

  <text x="70" y="1058" fill="#9c97ad" font-family="Helvetica,Arial,sans-serif"
        font-size="26" letter-spacing="4">@ERICKK.ADR</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/lanyard/cracha-frente.png");
console.log("gerado: public/lanyard/cracha-frente.png");
