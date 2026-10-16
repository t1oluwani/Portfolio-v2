import { useState } from "react";

export function Headshot({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="spec-photo" data-track="headshot">
      {failed ? (
        <div className="spec-photo__placeholder" aria-hidden="true">
          Headshot
        </div>
      ) : (
        <img
          src={src}
          alt={`Headshot of ${name}`}
          width={320}
          height={400}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}