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

/* A ordem aqui é a ordem das seções na página — os dois vêm da mesma
   lista, então mexer numa acerta a outra. */
export const nav = [
  { label: "Início", href: "#hero" },
  { label: "Sobre", href: "#sobre" },
  { label: "Cargo atual", href: "#cargo-atual" },
  { label: "Carreira", href: "#carreira" },
  { label: "Projetos", href: "#projetos" },
  { label: "Stack", href: "#stack" },
  { label: "Certificados", href: "#certificados" },
  { label: "Metas", href: "#metas" },
  { label: "Contato", href: "#contato" },
];

export const hero = {
  greeting: "Olá, meu nome é",
  /* Uma linha por parte do nome — elas sobem em cascata. */
  nameLines: ["Erick", "Dantas"],
  /* A categoria mais buscada que descreve de fato o que ele faz: constrói
     a interface e o back de IA dos portais que entrega, ponta a ponta.
     "Front-end" venderia menos do que o trabalho é; "Full-stack com IA"
     é o termo que um recrutador digita. */
  role: "Desenvolvedor Full-stack & IA",
  /* Logos que aparecem em fila sob o nome. As chaves são as mesmas de
     lib/logos.tsx — sem chave conhecida, o item nem é renderizado. */
  techIcons: [
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "python",
    "supabase",
    "tailwind",
    "git",
  ],
  /* Legendas que se alternam sozinhas, a cada ~4s. */
  captions: [
    { text: "Suporte técnico virou infraestrutura de IA" },
    { text: "RAG, automação e conteúdo que ensina" },
    { text: "Construído para facilitar a vida de quem usa" },
  ],
};

/* ---------- Sobre ----------
   Foto à esquerda, texto à direita.

   A FOTO NÃO PRECISA DE CÓDIGO: salve o arquivo como
   `public/sobre/erick.jpg` (ou .png / .webp) e ele aparece. Sem arquivo,
   o espaço vira uma moldura com as iniciais — nada de imagem quebrada. */
export const sobre = {
  label: "Sobre",
  title: "Quem constrói isso",
  photoName: "erick",
  photoAlt: "Erick Dantas",
  /* Parágrafos da coluna da direita. */
  body: [
    "Tive meu primeiro contato com tecnologia aos 4 anos e nunca mais parei. " +
      "Acredito que o valor real da tecnologia está em facilitar a vida das " +
      "pessoas — e que conhecimento deveria ser acessível a todo mundo.",
    "Comecei no suporte técnico construindo pequenas ferramentas com IA para " +
      "resolver problemas reais do meu time. Não era o meu cargo; virou o meu " +
      "trabalho.",
    "Hoje projeto e construo a infraestrutura de IA por trás do suporte, da " +
      "documentação e do treinamento técnico da Bannerjet — do chatbot que " +
      "atende no WhatsApp ao portal que o time consulta todo dia.",
  ],
  /* Ficha rápida ao pé da coluna de texto. */
  facts: [
    { label: "Onde", value: "São Paulo, Brasil" },
    { label: "Cargo", value: "Criador de Produto Técnico" },
    { label: "Empresa", value: "Bannerjet Group" },
    { label: "Idiomas", value: "Português e inglês" },
  ],
};

/* ---------- Cargo atual: feitos na Bannerjet ----------

   A seção que prova o que está escrito na carreira. Cada feito pode ter
   MATERIAL DE COMPROVAÇÃO — print, PDF ou vídeo.

   COMO ANEXAR (sem mexer em código):
   crie a pasta `public/feitos/<slug>/` e jogue os arquivos dentro.
   Aceita imagem (.jpg .png .webp .gif), vídeo (.mp4 .webm .mov) e .pdf.
   Os arquivos aparecem em ordem alfabética, então nomes como
   `01-visao-geral.png`, `02-fluxo.png` controlam a sequência.
   Feito sem pasta continua aparecendo, só sem a galeria. */

export type Feito = {
  slug: string;
  title: string;
  body: string;
  tags: string[];
  /* Marca os que valem destaque visual na grade. */
  destaque?: boolean;
};

export type FeitoGrupo = {
  group: string;
  intro: string;
  items: Feito[];
};

