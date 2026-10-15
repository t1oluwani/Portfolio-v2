import { useRef, useState, useEffect } from "react";
import { profile } from "@/data/content";
import { PerceptionCanvas } from "@/components/vision/PerceptionCanvas";
import { BootOverlay } from "@/components/vision/BootOverlay";
import { useBootSequence } from "@/hooks/useBootSequence";
import { useVisitorInfo, fmtReadout } from "@/hooks/useVisitorInfo";
import { Mail, Download } from "lucide-react";


function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export function Hero() {
  const hostRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLHeadingElement>(null);
  const boot = useBootSequence();
  const clock = useClock();
  const visitor = useVisitorInfo();

  const origin = visitor?.city
    ? `${visitor.city}, ${visitor.country}`
    : visitor?.timezone.replace("_", " ") ?? "Resolving…";
  const readout = fmtReadout(visitor, origin, clock);


  return (
    <section id="hero" className="section section--hero" ref={hostRef} aria-label="Viewport">
      {boot.visible ? <BootOverlay lines={boot.lines} onSkip={boot.skip} /> : null}
      <PerceptionCanvas hostRef={hostRef} />
      <div className="hero">
        <div className="hero__corners" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero__readout hero__readout--tl">
          <div className="hero__readout-head">
            VISITOR SIGNAL (
            <span className="hero__readout-dot" aria-hidden="true" />
            ) DETECTED
          </div>
          {readout.map(({ label, value }) => (
            <div key={label} className="hero__readout-row">
              <span className="hero__readout-label">{label}</span>
              <span className="hero__readout-value">{value}</span>
            </div>
          ))}
        </div>
        <div className="hero__copy">
          <p className="hero__status">{profile.role}</p>
          <h1 ref={focusRef} className="hero__name" data-track="subject">
            <span>{profile.nameParts[0]}</span>
            <span>{profile.nameParts[1]}</span>
          </h1>
          <p className="hero__statement">{profile.statement}</p>
          <p className="hero__meta">
            {profile.statusLine}
          </p>
          <div className="hero__actions">
            <a className="btn btn--solid" href="#work">
              Get in Touch
              <Mail className="btn__icon" />
            </a>
            <a className="btn" href="#act">
              Download Resume
              <Download className="btn__icon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
