import type { EditorialMedia, EditorialStudy, EditorialBlock } from '@/content/case-studies/editorial-types';
import { MediaPlaceholder } from './MediaPlaceholder';

export function SectionHeading({ label, headline, child = false, hideLabel = false }: { label: string; headline?: string; child?: boolean; hideLabel?: boolean }) {
  const Heading = child ? 'h3' : 'h2';
  return <header className="editorial-section-heading">{headline ? <>{!hideLabel && <p className="eyebrow">{label}</p>}<Heading>{headline}</Heading></> : <Heading className="eyebrow">{label}</Heading>}</header>;
}
export function CaseStudyMetadata({ items }: { items: EditorialStudy['metadata'] }) {
  return <dl className="editorial-metadata">{items.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}
export function CaseStudyHero({ study }: { study: EditorialStudy }) {
  return <section className="editorial-hero shell" data-project={study.slug}>
    <p className="eyebrow">{study.eyebrow}</p><h1>{study.headline}</h1>
    <CaseStudyMetadata items={study.metadata} /><MediaPlaceholder media={study.media[study.heroMedia]} showCaption={study.slug !== 'speiz'} />
  </section>;
}
export function AnnotatedMedia({ media, annotations }: { media: EditorialMedia; annotations: { title: string; text: string }[] }) {
  return <div className="editorial-annotated"><MediaPlaceholder media={media} /><ol className="editorial-annotations">{annotations.map((annotation,i) => <li key={annotation.title}><span className="annotation-number">{String(i + 1).padStart(2,'0')}</span><div><h4>{annotation.title}</h4><p>{annotation.text}</p></div></li>)}</ol></div>;
}
export function ProcessEvolution({ block, media }: { block: Extract<EditorialBlock, {type:'process'}>; media: EditorialStudy['media'] }) {
  return <div className="editorial-evolution">{block.stages.map((stage,i) => <div className="evolution-stage" key={stage.title}>
    {i === block.stages.length - 1 && <div className="evolution-change"><span className="eyebrow">What changed</span><p>{block.change}</p></div>}
    <div className="evolution-label"><span>{String(i + 1).padStart(2,'0')}</span><h4>{stage.title}</h4></div>
    <MediaPlaceholder media={media[stage.media]} />{i < block.stages.length - 1 && <span className="evolution-arrow" aria-hidden="true">↓</span>}
  </div>)}</div>;
}
export function ProjectGallery({ title, text, media }: { title: string; text: string; media: EditorialMedia[] }) {
  return <section className="editorial-gallery" aria-label={title}><div className="editorial-gallery-intro"><h2>{title}</h2><p>{text}</p></div><div className="editorial-gallery-screens">{media.map((item,i) => <MediaPlaceholder media={item} key={i} />)}</div></section>;
}
