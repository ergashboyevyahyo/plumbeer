import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'

const { headline, subtext, items: services } = content.sections.services

export default function Services() {
  return (
    <section id="services" className="px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SplitHeading
            as="h2"
            text={headline}
            className="text-[clamp(2.25rem,5vw,4rem)] leading-[1] text-[var(--color-text)]"
          />
          <Reveal delay={0.15} className="max-w-xs text-sm text-[var(--color-muted)]">
            {subtext}
          </Reveal>
        </div>

        <div className="mt-12 border-t border-[var(--color-text)]/12">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05} y={20}>
              <div className="group grid grid-cols-[3rem_1fr] items-center gap-4 border-b border-[var(--color-text)]/12 py-6 transition-colors sm:grid-cols-[4rem_1fr_1fr] sm:gap-8 sm:py-7">
                <span className="text-sm text-[var(--color-muted)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-text)] transition-transform duration-500 group-hover:translate-x-2 sm:text-2xl">
                  {service.title}
                </h3>
                <p className="hidden text-sm text-[var(--color-muted)] sm:block">{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
