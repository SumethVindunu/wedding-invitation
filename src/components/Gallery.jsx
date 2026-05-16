import React, { useState } from 'react'
import styles from './Gallery.module.css'
import { useInView } from '../hooks/useInView'

// Placeholder images from Unsplash (romantic/wedding themed)
const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', alt: 'Couple at sunset' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80', alt: 'Wedding rings' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80', alt: 'Wedding flowers' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80', alt: 'Couple portrait' },
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80', alt: 'Wedding ceremony' },
  { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80', alt: 'Reception decor' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)
  const [ref, inView] = useInView()

  return (
    <section className={`${styles.section} ${inView ? styles.visible : ''}`} ref={ref}>
      <p className="section-label" style={{ textAlign: 'center' }}>Our Story</p>
      <div className="ornament">
        <span style={{ fontSize: '1rem', color: 'var(--gold)' }}>♦</span>
      </div>
      <h2 className={`section-title ${styles.title}`}>
        Moments <em>Together</em>
      </h2>

      <div className={styles.grid}>
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            className={styles.tile}
            onClick={() => setActive(photo)}
            style={{ animationDelay: `${i * 0.1}s` }}
            aria-label={`View photo: ${photo.alt}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <div className={styles.overlay}>
              <span className={styles.overlayIcon}>+</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div className={styles.lightbox} onClick={() => setActive(null)}>
          <button className={styles.close} onClick={() => setActive(null)} aria-label="Close">✕</button>
          <img
            src={active.src.replace('w=600', 'w=1200')}
            alt={active.alt}
            className={styles.lightboxImg}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
