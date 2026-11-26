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
    { label: "Contact" },
  ],

  hero: {
    greeting: "Hi, my name is",
    role: "Developer",
    photoAlt: "Erick Dantas",
    photoIAAlt: "The same portrait with the face replaced by an android head",
    photoHint: "Move your mouse",
    photoTap: ["See the AI version", "See the photo"],
  },

  sobre: {
    label: "About",
    title: "Who am I?",
    body: [
      "I work at the intersection of technology, artificial intelligence, " +
        "automation and design, turning complex problems into practical " +
        "solutions. Much of my work sits behind solutions that connect AI, " +
        "technical support, documentation and training, from WhatsApp automations " +
        "and chatbots to platforms teams rely on daily.",
      "At Bannerjet Group I design and ship the systems behind the company's " +
        "technical support: the RAG chatbot serving customers on WhatsApp, the " +
        "portal holding all the technical knowledge, the ERP dashboards and the " +
        "n8n automations that run on their own every day.",
      "What I deliver is the whole cycle: understanding the problem in the " +
        "operation, mapping the process, building the solution, integrating it " +
        "with what the company already uses and measuring the result. I use AI as " +
        "an engineering tool, with Claude Code, Codex and Cursor every day, to " +
        "ship complete systems in weeks, not months.",
    ],
    facts: [
      { label: "Where", value: "São Paulo, Brazil" },
      { label: "Role", value: "Technical Product Creator" },
      { label: "Company", value: "Bannerjet Group" },
      { label: "Languages", value: "Portuguese and English" },
    ],
  },

  contact: {
    label: "Contact",
    titleLines: ["Got a process", "that could be"],
    titleAccent: "automated?",
    body:
      "I am open to development, AI and automation roles, on site in São Paulo, " +
      "remote or abroad, and to projects where AI, automation and product need to " +
      "leave the slide deck and go into production.",
    status: "Open to new opportunities",
    emailHint: "Write to me",
    availability: [
      { label: "Where", value: "São Paulo, Brazil" },
      { label: "Format", value: "On site, remote or abroad" },
      { label: "Reply", value: "Within 1 business day" },
    ],
    channelsLabel: "Channels",
    backToTop: "Back to top",
    socialsLabel: "On the web",
  },
  /* ---------- Cargo atual / feitos ----------
     A ordem dos grupos e dos itens é a MESMA do content.ts (Produtos com
     6, Automações com 12, Conteúdo técnico com 4). As `tags` ficaram em
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
          {
            title: "Bannerjet Academy",
            body:
              "Bannerjet's course platform: video modules for each equipment line, " +
              "a test at the end of every module and a certificate at the end of the " +
              "course. The test questions came from Jet IA's knowledge base and were " +
              "reviewed by a person before going live. The same knowledge that " +
              "answers customers on WhatsApp now trains people.",
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
          {
            title: "Repair stages on WhatsApp",
            body:
              "Every time a machine moves to a new stage in the lab, the customer " +
              "gets a WhatsApp message and follows the service order in the " +
              "Bannerjet app, from arrival to delivery. Nobody has to call to ask " +
              "how the machine is doing.",
          },
          {
            title: "Callbell service flows",
            body:
              "The flowchart became real service: 15 flows in Callbell, one per " +
              "equipment line, with triage, registration, step-by-step installation " +
              "and hand-off to the right technician. Over 3,000 blocks running before " +
              "anyone needs to join the conversation.",
          },
          {
            title: "AI that learns from the technicians",
            body:
              "It reads the reports of the calls handled by the technicians, turns " +
              "each one into a solved case and, after my review, adds it to Jet IA's " +
              "knowledge base. That's already 123 cases across 50 machines the AI " +
              "couldn't answer before and now can.",
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
      "This is not a prototype portfolio: every number below came straight from the " +
      "database of systems in production that the team uses every day.",
    items: [
      {
        label: "visits to the ERP and Central Técnica in 6 weeks, by 36 people",
        outcome:
          "The systems I built became the team's daily tool: opened every day, several times a day, by technicians, sales and management.",
        source: "ERP technical module · activity log",
      },
      {
        label: "questions answered by Jet IA, for 1,181 different people",
        outcome:
          "Customers on WhatsApp and employees inside the ERP get a technical answer right away, without waiting for a free technician.",
        source: "Jet IA · WhatsApp + ERP",
      },
      {
        label: "warranties migrated from the legacy system into the ERP",
        outcome:
          "Each machine's warranty history left a legacy system and is now one click away from whoever is serving the customer.",
        source: "ERP technical module · warranties",
      },
      {
        label: "blocks of technical knowledge the AI checks before answering",
        outcome:
          "The answer comes from the company itself, validated and sourced, not from whatever the model would guess. It grows with every report and manual.",
        source: "Supabase · Jet IA knowledge base",
      },
      {
        label: "products in the ERP catalogue, with photos standardised by AI",
        outcome:
          "The whole catalogue with the same professional photo standard, processed in batch, with no studio and no weeks of manual editing.",
        source: "ERP technical module · catalogue",
      },
      {
        label: "technical reports generated automatically from support conversations",
        outcome:
          "Recording each case no longer depends on someone remembering to write it, and every report teaches the AI a new case.",
        source: "ERP technical module · reports",
      },
    ],
  },

  /* Traduzido: `category`, `description`, `overview`, `highlights` e a
     `facts`. Ficaram em português as LEGENDAS DAS TELAS (`gallery[].alt`,
     que viram figcaption) e o `cover.alt` — são descrições de imagem, uma
     por print, e não couberam nesta rodada. */
  projects: [
    {
      category: "3D laser engraving viewer",
      description:
        "A 3D thermal tumbler with fiber laser engraving simulated in the browser: the artwork becomes a " +
        "brushed-steel mask over matte paint, wraps 360° around the cup and exports a laser-ready PNG.",
      overview: [
        "Anyone buying a laser-engraved tumbler wants to see the result before the machine starts. Fiber engraving removes the paint and reveals the steel, and that is hard to picture from black-and-white artwork alone.",
        "The site solves it in 3D: the artwork becomes a mask that decides, point by point, where the matte paint stays and where brushed steel shows, each with its own shine and roughness. The engraving wraps all the way around the cup, which you can spin with a finger or the mouse.",
        "Visitors can also upload their own artwork, add a line of text and download the laser file as a 400 dpi PNG, already at the cup's real size.",
      ],
      highlights: [
        { title: "Real steel and paint", body: "Three canvas-generated maps (color, metal/roughness, relief) make the engraving read as laser, with no stock photo." },
        { title: "Full 360° wrap", body: "The artwork is measured in millimetres around the real cup and spins with the model." },
        { title: "Machine-ready file", body: "The download comes out black and white, at 400 dpi and at the physical size of the engraved area." },
      ],
      facts: [
        { label: "Role", value: "Product, 3D and build" },
        { label: "Context", value: "Personal project" },
        { label: "Stack", value: "Vite · JavaScript · model-viewer · GSAP" },
        { label: "Status", value: "Live" },
      ],
    },
    {
      category: "3D can label viewer",
      description:
        "A 3D aluminium can with panoramic labels that wrap all the way around, condensation drops and a " +
        "studio to apply your own label and download the print file.",
      overview: [
        "A can label is a panoramic image: it only makes sense once it wraps. The flat file does not show where the artwork breaks, where text disappears into the curve or how the can looks on a shelf.",
        "Latinha 3D builds the can on the fly, with the label generated in a canvas, metal rims and condensation drops on top. Each theme is a full-wrap label, and the can spins to show the back.",
        "In the studio, visitors apply their own label, adjust it on the can and download the full-wrap PNG for printing.",
      ],
      highlights: [
        { title: "Full-wrap labels", body: "Each theme is a 2:1 panorama applied over 360°, like the real label." },
        { title: "Cold-can finish", body: "Aluminium rims and condensation drops make it look like a product." },
        { title: "From 3D to print", body: "The studio returns the label as a PNG at the can's size, ready to print." },
      ],
      facts: [
        { label: "Role", value: "Product, 3D and build" },
        { label: "Context", value: "Personal project" },
        { label: "Stack", value: "Vite · JavaScript · model-viewer" },
        { label: "Status", value: "Live" },
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
      category: "Custom products store with creation tools",
      description:
        "A store for stickers, Funko Pops, cake toppers and boxes where the customer creates the product in the browser: upload the image, build the sheet, design the box or the figure and close the order on WhatsApp.",
      overview: [
        "Nexus Print sells custom products: stickers, Funko Pops, busts and 3D products, cake toppers, gift boxes and school labels. In this market the customer can rarely describe what they want, and every order turned into a long exchange of messages until the artwork was right.",
        "So the store is not just a catalogue: each product line got a tool where the customer builds the item and sees the result instantly. The sticker comes out with an outline from any image, the A4 sheet arranges itself, the box appears flat with its measurements and the Funko is assembled piece by piece.",
        "At the end, the tool works out the quantity and the price from the catalogue table and sends the order ready to WhatsApp. The conversation starts with the artwork already solved.",
      ],
      highlights: [
        { title: "The customer creates, the store produces", body: "Six browser tools turn the order into finished artwork before any message." },
        { title: "Prices from the catalogue", body: "Sheets, kits and Funkos use the store's own price table, no made-up numbers on screen." },
        { title: "Checkout on WhatsApp", body: "The order summary is ready for the chat, which is how this customer already buys." },
      ],
      facts: [
        { label: "Role", value: "Product, front-end and tools" },
        { label: "Catalogue", value: "Stickers, 3D, Funko, toppers and boxes" },
        { label: "Stack", value: "React · TypeScript · Vite · Canvas" },
        { label: "Status", value: "Live" },
      ],
      features: [
        { title: "Sticker generator", body: "The customer uploads any image and the sticker comes out instantly with an outline and border, removing a white background if needed. Shape, size and border colour are picked on the same screen.", image: "/projetos/nexus-print/f-adesivos.webp" },
        { title: "Sheet builder", body: "Stickers arrange themselves on an A4 sheet, with rotate, mirror, duplicate and lock. The number of sheets sets the price from the store table.", image: "/projetos/nexus-print/f-cartelas.webp" },
        { title: "School labels", body: "Type the child's name, pick a theme and see the full label kit for lunchbox, notebook and pencils. Waterproof vinyl, ordered on WhatsApp.", image: "/projetos/nexus-print/f-etiquetas.webp" },
        { title: "Box creator", body: "Pick the model (classic, drawer, briefcase and more), enter the product measurements and the box appears flat, with every flap measured.", image: "/projetos/nexus-print/f-caixinhas.webp" },
        { title: "Cake toppers", body: "A showcase of cut and printed toppers by party theme, with name and age, and custom orders straight from the chat.", image: "/projetos/nexus-print/f-topo-de-bolo.webp" },
        { title: "Funko builder", body: "The figure is built in 3D step by step: body, hair, glasses, beard, clothes and accessory, with a spinning preview and a fixed price at the end.", image: "/projetos/nexus-print/f-funko.webp" },
      ],
    },
    {
      category: "Personal productivity system",
      description:
        "The system that runs my whole life in one place: tasks, Notion-style notes, finances, workouts with levels and XP, home stock, studies, games and hardware.",
      overview: [
        "I used six different apps for tasks, notes, spending, workouts and studies, and none of them talked to each other. Arise brings everything into one system, built around my own routine.",
        "Each area is a module: tasks by category, a block-based notes editor, finances with projections, a gym tracker with levels and XP inspired by Solo Leveling, home stock by barcode, English vocabulary, platinum games and my PC inventory.",
        "The home screen ties it all into a daily summary. Access is locked to me only, and the database is closed to the public.",
      ],
      highlights: [
        { title: "One panel for the day", body: "Tasks, calendar, finances and workouts show up together on the home screen." },
        { title: "Workouts as a game", body: "The gym levels up with XP, a weekly schedule and exercise presets." },
        { title: "Built for real use", body: "I use it every day, and each module came from a need no other app solved." },
      ],
      facts: [
        { label: "Role", value: "Product, design and build" },
        { label: "Context", value: "Personal project, daily use" },
        { label: "Stack", value: "Next.js · TypeScript · Supabase" },
        { label: "Status", value: "In use, restricted access" },
      ],
    },
    {
      category: "Roblox game",
      description:
        "My Roblox game: players build their own toy factory, print, collect and sell figures in the in-game marketplace.",
      overview: [
        "Print Your Toy is my Roblox game. Easy to explain and fun to play: you start with one printer and an empty plot and build your own toy factory.",
        "Every printed figure goes into your inventory. You can collect them, set up your own shop and list figures for other players in the game's marketplace.",
        "The interface, icons and artwork were created with AI and assembled in Roblox Studio.",
      ],
      highlights: [
        { title: "A factory that grows", body: "Printers, land and shop evolve as the player sells." },
        { title: "Collection and rarity", body: "Figures with rarity, an inventory and their own showcase." },
        { title: "Player marketplace", body: "Everyone lists and sells the figures they already own." },
      ],
      facts: [
        { label: "Role", value: "Game design, art and code" },
        { label: "Context", value: "Personal project" },
        { label: "Stack", value: "Roblox Studio · Luau" },
        { label: "Status", value: "In development" },
      ],
    },
    {
      category: "Greengrocer e-commerce",
      description:
        "Greengrocer shop with a parallax catalogue, cart, orders and an admin panel to create and edit products.",
      overview: [
        "Selling fresh produce online needs a storefront that conveys freshness and a short checkout. A plain list catalogue says nothing about what the customer will receive.",
        "HortiFácil opens with layers of leaves that move with scroll and mouse, then takes the visitor straight to the catalogue, the cart and the order. Data comes from Supabase, and without the database configured the system runs in demo mode.",
        "For the shop owner, an admin panel lets them create, edit and remove products without touching code.",
      ],
      highlights: [
        { title: "A storefront with depth", body: "Three layers of leaves react to scroll and mouse and give the first screen its personality." },
        { title: "Admin panel", body: "Create, edit and delete products from a login-protected area." },
        { title: "Works without a database", body: "Without Supabase configured, the catalogue uses sample data and checkout is simulated." },
      ],
      facts: [
        { label: "Role", value: "Product, design and implementation" },
        { label: "Context", value: "Personal project, fictional shop" },
        { label: "Stack", value: "Next.js · TypeScript · Tailwind · GSAP · Supabase" },
        { label: "Status", value: "Live" },
      ],
      cover: { alt: "HortiFácil home with layered leaves and the fruit and vegetable catalogue" },
      gallery: [
        { alt: "Home with parallax leaves" },
        { alt: "Product catalogue with a category filter" },
        { alt: "Cart with items added" },
        { alt: "Sign-in screen that leads to the admin panel" },
      ],
    },
    {
      category: "Family personal finance",
      description:
        "Finance control for the family, with accounts, instalments, category budgets, goals and annual reports, each person seeing only their own data.",
      overview: [
        "A spending spreadsheet works until the second week. For a family to really use it, tracking has to be quick to enter and make clear where the money goes.",
        "Granafy brings together a dashboard, transactions with instalments and transfers between accounts, fixed bills, budgets with alerts, goals with a calculated monthly contribution and yearly reports. Each person has their own account, and the database isolates each one's data.",
        "Sign-up is limited to approved e-mails, so the app stays restricted to the family.",
      ],
      highlights: [
        { title: "Data isolated per person", body: "Authentication and database rules make sure each user sees only their own data." },
        { title: "From entry to report", body: "Instalments, fixed bills and transfers feed the dashboard and the annual report." },
        { title: "Budget alerts", body: "The monthly limit per category shows whether it is under control, near the limit or over." },
      ],
      facts: [
        { label: "Role", value: "Product and implementation" },
        { label: "Context", value: "Personal project, family use" },
        { label: "Stack", value: "Next.js · TypeScript · Tailwind · Supabase · Recharts" },
        { label: "Status", value: "In use, restricted access" },
      ],
      cover: { alt: "Granafy dashboard with balance, monthly chart and spending by category" },
      gallery: [
        { alt: "Dashboard with balance and a six-month chart" },
        { alt: "Transactions list with filters and an instalment entry" },
        { alt: "Budgets by category with alerts" },
        { alt: "Annual report with income and expenses by month" },
      ],
    },
    {
      category: "AI agents for short-form video production",
      description:
        "A team of five Claude Code agents that takes an anime topic to a finished Short: trend, script, review, title and Remotion editing.",
      overview: [
        "Running a Shorts channel means the same cycle every week: find the topic, write, review, name and edit. Done by hand, editing becomes the bottleneck.",
        "The project splits the cycle across five agents. trend-scout finds the trending topic, script-writer writes and script-reviewer reviews, viral-titles produces title, description and tags, and video-editor assembles the video in Remotion. Two commands, /generate-short and /edit-short, tie the steps together.",
        "The voice remains mine: I record the audio, and the editor handles the rest, with a log of mistakes that must never repeat.",
      ],
      highlights: [
        { title: "One agent per step", body: "Research, script, review, title and editing are separate, each with its own rules." },
        { title: "Editing as code", body: "The video is assembled in Remotion from the recorded audio, with render and checks." },
        { title: "Memory of what went wrong", body: "Approved recipes and a list of mistakes to never repeat guide every new batch." },
      ],
      facts: [
        { label: "Role", value: "Workflow design, agents and editing" },
        { label: "Context", value: "Personal project, YouTube channel" },
        { label: "Stack", value: "Claude Code · Remotion · React · Node" },
        { label: "Status", value: "In production, evolving" },
      ],
      cover: { alt: "Otaku Mind channel with the Shorts produced by the agent team" },
      gallery: [
        { alt: "Shorts page of the Otaku Mind channel" },
        { alt: "Terminal with the generate-short command producing script and title" },
        { alt: "Remotion studio with a Short being edited" },
        { alt: "Folder with the five agents and the channel strategy" },
      ],
    },
    {
      category: "Interactive hardware inventory",
      description:
        "A page that presents my PC with data read from the machine itself, an upgrade diagnosis and a test that tells whether a game runs on that hardware.",
      overview: [
        "A spec list typed from memory tends to be wrong: WMI reports just \"RTX 3050\" and the monitor shows up only as a panel name. Anyone asking whether a PC can run a game deserves measured data, not a guess.",
        "The page uses data read from the machine through WMI and nvidia-smi and cross-checks sources to find what a single command cannot give, such as the real graphics card manufacturer and the monitor's physical size. Each component has a photo, specs and a diagnosis of what limits the machine.",
        "In the \"Does this PC run it?\" section, the visitor types a game name and the site compares the official Steam requirements with the measured hardware.",
      ],
      highlights: [
        { title: "Measured, not typed", body: "A script collects the machine inventory, and values only reach the page after being checked." },
        { title: "Upgrade diagnosis", body: "Each component points out what limits the whole and where an upgrade pays off." },
        { title: "Does this PC run it?", body: "A parser reads Steam requirements and compares CPU, GPU, memory and disk with the real hardware." },
      ],
      facts: [
        { label: "Role", value: "Data collection, product and implementation" },
        { label: "Context", value: "Personal project" },
        { label: "Stack", value: "React · TypeScript · Vite · PowerShell" },
        { label: "Status", value: "Live" },
      ],
      cover: { alt: "Hardware inventory page with the PC components and their specifications" },
      gallery: [
        { alt: "Top of the page with the first component" },
        { alt: "Graphics card with photo and specifications" },
        { alt: "Upgrade diagnosis showing what limits the machine" },
        { alt: "Does this PC run it? test showing a game result" },
      ],
    },
    {
      category: "Platinum games showcase",
      description:
        "A showcase of completed games and other media, with a Steam look, gold cards for 100% completions and progress filters.",
      overview: [
        "Finishing a game with every achievement takes work and almost nobody sees it. A spreadsheet list does not carry the feeling the game gave.",
        "The showcase uses Steam's design system: palette, typography and the blue achievement bar. Platinum titles get a gold border and glow, with the perfect-game badge redrawn in SVG. It is all plain CSS, with no animation library.",
        "Visitors can filter by platinum, in progress or all, search by name and browse other media such as anime, series, films and books.",
      ],
      highlights: [
        { title: "Looks like Steam", body: "Palette, typography and achievement bar faithful to the platform's design system." },
        { title: "Gold that means something", body: "The gold glow marks 100% achievements in games and a completed item in other media." },
        { title: "Light and accessible", body: "CSS animations, no dependency beyond React, and prefers-reduced-motion respected." },
      ],
      facts: [
        { label: "Role", value: "Design and implementation" },
        { label: "Context", value: "Personal project" },
        { label: "Stack", value: "React · TypeScript · Vite" },
        { label: "Status", value: "Live" },
      ],
      cover: { alt: "Game grid with gold cards for platinum titles, in a Steam style" },
      gallery: [
        { alt: "Games tab filtered by platinum" },
        { alt: "Games in progress with achievement bars" },
        { alt: "Searching a title in the grid" },
        { alt: "Another media tab, with completed anime" },
      ],
    },
    {
      category: "Beauty studio website",
      description:
        "A beauty studio website with a dedicated page for each professional, highlighted results and booking straight through WhatsApp.",
      overview: [
        "For a local beauty business, the site has to sell the service through images and remove friction from booking. A long form makes customers give up.",
        "The site shows the studio's results, the team with a page for each professional (bio, services and prices), a scrolling reviews strip and a ranking of the most booked services. A fixed WhatsApp button stays on screen, and the customer books in one tap.",
        "It started as the portfolio of a nail designer and grew to represent the whole studio.",
      ],
      highlights: [
        { title: "Booking without a form", body: "The fixed WhatsApp button opens the chat directly, from anywhere on the page." },
        { title: "One page per professional", body: "Each specialist has her own bio, services, prices and gallery." },
        { title: "Social proof in motion", body: "Reviews and galleries scroll by themselves and pause when the visitor hovers." },
      ],
      facts: [
        { label: "Role", value: "Design, content and implementation" },
        { label: "Context", value: "Client site, local business" },
        { label: "Stack", value: "React · TypeScript · Vite · CSS" },
        { label: "Status", value: "Live" },
      ],
      cover: { alt: "Lummier Studio home with the results highlight and the booking button" },
      gallery: [
        { alt: "Top of the home with the studio's stats" },
        { alt: "Team section with one card per professional" },
        { alt: "Reviews strip and service ranking" },
        { alt: "A professional's page with bio, services and prices" },
      ],
    },
    {
      category: "Assembly service institutional site",
      description:
        "An institutional site for a network of furniture assemblers, with two pages, one for people who bought furniture and one for retailers, both converting on WhatsApp.",
      overview: [
        "The company talks to two audiences who want different things: the customer who just bought furniture and the store that wants the network assembling for it. One page confuses both.",
        "The site separates the conversations. The home is for consumers, with an animated banner, services and a step-by-step. The partnerships page is for retail, with the challenge, the solution, the technology and the QR code on the packaging. A button in the header switches between them.",
        "Both end at the same point: direct contact through WhatsApp.",
      ],
      highlights: [
        { title: "Two audiences, two pages", body: "Consumers and retail get different messages without sharing the same screen." },
        { title: "Conversion on WhatsApp", body: "Every call to action leads to the same support channel." },
        { title: "Static and fast", body: "Next.js exported as a static site, with all copy in a single content file." },
      ],
      facts: [
        { label: "Role", value: "Design and implementation" },
        { label: "Context", value: "Institutional site, version for approval" },
        { label: "Stack", value: "Next.js · React · TypeScript · Tailwind · Motion" },
        { label: "Status", value: "Live, in approval" },
      ],
      cover: { alt: "Achei Montador home with the animated banner and the WhatsApp button" },
      gallery: [
        { alt: "Top of the home with the animated banner" },
        { alt: "Services section of the consumer page" },
        { alt: "Top of the retail partnerships page" },
        { alt: "QR code on the packaging section" },
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
        meta: "EMEFM Prof. Derville Allegretti · scholarship on grades",
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
    featuresLabel: "The tools, one by one",
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
        org: "EMEFM Prof. Derville Allegretti",
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
    intro:
      "Personal projects, from 3D in the browser to complete systems with a " +
      "database. My work at Bannerjet is under Built at Bannerjet.",
    scrollHint: "Scroll to see them all",
    cta: "See project",
    codeLabel: "Code",
    moreLabel: "More on GitHub",
    moreBody: "Studies, exercises and my first projects are all there.",
  },
};
