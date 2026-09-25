import { contactChannels, profile } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

export function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const mail = profile.links.email;

  return (
    <section id="act" className="section" aria-labelledby="link-title">
      <SectionHeader index="07" stage="ACT" title="Open a channel" aside="handshake" />
      <h2 id="link-title" className="sr-only">
        Contact
      </h2>
      <div ref={ref} className="contact reveal">
        <div>
          <p className="lede">
            If you are building perception, robotics, or other intelligent systems and want to
            talk, use a channel below. Empty fields are placeholders — fill them in{" "}
            <code className="mono">src/data/content.ts</code>.
          </p>
          <div className="channels">
            {contactChannels.map((ch) =>
              ch.href ? (
                <a key={ch.id} className="channel" href={ch.href}>
                  <span>{ch.label}</span>
                  <span>{ch.value}</span>
                </a>
              ) : (
                <div key={ch.id} className="channel" aria-disabled="true">
                  <span>{ch.label}</span>
                  <span>{ch.value}</span>
                </div>
              ),
            )}
          </div>
        </div>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const name = String(data.get("name") ?? "");
            const body = String(data.get("message") ?? "");
            if (mail) {
              window.location.href = `mailto:${mail}?subject=${encodeURIComponent(
                `Handshake — ${name}`,
              )}&body=${encodeURIComponent(body)}`;
            }
          }}
        >
          <label>
            Name
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            Return address
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Payload
            <textarea name="message" required placeholder="What are you building?" />
          </label>
          <button className="btn btn--solid" type="submit" disabled={!mail}>
            Transmit
          </button>
          {!mail ? (
            <p className="form__note">
              Transmission is disabled until an email is set in the content file.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
