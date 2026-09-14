import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/content/case-studies';
import { CaseStudyPage } from '@/components/case-study/CaseStudy';
import { editorialStudies, getEditorialStudy } from '@/content/case-studies/editorial';
import { CaseStudyLayout } from '@/components/case-study/editorial/CaseStudyLayout';
import './study.css';
export const dynamicParams = false;
export function generateStaticParams() { return [...new Set([...caseStudies, ...editorialStudies].map(study => study.slug))].map(slug => ({slug})); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const study = getEditorialStudy((await params).slug) ?? getCaseStudy((await params).slug);
  return study ? { title: `${study.title} — Valentina Pashentsava`, description: study.headline } : {};
}
export default async function Page({ params }: { params: Promise<{slug:string}> }) {
  const slug = (await params).slug;
  const editorial = getEditorialStudy(slug);
  if (editorial) return <CaseStudyLayout study={editorial} />;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const next = study.nextProject ? getCaseStudy(study.nextProject) : undefined;
  return <CaseStudyPage study={study} next={next} />;
}
