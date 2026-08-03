import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'

gsap.registerPlugin(ScrollTrigger)

const { eyebrow, text, tags, images } = content.sections.about

export default function About() {
  const bigRef = useRef(null)
  const smallRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.to(bigRef.current.querySelector('img'), {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: bigRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.to(smallRef.current.querySelector('img'), {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: smallRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="px-4 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">{eyebrow}</span>
          <SplitHeading
            as="h2"
            text={text}
            className="mt-6 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.08] text-[var(--color-text)]"
          />
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">
                {tag}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="relative md:col-span-7">
          <div ref={bigRef} className="ml-auto h-[26rem] w-[85%] overflow-hidden sm:h-[34rem]">
            <img
              src={images[0].src}
              alt={images[0].alt}
              loading="lazy"
              className="h-[130%] w-full scale-105 object-cover grayscale"
            />
          </div>
          <div
            ref={smallRef}
            className="absolute -bottom-12 left-0 h-56 w-[55%] overflow-hidden border-8 border-[var(--color-background)] sm:h-72"
          >
            <img
              src={images[1].src}
              alt={images[1].alt}
              loading="lazy"
              className="h-[130%] w-full scale-105 object-cover grayscale"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
