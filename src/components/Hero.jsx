import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../content.json'
import SplitHeading from './SplitHeading.jsx'
import MagneticButton from './MagneticButton.jsx'

gsap.registerPlugin(ScrollTrigger)

const { badge, headline, subtext, cta, image, imageAlt } = content.sections.hero

export default function Hero() {
  const imgWrapRef = useRef(null)
  const badgeRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [badgeRef.current, subRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, delay: 1.3, ease: 'power3.out' }
      )

      gsap.fromTo(
        imgWrapRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.3, delay: 1.5, ease: 'power4.inOut' }
      )

      if (!reduced) {
        gsap.to(imgWrapRef.current.querySelector('img'), {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="overflow-hidden px-4 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <div
            ref={badgeRef}
            className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]"
          >
            <span className="h-px w-8 bg-[var(--color-muted)]" />
            {badge}
          </div>

          <SplitHeading
            as="h1"
            text={headline}
            delay={0.6}
            trigger={false}
            className="text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1] text-[var(--color-text)]"
          />

          <div ref={subRef} className="mt-8 flex flex-col items-start gap-6">
            <p className="max-w-md text-base text-[var(--color-muted)] sm:text-lg">{subtext}</p>
            <MagneticButton
              as="a"
              href="#contact"
              className="inline-flex shrink-0 items-center gap-3 rounded-full border border-[var(--color-text)] px-7 py-3.5 text-sm tracking-wide text-[var(--color-text)] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-inverse)]"
            >
              {cta}
            </MagneticButton>
          </div>
        </div>

        <div
          ref={imgWrapRef}
          className="relative h-[50vh] w-full overflow-hidden lg:col-span-6 lg:h-[36rem]"
        >
          <img
            src={image}
            alt={imageAlt}
            loading="eager"
            className="h-[120%] w-full scale-105 object-cover grayscale"
          />
        </div>
      </div>
    </section>
  )
}
