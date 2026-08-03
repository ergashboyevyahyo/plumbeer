import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'

const { eyebrow, headline, items } = content.sections.gallery

export default function Gallery() {
  return (
    <section className="px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1400px]">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">{eyebrow}</span>
        <SplitHeading
          as="h2"
          text={headline}
          className="mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02] text-[var(--color-text)]"
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="group">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full scale-105 object-cover grayscale transition-all duration-700 ease-out group-hover:scale-100 group-hover:grayscale-0"
                />
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
