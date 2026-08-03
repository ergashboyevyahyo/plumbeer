import content from '../content.json'

const { links, socials } = content.footer
const { logo } = content.sections.nav

function toId(label) {
  return label.toLowerCase().replace(/\s+/g, '-')
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-text)]/12 px-4 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <a
          href="#home"
          className="block font-[var(--font-heading)] text-[clamp(3rem,12vw,9rem)] leading-none text-[var(--color-text)]"
        >
          {logo}
        </a>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap items-center gap-6">
            {links.map((link) => (
              <a
                key={link}
                href={`#${toId(link)}`}
                className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs uppercase tracking-[0.15em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                {social}
              </a>
            ))}
          </div>

          <p className="text-xs text-[var(--color-muted)]">
            &copy; {new Date().getFullYear()} {logo}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
