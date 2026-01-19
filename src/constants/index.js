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
    path: "/experience",
    name: "Experience",
  },
  {
    path: "/research",
    name: "Research",
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
    responsibility:
      "Develop websites and systems to be used by its clients and maintain current existing websites and systems.",
    techstacks: ["ReactJS", "NextJS", "Frame Motion", "ThreeJS"],
  },
  {
    role: "Software Engineer (Part-time)",
    year: "July 2024 - Sept 2024",
    company: "ConcertPal",
    responsibility:
      "Maintained and enhanced an existing Chrome extension product that compares various platforms to find the cheapest provider. During my tenure, I implemented OAuth for secure authentication, utilized a background JavaScript server with Server-Sent Events to improve API latency, and integrated Redis caching for enhanced performance.",
    techstacks: [
      "ReactJS",
      "NextJS",
      "NodeJS",
      "ExpressJS",
      "OAuth",
      "Chrome Extension",
      "Redis",
    ],
  },
  {
    role: "Software Engineer",
    year: "Oct 2024 - Jan 2025",
    company: "TTIPL(Tracks and Towers Infratech Private Limited)",
    responsibility:
      "Collaborated with designers and other developers to create new features and improve existing ones. Specifically, I worked on an internal ERP module, addressing and resolving existing bugs. I implemented S3 image upload functionality and developed new modules such as a billing system, enabling the company to bill existing vendors based on various parameters including advance amounts. Additionally, I integrated an in-app mail system using Resend for seamless communication.",
    techstacks: [
      "ReactJS",
      "NextJS",
      "Tailwindcss",
      "Prisma",
      "Supabase",
      "Resend",
      "Digital Ocean",
    ],
  },
  {
    role: "Member of technical staff",
    year: "Jan 2025 - July 2025",
    company: "Navdyut AI Tech and Research Labs Pvt. Ltd.",
    responsibility:
      "Led AI research, collaborating with universities like VIT to develop and launch a flagship fine-tuned Assamese chatbot on the 22B Mistral model, imbued with Assamese cultural awareness. This innovation garnered media attention, attracted 5,000 users with 800 active users, including paid subscribers, and secured a partnership with the Government of Assam. Navdyut AI's tools are now integral to various B2G tasks, including Assamese translation and computer vision applications, enhancing efficiency across multiple departments.",
    techstacks: [
      "ReactJS",
      "NextJS",
      "Tailwindcss",
      "Prisma",
      "Supabase",
      "Digital Ocean",
      "Rag",
      "OpenAI",
      "Vector DB",
      "TTS,",
      "Langchain",
      "LlamaIndex",
      "Pinecone",
    ],
  },
    {
    role: "Applied AI & Full Stack Engineer ",
    year: "July 2025 - present",
    company: "Astra Engineering LLC",
    responsibility: "Working with usebez.ai an ai copilot for jewelers under Astra Engineering Co ,  funded by Leap year and Macroscopic Ventures",
    techstacks: [
      "NextJS",
      "Tailwindcss",
      "Firebase",
      "OpenAI",
      "Fal",
      "Prompt Layer"
    ],
  },
];

