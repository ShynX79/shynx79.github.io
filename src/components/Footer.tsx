import { FOOTER } from '../content';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="container-12 flex items-center justify-between py-8 font-mono text-[13px] text-[var(--text-muted)]">
        <p>{FOOTER.copyright}</p>
        <p className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--status-green)]" aria-hidden="true" />
          {FOOTER.status}
        </p>
      </div>
    </footer>
  );
}