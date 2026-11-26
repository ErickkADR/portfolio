import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import { ProvedorIdioma } from "@/lib/idioma";
import Cursor from "@/components/Cursor";
import "./globals.css";

/* FONTES (trocadas em 26/11/2026, pedido dele: "as melhores para
   portfólio"). Eram Bricolage Grotesque + Archivo.
   - Space Grotesk nos títulos: geométrica com detalhe técnico, a cara de
     portfólio de desenvolvedor sem cair no genérico;
   - Geist no texto: feita para interface, lê bem pequena e em parágrafo;
   - Geist Mono nos rótulos (`mono-label`): o ritmo de código que combina
     com o que ele faz;
   - Instrument Serif continua só no itálico de acento. */
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description:
    "Portfólio de interfaces com movimento: design, front-end e 3D em tempo real.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: "Portfólio de interfaces com movimento.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable} ${instrument.variable}`}
    >
      <body>
        {/* O provedor envolve tudo: é ele que o botão EN/PT do Nav
            alterna, e quem `useConteudo()` consulta. */}
        <ProvedorIdioma>
          <SmoothScroll />
          <Cursor />
          <div className="grain" aria-hidden="true" />
          {children}
        </ProvedorIdioma>
      </body>
    </html>
  );
}
