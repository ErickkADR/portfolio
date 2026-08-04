"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   Cena Spline montada direto sobre o runtime, sem o wrapper React.

   Motivo: @splinetool/react-spline@4 só declara a condição `import`
   no seu export map, então o build de servidor do Next não consegue
   resolvê-lo, e a variante `/next` é um Server Component assíncrono —
   inutilizável dentro de um componente cliente. O runtime declara
   `import` e `require`, resolve limpo, e ainda nos dá controle sobre
   QUANDO baixar a cena.

   Esse "quando" importa: o runtime passa de 1 MB. Carregar no mount
   competiria com o vídeo do hero pela banda. O IntersectionObserver
   segura tudo até a seção chegar perto da viewport.
   ============================================================ */

export type SplineApp = {
  dispose: () => void;
  getAllObjects: () => { name: string; visible: boolean }[];
  findObjectByName: (name: string) => { visible: boolean } | undefined;
  setZoom: (value: number) => void;
};

type Props = {
  scene: string;
  onLoad?: (app: SplineApp) => void;
  className?: string;
};

export default function SplineScene({ scene, onLoad, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  // Fase 1: só observa. Nada de WebGL até a seção se aproximar.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      /* Margem generosa de propósito: entre disparar o observer e o robô
         aparecer há o download do runtime (~1 MB) mais o da cena. Com
         300px a seção chegava na tela ainda vazia. Começar quase uma
         tela antes dá tempo de a cena estar pronta na hora certa. */
      { rootMargin: "900px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fase 2: sobe o runtime e carrega a cena.
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app: SplineApp | null = null;
    let cancelled = false;

    (async () => {
      try {
        const { Application } = await import("@splinetool/runtime");
        if (cancelled) return;

        const instance = new Application(canvas) as unknown as SplineApp;
        app = instance;
        await (instance as unknown as { load: (s: string) => Promise<void> }).load(
          scene
        );
        if (cancelled) return;
        // A instância é entregue a quem montou a cena: é por ela que dá
        // para esconder objetos ou reagir a eventos do próprio Spline.
        onLoad?.(instance);
      } catch (err) {
        if (!cancelled) {
          console.error("[Spline] falha ao carregar a cena:", err);
          setFailed(true);
        }
      }
    })();

    return () => {
      cancelled = true;
      // dispose() libera o contexto WebGL. Sem isso, navegar entre
      // rotas vaza contextos até o browser derrubar os mais antigos.
      app?.dispose();
    };
  }, [visible, scene, onLoad]);

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center px-6 text-center">
        <p className="mono-label max-w-xs leading-relaxed">
          A cena 3D não pôde ser carregada.
          <br />
          Confira a URL do Spline em{" "}
          <span className="text-plasma">lib/content.ts</span>
        </p>
      </div>
    );
  }

  return <canvas ref={canvasRef} className={className} />;
}
