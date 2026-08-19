"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { conteudo as conteudoPt, type Conteudo } from "./content";
import { conteudoEn } from "./content-en";

/* ============================================================
   IDIOMA — o botão EN/PT do header, e de onde o texto vem.

   ---- O truque que faz isso ser incremental ----
   O dicionário inglês é PARCIAL. `mesclar` sobrepõe o que existe em EN
   sobre a árvore em português, campo por campo, e o que não foi traduzido
   simplesmente continua em português. Nada quebra, nada aparece vazio, e
   traduzir mais é acrescentar chaves em `content-en.ts` — sem tocar em
   componente nenhum.

   Em ARRAY a mescla é POR ÍNDICE, de propósito: assim dá para traduzir o
   `body` do terceiro feito e deixar as `tags` dele como estão. A
   contrapartida é que a ordem dos itens nos dois arquivos tem de ser a
   mesma; mudou a ordem no português, mudou no inglês.

   ---- O que já responde ao botão ----
   Nav, Hero, Sobre e Contato: são os que leem por `useConteudo()`. As
   outras seções ainda importam o objeto português direto e por isso
   seguem em português com o botão em EN.

   PARA CONVERTER UMA SEÇÃO (é mecânico, três linhas):
     1. troque `import { feitos } from "@/lib/content"` por
        `import { useConteudo } from "@/lib/idioma"`;
     2. dentro do componente: `const { feitos } = useConteudo();`
     3. acrescente as chaves traduzidas em `content-en.ts`.
   Componente de servidor não pode usar o hook — as páginas de projeto e
   de carreira precisariam virar uma casca de servidor com a view em
   cliente antes.
   ============================================================ */

export type Idioma = "pt" | "en";

/* Objeto simples = mescla recursiva. Qualquer outra coisa (string, número,
   array de string) é substituída inteira pelo valor em inglês. */
function ehObjeto(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function mesclar<T>(base: T, sobre: unknown): T {
  if (sobre === undefined) return base;

  if (Array.isArray(base) && Array.isArray(sobre)) {
    return base.map((item, i) =>
      i < sobre.length ? mesclar(item, sobre[i]) : item
    ) as unknown as T;
  }

  if (ehObjeto(base) && ehObjeto(sobre)) {
    const saida: Record<string, unknown> = { ...base };
    for (const chave of Object.keys(sobre)) {
      saida[chave] = mesclar(
        (base as Record<string, unknown>)[chave],
        sobre[chave]
      );
    }
    return saida as T;
  }

  return sobre as T;
}

const CHAVE = "portfolio:idioma";

type Ctx = { idioma: Idioma; alternar: () => void };

const Contexto = createContext<Ctx>({ idioma: "pt", alternar: () => {} });

export function ProvedorIdioma({ children }: { children: React.ReactNode }) {
  /* Nasce em "pt" nos dois lados: o HTML é gerado no build (o site é
     `output: export`) e um estado inicial lido do localStorage daria
     divergência de hidratação. A preferência salva é aplicada no efeito,
     logo depois. */
  const [idioma, setIdioma] = useState<Idioma>("pt");

  useEffect(() => {
    if (window.localStorage.getItem(CHAVE) === "en") setIdioma("en");
  }, []);

  useEffect(() => {
    /* O `lang` do documento acompanha: é o que faz leitor de tela e
       tradutor do navegador pronunciarem e tratarem a página certo. */
    document.documentElement.lang = idioma === "en" ? "en" : "pt-BR";
  }, [idioma]);

  const alternar = useCallback(() => {
    setIdioma((atual) => {
      const proximo: Idioma = atual === "pt" ? "en" : "pt";
      window.localStorage.setItem(CHAVE, proximo);
      return proximo;
    });
  }, []);

  const valor = useMemo(() => ({ idioma, alternar }), [idioma, alternar]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useIdioma() {
  return useContext(Contexto);
}

/* O conteúdo em inglês é montado uma vez, não a cada render. */
const conteudoMesclado = mesclar(conteudoPt, conteudoEn) as Conteudo;

export function useConteudo(): Conteudo {
  const { idioma } = useIdioma();
  return idioma === "en" ? conteudoMesclado : conteudoPt;
}