const feitosGrupos: FeitoGrupo[] = [
  {
    group: "Produtos",
    intro: "O que virou ferramenta de uso diário do time e dos clientes.",
    items: [
      {
        slug: "central-tecnica",
        title: "Central Técnica",
        destaque: true,
        body:
          "Nasceu de uma conta simples: o tempo que o time gastava procurando um " +
          "manual antigo, um parâmetro de corte ou a versão certa de um firmware " +
          "era maior que o tempo de resolver o problema em si. O material existia — " +
          "espalhado por pastas, e-mails e conversas de WhatsApp. O portal reúne " +
          "tudo num lugar só: catálogo com página própria por máquina, manuais, " +
          "peças, firmwares, perfis de cor, parâmetros e cursos com progressão por " +
          "módulos. O que antes era \"pergunta pro fulano\" virou link. Por cima " +
          "roda um chatbot que responde dúvidas técnicas usando a mesma base do " +
          "portal — pergunta em português, resposta com a fonte.",
        tags: ["Portal", "Chatbot", "Base de conhecimento"],
      },
      {
        slug: "jet-ia-whatsapp",
        title: "Jet IA — chatbot de suporte no WhatsApp",
        destaque: true,
        body:
          "Chatbot com RAG em produção, atendendo cliente de verdade: n8n " +
          "orquestrando os fluxos, Supabase guardando os embeddings e a Callbell " +
          "como canal. Erro aqui tem custo real, então cada mudança na base passa " +
          "por teste manual antes de valer.",
        tags: ["RAG", "n8n", "Supabase", "Callbell"],
      },
      {
        slug: "portal-licencas-a3",
        title: "Portal de instalação da linha A3",
        body:
          "Instalação de programas e licenças dos equipamentos da linha A3 num " +
          "endereço só. A licença do equipamento abre a página dele, com o " +
          "instalador, a documentação e o vídeo correspondentes — no lugar do " +
          "envio manual de arquivos a cada venda.",
        tags: ["Portal", "Pós-venda", "Licenciamento"],
      },
      {
        slug: "erp-modulo-tecnico",
        title: "ERP — Módulo Técnico",
        body:
          "Desenvolvido em conjunto com o Victor Rocha, criador do projeto. " +
          "Construí o Painel de Atendimentos: a visão geral dos atendimentos " +
          "técnicos, da equipe e da agenda da semana. E levei a Jet IA para dentro " +
          "do módulo, dando a todo colaborador acesso ao conhecimento técnico e às " +
          "informações da empresa sem precisar perguntar a alguém.",
        tags: ["Dashboard", "Supabase", "Jet IA"],
      },
      {
        slug: "prototipos-equipamentos",
        title: "Protótipos das telas dos equipamentos",
        body:
          "Réplicas navegáveis das interfaces das máquinas. O técnico treina o " +
          "caminho do menu antes de encostar no equipamento, e o cliente vê o passo " +
          "exato sem depender de foto de tela tremida.",
        tags: ["Protótipo", "Treinamento"],
      },
    ],
  },
  {
    group: "Automações",
    intro:
      "Fluxos que rodam sozinhos e devolvem ao time o tempo que ia embora em " +
      "tarefa repetida.",
    items: [
      {
        slug: "agendamento-tecnico",
        title: "Agendamento técnico automático",
        body:
          "O cliente marca o horário e o fluxo resolve o resto: cria o evento no " +
          "Google Agenda, gera o link do Meet e transfere a conversa para o técnico " +
          "especialista naquele equipamento.",
        tags: ["Google Agenda", "Meet", "n8n"],
      },
      {
        slug: "ia-supervisora",
        title: "IA supervisora de atendimentos",
        body:
          "Vigia a fila inteira: encontra cliente sem resposta e avisa o técnico, " +
          "transfere conversa parada e informa o cliente quando o técnico está fora " +
          "— horário de almoço, fim de expediente. Ninguém fica esperando sem saber.",
        tags: ["Monitoramento", "n8n"],
      },
      {
        slug: "chatbot-treinamento",
        title: "Chatbot de treinamento e instalação",
        destaque: true,
        body:
          "Depois de mapear todos os equipamentos e gravar o vídeo de cada um, " +
          "montei o chatbot que dá o treinamento completo das máquinas da Bannerjet " +
          "e emite o certificado direto pelo WhatsApp, no fim da trilha.",
        tags: ["Treinamento", "Certificado", "WhatsApp"],
      },
      {
        slug: "laudo-jet",
        title: "Laudo Jet",
        body:
          "Gera o laudo técnico de cada atendimento a partir da própria conversa, " +
          "no formato que o time já usava — o registro deixou de depender de alguém " +
          "lembrar de escrever.",
        tags: ["Laudo", "n8n"],
      },
      {
        slug: "ia-recepcao-audio",
        title: "IA de recepção por áudio",
        body:
          "Recebe o cliente falando, registra as informações pessoais e encaminha " +
          "para a automação certa — treinamento, instalação ou suporte.",
        tags: ["Áudio", "Triagem"],
      },
      {
        slug: "ia-video-audio",
        title: "IA que entende vídeo e áudio no WhatsApp",
        body:
          "Cliente com problema manda vídeo do equipamento, não texto. A automação " +
          "lê o que foi enviado e devolve resposta sobre aquilo, em vez de pedir " +
          "que a pessoa descreva por escrito o que já mostrou.",
        tags: ["Multimodal", "WhatsApp"],
      },
      {
        slug: "ia-notas-contato",
        title: "IA que atualiza as notas do cliente",
        body:
          "Mantém a ficha de cada contato viva na plataforma: equipamento, " +
          "histórico e o que ficou pendente, escrito pela própria automação ao fim " +
          "do atendimento.",
        tags: ["CRM", "Callbell"],
      },
      {
        slug: "drive-notion-laboratorio",
        title: "Drive sincronizado com o Kanban do laboratório",
        body:
          "Cria a pasta no Google Drive de cada equipamento que entra em " +
          "manutenção e mantém o status em sincronia com o Kanban do Notion do " +
          "laboratório técnico.",
        tags: ["Google Drive", "Notion", "n8n"],
      },
    ],
  },
  {
    group: "Conteúdo técnico",
    intro:
      "A parte que fez o time parar de repetir a mesma explicação e virou o " +
      "meu cargo.",
    items: [
      {
        slug: "fluxograma-suporte",
        title: "Fluxograma do suporte técnico",
        destaque: true,
        body:
          "584 elementos mapeando o atendimento inteiro, do primeiro contato ao " +
          "encerramento do chamado. Foi o diagnóstico que mostrou onde o tempo " +
          "estava indo embora — e a base de tudo que veio depois.",
        tags: ["Miro", "Processo"],
      },
      {
        slug: "tutoriais-narrados-ia",
        title: "Tutoriais técnicos narrados por IA",
        body:
          "Produzi os vídeos bem editados e alguns técnicos não usavam, porque era " +
          "a minha voz. Troquei a narração por IA e o jogo virou: hoje é o padrão " +
          "do time.",
        tags: ["ElevenLabs", "Vídeo"],
      },
      {
        slug: "canal-youtube",
        title: "Canal de tutoriais técnicos no YouTube",
        body:
          "O acervo de vídeos publicado onde o cliente já procura. O suporte " +
          "responde com um link em vez de repetir a explicação por escrito.",
        tags: ["YouTube", "Vídeo"],
      },
      {
        slug: "manuais-tecnicos",
        title: "Manuais técnicos",
        body:
          "Manuais de equipamento gerados com um framework de prompts e um guia de " +
          "formatação rígido, para sair tudo com a mesma cara e a identidade da " +
          "marca — sem depender de quem diagramou.",
        tags: ["Documentação", "IA"],
      },
    ],
  },
];

