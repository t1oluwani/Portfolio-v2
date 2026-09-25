import type { Interest, NavItem, Project, SkillLayer, TimelineEntry } from "@/types";

export const profile = {
  name: "Tioluwani Akinloye",
  nameParts: ["Tioluwani", "Akinloye"] as const,
  shortName: "T. Akinloye",
  role: "Software / AI Engineer",
  location: "Location TBD",
  statusLine: "MSc Visual Computing · Simon Fraser University",
  statement:
    "I build intelligent systems that perceive the world, form models of it, and act with intention.",
  about: [
    "I am a software and AI engineer with a focus on robotics, computer vision, and intelligent systems. The work I care about sits at the boundary between sensing and action: cameras, models, spatial structure, and the software that makes those pieces behave as one system.",
    "I am currently pursuing a Master of Visual Computing at Simon Fraser University. This site is structured like a perception stack because that is how I think about building: observe carefully, interpret with a model, construct the machinery, then close the loop.",
    "Replace this paragraph with a more personal note — background, what you are looking for next, and how you like to work. Do not leave invented biographical claims here.",
  ],
  links: {
    github: "https://github.com/t1oluwani",
    linkedin: "",
    email: "",
    resume: "",
  },
  systemId: "TA-PS-02",
};

export const navItems: NavItem[] = [
  { id: "hero", href: "#perceive", index: "01", label: "Viewport", stage: "PERCEIVE" },
  { id: "about", href: "#understand", index: "02", label: "Subject", stage: "UNDERSTAND" },
  { id: "work", href: "#build", index: "03", label: "Case files", stage: "BUILD" },
  { id: "path", href: "#path", index: "04", label: "Log", stage: "BUILD" },
  { id: "stack", href: "#stack", index: "05", label: "Stack", stage: "BUILD" },
  { id: "focus", href: "#focus", index: "06", label: "Threads", stage: "BUILD" },
  { id: "act", href: "#act", index: "07", label: "Channel", stage: "ACT" },
];

export const bootLines = [
  "SYS.BOOT  perception-stack  v2.0",
  "calibrating optical axis…",
  "loading spatial prior…",
  "mapping world frame  [origin locked]",
  "tracker online  ·  confidence gate open",
  "READY",
];

