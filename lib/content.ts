/* ============================================================
   CONTEÚDO DO SITE — edite tudo por aqui.
   Preenchido a partir do perfil e dos repositórios de @ErickkADR.
   Nenhum componente tem texto hardcoded.
   ============================================================ */

export const site = {
  name: "Erick Dantas",
  handle: "@erickk.adr",
  role: "Conteúdo técnico, IA & Front-end",
  location: "São Paulo, Brasil",
  email: "erick.dantas.work@gmail.com",
  github: "https://github.com/ErickkADR",
  year: "2026",
};

export const nav = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#manifesto" },
  { label: "Projetos", href: "#projetos" },
  { label: "Carreira", href: "#carreira" },
  { label: "Certificados", href: "#certificados" },
  { label: "Stack", href: "#stack" },
  { label: "Contato", href: "#contato" },
];

export const hero = {
  /* Cada string é uma linha do título. Elas sobem em cascata. */
  titleLines: ["Ferramentas", "que movem", "o mundo"],
  kicker: "Portfólio",
  /* Legendas que se alternam sozinhas, a cada ~4s. */
  captions: [
    { text: "Suporte técnico virou infraestrutura de IA" },
    { text: "RAG, automação e conteúdo que ensina" },
    { text: "Construído para facilitar a vida de quem usa" },
  ],
  scrollHint: "Role para revelar",
};

export const manifesto = {
  label: "Sobre",
  /* Frase grande revelada palavra a palavra no scroll. */
  body:
    "Tive meu primeiro contato com tecnologia aos 4 anos e nunca mais parei. " +
    "Acredito que o valor real da tecnologia está em facilitar a vida das pessoas — " +
    "e que conhecimento deveria ser acessível a todo mundo. Comecei no suporte " +
    "técnico construindo pequenas ferramentas com IA para resolver problemas reais " +
    "do meu time, e foi isso que virou o meu trabalho.",
  /* O que ele faz hoje. Os números saem do que está em produção, não de
     estimativa — ver os `stats` logo abaixo. */
  doing: [
    "Chatbot de suporte com RAG em produção no WhatsApp: n8n orquestrando, Supabase guardando os embeddings e a Callbell como canal",
    "Base de conhecimento de 209 pares de pergunta e resposta, sincronizada entre o texto puro e o Notion do time",
    "Fluxograma que mapeou o suporte técnico inteiro — 584 elementos, do primeiro contato ao encerramento do chamado",
    "Tutoriais técnicos narrados por IA: quando a narração deixou de ser minha voz, o time passou a usar. Hoje é o padrão",
    "Manuais técnicos, protótipos das telas dos equipamentos e um canal de tutoriais no YouTube",
    "Engenharia reversa quando não tem jeito oficial — foi assim que o CameraCut ganhou português, mexendo nas DLLs de idioma",
    "Ferramentas sob medida: um instalador em PowerShell que virou um clique o que antes eram 11 etapas manuais",
  ],
  stats: [
    { value: "209", label: "Pares de pergunta e resposta na base que alimenta a IA de suporte" },
    { value: "584", label: "Elementos no fluxograma que mapeou o suporte técnico" },
    { value: "130+", label: "Produtos catalogados no e-commerce da Nexus" },
  ],
};

export const robot = {
  label: "Interativo",
  title: "Ele te vê",
  body:
    "Uma cena 3D em tempo real rodando direto no navegador. " +
    "Mexa o mouse e acompanhe: a cabeça dele segue o seu cursor.",
  hint: "Mexa o mouse para ele te seguir",
  sceneUrl: "https://prod.spline.design/KsIHnT1RVW8Wrgal/scene.splinecode",
};

export type ProjectImage = {
  /* Caminho dentro de public/. O prefixo do GitHub Pages é montado em
     runtime por `asset()` (lib/asset.ts) — não escreva o /portfolio aqui. */
  src: string;
  alt: string;
};

export type Project = {
  /* Vira a rota /projetos/<slug>/ e o nome da pasta das imagens em
     public/projetos/<slug>/. Mudar o slug muda a URL da página. */
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  /* Resumo curto — é o que aparece no card da home. */
  description: string;
  href: string;
  repo?: string;
  tags: string[];
  /* Cor usada no hover do item e no fundo da moldura. */
  tint: string;

  /* ---- página própria do projeto ---- */
  /* Capa do card: uma TELA REAL do projeto, capturada do site publicado
     (ou, quando ele é fechado, do projeto rodando localmente). */
  cover: ProjectImage;
  /* Parágrafos da descrição completa. */
  overview: string[];
  /* Os pontos que valem destacar — viram cartões na página. */
  highlights: { title: string; body: string }[];
  /* Ficha técnica: rótulo → valor. */
  facts: { label: string; value: string }[];
  /* Quatro telas reais. Quatro é o número: preenche a grade 2×2 sem
     sobrar buraco. */
  gallery: ProjectImage[];
};

/* ⚠️ As imagens em public/projetos/ são capturas reais, feitas em
   1440×900 @2x. Para regravá-las depois de mexer em algum projeto,
   veja o roteiro no README (seção "Capas dos projetos"). */

