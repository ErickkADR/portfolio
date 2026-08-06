"use client";

import { useEffect, useState } from "react";
import { IconSun, IconMoon } from "@tabler/icons-react";

/* ============================================================
   Botão de tema.

   O tema é aplicado como `data-theme` no <html>, e não numa classe de
   um wrapper: o fundo da página vem do <body>, e um wrapper só cobriria
   a área do conteúdo — sobraria a cor antiga nas bordas quando a página
   é mais curta que a janela.

   O valor é lido ANTES da primeira pintura por um script inline no
   <head> (ver app/layout.tsx). Se a leitura ficasse aqui, no efeito, a
   página pintaria escura e trocaria para clara depois da hidratação —
   o flash branco que todo site com tema tem quando é feito errado.

   Por isso este componente começa sem saber o tema (`null`) e só mostra
   o ícone depois de montar: renderizar "lua" no servidor e "sol" no
   cliente seria um erro de hidratação garantido.
   ============================================================ */

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const atual =
      (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
    setTheme(atual);
  }, []);

  const alternar = () => {
    const proximo: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = proximo;
    try {
      localStorage.setItem("tema", proximo);
    } catch {
      // Modo privado bloqueia o localStorage. A troca continua valendo
      // nesta sessão; só não sobrevive ao recarregar.
    }
    setTheme(proximo);
  };

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
      title={theme === "light" ? "Tema escuro" : "Tema claro"}
      className="grid h-9 w-9 place-items-center rounded-full border border-bone/15 text-bone-dim transition-colors duration-300 hover:border-plasma hover:text-plasma [&>svg]:h-[18px] [&>svg]:w-[18px]"
    >
      {/* Enquanto o tema não foi lido, um espaço vazio do mesmo tamanho
          segura o layout sem arriscar divergir do HTML do servidor. */}
      {theme === null ? (
        <span className="sr-only">Tema</span>
      ) : theme === "light" ? (
        <IconMoon />
      ) : (
        <IconSun />
      )}
    </button>
  );
}
