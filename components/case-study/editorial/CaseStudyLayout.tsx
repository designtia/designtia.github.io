import type { EditorialBlock, EditorialSection, EditorialStudy } from '@/content/case-studies/editorial-types';
import { sitePath } from '@/lib/site-path';
import { Header } from '@/components/portfolio/Header';
import { Footer } from '@/components/portfolio/Footer';
import { CaseStudyTOC } from './CaseStudyTOC';
import { CaseStudyHero, SectionHeading, AnnotatedMedia, ProcessEvolution, ProjectGallery } from './CaseStudyParts';
import { MediaPlaceholder } from './MediaPlaceholder';
import { MediaRail } from './MediaRail';
import { BeforeAfterSequence } from './BeforeAfterSequence';
import { FocusTabs } from './FocusTabs';
import { ResearchTabs } from './ResearchTabs';
import { MediaReveal } from './MediaReveal';
import './editorial.css';
import './editorial-theme.css';
import localFont from 'next/font/local';

const geist = localFont({ src: './fonts/geist-latin.woff2', weight: '100 900', display: 'swap', variable: '--font-geist' });

function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return <div className="editorial-prose">{paragraphs.map((text,i) => <p key={i}>{text}</p>)}</div>;
}
function Block({ block, study }: { block: EditorialBlock; study: EditorialStudy }) {
  switch (block.type) {
    case 'ecosystem': return <div className="editorial-ecosystem">
      <div className="editorial-ecosystem-copy">{block.paragraphs.map(text => <Paragraphs key={text} paragraphs={[text]} />)}</div>
      <div className="editorial-ecosystem-showcase">{block.items.map(item => <figure key={item.label}>
        <img src={sitePath(item.image.src)} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" />
        <figcaption><p className="eyebrow">{item.label}</p><p>{item.caption}</p></figcaption>
      </figure>)}</div>
    </div>;
    case 'sticky-features': return <div className="editorial-sticky-features">
      <figure className="editorial-details-screen"><img src={sitePath(block.image.src)} alt={block.image.alt} width={block.image.width} height={block.image.height} loading="lazy" /></figure>
      <div className="editorial-details-features">{block.features.map(feature => <div key={feature.title}><h4>{feature.title}</h4><p>{feature.text}</p></div>)}</div>
    </div>;
    case 'focus-tabs': return <FocusTabs base={block.base} items={block.items} label={block.label} />;
    case 'before-after': return <BeforeAfterSequence states={block.states} />;
    case 'research-tabs': return <ResearchTabs items={block.items} label={block.label} />;
    case 'text': return <div className="editorial-text-block">{block.eyebrow && <p className="eyebrow editorial-child-eyebrow">{block.eyebrow}</p>}{block.headline && <h4>{block.headline}</h4>}<Paragraphs paragraphs={block.paragraphs} /></div>;
    case 'titled-media': return <div className="editorial-process-block">
      <h3>{block.title}</h3>
      <Paragraphs paragraphs={[block.description]} />
      <MediaPlaceholder media={study.media[block.media]} showCaption={false} />
    </div>;
    case 'media': return <MediaPlaceholder media={study.media[block.media]} />;
    case 'annotated': return <AnnotatedMedia media={study.media[block.media]} annotations={block.annotations} />;
    case 'columns': return <div className={`editorial-columns columns-${block.style ?? 'insight'}${block.columns ? ` columns-count-${block.columns}` : ''}`}>{block.items.map((item,i) => <div key={item.title}>
      {block.style === 'problem' && <span className="problem-index" aria-hidden="true">{String(i+1).padStart(2,'0')} <span>↘</span></span>}
      <h4>{block.style === 'discovery' && <span className="discovery-number">{String(i+1).padStart(2,'0')}</span>}{item.title}</h4>{item.text && <p>{item.text}</p>}{item.lines && <ul>{item.lines.map(line => <li key={line}>{line}</li>)}</ul>}
    </div>)}</div>;
    case 'sequence': return <figure className="editorial-sequence"><ol>{block.steps.map((step,i) => <li key={step}>{step}{i < block.steps.length - 1 && <span aria-hidden="true">→</span>}</li>)}</ol>{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
    case 'process': return <ProcessEvolution block={block} media={study.media} />;
    case 'rail': return <MediaRail title={block.title} media={block.media.map(id => study.media[id])} />;
    case 'gallery': return <ProjectGallery title={block.title} text={block.text} media={block.media.map(id => study.media[id])} />;
  }
}
function Section({ section, study, child = false }: { section: EditorialSection; study: EditorialStudy; child?: boolean }) {
  if (section.stickyDetails) {
    const { image, features } = section.stickyDetails;
    return <section id={section.id} data-toc-section tabIndex={-1} className="editorial-section editorial-subsection editorial-sticky-details">
      <div className="editorial-details-copy">
        <SectionHeading label={section.label} headline={section.headline} child={child} hideLabel={section.id === "search-discovery"} />
        {section.paragraphs && <Paragraphs paragraphs={section.paragraphs} />}
        <div className="editorial-details-features">{features.map(feature => <div key={feature.title}>
          <h4>{feature.title}</h4><p>{feature.text}</p>
        </div>)}</div>
      </div>
      <figure className="editorial-details-screen"><img src={sitePath(image.src)} alt={image.alt} width={image.width} height={image.height} loading="lazy" /></figure>
    </section>;
  }
  return <section id={section.id} data-toc-section tabIndex={-1} className={`editorial-section ${['speiz', 'website-builder'].includes(study.slug) && ['role-scope', 'problem', 'research-insights', 'system-strategy', 'design-process', 'impact', 'beyond-tenant-experience'].includes(section.id) ? 'editorial-reference-section' : ''} ${child ? 'editorial-subsection' : ''} ${section.children ? 'editorial-chapter' : ''}`}>
    <SectionHeading label={section.label} headline={section.headline} child={child} hideLabel={section.id === "search-discovery"} />
    {section.paragraphs && <Paragraphs paragraphs={section.paragraphs} />}
    {section.blocks && <div className="editorial-blocks">{section.blocks.map((block,i) => <Block block={block} study={study} key={i} />)}</div>}
    {section.children?.map(subsection => <Section key={subsection.id} section={subsection} study={study} child />)}
  </section>;
}
export function CaseStudyLayout({ study }: { study: EditorialStudy }) {
  return <div className={`editorial-page ${geist.variable}`}><a className="skip-link" href="#overview">Skip to case study</a><div id="top" /><Header home={false} caseStudy />
    <main>
      <CaseStudyHero study={study} />
    <div className="editorial-case shell" data-project={study.slug}><CaseStudyTOC sections={study.sections} />
      <div className="editorial-main">
        <section id="overview" data-toc-section tabIndex={-1} className={`editorial-overview ${['speiz', 'website-builder'].includes(study.slug) ? 'editorial-reference-section' : ''}`}>
          {study.overview ? <>
            <SectionHeading label="OVERVIEW" headline={study.overview.headline} />
            <div className="editorial-overview-summary">
              {study.intro.map((text, i) => <div key={study.overview!.labels[i]}>
                <h3 className="eyebrow">{study.overview!.labels[i]}</h3>
                <div className="editorial-prose"><p>{text}</p></div>
              </div>)}
            </div>
          </> : <>
            <header className="editorial-section-heading"><h2>Overview</h2></header>
            <div className="editorial-intro">{study.intro.map((text,i) => <p key={i}>{text}</p>)}</div>
          </>}
        </section>
        {study.sections.map(section => <Section key={section.id} section={section} study={study} />)}
        {study.gallery && <ProjectGallery title={study.gallery.title} text={study.gallery.text} media={study.gallery.media.map(id => study.media[id])} />}
        <nav className="editorial-next" aria-label="Project navigation"><a className="text-link" href={sitePath('/')}><img className="navigation-arrow" src={sitePath("/icons/arrow-left.svg")} width={16} height={16} alt="" /> Back to Home</a>
          {study.nextProject && <a href={sitePath(`/work/${study.nextProject.slug}/`)}><span className="eyebrow">Next project</span><strong>{study.nextProject.title} <img className="navigation-arrow" src={sitePath("/icons/arrow-right.svg")} width={24} height={24} alt="" /></strong></a>}
        </nav>
      </div>
    </div></main><Footer /><MediaReveal /></div>;
}
