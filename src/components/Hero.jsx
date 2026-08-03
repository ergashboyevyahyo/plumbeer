import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../content.json'
import SplitHeading from './SplitHeading.jsx'
import MagneticButton from './MagneticButton.jsx'

gsap.registerPlugin(ScrollTrigger)

const { badge, headline, subtext, cta, image, imageAlt } = content.sections.hero

export default function Hero() {
  const sectionRef = useRef(null)
  const textWrapRef = useRef(null)
  const imageRef = useRef(null)
  const scrimRef = useRef(null)
  const subRef = useRef(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(prefersReduced)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [textWrapRef.current, imageRef.current],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, delay: 1.3, ease: 'power3.out' }
      )

      gsap.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.6, ease: 'power3.out' })

      if (!prefersReduced) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        tl.to(textWrapRef.current, { opacity: 0, scale: 0.9, y: -30, duration: 0.6, ease: 'none' }, 0)
          .to(imageRef.current, { scale: 1, borderRadius: 0, duration: 1, ease: 'none' }, 0)
          .to(scrimRef.current, { opacity: 0.35, duration: 1, ease: 'none' }, 0)
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        id="home"
        ref={sectionRef}
        className={`relative ${reduced ? '' : 'h-[220vh] sm:h-[240vh]'}`}
      >
        <div
          className={`flex h-screen w-full items-center justify-center overflow-hidden ${reduced ? '' : 'sticky top-0'}`}
        >
          <div
            ref={imageRef}
            className={`absolute inset-0 origin-center overflow-hidden ${
              reduced ? 'scale-100 rounded-none' : 'scale-[0.55] rounded-[2.5rem]'
            }`}
          >
            <img src={image} alt={imageAlt} className="h-full w-full object-cover grayscale" />
            <div ref={scrimRef} className={`absolute inset-0 bg-black ${reduced ? 'opacity-35' : 'opacity-0'}`} />
          </div>

          <div ref={textWrapRef} className="relative z-10 flex flex-col items-center px-4 text-center">
            <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
              <span className="h-px w-8 bg-[var(--color-muted)]" />
              {badge}
            </div>

            <SplitHeading
              as="h1"
              text={headline}
              delay={0.6}
              trigger={false}
              className="max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] text-[var(--color-text)]"
            />
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 pt-6 text-center sm:px-8 sm:pt-10">
        <div ref={subRef} className="mx-auto flex max-w-xl flex-col items-center gap-6">
          <p className="text-base text-[var(--color-muted)] sm:text-lg">{subtext}</p>
          <MagneticButton
            as="a"
            href="#contact"
            className="inline-flex shrink-0 items-center gap-3 rounded-full border border-[var(--color-text)] px-7 py-3.5 text-sm tracking-wide text-[var(--color-text)] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-inverse)]"
          >
            {cta}
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