export const projects: Project[] = [
  {
    slug: "central-tecnica",
    index: "01",
    title: "Central Técnica",
    category: "Portal interno · Bannerjet Group",
    year: "2026",
    description:
      "Hub técnico que reúne catálogo de equipamentos, manuais, peças, firmwares e cursos com progressão por módulos — mais um chatbot de IA que responde dúvidas técnicas direto no site.",
    href: "https://erickkadr.github.io/Central-Tecnica-Bannerjet/",
    repo: "https://github.com/ErickkADR/Central-Tecnica-Bannerjet",
    tags: ["HTML", "Chatbot IA", "Área restrita"],
    tint: "#a855f7",
    cover: {
      src: "/projetos/central-tecnica/cover.webp",
      alt: "Página inicial da Central Técnica, com os atalhos para equipamentos, manuais e parâmetros",
    },
    overview: [
      "A Central Técnica nasceu de uma conta simples: o tempo que o time de suporte gastava procurando um manual antigo, um parâmetro de corte ou a versão certa de um firmware era maior que o tempo de resolver o problema em si. O material existia — espalhado por pastas, e-mails e conversas de WhatsApp.",
      "O portal reúne tudo num lugar só: catálogo de equipamentos com página própria por máquina, manuais, peças, firmwares, perfis de cor e parâmetros. Cada equipamento tem a sua ficha, e o que antes era \"pergunta pro fulano\" virou link.",
      "Por cima disso roda um chatbot de IA que responde dúvidas técnicas usando a mesma base do portal — quem não sabe onde procurar pergunta em português e recebe a resposta com a fonte.",
    ],
    highlights: [
      {
        title: "Uma página por equipamento",
        body: "Plotters, laminadoras, impressoras UV, laser e guilhotinas: cada máquina tem ficha, parâmetros e os arquivos que pertencem a ela.",
      },
      {
        title: "Chatbot sobre a base do portal",
        body: "As respostas saem do mesmo material publicado no site, então documentação e chatbot nunca divergem.",
      },
      {
        title: "Área restrita",
        body: "O conteúdo é interno da Bannerjet: o acesso passa por login, e o portal público mostra apenas a tela de entrada.",
      },
    ],
    facts: [
      { label: "Papel", value: "Projeto, conteúdo e implementação" },
      { label: "Contexto", value: "Ferramenta interna, em uso no dia a dia" },
      { label: "Stack", value: "HTML · CSS · JavaScript" },
      { label: "Estado", value: "No ar, em evolução" },
    ],
    gallery: [
      {
        src: "/projetos/central-tecnica/shot-1.webp",
        alt: "Seção de categorias da Central Técnica, com os grupos de equipamentos",
      },
      {
        src: "/projetos/central-tecnica/shot-2.webp",
        alt: "Página de manuais técnicos, com os documentos organizados por equipamento",
      },
      {
        src: "/projetos/central-tecnica/shot-3.webp",
        alt: "Ficha de um equipamento, com especificações e arquivos correspondentes",
      },
      {
        src: "/projetos/central-tecnica/shot-4.webp",
        alt: "Página de parâmetros, com os valores de corte e impressão por material",
      },
    ],
  },
  {
    slug: "atomai",
    index: "02",
    title: "Atomai",
    category: "SaaS · Chatbots com IA",
    year: "2026",
    description:
      "Plataforma SaaS de chatbots com IA especializada: integração com a Gemini API, painel administrativo e uma interface dark pensada para uso prolongado.",
    href: "https://erickkadr.github.io/Atomai-Saas/html/index.html",
    repo: "https://github.com/ErickkADR/Atomai-Saas",
    tags: ["Gemini API", "SaaS", "Painel admin"],
    tint: "#6d5cff",
    cover: {
      src: "/projetos/atomai/cover.webp",
      alt: "Tela de chat do AtomAI, com a pergunta \"Como posso te ajudar?\" e os atalhos por tipo de problema",
    },
    overview: [
      "O AtomAI é uma plataforma de atendimento em que cada bot é especialista em um nicho, em vez de um assistente genérico tentando responder tudo. Quem chega escolhe o tipo de problema — hardware, software, periférico — e cai no agente treinado para ele.",
      "Além da conversa, o produto tem o lado de dentro: painel com o volume de tickets em tempo real, desempenho por agente, gestão da equipe de bots, planos e checkout. É o recorte completo de um SaaS, do login à cobrança.",
      "A interface é escura por decisão de uso: é uma ferramenta de trabalho, aberta o dia inteiro, e o contraste alto cansa em jornada longa.",
    ],
    highlights: [
      {
        title: "Agentes por especialidade",
        body: "Cada bot cobre um domínio e tem status próprio. A triagem acontece antes da conversa, não no meio dela.",
      },
      {
        title: "Painel com os números do atendimento",
        body: "Tickets totais, agentes ativos, tempo médio de resposta e resolvidos no dia, com a curva dos últimos sete dias.",
      },
      {
        title: "Gemini API por trás",
        body: "As respostas vêm da Gemini, com a especialização definida por agente.",
      },
    ],
    facts: [
      { label: "Papel", value: "Produto, interface e integração" },
      { label: "Contexto", value: "Projeto de TCC" },
      { label: "Stack", value: "HTML · CSS · JavaScript · Gemini API" },
      { label: "Estado", value: "Em desenvolvimento" },
    ],
    gallery: [
      {
        src: "/projetos/atomai/shot-1.webp",
        alt: "Dashboard do AtomAI com os indicadores de tickets, agentes ativos e tempo médio",
      },
      {
        src: "/projetos/atomai/shot-2.webp",
        alt: "Tela de triagem do AtomAI: hardware, software ou periférico",
      },
      {
        src: "/projetos/atomai/shot-3.webp",
        alt: "Tela de gerenciamento de agentes, com especialidade, status e tickets resolvidos",
      },
      {
        src: "/projetos/atomai/shot-4.webp",
        alt: "Tela de planos do AtomAI, com os níveis de assinatura",
      },
    ],
  },
  {
    slug: "nexus-print",
    index: "03",
    title: "Nexus Print",
    category: "E-commerce · Comunicação visual",
    year: "2026",
    description:
      "Loja virtual com mais de 130 produtos em 6 categorias, quatro modelos de precificação por produto, carrinho completo e fechamento de pedido direto no WhatsApp.",
    href: "https://erickkadr.github.io/NexusPrint/",
    repo: "https://github.com/ErickkADR/NexusPrint",
    tags: ["JavaScript", "Carrinho", "Modo escuro"],
    tint: "#d16bff",
    cover: {
      src: "/projetos/nexus-print/cover.webp",
      alt: "Topo da loja Nexus Print, com o mascote e a chamada \"Sua loja de Comunicação Visual\"",
    },
    overview: [
      "A Nexus Print é uma loja de comunicação visual personalizada: adesivos, action figures, Funko Pop, topos de bolo e caixas milk. São mais de 130 produtos catalogados em seis categorias.",
      "O nó do projeto foi a precificação. Produto personalizado não tem preço único — depende de tamanho, quantidade e acabamento. Cada item carrega quatro modelos de preço, e o carrinho calcula em cima da combinação escolhida.",
      "O pedido não termina num gateway: fecha no WhatsApp, com o resumo montado. É como a venda realmente acontece nesse mercado, e tentar empurrar checkout tradicional só adicionaria um passo que ninguém completa.",
    ],
    highlights: [
      {
        title: "Quatro modelos de preço por produto",
        body: "A mesma peça muda de valor conforme tamanho, quantidade e acabamento — o carrinho resolve a conta.",
      },
      {
        title: "Fechamento no WhatsApp",
        body: "O pedido sai pronto para a conversa, do jeito que o cliente desse mercado já compra.",
      },
      {
        title: "Claro e escuro",
        body: "O tema acompanha a preferência de quem navega, sem recarregar a página.",
      },
    ],
    facts: [
      { label: "Papel", value: "Front-end, catálogo e lógica de preço" },
      { label: "Catálogo", value: "130+ produtos em 6 categorias" },
      { label: "Stack", value: "HTML · CSS · JavaScript" },
      { label: "Estado", value: "No ar" },
    ],
    gallery: [
      {
        src: "/projetos/nexus-print/shot-1.webp",
        alt: "Vitrine de categorias da Nexus Print",
      },
      {
        src: "/projetos/nexus-print/shot-2.webp",
        alt: "Listagem de produtos com os cartões e as opções de personalização",
      },
      {
        src: "/projetos/nexus-print/shot-3.webp",
        alt: "Detalhe de produto com os modelos de precificação",
      },
      {
        src: "/projetos/nexus-print/shot-4.webp",
        alt: "Trecho final da loja, com contato e rodapé",
      },
    ],
  },
  {
    slug: "campro-a3-pro",
    index: "04",
    title: "Campro A3 Pro",
    category: "Portal de licença · Pós-venda",
    year: "2026",
    description:
      "Cada equipamento vendido ganha um link permanente pela sua licença, com instalador, manuais e vídeo. Substituiu o envio manual de arquivos a cada venda.",
    href: "https://erickkadr.github.io/campro-a3-pro/",
    repo: "https://github.com/ErickkADR/campro-a3-pro",
    tags: ["React 18", "TypeScript", "Roteamento por licença"],
    tint: "#8b5cf6",
    cover: {
      src: "/projetos/campro-a3-pro/cover.webp",
      alt: "Portal da Campro A3 Pro Híbrida mostrando a licença 1981 e os acessos a software e manuais",
    },
    overview: [
      "Toda venda de equipamento terminava do mesmo jeito: alguém do suporte juntava instalador, manuais e vídeo e mandava por e-mail ou WhatsApp. Um por um, sempre igual, e sempre sujeito a mandar a versão errada.",
      "O portal troca esse ritual por um link permanente. A licença do equipamento vira a rota: quem abre o link cai direto na página da própria máquina, com o software, a documentação e o vídeo correspondentes.",
      "Como o endereço é fixo, ele continua valendo depois da venda — quando o cliente formatar o computador daqui a um ano, o material ainda está lá, atualizado.",
    ],
    highlights: [
      {
        title: "A licença é a rota",
        body: "Cada equipamento tem seu endereço, e o conteúdo vem da licença que abriu a página.",
      },
      {
        title: "Um link no lugar do envio manual",
        body: "Instalador, manuais e vídeo no mesmo lugar, sempre na versão corrente.",
      },
      {
        title: "Vale depois da venda",
        body: "O link é permanente: serve para a instalação e para toda reinstalação que vier depois.",
      },
    ],
    facts: [
      { label: "Papel", value: "Projeto e implementação" },
      { label: "Contexto", value: "Pós-venda da Bannerjet" },
      { label: "Stack", value: "React 18 · TypeScript" },
      { label: "Estado", value: "Concluído, no ar" },
    ],
    gallery: [
      {
        src: "/projetos/campro-a3-pro/shot-1.webp",
        alt: "Cartões de download do software, manuais e vídeo do equipamento",
      },
      {
        src: "/projetos/campro-a3-pro/shot-2.webp",
        alt: "Seção de documentação da Campro A3 Pro",
      },
      {
        src: "/projetos/campro-a3-pro/shot-3.webp",
        alt: "Instruções de instalação no portal da licença",
      },
      {
        src: "/projetos/campro-a3-pro/shot-4.webp",
        alt: "Rodapé do portal, com o contato do suporte técnico",
      },
    ],
  },
  {
    slug: "mugiwaras",
    index: "05",
    title: "Bando dos Mugiwaras",
    category: "Landing page · Fã-projeto",
    year: "2026",
    description:
      "Landing page de One Piece com os 10 integrantes do Bando do Chapéu de Palha, biografia e barras de atributos — feita só com HTML e CSS.",
    href: "https://erickkadr.github.io/Mugiwaras-Project/home.html",
    repo: "https://github.com/ErickkADR/Mugiwaras-Project",
    tags: ["HTML", "CSS", "Sem JavaScript"],
    tint: "#c026d3",
    cover: {
      src: "/projetos/mugiwaras/cover.webp",
      alt: "Abertura da landing page do Bando dos Mugiwaras, com a floresta ao fundo e o título sobreposto",
    },
    overview: [
      "Um fã-projeto para exercitar o que HTML e CSS dão conta sozinhos: dez integrantes do Bando do Chapéu de Palha, cada um com apresentação, biografia e barras de atributos.",
      "Não há uma linha de JavaScript. Tudo que se move — as transições, os estados de hover, o ritmo da página conforme se desce — sai de CSS.",
      "É uma página longa de propósito: a leitura acompanha a tripulação inteira, um personagem por vez, como um álbum.",
    ],
    highlights: [
      {
        title: "Zero JavaScript",
        body: "Layout, movimento e interação resolvidos só com CSS.",
      },
      {
        title: "Dez perfis completos",
        body: "Cada integrante com apresentação, história e atributos em barras.",
      },
      {
        title: "Leitura em rolagem longa",
        body: "A página é construída para ser percorrida do começo ao fim, sem menu de atalho.",
      },
    ],
    facts: [
      { label: "Papel", value: "Design e implementação" },
      { label: "Contexto", value: "Fã-projeto, estudo de CSS" },
      { label: "Stack", value: "HTML · CSS" },
      { label: "Estado", value: "Concluído" },
    ],
    gallery: [
      {
        src: "/projetos/mugiwaras/shot-1.webp",
        alt: "Perfil de um integrante do bando, com retrato e biografia",
      },
      {
        src: "/projetos/mugiwaras/shot-2.webp",
        alt: "Barras de atributos de um dos personagens",
      },
      {
        src: "/projetos/mugiwaras/shot-3.webp",
        alt: "Outro perfil da tripulação, com o mesmo tratamento visual",
      },
      {
        src: "/projetos/mugiwaras/shot-4.webp",
        alt: "Trecho final da página, encerrando a apresentação do bando",
      },
    ],
  },
  {
    slug: "apenas-um-escritor",
    index: "06",
    title: "Apenas Um Escritor",
    category: "Experimento · Parallax",
    year: "2025",
    description:
      "Estudo do efeito parallax e da ilusão de ótica que ele cria — o projeto onde a vontade de trabalhar com movimento começou.",
    href: "https://erickkadr.github.io/Apenas-Um-Escritor/",
    repo: "https://github.com/ErickkADR/Apenas-Um-Escritor",
    tags: ["Parallax", "HTML", "CSS"],
    tint: "#7c3aed",
    cover: {
      src: "/projetos/apenas-um-escritor/cover.webp",
      alt: "Abertura de Apenas Um Escritor, com o título sobre fundo preto e o texto começando abaixo",
    },
    overview: [
      "Um texto e um efeito. O parallax deixa camadas correrem em velocidades diferentes e o olho lê isso como profundidade — a página tem duas dimensões, mas não parece ter.",
      "Foi o experimento onde ficou claro que interface podia ser mais que layout. Tudo que veio depois — as revelações no scroll, o vídeo do hero, a cena 3D deste portfólio — começou aqui.",
      "O projeto é de 2025 e continua no ar do jeito que foi feito. Ele não envelheceu bem por acaso: é o registro de onde a coisa começou.",
    ],
    highlights: [
      {
        title: "Profundidade sem 3D",
        body: "Camadas em velocidades diferentes bastam para o olho ler distância.",
      },
      {
        title: "O texto conduz",
        body: "O efeito serve à leitura, marcando o ritmo de cada trecho.",
      },
      {
        title: "O ponto de partida",
        body: "O primeiro projeto em que movimento virou parte do conteúdo, e não enfeite.",
      },
    ],
    facts: [
      { label: "Papel", value: "Design e implementação" },
      { label: "Contexto", value: "Estudo pessoal" },
      { label: "Stack", value: "HTML · CSS" },
      { label: "Estado", value: "Concluído, no ar" },
    ],
    gallery: [
      {
        src: "/projetos/apenas-um-escritor/shot-1.webp",
        alt: "Primeira camada do parallax, com a imagem de fundo e o texto por cima",
      },
      {
        src: "/projetos/apenas-um-escritor/shot-2.webp",
        alt: "Transição entre blocos de texto durante a rolagem",
      },
      {
        src: "/projetos/apenas-um-escritor/shot-3.webp",
        alt: "Camada intermediária do efeito, com a imagem correndo mais devagar que o texto",
      },
      {
        src: "/projetos/apenas-um-escritor/shot-4.webp",
        alt: "Encerramento do texto, na última camada da página",
      },
    ],
  },
];

