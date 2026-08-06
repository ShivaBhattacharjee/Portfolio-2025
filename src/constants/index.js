export const navLinks = [
  {
    path: "/",
    name: "About",
  },
  {
    path: "/projects",
    name: "Projects",
  },
  {
    path: "/hackathons",
    name: "Hacks",
  },
  {
    path: "/experience",
    name: "Experience",
  },
];

export const notableAchievements = [
  {
    title: "Smart India Hackathon",
    body: [
      { text: "Made it to " },
      { text: "SIH 2023", bold: true },
      {
        text: " in my very first semester of college. Didn't really know what I was doing but figured it out.",
      },
    ],
  },
  {
    title: "Hackathons",
    body: [
      { text: "Won " },
      { text: "5 hackathons", bold: true, href: "/hackathons" },
      { text: ", mostly building AI stuff. " },
      { text: "WasteEasy", bold: true },
      {
        text: " was probably the one I'm proudest of, a full waste-management app that uses AI-assisted waste classification, nearby disposal discovery, and a rewards loop where users earn coupons for responsible dumping. Took home ",
      },
      { text: "Rs. 30,000", bold: true },
      { text: " from ADTU and got called out as a unique tech startup at an " },
      { text: "IIM Shillong", bold: true },
      { text: " entrepreneurship event." },
    ],
    link: "https://github.com/ShivaBhattacharjee/WasteEasy",
    linkLabel: "GitHub",
  },
  {
    title: "Rise In bounty",
    body: [
      { text: "Got a bounty from " },
      { text: "Rise In", bold: true },
      { text: " for a project that lets people lend money on " },
      { text: "Ethereum", bold: true },
      { text: " and build an actual " },
      { text: "credit score on-chain", bold: true },
      {
        text: ". Built flows for issuing loans, tracking active borrows, repayments, and defaulter marking with transparent contract-backed state. No banks, just smart contracts.",
      },
    ],
    link: "https://github.com/ShivaBhattacharjee/lending-blockchain",
    linkLabel: "GitHub",
  },
  {
    title: "In the news",
    body: [
      { text: "Got featured in a " },
      { text: "national newspaper", bold: true },
      { text: " for building a " },
      { text: "fine-tuned LLM on the Assamese language", bold: true },
      {
        text: ", one of the first of its kind for a low-resource Indian language.",
      },
    ],
    link: "https://x.com/Navdyut_AI/status/1940437609744142783",
    linkLabel: "Twitter",
  },
  {
    title: "Side project at scale",
    body: [
      { text: "Built " },
      { text: "AnimeTrix", bold: true },
      { text: ", an anime streaming site, hit around " },
      { text: "15,000 users", bold: true },
      { text: " and was handling " },
      { text: "100 concurrent viewers", bold: true },
      {
        text: " at peak using web scraping and some creative infra decisions. Had to take it down after a DMCA. The repo still has ",
      },
      { text: "~190 stars", bold: true },
      { text: "." },
    ],
    link: "https://github.com/ShivaBhattacharjee/AnimeTrix-next",
    linkLabel: "GitHub",
  },
];

export const intros = [
  "Software Engineer",
  "Graphic Designer",
  "Web Developer",
  "Problem Solver",
  "Creative Thinker",
  "Coffee Addict",
  "Tech Geek",
];

