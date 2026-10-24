import { LOG, LOG_META } from '../content';

export function Experience() {
  return (
    <section id="log" className="section" aria-labelledby="log-heading">
      <div className="container-12">
        <h2 id="log-heading" className="section-head reveal">
          <span className="section-path">{LOG_META.path}</span>
          <span className="section-meta">{LOG_META.command}</span>
        </h2>

        <div className="reveal">
          {LOG.map((entry) => (
            <div key={entry.hash} className="relative pl-8 pb-10 last:pb-0">
              {/* rail + node */}
              <span
                className={`absolute left-[3px] top-2 w-[9px] h-[9px] ${entry.head ? 'bg-[var(--accent)]' : 'bg-[var(--text-muted)]'}`}
                aria-hidden="true"
              />
              <span
                className="absolute left-[7px] top-4 bottom-0 w-px bg-[var(--border)] last:hidden"
                aria-hidden="true"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-2">
                <p className="font-mono text-[13px] text-[var(--text-muted)]">
                  <span className={entry.head ? 'text-[var(--accent)]' : ''}>{entry.hash}</span>
                  {entry.head && <span className="ml-2">(HEAD -&gt; main)</span>}
                </p>
                <p className="font-mono text-[13px] text-[var(--text-muted)]">{entry.date}</p>
              </div>

              <p className="mb-2">
                <span className="font-semibold">{entry.role}</span>{' '}
                <span className="text-[var(--text-muted)]">at</span>{' '}
                <span className="font-semibold">{entry.company}</span>
              </p>

              <ul className="space-y-1">
                {entry.lines.map((line) => (
                  <li key={line} className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}