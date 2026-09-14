export type StudyImage = { src: string; alt: string; width: number; height: number; caption?: string };
export type TextBlock = { type: 'text'; paragraphs: string[] };
export type StudyBlock =
  | TextBlock
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'image'; image: StudyImage }
  | { type: 'image-pair'; images: [StudyImage, StudyImage] }
  | { type: 'image-text'; image: StudyImage; paragraphs: string[]; imageSide?: 'left' | 'right' }
  | { type: 'heading'; text: string }
  | { type: 'gallery'; images: StudyImage[]; columns?: 1 | 2 };
export type CaseStudy = {
  slug: string;
  projectId: string;
  title: string;
  headline: string;
  role?: string;
  scope?: string;
  year?: string;
  metadata?: { label: string; value: string }[];
  heroImage?: StudyImage;
  sections: { id: string; title: string; blocks: StudyBlock[] }[];
  gallery?: StudyImage[];
  nextProject?: string;
  source: string;
};
