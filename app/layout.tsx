import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Archivo, Instrument_Serif } from "next/font/google";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
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
      data-theme="dark"
      className={`${bricolage.variable} ${archivo.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Roda ANTES da primeira pintura e antes do React: se a leitura
            do tema ficasse num efeito, a página pintaria escura e só
            depois trocaria para clara — o flash branco clássico.

            `suppressHydrationWarning` no <html> porque este script muda
            o atributo antes de o React comparar o DOM com o HTML que o
            servidor mandou; sem ele, o React reclama da diferença que
            nós mesmos causamos de propósito. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("tema");if(!t){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <SmoothScroll />
        <Cursor />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
