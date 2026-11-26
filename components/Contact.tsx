"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useConteudo } from "@/lib/idioma";

/* ============================================================
   CONTATO

   O que estava errado na versão anterior:
   - era a única seção que não entrava na coluna de leitura, então tudo
     ficava colado na borda esquerda enquanto o resto do site estava
     centralizado;
   - o botão "enviar e-mail" ficava a mais de mil pixels do parágrafo a
     que pertencia, sozinho no canto direito;
   - e o e-mail em si não aparecia em lugar nenhum — a informação que a
     pessoa veio buscar estava escondida atrás do rótulo de um botão.

   Agora: coluna estreita e centralizada como o resto, o endereço por
   extenso como o próprio link (dá para ler e copiar sem abrir o cliente
   de e-mail), a disponibilidade respondendo antes o que costuma vir
   antes — se vale a pena escrever — e as redes com o @ visível.
   ============================================================ */

/* Botão magnético: o alvo se desloca em direção ao cursor dentro de um
   raio, e volta com elástica ao sair. O deslocamento é uma fração da
   distância (0.35) — puxar 1:1 faz o botão fugir do ponteiro e a pessoa
   nunca consegue clicar. */
function Magnetic({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "elastic.out(1, 0.4)" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={className}>
      {children}
    </a>
  );
}

export default function Contact() {
  const { contact, site, ui } = useConteudo();
  const ref = useRef<HTMLElement>(null);
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      /* A Clipboard API exige contexto seguro (https ou localhost) e
         pode ser negada. O fallback antigo ainda funciona em todo
         lugar: um campo fora da tela, selecionado, e execCommand. */
      const campo = document.createElement("textarea");
      campo.value = site.email;
      campo.style.position = "fixed";
      campo.style.opacity = "0";
      document.body.appendChild(campo);
      campo.select();
      try {
        document.execCommand("copy");
      } catch {
        // Sem clipboard nenhum, o endereço continua visível na tela
        // para ser selecionado à mão — nada fica inacessível.
      }
      document.body.removeChild(campo);
    }
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 2000);
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const linhas = gsap.from(".contact-line", {
          yPercent: 108,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 72%", once: true },
        });

        const blocos = gsap.from(".contact-fade", {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".contact-fade", start: "top 90%", once: true },
        });

        return () => {
          linhas.kill();
          blocos.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <footer
      ref={ref}
      id="contato"
      className="relative overflow-hidden border-t border-bone/10 pt-28 sm:pt-36"
    >
      {/* Halo de fundo: dá profundidade sem competir com o texto. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-plasma) 0%, transparent 70%)" }}
      />

      <div className="shell relative">
        {/* ---------- DUAS COLUNAS (26/11/2026) ----------
            À esquerda, o convite: título que fala do valor, o status de
            disponibilidade, o texto e o e-mail com as duas ações. À
            direita, os canais, um por linha, grandes, com o @ visível.
            A versão anterior era tudo centralizado numa coluna só, com
            uma citação no fim: bonito, mas lia como rodapé, não como o
            lugar onde a conversa começa. */}
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <span className="mono-label">{contact.label}</span>

            {/* "automatizado?" usa `.display-accent` (serifada itálica) e a
                última linha ganha `.line-mask-accent`, porque a descida das
                letras passa do fundo que o `.line-mask` reserva. */}
            <h2 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">
              {contact.titleLines.map((line) => (
                <span key={line} className="line-mask">
                  <span className="contact-line block">{line}</span>
                </span>
              ))}
              <span className="line-mask line-mask-accent">
                <span className="contact-line display-accent block [text-shadow:none]">
                  {contact.titleAccent}
                </span>
              </span>
            </h2>

            <p className="contact-fade mt-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-2 text-sm text-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {contact.status}
            </p>

            <p className="contact-fade mt-8 max-w-xl text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-bone-dim">
              {contact.body}
            </p>

            {/* E-mail por extenso + copiar + abrir. Copiar é o principal
                porque `mailto:` não faz nada em máquina sem cliente de
                e-mail configurado (Gmail no navegador, Windows sem
                Outlook). `break-all`: o endereço é uma palavra só. */}
            <div className="contact-fade mt-10">
              <span className="mono-label">{contact.emailHint}</span>
              <p className="display mt-3 break-all text-[clamp(1.3rem,2.6vw,2.1rem)] leading-tight">
                {site.email}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" onClick={copiar} className="btn">
                  {copiado ? ui.emailCopiado : ui.copiarEmail}
                </button>
                <Magnetic
                  href={`mailto:${site.email}`}
                  className="mono-label inline-flex items-center rounded-full border border-plasma/40 px-5 py-2.5 text-plasma transition-colors duration-500 hover:border-plasma"
                >
                  {ui.abrirEmail}
                </Magnetic>
              </div>
            </div>

            <dl className="contact-fade hairline mt-12 grid gap-6 pt-8 sm:grid-cols-3">
              {contact.availability.map((item) => (
                <div key={item.label}>
                  <dt className="mono-label">{item.label}</dt>
                  <dd className="mt-2 leading-snug">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------- canais ---------- */}
          <div className="contact-fade lg:pt-14">
            <p className="mono-label text-plasma">{contact.channelsLabel}</p>
            <ul className="mt-6 border-t border-bone/12">
              {contact.socials.map((s, i) => (
                <li key={s.label} className="border-b border-bone/12">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group relative flex items-center gap-5 overflow-hidden py-6 pr-2 transition-colors duration-500"
                  >
                    {/* Preenchimento que sobe no hover. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    />
                    <span className="mono-label relative w-8 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative flex-1">
                      <span className="display block text-[clamp(1.6rem,3vw,2.4rem)] leading-none transition-transform duration-500 group-hover:translate-x-2">
                        {s.label}
                      </span>
                      <span className="mono-label mt-2 block">{s.handle}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/20 text-lg transition-all duration-500 group-hover:rotate-45 group-hover:border-plasma group-hover:bg-plasma group-hover:text-ink"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- assinatura ----------
            O nome em tamanho de tela fecha a página como uma assinatura. */}
        <p
          aria-hidden="true"
          className="display mt-28 select-none whitespace-nowrap text-center text-[clamp(2.6rem,12vw,13rem)] leading-none text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--color-bone)_22%,transparent)]"
        >
          {site.name}
        </p>

        <div className="hairline mt-10 flex flex-col gap-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="mono-label">{site.location}</p>
          <a href="#hero" className="mono-label transition-colors hover:text-plasma">
            ↑ {contact.backToTop}
          </a>
          <p className="mono-label">
            © {site.year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
