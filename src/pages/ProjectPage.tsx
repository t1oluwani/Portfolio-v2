import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "@/data/content";
import { Thumbnail } from "@/components/system/Thumbnail";
import { ArchitectureDiagram } from "@/components/system/ArchitectureDiagram";

const statusCopy = {
  complete: "Complete",
  "partially-complete": "Partially complete",
  "in-progress": "In progress",
  "on-hold": "On hold",
};

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  const sections: { title: string; body: string; step: boolean }[] = [
    { title: "Problem", body: project.problem, step: true },
    { title: "Approach", body: project.approach, step: true },
    { title: "Result", body: project.result, step: true },
    { title: "Contribution", body: project.contribution, step: false },
  ];
  let stepNum = 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  return (
    <article className="project-page" key={project.slug}>
      <div className="project-page__nav">
        <Link to="/#projects">← Case files</Link>
        <span data-track="project status">
          {project.code} · {statusCopy[project.status]}
        </span>
      </div>

      <p className="hero__status project-page__kicker" data-track="year">
        {project.year}
      </p>
      <h1 className="project-page__title" data-track="title">
        {project.title}
      </h1>
      <p
        className="hero__statement project-page__lede"
        data-track="short description"
      >
        {project.subtitle}
      </p>

      <div className="project-split">
        <div className="project-split__left">
          <div className="hero__actions project-page__actions">
            {project.github ? (
              <a
                className="btn btn--solid"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            ) : null}
            {project.demo ? (
              <a
                className="btn"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                {project.demotype ? `View ${project.demotype}` : "View Demo"}
              </a>
            ) : null}
          </div>

          <div className="block block--card" data-track="tools used">
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
        </div>

        <Thumbnail slug={project.slug} title={project.title} />
      </div>

      <div className="project-grid">
        {sections.map(({ title, body, step }) => (
          <div
            key={title}
            className="block block--card"
            data-track={title.toLowerCase()}
          >
            <h2>
              <span className="block__num">
                {step ? String(++stepNum).padStart(2, "0") : "**"}
              </span>
              {title}
            </h2>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <div className="block block--card block--spaced" data-track="diagram">
        <h2>System Architecture</h2>
        <ArchitectureDiagram project={project} />
      </div>

      {project.notes.length ? (
        <ul className="notes" data-track="worth noting">
          {project.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}