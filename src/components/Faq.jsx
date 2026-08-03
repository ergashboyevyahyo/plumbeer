import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Plus } from 'lucide-react'
import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'

const { eyebrow, headline, items } = content.sections.faq

function FaqItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    if (isOpen && bodyRef.current) {
      gsap.set(bodyRef.current, { height: 'auto' })
    }
    // run once on mount only, to reflect default-open item without animating
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const opening = !isOpen
    onToggle()

    if (!bodyRef.current) return

    if (reduced) {
      gsap.set(bodyRef.current, { height: opening ? 'auto' : 0 })
      return
    }

    if (opening) {
      const target = innerRef.current.offsetHeight
      gsap.fromTo(bodyRef.current, { height: 0 }, { height: target, duration: 0.45, ease: 'power3.inOut' })
    } else {
      gsap.to(bodyRef.current, { height: 0, duration: 0.4, ease: 'power3.inOut' })
    }
  }

  return (
    <div className="border-b border-[var(--color-text)]/12">
      <button
        onClick={handleClick}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-[var(--font-heading)] text-lg text-[var(--color-text)] sm:text-xl">{item.q}</span>
        <Plus
          size={18}
          strokeWidth={1.5}
          className={`shrink-0 text-[var(--color-muted)] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        />
      </button>
      <div ref={bodyRef} className="h-0 overflow-hidden">
        <p ref={innerRef} className="pb-6 pr-10 text-sm leading-relaxed text-[var(--color-muted)]">
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">{eyebrow}</span>
        <SplitHeading
          as="h2"
          text={headline}
          className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] text-[var(--color-text)]"
        />

        <Reveal delay={0.15} className="mt-12 border-t border-[var(--color-text)]/12">
          {items.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
