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
        <span data-track="header">
          {index} / <span className="section-kicker__stage">{stage}</span>
        </span>
        <span data-track="digest">
          {aside}
        </span>
      </div>
      <h2 className="section-title" data-track="title">
        {title}
      </h2>
    </div>
  );
}
