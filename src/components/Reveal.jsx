import { useReveal } from '../lib/useReveal.js'

export default function Reveal({ children, delay = 0, y = 40, className = '', as: Tag = 'div' }) {
  const ref = useReveal({ delay, y })
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
