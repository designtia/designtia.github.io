'use client';

import { useId, useRef, useState } from 'react';
import type { ResearchItem } from '@/content/case-studies/editorial-types';
import { sitePath } from '@/lib/site-path';

export function ResearchTabs({ items, label = "Research perspectives" }: { items: ResearchItem[]; label?: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className="research-tabs">
    <div role="tablist" aria-label={label} aria-orientation="vertical" className="research-tab-list">
      {items.map((item, index) => <button
        key={item.id}
        ref={node => { buttons.current[index] = node; }}
        type="button"
        role="tab"
        id={id + '-tab-' + item.id}
        aria-controls={id + '-panel-' + item.id}
        aria-selected={active === index}
        tabIndex={active === index ? 0 : -1}
        onClick={() => setActive(index)}
        onKeyDown={event => {
          let next = index;
          if (event.key === 'ArrowDown') next = (index + 1) % items.length;
          else if (event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = items.length - 1;
          else return;
          event.preventDefault();
          setActive(next);
          buttons.current[next]?.focus();
        }}
      >
        <span className="research-tab-title">{item.title}</span>
        <span className="research-tab-description">{item.description}</span>
      </button>)}
    </div>
    <div className="research-panels">
      {items.map((item, index) => <div
        key={item.id}
        role="tabpanel"
        id={id + '-panel-' + item.id}
        aria-labelledby={id + '-tab-' + item.id}
        hidden={active !== index}
        tabIndex={0}
      >
        <img src={sitePath(item.image.src)} alt={item.image.alt} width={item.image.width} height={item.image.height} />
      </div>)}
    </div>
  </div>;
}
