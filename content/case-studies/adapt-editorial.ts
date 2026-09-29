import type { CaseStudy } from './types';
import type { EditorialStudy, EditorialSection } from './editorial-types';

// Adapt source-backed content without duplicating or rewriting the original material.
export function adaptEditorial(study: CaseStudy, all: CaseStudy[]): EditorialStudy {
  const sections: EditorialSection[] = study.sections.filter(section => section.blocks.length).map(section => {
    const result: EditorialSection = { id: section.id, nav: section.title, label: section.title, blocks: [] };
    let target = result;
    section.blocks.forEach((block, index) => {
      if (block.type === 'heading') {
        target = { id: `${section.id}-${index}`, nav: block.text, label: block.text, blocks: [] };
        (result.children ??= []).push(target);
      } else {
        target.blocks!.push({ type: 'source', block });
      }
    });
    return result;
  });
  const next = all.find(item => item.slug === study.nextProject);
  return {
    slug: study.slug, title: study.title, eyebrow: study.title, headline: study.headline,
    sourceLayout: true, intro: [], sections,
    metadata: [
      ...(study.role ? [{ label: 'Role', value: study.role }] : []),
      ...(study.scope ? [{ label: 'Scope', value: study.scope }] : []),
      ...(study.year ? [{ label: 'Year', value: study.year }] : []),
      ...(study.metadata ?? []),
    ],
    heroMedia: 'hero', media: study.heroImage ? { hero: { title: study.title, variant: 'hero', image: study.heroImage, caption: study.heroImage.caption } } : {},
    sourceGallery: study.gallery,
    nextProject: next ? { slug: next.slug, title: next.title } : undefined,
  };
}
