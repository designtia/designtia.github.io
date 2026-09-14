'use client';

import { useEffect, useMemo, useState } from 'react';
import type { EditorialSection } from '@/content/case-studies/editorial-types';

type TOCItem = Pick<EditorialSection, 'id' | 'nav' | 'children'>;
export function CaseStudyTOC({ sections }: { sections: EditorialSection[] }) {
  const items: TOCItem[] = useMemo(() => [{ id: 'overview', nav: 'Overview' }, ...sections], [sections]);
  const flat = useMemo(() => items.flatMap(item => [item, ...(item.children ?? [])]), [items]);
  const [active, setActive] = useState('overview');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = Math.max(220, Math.min(window.innerHeight * 0.3, 300));
      let current = flat[0].id;
      for (const item of flat) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= readingLine) current = item.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [flat]);

  function navigate(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offset = window.innerWidth <= 700 ? 154 : window.innerWidth <= 1050 ? 178 : 132;
    window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - offset, behavior: reduced ? 'instant' : 'smooth' });
    target.focus({ preventScroll: true });
    history.pushState(null, '', `#${id}`);
    setActive(id);
  }

  return <>
    <aside className="editorial-toc">
      <nav aria-label="Case study contents">
        <p className="toc-label">On this page</p>
        <ol>{items.map(item => {
          const within = active === item.id || !!item.children?.some(child => child.id === active);
          return <li key={item.id}>
            <a href={`#${item.id}`} data-active={within} aria-current={active === item.id ? 'location' : undefined}
              onClick={event => { event.preventDefault(); navigate(item.id); }}>{item.nav}</a>
            {item.children && <ol className="toc-children" hidden={!within}>
              {item.children.map(child => <li key={child.id}><a href={`#${child.id}`} aria-current={active === child.id ? 'location' : undefined}
                onClick={event => { event.preventDefault(); navigate(child.id); }}>{child.nav}</a></li>)}
            </ol>}
          </li>;
        })}</ol>
      </nav>
    </aside>
    <div className="editorial-mobile-toc">
      <label htmlFor="case-study-section">On this page</label>
      <select id="case-study-section" value={active} onChange={event => navigate(event.target.value)}>
        {items.map(item => item.children ? <optgroup key={item.id} label={item.nav}>
          <option value={item.id}>{item.nav}</option>
          {item.children.map(child => <option key={child.id} value={child.id}>{child.nav}</option>)}
        </optgroup> : <option key={item.id} value={item.id}>{item.nav}</option>)}
      </select>
    </div>
  </>;
}
