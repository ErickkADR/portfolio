import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { career, careerPage, site } from "@/lib/content";
import { mediaPorSlug } from "@/lib/media";
import RevealText from "@/components/RevealText";
import FadeIn from "@/components/FadeIn";
import SubpageNav from "@/components/SubpageNav";
import CareerMedia from "@/components/CareerMedia";

/* ============================================================
   Página de uma etapa da carreira.

   Existe para responder a pergunta que todo portfólio deixa no ar:
   "prova". Cada etapa reúne o material daquele período — certificado,
   print do projeto, vídeo, PDF — lido de `public/carreira/<slug>/` no
   build (ver lib/media.ts).

   Como o site é exportado estaticamente, as rotas precisam existir no
   build: `generateStaticParams` devolve um slug por etapa. Etapa sem
   material continua tendo página; ela só diz que o material está sendo
   digitalizado, em vez de fingir que a etapa não existiu.
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

  const titulo = entry.org ? `${entry.role} — ${entry.org}` : entry.role;
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
  const index = career.entries.findIndex((e) => e.slug === slug);
  if (index === -1) notFound();

  const entry = career.entries[index];
  /* Circular: da última volta para a primeira, em vez de terminar num
     beco sem saída. */
  const next = career.entries[(index + 1) % career.entries.length];

  const files = mediaPorSlug("carreira")[slug] ?? [];

  return (
    <>
      <SubpageNav backLabel={careerPage.back} backHref="/#carreira" />

      <main>
        <header className="shell shell-narrow pt-20 pb-14 sm:pt-28">
          <div className="section-head">
            <span className="mono-label">{entry.period}</span>

            <RevealText
              as="h1"
              className="display mt-6 text-[clamp(2.4rem,7vw,5rem)]"
            >
              {entry.role}
            </RevealText>

            {entry.org && (
              <p className="mono-label mt-5 text-plasma">{entry.org}</p>
            )}

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
              {entry.body}
            </p>

            {entry.tags.length > 0 && (
              <ul className="mt-8 flex flex-wrap justify-center gap-1.5">
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-bone/15 px-2.5 py-1 text-[0.6875rem] tracking-wide text-bone-dim"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        {entry.detail && entry.detail.length > 0 && (
          <section className="shell shell-narrow pb-8">
            <FadeIn className="mx-auto max-w-2xl space-y-6">
              {entry.detail.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="text-lg leading-relaxed text-bone-dim"
                >
                  {p}
                </p>
              ))}
            </FadeIn>
          </section>
        )}

        <section className="border-t border-bone/10 py-24 sm:py-32">
          <div className="shell shell-narrow">
            <h2 className="mono-label text-center text-plasma">
              {careerPage.materialLabel}
            </h2>

            <div className="mt-14">
              <CareerMedia
                files={files}
                title={entry.role}
                emptyLabel={careerPage.materialEmpty}
              />
            </div>
          </div>
        </section>

        <section className="border-t border-bone/10">
          <Link
            href={`/carreira/${next.slug}/`}
            className="group block py-20 transition-colors duration-500 sm:py-28"
          >
            <div className="shell shell-narrow text-center">
              <span className="mono-label">{careerPage.nextLabel}</span>
              <h2 className="display mt-5 text-[clamp(2rem,5vw,3.6rem)] transition-colors duration-500 group-hover:text-plasma">
                {next.role}
              </h2>
              <span className="mono-label mt-6 inline-block">
                {next.period} →
              </span>
            </div>
          </Link>
        </section>

        <footer className="border-t border-bone/10">
          <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/#carreira"
              className="mono-label transition-colors hover:text-plasma"
            >
              ← {careerPage.back}
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
