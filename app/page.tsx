import Nav from "@/components/Nav";
import HeroVideo from "@/components/HeroVideo";
import Sobre from "@/components/Sobre";
import Feitos from "@/components/Feitos";
import Metricas from "@/components/Metricas";
import Career from "@/components/Career";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Recomendacoes from "@/components/Recomendacoes";
import Certificates from "@/components/Certificates";
import Formacao from "@/components/Formacao";
import Metas from "@/components/Metas";
import Marquee from "@/components/Marquee";
import MobileDock from "@/components/MobileDock";
import Contact from "@/components/Contact";
import { arquivoPorSlug, mediaPorSlug, imagemAvulsa } from "@/lib/media";
import { sobre } from "@/lib/content";

/* A ordem das seções é a ordem da leitura:
   quem sou → o que faço hoje → o que isso rendeu em número → como
   cheguei aqui → o que já construí → com o que construo → o que está no
   papel → onde estudei → para onde vou → como falar comigo.

   As três varreduras de pasta acontecem AQUI, no Server Component, e
   descem como prop. É o que permite o Erick anexar material largando o
   arquivo numa pasta, sem tocar em código. Ver lib/media.ts. */

export default function Home() {
  const fotoSobre = imagemAvulsa("sobre", sobre.photoName);
  /* A segunda foto do Sobre: é ela que aparece dentro da mancha líquida
     no hover. Ausente, o quadro volta a ser uma foto comum. */
  const fotoSobreIA = imagemAvulsa("sobre", sobre.photoIAName);
  const midiaFeitos = mediaPorSlug("feitos");
  const imagensCertificados = arquivoPorSlug("certificados");

  return (
    <>
      <Nav />
      <MobileDock />
      <main>
        <HeroVideo />
        <Sobre photo={fotoSobre} photoIA={fotoSobreIA} />
        <Feitos media={midiaFeitos} />
        <Metricas />
        <Career />
        <Projects />
        {/* A recomendação vem logo depois dos projetos: é a validação de
            terceiro para o que a pessoa acabou de ver. Some sozinha
            enquanto a lista estiver vazia. */}
        <Recomendacoes />
        <Stack />
        <Certificates images={imagensCertificados} />
        <Formacao />
        <Metas />
        {/* A faixa de termos fecha a página. Ela estava no meio, entre o
            "sobre" e os projetos, cortando a leitura no ponto em que ela
            estava engrenando — aqui ela é o respiro antes do contato. */}
        <Marquee />
      </main>
      <Contact />
    </>
  );
}