export const feitos = {
  label: "Cargo atual",
  title: "Feitos na Bannerjet",
  intro:
    "Criador de Produto Técnico. O que está aqui foi construído dentro da " +
    "empresa e está em uso — cada item traz o material de comprovação.",
  /* Rótulo do botão que abre a galeria de comprovação. */
  mediaLabel: "Ver material",
  mediaEmpty: "Material em digitalização",
  groups: feitosGrupos,
};

/* ---------- Métricas de sucesso ----------
   Números medidos, não estimados. Cada um tem de onde saiu. */
/* ---------- Métricas ----------
   Cada item responde "o que a empresa ganhou", não "o que eu construí".
   Por isso o par `value` + `outcome`: o número é a prova, e o `outcome`
   diz o que ele significa para a operação.

   ⚠️ COMPLETAR: os campos `outcome` marcados com [MEDIR] esperam o
   número real da Bannerjet — tempo de atendimento antes e depois,
   chamados repetidos que deixaram de existir, horas de treinamento
   economizadas. São os que mais convencem, e são os que eu não tenho
   como levantar daqui. Enquanto não vierem, o cartão mostra só o que
   é verificável. */
export const metricas = {
  label: "Resultados",
  title: "O que isso deu para a Bannerjet",
  intro:
    "Não é portfólio de protótipo: cada número abaixo veio de algo que " +
    "está em produção e que a equipe usa todo dia.",
  items: [
    {
      value: "209",
      label: "pares de pergunta e resposta na base que alimenta a Jet IA",
      outcome:
        "O time deixou de responder à mão a dúvida que já tinha sido respondida antes.",
      source: "Jet IA · Bannerjet",
    },
    {
      value: "584",
      label: "elementos no fluxograma que mapeou o suporte técnico inteiro",
      outcome:
        "O caminho de cada chamado deixou de morar na cabeça de quem já estava na casa.",
      source: "Miro · Bannerjet",
    },
    {
      value: "24/7",
      label: "atendimento do chatbot com RAG no WhatsApp",
      outcome:
        "A primeira resposta ao cliente não depende mais de haver alguém disponível.",
      source: "Callbell + n8n · Bannerjet",
    },
    {
      value: "130+",
      label: "produtos catalogados no e-commerce da Nexus",
      outcome:
        "Pedido fechado direto no WhatsApp, sem intermediário e sem tabela de preço por e-mail.",
      source: "Nexus Print",
    },
  ],
};

