import { Link, Navigate, useParams } from "react-router-dom";
import { projects } from "@/data/content";
import { ArchitectureDiagram } from "@/components/system/ArchitectureDiagram";
import { CaptureFrame } from "@/components/system/CaptureFrame";
import { useEffect } from "react";

// "complete" | "partially-complete" | "in-progress" | "on-hold";

const statusCopy = {
  "complete": "Complete",
  "partially-complete": "Partially complete",
  "in-progress": "In progress",
  "on-hold": "On hold"
};

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <article className="project-page">
      <div className="project-page__nav">
        <Link to="/#work">← Case files</Link>
        <span>
          {project.code} · {statusCopy[project.status]}
        </span>
      </div>
      <p className="hero__status project-page__kicker">
        {project.featured} · {project.year}
      </p>
      <h1 className="project-page__title">{project.title}</h1>
      <p className="hero__statement project-page__lede">{project.subtitle}</p>
      <div className="hero__actions project-page__actions">
        {project.github ? (
          <a className="btn btn--solid" href={project.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        ) : null}
        {project.demo ? (
          <a className="btn" href={project.demo} target="_blank" rel="noreferrer">
            Demo / recording
          </a>
        ) : null}
      </div>

      <div className="project-grid">
        <div className="block">
          <h2>Problem</h2>
          <p>{project.problem}</p>
        </div>
        <div className="block">
          <h2>Approach</h2>
          <p>{project.approach}</p>
        </div>
        <div className="block">
          <h2>Contribution</h2>
          <p>{project.contribution}</p>
        </div>
        <div className="block">
          <h2>Result</h2>
          <p>{project.result}</p>
        </div>
      </div>

      <div className="block block--spaced">
        <h2>System schematic</h2>
        <ArchitectureDiagram project={project} />
      </div>

      <div className="block block--spaced">
        <h2>Technologies</h2>
        <table className="tech-table">
          <tbody>
            {project.technologies.map((tech, i) => (
              <tr key={tech}>
                <td>T{String(i + 1).padStart(2, "0")}</td>
                <td>{tech}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="frames">
        {project.frames.map((frame) => (
          <CaptureFrame key={frame.id} frame={frame} slug={project.slug} />
        ))}
      </div>

      {project.notes.length ? (
        <ul className="notes">
          {project.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
