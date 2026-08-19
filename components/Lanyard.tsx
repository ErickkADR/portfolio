"use client";

/* eslint-disable react/no-unknown-property */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { asset } from "@/lib/asset";

/* ============================================================
   LANYARD — o crachá pendurado, com física de verdade.

   Origem: componente Lanyard do React Bits, adaptado. O cordão é uma
   corda de quatro corpos rígidos e o crachá pendura na ponta; dá para
   arrastar com o mouse e ele balança.

   ---- O que foi mudado em relação ao original ----

   1. TIPADO, e os assets vêm de `public/lanyard/` pelo `asset()`. O
      original importa `./card.glb` direto, o que exigiria configurar um
      loader de .glb no Next; e um `import` de asset não recebe o basePath
      do GitHub Pages, então o modelo daria 404 no site publicado.

   2. NÃO OCUPA A TELA INTEIRA. O CSS do original é `height: 100vh`, para
      o componente ser a página. Aqui ele é um enfeite no canto da seção
      Carreira, então quem manda no tamanho é o container.

   3. A FÍSICA PARA QUANDO A SEÇÃO SAI DA TELA (`paused` no Physics, mais
      `frameloop` no Canvas). Sem isso, uma simulação de corda roda a
      60fps durante a página inteira — e esta página já tem um globo
      WebGL e a ondulação do hero disputando GPU.

   4. `prefers-reduced-motion` não monta nada. É enfeite: não vale forçar
      movimento em quem pediu para não ter.

   5. A frente do crachá é a identidade do site, gerada por
      `scripts/gera-cracha.mjs`. A textura que vem no card.glb é a marca
      do React Bits.

   ATENÇÃO AO PESO: `card.glb` tem 2,4 MB e o `@react-three/rapier` traz
   um WASM. É por isso que quem usa este componente carrega ele por
   `dynamic(..., { ssr: false })` e só quando a seção chega perto.
   ============================================================ */

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_GLB = "/lanyard/card.glb";
const BANDA_PNG = "/lanyard/lanyard.png";

type Props = {
  /* Posição inicial da câmera. */
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  /* Imagem da face da frente do crachá. */
  frontImage?: string;
  /* Liga e desliga a simulação. Quem chama controla pela visibilidade. */
  active?: boolean;
  /* Onde o cordão é pendurado, em unidades de mundo.

     PRECISA SER AJUSTADO QUANDO A CAIXA NÃO É A TELA INTEIRA. No
     original o canvas ocupa 100vw x 100vh, então a largura visível é
     grande e o crachá, que nasce em x=2, cai confortavelmente dentro do
     quadro. Numa caixa estreita (aqui, 24rem) a largura visível encolhe
     para ~5 unidades, ou seja x de -2.5 a 2.5, e o crachá em x=2 fica
     metade fora. Puxar a origem para a esquerda recentraliza a corda
     inteira. */
  origin?: [number, number, number];
};

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  frontImage,
  active = true,
  origin = [0, 4, 0],
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ler = () => setIsMobile(window.innerWidth < 768);
    ler();
    window.addEventListener("resize", ler);
    return () => window.removeEventListener("resize", ler);
  }, []);

  return (
    <Canvas
      camera={{ position, fov }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ alpha: true }}
      frameloop={active ? "always" : "never"}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
      className="!absolute inset-0"
    >
      <ambientLight intensity={Math.PI} />
      <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60} paused={!active}>
        <Band isMobile={isMobile} frontImage={frontImage} origin={origin} />
      </Physics>
      {/* `Environment` sem HDR de fora: os Lightformer bastam para o
          crachá ter reflexo, e qualquer arquivo remoto aqui viraria um
          download a mais numa página que já é pesada. */}
      <Environment blur={0.75}>
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="#cba6f7"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="#a855f7"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}

/* A face da frente é mapeada na METADE ESQUERDA do atlas de textura do
   modelo (medido no card.glb); a de trás, na direita. A imagem entra
   composta no seu próprio lado, preservando proporção. */
const FRENTE_UV = { x: 0, y: 0, w: 0.5, h: 0.755 };

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage,
  origin = [0, 4, 0],
}: {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string;
  origin?: [number, number, number];
}) {
  const band = useRef<THREE.Mesh & { geometry: { setPoints: (p: THREE.Vector3[]) => void } }>(null);
  /* `null!` e não `null`: os hooks de junta do rapier pedem
     `RefObject<RigidBody>` sem nulo no tipo, e a ref só é lida dentro do
     `useFrame`, depois de a árvore ter montado. */
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(asset(CARD_GLB)) as unknown as {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.MeshStandardMaterial>;
  };
  const texture = useTexture(asset(BANDA_PNG));
  /* 1x1 transparente: o `useTexture` não pode ser chamado
     condicionalmente, então sem imagem de frente ele carrega um pixel e a
     composição abaixo é pulada. */
  const frenteTex = useTexture(
    frontImage ??
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  );

  /* Compõe a imagem da frente no atlas do modelo, preservando proporção.
     O atlas original continua embaixo, para as bordas do cartão e a face
     de trás seguirem com a textura assada no .glb. */
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage || !baseMap?.image || !frenteTex.image) return baseMap;

    const baseImg = baseMap.image as HTMLImageElement;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, W, H);

    const img = frenteTex.image as HTMLImageElement;
    const rx = FRENTE_UV.x * W;
    const ry = FRENTE_UV.y * H;
    const rw = FRENTE_UV.w * W;
    const rh = FRENTE_UV.h * H;
    // `cover`: preenche a face e corta o excedente.
    const escala = Math.max(rw / img.width, rh / img.height);
    const dw = img.width * escala;
    const dh = img.height * escala;
    ctx.save();
    ctx.beginPath();
    ctx.rect(rx, ry, rw, rh);
    ctx.clip();
    ctx.drawImage(img, rx + (rw - dw) / 2, ry + (rh - dh) / 2, dw, dh);
    ctx.restore();

    const composta = new THREE.CanvasTexture(canvas);
    composta.colorSpace = THREE.SRGBColorSpace;
    composta.flipY = baseMap.flipY;
    composta.anisotropy = 16;
    composta.needsUpdate = true;
    return composta;
  }, [frontImage, frenteTex, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => void (document.body.style.cursor = "auto");
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach((r) => {
        const corpo = r.current as RapierRigidBody & { lerped?: THREE.Vector3 };
        if (!corpo.lerped) {
          corpo.lerped = new THREE.Vector3().copy(corpo.translation());
        }
        const dist = Math.max(
          0.1,
          Math.min(1, corpo.lerped.distanceTo(corpo.translation()))
        );
        corpo.lerped.lerp(
          corpo.translation() as THREE.Vector3,
          delta * (minSpeed + dist * (maxSpeed - minSpeed))
        );
      });

      const l1 = (j1.current as RapierRigidBody & { lerped: THREE.Vector3 }).lerped;
      const l2 = (j2.current as RapierRigidBody & { lerped: THREE.Vector3 }).lerped;
      curve.points[0].copy(j3.current.translation() as THREE.Vector3);
      curve.points[1].copy(l2);
      curve.points[2].copy(l1);
      curve.points[3].copy(fixed.current.translation() as THREE.Vector3);
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel() as THREE.Vector3);
      rot.copy(card.current.rotation() as unknown as THREE.Vector3);
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true);
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={origin}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current!.translation() as THREE.Vector3))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        {/* @ts-expect-error meshline registrado via extend() */}
        <meshLineGeometry />
        {/* @ts-expect-error meshline registrado via extend() */}
        <meshLineMaterial
          color="#cba6f7"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(asset(CARD_GLB));
