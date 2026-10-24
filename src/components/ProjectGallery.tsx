import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '../content';
import { avif } from '../content';

interface Props {
  project: Project | null;
  onClose: () => void;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function ProjectGallery({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [closing, setClosing] = useState(false);
  const touchX = useRef<number | null>(null);

  const count = project?.screenshots.length ?? 0;

  // close with exit animation, then hand back to the parent
  const requestClose = useCallback(() => {
    if (closing) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      onClose();
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  }, [closing, onClose]);

  // open/close the native dialog + lock body scroll
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      setClosing(false);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      setIndex(0);
    }
    if (!project && dialog.open) {
      dialog.close();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  const go = useCallback(
    (delta: number) => {
      if (!count) return;
      setIndex((i) => (i + delta + count) % count);
    },
    [count]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  // ESC: intercept native cancel so the exit animation can play first
  const onCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    requestClose();
  };

  // clicking the padding area (the dialog itself) closes
  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) requestClose();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchX.current = null;
  };

  const shot = project?.screenshots[index];

  return (
    <dialog
      ref={dialogRef}
      className={`gallery${closing ? ' is-closing' : ''}`}
      aria-label={project ? `${project.name} screenshots` : 'Screenshot gallery'}
      onKeyDown={onKeyDown}
      onCancel={onCancel}
      onClick={onDialogClick}
      onClose={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {project && shot && (
        <div className="h-full overflow-y-auto p-4 sm:p-8">
          <div className="mx-auto max-w-[1100px]">
            {/* top row */}
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-[13px] text-[var(--text-muted)]">
                <span className="text-[var(--text)]">{pad(index + 1)}</span> / {pad(count)}
              </p>
              <button
                type="button"
                onClick={requestClose}
                className="btn btn-ghost !px-3 !py-1.5"
                aria-label="Close gallery"
              >
                x
                <span className="font-mono text-[11px] text-[var(--text-muted)]">esc</span>
              </button>
            </div>

            <div className="lg:flex lg:gap-8">
              {/* viewer */}
              <div className="lg:flex-1 min-w-0">
              <div className="relative flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="btn btn-ghost !px-2.5 !py-3 shrink-0"
                    onClick={() => go(-1)}
                    aria-label="Previous screenshot"
                  >
                    &lt;
                  </button>

                  <picture>
                    <source srcSet={avif(shot.src)} type="image/avif" />
                    <img
                      key={shot.src}
                      src={shot.src}
                      alt={`${project.name} — ${shot.caption}`}
                      width={1600}
                      height={1000}
                      className="shot border border-[var(--border)] w-full h-auto max-h-[62vh] object-contain bg-[var(--surface)]"
                    />
                  </picture>

                  <button
                    type="button"
                    className="btn btn-ghost !px-2.5 !py-3 shrink-0"
                    onClick={() => go(1)}
                    aria-label="Next screenshot"
                  >
                    &gt;
                  </button>
                </div>

                <p className="mt-4 font-mono text-[13px] text-[var(--text-muted)]">{shot.caption}</p>

                {/* thumbnails (desktop/tablet) */}
                <div className="hidden sm:flex gap-2 mt-4 flex-wrap">
                  {project.screenshots.map((s, i) => (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`Screenshot ${i + 1}: ${s.caption}`}
                      aria-current={i === index ? 'true' : undefined}
                      className={`w-24 shrink-0 border ${
                        i === index ? 'border-[var(--accent)]' : 'border-[var(--border)]'
                      }`}
                    >
                      <picture>
                        <source srcSet={avif(s.src)} type="image/avif" />
                        <img
                          src={s.src}
                          alt=""
                          width={1600}
                          height={1000}
                          loading="lazy"
                          className="aspect-[16/10] w-full object-cover"
                        />
                      </picture>
                    </button>
                  ))}
                </div>
              </div>

              {/* details */}
              <div className="lg:w-[300px] shrink-0 mt-8 lg:mt-0">
                <div className="lg:sticky lg:top-4">
                  <p className="flex items-center justify-between font-mono text-xs text-[var(--text-muted)] mb-3">
                    <span>{project.index}</span>
                    <span>{project.year}</span>
                  </p>
                  <h2 className="text-2xl font-semibold mb-3">{project.name}</h2>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">{project.description}</p>
                  <p className="text-sm font-medium text-[var(--accent)] mb-3">{project.metric}</p>
                  <p className="font-mono text-[13px] text-[var(--text-muted)] mb-5">{project.stack}</p>

                  <div className="flex gap-6 border-t border-[var(--border)] pt-4 font-mono text-xs">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text)] hover:text-[var(--accent)]"
                      >
                        Live -&gt;
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text)] hover:text-[var(--accent)]"
                      >
                        Source -&gt;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}