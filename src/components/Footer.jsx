import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.motif} aria-hidden="true">✦ ♦ ✦</div>
      <p className={styles.names}>Sophia &amp; Alexander</p>
      <p className={styles.date}>14 · II · 2026</p>
      <p className={styles.note}>
        With love &amp; gratitude for sharing our joy
      </p>
    </footer>
  )
}
