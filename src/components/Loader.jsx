import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import content from '../content.json'

export default function Loader({ onDone }) {
  const rootRef = useRef(null)
  const countRef = useRef(null)
  const lineRef = useRef(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setHidden(true)
      onDoneRef.current?.()
      return
    }

    const counter = { val: 0 }
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        setHidden(true)
        onDoneRef.current?.()
      },
    })

    tl.to(counter, {
      val: 100,
      duration: 1.4,
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = String(Math.floor(counter.val)).padStart(3, '0')
      },
    })
      .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' }, 0)
      .to(rootRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut', delay: 0.15 })

    return () => tl.kill()
  }, [])

  if (hidden) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[var(--color-primary)] text-[var(--color-inverse)]"
    >
      <span className="font-[var(--font-heading)] text-sm tracking-[0.3em]">{content.sections.nav.logo.toUpperCase()}</span>
      <span ref={countRef} className="mt-4 text-6xl tabular-nums sm:text-7xl">
        000
      </span>
      <div className="mt-8 h-px w-40 bg-[var(--color-inverse)]/30">
        <div ref={lineRef} className="h-full origin-left scale-x-0 bg-[var(--color-inverse)]" />
      </div>
    </div>
  )
}
