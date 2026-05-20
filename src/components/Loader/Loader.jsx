import React from 'react'
import styles from './Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.inner}>
        <div className={styles.scissors}>✂</div>
        <div className={styles.brand}>FACA</div>
        <div className={styles.bar}><div className={styles.fill}></div></div>
      </div>
    </div>
  )
}