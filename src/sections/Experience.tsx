import { timeline } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

export function Experience() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="path" className="section" aria-labelledby="path-title">
      <SectionHeader index="04" stage="BUILD" title="Mission log" aside="education / roles" />
      <h2 id="path-title" className="sr-only">
        Experience
      </h2>
      <div ref={ref} className="timeline reveal">
        {timeline.map((item) => (
          <article
            key={item.id}
            className={`timeline__item${item.status === "active" ? " is-active" : ""}`}
          >
            <div className="timeline__head">
              <span>
                {item.code} · {item.kind}
              </span>
              <span>{item.period}</span>
            </div>
            <h3 className="timeline__title">{item.title}</h3>
            <p className="timeline__org">{item.org}</p>
            <p className="timeline__detail">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
