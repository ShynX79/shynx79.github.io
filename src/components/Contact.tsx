import { CONTACT, SITE } from '../content';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

export function Contact() {
  const [copied, copy] = useCopyToClipboard();

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className="container-12">
        <h2 id="contact-heading" className="section-head reveal">
          <span className="section-path">{CONTACT.path}</span>
        </h2>

        <div className="reveal max-w-3xl">
          {/* Command box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
            <p className="font-mono text-sm sm:text-base break-all">
              <span className="text-[var(--text-muted)]">{CONTACT.command}</span>{' '}
              <span className="text-[var(--accent)]">{SITE.email}</span>
            </p>
            <button
              type="button"
              className="btn btn-ghost shrink-0 justify-center"
              onClick={() => copy(SITE.email)}
            >
              {copied ? CONTACT.copiedLabel : CONTACT.copyLabel}
            </button>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {copied ? 'Email address copied to clipboard' : ''}
          </p>

          {/* Plain mono links */}
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm">
            {CONTACT.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-[var(--text-muted)]">{CONTACT.note}</p>
        </div>
      </div>
    </section>
  );
}