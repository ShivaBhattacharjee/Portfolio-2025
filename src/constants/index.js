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
    role: "Co-Founder and Software Engineer",
    year: "Jan 2025 - July",
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
      "OpeanAI",
      "Vector DB",
      "TTS,",
      "Langchain",
      "LlamaIndex",
      "Pinecone",
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
    description: "This app converts images to audio and back , using NASA-inspired sonification. It embeds all image data directly in the sound (Donot hear the audio with IEMS on may make you go deaf), letting you recreate the picture from just the audio file. Essentially, it's \"audio DNA\" for images!.",
    techstacks: ["Python", ],
    status: "active",
    link: "https://github.com/ShivaBhattacharjee/imagesonification"
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
    link : "https://github.com/shivabhattacharjee/muxik"
  },
];

