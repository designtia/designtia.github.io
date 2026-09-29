'use client';

import { useState } from 'react';
import { experience } from '@/lib/experience';
import { sitePath } from '@/lib/site-path';

export function Experience() {
  const [open, setOpen] = useState<string | null>(null);
  return <section id="experience" className="experience-section career-section shell" aria-labelledby="experience-title">
    <h2 id="experience-title">Experience</h2>
    <div className="experience-list">{experience.map(job => {
      const expanded = open === job.id;
      return <article className="experience-item" key={job.id}>
        <h3><button className="experience-toggle" id={`job-${job.id}`} aria-expanded={expanded} aria-controls={`details-${job.id}`} onClick={() => setOpen(expanded ? null : job.id)}>
          <img className="experience-logo" src={sitePath(`/experience/${job.id}.png`)} width={48} height={48} alt="" />
          <span className="experience-summary"><span className="experience-company">{job.company}</span><span className="experience-role">{job.role}</span><span className="experience-meta"><span>{job.period}</span><span>{job.location}</span></span></span>
          <span className="experience-indicator" aria-hidden="true" />
        </button></h3>
        <div id={`details-${job.id}`} className={`experience-panel${expanded ? ' is-open' : ''}`} role="region" aria-labelledby={`job-${job.id}`} inert={!expanded} aria-hidden={!expanded}>
          <div><div className="experience-description">
            {job.intro && <p>{job.intro}</p>}
            <ul>{job.items.map(item => <li key={item}>{item}</li>)}</ul>
            {job.closing && <p>{job.closing}</p>}
          </div></div>
        </div>
      </article>;
    })}</div>
  </section>;
}
