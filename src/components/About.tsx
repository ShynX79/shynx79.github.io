import { ABOUT } from '../content';

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <div className="container-12">
        <h2 id="about-heading" className="section-head reveal">
          <span className="section-path">{ABOUT.path}</span>
        </h2>
        <p className="reveal text-lg sm:text-xl leading-[1.7] text-[var(--text)] max-w-[700px]">
          {ABOUT.body}
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 max-w-[900px]">
          <div className="reveal">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] pb-3 mb-6 border-b border-[var(--border)]">
              education
            </h3>
            <ul className="space-y-5">
              {ABOUT.education.map((e) => (
                <li key={e.school}>
                  <p className="text-[var(--text)]">{e.program}</p>
                  <p className="font-mono text-xs text-[var(--text-muted)] mt-1">
                    {e.school} | {e.date}
                    {e.note ? ` | ${e.note}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] pb-3 mb-6 border-b border-[var(--border)]">
              certifications
            </h3>
            <ul className="space-y-3">
              {ABOUT.certifications.map((c) => (
                <li key={c} className="text-sm leading-relaxed text-[var(--text-muted)]">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}