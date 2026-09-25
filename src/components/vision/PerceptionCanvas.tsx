import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type TrackTarget = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function PerceptionCanvas({
  hostRef,
  focusRef,
}: {
  hostRef: RefObject<HTMLElement | null>;
  focusRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pointer = { x: host.clientWidth * 0.62, y: host.clientHeight * 0.42 };
    const smooth = { ...pointer };
    const box: TrackTarget = {
      x: pointer.x,
      y: pointer.y,
      w: 72,
      h: 72,
      label: "TRACK_01",
    };
    let scan = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = host;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const draw = () => {
      if (!running) return;
      const w = host.clientWidth;
      const h = host.clientHeight;
      const t = reduced ? 1 : 0.12;
      smooth.x = lerp(smooth.x, pointer.x, t);
      smooth.y = lerp(smooth.y, pointer.y, t);
      scan = (scan + (reduced ? 0 : 0.65)) % h;

      let target: TrackTarget = {
        x: smooth.x,
        y: smooth.y,
        w: 88,
        h: 88,
        label: "PTR",
      };

      const focus = focusRef.current;
      if (focus) {
        const hr = host.getBoundingClientRect();
        const fr = focus.getBoundingClientRect();
        const inside =
          pointer.x >= fr.left - hr.left - 24 &&
          pointer.x <= fr.right - hr.left + 24 &&
          pointer.y >= fr.top - hr.top - 24 &&
          pointer.y <= fr.bottom - hr.top + 24;
        if (inside) {
          target = {
            x: fr.left - hr.left + fr.width / 2,
            y: fr.top - hr.top + fr.height / 2,
            w: fr.width + 36,
            h: fr.height + 28,
            label: "SUBJECT",
          };
        }
      }

      box.x = lerp(box.x, target.x, reduced ? 1 : 0.14);
      box.y = lerp(box.y, target.y, reduced ? 1 : 0.14);
      box.w = lerp(box.w, target.w, reduced ? 1 : 0.12);
      box.h = lerp(box.h, target.h, reduced ? 1 : 0.12);
      box.label = target.label;

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(232,226,210,0.045)";
      ctx.lineWidth = 1;
      const step = 56;
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(196,176,138,0.18)";
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      if (!reduced) {
        const g = ctx.createLinearGradient(0, scan - 28, 0, scan + 28);
        g.addColorStop(0, "rgba(196,176,138,0)");
        g.addColorStop(0.5, "rgba(196,176,138,0.12)");
        g.addColorStop(1, "rgba(196,176,138,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, scan - 28, w, 56);
      }

      const x0 = box.x - box.w / 2;
      const y0 = box.y - box.h / 2;
      const x1 = box.x + box.w / 2;
      const y1 = box.y + box.h / 2;
      const c = 14;

      ctx.strokeStyle = "rgba(196,176,138,0.85)";
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(x0, y0 + c);
      ctx.lineTo(x0, y0);
      ctx.lineTo(x0 + c, y0);
      ctx.moveTo(x1 - c, y0);
      ctx.lineTo(x1, y0);
      ctx.lineTo(x1, y0 + c);
      ctx.moveTo(x1, y1 - c);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x1 - c, y1);
      ctx.moveTo(x0 + c, y1);
      ctx.lineTo(x0, y1);
      ctx.lineTo(x0, y1 - c);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(box.x - 10, box.y);
      ctx.lineTo(box.x + 10, box.y);
      ctx.moveTo(box.x, box.y - 10);
      ctx.lineTo(box.x, box.y + 10);
      ctx.stroke();

      ctx.fillStyle = "rgba(196,176,138,0.9)";
      ctx.font = "11px 'IBM Plex Mono', monospace";
      ctx.fillText(`${box.label}  ·  ${Math.round(box.w)}×${Math.round(box.h)}`, x0, y0 - 8);
      ctx.fillStyle = "rgba(139,135,124,0.95)";
      ctx.fillText(
        `x ${smooth.x.toFixed(1)}   y ${smooth.y.toFixed(1)}`,
        x0,
        y1 + 18,
      );

      raf = requestAnimationFrame(draw);
    };

    resize();
    host.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [focusRef, hostRef, reduced]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
