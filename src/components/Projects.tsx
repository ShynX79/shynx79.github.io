import { useCallback, useEffect, useRef, useState } from 'react';
import { PROJECTS, PROJECTS_META, avif, type Project } from '../content';

interface Props {
  onOpen: (project: Project) => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function Projects({ onOpen }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scrollToSlide = useCallback(
    (idx: number) => {
      const scroller = scrollerRef.current;
      const target = slideRefs.current[idx];
      if (!scroller || !target) return;
      // carousel now has position:relative, so target.offsetLeft is already
      // relative to the scroller content box.
      const targetLeft = target.offsetLeft;
      const centerOffset = (scroller.clientWidth - target.offsetWidth) / 2;
      scroller.scrollTo({
        left: targetLeft - centerOffset,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    },
    [prefersReducedMotion]
  );

  // Wrap-around navigation: step(1) at the last slide lands on the first, etc.
  const step = useCallback(
    (delta: number) => {
      const n = PROJECTS.length;
      scrollToSlide((active + delta + n) % n);
    },
    [active, scrollToSlide]
  );

  // Coverflow: transform each slide by its distance from the scroller center,
  // and derive the active index from scroll position (no animation race).
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const MAX_ROTATE = 34; // deg per card-width
    const DEPTH = 150; // px translateZ per card-width
    const SCALE_STEP = 0.16;
    const FADE = 0.38;

    let raf = 0;
    const apply = () => {
      const centerX = scroller.scrollLeft + scroller.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      for (const [i, el] of slideRefs.current.entries()) {
        if (!el) continue;
        const w = el.offsetWidth || 1;
        const d = Math.max(-2.5, Math.min(2.5, (el.offsetLeft + w / 2 - centerX) / w));
        const abs = Math.abs(d);
        if (abs < bestDist) {
          bestDist = abs;
          bestIdx = i;
        }
        if (prefersReducedMotion) continue;
        const scale = 1 - Math.min(abs, 1) * SCALE_STEP;
        const rotate = -d * MAX_ROTATE;
        const tz = -Math.min(abs, 1) * DEPTH;
        el.style.transform = `translateZ(${tz}px) rotateY(${rotate}deg) scale(${scale})`;
        el.style.opacity = String(Math.max(0.3, 1 - abs * FADE));
        el.style.zIndex = String(1000 - Math.round(abs * 100));
      }
      setActive((prev) => (bestIdx === prev ? prev : bestIdx));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    apply();
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        step(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        step(1);
      }
    },
    [step]
  );

  return (
    <section id="work" className="section" aria-labelledby="work-heading">
      <div className="container-12">
        <h2 id="work-heading" className="section-head reveal">
          <span className="section-path">{PROJECTS_META.path}</span>
          <span className="section-meta">{PROJECTS_META.count}</span>
        </h2>

        {/* Horizontal scroll-snap scroller */}
        <div
          ref={scrollerRef}
          className="carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {PROJECTS.map((p, i) => (
            <article
              key={p.slug}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className={`card carousel-slide relative ${
                active === i ? 'is-active' : ''
              }`}
              aria-roledescription="slide"
              aria-label={`${pad(i + 1)} of ${pad(PROJECTS.length)}: ${p.name}`}
            >
              <div className="overflow-hidden">
                <picture>
                  <source srcSet={avif(p.screenshots[0].src)} type="image/avif" />
                  <img
                    src={p.screenshots[0].src}
                    alt={`${p.name} — ${p.screenshots[0].caption}`}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="card-shot block"
                  />
                </picture>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] mb-3">
                  <span>{p.index}</span>
                  <span>{p.year}</span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{p.name}</h3>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">
                  {p.description}
                </p>

                <p className="text-sm font-medium text-[var(--accent)] mb-3">{p.metric}</p>

                <p className="font-mono text-[13px] text-[var(--text-muted)]">{p.stack}</p>

                <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between font-mono text-xs">
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 text-[var(--text)] hover:text-[var(--accent)] py-1"
                    >
                      {'Live ->'}
                    </a>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                  {p.sourceUrl ? (
                    <a
                      href={p.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 text-[var(--text)] hover:text-[var(--accent)] py-1"
                    >
                      {'Source ->'}
                    </a>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </div>
              </div>

              {/* Full-card overlay button: center opens gallery, side slides recenter */}
              <button
                type="button"
                className="absolute inset-0 z-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                onClick={() => (i === active ? onOpen(p) : scrollToSlide(i))}
              >
                <span className="sr-only">
                  {i === active
                    ? `Open screenshot gallery for ${p.name}`
                    : `Bring ${p.name} to center`}
                </span>
              </button>
            </article>
          ))}
        </div>

        {/* Terminal-style controls */}
        <div className="carousel-controls">
          <button
            type="button"
            className="carousel-btn"
            onClick={() => step(-1)}
            aria-label="Previous project"
          >
            [ &larr; prev ]
          </button>
          <span className="carousel-counter" aria-live="polite" aria-atomic="true">
            [ {pad(active + 1)} / {pad(PROJECTS.length)} ]
          </span>
          <button
            type="button"
            className="carousel-btn"
            onClick={() => step(1)}
            aria-label="Next project"
          >
            [ next &rarr; ]
          </button>
        </div>
      </div>
    </section>
  );
}