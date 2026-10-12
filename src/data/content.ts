import type { 
  // Interest, 
  NavItem, 
  // SkillLayer, 
  TimelineEntry 
} from "@/types";

export { projects } from "@/data/projects";

export const profile = {
  name: "Tioluwani Akinloye",
  nameParts: ["Tioluwani", "Akinloye"] as const,
  aliases: "Tio / Favour",
  shortName: "Tio Akinloye",
  role: "Software · AI/ML Engineer",
  location: "Vancouver, Canada",
  origin: "Born in Nigeria · Raised in Canada",
  statusLine: "Master of Visual Computing (Incoming) | BSc Honors Computing Science",
  statement:
    "I am a software and AI/ML engineer with a passion for intelligent systems and emerging applications in the integrated healthcare / biomedical field.",
  about: [
    "I go by Tio or Favour. I am a software and AI/ML engineer with interests spanning software development, quality assurance, AI/ML, robotics, and computer vision, with a particular interest in intelligent systems. I am also very interested in the intersectionality of technology and healthcare. ",
    "I am pursuing a Master of Visual Computing at Simon Fraser University (expected 2028), following an Honors BSc in Computing Science from the University of Alberta (2025). I am a dual citizen of Canada and Nigeria.",
    "Outside of school and my career, I engage in a variety of hobbies that reflect different aspects of my interests. My intellectual hobbies include reading novels and manga and playing chess; my physical hobbies include playing soccer and basketball; my creative hobbies include drawing and cooking; and my social interests include volunteering and mentoring. ",
  ],
  links: {
    github: "https://github.com/t1oluwani",
    linkedin: "https://www.linkedin.com/in/tioluwani-akinloye-255a481b7",
    email: "akinloyetioluwani@gmail.com",
    resume: "/Tioluwani_Akinloye_Resume.pdf",
  },
};

export const navItems: NavItem[] = [
  { id: "hero", href: "#hero", index: "01", label: "Viewport"},
  { id: "about", href: "#about", index: "02", label: "Subject"},
  { id: "work", href: "#work", index: "03", label: "Case files"},
  { id: "path", href: "#path", index: "04", label: "Log"},
  { id: "stack", href: "#stack", index: "05", label: "Stack"},
  { id: "focus", href: "#focus", index: "06", label: "Threads"},
  { id: "act", href: "#act", index: "07", label: "Channel"},
];

export const bootLines = [
  "SYS.BOOT  random stuff go!  v2.0",
  "calibrating optical axis…",
  "loading spatial prior…",
  "mapping world frame  [origin locked]",
  "tracker online  ·  confidence gate open",
  "READY",
];

