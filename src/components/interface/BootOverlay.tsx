import { bootLines } from "@/data/content";

export function BootOverlay({
  lines,
  onSkip,
}: {
  lines: string[];
  onSkip: () => void;
}) {
  return (
    <div className="boot" role="dialog" aria-label="System initialization" aria-live="polite">
      <div className="boot__panel">
        <pre className="boot__log">
          {lines.map((line, i) => (
            <div key={`${line}-${i}`}>
              {i === 0 || line === "READY" ? <b>{line}</b> : `> ${line}`}
            </div>
          ))}
          {lines.length < bootLines.length ? <div>_</div> : null}
        </pre>
        <button type="button" className="boot__skip" onClick={onSkip}>
          Skip calibration (Enter)
        </button>
      </div>
    </div>
  );
}
