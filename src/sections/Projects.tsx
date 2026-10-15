import { Link } from "react-router-dom";
import { projects } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import type { Project, ProjectStatus } from "@/types";

const statusLabel: Record<ProjectStatus, string> = {
  "complete": "Complete",
  "partially-complete": "Partially complete",
  "in-progress": "In progress",
  "on-hold": "On hold",
};

function CaseRow({ project }: { project: Project }) {
  return (
    <Link className="case-row" to={`/work/${project.slug}`}>
      <div className="case-row__code">{project.code}</div>
      <div>
        <h3 className="case-row__title">{project.title}</h3>
        <span className="spec-alias">({project.year}) {project.feature} </span>

        <p className="case-row__sub">{project.summary}</p>
      </div>
      <div className="case-row__meta">
        <span
          className={project.status === "complete" ? "pill pill--live" : "pill pill--wip"}
        >
          {statusLabel[project.status]}
        </span>
        
        <span>More Details →</span>
      </div>
    </Link>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <SectionHeader
        index="03"
        stage="What I've built"
        title="Projects"
        aside={`${String(projects.length).padStart(2, "0")} projects total`}
      />
      <h2 id="work-title" className="sr-only">
        Projects
      </h2>
      <div className="case-list">
        {featured.map((project) => (
          <CaseRow key={project.slug} project={project} data-track={`${project.title} (click to view)`} />
        ))}
      </div>
      {rest.length ? (
        <>
          <p className="archive-kicker">Additional records</p>
          <div className="case-list">
            {rest.map((project) => (
              <CaseRow key={project.slug} project={project} />
            ))}
          </div>
        </>
      ) : null}
    </section>
  );
}
