import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { letters } from '../../data/letters'
import styles from './Letters.module.css'

/** Настоящий typewriter-эффект */
function TypewriterText({ text, isOpen }: { text: string; isOpen: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setDisplayed('')
      return
    }
    setDisplayed('')
    let i = 0
    function tick() {
      i++
      setDisplayed(text.slice(0, i))
      if (i < text.length) {
        // слегка замедляемся на знаках препинания
        const char = text[i - 1]
        const delay = /[.,!?]/.test(char) ? 120 : 28
        timerRef.current = setTimeout(tick, delay)
      }
    }
    timerRef.current = setTimeout(tick, 120) // небольшая пауза перед стартом
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [isOpen, text])

  return (
    <p className={styles.letterBody}>
      {displayed}
      {isOpen && displayed.length < text.length && (
        <span className={styles.cursor} aria-hidden>|</span>
      )}
    </p>
  )
}

function LetterCard({ letter, index }: { letter: typeof letters[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
    if (!isOpen && ref.current) {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
    }
  }

  return (
    <motion.div
      ref={ref}
      className={`${styles.envelope} ${isOpen ? styles.envelopeOpen : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        className={styles.envelopeFlap}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close letter' : 'Open letter'}
      >
        <div className={styles.flapInner}>
          <span className={styles.flapHeart}>{isOpen ? '♥' : '♡'}</span>
        </div>
      </button>

      <div className={styles.envelopeBody}>
        <div className={styles.envelopeMeta}>
          <span className={styles.letterFrom}>From: {letter.from}</span>
          <span className={styles.letterDate}>{letter.date}</span>
        </div>
        <p className={styles.letterTitle}>{letter.title}</p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.letterContent}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.letterPaper}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.paperLine} aria-hidden />
              ))}
              <TypewriterText text={letter.body} isOpen={isOpen} />
              <p className={styles.letterSign}>{letter.sign} ♥</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Letters() {
  return (
    <main className={styles.page}>
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className={styles.eyebrow}>❖ LETTERS ❖</p>
        <h1 className={styles.title}>Messages from the Heart</h1>
        <p className={styles.subtitle}>Click an envelope to open it.</p>
      </motion.header>

      <div className={styles.grid}>
        {letters.map((letter, i) => (
          <LetterCard key={letter.id} letter={letter} index={i} />
        ))}
      </div>
    </main>
  )
}
