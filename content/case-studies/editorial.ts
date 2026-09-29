import type { EditorialStudy } from './editorial-types';
import { caseStudies } from './index';
import { adaptEditorial } from './adapt-editorial';
import speiz from './speiz-editorial.json';
import websiteBuilder from './website-builder-editorial.json';
// Register future editorial case studies here without changing the renderer or TOC.
export const editorialStudies: EditorialStudy[] = [speiz as EditorialStudy, websiteBuilder as EditorialStudy, ...caseStudies.filter(study => study.slug !== 'speiz').map(study => adaptEditorial(study, caseStudies))];
export function getEditorialStudy(slug: string) {
  return editorialStudies.find(study => study.slug === slug);
}
