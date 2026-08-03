import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import content from '../content.json'
import { getLenis } from '../lib/smoothScroll.js'

const { logo, links, cta } = content.sections.nav
const { phone, email } = content.sections.contact

function toId(label) {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)
  const lastY = useRef(0)
  const overlayRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastY.current && y > 120
      if (!open) {
        gsap.to(navRef.current, { yPercent: goingDown ? -100 : 0, duration: 0.5, ease: 'power3.out' })
      }
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    const lenis = getLenis()
    const linkItems = linksRef.current ? linksRef.current.querySelectorAll('a') : []
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (open) {
      lenis?.stop()
      gsap.set(overlayRef.current, { display: 'flex' })
      if (reduced) {
        gsap.set(overlayRef.current, { clipPath: 'inset(0 0 0% 0)' })
        gsap.set(linkItems, { opacity: 1, y: 0 })
      } else {
        gsap.fromTo(
          overlayRef.current,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power4.inOut' }
        )
        gsap.fromTo(
          linkItems,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, delay: 0.35, ease: 'power3.out' }
        )
      }
    } else {
      lenis?.start()
      if (overlayRef.current) {
        if (reduced) {
          gsap.set(overlayRef.current, { clipPath: 'inset(0 0 100% 0)', display: 'none' })
        } else {
          gsap.to(overlayRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.5,
            ease: 'power3.inOut',
            onComplete: () => gsap.set(overlayRef.current, { display: 'none' }),
          })
        }
      }
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header
        ref={navRef}
        className="fixed inset-x-0 top-0 z-[68] flex items-center justify-between px-4 py-5 sm:px-8"
      >
        <a
          href="#home"
          onClick={close}
          className={`font-[var(--font-heading)] text-lg tracking-tight transition-colors ${
            open ? 'text-[var(--color-inverse)]' : 'text-[var(--color-text)]'
          }`}
        >
          {logo}
        </a>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
          className={`relative flex h-4 w-5 flex-col justify-between transition-colors ${
            open ? 'text-[var(--color-inverse)]' : 'text-[var(--color-text)]'
          }`}
        >
          <span
            className={`h-px w-full bg-current transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`}
          />
          <span
            className={`h-px w-full bg-current transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`}
          />
        </button>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[65] hidden flex-col justify-between px-4 pb-5 pt-24 text-[var(--color-inverse)] sm:px-8 sm:pt-28"
        style={{ clipPath: 'inset(0 0 100% 0)', backgroundColor: 'var(--color-primary)' }}
      >
        <nav ref={linksRef} className="flex flex-col gap-2 sm:gap-3">
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${toId(link)}`}
              onClick={close}
              className="group flex items-baseline gap-4 font-[var(--font-heading)] text-[clamp(1.5rem,4.2vw,2.75rem)] leading-[1.15] text-[var(--color-inverse)]/90"
            >
              <span className="text-sm text-[var(--color-inverse)]/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[var(--color-inverse)]/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="relative inline-block transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:text-[var(--color-inverse)]">
                {link}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-all duration-500 ease-out group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-6 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1 text-sm text-[var(--color-inverse)]/60">
            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[var(--color-inverse)]">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="hover:text-[var(--color-inverse)]">
              {email}
            </a>
          </div>
          <a
            href="#contact"
            onClick={close}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-inverse)] px-6 py-3 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-[var(--color-inverse)] hover:text-[var(--color-primary)]"
          >
            {cta}
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </>
  )
}
