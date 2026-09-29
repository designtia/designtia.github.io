import { skills, tools } from '@/lib/experience';
import { sitePath } from '@/lib/site-path';

export function SkillsTools() {
  return <section className="skills-section career-section shell" aria-labelledby="skills-tools-title">
    <h2 id="skills-tools-title">Skills &amp; Tools</h2>
    <div className="skills-tools-content">
      <div><h3>Skills</h3><ul className="skill-tags">{skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>
      <div><h3>Tools</h3><ul className="tool-grid">{tools.map(tool => {
        const id = tool.replace('Adobe ', '').toLowerCase();
        return <li key={tool}><img src={sitePath(`/tools/${id}.${['illustrator', 'jira', 'hotjar'].includes(id) ? 'svg' : 'png'}`)} width={32} height={32} alt="" /><span>{tool}</span></li>;
      })}</ul></div>
    </div>
  </section>;
}