/* ---------- Recomendações ----------
   ⚠️ ESTE BLOCO ESTÁ VAZIO DE PROPÓSITO.

   Depoimento é palavra de outra pessoa, com o nome dela em cima. Não dá
   para eu escrever no lugar de um gestor ou de um professor: mesmo que
   o conteúdo fosse plausível, seria uma citação inventada atribuída a
   alguém real — e num portfólio isso é o tipo de coisa que destrói a
   credibilidade que a seção deveria construir.

   COMO PREENCHER: peça a recomendação (o LinkedIn tem "Solicitar
   recomendação" e o texto vem pronto), copie o que a pessoa escreveu e
   adicione um item aqui. Com a lista vazia, a seção simplesmente não
   aparece no site — nada quebra.

   Exemplo do formato:
     {
       quote: "texto exatamente como a pessoa escreveu",
       name: "Nome Sobrenome",
       role: "Cargo",
       org: "Empresa",
       href: "https://www.linkedin.com/in/...",  // opcional
       avatar: "fulano",  // opcional: public/recomendacoes/fulano.jpg
     }
*/
export type Recomendacao = {
  quote: string;
  name: string;
  role: string;
  org: string;
  href?: string;
  /* Nome do arquivo (sem extensão) em public/recomendacoes/. */
  avatar?: string;
};

