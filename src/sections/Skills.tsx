// import { skillLayers } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

export function Skills() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <SectionHeader index="05" stage="BUILD" title="Capability stack" aside="aligned to the pipeline" />
      <h2 id="stack-title" className="sr-only">
        Skills
      </h2>
      <div ref={ref} className="stack reveal">
        {/* {skillLayers.map((layer, i) => (
          <div key={layer.id} className="stack__layer">
            <div>
              <div className="stack__id">L{String(i + 1).padStart(2, "0")}</div>
              <h3 className="stack__label">{layer.label}</h3>
            </div>
            <div>
              <p className="stack__desc">{layer.description}</p>
              <div className="chip-row">
                {layer.items.map((item) => (
                  <div key={item.name} className="chip">
                    {item.name}
                    {item.note ? <small>{item.note}</small> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </section>
  );
}
