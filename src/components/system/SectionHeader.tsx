import { useReveal } from "@/hooks/useReveal";

export function SectionHeader({
  index,
  stage,
  title,
  aside,
}: {
  index: string;
  stage: string;
  title: string;
  aside?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal">
      <div className="section-kicker">
        <span>
          {index} / <span className="section-kicker__stage">{stage}</span>
        </span>
        <span>{aside}</span>
      </div>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}
