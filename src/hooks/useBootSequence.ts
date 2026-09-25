import { useCallback, useEffect, useRef, useState } from "react";
import { bootLines } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SESSION_KEY = "ta-ps-booted";

export function useBootSequence() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const skipped = useRef(false);

  useEffect(() => {
    if (reduced || sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }
    setVisible(true);
  }, [reduced]);

  const finish = useCallback(() => {
    if (skipped.current) return;
    skipped.current = true;
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (lineIndex >= bootLines.length) {
      const t = window.setTimeout(finish, 420);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setLineIndex((n) => n + 1), lineIndex === 0 ? 280 : 420);
    return () => window.clearTimeout(t);
  }, [visible, lineIndex, finish]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, finish]);

  return {
    visible,
    lines: bootLines.slice(0, lineIndex),
    skip: finish,
  };
}
