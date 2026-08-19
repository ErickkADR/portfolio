import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { career, site } from "@/lib/content";
import { mediaPorSlug } from "@/lib/media";
import CarreiraView from "./view";

/* ============================================================
   Página de uma etapa da carreira: a casca de servidor.

   Duas coisas só podem acontecer aqui: as rotas do build
   (`generateStaticParams`, obrigatório num site exportado) e a varredura
   de `public/carreira/<slug>/` com `node:fs`, que não existe no
   navegador. O resto é `view.tsx`, que precisa do hook de idioma.

   Etapa sem material continua tendo página; ela só diz que o material
   está sendo digitalizado, em vez de fingir que a etapa não existiu.

   Os metadados usam o conteúdo em PORTUGUÊS: são gerados no build e não
   acompanham um botão que é estado de cliente.
   ============================================================ */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return career.entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = career.entries.find((e) => e.slug === slug);
  if (!entry) return {};

  const titulo = entry.org ? `${entry.role} · ${entry.org}` : entry.role;
  return {
    title: `${titulo} · ${site.name}`,
    description: entry.body.slice(0, 160),
  };
}

export default async function CareerEntryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!career.entries.some((e) => e.slug === slug)) notFound();

  const files = mediaPorSlug("carreira")[slug] ?? [];

  return <CarreiraView slug={slug} files={files} />;
}
