import { useRef, useState, useEffect } from "react";
import { profile } from "@/data/content";
import { PerceptionCanvas } from "@/components/vision/PerceptionCanvas";
import { BootOverlay } from "@/components/vision/BootOverlay";
import { useBootSequence } from "@/hooks/useBootSequence";
import { useVisitorInfo, fmtCoord } from "@/hooks/useVisitorInfo";

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

  const readout = [
    `ORIGIN ${origin}`,
    `TIME ${clock} ${visitor?.utcOffset ?? ""}`,
    visitor?.lat != null && visitor?.lon != null
      ? `${fmtCoord(visitor.lat, "N", "S")} · ${fmtCoord(visitor.lon, "E", "W")}`
      : "COORDS —",
    visitor ? `${visitor.platform} · ${visitor.screen}` : "",
    visitor?.network ? `LINK ${visitor.network.toUpperCase()}` : "",
    visitor?.referrer ? `VIA ${visitor.referrer}` : "",
  ].filter(Boolean);

  return (
    <section id="hero" className="section section--hero" ref={hostRef} aria-label="Viewport">
      {boot.visible ? <BootOverlay lines={boot.lines} onSkip={boot.skip} /> : null}
      <PerceptionCanvas hostRef={hostRef} focusRef={focusRef} />
      <div className="hero">
        <div className="hero__corners" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero__readout hero__readout--tl">
          {/* ORIGIN {coords.frame}
          < br />
          TIME {clock}
          <br />
          {coords.lat} · {coords.lon} */}
          {readout.map((line) => (
            <div key={line}>{line}</div>
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
            </a>
            <a className="btn" href="#act">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
