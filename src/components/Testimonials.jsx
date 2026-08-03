import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Quote } from 'lucide-react'
import content from '../content.json'
import SplitHeading from './SplitHeading.jsx'

const testimonials = content.sections.testimonials

function Card({ t }) {
  return (
    <div className="w-[85vw] max-w-md shrink-0 border border-[var(--color-text)]/12 p-8 sm:w-[28rem]">
      <Quote size={20} className="text-[var(--color-muted)]" strokeWidth={1.5} />
      <p className="mt-5 text-lg leading-relaxed text-[var(--color-text)]">&ldquo;{t.quote}&rdquo;</p>
      <p className="mt-6 text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">{t.name}</p>
    </div>
  )
}

function MarqueeRow({ items, direction = 1, duration = 32 }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const track = trackRef.current
    if (reduced || !track) return

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth / 2
      const tween = gsap.fromTo(
        track,
        { x: direction === 1 ? 0 : -distance },
        { x: direction === 1 ? -distance : 0, duration, ease: 'none', repeat: -1 }
      )
      track.addEventListener('mouseenter', () => tween.pause())
      track.addEventListener('mouseleave', () => tween.resume())
    })
    return () => ctx.revert()
  }, [direction, duration])

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max gap-6 px-4 sm:px-8">
        {[...items, ...items].map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const reversed = [...testimonials].reverse()

  return (
    <section id="reviews" className="overflow-hidden py-28 sm:py-40">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <SplitHeading
          as="h2"
          text="What Homeowners Say"
          className="text-[clamp(2.25rem,5vw,4rem)] leading-[1] text-[var(--color-text)]"
        />
      </div>

      <div className="mt-16 flex flex-col gap-6">
        <MarqueeRow items={testimonials} direction={1} duration={32} />
        <MarqueeRow items={reversed} direction={-1} duration={38} />
      </div>
    </section>
  )
}
