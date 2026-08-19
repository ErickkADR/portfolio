import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, site } from "@/lib/content";
import ProjetoView from "./view";

/* ============================================================
   Página de um projeto: a casca de servidor.

   O site é exportado estaticamente (output: "export"), então as rotas
   dinâmicas precisam ser conhecidas no build: `generateStaticParams`
   devolve um slug por projeto e o Next gera projetos/<slug>/index.html
   para cada um. Slug que não estiver nessa lista não existe no site —
   não há servidor para inventá-lo em runtime.

   O conteúdo visível vive em `view.tsx`, que é Server Component nenhum:
   precisa do hook de idioma. Ver a nota lá.

   Os metadados usam o conteúdo em PORTUGUÊS: eles são gerados no build,
   um por rota, e não têm como acompanhar um botão que é estado de
   cliente.
   ============================================================ */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${site.name}`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (!projects.some((p) => p.slug === slug)) notFound();

  return <ProjetoView slug={slug} />;
}
