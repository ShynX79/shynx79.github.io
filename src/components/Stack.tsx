import { STACK } from '../content';

export function Stack() {
  return (
    <section id="stack" className="section" aria-labelledby="stack-heading">
      <div className="container-12">
        <h2 id="stack-heading" className="section-head reveal">
          <span className="section-path">{STACK.path}</span>
          <span className="section-meta">{STACK.count}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STACK.groups.map((group) => (
            <div key={group.title} className="reveal">
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
      </div>
    </section>
  );
}