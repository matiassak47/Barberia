import React from 'react'
import styles from './Services.module.css'
import { FiScissors, FiClock, FiDollarSign } from 'react-icons/fi'
import { GiRazor, GiComb, GiBarbedWire } from 'react-icons/gi'

const services = [
  { icon: <FiScissors />, name: 'Corte Clásico', desc: 'Corte tradicional con tijera y máquina. El estilo que nunca falla.', time: '30 min', price: '$3.500' },
  { icon: <GiRazor />, name: 'Corte + Barba', desc: 'Corte completo más arreglo y perfilado de barba con navaja.', time: '50 min', price: '$5.500' },
  { icon: <GiComb />, name: 'Afeitado Clásico', desc: 'Afeitado ritual con navaja, espuma artesanal y toalla caliente.', time: '30 min', price: '$3.000' },
  { icon: <FiScissors />, name: 'Degradé', desc: 'Corte degradé moderno con delineado y acabado perfecto.', time: '45 min', price: '$4.500' },
  { icon: <GiComb />, name: 'Keratina Capilar', desc: 'Tratamiento de keratina para alisar y fortalecer el cabello.', time: '60 min', price: '$7.000' },
  { icon: <GiBarbedWire />, name: 'Diseño de Cejas', desc: 'Perfilado y diseño de cejas para un look completo y definido.', time: '20 min', price: '$1.500' },
]

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.line}></div>
            <span>NUESTROS SERVICIOS</span>
            <div className={styles.line}></div>
          </div>
          <h2 className={styles.title}>Arte en cada<br /><em>detalle</em></h2>
          <p className={styles.subtitle}>Cada servicio es ejecutado con precisión y dedicación. Porque en Faca, la calidad no se negocia.</p>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={i} className={styles.card} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.cardIcon}>{s.icon}</div>
              <div className={styles.cardNumber}>0{i + 1}</div>
              <h3 className={styles.cardName}>{s.name}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <div className={styles.cardMeta}>
                <span><FiClock size={12} /> {s.time}</span>
                <span className={styles.price}>{s.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}