export const timeline: TimelineEntry[] = [
  {
    id: "sfu-ra",
    code: "RES-03",
    period: "Sep 2026 — Present",
    title: "Research Assistant — virtual humanoid / robot models",
    org: "Simon Fraser University",
    kind: "research",
    status: "active",
    locale: "Burnaby, BC · Hybrid",
    detail:
      "Project 15004: experimental study with virtual humanoid/robot model development. Designing software architecture for joint-link simulation models; following open-source design/documentation practice; designing and evaluating interaction methods for testing those models.",
    tags: ["Robotics", "Simulation", "Joint-link systems", "Software architecture"],
  },
  {
    id: "sfu-ta",
    code: "TCH-02",
    period: "Sep 2026 — Present",
    title: "Teaching Assistant — CMPT 125 D100",
    org: "Simon Fraser University",
    kind: "teaching",
    status: "active",
    locale: "Burnaby, BC · Hybrid",
    detail:
      "Introduction to Computing Science and Programming I. Weekly labs, office hours, one-on-one debugging, grading, and forum support.",
    tags: ["Python", "Teaching", "Debugging", "Mentorship"],
  },
  {
    id: "sfu-msc",
    code: "EDU-02",
    period: "Sep 2026 — 2028 (expected)",
    title: "Master of Visual Computing",
    org: "Simon Fraser University",
    kind: "education",
    status: "active",
    locale: "Burnaby, BC",
    detail: "Graduate study in visual computing. Electives includes robotic autonomy and biomedical computer vision.",
    tags: ["Python", "PyTorch", "Computer vision", "Machine learning"],
  },
  {
    id: "scaleupmap",
    code: "DEV-02",
    period: "Feb 2025 — May 2026",
    title: "Full Stack Developer",
    org: "ScaleupMap",
    kind: "role",
    status: "complete",
    locale: "Edmonton, AB · Remote",
    detail:
      "Full-stack features in React, TypeScript, Go, and PostgreSQL for a platform sized for 1,000+ users. Python AI services on Google Gemini, deployed on GCP. 20+ relational schemas (DBeaver). Unit, API, and E2E tests; code review that cut redundant API calls by up to 25%.",
    tags: ["React", "Next.js", "TypeScript", "Go", "PostgreSQL", "Python", "Gemini", "GCP"],
  },
  {
    id: "ualberta",
    code: "EDU-01",
    period: "Sep 2022 — Apr 2025",
    title: "BSc Honors Computing Science",
    org: "University of Alberta",
    kind: "education",
    status: "complete",
    locale: "Edmonton, AB",
    detail:
      "Honors computing science. Coursework includes visual recognition, AI search & planning, program analysis, models of computation, software engineering, and data structures & algorithms. Faculty of Science Dean’s List (2023).",
    tags: ["PyTorch", "REST", "Docker", "Data structures"],
  },
  {
    id: "cembrowski-llm",
    code: "RES-02",
    period: "Oct 2024 — Nov 2024",
    title: "Research Assistant — clinical informatics & LLM analysis",
    org: "Prof. George S. Cembrowski · University of Alberta",
    kind: "research",
    status: "complete",
    locale: "Edmonton, AB",
    detail:
      "Independent collaboration. Large-scale literature synthesis on seasonal and diurnal variation across hematology, chemistry, and coagulation analytes. Produced a ~90-page analyte-by-analyte report comparing interpretations from multiple LLMs with complete academic references.",
    tags: ["Literature review", "LLMs", "Clinical informatics", "Technical writing"],
  },
  {
    id: "cembrowski-cv",
    code: "RES-01",
    period: "Jul 2024 — Dec 2024",
    title: "Project Assistant — clinical AI & technical consulting",
    org: "Prof. George S. Cembrowski · University of Alberta",
    kind: "research",
    status: "complete",
    locale: "Edmonton, AB",
    detail:
      "Independent collaboration on a phlebotomy-improvement initiative. Authored an 8-page consultation report on commercial software, computer-vision frameworks, model-training feasibility, and PHI-safe video-analysis workflows. Defined MVP and ideal-product requirements (inversion counting, cap-color tube identification, face blurring). Coordinated meetings with external experts.",
    tags: ["OpenCV", "PyTorch", "Computer vision", "Requirements"],
  },
  {
    id: "knead",
    code: "DEV-01",
    period: "Jan 2024 — Apr 2024",
    title: "Student Software Developer",
    org: "Knead Technologies",
    kind: "role",
    status: "complete",
    locale: "Calgary, AB · Remote",
    detail:
      "Dashboard and features (on-demand and routine donation tracking) in React (TypeScript), PHP/Laravel, Apache, and MySQL on Docker. Closed marketplace page and UI for transactions and metrics. Team of six in Agile sprints. Cypress E2E and PHPUnit; production bugs reduced by ~20%. Wrote technical and user documentation.",
    tags: ["React", "TypeScript", "Laravel", "MySQL", "Docker", "Cypress"],
  },
  {
    id: "stem",
    code: "TCH-01",
    period: "Jul 2022 — Jun 2023",
    title: "Online STEM Facilitator",
    org: "STEM Montessori Academy of Canada",
    kind: "teaching",
    status: "complete",
    locale: "Toronto, ON · Remote",
    detail:
      "Designed and taught six coding courses in Python and HTML/CSS for students aged 10–18, beginner through advanced. Hour-long lectures; about 100 students.",
    tags: ["Python", "HTML", "CSS", "Teaching"],
  },
  {
    id: "ubc",
    code: "EDU-00",
    period: "Sep 2020 — Apr 2022",
    title: "BSc Combined Major in Science",
    org: "The University of British Columbia",
    kind: "education",
    status: "complete",
    locale: "Vancouver, BC",
    detail:
      "Combined Major in Science. Relocated and continued with computing-science degree at the University of Alberta.",
    tags: ["C", "C++", "Java", "Racket", "Algorithms"],
  },
];

