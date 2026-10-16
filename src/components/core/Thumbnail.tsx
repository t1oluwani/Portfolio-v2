import { useState } from "react";
const EXTENSIONS = ["png", "jpg", "jpeg"];

export function Thumbnail({ slug, title }: { slug: string; title: string }) {
  const [attempt, setAttempt] = useState(0);
  if (attempt >= EXTENSIONS.length) return null; // no image found: hide the block

  return (
    <figure className="thumbnail" data-track="miniature">
      <img
        key={attempt}
        src={`/images/${slug}.${EXTENSIONS[attempt]}`}
        alt={`${title} screenshot`}
        loading="lazy"
        decoding="async"
        onError={() => setAttempt((n) => n + 1)}
      />
    </figure>
  );
}