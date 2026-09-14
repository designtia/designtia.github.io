'use client';
import { useEffect } from 'react';
export function MediaReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('media-arrived'); observer.unobserve(entry.target); }
    }), { threshold: .06 });
    document.querySelectorAll('[data-media-reveal]').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
