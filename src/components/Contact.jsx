import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import content from '../content.json'
import Reveal from './Reveal.jsx'
import SplitHeading from './SplitHeading.jsx'

const { headline, subtext, phone, email, address, hours } = content.sections.contact

export default function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[1400px] border-t border-[var(--color-text)]/12 pt-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-end">
          <SplitHeading
            as="h2"
            text={headline}
            className="md:col-span-7 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-[var(--color-text)]"
          />
          <Reveal delay={0.2} className="md:col-span-5">
            <p className="text-[var(--color-muted)]">{subtext}</p>
            <div className="mt-8 flex flex-col gap-4">
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
        </div>
      </div>
    </section>
  )
}
