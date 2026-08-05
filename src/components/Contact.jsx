import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Check } from 'lucide-react'
import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'

const { headline, subtext, phone, email, address, hours, form } = content.sections.contact

function ContactForm() {
  const [values, setValues] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [view, setView] = useState('form') // 'form' | 'success'
  const wrapperRef = useRef(null)
  const errorRef = useRef(null)

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  useEffect(() => {
    if (status !== 'sent') return
    const timer = setTimeout(() => setStatus('idle'), 4000)
    return () => clearTimeout(timer)
  }, [status])

  // crossfade between the form and the success message
  useEffect(() => {
    const target = status === 'sent' ? 'success' : 'form'
    if (target === view) return

    const el = wrapperRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !el) {
      setView(target)
      return
    }

    gsap.to(el, {
      opacity: 0,
      y: -8,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => setView(target),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    const el = wrapperRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !el) return
    gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
  }, [view])

  useEffect(() => {
    if (status !== 'error' || !errorRef.current) return
    gsap.fromTo(errorRef.current, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' })
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const formData = new FormData()
      formData.append('access_key', form.web3formsAccessKey)
      formData.append('name', values.name)
      formData.append('phone', values.phone)
      formData.append('message', values.message)
      formData.append('subject', `New inquiry from ${values.name || 'website visitor'}`)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (data.success) {
        setStatus('sent')
        setValues({ name: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border-b border-[var(--color-text)]/20 bg-transparent py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors focus:border-[var(--color-text)] focus:outline-none disabled:opacity-50'

  return (
    <div ref={wrapperRef}>
      {view === 'success' ? (
        <div className="flex items-center gap-3 text-[var(--color-text)]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-inverse)]">
            <Check size={16} strokeWidth={2} />
          </span>
          <p className="text-sm">Message sent — we'll get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            required
            disabled={status === 'sending'}
            placeholder={form.namePlaceholder}
            value={values.name}
            onChange={update('name')}
            className={inputClass}
          />
          <input
            type="tel"
            required
            disabled={status === 'sending'}
            placeholder={form.phonePlaceholder}
            value={values.phone}
            onChange={update('phone')}
            className={inputClass}
          />
          <textarea
            required
            rows={3}
            disabled={status === 'sending'}
            placeholder={form.messagePlaceholder}
            value={values.message}
            onChange={update('message')}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm tracking-wide text-[var(--color-inverse)] transition-opacity hover:opacity-85 disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending...' : form.submitLabel}
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </button>
          {status === 'error' && (
            <p ref={errorRef} className="text-sm text-red-600">
              Something went wrong — try again or call us directly.
            </p>
          )}
        </form>
      )}
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1400px] border-t border-[var(--color-text)]/12 pt-12">
        <SplitHeading
          as="h2"
          text={headline}
          className="max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-[var(--color-text)]"
        />
        <Reveal delay={0.1} className="mt-4 max-w-md text-[var(--color-muted)]">
          {subtext}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-4">
              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="group flex items-center gap-3 text-[var(--color-text)]">
                <Phone size={16} strokeWidth={1.5} />
                <span className="border-b border-transparent transition-colors group-hover:border-[var(--color-text)]">{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="group flex items-center gap-3 text-[var(--color-text)]">
                <Mail size={16} strokeWidth={1.5} />
                <span className="border-b border-transparent transition-colors group-hover:border-[var(--color-text)]">{email}</span>
              </a>
              <span className="flex items-center gap-3 text-[var(--color-muted)]">
                <MapPin size={16} strokeWidth={1.5} />
                {address}
              </span>
            </div>

            <div className="mt-8 flex items-start gap-3">
              <Clock size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-[var(--color-muted)]" />
              <div className="flex flex-col gap-1.5">
                {hours.map((h) => (
                  <div key={h.days} className="flex items-baseline gap-3 text-sm">
                    <span className="w-32 shrink-0 text-[var(--color-text)]">{h.days}</span>
                    <span className="text-[var(--color-muted)]">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