/* Página de projeto: rótulos e textos fixos. */
export const projectPage = {
  back: "Todos os projetos",
  liveLabel: "Ver ao vivo",
  repoLabel: "Ver o código",
  overviewLabel: "O projeto",
  highlightsLabel: "O que ele resolve",
  galleryLabel: "Telas",
  factsLabel: "Ficha",
  nextLabel: "Próximo projeto",
};

export const marquee = [
  "RAG",
  "Automação",
  "n8n",
  "Supabase",
  "Gemini API",
  "Front-end",
  "Claude Code",
  "Conteúdo técnico",
];

/* ---------- Stack ----------
   Linguagens e ferramentas vivem na MESMA seção. Estavam separadas antes
   e as duas listas se repetiam: JavaScript, HTML, CSS e TypeScript
   apareciam nos dois lugares, e quem lia tinha que juntar sozinho. Aqui
   a barra medida abre a seção e os grupos vêm logo abaixo, sem repetir
   nenhuma linguagem em "Front-end".

   Os percentuais são os bytes reais que a API do GitHub reporta somando
   todos os repositórios públicos (não-forks) — não é estimativa.
   Para atualizar:
     GET https://api.github.com/repos/ErickkADR/<repo>/languages
   Python e VBA não têm percentual porque o trabalho neles é interno
   (automações e ferramentas da Bannerjet), fora dos repos públicos. */

