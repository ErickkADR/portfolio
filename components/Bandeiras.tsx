"use client";

import { useId } from "react";

/* ============================================================
   BANDEIRAS — SVG, e não emoji.

   `🇧🇷` e `🇺🇸` são pares de indicadores regionais, e só viram bandeira se
   a fonte do sistema tiver o glifo. No Windows não tem: aparecem as
   LETRAS "BR" e "US". Ele trabalha em duas máquinas Windows, então o
   emoji estaria quebrado justamente onde ele mais olha o site.

   As duas são desenhadas dentro de um círculo, para lerem como ícone ao
   lado do rótulo em vez de um retângulo colado no texto. São simplificadas
   de propósito: a 15px, a faixa "Ordem e Progresso" e as 50 estrelas
   viram sujeira.
   ============================================================ */

export function BandeiraBrasil({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="12" fill="#009c3b" />
      {/* O losango não toca a borda: no original ele tem margem, e sem ela
          o verde desaparece. */}
      <path d="M12 3.4 20.6 12 12 20.6 3.4 12Z" fill="#ffdf00" />
      <circle cx="12" cy="12" r="4.1" fill="#002776" />
    </svg>
  );
}

export function BandeiraEUA({ className = "" }: { className?: string }) {
  /* O `clipPath` precisa de id único: duas bandeiras na mesma página com
     id fixo fariam a segunda apagar a primeira. */
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const corte = `bandeira-eua-${uid}`;

  /* 13 faixas em 24 de altura. As ímpares são vermelhas, como no
     original: a primeira e a última precisam ser vermelhas, e isso só
     fecha com número ímpar de faixas. */
  const altura = 24 / 13;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={corte}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${corte})`}>
        <rect width="24" height="24" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect
            key={i}
            y={i * altura}
            width="24"
            height={altura}
            fill="#b31942"
          />
        ))}
        {/* O cantão cobre as 7 primeiras faixas, como no original. */}
        <rect width="10.6" height={altura * 7} fill="#0a3161" />
      </g>
    </svg>
  );
}
