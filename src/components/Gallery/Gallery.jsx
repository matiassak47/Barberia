import React, { useState } from 'react'
import styles from './Gallery.module.css'
import img1 from '../../assets/galeria/img1.png'

const images = [
  { url: img1, label: 'Corte Clásico' },
  { url: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80', label: 'Degradé' },
  { url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80', label: 'Barba' },
  { url: 'https://images.unsplash.com/photo-1593702288056-7cc32a0ff6d5?w=600&q=80', label: 'Afeitado' },
  { url: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80', label: 'Estilo Moderno' },
  { url: 'https://images.unsplash.com/photo-1634302086687-4f03a8ecfc71?w=600&q=80', label: 'Detalle Barba' },
]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.line}></div>
            <span>GALERÍA</span>
            <div className={styles.line}></div>
          </div>
          <h2 className={styles.title}>Nuestro <em>trabajo</em><br />habla por sí solo</h2>
        </div>

        <div className={styles.grid}>
          {images.map((img, i) => (
            <div
              key={i}
              className={`${styles.item} ${i === 0 || i === 3 ? styles.tall : ''}`}
              onClick={() => setActive(img)}
            >
              <img src={img.url} alt={img.label} loading="lazy" />
              <div className={styles.overlay}>
                <span>{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div className={styles.lightbox} onClick={() => setActive(null)}>
          <img src={active.url.replace('w=600', 'w=1200')} alt={active.label} />
          <p>{active.label}</p>
          <button className={styles.closeBtn} onClick={() => setActive(null)}>✕</button>
        </div>
      )}
    </section>
  )
}