export type StackItem = {
  name: string;
  /* Só as linguagens têm nota e cor — elas abrem a seção e sustentam a
     barra medida. Os outros grupos são lista pura. */
  note?: string;
  color?: string;
  /* Percentual medido no GitHub, quando existe. */
  pct?: number;
};

export type StackGroup = {
  group: string;
  /* Ocupa a linha inteira da grade, em vez de meia. */
  wide?: boolean;
  items: StackItem[];
};

/* Anotado (e não `satisfies`): com `satisfies` o TS guarda o tipo
   literal de cada item, e os campos que só as linguagens preenchem —
   `note`, `color`, `pct` — deixam de existir para quem percorre a lista
   inteira. */
const stackGroups: StackGroup[] = [
  {
    group: "Linguagens",
    /* Este grupo ocupa a linha inteira: é o único com nota por item, e
       espremido numa coluna as notas quebravam em quatro linhas. */
    wide: true,
    items: [
      {
        name: "HTML",
        color: "#a855f7",
        pct: 57.7,
        note: "Estrutura de todos os portais e landing pages",
      },
      {
        name: "JavaScript",
        color: "#d16bff",
        pct: 23.0,
        note: "Carrinho, catálogos e a lógica dos portais técnicos",
      },
      {
        name: "CSS",
        color: "#6d5cff",
        pct: 18.5,
        note: "Layout responsivo, temas escuros e animações sem JS",
      },
      {
        name: "TypeScript",
        color: "#c026d3",
        pct: 0.8,
        note: "O Campro A3 Pro com React 18 — e este portfólio inteiro",
      },
      {
        name: "Python",
        color: "#8b5cf6",
        note: "Pipelines de RAG, embeddings e automações internas",
      },
      {
        name: "VBA",
        color: "#7c3aed",
        note: "Ferramentas sob medida dentro do fluxo da equipe",
      },
    ],
  },
  {
    group: "IA & Automação",
    items: [
      { name: "RAG" },
      { name: "Supabase" },
      { name: "n8n" },
      { name: "Gemini API" },
      { name: "ElevenLabs" },
      { name: "Callbell" },
      { name: "Claude Code" },
    ],
  },
  {
    group: "Front-end",
    items: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "GSAP" },
      { name: "Spline" },
    ],
  },
  {
    group: "Base & ferramentas",
    items: [
      { name: "Git" },
      { name: "PowerShell" },
      { name: "Notion" },
      { name: "Miro" },
      { name: "Windows" },
    ],
  },
  {
    group: "Design & equipamentos",
    items: [
        { name: "CorelDraw" },
        { name: "Photoshop" },
        { name: "SignMaster" },
      { name: "CameraCut" },
      { name: "LightBurn" },
      { name: "EzCad" },
    ],
  },
];