export const recomendacoes = {
  label: "Recomendações",
  title: "O que dizem de mim",
  intro:
    "Pessoas com quem trabalhei — gestores, professores e colegas de " +
    "comitê.",
  items: [] as Recomendacao[],
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
    /* As categorias são escritas como o termo que alguém digitaria numa
       busca — "plataforma de treinamento técnico", e não "portal
       interno". O nome da marca já está no título; a categoria serve
       para dizer que tipo de produto é. */
    category: "Plataforma de treinamento técnico",
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
    category: "Plataforma SaaS de chatbot com IA",
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
    category: "Marketplace de produtos personalizados",
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
    category: "Portal de pós-venda e licenciamento",
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
    category: "Landing page responsiva",
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
    category: "Site com efeito parallax",
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
  /* Chave da logo, resolvida em components/Stack.tsx. Sem chave (ou com
     uma que não existe no mapa), o item cai no monograma — as iniciais
     dentro do mesmo ladrilho. É o caso de n8n, Callbell, ElevenLabs e
     dos softwares de equipamento, que não têm ícone de marca pronto. */
  icon?: string;
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
        icon: "html",
        color: "#a855f7",
        pct: 57.7,
        note: "Estrutura de todos os portais e landing pages",
      },
      {
        name: "JavaScript",
        icon: "javascript",
        color: "#d16bff",
        pct: 23.0,
        note: "Carrinho, catálogos e a lógica dos portais técnicos",
      },
      {
        name: "CSS",
        icon: "css",
        color: "#6d5cff",
        pct: 18.5,
        note: "Layout responsivo, temas escuros e animações sem JS",
      },
      {
        name: "TypeScript",
        icon: "typescript",
        color: "#c026d3",
        pct: 0.8,
        note: "O Campro A3 Pro com React 18 — e este portfólio inteiro",
      },
      {
        name: "Python",
        icon: "python",
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
      { name: "Supabase", icon: "supabase" },
      { name: "n8n" },
      { name: "Gemini API", icon: "google" },
      { name: "ElevenLabs" },
      { name: "Callbell" },
      { name: "Claude Code" },
    ],
  },
  {
    group: "Front-end",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "GSAP" },
      { name: "Spline" },
    ],
  },
  {
    group: "Base & ferramentas",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "PowerShell", icon: "powershell" },
      { name: "Notion", icon: "notion" },
      { name: "Miro" },
      { name: "Windows", icon: "windows" },
    ],
  },
  {
    group: "Design & equipamentos",
    items: [
      { name: "CorelDraw" },
      { name: "Photoshop", icon: "adobe" },
      { name: "SignMaster" },
      { name: "CameraCut" },
      { name: "LightBurn" },
      { name: "EzCad" },
    ],
  },
];

