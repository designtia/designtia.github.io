import { sitePath } from "@/lib/site-path";
import type { CaseStudy as Study, StudyBlock, StudyImage } from '@/content/case-studies/types';
import { Header } from '@/components/portfolio/Header';
import { Footer } from '@/components/portfolio/Footer';

// Preserve source strings; render the small inline-format subset used by migrated Notion text.
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
  return <>{parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
    return link ? <a key={i} href={link[2]}>{link[1]}</a> : part;
  })}</>;
}
function Paragraphs({ paragraphs }: { paragraphs: string[] }) {
  return <>{paragraphs.map((text, i) => <p key={i}><Inline text={text} /></p>)}</>;
}
export function StudyFigure({ image, eager = false }: { image: StudyImage; eager?: boolean }) {
  return <figure className="study-figure"><img src={sitePath(image.src)} alt={image.alt} width={image.width} height={image.height} loading={eager ? 'eager' : 'lazy'} decoding="async" />{image.caption && <figcaption><Inline text={image.caption} /></figcaption>}</figure>;
}
function Block({ block }: { block: StudyBlock }) {
  switch (block.type) {
    case 'text': return <div className="study-prose"><Paragraphs paragraphs={block.paragraphs} /></div>;
    case 'heading': return <h3 className="study-subheading">{block.text}</h3>;
    case 'list': { const List = block.ordered ? 'ol' : 'ul'; return <List className="study-prose study-list">{block.items.map((item,i) => <li key={i}><Inline text={item} /></li>)}</List>; }
    case 'image': return <StudyFigure image={block.image} />;
    case 'image-pair': return <div className="study-image-grid">{block.images.map((image,i) => <StudyFigure key={i} image={image} />)}</div>;
    case 'gallery': return <div className={block.columns === 2 ? 'study-image-grid' : 'study-gallery'}>{block.images.map((image,i) => <StudyFigure key={i} image={image} />)}</div>;
    case 'image-text': return <div className={`study-image-text ${block.imageSide === 'right' ? 'study-image-right' : ''}`}><StudyFigure image={block.image} /><div className="study-prose"><Paragraphs paragraphs={block.paragraphs} /></div></div>;
  }
}
export function CaseStudyPage({ study, next }: { study: Study; next?: Study }) {
  const metadata = [
    ...(study.role ? [{label: 'Role', value: study.role}] : []),
    ...(study.scope ? [{label: 'Scope', value: study.scope}] : []),
    ...(study.year ? [{label: 'Year', value: study.year}] : []),
    ...(study.metadata ?? []),
  ];
  return <><a className="skip-link" href="#case-content">Skip to case study</a><div id="top" /><Header home={false} /><main className="case-study shell" id="case-content">
    <a className="text-link study-back" href={sitePath("/#work")}><span aria-hidden="true">←</span> Back to work</a>
    <header className="study-hero"><p className="eyebrow">{study.title}</p><h1>{study.headline}</h1>{metadata.length > 0 && <dl className="study-metadata">{metadata.map(({label,value}) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}{study.heroImage && <StudyFigure image={study.heroImage} eager />}</header>
    {study.sections.filter(section => section.blocks.length > 0).map(section => <section className="study-section" aria-labelledby={section.id} key={section.id}><h2 id={section.id}>{section.title}</h2><div className="study-blocks">{section.blocks.map((block,i) => <Block key={i} block={block} />)}</div></section>)}
    {study.gallery && study.gallery.length > 0 && <section className="study-gallery study-final-gallery" aria-label="Project screens">{study.gallery.map((image,i) => <StudyFigure key={i} image={image} />)}</section>}
    <nav className="study-next" aria-label="Project navigation"><a className="text-link" href={sitePath("/#work")}>Back to work <span aria-hidden="true">↗</span></a>{next && <a href={sitePath(`/work/${next.slug}/`)}><span className="eyebrow">Next project</span><span className="study-next-title">{next.title} <span aria-hidden="true">→</span></span></a>}</nav>
  </main><Footer /></>;
}
