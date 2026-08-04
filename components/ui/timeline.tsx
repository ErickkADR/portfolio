"use client";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

/* Timeline do Aceternity UI, adaptada:
   - o cabeçalho fixo do demo saiu (quem usa passa o seu próprio)
   - as cores neutras viraram os tokens da paleta
   - a altura da trilha é remedida no resize: com um valor medido uma
     única vez no mount, a linha some ou sobra depois que as fontes
     carregam e o conteúdo reflui                                    */

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative mx-auto pb-10">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-32">
            <div className="sticky top-32 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink">
                <div className="h-4 w-4 rounded-full border border-plasma/40 bg-plasma/25" />
              </div>
              <h3 className="mono-label hidden !text-sm md:block md:pl-20">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mono-label mb-4 block text-left md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Trilha: um fio esmaecido nas pontas, com a parte "percorrida"
            preenchida conforme o scroll avança pela seção. */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-px overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,var(--color-ink-3)_10%,var(--color-ink-3)_90%,transparent_100%)]"
        >
          <motion.div
            style={
              reduced
                ? { height: "100%", opacity: 1 }
                : { height: heightTransform, opacity: opacityTransform }
            }
            className="absolute inset-x-0 top-0 w-px rounded-full bg-gradient-to-t from-plasma via-plasma-soft to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
