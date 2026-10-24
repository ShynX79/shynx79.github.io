import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently in view.
 * Uses scroll position against section offsets for reliable spy behaviour.
 */
export function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + 120; // just below the sticky nav
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      // bottom of page = last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);

  return active;
}