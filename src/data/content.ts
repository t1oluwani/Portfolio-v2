import type {
  // Interest,
  NavItem,
  SkillGroup,
  TimelineEntry,
} from "@/types";

export { projects } from "@/data/projects";

export const profile = {
  name: "Tioluwani Akinloye",
  nameParts: ["Tioluwani", "Akinloye"] as const,
  aliases: "Tio / Favour",
  shortName: "Tio Akinloye",
  brandName: "Tio's Portfolio",
  titleRole: "Software · AI/ML Engineer",
  currentRole: "Graduate Student",
  currentArea: "Software & AI/ML",
  location: "Vancouver, Canada",
  origin: "Born in Nigeria, Raised in Canada",
  statusLine: "Master of Visual Computing (Incoming)\n BSc Honors Computing Science",
  statusLine1: "Master of Visual Computing",
  statusLine1Status: "(Incoming)",
  statusLine2: "BSc Honors Computing Science",
  statusLine2Status: "(Completed)",
  statement:
    "I'm a software and AI/ML engineer with a passion for intelligent systems and curious about emerging applications in integrated healthcare / biomedical fields.",
  about: [
    "I go by Tio or Favour. I'm a software developer and graduate student who is fascinated by intelligent systems, from robotics to computer vision. Lately I've also been drawn to the areas where technology meets healthcare.",
    "Outside of school and work, my hobbies reflect different aspects of my interests: reading and chess for the mind, soccer and basketball for the body, and drawing and cooking for creativity.",  ],
  links: {
    github: "https://github.com/t1oluwani",
    linkedin: "https://www.linkedin.com/in/tioluwani-akinloye-255a481b7",
    email: "akinloyetioluwani@gmail.com",
    resume: "/Tioluwani_Akinloye_Resume.pdf",
  },
};

