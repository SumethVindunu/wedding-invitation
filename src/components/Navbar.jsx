import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'

const LINKS = [
  { label: 'Our Story', href: '#gallery' },
  { label: 'Venue', href: '#location' },
  { label: 'RSVP', href: '#rsvp' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.brand}>S &amp; A</a>
      <ul className={styles.links}>
        {LINKS.map(l => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