// export const skillLayers: SkillLayer[] = [
//   {
//     id: "perceive",
//     label: "Perceive",
//     description: "Signal from the world — images, video, graphics, and spatial structure.",
//     items: [
//       { name: "Computer vision", note: "SmartVision, clinical CV consulting" },
//       { name: "OpenCV / OpenGL" },
//       { name: "PyTorch / Torchvision" },
//       { name: "Raycasting · collision" },
//     ],
//   },
//   {
//     id: "understand",
//     label: "Understand",
//     description: "Models that turn input into something a system can use.",
//     items: [
//       { name: "CNNs / FNNs / logistic regression" },
//       { name: "Whisper ASR" },
//       { name: "Gemini / OpenAI APIs" },
//       { name: "Python · C++" },
//     ],
//   },
//   {
//     id: "build",
//     label: "Build",
//     description: "The software that holds a system together.",
//     items: [
//       { name: "React / Next.js / TypeScript" },
//       { name: "Vue.js · Flutter/Dart" },
//       { name: "FastAPI · Flask · Go · Laravel" },
//       { name: "PostgreSQL · MongoDB · Firebase · Docker" },
//     ],
//   },
//   {
//     id: "act",
//     label: "Act",
//     description: "Closing the loop — serving models, shipping product, teaching, deploying.",
//     items: [
//       { name: "REST · GCP · Cybera" },
//       { name: "Cypress · PHPUnit · JUnit" },
//       { name: "Agile / Scrum · UI/UX" },
//       { name: "Git · CI-minded testing" },
//     ],
//   },
// ];

// export const interests: Interest[] = [
//   {
//     id: "robotics",
//     title: "Robotics",
//     status: "ACTIVE — SFU",
//     text: "Project 15004: joint-link virtual models for humanoid and robot applications, plus interaction methods for those models. Looking for work where perception sits inside a control loop, not beside it.",
//   },
//   {
//     id: "vision",
//     title: "Computer vision",
//     status: "CORE",
//     text: "Visual computing MSc, CMPUT 328 visual recognition, SmartVision (digit models up to a reported 98% CNN accuracy), and clinical consulting on CV pipelines (tube ID, inversion counting, PHI-safe video).",
//   },
//   {
//     id: "intelligent",
//     title: "Intelligent systems",
//     status: "ACTIVE",
//     text: "StudyAI’s grounded lecture loop, Gemini microservices at ScaleupMap, and an undisclosed networking product that turns event encounters into follow-through. Prefer systems with APIs, state, and evaluation.",
//   },
//   {
//     id: "spatial",
//     title: "Spatial systems",
//     status: "BUILDING",
//     text: "Battlezone as a spatial sandbox: first-person transforms, raycast LOS, collision, and pathfinding agents. A step toward maps and geometry a robot could actually use.",
//   },
// ];

export const contactChannels = [
  {
    id: "email",
    label: "Email",
    value: "akinloyetioluwani@gmail.com",
    href: "mailto:akinloyetioluwani@gmail.com",
  },
  {
    id: "github",
    label: "GitHub",
    value: "t1oluwani",
    href: "https://github.com/t1oluwani",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Tioluwani Akinloye",
    href: "https://www.linkedin.com/in/tioluwani-akinloye-255a481b7",
  },
  {
    id: "resume",
    label: "Resume",
    value: "View my Resume (PDF)",
    href: "/Tioluwani_Akinloye_Resume.pdf",
  },
];
