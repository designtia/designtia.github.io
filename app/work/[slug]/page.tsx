import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudy } from '@/content/case-studies';
import { CaseStudyPage } from '@/components/case-study/CaseStudy';
import './study.css';
export const dynamicParams = false;
export function generateStaticParams() { return caseStudies.map(({slug}) => ({slug})); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const study = getCaseStudy((await params).slug);
  return study ? { title: `${study.title} — Valentina Pashentsava`, description: study.headline } : {};
}
export default async function Page({ params }: { params: Promise<{slug:string}> }) {
  const study = getCaseStudy((await params).slug);
  if (!study) notFound();
  const next = study.nextProject ? getCaseStudy(study.nextProject) : undefined;
  return <CaseStudyPage study={study} next={next} />;
}