export const experiences = [
  {
    role: "Software Developer Intern",
    year: "Feb 2024 - Sept 2024",
    company: "GITCS.",
    type: "Internship",
    location: "Guwahati, On-Site",
    logo: "/Company/gitcs.png",
    responsibility: [
      [
        { text: "Developed " },
        { text: "websites and systems", bold: true },
        { text: " for clients and maintained existing platforms." },
      ],
    ],
    techstacks: ["ReactJS", "NextJS", "Frame Motion", "ThreeJS"],
  },
  {
    role: "Software Engineer",
    year: "Oct 2024 - Jan 2025",
    company: "TTIPL",
    type: "Full-Time",
    location: "Hyderabad, Hybrid",
    logo: "/Company/ttipl.png",
    responsibility: [
      [
        { text: "Built " },
        { text: "internal ERP modules", bold: true },
        {
          text: " for billing, vendor, and project tracking used by construction operations.",
        },
      ],
      [
        { text: "Developed " },
        { text: "semantic project document search", bold: true },
        { text: " using " },
        {
          text: "RAG pipelines with OpenAI embeddings and vector databases",
          bold: true,
        },
        { text: " for construction drawings, BOQs, and reports." },
      ],
      [
        { text: "Optimized " },
        { text: "API performance and database queries", bold: true },
        { text: " improving internal tool response times and reliability." },
      ],
    ],
    techstacks: [
      "ReactJS",
      "NextJS",
      "Tailwindcss",
      "Prisma",
      "Supabase",
      "OpenAI",
      "Pinecone",
      "Node.js",
    ],
  },
  {
    role: "Founding Engineer",
    year: "Jan 2025 - July 2025",
    company: "Navdyut AI",
    type: "Full-Time",
    location: "Guwahati, On-Site",
    logo: "/Company/Navdyut.png",
    responsibility: [
      [
        { text: "Got deep into " },
        {
          text: "fine-tuning LLMs on low-resource Indian languages",
          bold: true,
        },
        { text: " using " },
        { text: "Unsloth", bold: true },
        { text: ", " },
        { text: "containerizing models with Docker", bold: true },
        { text: ", self-hosting them on servers, and exposing them as " },
        { text: "public APIs", bold: true },
        { text: "." },
      ],
      [
        { text: "Used the " },
        { text: "Brave Search API", bold: true },
        { text: " to give the bot " },
        { text: "real-time information", bold: true },
        { text: " from the web." },
      ],
      [
        { text: "Scaled the system to " },
        { text: "500+ users", bold: true },
        { text: " and contributed to deployments for " },
        { text: "public sector", bold: true },
        { text: " use." },
      ],
      [
        { text: "Project work was featured in " },
        { text: "regional newspapers", bold: true },
        { text: "." },
      ],
    ],
    techstacks: [
      "Mistral",
      "Unsloth",
      "Docker",
      "Langchain",
      "LlamaIndex",
      "Pinecone",
      "NextJS",
      "Tailwindcss",
      "Supabase",
      "Drizzle",
    ],
  },
  {
    role: "Software Engineer",
    year: "Jul 2025 - Apr 2026",
    company: "Bez",
    type: "Full-Time",
    location: "New York, Remote",
    logo: "/Company/Astra.png",
    logoPadding: false,
    invertLogo: true,
    responsibility: [
      [
        {
          text: "Reduced jewelry design turnaround from days to minutes by building AI agent workflows using ",
        },
        { text: "Vercel AI SDK", bold: true },
        { text: " with observability via " },
        { text: "Langfuse", bold: true },
        { text: "." },
      ],
      [
        { text: "Built an interactive jewelry design canvas using " },
        { text: "React + XYFlow", bold: true },
        {
          text: " enabling credit-gated editing and real-time agent-driven design iteration.",
        },
      ],
      [
        { text: "Developed a " },
        { text: "Redis", bold: true },
        { text: " queue pipeline generating " },
        { text: "70+ product images", bold: true },
        { text: " per client batch in " },
        { text: "under 5 minutes", bold: true },
        { text: "." },
      ],
      [
        { text: "Built a " },
        { text: "multimodal inventory search", bold: true },
        {
          text: " enabling queries by image or text, both vectorized and ranked against a ",
        },
        { text: "Milvus", bold: true },
        { text: " DB via " },
        { text: "cosine similarity", bold: true },
        { text: " with " },
        { text: "AI image tagging", bold: true },
        { text: " to enrich retrieval. Achieved " },
        { text: "sub-1.5s", bold: true },
        { text: " search across " },
        { text: "25,000+ images", bold: true },
        { text: " using " },
        { text: "gemini-embedding-2-preview", bold: true },
        { text: " and a " },
        { text: "semantic reranker", bold: true },
        { text: "." },
      ],
      [
        { text: "Built a " },
        { text: "RAG-based persistent memory system", bold: true },
        { text: " using " },
        { text: "user-scoped vector embeddings", bold: true },
        { text: " in " },
        { text: "Milvus", bold: true },
        {
          text: " to continuously learn and refine personalized jewelry design preferences across sessions. Optimized ",
        },
        { text: "ANN-based embedding retrieval to sub-80ms", bold: true },
        { text: " latency" },
      ],
      [
        { text: "Used " },
        { text: "General Translation", bold: true },
        { text: " to ship " },
        { text: "multilingual app experiences", bold: true },
        { text: " for " },
        { text: "international clients", bold: true },
        { text: "." },
      ],
      [
        {
          text: "Improved reliability and performance across microservices deployed with ",
        },
        { text: "Docker", bold: true },
        { text: ", " },
        { text: "Firebase", bold: true },
        { text: ", and " },
        { text: "GCP", bold: true },
        { text: "." },
      ],
      [
        { text: "Deployed multiple services on " },
        { text: "Cloud Run", bold: true },
        { text: " with end-to-end " },
        { text: "CI/CD", bold: true },
        { text: " pipelines managed via " },
        { text: "Coolify", bold: true },
        { text: "." },
      ],
    ],
    techstacks: [
      "Vercel AI SDK",
      "React",
      "XYFlow",
      "Redis",
      "Firebase",
      "GCP",
      "Docker",
      "Langfuse",
      "NextJS",
    ],
  },
  {
    role: "Personal goal pursuit",
    year: "Apr 2026 - Jun 2026",
    company: "Career Break",
    type: "Career Break",
    location: "Remote",
    responsibility: [
      [
        {
          text: "Built various side projects and worked as a freelance consultant for a few startups.",
        },
      ],
    ],
    techstacks: [],
  },
  {
    role: "Software Engineer",
    year: "Jul 2026 - Present",
    company: "Avenue Ticketing, Inc.",
    type: "Full-Time",
    location: "Hawaii, Remote",
    website: "https://avenueticket.com",
    logo: "/Company/avenue.png",
    logoPadding: false,
    responsibility: [
      [
        { text: "Building backend services with " },
        { text: "Hono", bold: true },
        {
          text: " for event ticketing, payments, and organizer workflows.",
        },
      ],
      [
        { text: "Integrated " },
        { text: "Meta tracking APIs", bold: true },
        {
          text: " (Conversions API / Pixel) for attribution, retargeting, and growth analytics across the funnel.",
        },
      ],
      [
        {
          text: "Shipping product features across the ticketing platform — APIs, webhooks, and real-time event flows.",
        },
      ],
    ],
    techstacks: ["Hono", "Meta CAPI", "TypeScript", "Node.js", "React", "NextJS"],
  },
];

