import Link from "next/link";
import { site } from "@/lib/content";

/* O Nav da home é uma barra de âncoras (#projetos, #contato) e não serve
   numa subpágina: as âncoras não existem aqui. Esta é a versão de
   subpágina — logo, volta e e-mail. Fixa, sem o esconde-e-mostra por
   direção de scroll: numa página de leitura, ter sempre a saída à mão
   vale mais que ganhar os poucos pixels da barra. */

export default function SubpageNav({
  backLabel,
  backHref = "/#projetos",
}: {
  backLabel: string;
  /* Para onde o "voltar" leva. Cada família de subpágina volta para a
     sua seção — projeto para #projetos, etapa de carreira para
     #carreira. */
  backHref?: string;
}) {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-bone/10 bg-ink/80 backdrop-blur-xl"
      aria-label="Navegação da página de projeto"
    >
      <div className="shell flex items-center justify-between py-4">
        <Link
          href="/"
          className="display text-lg tracking-tight transition-colors hover:text-plasma"
        >
          {site.name.split(" ")[0]}
          <span className="text-plasma">*</span>
        </Link>

        <Link
          href="/#projetos"
          className="mono-label transition-colors hover:text-plasma"
        >
          ← {backLabel}
        </Link>
      </div>
    </nav>
  );
}
