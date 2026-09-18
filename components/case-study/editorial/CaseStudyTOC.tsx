'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { sitePath } from '@/lib/site-path';
import type { EditorialSection } from '@/content/case-studies/editorial-types';

type TOCItem = Pick<EditorialSection, 'id' | 'nav' | 'children'>;
export function CaseStudyTOC({ sections }: { sections: EditorialSection[] }) {
  const items: TOCItem[] = useMemo(() => [{ id: 'overview', nav: 'Overview' }, ...sections.filter(section => !section.hideFromTOC)], [sections]);
  const flat = useMemo(() => items.flatMap(item => [item, ...(item.children ?? [])]), [items]);
  const [active, setActive] = useState('overview');
  const navigationTarget = useRef<string | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      // Hold the clicked item through smooth scrolling and late layout settling.
      if (navigationTarget.current) return;
      const readingLine = Math.max(220, Math.min(window.innerHeight * 0.3, 300));
      let current = flat[0].id;
      for (const item of flat) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= readingLine) current = item.id;
      }
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resumeScrollspy = () => { navigationTarget.current = null; };
    const onKey = (event: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) resumeScrollspy();
    };
    const onPointer = (event: PointerEvent) => {
      // A scrollbar drag is also intentional manual navigation.
      if (event.clientX >= document.documentElement.clientWidth) resumeScrollspy();
    };
    window.addEventListener('wheel', resumeScrollspy, { passive: true });
    window.addEventListener('touchstart', resumeScrollspy, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('hashchange', resumeScrollspy);
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', resumeScrollspy);
      window.removeEventListener('touchstart', resumeScrollspy);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('hashchange', resumeScrollspy);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [flat]);

  function navigate(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    navigationTarget.current = id;
    setActive(id);
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
        <a className="toc-home" href={sitePath('/')}><img className="navigation-arrow" src={sitePath("/icons/arrow-left.svg")} width={16} height={16} alt="" /> Back to Home</a>
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
      <a className="toc-home" href={sitePath('/')}><img className="navigation-arrow" src={sitePath("/icons/arrow-left.svg")} width={16} height={16} alt="" /> Back to Home</a>
      <select aria-label="Case study section" id="case-study-section" value={active} onChange={event => navigate(event.target.value)}>
        {items.map(item => item.children ? <optgroup key={item.id} label={item.nav}>
          <option value={item.id}>{item.nav}</option>
          {item.children.map(child => <option key={child.id} value={child.id}>{child.nav}</option>)}
        </optgroup> : <option key={item.id} value={item.id}>{item.nav}</option>)}
      </select>
    </div>
  </>;
}
