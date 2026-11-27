"use client";

import Link from "next/link";
import { asset } from "@/lib/asset";
import { useConteudo } from "@/lib/idioma";
import RevealText from "@/components/RevealText";
import FadeIn from "@/components/FadeIn";
import SubpageNav from "@/components/SubpageNav";
import StackTiles from "@/components/StackTiles";
import { projects as projetosPT, stack, type StackItem } from "@/lib/content";

/* Nome curto da ficha → nome do item na parede de Stack (é o nome que
   vira o slug da logo em public/stack/). */
const APELIDO: Record<string, string> = {
  Tailwind: "Tailwind CSS",
  Node: "Node.js",
};

/* As ferramentas do projeto saem da ficha "Stack" (em português: nome de
   ferramenta não se traduz, e a ficha em inglês pode mudar o rótulo).
   Cor e flag `branco` vêm do item da parede, quando ele existe lá. */
function ferramentas(slug: string): StackItem[] {
  const ficha = projetosPT
    .find((p) => p.slug === slug)
    ?.facts.find((f) => f.label === "Stack");
  if (!ficha) return [];
  return ficha.value.split("·").map((bruto) => {
    const name = APELIDO[bruto.trim()] ?? bruto.trim();
    return stack.items.find((i) => i.name === name) ?? { name };
  });
}

/* ============================================================
   Página de um projeto: a parte que roda no cliente.

   POR QUE ESTA VIEW EXISTE, separada do `page.tsx`.

   O botão de idioma é estado de cliente (`useConteudo`), e `page.tsx`
   precisa continuar sendo Server Component: é de lá que saem o
   `generateStaticParams` — sem ele o site exportado não tem esta rota — e
   o `generateMetadata`.

   Então o `page.tsx` ficou uma casca: resolve o slug, faz o que só o
   servidor pode fazer e entrega para cá. Todo o texto visível é lido do
   conteúdo pelo hook, então esta página troca de idioma junto com o
   resto do site.

   O `slug` é a chave: ele é o mesmo nos dois idiomas, então a busca pelo
   item funciona igual em PT e em EN.
   ============================================================ */

export default function ProjetoView({
  slug,
  logos,
}: {
  slug: string;
  logos: Record<string, string>;
}) {
  const { projects, projectPage, site } = useConteudo();

  const index = projects.findIndex((p) => p.slug === slug);
  /* O `page.tsx` já chamou `notFound()` para slug inexistente; este guarda
     existe só para o TypeScript não ver `project` como possivelmente
     indefinido. */
  if (index === -1) return null;

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
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn"
                >
                  {projectPage.liveLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
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

            {/* Mesma parede de logos da seção Stack da home (27/11/2026, pedido
                dele): entrada em cascata e relevo no hover. Ferramenta sem
                logo aparece pelo nome. */}
            <StackTiles
              items={ferramentas(slug)}
              logos={logos}
              semLogo="nome"
              className="mt-12"
            />
          </div>
        </header>

        {/* ---------- capa ---------- */}
        <div className="shell">
          <figure
            className="relative mx-auto max-w-[80rem] overflow-hidden rounded-2xl border border-bone/12"
            /* Sem a cor do projeto: o site é preto e branco (27/11/2026). */
            style={{ background: "var(--color-ink-2)" }}
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

        {/* ---------- vídeo de demonstração (quando o projeto tem) ---------- */}
        {project.video && (
          <div className="shell mt-8">
            <figure className="relative mx-auto max-w-[80rem] overflow-hidden rounded-2xl border border-bone/12 bg-ink-2">
              <video
                src={asset(project.video)}
                poster={asset(project.cover.src)}
                controls
                muted
                playsInline
                preload="metadata"
                className="w-full"
              />
            </figure>
          </div>
        )}

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
                    style={{ background: "var(--color-plasma)" }}
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

        {/* ---------- funções (opcional) ----------
            Uma tela por função do produto, com título e texto. Entrou em
            26/11/2026 para a Nexus Print (adesivos, cartelas, etiquetas,
            caixinhas, topo de bolo, Funko). Projeto sem `features` pula. */}
        {project.features && project.features.length > 0 && (
          <section className="border-t border-bone/10 py-24 sm:py-32">
            <div className="shell shell-narrow">
              <h2 className="mono-label text-center text-plasma">
                {projectPage.featuresLabel}
              </h2>
              <div className="mt-14 space-y-20 sm:space-y-28">
                {project.features.map((f, i) => (
                  <article
                    key={f.title}
                    className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14"
                  >
                    <figure
                      className={`overflow-hidden rounded-xl border border-bone/12 bg-ink-2 ${
                        i % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    >
                      <img
                        src={asset(f.image)}
                        alt={f.title}
                        loading="lazy"
                        decoding="async"
                        className="block w-full"
                      />
                    </figure>
                    <div>
                      <span className="mono-label">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display mt-3 text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">
                        {f.title}
                      </h3>
                      <p className="mt-4 leading-relaxed text-bone-dim">{f.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ---------- telas ---------- */}
        {project.gallery.length > 0 && (
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
        )}

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