export const stack = {
  label: "Stack",
  title: "Ferramentas que trabalho!",
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

/* ---------- Formação ---------- */
export const background = {
  label: "Formação",
  title: "Onde eu estudei",
  intro:
    "As três portas que abriram o resto — e as duas primeiras vieram por " +
    "nota, não por mensalidade.",
  items: [
    {
      period: "2019",
      icon: "escola",
      title: "Bolsa de estudo · Colégio Monte Sinai",
      meta: "Metodologia Mackenzie",
      body:
        "Conquistei a bolsa e, no fim do ano, o certificado de Aluno Destaque " +
        "pelas notas.",
      highlight: "Aluno Destaque",
    },
    {
      period: "2021 — 2023",
      icon: "tecnico",
      title: "Curso técnico de Informática",
      meta: "Certificado de tecnólogo",
      body:
        "Infraestrutura de redes, hardware e programação. O desempenho acima da " +
        "média virou convite do professor para criar as aulas e as apresentações " +
        "junto com ele — foi o meu primeiro trabalho remunerado com tecnologia.",
      highlight: "Ensinei junto com o professor",
    },
    {
      period: "2024",
      icon: "graduacao",
      title: "Análise e Desenvolvimento de Sistemas",
      meta: "Universidade Paulista",
      body: "Bolsa de 100% conquistada pela nota do Enem.",
      highlight: "Bolsa integral",
    },
  ],
};

/* ---------- Carreira ----------
   Períodos e cargos conferidos com o LinkedIn (agosto de 2026). O que
   cada função fez de fato vem do relato do Erick.

   CADA ETAPA TEM PÁGINA PRÓPRIA em /carreira/<slug>/, com o material que
   comprova aquele período. Para anexar: crie `public/carreira/<slug>/` e
   jogue os arquivos dentro (imagem, vídeo ou PDF). Etapa sem pasta
   continua no site — a página só não mostra a galeria. */

export type CareerEntry = {
  slug: string;
  period: string;
  role: string;
  org: string;
  body: string;
  tags: string[];
  /* Texto extra que só aparece na página da etapa. */
  detail?: string[];
};

/* O `body` de cada etapa é deliberadamente curto — uma ou duas frases.
   Na linha do tempo, dois parágrafos por etapa transformam a seção num
   texto corrido e ninguém termina de ler. A história inteira vive no
   `detail`, que só aparece na página da etapa, atrás do "Ver mais". */
const careerEntries: CareerEntry[] = [
  {
    slug: "curso-tecnico-informatica",
    period: "2021 — 2023",
    role: "Curso técnico de Informática",
    org: "Formação técnica",
    body:
      "Redes, hardware e programação, com certificado de tecnólogo. O desempenho rendeu um convite do próprio professor para produzir as aulas junto com ele.",
    tags: ["Redes", "Hardware", "Programação"],
    detail: [
      "O curso cobriu a base que sustenta tudo que vem depois: como uma rede realmente funciona, o que acontece dentro da máquina e como escrever software que fala com os dois.",
      "Criar as aulas e as apresentações junto com o professor, remunerado, foi a primeira vez que ensinar tecnologia me pagou alguma coisa — e o primeiro sinal de algo que se repetiria na Bannerjet: explicar bem é um trabalho, e alguém precisa fazê-lo.",
    ],
  },
  {
    slug: "primeiros-commits",
    period: "2022", // verificado: conta no GitHub criada em 10/02/2022
    role: "Primeiros commits",
    org: "GitHub",
    body:
      "As primeiras páginas responsivas, aprendendo construindo — sem curso formal no meio.",
    tags: ["HTML", "CSS", "JavaScript"],
    detail: [
      "Exercícios de CSS e os primeiros projetos publicados: o SiteMisato, a tela de login do Jujutsu e o estudo de parallax que virou o Apenas Um Escritor.",
      "Nenhum deles era encomenda de ninguém. Eram desculpas para descobrir como uma coisa funcionava, e é assim que a maior parte do que eu sei foi aprendida.",
    ],
  },
  {
    slug: "achei-montador-designer",
    period: "2024",
    role: "Web Designer",
    org: "Achei Montador",
    body:
      "Responsável pelas peças visuais da marca: edição, retoque e manipulação no Photoshop.",
    tags: ["Photoshop", "Edição de imagens", "Design de interface"],
    detail: [
      "Entrei como designer, cuidando das atividades criativas da empresa — das fotos de produto às peças que sustentavam a comunicação da marca.",
    ],
  },
  {
    slug: "achei-montador-trafego",
    period: "2024",
    role: "Especialista em Tráfego Pago",
    org: "Achei Montador",
    body:
      "Gestão e otimização das campanhas no Google Ads e no Meta Business, com leitura de resultado no Analytics.",
    tags: ["Google Ads", "Meta Business", "Google Analytics"],
    detail: [
      "Assumi a operação de tráfego pago depois do design: definir público, acompanhar custo por resultado e cortar o que não performava.",
      "Foi onde aprendi a olhar para número como argumento, e não como enfeite de relatório — o que mudou a forma como eu apresento trabalho até hoje.",
    ],
  },
  {
    slug: "apdados-assistente",
    period: "mai de 2024 — jul de 2025",
    role: "Assistente do Comitê StarTech",
    org: "APDADOS · freelance, remoto",
    body:
      "Documentação técnica e organização dos processos do comitê — o bastidor que faz um grupo voluntário entregar o que promete.",
    tags: ["Documentação técnica", "Processos", "Trabalho em equipe"],
  },
  {
    slug: "bannerjet-tecnico",
    period: "abr de 2025 — agora",
    role: "Técnico IGP",
    org: "Bannerjet Group",
    body:
      "Suporte remoto a plotters de recorte, máquinas de fibra laser e sistemas CellCut.",
    tags: ["Suporte remoto", "Redes", "CorelDRAW", "SignMaster", "CameraCut"],
    detail: [
      "Redes, manutenção e configuração de hardware de um lado; CorelDRAW, Photoshop, SignMaster e CameraCut do outro.",
      "Os arquivos de corte e contorno precisam sair com precisão, e é aí que a maioria dos chamados começa — foi vendo o mesmo problema voltar que nasceu a ideia de documentar tudo.",
    ],
  },
  {
    slug: "apdados-coordenador",
    period: "jun de 2025 — agora",
    role: "Coordenador do Comitê StarTech",
    org: "APDADOS · freelance, remoto",
    body:
      "Coordeno o comitê com foco na formação de quem está entrando no mercado.",
    tags: ["Coordenação", "Cursos de treinamento", "Mentoria"],
    detail: [
      "É onde a parte analítica e de infraestrutura de TI encontra gente: montar trilha, revisar material, destravar carreira.",
    ],
  },
  {
    slug: "bannerjet-produto-tecnico",
    period: "Hoje",
    role: "Criador de Produto Técnico",
    org: "Bannerjet Group",
    body:
      "Mapeei o suporte inteiro, troquei a minha narração por IA e o time finalmente passou a usar. Daí vieram os manuais, a base no Notion e o chatbot com RAG no WhatsApp.",
    tags: ["RAG", "Supabase", "n8n", "ElevenLabs", "Callbell", "Notion"],
    detail: [
      "A virada veio de uma falha concreta: os técnicos gastavam mais tempo repetindo a mesma explicação do que resolvendo o problema.",
      "Mapeei o suporte num fluxograma e produzi os vídeos — mas só quando troquei a minha narração por IA o time passou a assistir. O atrito não era o conteúdo, era o formato.",
      "É o cargo atual, e o que está em Feitos na Bannerjet foi construído aqui: a Central Técnica, a Jet IA, o portal de licenças da linha A3, o Painel de Atendimentos do ERP e as automações que rodam sozinhas todo dia.",
    ],
  },
];

export const career = {
  label: "Carreira",
  title: "Conheça minha trajetória profissional até aqui!",
  intro:
    "Trabalho com o que amo. Cada etapa começou como um problema concreto " +
    "que precisava ser resolvido.",
  /* Rótulo do link que leva à página da etapa, onde mora a história
     inteira — o card da linha do tempo só dá o resumo. */
  entryCta: "Ver mais",
  entries: careerEntries,
};

/* Página de uma etapa da carreira. */
export const careerPage = {
  back: "Voltar para a carreira",
  materialLabel: "Material",
  materialEmpty:
    "O material desta etapa ainda está sendo digitalizado. Enquanto isso, os " +
    "certificados e os projetos da época estão no restante do site.",
  nextLabel: "Próxima etapa",
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
  /* Como a data aparece na tela. Só a emissão: a validade saiu do site
     porque "expira em 2034" não diz nada sobre a competência de quem
     fez o curso, e enchia o rodapé do cartão. */
  dateLabel: string;
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
      description:
        "Live sobre as particularidades da implementação e da conformidade com a LGPD em cada região do país — como os estados brasileiros vêm lidando com a regulamentação, considerando especificidades locais e desafios regionais.",
    },
    {
      slug: "dpo-multas-e-condutas",
      title: "Cenário de Multas e Condutas para o Desenvolvimento de um DPO",
      issuer: "APDADOS",
      date: "2024-05",
      dateLabel: "mai de 2024",
      description:
        "Análise das penalidades previstas na LGPD e das condutas esperadas de um Data Protection Officer: responsabilidades, estratégias de mitigação de risco e o papel do DPO na conformidade da organização.",
    },
    {
      slug: "orientacao-carreira-ti",
      title: "Orientação de Carreira para Profissionais de T.I",
      issuer: "APDADOS",
      date: "2024-05",
      dateLabel: "mai de 2024",
      description:
        "Estratégias práticas de desenvolvimento de carreira em tecnologia: desafios e oportunidades do mercado, e como alinhar habilidade técnica com o que a indústria está pedindo.",
    },
    {
      slug: "ia-para-dpos",
      title: "Inteligências Artificiais para DPOs",
      issuer: "APDADOS",
      date: "2024-03",
      dateLabel: "mar de 2024",
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
  label: "Meta profissional",
  title: "Daqui para o mundo",
  body:
    "Nascido em São Paulo, nunca saí do estado — e tenho o sonho de conhecer " +
    "o mundo, trabalhar fora do país e conhecer novas culturas, enquanto sigo " +
    "construindo ferramentas que facilitam o trabalho de outras pessoas ao " +
    "redor do mundo.",
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
