/* Gera public/curriculo/erick-dantas-curriculo.pdf a partir de curriculo.html.
   Usa o Chrome instalado (channel "chrome"); o Playwright vem de outro projeto
   da máquina, por isso o caminho vai na variável PLAYWRIGHT (padrão: o do copos-laser). */
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
const pw = process.env.PLAYWRIGHT ?? `${process.env.HOME}/PROJETOS/copos-laser/node_modules/playwright/index.mjs`;
const { chromium } = await import(pathToFileURL(pw).href);
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage();
await p.goto(pathToFileURL(resolve("scripts/curriculo/curriculo.html")).href, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
mkdirSync("public/curriculo", { recursive: true });
await p.pdf({ path: "public/curriculo/erick-dantas-curriculo.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
await p.screenshot({ path: process.env.PREVIA ?? "/dev/null", fullPage: true }).catch(() => {});
await b.close();
