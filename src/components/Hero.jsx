import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Phone } from 'lucide-react'
import content from '../content.json'
import SplitHeading from './SplitHeading.jsx'
import MagneticButton from './MagneticButton.jsx'

const { badge, headline, subtext, cta, image, imageAlt } = content.sections.hero
const { phone } = content.sections.contact

export default function Hero({ ready = true }) {
  const badgeRef = useRef(null)
  const subRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (!ready) {
      gsap.set([badgeRef.current, subRef.current], { opacity: 0, y: 20 })
      gsap.set(imageRef.current, { opacity: 0, y: 24 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [badgeRef.current, subRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 0.1, ease: 'power3.out' }
      )
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="home" className="px-4 pb-20 pt-32 text-center sm:px-8 sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <div
          ref={badgeRef}
          className="mb-6 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]"
        >
          <span className="h-px w-8 bg-[var(--color-muted)]" />
          {badge}
        </div>

        <SplitHeading
          as="h1"
          text={headline}
          delay={0}
          trigger={false}
          ready={ready}
          className="text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.1] text-[var(--color-text)]"
        />

        <div ref={subRef} className="mt-8 flex flex-col items-center gap-6">
          <p className="max-w-xl text-base text-[var(--color-muted)] sm:text-lg">{subtext}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <MagneticButton
              as="a"
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm tracking-wide text-[var(--color-inverse)] transition-opacity hover:opacity-85"
            >
              <Phone size={16} strokeWidth={1.75} />
              Call Now — {phone}
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex shrink-0 items-center gap-3 rounded-full border border-[var(--color-text)] px-7 py-3.5 text-sm tracking-wide text-[var(--color-text)] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-inverse)]"
            >
              {cta}
            </MagneticButton>
          </div>
        </div>
      </div>

      <div
        ref={imageRef}
        className="mx-auto mt-16 h-[42vh] max-w-6xl overflow-hidden rounded-[2rem] sm:h-[56vh]"
      >
        <img
          src={image}
          alt={imageAlt}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover grayscale"
        />
      </div>
    </section>
  )
}