export const stack = {
  label: "Stack",
  title: "Ferramentas do ofício",
  intro:
    "O que eu escrevo e com o que eu construo — da linguagem ao software " +
    "que roda na máquina do cliente.",
  barLabel: "Nos repositórios públicos",
  note: "Distribuição real dos meus repositórios públicos no GitHub",
  /* Cores da paleta do site, não as cores de marca de cada linguagem:
     o amarelo do JS e o laranja do HTML brigariam com o roxo. */
  measured: [
    { name: "HTML", pct: 57.7, color: "#a855f7" },
    { name: "JavaScript", pct: 23.0, color: "#d16bff" },
    { name: "CSS", pct: 18.5, color: "#6d5cff" },
    { name: "TypeScript", pct: 0.8, color: "#c026d3" },
  ],
  groups: stackGroups,
};

export const background = {
  label: "Formação",
  items: [
    {
      title: "Análise e Desenvolvimento de Sistemas",
      meta: "Universidade Paulista · bolsa integral pelo Enem",
    },
    {
      title: "Inglês — 4 anos de curso",
      meta: "Wizard by Pearson · concluído",
    },
    {
      title: "13 certificados",
      meta: "Curso em Vídeo, Cidade de São Paulo, APDADOS",
    },
  ],
};

/* ---------- Carreira ----------
   Períodos e cargos conferidos com o LinkedIn (agosto de 2026). O que
   cada função fez de fato vem do relato do Erick e do registro interno
   dos projetos. */