export const projects = [
  {
    title: "Tokokino",
    category: "Side Project · Web App",
    description:
      "A client-heavy screenshot mockup generator for creating polished product visuals with browser and device frames, backgrounds, overlays, annotations, and fast export/share flows.",
    techstacks: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    status: "active",
    link: "https://tokokino.com/",
    preview: "/projects/tokokino-light.png",
    previewDark: "/projects/tokokino-dark.png",
    github: "ShivaBhattacharjee/Tokokino",
  },
  {
    title: "KeyZen",
    category: "Side Project · Web App",
    description:
      "A typing speed test built around the Keychron keyboard aesthetic with audio feedback on every keystroke. Tracks WPM, accuracy, and stats with a clean, minimal UI.",
    techstacks: ["Next.js", "TypeScript", "Motion", "Recharts"],
    status: "active",
    link: "https://keyzen.theshiva.xyz/landing",
    preview: "/projects/keyzen-light.png",
    previewDark: "/projects/keyzen.png",
    github: "ShivaBhattacharjee/KeyZen",
  },
  {
    title: "taptickit",
    category: "Open Source · npm",
    description:
      "Haptic feedback for the mobile web with zero dependencies. React, Vue, Svelte, and vanilla APIs with presets like success, warning, selection, and impact-style taps via the Vibration API.",
    techstacks: ["TypeScript", "React", "Vue", "Svelte"],
    status: "active",
    link: "https://www.npmjs.com/package/taptickit",
    illustration: "taptickit",
    github: "thor-op/taptickit",
  },
  {
    title: "Image Sonification",
    category: "Research Project · Web App",
    description:
      "Converts images to audio by mapping pixel colour and position to audio frequencies. Supports real-time playback and reverse synthesis to reconstruct images from audio.",
    techstacks: ["React", "TypeScript", "Web Audio API", "Vite"],
    status: "active",
    link: "https://sonification.shiva.codes",
    preview: "/sonification-light.png",
    previewDark: "/sonification.png",
    github: "ShivaBhattacharjee/image-sonification",
  },
];

