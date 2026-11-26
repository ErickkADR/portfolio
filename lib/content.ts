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
  { label: "Contato", href: "#contato" },
];

export const hero = {
  greeting: "Olá, meu nome é",
  /* Uma linha por parte do nome — elas sobem em cascata. */
  nameLines: ["Erick", "Dantas"],
  /* "Desenvolvedor Full-stack & IA" virou só "Desenvolvedor" a pedido
     dele (19/08/2026). Vale saber o que isso desfez: a versão anterior
     existia porque "Full-stack com IA" é o termo que um recrutador digita
     na busca, e o rótulo carregava sozinho a especialidade. Agora quem
     carrega é a `description` abaixo. Para voltar, é uma linha. */
  role: "Desenvolvedor",
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
  /* Sem descrição desde 26/11/2026: o parágrafo desceu para abrir o
     "Quem sou eu?", a pedido dele. O hero ficou só com nome, cargo e as
     logos. Para voltar, crie `description` aqui e no content-en. */

  /* ---------- A FOTO DE FUNDO E A REVELAÇÃO NO HOVER ----------

     Estavam na seção Sobre e subiram para cá; o vídeo fez o caminho
     inverso. A foto vale mais na primeira tela (é quem ele é, antes de
     qualquer texto) e a mancha líquida que revela a versão androide é o
     tipo de coisa que só funciona se a pessoa encontrar sem procurar.

     NÃO PRECISA DE CÓDIGO: salve `public/hero/erick.jpg` (ou .png /
     .webp) e ele aparece. Sem arquivo, o hero cai num fundo com as
     iniciais, sem imagem quebrada.

     A SEGUNDA FOTO (`public/hero/erick-ia.jpg`) é a que aparece sob a
     mancha. As duas precisam ter o MESMO enquadramento, mesma pose e
     mesmo tamanho, porque a revelação é um buraco na de cima: qualquer
     diferença de posição vira um pulo dentro da mancha. Sem esse arquivo
     o efeito some sozinho e fica só a foto.

     As duas atuais são 2048x1152, com ele no alto à esquerda e o fundo
     vazio à direita. É por isso que o texto do hero mora na metade
     DIREITA: trocar por uma foto de enquadramento diferente quebra a
     composição inteira. */
  photoName: "erick",
  photoAlt: "Erick Dantas",
  photoIAName: "erick-ia",
  photoIAAlt:
    "O mesmo retrato com o rosto substituído por uma cabeça de androide",
  /* A imagem não anuncia sozinha que reage ao mouse. O aviso some assim
     que a pessoa descobre. */
  photoHint: "Passe o mouse",
  /* No celular não há hover: a troca vira botão. [mostrar, voltar] */
  photoTap: ["Ver a versão IA", "Ver a foto"] as [string, string],
};

/* ---------- Sobre ----------
   O RELATO À ESQUERDA, O CRACHÁ PENDURADO À DIREITA.

   A seção já foi a faixa com a foto de fundo (que subiu para o hero) e,
   por algumas horas, o vídeo que abria a página. Hoje é o crachá do
   Lanyard, a pedido dele: o vídeo era uma peça de motion cheia de neon
   competindo com sete parágrafos, e qualquer véu forte o bastante para o
   texto ser legível apagava o próprio vídeo.

   O `public/video/hero.mp4` (7,7 MB) ficou SEM USO NENHUM no site depois
   dessa troca. Está mantido no repo de propósito, para o caso de ele
   querer o vídeo em outro lugar.

   A frente do crachá sai de `scripts/gera-cracha.mjs`. */
export const sobre = {
  label: "Sobre",
  photoAlt: "Erick Dantas",
  /* Título em primeira pessoa e como pergunta: a seção é a resposta.
     "Eu construo com IA" dizia o que ele faz, e isso já é o assunto do
     resto do site — aqui o que interessa é quem ele é. */
  title: "Quem sou eu?",
  /* O relato inteiro, na voz dele. São sete parágrafos e não dois: a
     seção deixou de dividir espaço com a foto (que subiu para o hero) e
     agora tem a coluna toda para contar a trajetória de fato. */
  /* REESCRITO EM 26/11/2026, a pedido dele: menor, profissional, sem
     a história de origem (4 anos, escola, APDADOS: isso está na
     Carreira). Abre com o parágrafo que era a descrição do hero e segue
     com o que ele entrega hoje e o que o diferencia: ciclo inteiro, do
     problema na operação ao resultado medido, com IA como ferramenta de
     engenharia, e não como enfeite. */
  body: [
    "Atuo na interseção entre tecnologia, inteligência artificial, automação e " +
      "design, transformando problemas complexos em soluções práticas. Grande " +
      "parte do meu trabalho está por trás de soluções que conectam IA, suporte " +
      "técnico, documentação e treinamento, desde automações e chatbots no " +
      "WhatsApp até plataformas usadas diariamente por equipes.",
    "Na Bannerjet Group, desenho e coloco em produção os sistemas que sustentam " +
      "o suporte técnico da empresa: o chatbot com RAG que atende clientes no " +
      "WhatsApp, o portal que reúne todo o conhecimento técnico, os painéis do " +
      "ERP e as automações em n8n que rodam sozinhas todos os dias.",
    "O que eu entrego é o ciclo inteiro: entender o problema na operação, " +
      "mapear o processo, construir a solução, integrar com o que a empresa já " +
      "usa e medir o resultado. Uso IA como ferramenta de engenharia, com Claude " +
      "Code, Codex e Cursor no dia a dia, para colocar sistemas completos no ar " +
      "em semanas, não em meses.",
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
          "era maior que o tempo de resolver o problema em si. O material existia, " +
          "espalhado por pastas, e-mails e conversas de WhatsApp. O portal reúne " +
          "tudo num lugar só: catálogo com página própria por máquina, manuais, " +
          "peças, firmwares, perfis de cor, parâmetros e cursos com progressão por " +
          "módulos. O que antes era \"pergunta pro fulano\" virou link. Por cima " +
          "roda um chatbot que responde dúvidas técnicas usando a mesma base do " +
          "portal: pergunta em português, resposta com a fonte.",
        tags: ["Portal", "Chatbot", "Base de conhecimento"],
      },
      {
        slug: "jet-ia-whatsapp",
        title: "Jet IA, chatbot de suporte no WhatsApp",
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
          "instalador, a documentação e o vídeo correspondentes, no lugar do " +
          "envio manual de arquivos a cada venda.",
        tags: ["Portal", "Pós-venda", "Licenciamento"],
      },
      {
        slug: "erp-modulo-tecnico",
        title: "ERP Módulo Técnico",
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
      {
        slug: "bannerjet-academy",
        title: "Bannerjet Academy",
        body:
          "A plataforma de cursos da Bannerjet: módulos em vídeo por linha de " +
          "equipamento, prova no fim de cada módulo e certificado no fim do curso. " +
          "As perguntas das provas saíram da base de conhecimento da Jet IA e " +
          "passaram por revisão humana antes de ir ao ar. O mesmo conhecimento que " +
          "responde cliente no WhatsApp agora treina gente.",
        tags: ["Cursos", "Provas", "Certificado", "Supabase"],
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
          "transfere conversa parada e informa o cliente quando o técnico está fora, " +
          "no horário de almoço ou no fim do expediente. Ninguém fica esperando " +
          "sem saber.",
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
          "no formato que o time já usava. O registro deixou de depender de alguém " +
          "lembrar de escrever.",
        tags: ["Laudo", "n8n"],
      },
      {
        slug: "ia-recepcao-audio",
        title: "IA de recepção por áudio",
        body:
          "Recebe o cliente falando, registra as informações pessoais e encaminha " +
          "para a automação certa: treinamento, instalação ou suporte.",
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
        slug: "padronizacao-fotos-catalogo",
        title: "Padronização das fotos do catálogo com IA",
        destaque: true,
        body:
          "As fotos das peças vinham de origens diferentes, cada uma com fundo, " +
          "enquadramento e resolução própria, e o catálogo parecia um mosaico. " +
          "Montei o sistema que trata cada imagem com inteligência artificial e " +
          "devolve todas no mesmo padrão profissional: fundo branco de estúdio ou " +
          "recorte transparente, resolução ampliada e enquadramento igual. Rodou " +
          "em lote nas 1.524 fotos do catálogo do ERP e hoje toda foto nova entra " +
          "pelo mesmo caminho.",
        tags: ["IA", "Gemini API", "Lote", "ERP"],
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
      {
        slug: "assistencia-tecnica",
        title: "Etapas da assistência técnica no WhatsApp",
        body:
          "Cada vez que o equipamento muda de etapa no laboratório, o cliente " +
          "recebe o aviso no WhatsApp e acompanha a ordem de serviço pelo app da " +
          "Bannerjet, da chegada à entrega. Ninguém precisa ligar para perguntar " +
          "como está a máquina.",
        tags: ["WhatsApp", "Callbell", "ERP"],
      },
      {
        slug: "bots-callbell",
        title: "Fluxos de atendimento na Callbell",
        body:
          "O fluxograma virou atendimento de verdade: 15 fluxos na Callbell, um " +
          "por linha de equipamento, com triagem, cadastro, instalação passo a " +
          "passo e transferência para o técnico certo. São mais de 3 mil blocos " +
          "rodando antes de qualquer pessoa precisar entrar na conversa.",
        tags: ["Callbell", "Bot", "Processo"],
      },
      {
        slug: "ia-aprende-tecnicos",
        title: "IA que aprende com os técnicos",
        body:
          "Lê os laudos dos atendimentos feitos pelos técnicos, transforma cada um " +
          "em um caso resolvido e, depois da minha revisão, coloca na base da Jet " +
          "IA. Já são 123 casos de 50 equipamentos que a IA não sabia responder e " +
          "agora responde.",
        tags: ["IA", "Supabase", "ERP"],
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
          "estava indo embora, e a base de tudo que veio depois.",
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
          "marca, sem depender de quem diagramou.",
        tags: ["Documentação", "IA"],
      },
    ],
  },
];