export const career = {
  label: "Carreira",
  title: "Do suporte à infraestrutura de IA",
  intro:
    "Nenhum dos passos abaixo foi planejado como carreira. Cada um começou " +
    "como um problema concreto que precisava ser resolvido.",
  entries: [
    {
      period: "Aos 4 anos",
      role: "O primeiro contato",
      org: "",
      body: "Sentei na frente de um computador pela primeira vez e nunca mais saí. É o marco que explica o resto.",
      tags: [],
    },
    {
      period: "2022", // verificado: conta no GitHub criada em 10/02/2022
      role: "Primeiros commits",
      org: "GitHub",
      body: "Exercícios de CSS e as primeiras páginas responsivas — SiteMisato, a tela de login do Jujutsu, o estudo de parallax. Aprender construindo, sem curso formal no meio.",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      period: "jul — out de 2024",
      role: "Designer, depois Tráfego Pago",
      org: "Achei Montador",
      body: "Entrei como designer: edição de fotos, retoque e manipulação no Photoshop, e as peças visuais da empresa. Em setembro assumi também as campanhas de tráfego pago no Google Ads e no Meta Business, cuidando da gestão e da otimização.",
      tags: ["Photoshop", "Google Ads", "Meta Business", "Google Analytics"],
    },
    {
      period: "mai de 2024 — jul de 2025",
      role: "Assistente do Comitê StarTech",
      org: "APDADOS · freelance, remoto",
      body: "Suporte administrativo e logístico ao comitê: documentação técnica, organização dos processos e o trabalho de bastidor que faz um comitê voluntário entregar o que promete.",
      tags: ["Documentação técnica", "Processos", "Trabalho em equipe"],
    },
    {
      period: "abr de 2025 — agora",
      role: "Técnico IGP",
      org: "Bannerjet Group",
      body: "Suporte técnico especializado, quase todo remoto: plotters de recorte, máquinas de fibra laser e sistemas CellCut. Redes, manutenção e configuração de hardware de um lado; CorelDRAW, Photoshop, SignMaster e CameraCut do outro — os arquivos de corte e contorno precisam sair com precisão, e é aí que a maioria dos chamados começa.",
      tags: ["Suporte remoto", "Redes", "CorelDRAW", "SignMaster", "CameraCut"],
    },
    {
      period: "jun de 2025 — agora",
      role: "Coordenador do Comitê StarTech",
      org: "APDADOS · freelance, remoto",
      body: "Coordeno e oriento o comitê, com foco na formação de alunos e profissionais entrando no mercado. É onde a parte analítica e de infraestrutura de TI encontra gente — montar trilha, revisar material, destravar carreira.",
      tags: ["Coordenação", "Cursos de treinamento", "Mentoria"],
    },
    {
      period: "Hoje",
      role: "Conteúdo técnico e infraestrutura de IA",
      org: "Bannerjet Group",
      body: "A virada veio de uma falha concreta: os técnicos gastavam mais tempo repetindo a mesma explicação do que resolvendo o problema. Mapeei o suporte inteiro num fluxograma, produzi os vídeos — e só quando troquei a minha narração por IA o time passou a usar. Daí vieram os manuais, os protótipos das telas dos equipamentos, a base no Notion e o chatbot com RAG que hoje atende no WhatsApp.",
      tags: ["RAG", "Supabase", "n8n", "ElevenLabs", "Callbell", "Notion"],
    },
  ],
};

