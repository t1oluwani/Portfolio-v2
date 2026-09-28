export type ProjectStatus = "complete" | "in-progress" | "research";

export type ArchitectureNode = {
  id: string;
  label: string;
  layer: string;
};

export type ArchitectureEdge = {
  from: string;
  to: string;
};

export type Project = {
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  year: string;
  domain: string;
  // stage: PipelineStage;
  summary: string;
  problem: string;
  approach: string;
  contribution: string;
  result: string;
  technologies: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  frames: Array<{
    id: string;
    caption: string;
    note: string;
    src?: string;
  }>;
  notes: string[];
};

export type TimelineEntry = {
  id: string;
  code: string;
  period: string;
  title: string;
  org: string;
  kind: "education" | "role" | "research" | "teaching";
  status: "active" | "complete" | "tbd";
  locale?: string;
  detail: string;
  tags?: string[];
};

export type SkillLayer = {
  id: string;
  label: string;
  description: string;
  items: Array<{ name: string; note?: string }>;
};

export type Interest = {
  id: string;
  title: string;
  status: string;
  text: string;
};

export type NavItem = {
  id: string;
  href: string;
  index: string;
  label: string;
  stage: string;
};
