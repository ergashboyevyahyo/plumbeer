import { Phone } from 'lucide-react'
import content from '../content.json'

const { phone } = content.sections.contact

export default function StickyCallButton() {
  return (
    <a
      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
      className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] py-4 text-sm font-medium uppercase tracking-[0.1em] text-[var(--color-inverse)] shadow-lg shadow-black/20 sm:hidden"
    >
      <Phone size={16} strokeWidth={1.75} />
      Call Now — {phone}
    </a>
  )
}