/* ---------- Certificados ----------

   A IMAGEM DE CADA CERTIFICADO É OPCIONAL E NÃO PRECISA DE CÓDIGO.
   Basta salvar o arquivo em `public/certificados/` com o nome do `slug`
   abaixo — `wizard-teens-course.jpg`, por exemplo. O componente tenta
   .jpg, .jpeg, .png e .webp nessa ordem e, se não achar nenhum, mostra
   o cartão só com o texto (sem imagem quebrada). Adicionou o arquivo,
   apareceu.

   Ordem: o componente ordena por `date` (mais recente primeiro), então
   dá para inserir um certificado novo em qualquer posição da lista. */

export type Certificate = {
  /* Também é o nome do arquivo da imagem em public/certificados/. */
  slug: string;
  title: string;
  issuer: string;
  /* AAAA-MM — usado só para ordenar. */
  date: string;
  /* Como a data aparece na tela. */
  dateLabel: string;
  expiresLabel?: string;
  credentialId?: string;
  /* Link "exibir credencial", quando existir. */
  href?: string;
  skills?: string[];
  description?: string;
};

/* Anotado como Certificate[] (e não `satisfies`) de propósito: com
   `satisfies` o TS guarda o tipo literal de cada item, e os campos
   opcionais que ninguém preencheu ainda — `href`, por exemplo — deixam
   de existir para quem consome a lista. */
const certificateItems: Certificate[] = [
    {
      slug: "lgpd-panorama-estados",
      title: "Panorama da LGPD em Cada Estado do Brasil",
      issuer: "APDADOS",
      date: "2024-08",
      dateLabel: "ago de 2024",
      expiresLabel: "válido até ago de 2034",
      description:
        "Live sobre as particularidades da implementação e da conformidade com a LGPD em cada região do país — como os estados brasileiros vêm lidando com a regulamentação, considerando especificidades locais e desafios regionais.",
    },
    {
      slug: "dpo-multas-e-condutas",
      title: "Cenário de Multas e Condutas para o Desenvolvimento de um DPO",
      issuer: "APDADOS",
      date: "2024-05",
      dateLabel: "mai de 2024",
      expiresLabel: "válido até mai de 2034",
      description:
        "Análise das penalidades previstas na LGPD e das condutas esperadas de um Data Protection Officer: responsabilidades, estratégias de mitigação de risco e o papel do DPO na conformidade da organização.",
    },
    {
      slug: "orientacao-carreira-ti",
      title: "Orientação de Carreira para Profissionais de T.I",
      issuer: "APDADOS",
      date: "2024-05",
      dateLabel: "mai de 2024",
      expiresLabel: "válido até mai de 2034",
      description:
        "Estratégias práticas de desenvolvimento de carreira em tecnologia: desafios e oportunidades do mercado, e como alinhar habilidade técnica com o que a indústria está pedindo.",
    },
    {
      slug: "ia-para-dpos",
      title: "Inteligências Artificiais para DPOs",
      issuer: "APDADOS",
      date: "2024-03",
      dateLabel: "mar de 2024",
      expiresLabel: "válido até jan de 2034",
      skills: [
        "Implicações éticas da IA",
        "Legislação de proteção de dados",
      ],
      description:
        "Uso de IA no contexto da proteção de dados — como um DPO pode aplicar essas tecnologias para melhorar conformidade e segurança dentro da organização.",
    },
    {
      slug: "ux-design",
      title: "User Experience — UX Design",
      issuer: "Cidade de São Paulo",
      date: "2024-02",
      dateLabel: "fev de 2024",
      skills: ["Prototipagem", "Web design responsivo"],
    },
    {
      slug: "banco-de-dados-relacional",
      title: "Banco de Dados Relacional",
      issuer: "Cidade de São Paulo",
      date: "2024-02",
      dateLabel: "fev de 2024",
      skills: ["SQL", "Armazenamento de dados"],
    },
    {
      slug: "wizard-teens-course",
      title: "Teens Course",
      issuer: "Wizard by Pearson",
      date: "2023-12",
      dateLabel: "dez de 2023",
      expiresLabel: "válido até dez de 2034",
      skills: ["Inglês como língua estrangeira", "Gramática"],
      description:
        "Quatro anos de estudo intensivo: conversação, escrita, leitura e compreensão auditiva, em contexto acadêmico e profissional. É o que sustenta a conversa técnica em inglês.",
    },
    {
      slug: "javascript-curso-em-video",
      title: "JavaScript — 40 horas",
      issuer: "Curso em Vídeo",
      date: "2023-01",
      dateLabel: "jan de 2023",
      credentialId: "842AD-6C61-A",
      skills: ["JavaScript", "Aplicações web interativas"],
    },
    {
      slug: "html5-css3-modulo-4",
      title: "HTML5 e CSS3 — módulo 4 · 40 horas",
      issuer: "Curso em Vídeo",
      date: "2022-12",
      dateLabel: "dez de 2022",
      credentialId: "842AD-26CB1-9",
      skills: ["Scripts HTML", "Programação lógica"],
    },
    {
      slug: "html5-css3-modulo-3",
      title: "HTML5 e CSS3 — módulo 3 · 40 horas",
      issuer: "Curso em Vídeo",
      date: "2022-09",
      dateLabel: "set de 2022",
      credentialId: "842AD-15678-1",
    },
    {
      slug: "html5-css3-modulo-2",
      title: "HTML5 e CSS3 — módulo 2 · 40 horas",
      issuer: "Curso em Vídeo",
      date: "2022-09",
      dateLabel: "set de 2022",
      credentialId: "842AD-E776-6",
      skills: ["CSS"],
    },
    {
      slug: "html5-css3-modulo-1",
      title: "HTML5 e CSS3 — módulo 1 · 40 horas",
      issuer: "Curso em Vídeo",
      date: "2022-07",
      dateLabel: "jul de 2022",
      credentialId: "842AD-C9E9-4",
    },
  {
    slug: "aluno-destaque",
    title: "Aluno Destaque",
    issuer: "Colégio Monte Sinai",
    date: "2019-12",
    dateLabel: "dez de 2019",
  },
];

