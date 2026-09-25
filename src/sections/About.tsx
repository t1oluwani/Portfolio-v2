import { profile } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

export function About() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <SectionHeader
        index="02"
        stage="UNDERSTAND"
        title="Subject file"
        aside="spec / biography"
      />
      <h2 id="about-title" className="sr-only">
        About
      </h2>
      <div ref={ref} className="spec-grid reveal">
        <table className="spec-table">
          <tbody>
            <tr>
              <th scope="row">Unit</th>
              <td>{profile.name}</td>
            </tr>
            <tr>
              <th scope="row">Class</th>
              <td>{profile.role}</td>
            </tr>
            <tr>
              <th scope="row">Focus</th>
              <td>Robotics · computer vision · intelligent systems</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td>{profile.statusLine}</td>
            </tr>
            <tr>
              <th scope="row">Locale</th>
              <td>{profile.location}</td>
            </tr>
            <tr>
              <th scope="row">Source</th>
              <td>
                {profile.links.github ? (
                  <a href={profile.links.github}>github.com/t1oluwani</a>
                ) : (
                  "TBD"
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="spec-copy">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </div>
      <div className="pipeline" aria-label="Working model">
        <div className="pipeline__step">
          <div className="pipeline__idx">01</div>
          <div className="pipeline__name">Perceive</div>
          <p className="pipeline__hint">Cameras, signals, and the geometry of a scene.</p>
        </div>
        <div className="pipeline__step">
          <div className="pipeline__idx">02</div>
          <div className="pipeline__name">Understand</div>
          <p className="pipeline__hint">Models that turn pixels into structure.</p>
        </div>
        <div className="pipeline__step">
          <div className="pipeline__idx">03</div>
          <div className="pipeline__name">Build</div>
          <p className="pipeline__hint">Software, APIs, and the machinery in between.</p>
        </div>
        <div className="pipeline__step">
          <div className="pipeline__idx">04</div>
          <div className="pipeline__name">Act</div>
          <p className="pipeline__hint">Close the loop. Prefer systems that do something.</p>
        </div>
      </div>
    </section>
  );
}
