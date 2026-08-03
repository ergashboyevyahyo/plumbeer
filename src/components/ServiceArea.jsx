import { MapPin } from 'lucide-react'
import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'

const { eyebrow, headline, cities } = content.sections.serviceArea

export default function ServiceArea() {
  return (
    <section className="bg-[var(--color-secondary)] px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
          <MapPin size={14} strokeWidth={1.5} />
          {eyebrow}
        </div>
        <SplitHeading
          as="h2"
          text={headline}
          className="mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-[var(--color-text)]"
        />

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          {cities.map((city) => (
            <span
              key={city}
              className="rounded-full border border-[var(--color-text)]/15 px-5 py-2 text-sm text-[var(--color-text)]"
            >
              {city}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
