import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { projects } from "@/data/content";
import { Thumbnail } from "@/components/core/Thumbnail";
import { ArchitectureDiagram } from "@/components/core/ArchitectureDiagram";

const statusCopy = {
  complete: "Complete",
  "partially-complete": "Partially complete",
  "in-progress": "In progress",
  "on-hold": "On hold",
};

// Adjust if your route for a project page is different.
const projectPath = (slug: string) => `/projects/${slug}`;

export function ProjectPage() {
  const { slug } = useParams();

  // Hooks must run on every render, so this stays above the early return.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  if (!project) return <Navigate to="/" replace />;

  // Wraps around: last -> first, first -> last.
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const sections: { title: string; body: string; step: boolean }[] = [
    { title: "Problem", body: project.problem, step: true },
    { title: "Approach", body: project.approach, step: true },
    { title: "Result", body: project.result, step: true },
  ];
  let stepNum = 0;

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

          <div
            className="block block--card tech-section"
            data-track="tools used"
          >
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
        {sections.map(({ title, body, step }, i) => (
          <div
            key={title}
            className="block block--card"
            data-track={title.toLowerCase()}
            data-section={i + 1}
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

      {projects.length > 1 ? (
        <nav className="project-pager" aria-label="More projects">
          <Link
            className="project-pager__link project-pager__link--prev"
            to={projectPath(prev.slug)}
            data-track="previous project"
          >
            <span className="project-pager__dir">← Previous</span>
            <span className="project-pager__title">
              {prev.code} · {prev.title}
            </span>
          </Link>
          <Link
            className="project-pager__link project-pager__link--next"
            to={projectPath(next.slug)}
            data-track="next project"
          >
            <span className="project-pager__dir">Next →</span>
            <span className="project-pager__title">
              {next.code} · {next.title}
            </span>
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
