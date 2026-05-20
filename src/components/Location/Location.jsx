import React from 'react'
import styles from './Location.module.css'
import { FiMapPin, FiClock, FiPhone, FiInstagram } from 'react-icons/fi'

const schedule = [
  { day: 'Lunes – Viernes', hours: '09:00 – 20:00' },
  { day: 'Sábados', hours: '09:00 – 18:00' },
  { day: 'Domingos', hours: 'Cerrado' },
]

export default function Location() {
  return (
    <section id="location" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>
            <div className={styles.line}></div>
            <span>ENCONTRANOS</span>
          </div>
          <h2 className={styles.title}>Vení a<br /><em>vernos</em></h2>

          <div className={styles.infoBlock}>
            <FiMapPin className={styles.icon} />
            <div>
              <strong>Dirección</strong>
              <p>Rivadavia, Mendoza, Argentina</p>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <FiClock className={styles.icon} />
            <div>
              <strong>Horarios</strong>
              {schedule.map((s, i) => (
                <p key={i} className={s.hours === 'Cerrado' ? styles.closed : ''}>
                  <span>{s.day}</span> — {s.hours}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.infoBlock}>
            <FiPhone className={styles.icon} />
            <div>
              <strong>Teléfono / WhatsApp</strong>
              <p>+54 9 2627 000-000</p>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <FiInstagram className={styles.icon} />
            <div>
              <strong>Instagram</strong>
              <p>@faca.barberia</p>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <iframe
            title="Ubicación Faca Barbería"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53694.97328867424!2d-68.47774!3d-33.1933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96823b0d4b7e9e7f%3A0x8d8b1e28cf3e0d1!2sRivadavia%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className={styles.mapOverlay}></div>
        </div>
      </div>
    </section>
  )
}