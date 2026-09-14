"use client";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectMedia } from "./ProjectMedia";
export function ProjectItem({ project }: { project: Project }) {
  const [notice, setNotice] = useState(false);
  return (
    <article className={`project project-${project.size}`} id={`project-${project.id}`}>
      {project.href ? (
        <a className="project-media-link" href={project.href} aria-label={`View ${project.name} case study`}>
          <ProjectMedia project={project} />
        </a>
      ) : <ProjectMedia project={project} />}
      <div className="project-copy">
        <div className="project-label">
          <span>{project.name}</span>
          <span>{project.id}</span>
        </div>
        <h2>{project.headline}</h2>
        <p className="project-description">{project.description}</p>
        <div className="project-action">
          {project.href ? (
            <a className="text-link" href={project.href}>
              View project <span aria-hidden="true">→</span>
            </a>
          ) : (
            <button
              className="text-link"
              onClick={() => setNotice(!notice)}
              aria-expanded={notice}
              aria-controls={`notice-${project.id}`}
            >
              View project <span aria-hidden="true">→</span>
            </button>
          )}
          {notice && (
            <p id={`notice-${project.id}`} className="project-notice" role="status">
              Case study coming soon.
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
