export type MediaVariant = 'hero' | 'search' | 'picks-overview' | 'picks-results' | 'ai-starter' | 'ai-results' | 'details' | 'decisions' | 'research' | 'ia' | 'wireframe' | 'closeup';
export type EditorialMedia = {
  title: string;
  variant: MediaVariant;
  focus?: string;
  caption?: string;
  image?: { src: string; alt: string; width: number; height: number };
};
export type EditorialBlock =
  | { type: 'text'; paragraphs: string[]; headline?: string }
  | { type: 'media'; media: string }
  | { type: 'annotated'; media: string; annotations: { title: string; text: string }[] }
  | { type: 'columns'; items: { title: string; text?: string; lines?: string[] }[]; style?: 'responsibility' | 'problem' | 'insight' }
  | { type: 'sequence'; steps: string[]; caption?: string }
  | { type: 'process'; stages: { title: string; media: string }[]; change: string }
  | { type: 'rail'; title: string; media: string[] }
  | { type: 'gallery'; title: string; text: string; media: string[] };
export type EditorialSection = {
  id: string;
  nav: string;
  label: string;
  headline?: string;
  paragraphs?: string[];
  blocks?: EditorialBlock[];
  children?: EditorialSection[];
};
export type EditorialStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  intro: string[];
  metadata: { label: string; value: string }[];
  heroMedia: string;
  media: Record<string, EditorialMedia>;
  sections: EditorialSection[];
  gallery?: Extract<EditorialBlock, { type: 'gallery' }>;
  nextProject?: { title: string; slug: string };
};
