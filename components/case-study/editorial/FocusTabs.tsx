'use client';

import { useId, useState } from 'react';
import type { EditorialMedia, FocusItem } from '@/content/case-studies/editorial-types';
import { sitePath } from '@/lib/site-path';

export function FocusTabs({ base, items, label = "Classic Search features" }: { label?: string; base: NonNullable<EditorialMedia['image']>; items: FocusItem[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const backgrounds = [base, ...items.flatMap(item => item.base ? [item.base] : [])].filter((image, index, all) => all.findIndex(other => other.src === image.src) === index);
  const currentBase = items[active].base ?? base;
  return <div className="search-focus">
    <div className={`search-focus-media ${items[active].fullScreen ? 'is-full-screen' : ''}`}>
      {backgrounds.map(image => <img key={image.src} className="search-focus-base" src={sitePath(image.src)} alt={image.alt} width={image.width} height={image.height} loading="lazy" aria-hidden={image.src !== currentBase.src} style={{ opacity: image.src === currentBase.src ? 1 : 0 }} />)}
      {items.map((item, index) => <div key={item.title} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} aria-hidden={active !== index} className={`search-focus-layer focus-${item.position} ${item.fullScreen ? 'focus-full-screen' : ''} ${active === index ? 'is-active' : ''}`}>
        <img src={sitePath(item.image.src)} alt={item.image.alt} width={item.image.width} height={item.image.height} loading="lazy" />
      </div>)}
    </div>
    <div className="search-focus-tabs" role="tablist" aria-label={label}>
      {items.map((item, index) => <button type="button" role="tab" key={item.title} id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : event.key === 'ArrowRight' ? (index + 1) % items.length : event.key === 'ArrowLeft' ? (index + items.length - 1) % items.length : null;
        if (next === null) return;
        event.preventDefault(); setActive(next); document.getElementById(`${id}-tab-${next}`)?.focus();
      }}><strong>{item.title}</strong><span>{item.description}</span></button>)}
    </div>
  </div>;
}
