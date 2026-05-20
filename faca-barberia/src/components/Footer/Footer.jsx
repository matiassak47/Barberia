import React from 'react'
import styles from './Footer.module.css'
import { FiScissors, FiInstagram, FiFacebook, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <FiScissors />
            <span>FACA BARBERÍA</span>
          </div>
          <p>Arte, tradición y estilo en cada corte.<br />Rivadavia, Mendoza.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram"><FiInstagram /></a>
            <a href="#" aria-label="Facebook"><FiFacebook /></a>
            <a href="tel:+5492627000000" aria-label="Teléfono"><FiPhone /></a>
          </div>
        </div>

        <div className={styles.col}>
          <h4>Navegación</h4>
          {[['#hero','Inicio'],['#services','Servicios'],['#gallery','Galería'],['#barbers','Barberos'],['#booking','Reservar Turno'],['#location','Ubicación']].map(([id, label]) => (
            <a key={id} href={id} onClick={e => { e.preventDefault(); scrollTo(id) }}>{label}</a>
          ))}
        </div>

        <div className={styles.col}>
          <h4>Servicios</h4>
          {['Corte Clásico','Corte + Barba','Afeitado Clásico','Degradé','Keratina Capilar','Diseño de Cejas'].map(s => (
            <span key={s}>{s}</span>
          ))}
        </div>

        <div className={styles.col}>
          <h4>Horarios</h4>
          <span>Lun – Vie: 09:00 – 20:00</span>
          <span>Sábados: 09:00 – 18:00</span>
          <span>Domingos: Cerrado</span>
          <div className={styles.address}>
            <FiMapPin size={14} />
            <span>Rivadavia, Mendoza</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Faca Barbería. Todos los derechos reservados.</p>
        <p>Diseñado con ✂ en Mendoza</p>
      </div>
    </footer>
  )
}