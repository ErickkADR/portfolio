"use client";

import { Component, type ReactNode } from "react";

/* Fronteira de erro para ENFEITE.

   Existe por causa do crachá do Sobre: ele é WebGL com física, modelo
   3D e três bibliotecas no caminho. Se qualquer coisa ali estourar (GPU
   sem uma extensão, modelo corrompido, contexto perdido), o certo é a
   seção continuar de pé sem ele — e não a página inteira cair num erro
   por causa de um objeto decorativo.

   Só serve para isso. Conteúdo de verdade deve falhar visivelmente, não
   em silêncio: se o texto de uma seção quebrar, é bom que apareça. */

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { quebrou: boolean };

export default class SemQuebrar extends Component<Props, State> {
  state: State = { quebrou: false };

  static getDerivedStateFromError(): State {
    return { quebrou: true };
  }

  componentDidCatch(erro: unknown) {
    /* Fica no console de propósito: em silêncio total, um enfeite que
       nunca aparece é indistinguível de um enfeite que nunca foi
       escrito. */
    console.warn("[SemQuebrar] enfeite desativado após erro:", erro);
  }

  render() {
    if (this.state.quebrou) return this.props.fallback ?? null;
    return this.props.children;
  }
}
