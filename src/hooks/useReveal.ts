import { useEffect } from 'react';

/**
 * Scroll-reveal: adds `.is-visible` once to every `.reveal` element
 * when it enters the viewport. Respects prefers-reduced-motion.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}