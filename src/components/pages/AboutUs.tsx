import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { characters } from '../../data/characters'
import styles from './AboutUs.module.css'

function StatBar({ label, value, color, index }: { label: string; value: number; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.statHeader}>
        <span className={styles.statLabel}>{label}</span>
        <span className={styles.statValue}>{value}/10</span>
      </div>
      <div className={styles.statTrack}>
        <motion.div
          className={styles.statBar}
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value * 10}%` } : {}}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function CharacterSheet({ char, side }: { char: typeof characters[0]; side: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={`${styles.sheet} ${side === 'left' ? styles.sheetFire : styles.sheetNature}`}
      initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Шапка */}
      <div className={styles.sheetHeader}>
        <div className={styles.charPortrait}>
          <img
            src={char.sprite}
            alt={char.name}
            width={64}
            height={76}
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
              const fb = img.nextElementSibling as HTMLElement
              if (fb) fb.removeAttribute('hidden')
            }}
          />
          <span hidden style={{ fontSize: '3rem' }}>{char.emoji}</span>
        </div>
        <div className={styles.charInfo}>
          <p className={styles.charClass}>{char.class}</p>
          <h2 className={styles.charName}>{char.name}</h2>
          <p className={styles.charLevel}>LVL {char.level}</p>
        </div>
      </div>

      {/* Статы */}
      <div className={styles.statsSection}>
        <p className={styles.statsTitle}>— STATS —</p>
        {char.stats.map((s, i) => (
          <StatBar key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* О персонаже */}
      <div className={styles.bioSection}>
        <p className={styles.statsTitle}>— BIO —</p>
        <p className={styles.bio}>{char.bio}</p>
      </div>

      {/* Специальная способность */}
      <div className={styles.specialSection}>
        <p className={styles.specialLabel}>SPECIAL ABILITY</p>
        <p className={styles.special}>{char.special}</p>
      </div>
    </motion.div>
  )
}

export default function AboutUs() {
  return (
    <main className={styles.page}>
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className={styles.eyebrow}>✦ ABOUT US ✦</p>
        <h1 className={styles.title}>The Players</h1>
        <p className={styles.subtitle}>Two characters. One shared adventure.</p>
      </motion.header>

      <div className={styles.sheets}>
        <CharacterSheet char={characters[0]} side="left" />
        <CharacterSheet char={characters[1]} side="right" />
      </div>

      {/* Сцена с обоими */}
      <motion.div
        className={styles.together}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.togetherChars}>
          <img src="/assets/sprites/char1_idle.png" alt="" width={72} height={86}
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <motion.span
            className={styles.togetherHeart}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ♥
          </motion.span>
          <img src="/assets/sprites/char2_idle.png" alt="" width={72} height={86}
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
        <p className={styles.togetherText}>Together since Level 1.</p>
      </motion.div>
    </main>
  )
}