export const navItems: NavItem[] = [
  // (remember me)
  { id: "hero", href: "#hero", index: "01", label: "Homepage" },
  { id: "about", href: "#about", index: "02", label: "Profile" },
  { id: "projects", href: "#projects", index: "03", label: "Projects" },
  {
    id: "experiences",
    href: "#experiences",
    index: "04",
    label: "Experiences",
  },
  { id: "skills", href: "#skills", index: "05", label: "Skills" },
  { id: "contact", href: "#contact", index: "06", label: "Contact" },
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
    code: "RES-02",
    period: "Sep 2026 — Present",
    title: "Research Assistant (virtual humanoid / robot models)",
    org: "Simon Fraser University",
    kind: "research",
    status: "active",
    locale: "Burnaby, BC · Hybrid",
    detail:
      "Developing virtual humanoid/robot models, joint-link simulation software, and interaction methods, following open-source design.",
    tags: [
      "Robotics",
      "Simulation",
      "Joint-link systems",
      "Software architecture",
    ],
  },
  {
    id: "sfu-ta",
    code: "TCH-02",
    period: "Sep 2026 → Present",
    title: "Teaching Assistant (CMPT 125 D100)",
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
    period: "Sep 2026 → 2028 (expected)",
    title: "Master of Visual Computing",
    org: "Simon Fraser University",
    kind: "education",
    status: "active",
    locale: "Burnaby, BC",
    detail:
      "Graduate studies in visual computing. Electives includes robotic autonomy and biomedical computer vision.",
    tags: ["Python", "PyTorch", "Computer vision", "Machine learning"],
  },
  {
    id: "scaleupmap",
    code: "DEV-02",
    period: "Feb 2025 → May 2026",
    title: "Full Stack Developer",
    org: "ScaleupMap",
    kind: "industry",
    status: "complete",
    locale: "Edmonton, AB · Remote",
    detail:
      "Built scalable full-stack features, integrated Gemini, designed relational database architectures, and improved API performance through comprehensive testing, debugging, and code reviews.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Python",
      "Gemini",
      "GCP",
    ],
  },
  {
    id: "ualberta",
    code: "EDU-01",
    period: "Sep 2022 → Apr 2025",
    title: "BSc Honors Computing Science",
    org: "University of Alberta",
    kind: "education",
    status: "complete",
    locale: "Edmonton, AB",
    detail:
      "Honors computing science. Coursework included visual recognition, AI search & planning, program analysis, models of computation, software engineering, and data structures & algorithms.",
    tags: ["PyTorch", "REST", "Docker", "Data structures"],
  },
  {
    id: "cembrowski-research",
    code: "RES-01",
    period: "Jul 2024 → Mar 2026",
    title: "Project Assistant (clinical AI & informatics)",
    org: "Prof. George S. Cembrowski · University of Alberta",
    kind: "research",
    status: "complete",
    locale: "Edmonton, AB",
    detail:
      "Analyzed LLM interpretations of seasonal and diurnal laboratory analyte variation, built a pipeline to standardize GEM 5000 calibration reports for cross-hospital assay linearity analysis, and authored reports on computer vision feasibility and video analysis.",
    tags: [
      "LLMs",
      "Clinical informatics",
      "Computer vision",
      "OpenCV",
      "PyTorch",
      "Literature review",
      "Technical writing",
    ],
  },
  {
    id: "knead",
    code: "DEV-01",
    period: "Jan 2024 → Apr 2024",
    title: "Student Software Developer",
    org: "Knead Technologies",
    kind: "industry",
    status: "complete",
    locale: "Calgary, AB · Remote",
    detail:
      "Built donation tracking dashboards, developed marketplace transaction interfaces, and collaborated in Agile sprints. Improved reliability through automated testing, technical workflows and user guides.",
    tags: ["React", "TypeScript", "Laravel", "MySQL", "Docker", "Cypress"],
  },
  {
    id: "stem",
    code: "TCH-01",
    period: "Jul 2022 → Jun 2023",
    title: "Online STEM Facilitator",
    org: "STEM Montessori Academy of Canada",
    kind: "teaching",
    status: "complete",
    locale: "Toronto, ON · Remote",
    detail:
      "Designed and taught six Python and HTML/CSS courses for approximately 100 students aged 10–18, delivering hour-long lessons tailored to beginner through advanced skill levels.",
    tags: ["Python", "HTML", "CSS", "Teaching"],
  },
  {
    id: "ubc",
    code: "EDU-00",
    period: "Sep 2020 → Apr 2022",
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

const dv = (slug: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "Python", icon: dv("python"), main: true },
      { name: "Java", icon: dv("java") },
      { name: "C", icon: dv("c") },
      { name: "PHP", icon: dv("php"), main: true },
      { name: "Racket", icon: dv("racket") },
      { name: "C++", icon: dv("cplusplus") },
      { name: "TypeScript", icon: dv("typescript"), main: true },
      { name: "Go", icon: dv("go"), main: true },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    items: [
      { name: "React", icon: dv("react"), main: true },
      { name: "Next.js", icon: dv("nextjs") },
      { name: "Node.js", icon: dv("nodejs") },
      { name: "Express", icon: dv("express") },
      // { name: "Vite", icon: dv("vite") },
      // { name: "Vue.js", icon: dv("vuejs") },
      { name: "FastAPI", icon: dv("fastapi"), main: true },
      { name: "Flask", icon: dv("flask") },
      { name: "Laravel", icon: dv("laravel"), main: true },
    ],
  },
  {
    id: "cloud-infra",
    label: "Cloud & Infrastructure",
    items: [
      { name: "Cypress", icon: dv("cypress") },
      { name: "GCP", icon: dv("googlecloud"), main: true },
      { name: "Docker", icon: dv("docker") },
      { name: "Git", icon: dv("git"), main: true },
      { name: "PostgreSQL", icon: dv("postgresql"), main: true },
      { name: "MongoDB", icon: dv("mongodb"), main: true },
      { name: "Firebase", icon: dv("firebase") },
      { name: "Supabase", icon: dv("supabase"), main: true },
    ],
  },
  {
    id: "ml-db",
    label: "ML & DB",
    items: [
      { name: "PyTorch", icon: dv("pytorch"), main: true },
      { name: "TensorFlow", icon: dv("tensorflow") },
      { name: "scikit-learn", icon: dv("scikitlearn") },
      { name: "NumPy", icon: dv("numpy"), main: true },
      { name: "OpenCV", icon: dv("opencv") },
      { name: "Gemini", icon: dv("gemini"), main: true },
      { name: "OpenAI", icon: dv("openai") },
    ],
  },
];

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
    href: "/documents/Tioluwani_Akinloye_Resume.pdf",
  },
];
