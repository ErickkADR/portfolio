import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectPage, site } from "@/lib/content";
import { asset } from "@/lib/asset";
import RevealText from "@/components/RevealText";
import FadeIn from "@/components/FadeIn";
import SubpageNav from "@/components/SubpageNav";

/* ============================================================
   Página de um projeto.

   O site é exportado estaticamente (output: "export"), então as rotas
   dinâmicas precisam ser conhecidas no build: `generateStaticParams`
   devolve um slug por projeto e o Next gera projetos/<slug>/index.html
   para cada um. Slug que não estiver nessa lista não existe no site —
   não há servidor para inventá-lo em runtime.
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
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  /* Circular de propósito: do último volta para o primeiro, em vez de
     terminar num beco sem saída. */
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <SubpageNav backLabel={projectPage.back} />

      <main>
        {/* ---------- cabeçalho ---------- */}
        <header className="shell shell-narrow pt-20 pb-14 sm:pt-28">
          <div className="section-head">
            <span className="mono-label">
              {project.index} · {project.category} · {project.year}
            </span>

            <RevealText
              as="h1"
              className="display mt-6 text-[clamp(2.8rem,8vw,6rem)]"
            >
              {project.title}
            </RevealText>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-bone-dim">
              {project.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                className="btn"
              >
                {projectPage.liveLabel}
                <span aria-hidden="true">↗</span>
              </a>
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono-label transition-colors hover:text-plasma"
                >
                  {projectPage.repoLabel} ↗
                </a>
              )}
            </div>
          </div>
        </header>

        {/* ---------- capa ---------- */}
        <div className="shell">
          <figure
            className="relative mx-auto max-w-[80rem] overflow-hidden rounded-2xl border border-bone/12"
            style={{ background: `${project.tint}14` }}
          >
            <img
              src={asset(project.cover.src)}
              alt={project.cover.alt}
              width={1800}
              height={1125}
              /* A capa é a primeira coisa abaixo do título: carregar
                 preguiçosamente aqui só garante que ela chegue tarde. */
              loading="eager"
              decoding="async"
              className="w-full"
            />
          </figure>
        </div>

        {/* ---------- descrição completa ---------- */}
        <section className="shell shell-narrow py-24 sm:py-32">
          <h2 className="mono-label text-center text-plasma">
            {projectPage.overviewLabel}
          </h2>

          <FadeIn className="mx-auto mt-12 max-w-2xl space-y-7">
            {project.overview.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-lg leading-relaxed text-bone-dim"
              >
                {paragraph}
              </p>
            ))}
          </FadeIn>

          {/* ---------- ficha ---------- */}
          <FadeIn className="hairline mx-auto mt-20 grid max-w-3xl gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <span className="mono-label block">{fact.label}</span>
                <p className="mt-2 leading-snug">{fact.value}</p>
              </div>
            ))}
          </FadeIn>
        </section>

        {/* ---------- o que resolve ---------- */}
        <section className="border-t border-bone/10 py-24 sm:py-32">
          <div className="shell shell-narrow">
            <h2 className="mono-label text-center text-plasma">
              {projectPage.highlightsLabel}
            </h2>

            <FadeIn className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-bone/12 bg-bone/12 sm:grid-cols-3">
              {project.highlights.map((h) => (
                <article key={h.title} className="group relative bg-ink p-8">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    style={{ background: project.tint }}
                  />
                  <h3 className="display text-xl leading-tight">{h.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                    {h.body}
                  </p>
                </article>
              ))}
            </FadeIn>
          </div>
        </section>

        {/* ---------- telas ---------- */}
        <section className="border-t border-bone/10 py-24 sm:py-32">
          <div className="shell shell-narrow">
            <h2 className="mono-label text-center text-plasma">
              {projectPage.galleryLabel}
            </h2>

            {/* Uma coluna no celular, duas a partir do tablet: são telas
                de desktop, e a 3 por linha o texto dentro delas fica
                pequeno demais para se ler. */}
            <FadeIn
              className="mt-14 grid gap-6 sm:grid-cols-2"
              selector="figure"
              stagger={0.1}
            >
              {project.gallery.map((image) => (
                <figure
                  key={image.src}
                  className="overflow-hidden rounded-xl border border-bone/12 bg-ink-2"
                >
                  <img
                    src={asset(image.src)}
                    alt={image.alt}
                    width={1800}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="w-full"
                  />
                  <figcaption className="border-t border-bone/10 px-5 py-4 text-sm text-bone-dim">
                    {image.alt}
                  </figcaption>
                </figure>
              ))}
            </FadeIn>
          </div>
        </section>

        {/* ---------- próximo projeto ---------- */}
        <section className="border-t border-bone/10">
          <Link
            href={`/projetos/${next.slug}/`}
            className="group block py-20 transition-colors duration-500 sm:py-28"
          >
            <div className="shell shell-narrow text-center">
              <span className="mono-label">{projectPage.nextLabel}</span>
              <h2 className="display mt-5 text-[clamp(2.2rem,6vw,4.5rem)] transition-colors duration-500 group-hover:text-plasma">
                {next.title}
              </h2>
              <span className="mono-label mt-6 inline-block">
                {next.category} →
              </span>
            </div>
          </Link>
        </section>

        {/* ---------- rodapé enxuto ---------- */}
        <footer className="border-t border-bone/10">
          <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/#projetos"
              className="mono-label transition-colors hover:text-plasma"
            >
              ← {projectPage.back}
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="mono-label transition-colors hover:text-plasma"
            >
              {site.email}
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
