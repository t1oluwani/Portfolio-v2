import { useState } from "react";
import headshot_url from "../../../public/images/headshot/me-v1.jpeg"

const HEADSHOT_SRC = headshot_url;

export function Headshot() {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="spec-photo" data-track="a handsome fella">
      {failed ? (
        <div className="spec-photo__placeholder" aria-hidden="true">
          Headshot
        </div>
      ) : (
        <img
          src={HEADSHOT_SRC}
          width={320}
          height={400}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}