import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { contactChannels, profile } from "@/data/content";
import { SectionHeader } from "@/components/system/SectionHeader";
import { useReveal } from "@/hooks/useReveal";

import "@/styles/sections/contact.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function Contact() {
  const ref = useReveal<HTMLDivElement>();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "ok" | "fallback" | "error"
  >("idle");

  const mail = profile.links.email;

  const buildMailto = (data: FormData) => {
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();
    const subject = `A Handshake from your Portfolio: ${name}`;
    const payload = `${body}\n\n— ${name} (${email})`;
    return `mailto:${mail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(payload)}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const data = new FormData(form.current);
    if (String(data.get("company") ?? "").length) return; // honeypot

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      setStatus("ok");
      form.current.reset();
    } catch {
      // EmailJS failed — fall back to the user's mail client.
      if (mail) {
        window.location.href = buildMailto(data);
        setStatus("fallback");
      } else {
        setStatus("error");
      }
    }
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <SectionHeader
        index="06"
        stage="How to reach out"
        title="Contact"
        aside="Start a conversation"
      />
      <h2 id="contact-title" className="sr-only">
        Contact
      </h2>

      <div ref={ref} className="contact reveal">
        <div data-track="contact links">
          <p className="lede">
            If any of my projects interest you, you’d like to collaborate, or
            you’d like to discuss an idea, open a channel. I’m always happy to
            connect, share what I’ve learned, and explore what we could build
            together.
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
          ref={form}
          className="form"
          data-track="contact form"
          onSubmit={handleSubmit}
        >
          {/* Honeypot */}
          <label className="sr-only" aria-hidden="true">
            Company
            <input
              name="company"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
            />
          </label>

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
            <textarea
              name="message"
              required
              placeholder="How can I help you?"
            />
          </label>

          <button
            className="btn btn--solid"
            data-track="extend a hand"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Transmitting…" : "Transmit"}
          </button>

          {status === "ok" ? (
            <p className="form__note form__note--ok">
              Message received — I’ll get back to you shortly.
            </p>
          ) : status === "fallback" ? (
            <p className="form__note">
              Direct transmission failed...
              Opening mail client directly, send the draft to finish!
            </p>
          ) : status === "error" ? (
            <p className="form__note form__note--error">
              Transmission failed. Try again, or email me directly.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}