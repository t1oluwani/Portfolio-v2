type Frame = {
  id: string;
  caption: string;
  note: string;
  src?: string;
};

export function CaptureFrame({ frame, slug }: { frame: Frame; slug: string }) {
  return (
    <figure className="frame">
      <div className="frame__stage">
        {frame.src ? (
          <img src={frame.src} alt={frame.caption} />
        ) : (
          <div className="frame__placeholder">
            <span className="frame__cross" aria-hidden="true" />
            <p>FRAME {frame.id} · PENDING CAPTURE</p>
            <p className="frame__path">
              Drop a PNG at /public/work/{slug}/{frame.id.toLowerCase()}.png and set{" "}
              <span className="mono">frames[].src</span>
            </p>
          </div>
        )}
      </div>
      <figcaption>
        <div className="frame__id">{frame.id}</div>
        <h3 className="frame__caption">{frame.caption}</h3>
        <p className="frame__note">{frame.note}</p>
      </figcaption>
    </figure>
  );
}