export const projects = [
  
  {
    title : "Single Sign On",
    category: "Weekend Boredom",
    description: "A project to implement Single Sign On (SSO) for my applications, created during an entrepreneurship event in my IIM Shillong dorm because the event was so boring I couldn't stay awake. made it so that i can add auth on my projects cause doing the same auth 100 times was boring and time consuming so yeah cooked this (Betterauth and clerk didnt exist back then).",
    techstacks: ["NextJS", "Tailwind", "PSQL", "Prisma"],
    status: "active",
    link: "https://github.com/ShivaBhattacharjee/sso"
  },
  {
    title : "Image Sonification",
    category: "Research Project",
    description: "This app converts images to audio and vice versa. Sonification is the process of converting data from one form, like visual data from images, into sound.  Each pixel’s colour and position are mapped to specific audio frequencies and characteristics, creating a unique sound representation of the image.",
    techstacks: ["Reactjs", "TS" ],
    status: "active",
    link: "https://sonification.shiva.codes"
  },
  {
    title : "Object Detection",
    category: "Research Project",
    description: "A yet another dynamic object detection system for identifying objects in images, built for large datasets and high accuracy doesnt work well with electronics tho.",
    techstacks: ["Python", "YOLOv8", "Ultralytics"],
    status: "active",
    link: "https://github.com/ShivaBhattacharjee/object-detection"
  },
  {
    title : "LendChain",
    category: "Hackathon Project",
    description : "A blockchain based money lending app made using rise in hackathon won 100$ grant for this it was a great exp learning solidity and deploying my first smart contract",
    techstacks: ["Solidity", "NextJS", "Tailwind" , "Ethereum"],
    status: "active",
    link: "https://github.com/ShivaBhattacharjee/lending-blockchain"
  },
  {
    category: "Hackathon Project",
    title: "Waste Easy",
    description:
      "WasteEasy is an app to streamline waste management, focusing on classification and encouraging proper segregation with incentives. it had around 15k registred users and 1000 active users had to shut it down cause of no time and idk how to scale it to larger audience",
    techstacks: ["NextJS", "Gemini", "Mongodb", "Tailwind"],
    status: "active",
    link: "https://github.com/shivabhattacharjee/wasteeasy",
  },
  {
    category: "Side Project",
    title: "Trim",
    description:
      "Simple url shorter created to shorten phishing links it was fun pranking college friends with it.",
    techstacks: ["NextJS", "Tailwind", "MongoDb", ],
    status: "active",
    link: "https://github.com/shivabhattacharjee/trim",
  },
  {
    category : "Side Project",
    title : "Quibble",
    description : "Quibble, a content generation bot , mostly used to write my English assignments and some emails",
    techstacks : ["NextJS", "TypeScript", "Tailwind", "Gemini", "NextAuth"],
    status: "active",
    link : "https://github.com/shivabhattacharjee/quibble"
  },
  {
    category : "Side Project",
    title : "Synthia",
    description : "Synthia is a project I made during engineering day at my college because I felt like making a language. I tried to make a brain rot parser and ended up making this.",
    techstacks : ["Rust", "CLI", "Lexer", "Parser", "Interpreter"],
    status: "active",
    link : "https://github.com/shivabhattacharjee/synthia"
  },
    {
    category: "Side Project",
    title: "Animetrix",
    description:
      "Anime Trix is a full stack anime streaming / downloading site. It had around 10000 active users until it was discontinued due to legal issues. It was a great learning experience for me to learn to make an app without downtime.",
    techstacks: [
      "NextJS",
      "TypeScript",
      "MongoDB",
      "Plyr",
      "Nodemailer",
      "Tailwind",
    ],
    status: "discontinued",
    link: "https://github.com/shivabhattacharjee/animetrix-next",
  },
  {
    category : "Side Project",
    title : "Muxik",
    description : "Muxik is a music streaming and downloading platform. Made using a scrapped JioSaavn API, I created it because I couldn't afford Spotify. I shut it down because I got an internship and could finally afford Apple Music, LFG! 🔥",
    techstacks : ["Vite", "MongoDb"],
    status: "discontinued",
  },
];

export const research = [
  {
    title: "PolySpeech-HS: Multilingual Non-Autoregressive Text-to-Speech Synthesis with Hidden-State Adapters",
    category: "Speech Synthesis & Multilingual AI",
    description: "A non-autoregressive text-to-speech (TTS) multilingual synthesis framework designed to address the linguistic diversity and real-time deployment challenges of Indian languages. By deploying a unified encoder-decoder architecture paired with lightweight hidden-state adapters, PolySpeech-HS enables efficient cross-lingual generalization while preserving language-specific prosodic nuances. Achieved state-of-the-art performance with MOS of 4.30, MCD of 4.7 dB, and RTF of 0.13 across six Indian languages.",
    techstacks: ["TTS", "Non-Autoregressive", "Hidden-State Adapters", "Multilingual AI", "Indian Languages", "AMO-HSA"],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Audio, Speech and Language Processing",
    year: "2025",
    collaboration: "Vellore Institute of Technology"
  },
  {
    title: "A Novel Data-Centric Transformer Fine-Tuning: A Modular Framework for Rapid Domain Adaptation and Deployment",
    category: "Large Language Models & Domain Adaptation",
    description: "This research demonstrates a data-centric, hardware-light workflow for fine-tuning transformers that sidesteps the drawbacks of costly LLM APIs. By automatically scraping high-signal web content and converting it into Q&A pairs, we fine-tune a GPT-2-Medium model (355M parameters) in ≈7 minutes on a single RTX-3060. The resulting assistant achieves 67.3% accuracy (+34% over base model) with 1.4s median latency and $0 per call cost.",
    techstacks: ["GPT-2", "LoRA", "8-bit Adam", "Domain Adaptation", "Next.js", "Q&A Generation", "Fine-tuning"],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Computational Social Systems",
    year: "2025",
    collaboration: "Vellore Institute of Technology"
  },
  {
    title: "Fine-Tuning Mistral 22B: The First Large Language Model for Assamese Language Tasks",
    category: "Low-Resource Language Processing",
    description: "The first fine-tuned Large Language Model specifically engineered for Assamese, a low-resource Indo-Aryan language spoken by approximately 15 million individuals. Introduces AssamText-750K dataset and custom Unicode mapping system exclusively for Assamese. This pioneering work becomes the first and only Assamese LLM backed by language-specific Unicode infrastructure, achieving 20% average improvement across text generation fluency, sentiment analysis accuracy, and Assamese-to-English translation quality.",
    techstacks: ["Mistral 22B", "LoRA", "Unicode Mapping", "Assamese NLP", "Low-Resource Languages", "AssamText-750K"],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Neural Networks and Learning Systems",
    year: "2025",
    collaboration: "Vellore Institute of Technology"
  }
];

