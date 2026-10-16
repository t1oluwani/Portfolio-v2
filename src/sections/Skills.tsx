import { skillGroups } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import { useReveal } from "@/hooks/useReveal";
import type { SkillItem } from "@/types";

const byName = (a: SkillItem, b: SkillItem) => a.name.localeCompare(b.name);

function Chip({ item }: { item: SkillItem }) {
  return (
    <div className={`chip chip--skill${item.main ? " chip--main" : ""}`}>
      {item.icon ? (
        <span className="chip__icon">
          <img
            src={item.icon}
            alt=""
            loading="lazy"
            onError={(e) => {
              (e.currentTarget.parentElement as HTMLElement).style.display = "none";
            }}
          />
        </span>
      ) : null}
      {item.name}
    </div>
  );
}

export function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <SectionHeader
        index="05"
        stage="How I build"
        title="Skillset"
        aside="Tools of my trade"
      />
      <h2 id="skills-title" className="sr-only">
        Skills
      </h2>
      <div ref={ref} className="stack reveal">
        {skillGroups.map((group) => {
          const main = group.items.filter((i) => i.main).sort(byName);
          const rest = group.items.filter((i) => !i.main).sort(byName);
          return (
            <div key={group.id} className="stack__layer">
              <h3 className="stack__label" data-track="skill type">
                {group.label}
              </h3>
              <div className="chip-lines">
                {main.length > 0 && (
                  <div className="chip-row" data-track={`strong skills`}>
                    {main.map((item) => (
                      <Chip key={item.name} item={item} />
                    ))}
                  </div>
                )}
                {rest.length > 0 && (
                  <div className="chip-row" data-track={`skills`}>
                    {rest.map((item) => (
                      <Chip key={item.name} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}