export const projects: Project[] = [
  {
    slug: "smartvision",
    code: "CS-01",
    title: "SmartVision",
    subtitle: "Interactive visual recognition playground",
    status: "complete",
    year: "—",
    domain: "Computer vision",
    stage: "perceive",
    summary:
      "A visual recognition environment for drawing handwritten digits and comparing predictions from multiple trained models.",
    problem:
      "Visual recognition is easier to understand when you can probe a model directly — draw an input, switch architectures, and inspect how each one responds.",
    approach:
      "An interactive canvas captures a handwritten digit and sends it to a Flask backend. Logistic regression, a feedforward network, and a CNN — trained with PyTorch on MNIST — return class predictions that can be compared in the same viewport.",
    contribution:
      "Sole author of the frontend, backend, model training/prediction API, and deployment wiring. Replace this line if the contribution story should be more specific.",
    result:
      "Shipped as a live playground with model switching, draw-to-predict, and local training support. Quantitative accuracy figures are not listed here until they are verified from training logs.",
    technologies: ["Vue.js", "Flask", "PyTorch", "Torchvision", "MNIST", "Canvas API"],
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
    frames: [
      {
        id: "F-01",
        caption: "Digit canvas",
        note: "Screenshot pending — drop a capture into /public/work/smartvision/",
      },
      {
        id: "F-02",
        caption: "Model compare",
        note: "Screenshot pending — show LR / FNN / CNN outputs side by side",
      },
    ],
    notes: [
      "Object-recognition (FashionMNIST) path exists in the repo as commented work, not presented as a shipped feature.",
      "Hosted training is limited by free-tier memory; local clone is required to train from scratch.",
    ],
  },
  {
    slug: "studyai",
    code: "CS-02",
    title: "StudyAI",
    subtitle: "Lecture video → transcript, questions, quizzes",
    status: "complete",
    year: "—",
    domain: "Intelligent systems",
    stage: "understand",
    summary:
      "Study software that turns a lecture video into a navigable transcript, a grounded chatbot, and generated study artifacts.",
    problem:
      "Long lecture recordings are hard to search. Students need timestamps, summaries, and a way to ask questions against the actual content of the video.",
    approach:
      "Users upload a local file or a YouTube URL. Audio is processed for transcription; the transcript stays interactive (click a phrase to seek). An OpenAI-backed chatbot answers questions with timestamps. Controls generate summaries, key points, and quizzes from the same source.",
    contribution:
      "Author of the React frontend, FastAPI backend, transcription/Q&A pipeline, and Firebase persistence. Refine this if collaborators should be credited.",
    result:
      "Working study loop for YouTube and local media, with a recorded walkthrough. Outcome metrics (latency, quiz quality, accuracy) are placeholders until measured.",
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
    frames: [
      {
        id: "F-01",
        caption: "Transcript seek",
        note: "Screenshot pending — interactive transcript aligned to the player",
      },
      {
        id: "F-02",
        caption: "Grounded Q&A",
        note: "Screenshot pending — chatbot citing timestamps",
      },
    ],
    notes: [
      "Designed for exam prep against posted lectures.",
      "API keys and Firebase credentials are local; they are not part of this site.",
    ],
  },
  {
    slug: "auralcanvas",
    code: "CS-03",
    title: "AuralCanvas",
    subtitle: "Emotion-conditioned listening from a camera",
    status: "in-progress",
    year: "—",
    domain: "Vision + interaction",
    stage: "act",
    summary:
      "An OpenCV-based system intended to read facial emotion in real time and map it onto a music playlist.",
    problem:
      "Playback is usually disconnected from the listener’s present state. A camera-facing loop could adapt a queue from observed affect — with a manual override so the model is never the only authority.",
    approach:
      "Planned pipeline: webcam face detection, emotion classification, emotion-to-playlist mapping, then local or streaming playback. History would log emotion and track so the mapping can be inspected later.",
    contribution:
      "Project owner / author. Milestone checklist in the source repo is not yet complete — do not present this as a finished product.",
    result:
      "Result pending. No accuracy, latency, or user-study numbers until they exist.",
    technologies: ["OpenCV", "Machine learning", "Webcam capture", "Playlist mapping"],
    github: "https://github.com/t1oluwani/AuralCanvas",
    architecture: {
      nodes: [
        { id: "cam", label: "Camera", layer: "sense" },
        { id: "face", label: "Face detect", layer: "sense" },
        { id: "emo", label: "Emotion cls.", layer: "model" },
        { id: "map", label: "Mood → queue", layer: "route" },
        { id: "play", label: "Playback", layer: "act" },
        { id: "log", label: "Emotion log", layer: "act" },
      ],
      edges: [
        { from: "cam", to: "face" },
        { from: "face", to: "emo" },
        { from: "emo", to: "map" },
        { from: "map", to: "play" },
        { from: "emo", to: "log" },
        { from: "play", to: "log" },
      ],
    },
    frames: [
      {
        id: "F-01",
        caption: "Live face track",
        note: "Capture pending — bounding box + emotion label on camera feed",
      },
      {
        id: "F-02",
        caption: "Queue mapping",
        note: "Capture pending — detected mood driving the next track",
      },
    ],
    notes: [
      "Treat this file as a living case study. Update status, architecture, and result as milestones close.",
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    id: "sfu",
    code: "EDU-01",
    period: "Present",
    title: "Master of Visual Computing",
    org: "Simon Fraser University",
    kind: "education",
    status: "active",
    detail:
      "Graduate study in visual computing. Coursework, lab affiliations, and thesis title to be filled in when confirmed.",
  },
  {
    id: "role-1",
    code: "ROL-01",
    period: "Dates TBD",
    title: "Role title TBD",
    org: "Organization TBD",
    kind: "role",
    status: "tbd",
    detail:
      "Placeholder. Add internships, research assistantships, or engineering roles with real dates, scope, and outcomes only.",
  },
  {
    id: "edu-prior",
    code: "EDU-00",
    period: "Dates TBD",
    title: "Prior education TBD",
    org: "Institution TBD",
    kind: "education",
    status: "tbd",
    detail:
      "Placeholder. SmartVision cites CMPUT 328 (Visual Recognition) course notes from the University of Alberta — confirm and record the actual degree here if applicable.",
  },
];

export const skillLayers: SkillLayer[] = [
  {
    id: "perceive",
    label: "Perceive",
    description: "Getting signal out of the world — images, video, and interactive capture.",
    items: [
      { name: "Computer vision", note: "digit recognition, planned emotion/face pipelines" },
      { name: "OpenCV", note: "AuralCanvas (in progress)" },
      { name: "Canvas / webcam I/O" },
      { name: "PyTorch / Torchvision" },
    ],
  },
  {
    id: "understand",
    label: "Understand",
    description: "Models and interfaces that turn raw input into a usable representation.",
    items: [
      { name: "CNNs / FNNs / logistic regression" },
      { name: "Whisper ASR" },
      { name: "LLM-backed Q&A" },
      { name: "Python" },
    ],
  },
  {
    id: "build",
    label: "Build",
    description: "The software that holds a system together.",
    items: [
      { name: "React / TypeScript" },
      { name: "Vue.js" },
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "Firebase" },
    ],
  },
  {
    id: "act",
    label: "Act",
    description: "Closing the loop — prediction, study tools, playback, deployment.",
    items: [
      { name: "Model serving APIs" },
      { name: "Interactive study tools" },
      { name: "Deployment (Render / Netlify)" },
      { name: "Git / GitHub" },
    ],
  },
];

export const interests: Interest[] = [
  {
    id: "robotics",
    title: "Robotics",
    status: "ACTIVE INTEREST",
    text: "Embodied systems that sense, plan, and move. Looking for work where perception is not a demo — it is part of a control loop. Specific labs, platforms, and papers can be listed here.",
  },
  {
    id: "vision",
    title: "Computer vision",
    status: "CORE",
    text: "From classical detection to learned recognition. Interested in spatial understanding, not only classification: geometry, tracking, and maps that a robot can use.",
  },
  {
    id: "intelligent",
    title: "Intelligent systems",
    status: "ACTIVE INTEREST",
    text: "Systems that combine models with software discipline — APIs, state, evaluation, and a human override. Prefer closed loops over isolated notebooks.",
  },
  {
    id: "spatial",
    title: "Spatial mapping",
    status: "WATCHING",
    text: "Placeholder for SLAM, reconstruction, or mapping work you want to move toward. Add the papers, datasets, or side experiments you are actually following.",
  },
];

export const contactChannels = [
  {
    id: "github",
    label: "GitHub",
    value: "t1oluwani",
    href: "https://github.com/t1oluwani",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "URL TBD",
    href: "",
  },
  {
    id: "email",
    label: "Email",
    value: "address TBD",
    href: "",
  },
  {
    id: "resume",
    label: "Resume",
    value: "file TBD",
    href: "",
  },
];
