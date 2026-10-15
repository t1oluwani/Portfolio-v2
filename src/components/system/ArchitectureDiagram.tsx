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

  const wrapLabel = (label: string, maxLength = 24) => {
    const words = label.split(/\s+/);
    const lines: string[] = [];
    let current = "";

    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;

      if (next.length > maxLength && current) {
        lines.push(current);
        current = word;
      } else {
        current = next;
      }
    });

    if (current) lines.push(current);

    if (lines.length > 2) {
      lines.length = 2;
      lines[1] = `${lines[1].slice(0, maxLength - 1)}…`;
    }

    return lines;
  };

  return (
    <div ref={ref} className="schematic reveal">
      <svg viewBox="0 0 800 340" role="img" aria-label={`${project.title} system schematic`}>
        <defs>
          <pattern
            id="architecture-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#0d2a22"
              strokeWidth="0.6"
            />
          </pattern>

          <marker
            id="architecture-arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#20b3a2" />
          </marker>
        </defs>

        {/* Background */}
        <rect width="800" height="340" fill="#020e09" />
        <rect width="800" height="340" fill="url(#architecture-grid)" />

        {used.map((g) => (
          <text
            key={g.layer}
            x="18"
            y={(layerY[g.layer] ?? 0) + 4}
            fill="#15c5b4"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="10"
            letterSpacing="1.5"
          >
            {g.layer.toUpperCase()}
          </text>
        ))}
        {project.architecture.edges.map((edge, index) => {
          const from = positions.get(edge.from);
          const to = positions.get(edge.to);
          if (!from || !to) return null;

          const startY = from.y + 19;
          const endY = to.y - 19;
          const midY = (startY + endY) / 2;

          return (
            <path
              key={`${edge.from}-${edge.to}-${index}`}
              d={`M ${from.x} ${startY} V ${midY} H ${to.x} V ${endY}`}
              fill="none"
              stroke="#20b3a2"
              strokeWidth="1"
              strokeDasharray="4 4"
              markerEnd="url(#architecture-arrow)"
            />
          );
        })}
        {project.architecture.nodes.map((node) => {
          const p = positions.get(node.id);
          if (!p) return null;

          const lines = wrapLabel(node.label);
          const width = 108;
          const height = 36;
          const radius = 10;

          return (
            <g key={node.id}>
              <rect
                x={p.x - width / 2}
                y={p.y - height / 2}
                width={width}
                height={height}
                rx={radius}
                fill="#0a1f20"
                stroke="#24a13f"
                strokeWidth="1"
              />
              <text
                x={p.x}
                y={p.y + (lines.length === 1 ? 4 : -2)}
                textAnchor="middle"
                fill="#7dbd9b"
                fontFamily="IBM Plex Sans, sans-serif"
                fontSize="9"
              >
                {lines.map((line, i) => (
                  <tspan key={i} x={p.x} dy={i === 0 ? 0 : 11}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}