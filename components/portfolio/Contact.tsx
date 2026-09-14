"use client";
import { useState } from "react";
import { contact } from "@/lib/projects";
export function Contact() {
  const [notice, setNotice] = useState("");
  return (
    <section id="contact" className="contact shell">
      <p className="eyebrow">Contact</p>
      <div className="contact-layout">
        <h2>
          Let’s work
          <br />
          together<span className="name-dot">↗</span>
        </h2>
        <div className="contact-aside">
          <p>
            I’m open to Senior Product Designer opportunities and interesting product
            collaborations.
          </p>
          <div className="contact-links">
            {(["Email", "LinkedIn"] as const).map((label) => {
              const href =
                label === "Email"
                  ? contact.email
                    ? `mailto:${contact.email}`
                    : ""
                  : contact.linkedin;
              return href ? (
                <a className="text-link" key={label} href={href}>
                  {label} <span>↗</span>
                </a>
              ) : (
                <button
                  key={label}
                  className="text-link"
                  onClick={() => setNotice(`${label} details will be added soon.`)}
                >
                  {label} <span aria-hidden="true">↗</span>
                </button>
              );
            })}
          </div>
          <p className="contact-notice" role="status">
            {notice}
          </p>
        </div>
      </div>
    </section>
  );
}