export const certificates = {
  label: "Certificados",
  title: "O que está no papel",
  intro:
    "Cursos, eventos e credenciais — dos primeiros módulos de HTML aos " +
    "encontros sobre LGPD e IA aplicada à privacidade de dados.",
  /* Aparece sobre a imagem no hover. */
  imageHint: "Clique para ver o certificado",
  items: certificateItems,
};

/* ---------- Globo ----------
   Arcos saindo do Brasil: o site inteiro fala em trabalhar fora, e o
   globo é a forma literal de dizer isso. São Paulo é a origem de todos. */
export const globe = {
  label: "Alcance",
  title: "Daqui para o mundo",
  body:
    "Baseado em São Paulo, mirando o mundo. Quero trabalhar fora do Brasil, " +
    "afiar o inglês e conhecer novas culturas — enquanto sigo construindo " +
    "ferramentas que facilitam o trabalho de outras pessoas.",
  /* São Paulo → destinos. Edite à vontade. */
  origin: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
  destinations: [
    { lat: 40.7128, lng: -74.006, label: "Nova York" },
    { lat: 37.7749, lng: -122.4194, label: "São Francisco" },
    { lat: 51.5072, lng: -0.1276, label: "Londres" },
    { lat: 52.52, lng: 13.405, label: "Berlim" },
    { lat: 38.7223, lng: -9.1393, label: "Lisboa" },
    { lat: 35.6762, lng: 139.6503, label: "Tóquio" },
    { lat: 1.3521, lng: 103.8198, label: "Singapura" },
    { lat: 43.6532, lng: -79.3832, label: "Toronto" },
    { lat: -33.8688, lng: 151.2093, label: "Sydney" },
  ],
};

export const contact = {
  label: "Contato",
  titleLines: ["Vamos", "construir"],
  body:
    "Aberto a projetos, colaborações e conversas sobre IA, automação e front-end. " +
    "Ainda quero trabalhar fora do Brasil e conhecer novas culturas — enquanto sigo " +
    "construindo ferramentas que facilitam o trabalho dos outros.",
  quote: "Me entregue o Claude Code e com minha criatividade moverei o mundo...",
  /* O e-mail aparece por extenso, como o próprio link. Um botão escrito
     "enviar e-mail" esconde a informação que a pessoa veio buscar — e
     quem quer copiar o endereço em vez de abrir o cliente de e-mail
     ficava sem saída. */
  emailHint: "Me escreve",
  /* Linha de disponibilidade: responde a pergunta que vem antes do
     "como falo com ele" — se vale a pena falar. */
  availability: [
    { label: "Onde", value: "São Paulo, Brasil" },
    { label: "Formato", value: "Remoto, híbrido ou exterior" },
    { label: "Resposta", value: "Em até 1 dia útil" },
  ],
  socialsLabel: "Nas redes",
  socials: [
    { label: "GitHub", handle: "@ErickkADR", href: "https://github.com/ErickkADR" },
    {
      label: "LinkedIn",
      handle: "/in/erickkadr",
      href: "https://www.linkedin.com/in/erickkadr/",
    },
    {
      label: "Instagram",
      handle: "@erickk.adr",
      href: "https://www.instagram.com/erickk.adr/",
    },
    {
      label: "YouTube",
      handle: "@erickk1392",
      href: "https://www.youtube.com/@erickk1392",
    },
  ],
};
