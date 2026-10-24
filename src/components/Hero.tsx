import { useEffect, useRef } from 'react';
import { HERO, avif } from '../content';
import { useLiveClock } from '../hooks/useLiveClock';

export function Hero() {
  const clock = useLiveClock();
  const photoRef = useRef<HTMLDivElement>(null);

  // subtle cursor tilt on desktop only (max 4deg)
  useEffect(() => {
    const frame = photoRef.current;
    if (!frame) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (min-width: 768px)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = frame.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      frame.style.transform = `perspective(900px) rotateY(${(dx * 4).toFixed(2)}deg) rotateX(${(-dy * 4).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      frame.style.transform = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="top" className="pt-32 pb-24 md:pt-40 md:pb-32" aria-label="Introduction">
      <div className="container-12 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column */}
        <div className="order-2 md:order-1 reveal">
          <p className="font-mono text-sm text-[var(--text-muted)] mb-6">{HERO.prompt}</p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.05] mb-4">
            {HERO.name}
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-[var(--accent)] mb-6">
            {HERO.role}
            <span className="caret ml-2" aria-hidden="true" />
          </p>

          <p className="text-lg text-[var(--text-muted)] max-w-xl mb-10 leading-relaxed">
            {HERO.summary}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#work" className="btn btn-primary">{HERO.primaryCta}</a>
            <a href={HERO.resumeUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
              {HERO.secondaryCta}
            </a>
          </div>
        </div>

        {/* Right column: photo + ID panel */}
        <div className="hero-media order-1 md:order-2 reveal">
          <div
            ref={photoRef}
            className="photo-frame relative overflow-hidden border border-[var(--border)] mb-4"
            style={{ transition: 'transform 200ms ease-out' }}
          >
            {/* amber corner brackets */}
            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--accent)] z-10" aria-hidden="true" />
            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--accent)] z-10" aria-hidden="true" />
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--accent)] z-10" aria-hidden="true" />
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--accent)] z-10" aria-hidden="true" />

            <picture>
              <source srcSet={avif(HERO.photo.src)} type="image/avif" />
              <img
                src={HERO.photo.src}
                alt={HERO.photo.alt}
                width={HERO.photo.width}
                height={HERO.photo.height}
                className="w-full h-auto object-cover"
                style={{ filter: 'grayscale(1) sepia(0.25) brightness(0.95)' }}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>

          {/* ID panel */}
          <dl className="border border-[var(--border)] bg-[var(--surface)] font-mono text-[12px] sm:text-sm">
            {HERO.panel.map((row, i) => (
              <div
                key={row.key}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-4 ${i > 0 ? 'border-t border-[var(--border)]' : ''}`}
              >
                <dt className="shrink-0 text-[var(--text-muted)]">{row.key}:</dt>
                <dd className="min-w-0 break-words text-[var(--text)] text-right">
                  {row.live === 'clock' && (
                    <>
                      {row.value} <span className="text-[var(--accent)]">{clock} WIB</span>
                    </>
                  )}
                  {row.live === 'status' && (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-green)]" aria-hidden="true" />
                      {row.value}
                    </span>
                  )}
                  {!row.live && row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}