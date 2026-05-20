import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import { FiScissors, FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Servicios', href: '#services' },
  { label: 'Galería', href: '#gallery' },
  { label: 'Barberos', href: '#barbers' },
  { label: 'Turnos', href: '#booking' },
  { label: 'Ubicación', href: '#location' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#hero" className={styles.logo} onClick={e => handleLink(e, '#hero')}>
          <FiScissors className={styles.logoIcon} />
          <span>FACA</span>
          <span className={styles.logoBarberia}>BARBERÍA</span>
        </a>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a href={link.href} onClick={e => handleLink(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#booking"
              className={styles.ctaBtn}
              onClick={e => handleLink(e, '#booking')}
            >
              Reservar Turno
            </a>
          </li>
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  )
}