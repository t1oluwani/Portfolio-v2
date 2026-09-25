import { Link } from "react-router-dom";
import { projects } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import type { ProjectStatus } from "@/types";

const statusLabel: Record<ProjectStatus, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  research: "Research",
};

export function Projects() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <SectionHeader
        index="03"
        stage="BUILD"
        title="Case files"
        aside={`${String(projects.length).padStart(2, "0")} records`}
      />
      <h2 id="work-title" className="sr-only">
        Projects
      </h2>
      <div className="case-list">
        {projects.map((project) => (
          <Link key={project.slug} className="case-row" to={`/work/${project.slug}`}>
            <div className="case-row__code">{project.code}</div>
            <div>
              <h3 className="case-row__title">{project.title}</h3>
              <p className="case-row__sub">{project.summary}</p>
            </div>
            <div className="case-row__meta">
              <span
                className={
                  project.status === "complete" ? "pill pill--live" : "pill pill--wip"
                }
              >
                {statusLabel[project.status]}
              </span>
              <span>{project.domain}</span>
              <span>Open dossier →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
