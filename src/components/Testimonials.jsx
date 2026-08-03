import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import content from '../content.json'
import SplitHeading from './SplitHeading.jsx'

const testimonials = content.sections.testimonials
const SLIDE_DURATION = 6

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const quoteRef = useRef(null)
  const progressRef = useRef(null)
  const progressTweenRef = useRef(null)

  useEffect(() => {
    indexRef.current = index
  }, [index])

  const transitionTo = (next) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setIndex(next)
      return
    }
    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -16,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => setIndex(next),
    })
  }

  const goNext = () => transitionTo((indexRef.current + 1) % testimonials.length)
  const goPrev = () => transitionTo((indexRef.current - 1 + testimonials.length) % testimonials.length)
  const goTo = (i) => {
    if (i !== indexRef.current) transitionTo(i)
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduced) {
      gsap.fromTo(quoteRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
    }

    if (reduced) return

    if (progressTweenRef.current) progressTweenRef.current.kill()
    gsap.set(progressRef.current, { scaleX: 0 })
    progressTweenRef.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: SLIDE_DURATION,
      ease: 'none',
      onComplete: goNext,
    })

    return () => progressTweenRef.current?.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const pause = () => progressTweenRef.current?.pause()
  const resume = () => progressTweenRef.current?.resume()

  const t = testimonials[index]

  return (
    <section
      id="reviews"
      className="px-4 py-20 sm:px-8 sm:py-28"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="mx-auto max-w-3xl text-center">
        <SplitHeading
          as="h2"
          text="What Homeowners Say"
          className="text-[clamp(2.25rem,5vw,4rem)] leading-[1] text-[var(--color-text)]"
        />

        <div className="relative mt-10 min-h-[11rem] sm:min-h-[9rem]">
          <div ref={quoteRef}>
            <Quote size={28} className="mx-auto text-[var(--color-muted)]" strokeWidth={1.5} />
            <p className="mt-6 font-[var(--font-heading)] text-[clamp(1.5rem,3.2vw,2.25rem)] leading-snug text-[var(--color-text)]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.15em] text-[var(--color-muted)]">{t.name}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            aria-label="Previous testimonial"
            onClick={goPrev}
            className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
            <span className="tabular-nums text-[var(--color-text)]">{String(index + 1).padStart(2, '0')}</span>
            <span className="relative h-px w-20 overflow-hidden bg-[var(--color-text)]/15 sm:w-28">
              <span ref={progressRef} className="absolute inset-0 origin-left scale-x-0 bg-[var(--color-text)]" />
            </span>
            <span className="tabular-nums">{String(testimonials.length).padStart(2, '0')}</span>
          </div>

          <button
            aria-label="Next testimonial"
            onClick={goNext}
            className="text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? 'bg-[var(--color-text)]' : 'bg-[var(--color-text)]/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
