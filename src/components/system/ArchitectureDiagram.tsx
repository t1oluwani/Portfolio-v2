import { useReveal } from "@/hooks/useReveal";
import type { Project } from "@/types";

const layers = ["sense", "route", "model", "act"] as const;
const layerY: Record<string, number> = {
  sense: 52,
  route: 128,
  model: 204,
  act: 280,
};

export function ArchitectureDiagram({ project }: { project: Project }) {
  const ref = useReveal<HTMLDivElement>();
  const grouped = layers.map((layer) => ({
    layer,
    nodes: project.architecture.nodes.filter((n) => n.layer === layer),
  }));

  const positions = new Map<string, { x: number; y: number }>();
  grouped.forEach((g) => {
    g.nodes.forEach((node, i) => {
      const count = g.nodes.length;
      const x = 80 + ((720 - 80) * (i + 1)) / (count + 1);
      positions.set(node.id, { x, y: layerY[g.layer] ?? 52 });
    });
  });

  const used = grouped.filter((g) => g.nodes.length > 0);

  return (
    <div ref={ref} className="schematic reveal">
      <svg viewBox="0 0 800 340" role="img" aria-label={`${project.title} system schematic`}>
        <rect width="800" height="340" fill="#0d100f" />
        {used.map((g) => (
          <text
            key={g.layer}
            x="18"
            y={(layerY[g.layer] ?? 0) + 4}
            fill="#8a7a5e"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="10"
            letterSpacing="1.6"
          >
            {g.layer.toUpperCase()}
          </text>
        ))}
        {project.architecture.edges.map((edge) => {
          const a = positions.get(edge.from);
          const b = positions.get(edge.to);
          if (!a || !b) return null;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={a.x}
              y1={a.y + 18}
              x2={b.x}
              y2={b.y - 18}
              stroke="#6d837c"
              strokeWidth="1"
            />
          );
        })}
        {project.architecture.nodes.map((node) => {
          const p = positions.get(node.id);
          if (!p) return null;
          return (
            <g key={node.id}>
              <rect
                x={p.x - 54}
                y={p.y - 18}
                width="108"
                height="36"
                fill="#121614"
                stroke="#c4b08a"
                strokeWidth="1"
              />
              <text
                x={p.x}
                y={p.y + 4}
                textAnchor="middle"
                fill="#ebe6d8"
                fontFamily="IBM Plex Sans, sans-serif"
                fontSize="11"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
