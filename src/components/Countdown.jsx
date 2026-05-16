import React, { useState, useEffect } from 'react'
import styles from './Countdown.module.css'
import { useInView } from '../hooks/useInView'

const WEDDING_DATE = new Date('2026-05-19T16:00:00')

function pad(n) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const now = new Date()
  const diff = WEDDING_DATE - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft())
  const [ref, inView] = useInView()

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className={`${styles.section} ${inView ? styles.visible : ''}`} ref={ref}>
      <p className="section-label" style={{ textAlign: 'center' }}>Counting down to</p>
      <div className="ornament">
        <span style={{ fontSize: '1rem', color: 'var(--gold)' }}>♦</span>
      </div>
      <h2 className={`section-title ${styles.title}`}>
        The Big <em>Day</em>
      </h2>

      <div className={styles.grid}>
        {[
          { value: time.days, label: 'Days' },
          { value: pad(time.hours), label: 'Hours' },
          { value: pad(time.minutes), label: 'Minutes' },
          { value: pad(time.seconds), label: 'Seconds' },
        ].map(({ value, label }, i) => (
          <div key={label} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className={styles.number}>{value}</span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>

      <p className={styles.dateNote}>
        Saturday, 14 February 2026 &nbsp;·&nbsp; 4:00 PM
      </p>
    </section>
  )
}
