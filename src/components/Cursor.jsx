import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduced || !canHover) return

    document.body.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const xTo = gsap.quickTo(dot, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.4, ease: 'power3.out' })
    const scaleTo = gsap.quickTo(dot, 'scale', { duration: 0.3, ease: 'power3.out' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-cursor="view"]')) scaleTo(2.4)
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-cursor="view"]')) scaleTo(1)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
}
