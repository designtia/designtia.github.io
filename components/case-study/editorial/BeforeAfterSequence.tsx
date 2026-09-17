'use client';

import { useId, useRef, useState } from 'react';
import type { ComparisonState } from '@/content/case-studies/editorial-types';
import { sitePath } from '@/lib/site-path';

export function BeforeAfterSequence({ states }: { states: ComparisonState[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  return <div className="comparison">
    <div className="comparison-tabs" role="tablist" aria-label="Product journey comparison">
      {states.map((state, index) => <button key={state.label} type="button" role="tab"
        id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === index}
        tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)}
        onKeyDown={event => {
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? states.length - 1 : event.key === 'ArrowRight' ? (index + 1) % states.length : event.key === 'ArrowLeft' ? (index + states.length - 1) % states.length : null;
          if (next === null) return;
          event.preventDefault(); setSelected(next);
          document.getElementById(`${id}-tab-${next}`)?.focus();
        }}>{state.label}</button>)}
    </div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selected}`}>
      <Sequence key={selected} state={states[selected]} />
    </div>
  </div>;
}

function Sequence({ state }: { state: ComparisonState }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const go = (index: number) => {
    const container = rail.current;
    const frame = container?.children[index] as HTMLElement | undefined;
    if (container && frame) container.scrollTo({ left: frame.offsetLeft - (container.children[0] as HTMLElement).offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  return <div className="comparison-canvas">
    <div className="comparison-rail" ref={rail} tabIndex={0} aria-label={`${state.label} screenshots. Scroll horizontally to explore.`}
      onScroll={() => {
        const container = rail.current;
        if (!container) return;
        const first = (container.children[0] as HTMLElement).offsetLeft;
        const distances = Array.from(container.children).map(frame => Math.abs((frame as HTMLElement).offsetLeft - first - container.scrollLeft));
        setActive(distances.indexOf(Math.min(...distances)));
      }} onKeyDown={event => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault(); go(Math.max(0, Math.min(state.frames.length - 1, active + (event.key === 'ArrowRight' ? 1 : -1))));
      }}>
      {state.frames.map((frame, index) => <figure className="comparison-frame" key={frame.image.src}>
        <figcaption>{String(index + 1).padStart(2, '0')} · {frame.label}</figcaption>
        <img src={sitePath(frame.image.src)} alt={frame.image.alt} width={frame.image.width} height={frame.image.height} loading="lazy" />
      </figure>)}
    </div>
    <div className="comparison-controls" aria-label={`${state.label} screenshot navigation`}>
      {state.frames.map((frame, index) => <button key={frame.image.src} type="button" aria-label={`Show ${frame.label}`} aria-current={active === index ? 'step' : undefined} onClick={() => go(index)}><span /></button>)}
    </div>
  </div>;
}