export const feitos = {
  label: "Cargo atual",
  title: "Feitos na Bannerjet",
  intro:
    "Tudo que foi construído dentro da empresa e está em uso no dia a dia. " +
    "Aperte em cada item para saber mais sobre cada projeto.",
  /* Rótulo do botão que abre a galeria de comprovação. */
  mediaLabel: "Ver material",
  mediaEmpty: "Material em digitalização",
  groups: feitosGrupos,
};

/* ---------- Métricas ----------
   Cada item responde "o que a empresa ganhou", não "o que eu construí".

   Dois campos, e não um: `value` é a prova, `outcome` diz o que aquele
   número significa para a operação.

   ⚠️ `value` É OPCIONAL DE PROPÓSITO. Os dois últimos cartões falam de
   coisas reais que ainda não têm medição levantada (quanto material foi
   produzido, quanto caiu o tempo de atendimento). Em vez de inventar
   cifra ou esconder o resultado, o cartão sai sem número: o texto ocupa
   o lugar dele. Quando o número existir, é só preencher o `value` do
   item que ele volta a ser um cartão numérico, sem tocar em componente.

   O 628 vem de um COUNT na tabela `documents` do Supabase da Jet IA
   (18/08/2026). Para reconferir:
     select count(*) from documents;
     select count(distinct metadata->>'equipamento') from documents; */
export type MetricaItem = {
  /* Opcional: sem ele o cartão sai sem número, e o rótulo assume o lugar.
     Hoje os quatro têm número, mas o suporte fica: é o que mantém no ar um
     resultado real que ainda não foi medido, sem inventar cifra. */
  value?: string;
  label: string;
  outcome: string;
  source: string;
};

export const metricas: {
  label: string;
  title: string;
  intro: string;
  items: MetricaItem[];
} = {
  label: "Resultados",
  title: "O retorno que a Bannerjet teve com o meu trabalho",
  intro:
    "Não é portfólio de protótipo: cada número abaixo saiu do banco de dados " +
    "de sistemas que estão em produção e que a equipe usa todo dia.",
  /* ATUALIZADO EM 26/11/2026 com o banco da Central Técnica + ERP Módulo
     Técnico (Supabase phovbcapjwxgolomxjih) e o da Jet IA
     (xfajhckpdzwoarijyywk). Cada `source` diz a tabela. Para reconferir:
       select count(*), count(distinct usuario) from atividade_usuarios;
       select origem, count(*) from jetia_interacoes group by 1;
       select count(*) from documents;            -- banco da Jet IA
       select count(*) from garantias_bjcontrol;
       select count(*) from erp_produtos;
       select count(*) from laudos_gerados;
     Os antigos 50% / 65% / 200+ eram estimativa dele; saíram para dar
     lugar ao que dá para provar com uma consulta. */
  items: [
    {
      value: "19.188",
      label: "acessos ao ERP e à Central Técnica em 6 semanas, por 36 pessoas",
      outcome:
        "Os sistemas que eu construí viraram a ferramenta de trabalho da equipe: abrem todo dia, várias vezes por dia, por técnicos, comercial e gestão.",
      source: "ERP Módulo Técnico · log de atividade",
    },
    {
      value: "4.889",
      label: "perguntas respondidas pela Jet IA, para 1.181 pessoas diferentes",
      outcome:
        "Clientes no WhatsApp e colaboradores dentro do ERP recebem resposta técnica na hora, sem esperar um técnico ficar livre.",
      source: "Jet IA · WhatsApp + ERP",
    },
    {
      value: "3.169",
      label: "garantias migradas do sistema antigo para o ERP",
      outcome:
        "O histórico de garantia de cada equipamento saiu de um sistema legado e passou a estar a um clique de quem atende o cliente.",
      source: "ERP Módulo Técnico · garantias",
    },
    {
      value: "2.409",
      label: "blocos de conhecimento técnico que a IA consulta antes de responder",
      outcome:
        "A resposta é da própria empresa, validada e com fonte, e não o que o modelo acharia por conta própria. Cresce a cada laudo e a cada manual novo.",
      source: "Supabase · base da Jet IA",
    },
    {
      value: "1.545",
      label: "produtos no catálogo do ERP, com fotos padronizadas por IA",
      outcome:
        "Catálogo inteiro com o mesmo padrão de foto profissional, tratado em lote, sem estúdio e sem semanas de edição manual.",
      source: "ERP Módulo Técnico · catálogo",
    },
    {
      value: "147",
      label: "laudos técnicos gerados automaticamente a partir do atendimento",
      outcome:
        "O registro de cada atendimento deixou de depender de alguém lembrar de escrever, e cada laudo ainda ensina a IA um caso novo.",
      source: "ERP Módulo Técnico · laudos",
    },
  ],
};

/* ---------- Recomendações ----------

   ⚠️ OS CINCO TEXTOS DE HOJE SÃO RASCUNHO, ESCRITOS POR MIM.

   O bloco era vazio de propósito: depoimento é palavra de outra pessoa,
   com o nome dela em cima, e citação inventada atribuída a alguém real é
   endosso fabricado — pior ainda quando a pessoa não é da empresa (o
   Rene é da UNIP, o Davis é da APDADOS). Num portfólio, é o tipo de
   coisa que destrói exatamente a credibilidade que a seção deveria
   construir.

   O Erick pediu "comentários ilustrativos" em 19/08/2026, e a saída foi
   entregar os textos COM A FLAG `rascunho: true`. Com ela:
     - o cartão mostra um selo "texto provisório" bem visível, então
       ninguém que visita o site lê aquilo como palavra da pessoa;
     - fica pronto para ele mandar para cada um aprovar ou reescrever.

   COMO LIBERAR UM: com a pessoa tendo lido e aprovado (ou reescrito),
   troque o `quote` pelo texto dela e APAGUE a linha `rascunho`. Só isso
   tira o selo. **Não apague o selo antes do OK dela.**

   O caminho mais curto para o texto real: o LinkedIn tem "Solicitar
   recomendação", e o que a pessoa escreve já vem pronto para colar aqui.

   Com a lista vazia a seção não aparece no site — nada quebra.
*/
export type Recomendacao = {
  quote: string;
  name: string;
  role: string;
  /* Opcional: nem todo mundo se apresenta com empresa. Só é usado no
     fallback, quando não há headline. */
  org?: string;
  /* A LINHA DO CARGO COMO A PESSOA SE APRESENTA, em uma frase corrida.

     Substitui o `role · org` no cartão. Existe porque o Marden se
     denomina "Founder of Bannerjet International", e o Erick pediu os
     cinco cartões nessa mesma vibe: título escrito por extenso, no
     idioma e na forma que a própria pessoa usa, em vez de dois campos
     colados por um ponto.

     `role` e `org` continuam no tipo: são o dado estruturado, e é deles
     que o cartão cai quando não há headline. */
  headline?: string;
  href?: string;
  /* Nome do arquivo (sem extensão) em public/recomendacoes/. */
  avatar?: string;
  /* Texto ainda não aprovado pela pessoa. Ver a nota acima. */
  rascunho?: boolean;
};

