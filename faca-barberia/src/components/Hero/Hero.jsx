import React, { useEffect, useRef } from 'react'
import styles from './Hero.module.css'
import { FiScissors, FiCalendar, FiMapPin } from 'react-icons/fi'

// IMPORT DEL LOGO (Guarda tu imagen en la carpeta src/assets/ como logo.png)
import logoBarberia from '../../assets/logo.png'

export default function Hero() {
  const ref = useRef(null)

  const handleBooking = () => {
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className={styles.hero} ref={ref}>
      <div className={styles.bg}>
        <div className={styles.grain}></div>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.diagonalLine}></div>
        <div className={styles.diagonalLine2}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.badge}>
          <FiMapPin size={12} />
          <span>Rivadavia, Mendoza</span>
        </div>

        <div className={styles.tagline}>
          <span>EST. 2015</span>
          <div className={styles.taglineLine}></div>
          <span>BARBERÍA CLÁSICA</span>
        </div>

        {/* CONTENEDOR NUEVO: Agrupa el título y el logo uno al lado del otro */}
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>
            <span className={styles.titleSmall}>La barbería</span>
            <span className={styles.titleBig}>FACA</span>
            <span className={styles.titleItalic}>de confianza</span>
          </h1>
          
          {/* Si subiste la imagen a src/assets/, usa la variable {logoBarberia}.
            Si la subiste a la carpeta public/, borra el import de arriba y cambia 
            el src a: src="/logo.png" 
          */}
          <img src={logoBarberia} alt="Logo Faca" className={styles.heroLogo} />
        </div>

        <p className={styles.subtitle}>
          Cortes que definen carácter. Artes del barbero<br />
          ejecutadas con precisión, estilo y tradición.
        </p>

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleBooking}>
            <FiCalendar />
            <span>Reservar Turno</span>
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Servicios
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>10+</span>
            <span className={styles.statLabel}>Años de experiencia</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>3</span>
            <span className={styles.statLabel}>Barberos expertos</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statNum}>6</span>
            <span className={styles.statLabel}>Servicios disponibles</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  )
}