import content from '../content.json'
import Reveal from './Reveal.jsx'

const stats = content.sections.stats

export default function Stats() {
  return (
    <section className="border-y border-[var(--color-text)]/10 bg-[var(--color-primary)] px-4 py-16 text-[var(--color-inverse)] sm:px-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1} y={24} className="border-l border-[var(--color-inverse)]/15 pl-5">
            <div className="font-[var(--font-heading)] text-4xl sm:text-5xl">{stat.value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.15em] text-[var(--color-inverse)]/60">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
