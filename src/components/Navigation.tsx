import { useEffect, useState } from 'react';
import { HERO, NAV, SITE } from '../content';

export function Navigation({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false);

  // close menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]">
      <div className="container-12 flex items-center justify-between h-16">
        {/* Wordmark */}
                <a href="#top" className="flex items-center gap-2 font-mono text-[var(--text)]" aria-label={`${SITE.wordmark} — home`}>
          <span className="text-[var(--accent)]" aria-hidden="true">{'>'}</span>
                  <span className="font-semibold tracking-tight">{SITE.wordmark}</span>
          <span className="caret" aria-hidden="true" />
        </a>

        {/* Center nav (desktop) */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link ${activeId === id ? 'is-active' : ''}`}
              aria-current={activeId === id ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Hire me (desktop) */}
          <a href="#contact" className="btn btn-ghost hidden md:inline-flex" aria-label="Hire me — go to contact">
            Hire me
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-green)]" aria-hidden="true" />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="btn btn-ghost md:hidden !px-3 !py-2"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'x' : 'menu'}
          </button>
        </div>
      </div>

      {/* Mobile full-width list */}
      {open && (
        <nav id="mobile-menu" className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]" aria-label="Mobile navigation">
          <ul className="container-12 py-2">
            {NAV.map(({ id, label }) => (
              <li key={id} className="border-b border-[var(--border)] last:border-b-0">
                <a
                  href={`#${id}`}
                  className={`nav-link block py-4 ${activeId === id ? 'is-active' : ''}`}
                  aria-current={activeId === id ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <a href="#contact" className="btn btn-ghost w-full justify-center" onClick={() => setOpen(false)}>
                Hire me
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-green)]" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}