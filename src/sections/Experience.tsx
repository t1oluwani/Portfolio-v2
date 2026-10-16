import { timeline } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

import "@/styles/sections/experience.css";

export function Experience() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="experiences" className="section" aria-labelledby="experiences-title">
      <SectionHeader
        index="04"
        stage="My path so far"
        title="Timeline"
        aside="My Experiences"
      />
      <h2 id="experiences-title" className="sr-only">
        Experience
      </h2>
      <div ref={ref} className="timeline reveal">
        {timeline.map((item) => (
          <article
            key={item.id}
            data-track={`timeline-${item.id}`}
            className={[
              "timeline__item",
              item.kind === "education" ? "timeline__item--right" : "timeline__item--left",
              item.status === "active" ? "is-active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="timeline__head">
              <span>{item.period}</span>
              <span>
                {item.code} · {item.kind}
              </span>
            </div>
            <h3 className="timeline__title">{item.title}</h3>
            <p className="timeline__org">
              {item.org}
              {item.locale ? ` · ${item.locale}` : ""}
            </p>
            <p className="timeline__detail">{item.detail}</p>
            {item.tags?.length ? (
              <div className="chip-row chip-row--tight">
                {item.tags.map((tag) => (
                  <span key={tag} className="chip chip--quiet">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}