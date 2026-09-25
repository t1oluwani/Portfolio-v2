import { useRef } from "react";
import { profile } from "@/data/content";
import { PerceptionCanvas } from "@/components/vision/PerceptionCanvas";
import { BootOverlay } from "@/components/vision/BootOverlay";
import { useBootSequence } from "@/hooks/useBootSequence";

export function Hero() {
  const hostRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLHeadingElement>(null);
  const boot = useBootSequence();
  const coords = {
    lat: "49.2781 N",
    lon: "122.9199 W",
    frame: "SFU / local",
  };

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
          ORIGIN {coords.frame}
          <br />
          {coords.lat} · {coords.lon}
        </div>
        <div className="hero__readout hero__readout--br">
          PIPELINE  PERCEIVE → UNDERSTAND → BUILD → ACT
          <br />
          TRACKER  pointer-linked · 60hz
        </div>
        <div className="hero__copy">
          <p className="hero__status">Optical axis locked · subject in frame</p>
          <h1 ref={focusRef} className="hero__name" data-track="subject">
            <span>{profile.nameParts[0]}</span>
            <span>{profile.nameParts[1]}</span>
          </h1>
          <p className="hero__statement">{profile.statement}</p>
          <p className="hero__meta">
            {profile.role} · {profile.statusLine}
          </p>
          <div className="hero__actions">
            <a className="btn btn--solid" href="#work">
              Open case files
            </a>
            <a className="btn" href="#act">
              Open channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
