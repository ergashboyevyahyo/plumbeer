import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { splitWords } from '../lib/splitWords.js'

gsap.registerPlugin(ScrollTrigger)

export default function SplitHeading({ text, as: Tag = 'h2', className = '', delay = 0, trigger = true }) {
  const containerRef = useRef(null)
  const words = splitWords(text)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const targets = el.querySelectorAll('span span')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'power4.out',
          stagger: 0.045,
          scrollTrigger: trigger
            ? {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              }
            : undefined,
        }
      )
    }, el)

    return () => ctx.revert()
  }, [text, delay, trigger])

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top pr-[0.25em]">
          <span className="inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  )
}
