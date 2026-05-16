import React, { useEffect, useRef } from 'react'
import styles from './Location.module.css'
import { useInView } from '../hooks/useInView'

// Venue coordinates — The Grand Colombo area
const VENUE = {
  lat: 6.9154,
  lng: 79.9731,
  name: 'The Grand Colombo Ballroom',
  address: 'No. 1 Galle Face, Colombo 03, Sri Lanka',
}

//6.915431397624183, 79.97312956885048

export default function Location() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (!inView || mapInstanceRef.current) return

    // Lazy-load Leaflet
    const init = async () => {
      const L = await import('leaflet')

      // Fix leaflet default marker icons
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (!mapRef.current || mapInstanceRef.current) return

      const map = L.map(mapRef.current, {
        center: [VENUE.lat, VENUE.lng],
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      // Custom gold marker
      const goldIcon = L.divIcon({
        html: `
          <div style="
            width: 36px; height: 36px;
            background: #C9A96E;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid #FBF8F3;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex; align-items: center; justify-content: center;
          ">
            <div style="transform: rotate(45deg); color: #FBF8F3; font-size: 14px;">♦</div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -40],
        className: '',
      })

      const marker = L.marker([VENUE.lat, VENUE.lng], { icon: goldIcon }).addTo(map)
      marker.bindPopup(`
        <div style="font-family: 'Cormorant Garamond', serif; text-align: center; padding: 0.25rem 0.5rem;">
          <strong style="font-size: 1rem; display: block; margin-bottom: 2px;">${VENUE.name}</strong>
          <span style="font-size: 0.8rem; color: #8B7D6B; font-style: italic;">${VENUE.address}</span>
        </div>
      `).openPopup()

      mapInstanceRef.current = map
    }

    init()
  }, [inView])

  return (
    <section
      className={`${styles.section} ${inView ? styles.visible : ''}`}
      ref={ref}
      id="location"
    >
      <div className={styles.content}>
        <p className="section-label">Find Us</p>
        <div className="ornament">
          <span style={{ fontSize: '1rem', color: 'var(--gold)' }}>♦</span>
        </div>
        <h2 className={`section-title ${styles.title}`}>
          The <em>Venue</em>
        </h2>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>◈</span>
            <div>
              <strong>The Grand Colombo Ballroom</strong>
              <p>No. 1 Galle Face, Colombo 03, Sri Lanka</p>
            </div>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>◷</span>
            <div>
              <strong>Ceremony begins</strong>
              <p>Saturday, 14 February 2026 · 4:00 PM</p>
            </div>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>◉</span>
            <div>
              <strong>Parking available</strong>
              <p>Complimentary valet parking provided</p>
            </div>
          </div>
        </div>

        <a
          href={`https://maps.google.com/?q=${VENUE.lat},${VENUE.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.directions}
        >
          Get Directions ↗
        </a>
      </div>

      <div className={styles.mapWrap}>
        <div ref={mapRef} className={styles.map}></div>
      </div>
    </section>
  )
}
