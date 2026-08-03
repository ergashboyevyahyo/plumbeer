import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'
import MagneticButton from './MagneticButton.jsx'

const { headline, subtext, cta } = content.sections.partner

export default function Partner() {
  return (
    <section className="bg-[var(--color-primary)] px-4 py-20 text-center text-[var(--color-inverse)] sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SplitHeading
          as="h2"
          text={headline}
          className="text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05]"
        />
        <Reveal delay={0.2} className="mx-auto mt-6 max-w-md text-[var(--color-inverse)]/60">
          {subtext}
        </Reveal>
        <Reveal delay={0.3}>
          <MagneticButton
            as="a"
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 rounded-full border border-[var(--color-inverse)] px-8 py-4 text-sm uppercase tracking-[0.15em] text-[var(--color-inverse)] transition-colors hover:bg-[var(--color-inverse)] hover:text-[var(--color-primary)]"
          >
            {cta}
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
