const opentype = require(process.argv[2] + "/node_modules/opentype.js");
const fs = require("fs");

const [, , fdir, svgIn, svgOut] = process.argv;
const buf = fs.readFileSync(fdir + "/Graduate.ttf"); const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const K = 8;
/* A Graduate é mais fina que o letreiro original: engrossa com um
   contorno da mesma cor (PESO em unidades do viewBox), e a caixa encolhe
   meio contorno de cada lado para o tamanho final bater. */
const PESO = 14;
function linha(txt, x0, y0, x1, y1) {
  const m = PESO / 2 / K;
  x0 += m; y0 += m; x1 -= m; y1 -= m;
  const p = font.getPath(txt, 0, 0, 100);
  const bb = p.getBoundingBox();
  const sx = ((x1 - x0) * K) / (bb.x2 - bb.x1), sy = ((y1 - y0) * K) / (bb.y2 - bb.y1);
  const tx = x0 * K - bb.x1 * sx, ty = y0 * K - bb.y1 * sy;
  const sw = (PESO / ((sx + sy) / 2)).toFixed(3);
  return `<path fill="#423BED" stroke="#423BED" stroke-width="${sw}" stroke-linejoin="round" transform="matrix(${sx.toFixed(4)} 0 0 ${sy.toFixed(4)} ${tx.toFixed(2)} ${ty.toFixed(2)})" d="${p.toPathData(2)}"/>`;
}
let svg = fs.readFileSync(svgIn, "utf8")
  .replace(/<\?xml[^>]*>\n?/, "").replace(/<!--[^>]*-->\n?/, "")
  .replace(/fill="#000000"/g, 'fill="#423BED"')
  .replace(/<svg[^>]*>/, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2528 2512" width="632" height="628">');
svg = svg.replace("</svg>", linha("DERVILLE", 103, 235, 202.5, 251.5) + linha("ALLEGRETTI", 90.5, 261, 222.5, 278) + "</svg>");
fs.writeFileSync(svgOut, svg);
