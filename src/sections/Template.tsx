import { SectionHeader } from "@/components/system/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

export function NewContentTemplate() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="focus" className="section" aria-labelledby="focus-title">
      <SectionHeader index="06" stage="BUILD" title="Active threads" aside="research / direction" />
      <h2 id="focus-title" className="sr-only">
        Current interests
      </h2>
      <div ref={ref} className="threads reveal">
        {/* {templateData.map((item) => (
          <article key={item.id} className="thread">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))} */}
      </div>
    </section>
  );
}
