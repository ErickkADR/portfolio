"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { nav, site } from "@/lib/content";
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconCode,
  IconStack2,
  IconTimeline,
  IconCertificate,
  IconTargetArrow,
  IconTrophy,
  IconMail,
  IconBrandGithub,
} from "@tabler/icons-react";

/* O <Nav> do topo é escondido abaixo de md; este dock ocupa o lugar
   dele no celular. Os itens vêm do mesmo `nav` de lib/content.ts, então
   adicionar uma seção lá aparece nos dois automaticamente. */

const icons: Record<string, React.ReactNode> = {
  "#hero": <IconHome className="h-full w-full" />,
  "#sobre": <IconUser className="h-full w-full" />,
  "#cargo-atual": <IconTrophy className="h-full w-full" />,
  "#carreira": <IconTimeline className="h-full w-full" />,
  "#projetos": <IconBriefcase className="h-full w-full" />,
  "#stack": <IconStack2 className="h-full w-full" />,
  "#certificados": <IconCertificate className="h-full w-full" />,
  "#metas": <IconTargetArrow className="h-full w-full" />,
  "#contato": <IconMail className="h-full w-full" />,
};

export default function MobileDock() {
  const items = [
    ...nav.map((item) => ({
      title: item.label,
      icon: icons[item.href] ?? <IconCode className="h-full w-full" />,
      href: item.href,
    })),
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full" />,
      href: site.github,
    },
  ];

  return (
    /* Canto inferior direito, não centralizado: no centro o botão cai
       em cima da legenda do hero. O dock abre para cima a partir daqui. */
    <div className="fixed bottom-6 right-5 z-50 md:hidden">
      <FloatingDock items={items} />
    </div>
  );
}
