export type ProjectStatus = "complete" | "partially-complete" | "in-progress" | "on-hold";

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
  feature: string;
  // stage: PipelineStage;
  summary: string;
  problem: string;
  approach: string;
  result: string;
  technologies: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
  demotype?: string;
  architecture: {
    nodes: ArchitectureNode[];
    edges: ArchitectureEdge[];
  };
  notes: string[];
};

export type TimelineEntry = {
  id: string;
  code: string;
  period: string;
  title: string;
  org: string;
  kind: "education" | "industry" | "research" | "teaching";
  status: "active" | "complete" | "tbd";
  locale?: string;
  detail: string;
  tags?: string[];
};

export type SkillItem = { name: string; icon?: string; main?: boolean };

export type SkillGroup = {
  id: string;
  label: string;
  items: SkillItem[];
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
};