/* A ORDEM É A ORDEM DE EXIBIÇÃO, e foi definida por ele:
   Marden, Davis, Leandro, Rene, Victor, Guilherme, Artur.

   Não é alfabética nem cronológica: abre pelo dono da empresa e pelo nome
   de maior peso institucional, e o Artur fecha. Mexer aqui muda a esteira
   na hora.

   ⚠️ Se um dia houver tradução destes textos em `content-en.ts`, a mescla
   é POR ÍNDICE: reordenar aqui exige reordenar lá. */
const recomendacaoItens: Recomendacao[] = [
  {
    quote:
      "O Erick chegou como técnico e saiu construindo ferramenta. Ele mapeou o " +
      "nosso suporte inteiro, mostrou onde o tempo estava indo embora e depois " +
      "resolveu: hoje metade do atendimento remoto passa por IA antes de chegar " +
      "num técnico. Não foi ninguém que pediu, foi ele que viu.",
    name: "Marden Roberto",
    /* Como ele se apresenta. */
    role: "Founder",
    org: "Bannerjet International",
    headline: "Founder of Bannerjet International",
    avatar: "marden-roberto",
    rascunho: true,
  },
  {
    quote:
      "O Erick coordena o Comitê StarTech na APDADOS com uma organização que a " +
      "maioria dos profissionais sêniores não tem: reunião com pauta, material " +
      "revisado, pesquisa de segurança da informação entregue. Num comitê " +
      "voluntário, isso é o que separa boa intenção de resultado.",
    name: "Davis Alves",
    role: "Presidente",
    org: "APDADOS",
    /* O título dele é imenso (ITIL Expert, PMP, CEH, CHFI, DPO…). Numa
       linha cabe o cargo mais a credencial que pesa: o Conselho Nacional
       de Proteção de Dados. */
    headline: "Presidente da APDADOS e ex-membro do CNPD",
    avatar: "davis-alves",
    rascunho: true,
  },
  {
    quote:
      "Como diretor técnico, o que eu vejo é o antes e o depois. Antes, cada " +
      "chamado repetia a mesma explicação e o conhecimento morava na cabeça de " +
      "quem já estava na casa. Hoje está num portal, num chatbot e em mais de " +
      "duzentos materiais. O Erick transformou conhecimento solto em produto.",
    name: "Leandro Rocha",
    role: "Diretor Técnico",
    org: "Bannerjet Group",
    headline: "Diretor Técnico da Bannerjet Group",
    avatar: "leandro-rocha",
    rascunho: true,
  },
  {
    quote:
      "Acompanhei o Erick na graduação em Análise e Desenvolvimento de Sistemas. " +
      "É o aluno que não espera a ementa para aprender: chegava com projeto " +
      "rodando, feito por conta própria, e com pergunta que ia além da aula. " +
      "Vai longe, e não por causa do diploma.",
    name: "Rene Ignacio",
    role: "Coordenador de ADS",
    org: "Universidade Paulista",
    headline: "Coordenador dos cursos de ADS na Universidade Paulista",
    avatar: "rene-ignacio",
    rascunho: true,
  },
  {
    quote:
      "Construí o ERP Módulo Técnico e o Erick assumiu o Painel de Atendimentos " +
      "e levou a Jet IA para dentro dele. É o tipo de parceiro que entende o " +
      "problema antes de escrever a primeira linha, entrega no prazo e ainda " +
      "documenta para quem vem depois. Trabalhar junto foi fácil.",
    name: "Victor Rocha",
    role: "Supervisor Técnico",
    org: "Bannerjet Group",
    headline: "Supervisor Técnico da Bannerjet Group",
    avatar: "victor-rocha",
    rascunho: true,
  },
  {
    quote:
      "Conversar com o Erick sobre código é fácil: ele chega com o problema " +
      "mapeado e uma opinião sobre a solução, não com uma pergunta genérica. " +
      "Constrói com IA como quem usa ferramenta, sabendo o que aceitar e o que " +
      "descartar, e deixa tudo documentado para quem vem depois. É raro.",
    name: "Guilherme Gonçalves Lisboa",
    role: "Desenvolvedor Backend",
    /* Como ele se apresenta. A grafia do NestJS e do TypeScript foi
       normalizada; o resto é o texto dele. */
    headline: "Desenvolvedor Backend (Node.js, NestJS, TypeScript)",
    avatar: "guilherme-lisboa",
    rascunho: true,
  },
  {
    quote:
      "Trabalho no setor técnico e uso todo dia o que o Erick construiu. Antes eu " +
      "abria três pastas e chamava alguém no WhatsApp para achar um parâmetro de " +
      "corte; hoje pergunto para a Jet IA ou abro a Central Técnica e resolvo " +
      "sozinho. A diferença no dia a dia é enorme.",
    name: "Artur Orcy",
    role: "Analista do Setor Técnico",
    org: "Bannerjet Group",
    headline: "Analista do Setor Técnico da Bannerjet",
    avatar: "artur-orcy",
    rascunho: true,
  },
];

export const recomendacoes = {
  label: "Recomendações",
  title: "O que dizem de mim",
  intro:
    "Pessoas com quem trabalhei: gestores, professores e colegas de comitê.",
  /* Aparece no cartão enquanto o texto não foi aprovado pela pessoa. */
  rascunhoLabel: "Texto provisório · aguardando aprovação",
  items: recomendacaoItens,
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
  /* Vídeo de demonstração (opcional), em public/projetos/<slug>/. Aparece
     logo abaixo da capa, com a capa como pôster. */
  video?: string;
};

/* ⚠️ As imagens em public/projetos/ são capturas reais, feitas em
   1440×900 @2x. Para regravá-las depois de mexer em algum projeto,
   veja o roteiro no README (seção "Capas dos projetos"). */

