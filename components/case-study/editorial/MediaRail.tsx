'use client';
import { useEffect, useId, useRef, useState } from 'react';
import type { EditorialMedia } from '@/content/case-studies/editorial-types';
import { MediaPlaceholder } from './MediaPlaceholder';

export function MediaRail({ title, media }: { title: string; media: EditorialMedia[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const id = useId();
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => setEdges({ start: element.scrollLeft < 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    update();
    element.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener('scroll', update); observer.disconnect(); };
  }, []);
  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * .72, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <div className="editorial-rail-block">
    <div className="editorial-rail-heading"><h4 id={`${id}-title`}>{title}</h4><div className="editorial-rail-controls">
      <button aria-label={`Previous: ${title}`} aria-controls={id} disabled={edges.start} onClick={() => move(-1)}>←</button>
      <button aria-label={`Next: ${title}`} aria-controls={id} disabled={edges.end} onClick={() => move(1)}>→</button>
    </div></div>
    <div ref={rail} id={id} className="editorial-rail" role="region" aria-labelledby={`${id}-title`} tabIndex={0}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
      }}>
      {media.map((item,i) => <MediaPlaceholder media={item} key={i} />)}
    </div>
  </div>;
}