export const hackathons = [
  {
    title: "WasteEasy",
    event: "Envision Hackathon",
    year: "2023",
    placement: "1st Place",
    college: "Assam Down Town University",
    body: [
      { text: "Built WasteEasy, a " },
      { text: "waste-management platform", bold: true },
      { text: " focused on correct segregation and easier disposal. Added " },
      { text: "AI-powered waste classification", bold: true },
      { text: ", " },
      { text: "location-aware discovery", bold: true },
      { text: " of nearby disposal points via maps, and a " },
      { text: "coupon-based incentive loop", bold: true },
      { text: " to reward responsible dumping behavior. The project won " },
      { text: "1st place at Envision Hackathon", bold: true },
      { text: " and was later recognised as a unique tech startup at an " },
      { text: "IIM Shillong", bold: true },
      { text: " entrepreneurship event." },
    ],
    techstacks: [
      "React JS",
      "Node.js",
      "MongoDB",
      "Google Maps API",
      "Gemini 1.5 Pro",
      "Python",
      "YOLO",
      "Vite",
    ],
    link: "https://github.com/ShivaBhattacharjee/WasteEasy",
  },
  {
    title: "Smart Parking for Guwahati",
    event: "Technophilia 2023",
    year: "2023",
    placement: "1st Place",
    college: "Assam Royal Global University",
    body: [
      { text: "Built a " },
      { text: "Google Maps-style smart parking platform", bold: true },
      {
        text: " for Guwahati where users can discover nearby parking spots, calculate the ",
      },
      { text: "shortest route", bold: true },
      {
        text: " to available locations, and make faster parking decisions in busy areas. Added ",
      },
      { text: "community-driven features", bold: true },
      {
        text: " like ratings, written reviews, on-ground image uploads, and complaint reporting to flag incorrect info or local issues. The ",
      },
      { text: "crowdsourced data model", bold: true },
      { text: " kept listings fresh and practical, helping the project win " },
      { text: "1st prize at Technophilia", bold: true },
      { text: "." },
    ],
    techstacks: ["React", "Node.js", "MongoDB", "Google Maps API"],
  },
  {
    title: "MediTrack Attendance",
    event: "Hack GCU",
    year: "2024",
    placement: "2nd Place",
    college: "Girijananda Chowdhury University",
    body: [
      { text: "Built a medical attendance system in a " },
      { text: "20-hour sprint", bold: true },
      {
        text: " to digitize attendance for healthcare staff and trainees. Implemented ",
      },
      { text: "rapid check-in flows", bold: true },
      {
        text: ", role-based records, and basic reporting to reduce manual entry and improve shift-level visibility. The speed of execution and practical utility secured ",
      },
      { text: "2nd prize at Hack GCU", bold: true },
      { text: "." },
    ],
    techstacks: ["React", "Node.js", "Express", "MongoDB", "Python", "OpenCV"],
  },
  {
    title: "Campus Safety App",
    event: "Code War 5.0 Hackathon",
    year: "2024",
    placement: "2nd Place",
    college: "Assam Engineering College",
    body: [
      { text: "Secured " },
      { text: "2nd position at Code War 5.0", bold: true },
      { text: " by building a campus safety app that enabled " },
      { text: "incident reporting, location-aware alerts", bold: true },
      { text: ", and faster coordination during emergencies. Built with " },
      {
        text: "Next.js 14, Google Maps API, serverless functions, and Socket.IO",
        bold: true,
      },
      { text: " for real-time updates and communication." },
    ],
    techstacks: [
      "Next.js 14",
      "Google Maps API",
      "Serverless Functions",
      "Socket.IO",
    ],
  },
  {
    title: "Real-time Space Data Terminal",
    event: "Frint Hackathon",
    year: "2025",
    placement: "3rd Place",
    college: "Assam Down Town University",
    body: [
      { text: "Won " },
      { text: "3rd position", bold: true },
      {
        text: " by building a live space intelligence dashboard that combined ",
      },
      {
        text: "Mars weather updates, ISS live tracker, near-Earth asteroid monitoring",
        bold: true,
      },
      {
        text: ", and NASA's Astronomy Picture of the Day in one terminal-style interface. Built with ",
      },
      { text: "Next.js, Three.js, and NASA Open APIs", bold: true },
      {
        text: " with real-time data refresh and interactive visual rendering.",
      },
    ],
    techstacks: ["Next.js", "Three.js", "NASA Open APIs"],
  },
  {
    title: "Smart India Hackathon",
    event: "SIH 2023",
    year: "2023",
    placement: "Qualifier",
    college: " Visvesvaraya Technological University ",
    body: [
      { text: "Qualified for " },
      { text: "SIH 2023", bold: true },
      { text: " in my " },
      { text: "very first semester", bold: true },
      {
        text: " of college. Figured it out on the fly and made it through the ",
      },
      { text: "national rounds", bold: true },
      { text: "." },
    ],
    techstacks: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Lending on Blockchain",
    event: "Rise In Bounty",
    year: "2023",
    placement: "Bounty Winner",
    college: "Assam Royal Global University",
    body: [
      { text: "Built a " },
      { text: "decentralised loan management app on Ethereum", bold: true },
      {
        text: " where users can issue loans, receive loans, repay dues, and flag defaults, all with ",
      },
      { text: "transparent on-chain records", bold: true },
      { text: ". The protocol was designed around " },
      { text: "trust-minimised lending", bold: true },
      { text: " and " },
      { text: "on-chain credit history creation", bold: true },
      { text: " without traditional intermediaries, which earned a " },
      { text: "Rise In bounty", bold: true },
      { text: "." },
    ],
    techstacks: ["Solidity", "Ethereum", "React", "Hardhat", "Web3.js"],
    link: "https://github.com/ShivaBhattacharjee/lending-blockchain",
  },
];

