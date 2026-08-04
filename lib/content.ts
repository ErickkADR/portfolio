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
  { label: "Linguagens", href: "#linguagens" },
  { label: "Carreira", href: "#carreira" },
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
  /* O que ele faz hoje, direto do README do perfil. */
  doing: [
    "Chatbots de suporte com RAG (Supabase + embeddings vetoriais) alimentados por uma base unificada de centenas de pares de Q&A",
    "Automação de atendimento no WhatsApp e classificação de mensagens com nós lógicos do Callbell",
    "Integrações via webhook entre WhatsApp, n8n e outras plataformas para roteamento inteligente de suporte",
    "Tutoriais técnicos e fluxogramas narrados por IA (ElevenLabs), hoje o padrão do time de suporte",
    "Manuais técnicos, canal de tutoriais no YouTube e localização de software (PT-BR)",
    "Engenharia reversa e ferramentas sob medida — instaladores, plugins, sistemas de localização — quando as oficiais não dão conta",
  ],
  stats: [
    { value: "4", label: "Anos de idade no primeiro contato com um computador" },
    { value: "14", label: "Projetos públicos no GitHub" },
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

export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  href: string;
  repo?: string;
  tags: string[];
  /* Cor usada no hover do item e no fundo da moldura. */
  tint: string;
};

export const projects: Project[] = [
  {
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
  },
  {
    index: "02",
    title: "Atomai",
    category: "SaaS · Chatbots com IA",
    year: "2026",
    description:
      "Plataforma SaaS de chatbots com IA especializada: integração com a Gemini API, painel administrativo e uma interface dark pensada para uso prolongado.",
    href: "https://erickkadr.github.io/Atomai-Saas/",
    repo: "https://github.com/ErickkADR/Atomai-Saas",
    tags: ["Gemini API", "SaaS", "Painel admin"],
    tint: "#6d5cff",
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

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

/* ---------- Linguagens ----------
   Os percentuais são os bytes reais que a API do GitHub reporta somando
   todos os repositórios públicos (não-forks) — não é estimativa.
   Para atualizar:
     GET https://api.github.com/repos/ErickkADR/<repo>/languages
   Python e VBA não têm percentual porque o trabalho neles é interno
   (automações e ferramentas da Bannerjet), fora dos repos públicos. */
export const languages = {
  label: "Linguagens",
  title: "O que eu escrevo",
  note: "Distribuição real dos meus repositórios públicos no GitHub",
  /* Cores da paleta do site, não as cores de marca de cada linguagem:
     o amarelo do JS e o laranja do HTML brigariam com o roxo. */
  measured: [
    { name: "HTML", pct: 57.7, color: "#a855f7" },
    { name: "JavaScript", pct: 23.0, color: "#d16bff" },
    { name: "CSS", pct: 18.5, color: "#6d5cff" },
    { name: "TypeScript", pct: 0.8, color: "#c026d3" },
  ],
  /* A lista completa, com onde cada uma é usada de fato. */
  all: [
    {
      name: "JavaScript",
      color: "#d16bff",
      note: "Carrinho, catálogos e a lógica dos portais técnicos",
    },
    {
      name: "TypeScript",
      color: "#c026d3",
      note: "Roteamento por licença do Campro A3 Pro, com React 18",
    },
    {
      name: "HTML",
      color: "#a855f7",
      note: "Estrutura de todos os portais e landing pages",
    },
    {
      name: "CSS",
      color: "#6d5cff",
      note: "Layout responsivo, temas escuros e animações sem JS",
    },
    {
      name: "Python",
      color: "#8b5cf6",
      note: "Pipelines de RAG, embeddings e automações internas",
    },
    {
      name: "VBA",
      color: "#7c3aed",
      note: "Ferramentas sob medida dentro do fluxo de trabalho da equipe",
    },
  ],
};

export const stack = [
  {
    group: "Front-end",
    items: ["JavaScript", "HTML", "CSS", "React", "TypeScript"],
  },
  {
    group: "IA & Automação",
    items: ["RAG", "Supabase", "Gemini API", "n8n", "ElevenLabs", "Callbell"],
  },
  {
    group: "Linguagens & Base",
    items: ["Python", "VBA", "Git", "Windows"],
  },
  {
    group: "Design & Equipamentos",
    items: ["CorelDraw", "Photoshop", "SignMaster", "LightBurn", "EzCad"],
  },
];

export const background = {
  label: "Formação",
  items: [
    {
      title: "Análise e Desenvolvimento de Sistemas",
      meta: "Unip",
    },
    {
      title: "Certificado de inglês — 4 anos",
      meta: "Wizard",
    },
    {
      title: "Criador de Conteúdo Técnico",
      meta: "Bannerjet Group · atual",
    },
  ],
};

/* ---------- Carreira ----------
   ⚠️ O LinkedIn bloqueia leitura automatizada (HTTP 999), então NÃO deu
   para puxar daqui. O que está abaixo vem do README do seu GitHub e das
   datas dos repositórios — é verdadeiro, mas incompleto.

   CONFIRME / COMPLETE: os períodos exatos de cada cargo, o nome da
   empresa onde você fez suporte técnico (se não foi a própria Bannerjet)
   e qualquer função anterior que faltou. Basta editar os `period`. */
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
      period: "[CONFIRMAR período]",
      role: "Suporte técnico",
      org: "Bannerjet Group",
      body: "Atendimento a plotters, laminadoras, impressoras UV e laser. Foi aqui que ficou claro quanto tempo se perde procurando um manual, um parâmetro de corte ou um firmware antigo.",
      tags: ["Suporte", "Equipamentos"],
    },
    {
      period: "[CONFIRMAR período]",
      role: "As ferramentas paralelas",
      org: "Bannerjet Group",
      body: "Comecei a construir pequenas ferramentas com IA para resolver os problemas do meu próprio time. Não era o meu cargo — virou o meu cargo.",
      tags: ["Python", "Automação", "IA"],
    },
    {
      period: "Hoje",
      role: "Criador de Conteúdo Técnico",
      org: "Bannerjet Group",
      body: "Projeto e construo a infraestrutura de IA por trás do suporte técnico, da documentação e do treinamento: chatbots com RAG, automação de WhatsApp, tutoriais narrados por IA, manuais e localização de software.",
      tags: ["RAG", "Supabase", "n8n", "ElevenLabs", "Callbell"],
    },
  ],
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
  cta: "Enviar e-mail",
  socials: [
    { label: "GitHub", href: "https://github.com/ErickkADR" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/erickkadr/" },
    { label: "Instagram", href: "https://www.instagram.com/erickk.adr/" },
    { label: "YouTube", href: "https://www.youtube.com/@erickk1392" },
  ],
};
