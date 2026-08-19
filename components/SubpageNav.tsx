import Link from "next/link";
import { site } from "@/lib/content";

/* O Nav da home é uma barra de âncoras (#projetos, #contato) e não serve
   numa subpágina: as âncoras não existem aqui. Esta é a versão de
   subpágina. Fixa, sem o esconde-e-mostra por direção de scroll: numa
   página de leitura, ter sempre a saída à mão vale mais que ganhar os
   poucos pixels da barra.

   A SAÍDA FICA NO CANTO SUPERIOR ESQUERDO, e é um botão de verdade.
   Antes era um link de texto no canto direito, com a logo à esquerda: o
   voltar é a ação mais provável de quem termina de ler uma página de
   projeto, e no canto direito ele disputava atenção com o "Ver o código"
   e o "Ver ao vivo" do cabeçalho. À esquerda, com borda e seta, ele é a
   primeira coisa que o olho encontra ao subir. A logo trocou de lado e
   continua levando para a home. */

export default function SubpageNav({
  backLabel,
  backHref = "/#projetos",
}: {
  backLabel: string;
  /* Para onde o "voltar" leva. Cada família de subpágina volta para a
     sua seção: projeto para #projetos, etapa de carreira para
     #carreira. */
  backHref?: string;
}) {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-bone/10 bg-ink/80 backdrop-blur-xl"
      aria-label="Navegação da subpágina"
    >
      <div className="shell flex items-center justify-between gap-4 py-4">
        <Link
          href={backHref}
          className="group mono-label inline-flex items-center gap-2.5 rounded-full border border-bone/20 px-4 py-2 transition-colors duration-500 hover:border-plasma hover:text-plasma"
        >
          {/* A seta anda um pouco para trás no hover: confirma a direção
              da ação antes do clique. */}
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
          >
            ←
          </span>
          {backLabel}
        </Link>

        <Link
          href="/"
          className="display shrink-0 text-lg tracking-tight transition-colors hover:text-plasma"
        >
          {site.name.split(" ")[0]}
          <span className="text-plasma">*</span>
        </Link>
      </div>
    </nav>
  );
}
