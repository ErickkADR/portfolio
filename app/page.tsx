import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Feitos from "@/components/Feitos";
import Metricas from "@/components/Metricas";
import Career from "@/components/Career";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Recomendacoes from "@/components/Recomendacoes";
import Certificates from "@/components/Certificates";
import Formacao from "@/components/Formacao";
import Marquee from "@/components/Marquee";
import MobileDock from "@/components/MobileDock";
import Contact from "@/components/Contact";
import { arquivoPorSlug, mediaPorSlug, imagemAvulsa } from "@/lib/media";
import { hero } from "@/lib/content";

/* A ordem das seções é a ordem da leitura:
   quem sou → o que faço hoje → o que isso rendeu em número → como
   cheguei aqui → o que já construí → com o que construo → o que está no
   papel → onde estudei → para onde vou → como falar comigo.

   As três varreduras de pasta acontecem AQUI, no Server Component, e
   descem como prop. É o que permite o Erick anexar material largando o
   arquivo numa pasta, sem tocar em código. Ver lib/media.ts. */

export default function Home() {
  /* As fotos do hero. A segunda é a versão androide, revelada dentro da
     onda; ausente, a onda só distorce. Ficavam em public/sobre/ e
     mudaram para public/hero/ junto com a seção. */
  const fotoHero = imagemAvulsa("hero", hero.photoName);
  const fotoHeroIA = imagemAvulsa("hero", hero.photoIAName);
  const midiaFeitos = mediaPorSlug("feitos");
  const capasFeitos = arquivoPorSlug("feitos-capas");
  const imagensCertificados = arquivoPorSlug("certificados");
  /* As logos da parede de ferramentas. Mesma ideia das outras varreduras:
     largar `public/stack/<slug>.png` já coloca a logo no ar. */
  const logosStack = arquivoPorSlug("stack");
  const logosFormacao = arquivoPorSlug("formacao");
  const capasCarreira = arquivoPorSlug("carreira-capas");
  /* Fotos do Sobre, em ordem de nome (01-, 02-, 03-). */
  const fotosSobre = Object.entries(arquivoPorSlug("sobre"))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src]) => src);

  return (
    <>
      <Nav />
      <MobileDock />
      <main>
        <Hero photo={fotoHero} photoIA={fotoHeroIA} />
        {/* O Sobre não recebe mais prop de mídia: o fundo dele é o vídeo,
            que é um caminho fixo em content.ts e não uma varredura de
            pasta. */}
        <Sobre fotos={fotosSobre} />
        <Feitos media={midiaFeitos} capas={capasFeitos} />
        <Metricas />
        <Career capas={capasCarreira} />
        <Projects />
        {/* A recomendação vem logo depois dos projetos: é a validação de
            terceiro para o que a pessoa acabou de ver. Some sozinha
            enquanto a lista estiver vazia. */}
        <Recomendacoes />
        <Stack logos={logosStack} />
        <Certificates images={imagensCertificados} />
        <Formacao logos={logosFormacao} />
        {/* A faixa de termos fecha a página. Ela estava no meio, entre o
            "sobre" e os projetos, cortando a leitura no ponto em que ela
            estava engrenando — aqui ela é o respiro antes do contato. */}
        <Marquee />
      </main>
      <Contact />
    </>
  );
}