export const projects: Project[] = [
  {
    slug: "copos-laser",
    index: "01",
    title: "Gravura · Copos Laser",
    category: "Visualizador 3D de gravação a laser",
    year: "2026",
    description:
      "Copo térmico em 3D com a gravação a fibra laser simulada no navegador: a arte vira máscara de inox escovado sobre pintura fosca, dá a volta de 360° e sai como PNG pronto para o laser.",
    href: "https://copos-laser.vercel.app",
    repo: "https://github.com/ErickkADR/copos-laser",
    tags: ["Three.js", "model-viewer", "Fibra laser"],
    tint: "#9ca3af",
    cover: {
      src: "/projetos/copos-laser/cover.webp",
      alt: "Copo térmico preto em 3D com uma arte gravada a laser, ao lado da grade de artes",
    },
    video: "/projetos/copos-laser/demo.mp4",
    overview: [
      "Quem compra um copo gravado a laser quer ver o resultado antes de a máquina ligar. A gravação a fibra tira a tinta e deixa o inox aparecer, e isso é difícil de imaginar olhando só para a arte em preto e branco.",
      "O site resolve isso em 3D: a arte vira uma máscara que decide, ponto a ponto, onde fica a pintura fosca e onde aparece o aço escovado, com brilho e rugosidade diferentes. A gravação dá a volta inteira no copo, e dá para girar com o dedo ou o mouse.",
      "O visitante também pode mandar a própria arte, escrever um texto e baixar o arquivo do laser em PNG a 400 dpi, já na medida real do copo.",
    ],
    highlights: [
      { title: "Inox e tinta de verdade", body: "Três mapas gerados num canvas (cor, metal e rugosidade, relevo) fazem o laser parecer laser, sem foto pronta." },
      { title: "Volta de 360°", body: "A arte é medida em milímetros na volta real do copo e gira junto com o modelo." },
      { title: "Arquivo pronto para a máquina", body: "O download sai em preto e branco, a 400 dpi e no tamanho físico da área gravada." },
    ],
    facts: [
      { label: "Papel", value: "Produto, 3D e implementação" },
      { label: "Contexto", value: "Projeto pessoal" },
      { label: "Stack", value: "Vite · JavaScript · model-viewer · GSAP" },
      { label: "Estado", value: "No ar" },
    ],
    gallery: [
      { src: "/projetos/copos-laser/shot-1.webp", alt: "Troca de arte: a nova gravação aparece no copo 3D" },
      { src: "/projetos/copos-laser/shot-2.webp", alt: "O segundo modelo, o copo quencher, com a mesma arte" },
      { src: "/projetos/copos-laser/shot-3.webp", alt: "Estúdio com a arte enviada pelo visitante e o texto gravado" },
      { src: "/projetos/copos-laser/shot-4.webp", alt: "Copo girando com a arte nova, antes do download para o laser" },
    ],
  },
  {
    slug: "latinhas-3d",
    index: "02",
    title: "Latinha 3D",
    category: "Visualizador 3D de rótulos de lata",
    year: "2026",
    description:
      "Lata de alumínio em 3D com rótulos panorâmicos que dão a volta inteira, gotas de condensação e um estúdio para aplicar o próprio rótulo e baixar o arquivo de impressão.",
    href: "https://latinhas-3d.vercel.app",
    repo: "https://github.com/ErickkADR/latinhas-3d",
    tags: ["Three.js", "Canvas", "Rótulos"],
    tint: "#f97316",
    cover: {
      src: "/projetos/latinhas-3d/cover.webp",
      alt: "Lata 3D com um rótulo ilustrado e a grade de temas ao lado",
    },
    video: "/projetos/latinhas-3d/demo.mp4",
    overview: [
      "Um rótulo de lata é uma imagem panorâmica: ele só faz sentido quando dá a volta. Ver o arquivo plano não mostra onde a arte quebra, onde o texto some na curva nem como a lata fica na prateleira.",
      "A Latinha 3D monta a lata na hora, com o rótulo gerado num canvas, metal nas bordas e gotas de condensação por cima. Cada tema é um rótulo de volta inteira, e a lata gira para mostrar o lado de trás.",
      "No estúdio, quem visita aplica o próprio rótulo, ajusta na lata e baixa o PNG da volta inteira para imprimir.",
    ],
    highlights: [
      { title: "Rótulo de volta inteira", body: "Cada tema é um panorama 2:1 aplicado em 360°, como o rótulo de verdade." },
      { title: "Acabamento de lata gelada", body: "Alumínio nas bordas e gotas de condensação deixam a lata com cara de produto." },
      { title: "Do 3D para a gráfica", body: "O estúdio devolve o rótulo em PNG na medida da lata, pronto para imprimir." },
    ],
    facts: [
      { label: "Papel", value: "Produto, 3D e implementação" },
      { label: "Contexto", value: "Projeto pessoal" },
      { label: "Stack", value: "Vite · JavaScript · model-viewer" },
      { label: "Estado", value: "No ar" },
    ],
    gallery: [
      { src: "/projetos/latinhas-3d/shot-1.webp", alt: "Troca de tema: o rótulo novo aparece na lata 3D" },
      { src: "/projetos/latinhas-3d/shot-2.webp", alt: "Outro tema, com a lata girada" },
      { src: "/projetos/latinhas-3d/shot-3.webp", alt: "Estúdio com o rótulo enviado pelo visitante" },
      { src: "/projetos/latinhas-3d/shot-4.webp", alt: "A lata com o rótulo novo, antes do download para impressão" },
    ],
  },
  {
    slug: "atomai",
    index: "03",
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
      "O AtomAI é uma plataforma de atendimento em que cada bot é especialista em um nicho, em vez de um assistente genérico tentando responder tudo. Quem chega escolhe o tipo de problema, seja hardware, software ou periférico, e cai no agente treinado para ele.",
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
    index: "04",
    title: "Nexus Print",
    category: "Marketplace de produtos personalizados",
    year: "2026",
    description:
      "Loja virtual com mais de 130 produtos em 6 categorias, quatro modelos de precificação por produto, carrinho completo e fechamento de pedido direto no WhatsApp.",
    href: "https://nexusprint.vercel.app",
    tags: ["JavaScript", "Carrinho", "Modo escuro"],
    tint: "#d16bff",
    cover: {
      src: "/projetos/nexus-print/cover.webp",
      alt: "Topo da loja Nexus Print, com o mascote e a chamada \"Sua loja de Comunicação Visual\"",
    },
    overview: [
      "A Nexus Print é uma loja de comunicação visual personalizada: adesivos, action figures, Funko Pop, topos de bolo e caixas milk. São mais de 130 produtos catalogados em seis categorias.",
      "O nó do projeto foi a precificação. Produto personalizado não tem preço único: depende de tamanho, quantidade e acabamento. Cada item carrega quatro modelos de preço, e o carrinho calcula em cima da combinação escolhida.",
      "O pedido não termina num gateway: fecha no WhatsApp, com o resumo montado. É como a venda realmente acontece nesse mercado, e tentar empurrar checkout tradicional só adicionaria um passo que ninguém completa.",
    ],
    highlights: [
      {
        title: "Quatro modelos de preço por produto",
        body: "A mesma peça muda de valor conforme tamanho, quantidade e acabamento, e o carrinho resolve a conta.",
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
    slug: "hortifacil",
    index: "05",
    title: "HortiFácil",
    category: "E-commerce de hortifruti",
    year: "2026",
    description:
      "Loja de hortifruti com catálogo animado em parallax, carrinho, pedidos e um painel de administração para cadastrar e editar produtos.",
    href: "https://hortifacil.vercel.app",
    repo: "https://github.com/ErickkADR/hortifacil",
    tags: ["Next.js", "Supabase", "GSAP"],
    tint: "#4d9a4a",
    cover: {
      src: "/projetos/hortifacil/cover.webp",
      alt: "Home do HortiFácil com folhas em camadas e o catálogo de frutas e verduras",
    },
    overview: [
      "Vender produto fresco online pede uma vitrine que passe frescor e um fluxo de compra curto. Um catálogo genérico em lista não conta nada do que o cliente vai receber.",
      "O HortiFácil abre com uma home de folhas em camadas que se movem com a rolagem e o mouse, e leva o visitante direto ao catálogo, ao carrinho e ao pedido. Os dados vêm do Supabase, e sem o banco configurado o sistema roda em modo demonstração.",
      "Do lado do dono da loja, um painel de administração permite criar, editar e remover produtos sem mexer em código.",
    ],
    highlights: [
      { title: "Vitrine com profundidade", body: "Três camadas de folhas reagem à rolagem e ao mouse e dão personalidade à primeira tela." },
      { title: "Painel de administração", body: "Cadastro, edição e exclusão de produtos por uma área protegida por login." },
      { title: "Roda mesmo sem banco", body: "Sem o Supabase configurado, o catálogo usa dados de exemplo e o fluxo de compra é simulado." },
    ],
    facts: [
      { label: "Papel", value: "Produto, design e implementação" },
      { label: "Contexto", value: "Projeto pessoal, loja fictícia" },
      { label: "Stack", value: "Next.js · TypeScript · Tailwind · GSAP · Supabase" },
      { label: "Estado", value: "No ar" },
    ],
    gallery: [
      { src: "/projetos/hortifacil/shot-1.webp", alt: "Home com as folhas em parallax" },
      { src: "/projetos/hortifacil/shot-2.webp", alt: "Catálogo de produtos com filtro por categoria" },
      { src: "/projetos/hortifacil/shot-3.webp", alt: "Carrinho com itens adicionados" },
      { src: "/projetos/hortifacil/shot-4.webp", alt: "Tela de entrada que dá acesso ao painel de administração" },
    ],
  },
  {
    slug: "granafy",
    index: "06",
    title: "Granafy",
    category: "Finanças pessoais para a família",
    year: "2026",
    description:
      "Controle financeiro para a família, com contas, parcelamentos, orçamentos por categoria, metas e relatórios anuais, cada pessoa vendo só os próprios dados.",
    href: "https://granafy.vercel.app",
    tags: ["Next.js", "Supabase", "Recharts"],
    tint: "#10b981",
    cover: {
      src: "/projetos/granafy/cover.webp",
      alt: "Dashboard do Granafy com saldo, gráfico dos últimos meses e gastos por categoria",
    },
    overview: [
      "Planilha de gastos funciona até a segunda semana. Para a família usar de verdade, o controle precisa ser rápido de lançar e deixar claro para onde o dinheiro vai.",
      "O Granafy reúne dashboard, transações com parcelamento e transferência entre contas, contas fixas, orçamentos com alerta, metas com aporte mensal calculado e relatórios do ano. Cada pessoa tem a própria conta, e o banco isola os dados de cada uma.",
      "O cadastro é limitado aos e-mails liberados, então o app fica restrito à família.",
    ],
    highlights: [
      { title: "Dados isolados por pessoa", body: "Autenticação e regras no banco garantem que cada usuário veja só o que é dele." },
      { title: "Do lançamento ao relatório", body: "Parcelamento, contas fixas e transferências alimentam o dashboard e o relatório anual." },
      { title: "Alertas de orçamento", body: "O limite mensal por categoria mostra se está no controle, em atenção ou estourado." },
    ],
    facts: [
      { label: "Papel", value: "Produto e implementação" },
      { label: "Contexto", value: "Projeto pessoal, uso da família" },
      { label: "Stack", value: "Next.js · TypeScript · Tailwind · Supabase · Recharts" },
      { label: "Estado", value: "Em uso, acesso restrito" },
    ],
    gallery: [
      { src: "/projetos/granafy/shot-1.webp", alt: "Dashboard com saldo e gráfico dos últimos seis meses" },
      { src: "/projetos/granafy/shot-2.webp", alt: "Lista de transações com filtros e um lançamento parcelado" },
      { src: "/projetos/granafy/shot-3.webp", alt: "Orçamentos por categoria com os alertas" },
      { src: "/projetos/granafy/shot-4.webp", alt: "Relatório anual com receitas e despesas por mês" },
    ],
  },
  {
    slug: "otaku-mind",
    index: "07",
    title: "Otaku Mind",
    category: "Agentes de IA para produção de vídeos curtos",
    year: "2026",
    description:
      "Time de cinco agentes do Claude Code que leva um tema de anime até o Short pronto: tendência, roteiro, revisão, título e edição em Remotion.",
    href: "https://www.youtube.com/@OtakuMindBR",
    tags: ["Claude Code", "Remotion", "Agentes de IA"],
    tint: "#8b5cf6",
    cover: {
      src: "/projetos/otaku-mind/cover.webp",
      alt: "Canal Otaku Mind com os Shorts de anime produzidos pelo time de agentes",
    },
    overview: [
      "Manter um canal de Shorts exige o mesmo ciclo toda semana: achar o tema, escrever, revisar, nomear e editar. Feito à mão, o gargalo vira a edição.",
      "O projeto divide o ciclo entre cinco agentes. O trend-scout acha o tema em alta, o script-writer escreve e o script-reviewer revisa, o viral-titles gera título, descrição e tags, e o video-editor monta o vídeo no Remotion. Dois comandos, /generate-short e /edit-short, amarram as etapas.",
      "A voz continua sendo minha: eu gravo o áudio, e o editor cuida do resto, com um registro dos erros que não podem se repetir.",
    ],
    highlights: [
      { title: "Um agente por etapa", body: "Pesquisa, roteiro, revisão, título e edição ficam separados, cada um com suas regras." },
      { title: "Edição em código", body: "O vídeo é montado em Remotion a partir do áudio gravado, com render e conferência." },
      { title: "Memória do que deu errado", body: "Receitas aprovadas e uma lista de erros para nunca repetir guiam cada lote novo." },
    ],
    facts: [
      { label: "Papel", value: "Desenho do fluxo, agentes e edição" },
      { label: "Contexto", value: "Projeto pessoal, canal no YouTube" },
      { label: "Stack", value: "Claude Code · Remotion · React · Node" },
      { label: "Estado", value: "Em produção, evoluindo" },
    ],
    gallery: [
      { src: "/projetos/otaku-mind/shot-1.webp", alt: "Página de Shorts do canal Otaku Mind, com os vídeos produzidos pelos agentes" },
    ],
  },
  {
    slug: "hardware-showcase",
    index: "08",
    title: "Hardware Showcase",
    category: "Inventário de hardware interativo",
    year: "2026",
    description:
      "Página que apresenta o meu PC com dados lidos da própria máquina, um diagnóstico de upgrade e um teste que diz se um jogo roda nesse hardware.",
    href: "https://hardware-showcase-delta.vercel.app",
    repo: "https://github.com/ErickkADR/hardware-showcase",
    tags: ["React", "TypeScript", "Vite"],
    tint: "#ef4444",
    cover: {
      src: "/projetos/hardware-showcase/cover.webp",
      alt: "Página do inventário de hardware com os componentes do PC e suas especificações",
    },
    overview: [
      "Lista de especificações copiada de memória costuma errar: o WMI reporta só \"RTX 3050\" e o monitor aparece só com o nome do painel. Quem pergunta se o PC aguenta um jogo merece dado medido, não palpite.",
      "A página usa dados lidos da máquina por WMI e nvidia-smi e cruza fontes para achar o que um comando sozinho não dá, como o fabricante real da placa de vídeo e o tamanho físico do monitor. Cada componente tem foto, especificações e um diagnóstico do que limita a máquina.",
      "Na seção \"Este PC roda?\", o visitante digita o nome de um jogo e o site compara os requisitos oficiais da Steam com o hardware medido.",
    ],
    highlights: [
      { title: "Dado medido, não digitado", body: "Um script coleta o inventário da máquina e os valores só entram na página depois de conferidos." },
      { title: "Diagnóstico de upgrade", body: "Cada componente aponta o que limita o conjunto e onde vale investir." },
      { title: "Este PC roda?", body: "Um parser lê os requisitos da Steam e compara processador, vídeo, memória e disco com o hardware real." },
    ],
    facts: [
      { label: "Papel", value: "Coleta de dados, produto e implementação" },
      { label: "Contexto", value: "Projeto pessoal" },
      { label: "Stack", value: "React · TypeScript · Vite · PowerShell" },
      { label: "Estado", value: "No ar" },
    ],
    gallery: [
      { src: "/projetos/hardware-showcase/shot-1.webp", alt: "Topo da página com o primeiro componente" },
      { src: "/projetos/hardware-showcase/shot-2.webp", alt: "Card da placa de vídeo com foto e especificações" },
      { src: "/projetos/hardware-showcase/shot-3.webp", alt: "Diagnóstico de upgrade com o que limita a máquina" },
      { src: "/projetos/hardware-showcase/shot-4.webp", alt: "Teste Este PC roda? com o resultado de um jogo" },
    ],
  },
  {
    slug: "meus-jogos-100",
    index: "09",
    title: "Meus Jogos 100%",
    category: "Vitrine de jogos platinados",
    year: "2026",
    description:
      "Vitrine da biblioteca de jogos e outras mídias concluídas, com o visual da Steam, cards dourados para os 100% e filtros por progresso.",
    href: "https://meus-jogos-100.vercel.app",
    repo: "https://github.com/ErickkADR/meus-jogos-100",
    tags: ["React", "TypeScript", "CSS"],
    tint: "#1a9fff",
    cover: {
      src: "/projetos/meus-jogos-100/cover.webp",
      alt: "Grade de jogos com cards dourados para os platinados, no estilo da Steam",
    },
    overview: [
      "Terminar um jogo com todas as conquistas dá trabalho e quase ninguém vê. Uma lista em planilha não passa a sensação de conquista que o jogo deu.",
      "A vitrine usa o design system da Steam: paleta, tipografia e a barra azul de conquistas. Os platinados ganham borda e brilho dourado, com o emblema de jogo perfeito refeito em SVG. Tudo é CSS puro, sem biblioteca de animação.",
      "Dá para filtrar por platinados, em progresso ou todos, buscar pelo nome e navegar pelas outras mídias, como animes, séries, filmes e livros.",
    ],
    highlights: [
      { title: "Cara de Steam", body: "Paleta, tipografia e barra de conquistas fiéis ao design system da plataforma." },
      { title: "Dourado que significa algo", body: "O brilho dourado marca 100% das conquistas em jogos e item concluído nas outras mídias." },
      { title: "Leve e acessível", body: "Animações em CSS, sem dependência além do React, e respeito a prefers-reduced-motion." },
    ],
    facts: [
      { label: "Papel", value: "Design e implementação" },
      { label: "Contexto", value: "Projeto pessoal" },
      { label: "Stack", value: "React · TypeScript · Vite" },
      { label: "Estado", value: "No ar" },
    ],
    gallery: [
      { src: "/projetos/meus-jogos-100/shot-1.webp", alt: "Aba de jogos filtrada por platinados" },
      { src: "/projetos/meus-jogos-100/shot-2.webp", alt: "Jogos em progresso com barras de conquistas" },
      { src: "/projetos/meus-jogos-100/shot-3.webp", alt: "Busca por título na grade" },
      { src: "/projetos/meus-jogos-100/shot-4.webp", alt: "Outra aba de mídia, com animes concluídos" },
    ],
  },
  {
    slug: "lummier-studio",
    index: "10",
    title: "Lummier Studio",
    category: "Site para studio de beleza",
    year: "2026",
    description:
      "Site de um studio de beleza com página própria para cada profissional, resultados em destaque e agendamento direto pelo WhatsApp.",
    href: "https://erickkadr.github.io/flavia-longnails/",
    repo: "https://github.com/ErickkADR/flavia-longnails",
    tags: ["React", "TypeScript", "Landing page"],
    tint: "#d98aa7",
    cover: {
      src: "/projetos/lummier-studio/cover.webp",
      alt: "Home do Lummier Studio com o destaque dos resultados e o botão de agendar",
    },
    overview: [
      "Para um negócio local de beleza, o site precisa vender o serviço pela imagem e tirar o atrito do agendamento. Formulário longo faz o cliente desistir.",
      "O site mostra os resultados do studio, a equipe com uma página para cada profissional (bio, serviços e preços), avaliações em esteira e o ranking dos serviços mais contratados. O botão de WhatsApp fica fixo na tela, e o cliente marca o horário em um toque.",
      "Nasceu como portfólio de uma nail designer e evoluiu para representar o studio inteiro.",
    ],
    highlights: [
      { title: "Agendamento sem formulário", body: "O botão fixo de WhatsApp leva direto à conversa, de qualquer ponto da página." },
      { title: "Uma página por profissional", body: "Cada especialista tem bio, serviços, preços e galeria próprios." },
      { title: "Prova social em movimento", body: "Avaliações e galerias rolam sozinhas, com pausa quando o visitante passa o mouse." },
    ],
    facts: [
      { label: "Papel", value: "Design, conteúdo e implementação" },
      { label: "Contexto", value: "Site para cliente, negócio local" },
      { label: "Stack", value: "React · TypeScript · Vite · CSS" },
      { label: "Estado", value: "No ar" },
    ],
    gallery: [
      { src: "/projetos/lummier-studio/shot-1.webp", alt: "Topo da home com as estatísticas do studio" },
      { src: "/projetos/lummier-studio/shot-2.webp", alt: "Seção da equipe com um card por profissional" },
      { src: "/projetos/lummier-studio/shot-3.webp", alt: "Avaliações em esteira e ranking de serviços" },
      { src: "/projetos/lummier-studio/shot-4.webp", alt: "Página de uma profissional com bio, serviços e preços" },
    ],
  },
  {
    slug: "achei-montador",
    index: "11",
    title: "Achei Montador",
    category: "Site institucional de serviço de montagem",
    year: "2026",
    description:
      "Site institucional de uma rede de montadores com duas páginas, uma para quem comprou o móvel e outra para lojas, as duas convertendo no WhatsApp.",
    href: "https://erickkadr.github.io/achei-montador/",
    repo: "https://github.com/ErickkADR/achei-montador",
    tags: ["Next.js", "Tailwind", "Motion"],
    tint: "#f59e0b",
    cover: {
      src: "/projetos/achei-montador/cover.webp",
      alt: "Home do Achei Montador com o banner animado e o botão de WhatsApp",
    },
    overview: [
      "A empresa fala com dois públicos que querem coisas diferentes: o cliente que acabou de comprar um móvel e a loja que quer a rede montando para ela. Uma página só confunde os dois.",
      "O site separa as conversas. A home é para o consumidor, com banner animado, serviços e passo a passo. A página de parcerias é para o varejo, com o desafio, a solução, a tecnologia e o QR Code na embalagem. Um botão no cabeçalho leva de uma para a outra.",
      "As duas terminam no mesmo ponto: um contato direto pelo WhatsApp.",
    ],
    highlights: [
      { title: "Dois públicos, duas páginas", body: "Consumidor e varejo recebem mensagens diferentes, sem dividir a mesma tela." },
      { title: "Conversão no WhatsApp", body: "Todos os chamados levam ao mesmo canal de atendimento." },
      { title: "Estático e rápido", body: "Next.js exportado como site estático, com todo o texto num único arquivo de conteúdo." },
    ],
    facts: [
      { label: "Papel", value: "Design e implementação" },
      { label: "Contexto", value: "Site institucional, versão para aprovação" },
      { label: "Stack", value: "Next.js · React · TypeScript · Tailwind · Motion" },
      { label: "Estado", value: "No ar, em aprovação" },
    ],
    gallery: [
      { src: "/projetos/achei-montador/shot-1.webp", alt: "Topo da home com o banner animado" },
      { src: "/projetos/achei-montador/shot-2.webp", alt: "Seção de serviços da página do consumidor" },
      { src: "/projetos/achei-montador/shot-3.webp", alt: "Topo da página de parcerias para o varejo" },
      { src: "/projetos/achei-montador/shot-4.webp", alt: "Seção do QR Code na embalagem" },
    ],
  },
  {
    slug: "mugiwaras",
    index: "12",
    title: "Bando dos Mugiwaras",
    category: "Landing page responsiva",
    year: "2026",
    description:
      "Landing page de One Piece com os 10 integrantes do Bando do Chapéu de Palha, biografia e barras de atributos, feita só com HTML e CSS.",
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
      "Não há uma linha de JavaScript. Tudo que se move sai de CSS: as transições, os estados de hover e o ritmo da página conforme se desce.",
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
    index: "13",
    title: "Apenas Um Escritor",
    category: "Site com efeito parallax",
    year: "2025",
    description:
      "Estudo do efeito parallax e da ilusão de ótica que ele cria. Foi o projeto onde a vontade de trabalhar com movimento começou.",
    href: "https://erickkadr.github.io/Apenas-Um-Escritor/",
    repo: "https://github.com/ErickkADR/Apenas-Um-Escritor",
    tags: ["Parallax", "HTML", "CSS"],
    tint: "#7c3aed",
    cover: {
      src: "/projetos/apenas-um-escritor/cover.webp",
      alt: "Abertura de Apenas Um Escritor, com o título sobre fundo preto e o texto começando abaixo",
    },
    overview: [
      "Um texto e um efeito. O parallax deixa camadas correrem em velocidades diferentes e o olho lê isso como profundidade: a página tem duas dimensões, mas não parece ter.",
      "Foi o experimento onde ficou claro que interface podia ser mais que layout. Tudo que veio depois começou aqui: as revelações no scroll, o vídeo do hero e a cena 3D deste portfólio.",
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
   UMA parede só, sem categorias. As cinco (IA, front, back, design,
   ferramentas) obrigavam quem lia a percorrer cinco listas para montar
   sozinho a resposta de "com o que ele trabalha", e o mesmo nome
   pertencia a mais de um grupo dependendo de quem estivesse lendo. A
   ordem da lista ainda agrupa por afinidade, o que dá o ritmo sem
   precisar de cabeçalho.

   SÓ ENTRA QUEM TEM LOGO. Ladrilho com as iniciais no lugar da marca
   lia como espaço vazio numa parede em que todo o resto é logo colorida,
   e a cor é metade do reconhecimento. Saíram por isso: RAG, Callbell,
   Spline, VBA, MakerWorld, SignMaster, CameraCut, LightBurn e EzCad.
   Para trazer qualquer um de volta, basta largar
   `public/stack/<slug>.png` (o slug é o nome em minúsculas com hífen) e
   reinserir a linha aqui. */

export type StackItem = {
  name: string;
  /* Cor do ladrilho para marcas cuja logo não carrega a cor sozinha
     (Claude Code, Blender, Fusion). Sem isso, cai no roxo do site. */
  color?: string;
  /* LOGO ESCURA: pinta o PNG de branco no render.

     Corel, Fusion 360 e Miro têm marca preta ou quase preta e sumiam no
     ladrilho escuro — ele reportou como "quase invisíveis". Resolver aqui
     e não trocando o arquivo mantém o PNG original intacto, então basta
     apagar a flag se um dia a marca mudar de cor. */
  branco?: boolean;
};

/* A ordem é por afinidade, e não alfabética: IA e automação primeiro
   (é o que ele faz de diferente), depois o que ele constrói na tela, o
   que sustenta atrás, o que ele desenha e com o que ele trabalha. */
const stackItems: StackItem[] = [
  { name: "Claude Code", color: "#d97757" },
  { name: "Codex" },
  { name: "Antigravity" },
  { name: "Cursor" },
  { name: "n8n" },
  { name: "Gemini API" },
  { name: "ElevenLabs" },
  { name: "HTML" },
  { name: "CSS" },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Tailwind CSS" },
  { name: "GSAP" },
  { name: "Python" },
  { name: "Supabase" },
  { name: "PowerShell" },
  { name: "Figma" },
  { name: "Photoshop" },
  { name: "CorelDraw", branco: true },
  { name: "Blender", color: "#ea7600" },
  { name: "Fusion 360", branco: true },
  { name: "Git" },
  { name: "GitHub" },
  { name: "VS Code" },
  { name: "Notion" },
  { name: "Miro", branco: true },
  { name: "Windows" },
];

export const stack = {
  label: "Stack",
  title: "Ferramentas com que eu trabalho",
  intro:
    "Da linguagem em que eu escrevo ao software que constrói, desenha e " +
    "automatiza o que entrego.",
  items: stackItems,
};

/* ---------- Formação ---------- */
export const background = {
  label: "Formação",
  title: "Onde eu estudei",
  intro:
    "As três portas que abriram o resto. Todas as três vieram por bolsa " +
    "conquistada pela nota, nenhuma paga com mensalidade.",
  items: [
    {
      period: "2017 — 2020",
      icon: "escola",
      /* Logo em public/formacao/<logo>.png. Sem arquivo, cai no ícone. */
      logo: "colegio-monte-sinai",
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
      /* Sem logo ainda: falta saber a escola do curso técnico. Largar
         public/formacao/curso-tecnico.png já coloca no ar. */
      logo: "curso-tecnico",
      title: "Curso técnico de Informática",
      meta: "Bolsa por nota · certificado de tecnólogo",
      body:
        "Infraestrutura de redes, hardware e programação, também com bolsa " +
        "conquistada pela nota. O desempenho acima da média virou convite do " +
        "professor para criar as aulas e as apresentações junto com ele, o meu " +
        "primeiro trabalho remunerado com tecnologia.",
      highlight: "Ensinei junto com o professor",
    },
    {
      period: "2024 — 2025",
      icon: "graduacao",
      logo: "unip",
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
      "Criar as aulas e as apresentações junto com o professor, remunerado, foi a primeira vez que ensinar tecnologia me pagou alguma coisa. Foi também o primeiro sinal de algo que se repetiria na Bannerjet: explicar bem é um trabalho, e alguém precisa fazê-lo.",
    ],
  },
  {
    /* O slug mudou junto com o título (era `primeiros-commits`). Não há
       pasta em public/carreira/ para nenhuma etapa ainda, então renomear
       não deixou material órfão. */
    slug: "primeiros-certificados-programacao",
    period: "2022", // conta no GitHub criada em 10/02/2022, no mesmo ano
    role: "Primeiros certificados de programação",
    org: "Curso em Vídeo · Digirati",
    body:
      "HTML5, CSS3 e JavaScript certificados por módulo, 40 horas cada, com o resultado publicado no GitHub a cada etapa concluída.",
    tags: ["HTML", "CSS", "JavaScript"],
    detail: [
      "Quatro módulos de HTML5 e CSS3 mais o de JavaScript, todos com certificado emitido. Foi a primeira formação em programação que eu busquei por conta própria, fora da escola e sem ninguém pedindo.",
      "Cada módulo terminava num projeto publicado: o SiteMisato, a tela de login do Jujutsu e o estudo de parallax que virou o Apenas Um Escritor. O certificado provava a carga horária; o repositório provava que eu tinha entendido.",
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
      "Entrei como designer, cuidando das atividades criativas da empresa, das fotos de produto às peças que sustentavam a comunicação da marca.",
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
      "Foi onde aprendi a olhar para número como argumento, e não como enfeite de relatório. Isso mudou a forma como eu apresento trabalho até hoje.",
    ],
  },
  {
    slug: "apdados-assistente",
    period: "mai de 2024 — jul de 2025",
    role: "Assistente do Comitê StarTech",
    org: "APDADOS · freelance, remoto",
    body:
      "Documentação técnica e organização dos processos do comitê, o bastidor que faz um grupo voluntário entregar o que promete.",
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
      "Os arquivos de corte e contorno precisam sair com precisão, e é aí que a maioria dos chamados começa. Foi vendo o mesmo problema voltar que nasceu a ideia de documentar tudo.",
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
    /* O `body` anterior contava o começo da história (o fluxograma, a
       narração trocada por IA) e deixava de fora o que o cargo entregou.
       Agora abre pelos maiores feitos: são eles que dizem o tamanho do
       trabalho. A história de como começou continua no `detail`. */
    body:
      "Cargo que eu criei construindo ferramentas para o time. Hoje 60% do suporte remoto é atendido por IA, o conhecimento técnico da empresa está num portal e num chatbot com RAG no WhatsApp, e as automações rodam sozinhas todo dia.",
    tags: ["RAG", "Supabase", "n8n", "ElevenLabs", "Callbell", "Notion"],
    detail: [
      "Os maiores feitos do cargo: a Central Técnica, portal que reuniu manuais, peças, firmwares, parâmetros e cursos num endereço só; a Jet IA, chatbot com RAG em produção no WhatsApp atendendo cliente de verdade, hoje com 628 blocos de conhecimento cobrindo 36 equipamentos; o chatbot que dá o treinamento completo das máquinas e emite o certificado no fim da trilha; o Painel de Atendimentos do ERP Módulo Técnico; o portal de instalação e licenças da linha A3; e o sistema que padronizou com IA as 1.524 fotos do catálogo.",
      "A virada veio de uma falha concreta: os técnicos gastavam mais tempo repetindo a mesma explicação do que resolvendo o problema. Mapeei o suporte inteiro num fluxograma de 584 elementos e produzi os vídeos, mas só quando troquei a minha narração por IA o time passou a assistir. O atrito não era o conteúdo, era o formato.",
      "Nada disso estava na descrição da vaga. Entrei como técnico, construí as ferramentas porque eu era quem sentia o problema, e o cargo foi criado depois, em cima do que já estava rodando.",
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
  /* Origem do certificado. "fixo" abre a seção, na ordem escrita aqui;
     os demais são intercalados entre si na tela, para a pista não sair
     em blocos de cinco certificados iguais. Ver Certificates.tsx. */
  grupo: "fixo" | "curso-em-video" | "apdados" | "cate";
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
  /* A ORDEM AQUI É A ORDEM NA TELA. O componente não reordena mais por
     data: o diploma da UNIP abre a lista porque é a credencial mais
     forte, e as duas da Wizard vêm logo atrás porque inglês é o que o
     Erick quer usar para trabalhar fora. Depois vem programação, e por
     fim os eventos e os cursos de carreira.

     A imagem de cada um é `public/certificados/<slug>.<ext>` — os PDFs
     originais foram convertidos para .webp (primeira página). */
  {
    slug: "unip-ads",
    grupo: "fixo",
    title: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    issuer: "Universidade Paulista · UNIP",
    date: "2026-02",
    dateLabel: "Fevereiro de 2026",
    credentialId: "Validação 322.322.408bbec064",
    href: "https://www.unip.br/aluno/documentos-digitais",
    skills: ["Graduação", "Diploma registrado"],
    description:
      "Curso concluído em 31/12/2025, com colação de grau em 27/01/2026. Bolsa integral conquistada pela nota do Enem.",
  },
  {
    slug: "wizard-conclusao",
    grupo: "fixo",
    title: "Conclusão do Teens Course",
    issuer: "Wizard · Vila Medeiros",
    date: "2023-12",
    dateLabel: "14 de dezembro de 2023",
    skills: ["Inglês"],
    description: "Quatro anos de curso de inglês concluídos.",
  },
  {
    slug: "wizard-aluno-destaque",
    grupo: "fixo",
    title: "Certificate of Excellence",
    issuer: "Wizard · Vila Medeiros",
    date: "2023-12",
    dateLabel: "2023",
    skills: ["Inglês", "Destaque da turma"],
    description:
      "Concedido por concluir as aulas com desenvolvimento e proficiência acima da média da turma.",
  },
  {
    slug: "javascript-40h",
    grupo: "curso-em-video",
    title: "JavaScript",
    issuer: "Curso em Vídeo / Digirati",
    date: "2023-01",
    dateLabel: "20 de janeiro de 2023",
    credentialId: "842AD-6C61-A",
    skills: ["JavaScript", "40 horas"],
    description: "Aproveitamento superior a 70%.",
  },
  {
    slug: "html-css-modulo-1",
    grupo: "curso-em-video",
    title: "HTML5 e CSS3 · Módulo 1 de 5",
    issuer: "Curso em Vídeo / Digirati",
    date: "2022-07",
    dateLabel: "24 de julho de 2022",
    credentialId: "842AD-C9E9-4",
    skills: ["HTML", "CSS", "40 horas"],
  },
  {
    slug: "html-css-modulo-2",
    grupo: "curso-em-video",
    title: "HTML5 e CSS3 · Módulo 2 de 5",
    issuer: "Curso em Vídeo / Digirati",
    date: "2022-09",
    dateLabel: "4 de setembro de 2022",
    credentialId: "842AD-E776-6",
    skills: ["HTML", "CSS", "40 horas"],
  },
  {
    slug: "html-css-modulo-3",
    grupo: "curso-em-video",
    title: "HTML5 e CSS3 · Módulo 3 de 5",
    issuer: "Curso em Vídeo / Digirati",
    date: "2022-09",
    dateLabel: "8 de setembro de 2022",
    credentialId: "842AD-15678-1",
    skills: ["HTML", "CSS", "40 horas"],
  },
  {
    slug: "html-css-modulo-4",
    grupo: "curso-em-video",
    title: "HTML5 e CSS3 · Módulo 4 de 5",
    issuer: "Curso em Vídeo / Digirati",
    date: "2022-12",
    dateLabel: "7 de dezembro de 2022",
    credentialId: "842AD-26CB1-9",
    skills: ["HTML", "CSS", "40 horas"],
  },
  {
    slug: "apdados-ia-para-dpos",
    grupo: "apdados",
    title: "Inteligências Artificiais para DPOs",
    issuer: "APDADOS · CNPPD 2024",
    date: "2024-03",
    dateLabel: "22 e 23 de março de 2024",
    skills: ["IA aplicada", "Privacidade", "20 horas"],
    description:
      "Tema do V Congresso Nacional dos Profissionais de Privacidade de Dados: como a IA muda o trabalho de quem cuida de dados pessoais.",
  },
  {
    slug: "apdados-cnppd-2025",
    grupo: "apdados",
    title: "Soberania Digital",
    issuer: "APDADOS · CNPPD 2025",
    date: "2025-06",
    dateLabel: "27 e 28 de junho de 2025",
    skills: ["Soberania digital", "20 horas"],
    description: "VI Congresso Nacional dos Profissionais de Privacidade de Dados.",
  },
  {
    slug: "apdados-cnppd-2024",
    grupo: "apdados",
    title: "V Congresso Nacional dos Profissionais de Privacidade de Dados",
    issuer: "APDADOS",
    date: "2024-03",
    dateLabel: "Março de 2024",
    skills: ["LGPD", "Privacidade"],
  },
  {
    slug: "apdados-panorama-lgpd",
    grupo: "apdados",
    title: "Aniversário da LGPD: panorama em cada estado do Brasil",
    issuer: "APDADOS",
    date: "2024-08",
    dateLabel: "14 de agosto de 2024",
    skills: ["LGPD", "9 horas"],
  },
  {
    slug: "apdados-cenario-multas-dpo",
    grupo: "apdados",
    title: "Aniversário de 6 anos do GDPR",
    issuer: "APDADOS",
    date: "2024-05",
    dateLabel: "25 de maio de 2024",
    skills: ["GDPR", "2 horas"],
    description:
      "Cenário das multas e condutas para o desenvolvimento do DPO/Encarregado.",
  },
  {
    slug: "apdados-orientacao-carreira-ti",
    grupo: "apdados",
    title: "Orientação de Carreira para Profissionais de TI",
    issuer: "APDADOS · Comitê StarTech",
    date: "2024-05",
    dateLabel: "11 de maio de 2024",
    skills: ["Carreira em TI", "3 horas"],
  },
  {
    slug: "assistente-administrativo",
    grupo: "cate",
    title: "Assistente Administrativo",
    issuer: "Portal Cate · São Paulo",
    date: "2023-11",
    dateLabel: "18 de novembro de 2023",
    skills: ["30 horas"],
  },
  {
    slug: "soft-skills",
    grupo: "cate",
    title: "Soft Skills: habilidades dos profissionais do futuro",
    issuer: "Portal Cate · São Paulo",
    date: "2023-10",
    dateLabel: "1 de outubro de 2023",
    skills: ["7 horas"],
  },
  {
    slug: "relacionamento-interpessoal",
    grupo: "cate",
    title: "Relacionamento interpessoal: da inteligência emocional à negociação",
    issuer: "Portal Cate · São Paulo",
    date: "2023-10",
    dateLabel: "1 de outubro de 2023",
    skills: ["3 horas"],
  },
  {
    slug: "processo-seletivo",
    grupo: "cate",
    title: "Processo Seletivo",
    issuer: "Portal Cate · São Paulo",
    date: "2023-10",
    dateLabel: "1 de outubro de 2023",
    skills: ["12 horas"],
  },
  {
    slug: "preciso-trabalhar",
    grupo: "cate",
    title: "Preciso trabalhar, e agora?",
    issuer: "Portal Cate · São Paulo",
    date: "2023-10",
    dateLabel: "1 de outubro de 2023",
    skills: ["7 horas"],
  },
  {
    slug: "postura-imagem-profissional",
    grupo: "cate",
    title: "Postura e imagem profissional",
    issuer: "Portal Cate · São Paulo",
    date: "2023-10",
    dateLabel: "1 de outubro de 2023",
    skills: ["5 horas"],
  },
];

export const certificates = {
  label: "Certificados",
  /* "O que está no papel" era autodepreciativo: colocava a própria seção
     em dúvida, como se o papel valesse menos que o resto. O título agora
     afirma o que a seção é. */
  title: "Formação certificada",
  intro:
    "Vinte e duas credenciais emitidas, dos primeiros módulos de HTML e " +
    "JavaScript ao inglês concluído, aos encontros nacionais de proteção de " +
    "dados e à IA aplicada à privacidade. Todas com certificado para conferir.",
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
    "Nascido em São Paulo, nunca saí do estado, e tenho o sonho de conhecer " +
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
  /* REFEITO EM 26/11/2026: o "Vamos construir juntos" + a citação do
     Claude Code saíram. O título agora fala do valor (processo que dá
     trabalho demais → automação), o status diz se ele está disponível e
     os canais viraram uma lista grande, um por linha. */
  titleLines: ["Tem um processo", "que pode ser"],
  titleAccent: "automatizado?",
  body:
    "Estou aberto a vagas de desenvolvimento, IA e automação, presenciais em São " +
    "Paulo, remotas ou fora do Brasil, e a projetos em que IA, automação e produto " +
    "precisam sair do papel e entrar em produção.",
  status: "Disponível para novas oportunidades",
  emailHint: "Me escreve",
  availability: [
    { label: "Onde", value: "São Paulo, Brasil" },
    { label: "Formato", value: "Presencial, remoto ou exterior" },
    { label: "Resposta", value: "Em até 1 dia útil" },
  ],
  channelsLabel: "Canais",
  backToTop: "Voltar ao topo",
  socialsLabel: "Nas redes",
  socials: [
    /* LinkedIn primeiro: é o canal de quem chega para contratar. */
    {
      label: "LinkedIn",
      handle: "/in/erickkadr",
      href: "https://www.linkedin.com/in/erickkadr/",
    },
    { label: "GitHub", handle: "@ErickkADR", href: "https://github.com/ErickkADR" },
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


/* ---------- Textos de interface ----------
   Rótulos de botão, de leitor de tela e de contagem. Estavam chumbados no
   JSX e só apareceram quando o site ganhou o botão de inglês: eram os
   últimos textos visíveis fora deste arquivo.

   Ficam num bloco separado porque não são conteúdo (não descrevem o
   Erick nem o trabalho dele): são a mecânica da página. */
export const ui = {
  copiarEmail: "Copiar e-mail",
  emailCopiado: "Copiado ✓",
  abrirEmail: "Abrir no e-mail →",
  fechar: "Fechar ✕",
  documento: "Documento",
  /* Contagem de arquivos: [singular, plural]. */
  itens: ["item", "itens"] as [string, string],
  /* Rótulos que só o leitor de tela ouve. */
  navPrincipal: "Navegação principal",
  /* Rótulos do botão de idioma, no idioma de DESTINO: é o idioma da ação,
     e é o que faz sentido para quem ouve. Por isso não têm par no
     content-en.ts — eles não mudam com o idioma atual. */
  mudarParaIngles: "Switch to English",
  mudarParaPortugues: "Mudar para português",
  navSubpagina: "Navegação da subpágina",
  perfilVerificado: "Perfil verificado",
  verMaterialDe: "Ver o material de",
  crachaAlt:
    "Crachá de Erick Dantas, Criador de Produto Técnico na Bannerjet Group",
};

/* ---------- Cabeçalho da seção de projetos ----------
   O `projects` acima é a lista; isto é o cabeçalho dela, que estava
   escrito direto no Projects.tsx. */
export const projectsSection = {
  countLabel: "projetos",
  title: "Conheça os meus principais projetos desenvolvidos",
  carouselLabel: "Projetos",
  /* Linha sob o título e dica de rolagem da faixa horizontal. */
  intro:
    "Projetos pessoais, do 3D no navegador a sistemas completos com banco de " +
    "dados. O que fiz na Bannerjet está em Feitos na Bannerjet.",
  scrollHint: "Role para ver todos",
  cta: "Ver projeto",
  codeLabel: "Código",
  moreLabel: "Mais no GitHub",
  moreBody: "Estudos, exercícios e os primeiros projetos estão todos lá.",
};

/* ============================================================
   O CONTEÚDO COMO UM OBJETO SÓ.

   Existe para o botão de idioma: é esta árvore que `lib/idioma.tsx`
   mescla com o dicionário inglês. Os `export const` acima continuam
   valendo e são o que a maioria dos componentes ainda importa direto.

   Ao acrescentar uma seção nova ao arquivo, acrescente aqui também, senão
   ela nunca terá versão em inglês.
   ============================================================ */
export const conteudo = {
  site,
  nav,
  hero,
  sobre,
  feitos,
  metricas,
  recomendacoes,
  projects,
  projectPage,
  marquee,
  stack,
  background,
  career,
  careerPage,
  certificates,
  globe,
  contact,
  ui,
  projectsSection,
};

export type Conteudo = typeof conteudo;
