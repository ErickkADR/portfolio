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
