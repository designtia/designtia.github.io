import type { EditorialBlock, EditorialSection, EditorialStudy } from '@/content/case-studies/editorial-types';
import { sitePath } from '@/lib/site-path';
import { Header } from '@/components/portfolio/Header';
import { Footer } from '@/components/portfolio/Footer';
import { CaseStudyTOC } from './CaseStudyTOC';
import { CaseStudyHero, SectionHeading, AnnotatedMedia, ProcessEvolution, ProjectGallery } from './CaseStudyParts';
import { MediaPlaceholder } from './MediaPlaceholder';
import { MediaRail } from './MediaRail';
import { MediaReveal } from './MediaReveal';
import './editorial.css';

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return <div className="editorial-prose">{paragraphs.map((text,i) => <p key={i}>{text}</p>)}</div>;
}
function Block({ block, study }: { block: EditorialBlock; study: EditorialStudy }) {
  switch (block.type) {
    case 'text': return <div className="editorial-text-block">{block.headline && <h4>{block.headline}</h4>}<Paragraphs paragraphs={block.paragraphs} /></div>;
    case 'media': return <MediaPlaceholder media={study.media[block.media]} />;
    case 'annotated': return <AnnotatedMedia media={study.media[block.media]} annotations={block.annotations} />;
    case 'columns': return <div className={`editorial-columns columns-${block.style ?? 'insight'}`}>{block.items.map((item,i) => <div key={item.title}>
      {block.style === 'problem' && <span className="problem-index" aria-hidden="true">{String(i+1).padStart(2,'0')} <span>↘</span></span>}
      <h4>{item.title}</h4>{item.text && <p>{item.text}</p>}{item.lines && <ul>{item.lines.map(line => <li key={line}>{line}</li>)}</ul>}
    </div>)}</div>;
    case 'sequence': return <figure className="editorial-sequence"><ol>{block.steps.map((step,i) => <li key={step}>{step}{i < block.steps.length - 1 && <span aria-hidden="true">→</span>}</li>)}</ol>{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
    case 'process': return <ProcessEvolution block={block} media={study.media} />;
    case 'rail': return <MediaRail title={block.title} media={block.media.map(id => study.media[id])} />;
    case 'gallery': return <ProjectGallery title={block.title} text={block.text} media={block.media.map(id => study.media[id])} />;
  }
}
function Section({ section, study, child = false }: { section: EditorialSection; study: EditorialStudy; child?: boolean }) {
  return <section id={section.id} data-toc-section tabIndex={-1} className={`editorial-section ${child ? 'editorial-subsection' : ''} ${section.children ? 'editorial-chapter' : ''}`}>
    <SectionHeading label={section.label} headline={section.headline} child={child} />
    {section.paragraphs && <Paragraphs paragraphs={section.paragraphs} />}
    {section.blocks && <div className="editorial-blocks">{section.blocks.map((block,i) => <Block block={block} study={study} key={i} />)}</div>}
    {section.children?.map(subsection => <Section key={subsection.id} section={subsection} study={study} child />)}
  </section>;
}
export function CaseStudyLayout({ study }: { study: EditorialStudy }) {
  return <><a className="skip-link" href="#overview">Skip to case study</a><div id="top" /><Header home={false} />
    <main>
      <CaseStudyHero study={study} />
    <div className="editorial-case shell"><CaseStudyTOC sections={study.sections} />
      <div className="editorial-main">
        <section id="overview" data-toc-section tabIndex={-1} className="editorial-overview">
          <header className="editorial-section-heading"><h2>Overview</h2></header>
          <div className="editorial-intro">{study.intro.map((text,i) => <p key={i}>{text}</p>)}</div>
        </section>
        {study.sections.map(section => <Section key={section.id} section={section} study={study} />)}
        {study.gallery && <ProjectGallery title={study.gallery.title} text={study.gallery.text} media={study.gallery.media.map(id => study.media[id])} />}
        <nav className="editorial-next" aria-label="Project navigation"><a className="text-link" href={sitePath('/#work')}>Back to work <span aria-hidden="true">↗</span></a>
          {study.nextProject && <a href={sitePath(`/work/${study.nextProject.slug}/`)}><span className="eyebrow">Next project</span><strong>{study.nextProject.title} <span aria-hidden="true">→</span></strong></a>}
        </nav>
      </div>
    </div></main><Footer /><MediaReveal /></>;
}
