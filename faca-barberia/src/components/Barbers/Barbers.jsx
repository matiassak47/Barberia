import React from 'react'
import styles from './Barbers.module.css'
import { FiInstagram } from 'react-icons/fi'

const barbers = [
  {
    name: 'Faca',
    role: 'Fundador & Master Barber',
    bio: 'Con más de 10 años perfeccionando el arte del barbero. Especialista en cortes clásicos y estilos personalizados.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    specialty: 'Cortes Clásicos',
  },
  {
    name: 'Rodrigo',
    role: 'Senior Barber',
    bio: 'Apasionado por los degradés perfectos y los diseños modernos. Cada corte es una obra de arte.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    specialty: 'Degradés',
  },
  {
    name: 'Matías',
    role: 'Barber & Grooming',
    bio: 'Maestro del afeitado tradicional con navaja. Cuidado y grooming masculino de primera.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    specialty: 'Barba & Afeitado',
  },
]

export default function Barbers() {
  return (
    <section id="barbers" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <div className={styles.line}></div>
            <span>EL EQUIPO</span>
            <div className={styles.line}></div>
          </div>
          <h2 className={styles.title}>Manos<br /><em>expertas</em></h2>
          <p className={styles.subtitle}>Cada barbero de Faca es un artista comprometido con la excelencia.</p>
        </div>

        <div className={styles.grid}>
          {barbers.map((b, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imageWrap}>
                <img src={b.img} alt={b.name} />
                <div className={styles.specialty}>{b.specialty}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.nameRow}>
                  <div>
                    <h3 className={styles.name}>{b.name}</h3>
                    <p className={styles.role}>{b.role}</p>
                  </div>
                  <a href="#" className={styles.social}><FiInstagram /></a>
                </div>
                <p className={styles.bio}>{b.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}