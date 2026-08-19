import type { Conteudo } from "./content";

/* ============================================================
   CONTEÚDO EM INGLÊS — dicionário PARCIAL, de propósito.

   Só precisa ter o que está traduzido. O que faltar cai no português
   sozinho, campo por campo (ver `mesclar` em lib/idioma.tsx), então este
   arquivo pode crescer aos poucos sem nunca deixar a página com buraco.

   ⚠️ ARRAY É MESCLADO POR ÍNDICE. A ordem dos itens aqui tem de ser a
   mesma do content.ts; mudou lá, muda aqui.

   O QUE JÁ ESTÁ TRADUZIDO: o menu, o hero, a seção Sobre e o contato —
   são as quatro que leem por `useConteudo()`. As outras seções ainda
   importam o objeto português direto, então traduzir os textos delas aqui
   não teria efeito antes de converter o componente.
   ============================================================ */

type Profundo<T> = {
  [K in keyof T]?: T[K] extends readonly (infer U)[]
    ? Profundo<U>[]
    : T[K] extends object
      ? Profundo<T[K]>
      : T[K];
};

export const conteudoEn: Profundo<Conteudo> = {
  site: {
    role: "Technical content, AI & front-end",
    location: "São Paulo, Brazil",
  },

  nav: [
    { label: "Home" },
    { label: "About" },
    { label: "Current role" },
    { label: "Career" },
    { label: "Projects" },
    { label: "Stack" },
    { label: "Certificates" },
    { label: "Goals" },
    { label: "Contact" },
  ],

  hero: {
    greeting: "Hi, my name is",
    role: "Developer",
    description:
      "I work at the intersection of technology, artificial intelligence, " +
      "automation and design, turning complex problems into practical solutions. " +
      "Much of my work sits behind solutions that connect AI, technical support, " +
      "documentation and training, from WhatsApp automations and chatbots to " +
      "platforms teams rely on daily.",
    photoAlt: "Erick Dantas",
    photoIAAlt: "The same portrait with the face replaced by an android head",
    photoHint: "Move your mouse",
    photoTap: ["See the AI version", "See the photo"],
  },

  sobre: {
    label: "About",
    title: "Who am I?",
    body: [
      "I have always been driven by the curiosity to understand how things work. " +
        "My first contact with technology happened at the age of 4, and since then " +
        "learning, testing and building became a natural part of who I am.",
      "At school I helped my technical course teacher run the classes, prepared " +
        "lessons and tutored students one on one.",
      "That led me to APDADOS, where I became coordinator of the StarTech " +
        "committee, running meetings, materials and information security research, " +
        "along with other projects.",
      "Then I joined Bannerjet as an IGP technician and later became a developer, " +
        "because I realised that many problems could be solved not only with " +
        "technical knowledge, but by building tools that make processes simpler, " +
        "faster and smarter. That is how I started developing my first AI " +
        "solutions, at first to solve real needs of my own team and, over time, " +
        "turning those initiatives into part of my job.",
      "Today I work at the intersection of technology, artificial intelligence, " +
        "automation and design, turning complex problems into practical solutions. " +
        "I use tools like Claude Code, Codex, Antigravity and Cursor every day, not " +
        "just to write code but to think, prototype, test and build complete " +
        "systems.",
      "Much of my work sits behind solutions that connect AI, technical support, " +
        "documentation and training, from WhatsApp automations and chatbots to " +
        "platforms teams rely on daily.",
      "More than keeping up with technology, I like finding out what can be built " +
        "with it.",
    ],
    facts: [
      { label: "Where", value: "São Paulo, Brazil" },
      { label: "Role", value: "Technical Product Creator" },
      { label: "Company", value: "Bannerjet Group" },
      { label: "Languages", value: "Portuguese and English" },
    ],
    crachaHint: "Drag the badge",
  },

  contact: {
    label: "Contact",
    titleLines: ["Let's", "build"],
    titleAccent: "together",
    body:
      "Open to projects, collaborations and conversations about AI, automation and " +
      "front-end. I still want to work outside Brazil and get to know new " +
      "cultures, while I keep building tools that make other people's work easier.",
    quote:
      "Hand me Claude Code and with my creativity I will move the world...",
    emailHint: "Write to me",
    availability: [
      { label: "Where", value: "São Paulo, Brazil" },
      { label: "Format", value: "Remote, hybrid or abroad" },
      { label: "Reply", value: "Within 1 business day" },
    ],
    socialsLabel: "On the web",
  },
  /* ---------- Cargo atual / feitos ----------
     A ordem dos grupos e dos itens é a MESMA do content.ts (Produtos com
     5, Automações com 9, Conteúdo técnico com 4). As `tags` ficaram em
     português de propósito: a maioria já é nome próprio ou sigla e o
     custo de traduzir não se pagava. */
  feitos: {
    label: "Current role",
    title: "Built at Bannerjet",
    intro:
      "Everything built inside the company and in daily use. Tap any item to " +
      "read more about it.",
    mediaLabel: "See the material",
    mediaEmpty: "Material being digitised",
    groups: [
      {
        group: "Products",
        intro: "What became a daily tool for the team and for customers.",
        items: [
          {
            title: "Central Técnica",
            body:
              "It started from simple arithmetic: the time the team spent looking " +
              "for an old manual, a cutting parameter or the right firmware version " +
              "was longer than solving the problem itself. The material existed, " +
              "scattered across folders, e-mails and WhatsApp threads. The portal " +
              "brings it all together: a catalogue with its own page per machine, " +
              "manuals, parts, firmware, colour profiles, parameters and courses " +
              "with module progression. What used to be \"go ask so-and-so\" became " +
              "a link. On top of it runs a chatbot that answers technical questions " +
              "from the same knowledge base: ask in plain language, get the answer " +
              "with its source.",
          },
          {
            title: "Jet IA, WhatsApp support chatbot",
            body:
              "A RAG chatbot in production serving real customers: n8n orchestrating " +
              "the flows, Supabase holding the embeddings and Callbell as the " +
              "channel. A mistake here has a real cost, so every change to the " +
              "knowledge base is tested by hand before it counts.",
          },
          {
            title: "A3 line installation portal",
            body:
              "Software and licence installation for the A3 equipment line at a " +
              "single address. The equipment licence opens its own page, with the " +
              "installer, the documentation and the matching video, instead of " +
              "e-mailing files by hand on every sale.",
          },
          {
            title: "ERP Technical Module",
            body:
              "Built together with Victor Rocha, who created the project. I built the " +
              "Service Panel: the overview of technical service calls, the team and " +
              "the week's schedule. And I brought Jet IA inside the module, giving " +
              "every employee access to the company's technical knowledge without " +
              "having to ask someone.",
          },
          {
            title: "Equipment screen prototypes",
            body:
              "Navigable replicas of the machine interfaces. The technician practises " +
              "the menu path before touching the equipment, and the customer sees the " +
              "exact step without depending on a shaky photo of a screen.",
          },
        ],
      },
      {
        group: "Automations",
        intro:
          "Flows that run on their own and give the team back the time that used to " +
          "go into repeated work.",
        items: [
          {
            title: "Automatic technical scheduling",
            body:
              "The customer picks a time and the flow handles the rest: it creates the " +
              "Google Calendar event, generates the Meet link and hands the " +
              "conversation to the technician who specialises in that equipment.",
          },
          {
            title: "AI service supervisor",
            body:
              "It watches the whole queue: finds customers left without an answer and " +
              "alerts the technician, moves stalled conversations along and tells the " +
              "customer when the technician is away, at lunch or after hours. Nobody " +
              "waits without knowing.",
          },
          {
            title: "Training and installation chatbot",
            body:
              "After mapping every piece of equipment and recording a video for each " +
              "one, I built the chatbot that delivers full training on Bannerjet " +
              "machines and issues the certificate over WhatsApp at the end of the " +
              "track.",
          },
          {
            title: "Laudo Jet",
            body:
              "It generates the technical report for each service call from the " +
              "conversation itself, in the format the team already used. The record " +
              "stopped depending on someone remembering to write it.",
          },
          {
            title: "Voice reception AI",
            body:
              "It greets the customer by voice, records their details and routes them " +
              "to the right automation: training, installation or support.",
          },
          {
            title: "AI that understands video and audio on WhatsApp",
            body:
              "A customer with a problem sends a video of the equipment, not text. The " +
              "automation reads what was sent and answers about it, instead of asking " +
              "the person to describe in writing what they already showed.",
          },
          {
            title: "AI that keeps customer notes up to date",
            body:
              "It keeps every contact's record alive on the platform: equipment, " +
              "history and what is still open, written by the automation itself at the " +
              "end of the service call.",
          },
          {
            title: "Catalogue photos standardised with AI",
            body:
              "The part photos came from different sources, each with its own " +
              "background, framing and resolution, and the catalogue looked like a " +
              "patchwork. I built the system that treats each image with AI and " +
              "returns them all to the same professional standard: studio white " +
              "background or transparent cutout, upscaled resolution and identical " +
              "framing. It ran in batch over the 1,524 photos of the ERP catalogue, " +
              "and every new photo now goes through the same path.",
          },
          {
            title: "Drive synced with the lab Kanban",
            body:
              "It creates the Google Drive folder for each piece of equipment that " +
              "comes in for maintenance and keeps the status in sync with the " +
              "technical lab's Notion Kanban.",
          },
        ],
      },
      {
        group: "Technical content",
        intro:
          "The part that stopped the team from repeating the same explanation, and " +
          "became my job title.",
        items: [
          {
            title: "Technical support flowchart",
            body:
              "584 elements mapping the entire service process, from first contact to " +
              "closing the ticket. It was the diagnosis that showed where the time was " +
              "going, and the basis of everything that came after.",
          },
          {
            title: "Technical tutorials narrated by AI",
            body:
              "I produced well edited videos and some technicians would not use them, " +
              "because it was my voice. I swapped the narration for AI and everything " +
              "changed: today it is the team standard.",
          },
          {
            title: "Technical tutorial channel on YouTube",
            body:
              "The video library published where customers already look. Support " +
              "answers with a link instead of repeating the explanation in writing.",
          },
          {
            title: "Technical manuals",
            body:
              "Equipment manuals generated with a prompt framework and a strict " +
              "formatting guide, so they all come out with the same look and the " +
              "brand's identity, without depending on who laid them out.",
          },
        ],
      },
    ],
  },

  metricas: {
    label: "Results",
    title: "What Bannerjet got from my work",
    intro:
      "This is not a prototype portfolio: every number below came from something in " +
      "production that the team uses every day.",
    items: [
      {
        label: "of remote support handled by artificial intelligence or a bot",
        outcome:
          "Half of the first response stopped taking up a technician, and the team " +
          "now only receives what genuinely needs a person.",
        source: "Jet IA · Bannerjet",
      },
      {
        label: "reduction in service time",
        outcome:
          "The same team closes more tickets in less time, with the flow mapped, " +
          "triage automated and the material published.",
        source: "Technical support · Bannerjet",
      },
      {
        label: "technical materials finished, between videos and manuals",
        outcome:
          "What used to be explained again on every call became our own material: " +
          "support answers with a link and the customer solves it alone.",
        source: "Technical content · Bannerjet",
      },
      {
        label:
          "blocks of company knowledge the AI consults, covering 36 machines",
        outcome:
          "The answer that reaches an employee is technical, validated and from the " +
          "house itself, instead of whatever the model would guess.",
        source: "Supabase · Jet IA knowledge base",
      },
    ],
  },

  /* Traduzido: `category`, `description`, `overview`, `highlights` e a
     `facts`. Ficaram em português as LEGENDAS DAS TELAS (`gallery[].alt`,
     que viram figcaption) e o `cover.alt` — são descrições de imagem, uma
     por print, e não couberam nesta rodada. */
  projects: [
    {
      category: "Technical training platform",
      description:
        "Technical hub gathering an equipment catalogue, manuals, parts, firmware " +
        "and courses with module progression, plus an AI chatbot that answers " +
        "technical questions right on the site.",
      overview: [
        "Central Técnica started from simple arithmetic: the time the support team spent looking for an old manual, a cutting parameter or the right firmware version was longer than solving the problem itself. The material existed, scattered across folders, e-mails and WhatsApp threads.",
        "The portal brings it all into one place: an equipment catalogue with its own page per machine, manuals, parts, firmware, colour profiles and parameters. Every machine has its own record, and what used to be \"go ask so-and-so\" became a link.",
        "On top of it runs an AI chatbot that answers technical questions from the same knowledge base as the portal. Whoever does not know where to look asks in plain language and gets the answer with its source.",
      ],
      highlights: [
        {
          title: "One page per machine",
          body: "Plotters, laminators, UV printers, lasers and guillotines: each machine has its record, its parameters and the files that belong to it.",
        },
        {
          title: "Chatbot on the portal's own base",
          body: "The answers come from the same material published on the site, so documentation and chatbot never drift apart.",
        },
        {
          title: "Restricted area",
          body: "The content is internal to Bannerjet: access goes through login, and the public portal only shows the entry screen.",
        },
      ],
      facts: [
        { label: "Role", value: "Design, content and implementation" },
        { label: "Context", value: "Internal tool, in daily use" },
        { label: "Stack", value: "HTML · CSS · JavaScript" },
        { label: "Status", value: "Live, evolving" },
      ],
    },
    {
      category: "Support SaaS with AI",
      description:
        "A SaaS platform of specialised AI chatbots: Gemini API integration, an admin " +
        "dashboard and a dark interface built for long sessions.",
      overview: [
        "AtomAI is a support platform where each bot specialises in a niche, instead of one generic assistant trying to answer everything. Whoever arrives picks the type of problem, be it hardware, software or peripherals, and lands on the agent trained for it.",
        "Beyond the conversation, the product has the inside: a dashboard with real-time ticket volume, performance per agent, bot team management, plans and checkout. It is the full slice of a SaaS, from login to billing.",
        "The interface is dark by decision of use: it is a work tool, open all day, and high contrast tires you out over a long shift.",
      ],
      highlights: [
        {
          title: "Agents by speciality",
          body: "Each bot covers one domain and has its own status. Triage happens before the conversation, not in the middle of it.",
        },
        {
          title: "Dashboard with the support numbers",
          body: "Total tickets, active agents, average response time and resolved today, with the curve for the last seven days.",
        },
        {
          title: "Gemini API behind it",
          body: "The answers come from Gemini, with the specialisation defined per agent.",
        },
      ],
      facts: [
        { label: "Role", value: "Product, interface and integration" },
        { label: "Context", value: "Final degree project" },
        { label: "Stack", value: "HTML · CSS · JavaScript · Gemini API" },
        { label: "Status", value: "In development" },
      ],
    },
    {
      category: "Custom print store",
      description:
        "An online store with more than 130 products across 6 categories, four " +
        "pricing models per product, a full cart and order checkout straight on " +
        "WhatsApp.",
      overview: [
        "Nexus Print is a custom visual communication store: stickers, action figures, Funko Pops, cake toppers and milk boxes. More than 130 products catalogued across six categories.",
        "The knot of the project was pricing. A custom product has no single price: it depends on size, quantity and finishing. Each item carries four pricing models, and the cart calculates on top of the chosen combination.",
        "The order does not end at a payment gateway: it closes on WhatsApp, with the summary assembled. That is how the sale actually happens in this market, and pushing a traditional checkout would only add a step nobody completes.",
      ],
      highlights: [
        {
          title: "Four pricing models per product",
          body: "The same piece changes value with size, quantity and finishing, and the cart works out the arithmetic.",
        },
        {
          title: "Closing on WhatsApp",
          body: "The order comes out ready for the conversation, the way customers in this market already buy.",
        },
        {
          title: "Light and dark",
          body: "The theme follows the visitor's preference, without reloading the page.",
        },
      ],
      facts: [
        { label: "Role", value: "Front-end, catalogue and pricing logic" },
        { label: "Catalogue", value: "130+ products in 6 categories" },
        { label: "Stack", value: "HTML · CSS · JavaScript" },
        { label: "Status", value: "Live" },
      ],
    },
    {
      category: "Software download page",
      description:
        "Every machine sold gets a permanent link through its licence, with the " +
        "installer, manuals and video. It replaced sending files by hand on every " +
        "sale.",
      overview: [
        "Every equipment sale ended the same way: someone from support gathered the installer, manuals and video and sent them by e-mail or WhatsApp. One by one, always the same, and always at risk of sending the wrong version.",
        "The portal swaps that ritual for a permanent link. The equipment licence becomes the route: whoever opens the link lands straight on their own machine's page, with the software, the documentation and the matching video.",
        "Because the address is fixed, it still works after the sale: when the customer reinstalls their computer a year from now, the material is still there, up to date.",
      ],
      highlights: [
        {
          title: "The licence is the route",
          body: "Each machine has its own address, and the content comes from the licence that opened the page.",
        },
        {
          title: "One link instead of sending by hand",
          body: "Installer, manuals and video in the same place, always on the current version.",
        },
        {
          title: "It still works after the sale",
          body: "The link is permanent: it serves the installation and every reinstall that comes after.",
        },
      ],
      facts: [
        { label: "Role", value: "Design and implementation" },
        { label: "Context", value: "Bannerjet after-sales" },
        { label: "Stack", value: "React 18 · TypeScript" },
        { label: "Status", value: "Finished, live" },
      ],
    },
    {
      category: "Responsive landing page",
      description:
        "A One Piece landing page with the 10 Straw Hat crew members, biographies " +
        "and attribute bars, built with HTML and CSS only.",
      overview: [
        "A fan project to exercise what HTML and CSS can do on their own: ten members of the Straw Hat Crew, each with an introduction, a biography and attribute bars.",
        "There is not a single line of JavaScript. Everything that moves comes from CSS: the transitions, the hover states and the rhythm of the page as you scroll down.",
        "It is a long page on purpose: the reading follows the whole crew, one character at a time, like an album.",
      ],
      highlights: [
        {
          title: "Zero JavaScript",
          body: "Layout, motion and interaction solved with CSS alone.",
        },
        {
          title: "Ten full profiles",
          body: "Each member with an introduction, a story and attributes in bars.",
        },
        {
          title: "Long-scroll reading",
          body: "The page is built to be read from start to finish, with no shortcut menu.",
        },
      ],
      facts: [
        { label: "Role", value: "Design and implementation" },
        { label: "Context", value: "Fan project, CSS study" },
        { label: "Stack", value: "HTML · CSS" },
        { label: "Status", value: "Finished" },
      ],
    },
    {
      category: "Parallax website",
      description:
        "A study of the parallax effect and the optical illusion it creates. It was " +
        "the project where the urge to work with motion began.",
      overview: [
        "One text and one effect. Parallax lets layers run at different speeds and the eye reads that as depth: the page has two dimensions, but does not look like it.",
        "It was the experiment where it became clear that an interface could be more than layout. Everything that came after started here: the scroll reveals, the hero video and the 3D scene in this portfolio.",
        "The project is from 2025 and is still live exactly as it was made. It did not age well by accident: it is the record of where this began.",
      ],
      highlights: [
        {
          title: "Depth without 3D",
          body: "Layers at different speeds are enough for the eye to read distance.",
        },
        {
          title: "The text leads",
          body: "The effect serves the reading, setting the rhythm of each passage.",
        },
        {
          title: "The starting point",
          body: "The first project where motion became part of the content, not decoration.",
        },
      ],
      facts: [
        { label: "Role", value: "Design and implementation" },
        { label: "Context", value: "Personal study" },
        { label: "Stack", value: "HTML · CSS" },
        { label: "Status", value: "Finished, live" },
      ],
    },
  ],

  stack: {
    label: "Stack",
    title: "Tools I work with",
    intro:
      "From the language I write in to the software that builds, designs and " +
      "automates what I deliver.",
  },

  certificates: {
    label: "Certificates",
    title: "Certified training",
    intro:
      "Twenty-two credentials issued, from the first HTML and JavaScript modules to " +
      "completing English, the national data protection conferences and AI applied " +
      "to privacy. All with a certificate to check.",
    imageHint: "Click to see the certificate",
  },

  background: {
    label: "Education",
    title: "Where I studied",
    intro:
      "The three doors that opened the rest. All three came through a scholarship " +
      "earned on grades, none paid for with tuition.",
    items: [
      {
        title: "Scholarship · Colégio Monte Sinai",
        meta: "Mackenzie methodology",
        body:
          "I won the scholarship and, at the end of the year, the Outstanding " +
          "Student certificate for my grades.",
        highlight: "Outstanding Student",
      },
      {
        title: "Technical course in Information Technology",
        meta: "Scholarship on grades · technologist certificate",
        body:
          "Network infrastructure, hardware and programming, also on a scholarship " +
          "earned on grades. Performing above average turned into an invitation from " +
          "the teacher to build the classes and the presentations with him, my first " +
          "paid work in technology.",
        highlight: "I taught alongside the teacher",
      },
      {
        title: "Systems Analysis and Development",
        meta: "Universidade Paulista",
        body: "Full scholarship earned on my Enem score.",
        highlight: "Full scholarship",
      },
    ],
  },

  globe: {
    label: "Professional goal",
    title: "From here to the world",
    body:
      "Born in São Paulo, I have never left the state, and I dream of seeing the " +
      "world, working abroad and getting to know new cultures, while I keep building " +
      "tools that make other people's work easier around the world.",
  },

  marquee: [
    "RAG",
    "Automation",
    "n8n",
    "Supabase",
    "Gemini API",
    "Front-end",
    "Claude Code",
    "Technical content",
  ],
  projectPage: {
    back: "All projects",
    liveLabel: "See it live",
    repoLabel: "See the code",
    overviewLabel: "The project",
    highlightsLabel: "What it solves",
    galleryLabel: "Screens",
    factsLabel: "Details",
    nextLabel: "Next project",
  },

  careerPage: {
    back: "Back to career",
    materialLabel: "Material",
    materialEmpty:
      "The material for this stage is still being digitised. In the meantime, the " +
      "certificates and the projects from that period are elsewhere on the site.",
    nextLabel: "Next stage",
  },

  career: {
    label: "Career",
    title: "My professional path so far",
    intro:
      "I work with what I love. Every stage started as a concrete problem that " +
      "needed solving.",
    entryCta: "See more",
    entries: [
      {
        period: "2021 — 2023",
        role: "Technical course in Information Technology",
        org: "Technical education",
        body:
          "Networks, hardware and programming, with a technologist certificate. My " +
          "performance earned an invitation from the teacher himself to produce the " +
          "classes with him.",
        detail: [
          "The course covered the base everything else stands on: how a network really works, what happens inside the machine, and how to write software that talks to both.",
          "Building the classes and the presentations with the teacher, paid, was the first time teaching technology earned me anything. It was also the first sign of something that would repeat at Bannerjet: explaining things well is a job, and someone has to do it.",
        ],
      },
      {
        period: "2022",
        role: "First programming certificates",
        org: "Curso em Vídeo · Digirati",
        body:
          "HTML5, CSS3 and JavaScript certified module by module, 40 hours each, with " +
          "the result published on GitHub after every stage.",
        detail: [
          "Four HTML5 and CSS3 modules plus the JavaScript one, all with a certificate issued. It was the first programming training I went after on my own, outside school and with nobody asking.",
          "Each module ended in a published project: SiteMisato, the Jujutsu login screen and the parallax study that became Apenas Um Escritor. The certificate proved the hours; the repository proved I had understood.",
        ],
      },
      {
        period: "2024",
        role: "Web Designer",
        org: "Achei Montador",
        body:
          "Responsible for the brand's visual pieces: editing, retouching and image " +
          "manipulation in Photoshop.",
        detail: [
          "I came in as a designer, handling the company's creative work, from product photos to the pieces that carried the brand's communication.",
        ],
      },
      {
        period: "2024",
        role: "Paid Traffic Specialist",
        org: "Achei Montador",
        body:
          "Managing and optimising campaigns on Google Ads and Meta Business, reading " +
          "results in Analytics.",
        detail: [
          "I took over paid traffic after design: defining audiences, watching cost per result and cutting what did not perform.",
          "It is where I learned to treat a number as an argument, not as decoration in a report. That changed how I present work to this day.",
        ],
      },
      {
        period: "May 2024 — Jul 2025",
        role: "StarTech Committee Assistant",
        org: "APDADOS · freelance, remote",
        body:
          "Technical documentation and process organisation for the committee, the " +
          "backstage that makes a volunteer group deliver what it promises.",
      },
      {
        period: "Apr 2025 — now",
        role: "IGP Technician",
        org: "Bannerjet Group",
        body:
          "Remote support for cutting plotters, fibre laser machines and CellCut " +
          "systems.",
        detail: [
          "Networks, maintenance and hardware configuration on one side; CorelDRAW, Photoshop, SignMaster and CameraCut on the other.",
          "Cutting and contour files have to come out precise, and that is where most tickets begin. Watching the same problem come back is what led to the idea of documenting everything.",
        ],
      },
      {
        period: "Jun 2025 — now",
        role: "StarTech Committee Coordinator",
        org: "APDADOS · freelance, remote",
        body:
          "I coordinate the committee with a focus on training people entering the " +
          "market.",
        detail: [
          "It is where the analytical, IT infrastructure side meets people: building a learning track, reviewing material, unblocking careers.",
        ],
      },
      {
        period: "Today",
        role: "Technical Product Creator",
        org: "Bannerjet Group",
        body:
          "A role I created by building tools for the team. Today 50% of remote " +
          "support is handled by AI, the company's technical knowledge lives in a " +
          "portal and in a WhatsApp RAG chatbot, and the automations run on their own " +
          "every day.",
        detail: [
          "The biggest deliveries of the role: Central Técnica, the portal that brought manuals, parts, firmware, parameters and courses into a single address; Jet IA, a RAG chatbot in production on WhatsApp serving real customers, today with 628 blocks of knowledge covering 36 machines; the chatbot that delivers full training on the machines and issues the certificate at the end of the track; the Service Panel of the ERP Technical Module; the A3 line installation and licensing portal; and the system that standardised the 1,524 catalogue photos with AI.",
          "The turning point came from a concrete failure: technicians spent more time repeating the same explanation than solving the problem. I mapped the whole support process in a 584-element flowchart and produced the videos, but only when I swapped my own narration for AI did the team start watching. The friction was not the content, it was the format.",
          "None of this was in the job description. I came in as a technician, built the tools because I was the one feeling the problem, and the role was created afterwards, on top of what was already running.",
        ],
      },
    ],
  },

  /* A ordem é a mesma do content.ts: Marden, Davis, Leandro, Rene, Victor,
     Guilherme, Artur. Mescla por índice — reordenar lá exige reordenar aqui. */
  recomendacoes: {
    label: "Recommendations",
    title: "What people say about me",
    intro: "People I have worked with: managers, professors and committee peers.",
    items: [
      {
        quote:
          "Erick came in as a technician and ended up building tools. He mapped our " +
          "entire support process, showed where the time was going and then solved " +
          "it: today half of remote support goes through AI before it reaches a " +
          "technician. Nobody asked him to. He saw it.",
        headline: "Founder of Bannerjet International",
      },
      {
        quote:
          "Erick coordinates the StarTech Committee at APDADOS with a level of " +
          "organisation most senior professionals do not have: meetings with an " +
          "agenda, reviewed material, information security research delivered. In a " +
          "volunteer committee, that is what separates good intentions from results.",
        headline: "President of APDADOS and former CNPD member",
      },
      {
        quote:
          "As technical director, what I see is the before and after. Before, every " +
          "ticket repeated the same explanation and the knowledge lived in the heads " +
          "of whoever had been here longest. Today it is in a portal, in a chatbot and " +
          "in more than two hundred pieces of material. Erick turned loose knowledge " +
          "into a product.",
        headline: "Technical Director at Bannerjet Group",
      },
      {
        quote:
          "I followed Erick through the Systems Analysis and Development degree. He is " +
          "the student who does not wait for the syllabus to learn: he would show up " +
          "with a project already running, built on his own, and with questions that " +
          "went beyond the class. He will go far, and not because of the diploma.",
        headline: "ADS course coordinator at Universidade Paulista",
      },
      {
        quote:
          "I built the ERP Technical Module and Erick took on the Service Panel and " +
          "brought Jet IA inside it. He is the kind of partner who understands the " +
          "problem before writing the first line, delivers on time and documents it " +
          "for whoever comes next. Working together was easy.",
        headline: "Technical Supervisor at Bannerjet Group",
      },
      {
        quote:
          "Talking to Erick about code is easy: he arrives with the problem mapped and " +
          "an opinion on the solution, not with a generic question. He builds with AI " +
          "the way you use a tool, knowing what to accept and what to throw away, and " +
          "he leaves everything documented for whoever comes next. That is rare.",
        headline: "Backend Developer (Node.js, NestJS, TypeScript)",
      },
      {
        quote:
          "I work in the technical department and I use what Erick built every day. " +
          "Before, I would open three folders and message someone on WhatsApp to find " +
          "a cutting parameter; today I ask Jet IA or open Central Técnica and solve " +
          "it myself. The difference day to day is enormous.",
        headline: "Technical Analyst at Bannerjet",
      },
    ],
  },
  ui: {
    copiarEmail: "Copy e-mail",
    emailCopiado: "Copied ✓",
    abrirEmail: "Open in mail app →",
    fechar: "Close ✕",
    documento: "Document",
    itens: ["item", "items"],
    navPrincipal: "Main navigation",
    navSubpagina: "Subpage navigation",
    perfilVerificado: "Verified profile",
    verMaterialDe: "See the material for",
    crachaAlt:
      "Erick Dantas' badge, Technical Product Creator at Bannerjet Group",
  },

  projectsSection: {
    countLabel: "projects",
    title: "The main projects I have built",
    carouselLabel: "Projects",
  },
};
