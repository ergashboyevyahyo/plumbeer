import { ShieldCheck, Star } from 'lucide-react'
import content from '../content.json'
import Reveal from './Reveal.jsx'

const { license, rating, badges } = content.sections.trust

export default function TrustBar() {
  return (
    <section className="border-y border-[var(--color-text)]/10 px-4 py-6 sm:px-8">
      <Reveal className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] sm:text-sm">
          <ShieldCheck size={16} strokeWidth={1.5} className="text-[var(--color-text)]" />
          {license}
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] sm:text-sm">
            <span className="flex items-center gap-0.5 text-[var(--color-text)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="text-[var(--color-text)]">{rating.score}</span>
            <span>
              · {rating.count} {rating.platform}
            </span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            {badges.map((b) => (
              <span key={b} className="text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]">
                {b}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
