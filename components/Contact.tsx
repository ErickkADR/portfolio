"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contact, site } from "@/lib/content";

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
      className="relative overflow-hidden border-t border-bone/10 pt-28 sm:pt-40"
    >
      <div className="shell shell-narrow">
        {/* ---------- título ---------- */}
        <div className="text-center">
          <span className="mono-label">{contact.label}</span>

          {/* O clamp desceu de 13vw para 8vw: na coluna de 68rem o
              tamanho anterior estourava a largura e quebrava no meio da
              palavra. */}
          <h2 className="display mt-6 text-[clamp(2.6rem,8vw,6rem)]">
            {contact.titleLines.map((line, i) => (
              <span key={line} className="line-mask">
                <span className="contact-line block">
                  {line}
                  {i === contact.titleLines.length - 1 && (
                    <span className="editorial ml-[0.12em] text-plasma">juntos</span>
                  )}
                </span>
              </span>
            ))}
          </h2>

          <p className="contact-fade mx-auto mt-8 max-w-xl leading-relaxed text-bone-dim">
            {contact.body}
          </p>
        </div>

        {/* ---------- e-mail ----------
            O bloco inteiro era um `mailto:`. O problema: `mailto:` só
            faz alguma coisa se a máquina tiver um cliente de e-mail
            registrado — em Windows sem Outlook configurado, ou em quem
            usa Gmail pelo navegador, o clique não faz absolutamente
            nada e a pessoa conclui que o site está quebrado.

            Agora o endereço fica visível e o botão principal COPIA (que
            funciona em qualquer máquina). O `mailto:` continua ali, como
            atalho secundário para quem tem cliente configurado.

            `break-all` porque o e-mail é uma palavra só de 26
            caracteres: sem isso ele estoura a caixa no celular. */}
        <div className="contact-fade mt-16 flex justify-center">
          <div className="inline-flex max-w-full flex-col items-center gap-4 rounded-2xl border border-bone/15 px-8 py-10 text-center transition-colors duration-500 hover:border-plasma sm:px-16">
            <span className="mono-label">{contact.emailHint}</span>

            <span className="display break-all text-[clamp(1.35rem,4vw,2.5rem)]">
              {site.email}
            </span>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={copiar}
                className="mono-label rounded-full border border-bone/20 px-5 py-2.5 transition-colors duration-500 hover:border-plasma hover:text-plasma"
              >
                {copiado ? "Copiado ✓" : "Copiar e-mail"}
              </button>

              <Magnetic
                href={`mailto:${site.email}`}
                className="mono-label rounded-full border border-plasma/40 px-5 py-2.5 text-plasma transition-colors duration-500 hover:border-plasma"
              >
                Abrir no e-mail →
              </Magnetic>
            </div>
          </div>
        </div>

        {/* ---------- disponibilidade ---------- */}
        <dl className="contact-fade mx-auto mt-16 grid max-w-2xl gap-8 text-center sm:grid-cols-3">
          {contact.availability.map((item) => (
            <div key={item.label}>
              <dt className="mono-label">{item.label}</dt>
              <dd className="mt-2 leading-snug">{item.value}</dd>
            </div>
          ))}
        </dl>

        {/* ---------- redes ---------- */}
        <div className="contact-fade mt-20">
          <p className="mono-label text-center text-plasma">
            {contact.socialsLabel}
          </p>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-bone/12 bg-bone/12 sm:grid-cols-2 lg:grid-cols-4">
            {contact.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group relative flex h-full flex-col gap-2 bg-ink p-7 transition-colors duration-500 hover:bg-ink-2"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-plasma transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <span className="flex items-center justify-between">
                    <span className="text-lg">{s.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-bone-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-plasma"
                    >
                      ↗
                    </span>
                  </span>
                  <span className="mono-label">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- fecho ---------- */}
        <blockquote className="contact-fade editorial mx-auto mt-24 max-w-2xl text-center text-[clamp(1.15rem,2.4vw,1.75rem)] leading-snug text-bone-dim">
          “{contact.quote}”
        </blockquote>

        <div className="hairline mt-20 flex flex-col gap-4 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="mono-label">{site.location}</p>
          <p className="mono-label">
            © {site.year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
