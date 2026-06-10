import { useState } from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { LETTERS } from '../../data/letters'
import styles from './Letters.module.css'

export default function Letters() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <div>
      <Navbar />
      <main id="main-content" className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>✉ Letters</h1>
          <p className={styles.subtitle}>Words we&apos;d never want to forget</p>
        </header>

        <ul className={styles.grid} role="list">
          {LETTERS.map((letter, i) => (
            <li key={i}>
              <button
                className={`pixel-card ${styles.letterCard}`}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className={styles.from}>{letter.from}</span>
                <span className={styles.preview}>
                  {openIdx === i ? letter.text : letter.preview}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}
