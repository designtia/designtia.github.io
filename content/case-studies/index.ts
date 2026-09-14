import { sitePath } from "@/lib/site-path";
import type { CaseStudy } from './types';
import speiz from './speiz.json';
import video from './ai-video-research.json';
import aml from './aml.json';
import pasaka from './pasaka.json';
import damage from './ai-car-damage.json';
import tukada from './tukada.json';
// Only source-backed entries belong here. Missing projects have no public page.
export const caseStudies = [speiz, video, aml, pasaka, damage, tukada] as CaseStudy[];
export function getCaseStudy(slug: string) { return caseStudies.find(study => study.slug === slug); }
export function getProjectHref(projectId: string) {
  const study = caseStudies.find(study => study.projectId === projectId);
  return study ? sitePath(`/work/${study.slug}/`) : undefined;
}
