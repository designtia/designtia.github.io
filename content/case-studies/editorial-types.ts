export type MediaVariant = 'hero' | 'search' | 'picks-overview' | 'picks-results' | 'ai-starter' | 'ai-results' | 'details' | 'decisions' | 'research' | 'ia' | 'wireframe' | 'closeup';
export type EditorialMedia = {
  title: string;
  variant: MediaVariant;
  focus?: string;
  caption?: string;
  image?: { src: string; alt: string; width: number; height: number };
};
export type ResearchItem = { id: string; title: string; description: string; image: NonNullable<EditorialMedia["image"]> };
export type ComparisonState = { label: string; frames: { label: string; image: NonNullable<EditorialMedia["image"]> }[] };
export type FocusItem = { fullScreen?: boolean; base?: NonNullable<EditorialMedia["image"]>; title: string; description: string; position: "left" | "right" | "center"; image: NonNullable<EditorialMedia["image"]> };
export type EditorialBlock =
  | { type: "ecosystem"; paragraphs: string[]; items: { label: string; caption: string; image: NonNullable<EditorialMedia["image"]> }[] }
  | { type: "sticky-features"; image: NonNullable<EditorialMedia["image"]>; features: { title: string; text: string }[] }
  | { type: "focus-tabs"; label?: string; base: NonNullable<EditorialMedia["image"]>; items: FocusItem[] }
  | { type: "before-after"; states: ComparisonState[] }
  | { type: "research-tabs"; items: ResearchItem[] }
  | { type: 'text'; paragraphs: string[]; headline?: string; eyebrow?: string }
  | { type: 'media'; media: string }
  | { type: 'titled-media'; title: string; description: string; media: string }
  | { type: 'annotated'; media: string; annotations: { title: string; text: string }[] }
  | { type: 'columns'; items: { title: string; text?: string; lines?: string[] }[]; style?: 'responsibility' | 'problem' | 'insight' | 'discovery' }
  | { type: 'sequence'; steps: string[]; caption?: string }
  | { type: 'process'; stages: { title: string; media: string }[]; change: string }
  | { type: 'rail'; title: string; media: string[] }
  | { type: 'gallery'; title: string; text: string; media: string[] };
export type EditorialSection = {
  hideFromTOC?: boolean;
  stickyDetails?: { image: NonNullable<EditorialMedia["image"]>; features: { title: string; text: string }[] };
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
  overview?: { headline: string; labels: string[] };
  metadata: { label: string; value: string }[];
  heroMedia: string;
  media: Record<string, EditorialMedia>;
  sections: EditorialSection[];
  gallery?: Extract<EditorialBlock, { type: 'gallery' }>;
  nextProject?: { title: string; slug: string };
};
