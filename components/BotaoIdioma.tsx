"use client";

import { useConteudo, useIdioma } from "@/lib/idioma";
import { BandeiraBrasil, BandeiraEUA } from "./Bandeiras";

/* O botão PT/EN, com a bandeira do idioma para o qual o clique LEVA.

   Mostrar o destino, e não o idioma atual, é a leitura que a pessoa faz de
   um botão: em português ela vê a bandeira dos Estados Unidos e "EN", que
   é a pergunta "quer em inglês?". Mostrar a bandeira do Brasil enquanto o
   site já está em português não ofereceria nada.

   Vive num componente próprio porque aparece em dois lugares: na barra do
   topo (a partir de md) e solto no canto no celular, onde aquela barra não
   existe — antes disso, quem abria no telefone não tinha como trocar de
   idioma. */

export default function BotaoIdioma({ className = "" }: { className?: string }) {
  const { idioma, alternar } = useIdioma();
  const { ui } = useConteudo();
  const paraIngles = idioma === "pt";

  return (
    <button
      type="button"
      onClick={alternar}
      /* O rótulo do leitor de tela vai no idioma de DESTINO, que é o
         idioma da ação. */
      aria-label={paraIngles ? ui.mudarParaIngles : ui.mudarParaPortugues}
      className={`mono-label inline-flex items-center gap-2 rounded-full border border-bone/12 bg-ink-2/60 px-3.5 py-2 backdrop-blur-xl transition-colors hover:border-plasma hover:text-plasma ${className}`}
    >
      {paraIngles ? (
        <BandeiraEUA className="h-[15px] w-[15px] shrink-0" />
      ) : (
        <BandeiraBrasil className="h-[15px] w-[15px] shrink-0" />
      )}
      {paraIngles ? "EN" : "PT"}
    </button>
  );
}
