"use client";
import { sitePath } from "@/lib/site-path";
import { useState } from "react";
import { contact } from "@/lib/projects";
export function Contact() {
  const [notice, setNotice] = useState("");
  return (
    <section id="contact" className="contact shell">
      <p className="eyebrow">Contact</p>
      <div className="contact-layout">
        <h2>
          Have a product in mind?
          <br />
          <span>Let’s talk.</span>
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
                <a className={`text-link contact-button ${label === "Email" ? "contact-button-primary" : ""}`} key={label} href={href}>
                  {label === "Email" ? "Say hello" : label} <img className="homepage-arrow" src={sitePath("/icons/arrow-right-up.svg")} width={16} height={16} alt="" />
                </a>
              ) : (
                <button
                  key={label}
                  className={`text-link contact-button ${label === "Email" ? "contact-button-primary" : ""}`}
                  onClick={() => setNotice(`${label} details will be added soon.`)}
                >
                  {label === "Email" ? "Say hello" : label} <img className="homepage-arrow" src={sitePath("/icons/arrow-right-up.svg")} width={16} height={16} alt="" />
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
