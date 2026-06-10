import { useEffect } from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { TIMELINE } from '../../data/timeline'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './OurJourney.module.css'

export default function OurJourney() {
  useScrollReveal()

  return (
    <div>
      <Navbar />
      <main id="main-content" className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>⚔ Our Journey</h1>
          <p className={styles.subtitle}>Every moment, a new level unlocked</p>
        </header>

        <ol className={styles.timeline} role="list">
          {TIMELINE.map((item, i) => (
            <li
              key={i}
              className={`reveal ${styles.item} ${i % 2 === 0 ? styles.left : styles.right}`}
            >
              <div className="pixel-card">
                <span className="level-badge">Level {i + 1}</span>
                <h2 className={styles.eventTitle}>{item.title}</h2>
                <time className={styles.date}>{item.date}</time>
                {item.description && (
                  <p className={styles.desc}>{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </div>
  )
}
