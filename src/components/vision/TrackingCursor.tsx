import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SELECTOR = "[data-track], a[href], button:not(:disabled)";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const topTextColor = "rgba(5, 250, 29, 0.95)";
const crosshairColor = "rgba(0, 183, 255, 0.85)";
const bottomTextColor = "rgba(5, 245, 213, 0.95)";

function labelFor(el: Element) {
  const t = (el as HTMLElement).dataset.track;
  if (t) return t.toUpperCase();
  return el.tagName === "A" ? "CLICK ME!" : "LOCKED";
}

function findTarget(px: number, py: number) {
  let best: { rect: DOMRect; label: string; area: number } | null = null;
  for (const el of document.querySelectorAll(SELECTOR)) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const pad = el.hasAttribute("data-track") ? 24 : 10;
    if (
      px >= r.left - pad &&
      px <= r.right + pad &&
      py >= r.top - pad &&
      py <= r.bottom + pad
    ) {
      const area = r.width * r.height;
      if (!best || area < best.area)
        best = { rect: r, label: labelFor(el), area };
    }
  }
  return best;
}

export function TrackingCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    // Mouse/trackpad only; touch has no hover position to track.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const box = { x: 0, y: 0, w: 88, h: 88, label: "TGT" };
    let alpha = 0;
    let targetAlpha = 0;
    let seen = false;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!seen) {
        // first move: appear at the pointer instead of flying in from 0,0
        smooth.x = box.x = pointer.x;
        smooth.y = box.y = pointer.y;
        seen = true;
      }
      targetAlpha = 1;
    };
    const onLeave = () => {
      targetAlpha = 0;
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      alpha = lerp(alpha, targetAlpha, reduced ? 1 : 0.18);
      if (alpha < 0.01) {
        raf = requestAnimationFrame(draw);
        return;
      }

      smooth.x = lerp(smooth.x, pointer.x, reduced ? 1 : 0.12);
      smooth.y = lerp(smooth.y, pointer.y, reduced ? 1 : 0.12);

      // Recomputed every frame so the lock follows the element while scrolling.
      const hit = findTarget(pointer.x, pointer.y);
      const target = hit
        ? {
            x: hit.rect.left + hit.rect.width / 2,
            y: hit.rect.top + hit.rect.height / 2,
            w: hit.rect.width + (hit.label === "ME" ? 36 : 16),
            h: hit.rect.height + (hit.label === "ME" ? 28 : 12),
            label: hit.label === "ME" ? "THE GOAT" : hit.label,
          }
        : { x: smooth.x, y: smooth.y, w: 88, h: 88, label: "TGT" };

      box.x = lerp(box.x, target.x, reduced ? 1 : 0.14);
      box.y = lerp(box.y, target.y, reduced ? 1 : 0.14);
      box.w = lerp(box.w, target.w, reduced ? 1 : 0.12);
      box.h = lerp(box.h, target.h, reduced ? 1 : 0.12);
      box.label = target.label;

      const x0 = box.x - box.w / 2;
      const y0 = box.y - box.h / 2;
      const x1 = box.x + box.w / 2;
      const y1 = box.y + box.h / 2;
      const c = 14;

      ctx.globalAlpha = alpha;
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 1.25;

      // corner brackets
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

      // center crosshair
      ctx.beginPath();
      ctx.moveTo(box.x - 10, box.y);
      ctx.lineTo(box.x + 10, box.y);
      ctx.moveTo(box.x, box.y - 10);
      ctx.lineTo(box.x, box.y + 10);
      ctx.stroke();

      // readouts, clamped so they never clip at the viewport edges
      ctx.font = "11px 'IBM Plex Mono', monospace";
      const lx = Math.min(Math.max(x0, 8), w - 140);
      ctx.fillStyle = topTextColor;
      ctx.fillText(
        `${box.label}  ·  ${Math.round(box.w)}×${Math.round(box.h)}`,
        lx,
        Math.max(y0 - 8, 14),
      );
      ctx.fillStyle = bottomTextColor;
      ctx.fillText(
        `x ${pointer.x.toFixed(0)}   y ${pointer.y.toFixed(0)}`,
        lx,
        Math.min(y1 + 18, h - 6),
      );
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <canvas ref={canvasRef} className="tracking-cursor" aria-hidden="true" />
  );
}
