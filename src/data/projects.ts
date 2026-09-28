import type { Project } from "@/types";

function frames(
  pairs: Array<[id: string, caption: string, note: string]>,
): Project["frames"] {
  return pairs.map(([id, caption, note]) => ({ id, caption, note }));
}

export const projects: Project[] = [
  {
    slug: "networking-startup",
    code: "CS-10",
    title: "Networking Copilot App",
    subtitle: "Undisclosed startup: event connections with a measurable follow-through",
    status: "on-hold",
    year: "2026",
    feature: "Software Process · Intelligent Systems",
    featured: true,
    summary:
      "Co-founded and led technical development of a mobile networking product: capture people you meet, keep event context, and use an LLM to draft follow-ups mapped to goals.",
    problem:
      "Students and early-career professionals collect cards, emails, and LinkedIn requests at events, then lose the thread. Follow-up is manual, context decays, and there is no sense of whether a connection moved.",
    approach:
      "Owned the pipeline end-to-end: concept validation, Figma UI/UX, architecture and UML, then a custom stack — Flutter/Dart client, FastAPI services, Supabase, Gemini, GCP — with testing and data-security constraints. Product surface: QR / quick-add capture, event-linked context, AI follow-up drafts from notes, goal mapping, suggested next actions, and event finding aligned to the user’s network.",
    contribution:
      "Co-founder and technical lead: product definition, system architecture, stack selection, and implementation leadership.",
    result:
      "Company name withheld. Public marketing site and waitlist exist; treat this dossier as the technical case, not a press page. Outcome metrics TBD.",
    technologies: [
      "Flutter",
      "Dart",
      "FastAPI",
      "Supabase",
      "Gemini API",
      "GCP",
      "Figma",
      "UML",
    ],
    architecture: {
      nodes: [
        { id: "cap", label: "QR / quick-add", layer: "sense" },
        { id: "ctx", label: "Event context", layer: "sense" },
        { id: "api", label: "FastAPI", layer: "route" },
        { id: "db", label: "Supabase", layer: "route" },
        { id: "llm", label: "Gemini drafts", layer: "model" },
        { id: "app", label: "Flutter app", layer: "act" },
      ],
      edges: [
        { from: "cap", to: "api" },
        { from: "ctx", to: "api" },
        { from: "api", to: "db" },
        { from: "api", to: "llm" },
        { from: "llm", to: "app" },
        { from: "db", to: "app" },
      ],
    },
    frames: frames([
      ["F-01", "Capture flow", "Screenshot pending — QR / quick-add of a new connection"],
      ["F-02", "Follow-up draft", "Screenshot pending — notes → suggested message"],
    ]),
    notes: [
      "Startup name intentionally withheld.",
      "More details + Landing page available upon request.",
    ],
  },
  {
    slug: "battlezone",
    code: "CS-09",
    title: "Battlezone",
    subtitle: "Atari 1980, rebuilt as a real-time OpenGL tank sim",
    status: "complete",
    year: "2026",
    feature: "3D Graphics · Pathfinding",
    featured: true,
    summary:
      "A first-person recreation of Atari Battlezone: wireframe 3D, procedural terrain, raycast combat, and enemy tanks with distinct state-machine behaviours.",
    problem:
      "The original Battlezone is a landmark in first-person spatial combat. Recreating it is a way to own the full loop — camera, world, collision, and agents — rather than wrapping a game engine’s defaults.",
    approach:
      "Python + Pygame own the window and input. PyOpenGL draws a retro vector world. Combat uses raycasting for shots and line-of-sight, blocked by obstacles. Three enemy types (Guard, Hunter, Sniper) run state machines; pathfinding uses positional correction so agents seek without overlapping. Difficulty (Easy / Normal / Hard) shifts spawn mix, count, and damage. HUD, menus, and hit-flash close the arcade loop.",
    contribution:
      "Sole author: rendering pipeline, tank controls, projectile/LOS raycasting, enemy AI, procedural world generation, and game states.",
    result:
      "Playable recreation with difficulty select, wave survival, and the three enemy archetypes documented in the repo. Screenshots from the original README belong in the frames below once copied into /public/work/battlezone/.",
    technologies: [
      "Python",
      "PyOpenGL",
      "Pygame",
      "Raycasting",
      "Collision detection",
      "AI pathfinding",
      "State machines",
    ],
    github: "https://github.com/t1oluwani/Battlezone",
    architecture: {
      nodes: [
        { id: "input", label: "Pygame loop", layer: "sense" },
        { id: "world", label: "Proc. world", layer: "sense" },
        { id: "math", label: "Raycast / collide", layer: "route" },
        { id: "ai", label: "Enemy FSM", layer: "model" },
        { id: "gl", label: "OpenGL draw", layer: "act" },
        { id: "hud", label: "HUD / states", layer: "act" },
      ],
      edges: [
        { from: "input", to: "math" },
        { from: "world", to: "math" },
        { from: "math", to: "ai" },
        { from: "ai", to: "gl" },
        { from: "math", to: "gl" },
        { from: "gl", to: "hud" },
      ],
    },
    frames: frames([
      ["F-01", "Wireframe viewport", "Screenshot pending — first-person vector battlefield"],
      ["F-02", "Enemy behaviours", "Screenshot pending — Guard / Hunter / Sniper in play"],
    ]),
    notes: [
      "Course context: CMPUT 411 (Computer Graphics), University of Alberta.",
      "Tank mesh referenced from a Thingiverse STL/OBJ; rendering and systems are custom.",
    ],
  },
  {
    slug: "smartvision",
    code: "CS-08",
    title: "SmartVision",
    subtitle: "Train, draw, and compare digit-recognition models in one viewport",
    status: "partially-complete",
    year: "2024",
    feature: "ML · PyTorch · Computer Vision",
    featured: true,
    summary:
      "A visual-recognition playground: draw a digit, then compare logistic regression, an FNN, and a CNN trained with PyTorch on MNIST.",
    problem:
      "Wanted to apply course concepts in a practical, real-world scenario, applied knowledge from static training to dynamic performance.",
    approach:
      "Vue.js canvas captures a handwritten 0–9. A Flask API exposes train / predict / clear for three PyTorch models (logistic regression, FNN, CNN) on MNIST. The UI surfaces accuracy and processing details so the architectures can be compared in the same session. FashionMNIST object recognition is specified in the repo and is not implemented.",
    contribution:
      "Sole author of frontend, Flask model-serving API, PyTorch training/inference, and Render deployment wiring.",
    result:
      "Live draw-to-predict playground. Resume-reported test accuracies: logistic regression 92%, FNN 96%, CNN 98%, with training-time optimizations. Hosted inference is constrained to logistic regression on free-tier memory; CNN/FNN training and loading are intended for local clone.",
    technologies: [
      "Vue.js",
      "Flask",
      "PyTorch",
      "Torchvision",
      "MNIST",
      "Canvas API",
      "REST",
    ],
    github: "https://github.com/t1oluwani/SmartVision",
    demo: "https://smartvisionfrontend.onrender.com/",
    architecture: {
      nodes: [
        { id: "canvas", label: "Draw canvas", layer: "sense" },
        { id: "api", label: "Flask API", layer: "route" },
        { id: "lr", label: "LogReg", layer: "model" },
        { id: "fnn", label: "FNN", layer: "model" },
        { id: "cnn", label: "CNN", layer: "model" },
        { id: "out", label: "Class / conf.", layer: "act" },
      ],
      edges: [
        { from: "canvas", to: "api" },
        { from: "api", to: "lr" },
        { from: "api", to: "fnn" },
        { from: "api", to: "cnn" },
        { from: "lr", to: "out" },
        { from: "fnn", to: "out" },
        { from: "cnn", to: "out" },
      ],
    },
    frames: frames([
      ["F-01", "Digit canvas", "Screenshot pending — drop a capture into /public/work/smartvision/"],
      ["F-02", "Model compare", "Screenshot pending — LR / FNN / CNN outputs side by side"],
    ]),
    notes: [
      "Object-recognition (FashionMNIST) is documented as not implemented.",
      "Course notes cited: CMPUT 328 Visual Recognition, University of Alberta.",
    ],
  },
  {
    slug: "studyai",
    code: "CS-07",
    title: "StudyAI",
    subtitle: "Lecture video → transcript, contextualized chatbot, summaries, quizzes",
    status: "complete",
    year: "2024",
    feature: "AI / LLMs · Video processing",
    featured: true,
    summary:
      "Study software that turns a lecture recording or YouTube URL into a seekable transcript, a content-grounded chatbot, and generated study artifacts.",
    problem:
      "Long lectures are hard to search. Students need timestamps, summaries, and a way to ask questions against the actual video rather than a generic chatbot.",
    approach:
      "React frontend + FastAPI backend + Firebase Realtime Database. Pydub/FFmpeg extract audio from a file or YouTube link. OpenAI Whisper transcribes (resume: files up to ~25 MB / ~30 minutes, ~90% transcription accuracy). An OpenAI chat model answers with timestamps, and controls generate summaries, key points, and quizzes (~95% comprehension-response accuracy as reported on the resume). Phrases in the transcript seek the player.",
    contribution:
      "Author of the React client, FastAPI routes, transcription/Q&A pipeline, and Firebase persistence.",
    result:
      "Working study loop for YouTube and local media, with a recorded walkthrough on Vimeo.",
    technologies: [
      "React",
      "FastAPI",
      "Firebase Realtime Database",
      "OpenAI Whisper",
      "OpenAI chat models",
      "Pydub",
      "FFmpeg",
    ],
    github: "https://github.com/t1oluwani/StudyAI",
    demo: "https://vimeo.com/1019093746",
    architecture: {
      nodes: [
        { id: "src", label: "Video / URL", layer: "sense" },
        { id: "audio", label: "Audio extract", layer: "sense" },
        { id: "asr", label: "Whisper ASR", layer: "model" },
        { id: "store", label: "Firebase", layer: "route" },
        { id: "qa", label: "Chat / quiz", layer: "model" },
        { id: "ui", label: "Study UI", layer: "act" },
      ],
      edges: [
        { from: "src", to: "audio" },
        { from: "audio", to: "asr" },
        { from: "asr", to: "store" },
        { from: "store", to: "qa" },
        { from: "qa", to: "ui" },
        { from: "asr", to: "ui" },
      ],
    },
    frames: frames([
      ["F-01", "Transcript seek", "Screenshot pending — clickable transcript aligned to the player"],
      ["F-02", "Grounded Q&A", "Screenshot pending — chatbot citing timestamps"],
    ]),
    notes: ["Designed for exam prep against posted lectures and youtube tutorials."],
  },
  {
    slug: "starwars-api",
    code: "CS-06",
    title: "Star Wars form + SWAPI",
    subtitle: "Own REST API plus a third-party character lookup",
    status: "complete",
    year: "2024",
    feature: "API Integration · 3rd-party APIs",
    summary:
      "A themed web app for practicing both writing an API and consuming one: form submissions in MongoDB, character records from SWAPI.",
    problem:
      "Learn the two sides of HTTP in one project: persist user-submitted records, and fetch canonical character data from SWAPI.",
    approach:
      "HTML/CSS/JS frontend. Node + Express backend. MongoDB/Mongoose stores name, email, ratings, favourite film and character. Fetch talks to SWAPI by character id. GitHub Pages hosts the static client.",
    contribution: "Sole author of form UI, Express CRUD, Mongo persistence, and SWAPI integration.",
    result: "Working form + character fetch, with a GitHub Pages client.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "SWAPI",
    ],
    github: "https://github.com/t1oluwani/StarWarsAPI",
    demo: "https://t1oluwani.github.io/StarWarsAPI/",
    architecture: {
      nodes: [
        { id: "form", label: "Theme form", layer: "sense" },
        { id: "ex", label: "Express", layer: "route" },
        { id: "mdb", label: "MongoDB", layer: "route" },
        { id: "swapi", label: "SWAPI", layer: "model" },
        { id: "ui", label: "Character view", layer: "act" },
      ],
      edges: [
        { from: "form", to: "ex" },
        { from: "ex", to: "mdb" },
        { from: "form", to: "swapi" },
        { from: "swapi", to: "ui" },
        { from: "mdb", to: "ui" },
      ],
    },
    frames: frames([
      ["F-01", "Submission form", "Screenshot pending — themed intake UI"],
      ["F-02", "SWAPI lookup", "Screenshot pending — character record by id"],
    ]),
    notes: [],
  },
  {
    slug: "restful-api",
    code: "CS-05",
    title: "Employee Management API",
    subtitle: "CRUD REST service on a Cybera Ubuntu host",
    status: "complete",
    year: "2024",
    feature: "REST API · API Deployment",
    summary:
      "A Node/Express employee API with MongoDB persistence, OpenAPI docs, and deployment on a Cybera Ubuntu instance.",
    problem:
      "Needed a complete REST surface with real CRUD, aggregates, error codes, and a deployed host.",
    approach:
      "Express routes over MongoDB. GET list sorts by tenure and returns aggregate stats (count, average years, average salary). GET/POST/PUT/PATCH/DELETE on employees. Unsupported methods return 405. Swagger/OpenAPI documents the contract. Deployed on Cybera with IPv6 networking.",
    contribution: "Sole author of the API, documentation, and Ubuntu/Cybera deployment.",
    result:
      "Deployed employee management API with interactive docs. Treat the host as potentially ephemeral; GitHub is the durable record.",
    technologies: ["Node.js", "Express.js", "MongoDB", "OpenAPI", "Ubuntu", "Cybera"],
    github: "https://github.com/t1oluwani/restfulAPI",
    architecture: {
      nodes: [
        { id: "http", label: "HTTP client", layer: "sense" },
        { id: "ex", label: "Express", layer: "route" },
        { id: "mdb", label: "MongoDB", layer: "route" },
        { id: "docs", label: "OpenAPI", layer: "act" },
        { id: "crud", label: "CRUD + stats", layer: "act" },
      ],
      edges: [
        { from: "http", to: "ex" },
        { from: "ex", to: "mdb" },
        { from: "ex", to: "docs" },
        { from: "mdb", to: "crud" },
      ],
    },
    frames: frames([
      ["F-01", "OpenAPI surface", "Screenshot pending — /docs endpoint"],
      ["F-02", "List + aggregates", "Screenshot pending — employees sorted with stats"],
    ]),
    notes: [],
  },
  
  {
    slug: "sprint",
    code: "CS-04",
    title: "Sprint",
    subtitle: "Agile user-story board for Scrum-style planning",
    status: "complete",
    year: "2024",
    feature: "Agile / Scrum Methodology",
    summary:
      "A lightweight web app for tracking user stories: status, priority, and story points aligned with Agile/Scrum planning.",
    problem:
      "Small teams still need a simple place to capture stories, rank them, and see the board without standing up a full Jira.",
    approach:
      "HTML/CSS/JS (with Python listed among project skills) and Scrum-oriented UX: story records, priority, story-point difficulty, and an interface meant to be adopted quickly. GitHub Pages hosts the live board. Later ideas in the README (auth, orgs, realtime chat) are not claimed as shipped.",
    contribution:
      "Team project (Knead team GitHub org). Personal work covered UI/UX, story tracking, and Agile planning practices as listed on the portfolio source material.",
    result: "Public board at GitHub Pages. Collaborative/login features remain listed as future work.",
    technologies: ["HTML", "CSS", "JavaScript", "Python", "Scrum", "UI/UX"],
    github: "https://github.com/t1oluwani/Sprint",
    demo: "https://kneadteam.github.io/Sprint/",
    architecture: {
      nodes: [
        { id: "story", label: "User stories", layer: "sense" },
        { id: "prio", label: "Priority / points", layer: "route" },
        { id: "board", label: "Board UI", layer: "act" },
      ],
      edges: [
        { from: "story", to: "prio" },
        { from: "prio", to: "board" },
      ],
    },
    frames: frames([
      ["F-01", "Story board", "Screenshot pending — status and priority columns"],
      ["F-02", "Story points", "Screenshot pending — difficulty assignment"],
    ]),
    notes: ["Live client: kneadteam.github.io/Sprint"],
  },
  {
    slug: "word-games",
    code: "CS-03",
    title: "Word Games",
    subtitle: "Terminal Wordle + Hangman on a shared class hierarchy",
    status: "complete",
    year: "2023",
    feature: "Abstraction · Polymorphism",
    summary:
      "Python word games that share structure through inheritance, abstraction, and polymorphism, Wordle and Hangman from one object model.",
    problem:
      "Two related games should not duplicate control flow. The design problem is a common type hierarchy, not two scripts.",
    approach:
      "Terminal UI in Python. Shared abstractions for words, scoring, and play-again flow. Wordle and Hangman as specializations. Word lists loaded from file (including a filtered dictionary).",
    contribution: "Sole author of the object model and both game loops.",
    result:
      "Playable terminal Wordle and Hangman. README still lists GUI, stats, and category packs as future work — not presented as done.",
    technologies: ["Python", "OOP", "Polymorphism", "Abstraction", "Control flow", "Terminal UI"],
    github: "https://github.com/t1oluwani/Word-Games-App",
    architecture: {
      nodes: [
        { id: "lex", label: "Word lists", layer: "sense" },
        { id: "base", label: "Game ABC", layer: "model" },
        { id: "w", label: "Wordle", layer: "act" },
        { id: "h", label: "Hangman", layer: "act" },
      ],
      edges: [
        { from: "lex", to: "base" },
        { from: "base", to: "w" },
        { from: "base", to: "h" },
      ],
    },
    frames: frames([
      ["F-01", "Wordle round", "Screenshot pending — terminal Wordle"],
      ["F-02", "Hangman round", "Screenshot pending — shared hierarchy in play"],
    ]),
    notes: [],
  },
  {
    slug: "budget-app",
    code: "CS-02",
    title: "Budget App",
    subtitle: "Expense tracker with OOP, TDD, and JSON persistence",
    status: "complete",
    year: "2021",
    feature: "TDD · OOP · Data Persistence",
    summary:
      "A personal finance tracker aimed at first-income users: inflows, outflows, categories, budgets, and save/load.",
    problem:
      "Solve a problem you have using Java, OOP, and TDD, while maintaining code quality, a GUI, and data persistence.",
    approach:
      "Java application (CPSC 210 lineage) with TDD (JUnit), JSON serialization, and an object model for transactions, categories, and budgets. Features: record income/expense/transfers, categorize, custom budget limits, warnings near/over budget or when spending exceeds earning, and encouraging copy based on balance range. Graphs, regression forecasts, multi-currency, and accounts were listed as TODO in the source README.",
    contribution: "Sole author of the feature model, persistence, tests, and UI for the shipped stories.",
    result:
      "Working tracker with JSON save/load and support for near unlimited transactions, with local data storage.",
    technologies: ["Java", "OOP", "JUnit", "TDD", "JSON persistence", "Git"],
    github: "https://github.com/t1oluwani/Budget-App",
    architecture: {
      nodes: [
        { id: "tx", label: "Transactions", layer: "sense" },
        { id: "cat", label: "Categories", layer: "model" },
        { id: "json", label: "JSON save/load", layer: "route" },
        { id: "ui", label: "Tracker UI", layer: "act" },
      ],
      edges: [
        { from: "tx", to: "cat" },
        { from: "cat", to: "json" },
        { from: "json", to: "ui" },
        { from: "cat", to: "ui" },
      ],
    },
    frames: frames([
      ["F-01", "Balance overview", "Screenshot pending — income, expenses, budget headroom"],
      ["F-02", "Persistence", "Screenshot pending — save / load round-trip"],
    ]),
    notes: ["Tests were written before functionality was implemented."],
  },
  {
    slug: "frogg-site",
    code: "CS-01",
    title: "Frogg-site",
    subtitle: "First ever web project: facts, quiz, and a Frogger game using HTML5 Canvas",
    status: "complete",
    year: "2019",
    feature: "Web development",
    summary:
      "A three-tab site for teens: amphibian facts, a quiz, and a mini Frogger game, my first coding project, later improved with better HTML/CSS/JS practice.",
    problem:
      "Leverage my new knowledge of HTML/CSS/JS to make an interactive site (The game was just a challenge since I finished early).",
    approach:
      "Static HTML/CSS/JS with DOM events, a quiz, and HTML5 Canvas for Frogger. Hosted on GitHub Pages. Animation polish and a closer Frogger likeness remain on the task list in the README.",
    contribution: "Sole author; original high-school project later revised.",
    result: "Public three-tab experience on GitHub Pages.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "DOM",
      "HTML5 Canvas",
      "UI/UX",
    ],
    github: "https://github.com/t1oluwani/Frogg-site",
    demo: "https://t1oluwani.github.io/Frogg-site/",
    architecture: {
      nodes: [
        { id: "info", label: "Facts tab", layer: "sense" },
        { id: "quiz", label: "Quiz", layer: "model" },
        { id: "game", label: "Canvas Frogger", layer: "act" },
      ],
      edges: [
        { from: "info", to: "quiz" },
        { from: "quiz", to: "game" },
      ],
    },
    frames: frames([
      ["F-01", "Info + quiz", "Screenshot pending — facts tab and quiz"],
      ["F-02", "Frogger", "Screenshot pending — canvas game"],
    ]),
    notes: ["First coding project, later rewritten with tighter front-end practice."],
  },
];
