import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Menu, X } from 'lucide-react'
import content from '../content.json'
import MagneticButton from './MagneticButton.jsx'

const { logo, links, cta } = content.sections.nav

function toId(label) {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastY.current && y > 120
      gsap.to(navRef.current, { yPercent: goingDown ? -100 : 0, duration: 0.5, ease: 'power3.out' })
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[var(--color-text)]/10 bg-[var(--color-background)]/85 px-4 py-5 backdrop-blur sm:px-8"
    >
      <a href="#home" className="font-[var(--font-heading)] text-lg tracking-tight text-[var(--color-text)]">
        {logo}
      </a>

      <nav className="hidden items-center gap-9 md:flex">
        {links.map((link) => (
          <a
            key={link}
            href={`#${toId(link)}`}
            data-cursor="view"
            className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
          >
            {link}
          </a>
        ))}
      </nav>

      <MagneticButton
        as="a"
        href="#contact"
        className="hidden rounded-full border border-[var(--color-text)] px-5 py-2 text-xs uppercase tracking-[0.15em] text-[var(--color-text)] transition-colors hover:bg-[var(--color-text)] hover:text-[var(--color-inverse)] md:inline-block"
      >
        {cta}
      </MagneticButton>

      <button
        aria-label="Toggle menu"
        className="text-[var(--color-text)] md:hidden"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full flex flex-col gap-1 border-b border-[var(--color-text)]/10 bg-[var(--color-background)] p-4 md:hidden">
          {links.map((link) => (
            <a
              key={link}
              href={`#${toId(link)}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-secondary)]"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-[var(--color-accent)] px-4 py-2.5 text-center text-sm text-[var(--color-inverse)]"
          >
            {cta}
          </a>
        </nav>
      )}
    </header>
  )
}
