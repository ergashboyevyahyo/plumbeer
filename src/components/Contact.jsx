import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'

const { headline, subtext, phone, email, address, hours, form } = content.sections.contact

function ContactForm() {
  const [values, setValues] = useState({ name: '', phone: '', message: '' })

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `New inquiry from ${values.name || 'website visitor'}`
    const body = `Name: ${values.name}\nPhone: ${values.phone}\n\n${values.message}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const inputClass =
    'w-full border-b border-[var(--color-text)]/20 bg-transparent py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-text)] focus:outline-none'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input
        type="text"
        required
        placeholder={form.namePlaceholder}
        value={values.name}
        onChange={update('name')}
        className={inputClass}
      />
      <input
        type="tel"
        required
        placeholder={form.phonePlaceholder}
        value={values.phone}
        onChange={update('phone')}
        className={inputClass}
      />
      <textarea
        required
        rows={3}
        placeholder={form.messagePlaceholder}
        value={values.message}
        onChange={update('message')}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm tracking-wide text-[var(--color-inverse)] transition-opacity hover:opacity-85"
      >
        {form.submitLabel}
        <ArrowUpRight size={16} strokeWidth={1.75} />
      </button>
    </form>
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
