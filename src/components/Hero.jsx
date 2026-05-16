import React, { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const contentRef = useRef(null)

  useEffect(() => {
    const els = contentRef.current?.querySelectorAll('[data-delay]')
    els?.forEach(el => {
      el.style.animationDelay = el.dataset.delay + 'ms'
      el.style.opacity = '0'
      el.classList.add('fade-up')
      setTimeout(() => { el.style.opacity = '' }, parseInt(el.dataset.delay))
    })
  }, [])

  return (
    <section className={styles.hero}>
      {/* Decorative floral corners */}
      <div className={styles.cornerTL} aria-hidden="true">✦</div>
      <div className={styles.cornerTR} aria-hidden="true">✦</div>
      <div className={styles.cornerBL} aria-hidden="true">✦</div>
      <div className={styles.cornerBR} aria-hidden="true">✦</div>

      {/* Petal particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className={styles.petal} style={{
          left: `${10 + i * 12}%`,
          animationDelay: `${i * 1.5}s`,
          animationDuration: `${8 + i * 1.2}s`
        }} aria-hidden="true">🌸</div>
      ))}

      <div className={styles.inner} ref={contentRef}>
        <p className={`section-label ${styles.label}`} data-delay="200">
          Together with their families
        </p>

        <div className={styles.names} data-delay="500">
          <span className={styles.name}>Sophia</span>
          <span className={styles.ampersand}>&amp;</span>
          <span className={styles.name}>Alexander</span>
        </div>

        <div className={styles.ornamentWrap} data-delay="700">
          <div className="ornament">
            <span style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>♦</span>
          </div>
        </div>

        <p className={styles.invite} data-delay="900">
          joyfully invite you to celebrate their marriage
        </p>

        <div className={styles.dateBlock} data-delay="1100">
          <div className={styles.dateItem}>
            <span className={styles.dateBig}>14</span>
            <span className={styles.dateSub}>February</span>
          </div>
          <div className={styles.dateDivider}></div>
          <div className={styles.dateItem}>
            <span className={styles.dateBig}>2026</span>
            <span className={styles.dateSub}>Saturday · 4:00 PM</span>
          </div>
        </div>

        <p className={styles.venue} data-delay="1300">
          The Grand Colombo Ballroom<br />
          <span className={styles.venueAddress}>No. 1 Galle Face, Colombo 03, Sri Lanka</span>
        </p>

        <a href="#rsvp" className={styles.cta} data-delay="1500">
          Kindly RSVP
        </a>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>scroll</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  )
}
