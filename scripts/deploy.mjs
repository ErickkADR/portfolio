#!/usr/bin/env node
/* Publica o conteúdo de out/ na branch gh-pages.
 *
 * Usa uma worktree órfã em vez de trocar de branch no diretório de
 * trabalho: assim a gh-pages não compartilha histórico com a main (ela
 * guarda só o site construído) e o seu working tree nunca é mexido —
 * um deploy no meio de uma edição não atrapalha nada.
 *
 * A branch é reconstruída do zero a cada deploy, então arquivos que
 * deixaram de existir no build somem do site em vez de ficarem órfãos.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, rmSync, writeFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const git = (...args) =>
  execFileSync("git", args, { stdio: "inherit", cwd: process.cwd() });

if (!existsSync("out")) {
  console.error("out/ não existe. Rode `npm run build` antes.");
  process.exit(1);
}

const wt = mkdtempSync(join(tmpdir(), "ghpages-"));

try {
  // -B recria a branch do zero; --orphan garante que ela não carregue
  // nenhum commit da main junto.
  git("worktree", "add", "--orphan", "-b", "gh-pages-tmp", wt, "-q");

  cpSync("out", wt, { recursive: true });

  // Sem .nojekyll o GitHub Pages ignora a pasta _next (nomes começando
  // com underscore são tratados como internos do Jekyll) e o site sobe
  // sem CSS nem JavaScript.
  writeFileSync(join(wt, ".nojekyll"), "");

  execFileSync("git", ["add", "-A"], { stdio: "inherit", cwd: wt });
  execFileSync("git", ["commit", "-q", "-m", `Deploy ${new Date().toISOString()}`], {
    stdio: "inherit",
    cwd: wt,
  });
  execFileSync("git", ["push", "-f", "origin", "gh-pages-tmp:gh-pages"], {
    stdio: "inherit",
    cwd: wt,
  });

  console.log("\nPublicado em https://erickkadr.github.io/portfolio/");
} finally {
  try {
    git("worktree", "remove", "--force", wt);
  } catch {}
  try {
    git("branch", "-D", "gh-pages-tmp");
  } catch {}
  rmSync(wt, { recursive: true, force: true });
}
