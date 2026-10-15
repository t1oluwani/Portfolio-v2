import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function PerceptionCanvas({
  hostRef,
}: {
  hostRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let scan = 0;
    let raf = 0;
    let running = true;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth: w, clientHeight: h } = host;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(); // repaint immediately so resizing never shows a blank frame
    };

    const draw = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;

      scan = (scan + (reduced ? 0 : 0.65)) % h;
      ctx.clearRect(0, 0, w, h);

      // grid
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

      // center crosshair
      ctx.strokeStyle = "rgba(196,176,138,0.18)";
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // scanline
      if (!reduced) {
        const g = ctx.createLinearGradient(0, scan - 28, 0, scan + 28);
        g.addColorStop(0, "rgba(196,176,138,0)");
        g.addColorStop(0.5, "rgba(196,176,138,0.12)");
        g.addColorStop(1, "rgba(196,176,138,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, scan - 28, w, 56);
      }
    };

    const loop = () => {
      if (!running) return;
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    const ro = new ResizeObserver(resize);

    resize();
    io.observe(host);
    ro.observe(host);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [hostRef, reduced]);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}