export const research = [
  {
    title:
      "PolySpeech-HS: Multilingual Non-Autoregressive Text-to-Speech Synthesis with Hidden-State Adapters",
    category: "Speech Synthesis & Multilingual AI",
    description:
      "A non-autoregressive text-to-speech (TTS) multilingual synthesis framework designed to address the linguistic diversity and real-time deployment challenges of Indian languages. By deploying a unified encoder-decoder architecture paired with lightweight hidden-state adapters, PolySpeech-HS enables efficient cross-lingual generalization while preserving language-specific prosodic nuances. Achieved state-of-the-art performance with MOS of 4.30, MCD of 4.7 dB, and RTF of 0.13 across six Indian languages.",
    techstacks: [
      "TTS",
      "Non-Autoregressive",
      "Hidden-State Adapters",
      "Multilingual AI",
      "Indian Languages",
      "AMO-HSA",
    ],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Audio, Speech and Language Processing",
    year: "2025",
    collaboration: "Vellore Institute of Technology",
  },
  {
    title:
      "A Novel Data-Centric Transformer Fine-Tuning: A Modular Framework for Rapid Domain Adaptation and Deployment",
    category: "Large Language Models & Domain Adaptation",
    description:
      "A data-centric, hardware-light workflow for fine-tuning transformers that sidesteps costly LLM APIs. Automatically scrapes high-signal web content and converts it into Q&A pairs to fine-tune a GPT-2-Medium model (355M parameters) in ~7 minutes on a single RTX-3060. Achieves 67.3% accuracy (+34% over base model) with 1.4s median latency and zero inference cost.",
    techstacks: [
      "GPT-2",
      "LoRA",
      "8-bit Adam",
      "Domain Adaptation",
      "Next.js",
      "Q&A Generation",
      "Fine-tuning",
    ],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Computational Social Systems",
    year: "2025",
    collaboration: "Vellore Institute of Technology",
  },
  {
    title:
      "Fine-Tuning Mistral 22B: The First Large Language Model for Assamese Language Tasks",
    category: "Low-Resource Language Processing",
    description:
      "The first fine-tuned Large Language Model specifically engineered for Assamese, a low-resource Indo-Aryan language spoken by approximately 15 million individuals. Introduces AssamText-750K dataset and custom Unicode mapping system exclusively for Assamese. This pioneering work becomes the first and only Assamese LLM backed by language-specific Unicode infrastructure, achieving 20% average improvement across text generation fluency, sentiment analysis accuracy, and Assamese-to-English translation quality.",
    techstacks: [
      "Mistral 22B",
      "LoRA",
      "Unicode Mapping",
      "Assamese NLP",
      "Low-Resource Languages",
      "AssamText-750K",
    ],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Neural Networks and Learning Systems",
    year: "2025",
    collaboration: "Vellore Institute of Technology",
  },
];
