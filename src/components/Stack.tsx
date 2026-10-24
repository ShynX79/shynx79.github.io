import { useCallback, useEffect, useRef, useState } from 'react';
import { STACK } from '../content';

const pad = (n: number) => String(n).padStart(2, '0');

export function Stack() {
  const railRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const total = STACK.groups.length;

  // Active group from scroll position (keeps swipe + buttons in sync).
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let raf = 0;
    const update = () => {
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      groupRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive((p) => (p === best ? p : best));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    rail.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      rail.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const step = useCallback(
    (delta: number) => {
      const rail = railRef.current;
      const idx = Math.max(0, Math.min(total - 1, active + delta));
      const el = groupRefs.current[idx];
      if (!rail || !el) return;
      rail.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
    },
    [active, total]
  );

  return (
    <section id="stack" className="section" aria-labelledby="stack-heading">
      <div className="container-12">
        <h2 id="stack-heading" className="section-head reveal">
          <span className="section-path">{STACK.path}</span>
          <span className="section-meta">{STACK.count}</span>
        </h2>

        <div
          ref={railRef}
          className="stack-rail"
          role="group"
          aria-label="Tech stack groups"
        >
          {STACK.groups.map((group, i) => (
            <div
              key={group.title}
              ref={(el) => {
                groupRefs.current[i] = el;
              }}
              className="stack-group reveal"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] pb-3 mb-6 border-b border-[var(--border)]">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="stack-item">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* prev/next controls: mobile only */}
        <div className="carousel-controls stack-controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => step(-1)}
            disabled={active === 0}
            aria-label="Previous stack group"
          >
            [ &larr; prev ]
          </button>
          <span className="carousel-counter" aria-live="polite" aria-atomic="true">
            [ {pad(active + 1)} / {pad(total)} ]
          </span>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => step(1)}
            disabled={active === total - 1}
            aria-label="Next stack group"
          >
            [ next &rarr; ]
          </button>
        </div>
      </div>
    </section>
  );
}
