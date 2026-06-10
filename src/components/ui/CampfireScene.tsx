import { useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './CampfireScene.module.css'

// Одна пиксельная частица дыма
function SmokeParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className={styles.smoke}
      style={{ left: x }}
      animate={{
        y:       [0, -28, -48],
        opacity: [0.5, 0.3, 0],
        x:       [0, x > 0 ? 4 : -4, x > 0 ? 7 : -7],
      }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  )
}

// Язычки пламени — три слоя
function Flames() {
  return (
    <div className={styles.flamesWrap} aria-hidden>
      {/* Внешний — самый широкий, медленный */}
      <motion.div
        className={`${styles.flame} ${styles.flameOuter}`}
        animate={{ scaleY: [1, 1.25, 0.9, 1.15, 1], scaleX: [1, 0.88, 1.08, 0.93, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Средний */}
      <motion.div
        className={`${styles.flame} ${styles.flameMid}`}
        animate={{ scaleY: [1, 1.35, 0.85, 1.2, 1], scaleX: [1, 0.92, 1.1, 0.9, 1] }}
        transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
      />
      {/* Внутренний — самый яркий, быстрый */}
      <motion.div
        className={`${styles.flame} ${styles.flameInner}`}
        animate={{ scaleY: [1, 1.5, 0.8, 1.3, 1], scaleX: [1, 0.85, 1.15, 0.88, 1] }}
        transition={{ duration: 0.65, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      {/* Дым */}
      <SmokeParticle delay={0}    x={-3} />
      <SmokeParticle delay={0.6}  x={2}  />
      <SmokeParticle delay={1.1}  x={-1} />
    </div>
  )
}

interface CampfireSceneProps {
  /** Показывать подпись снизу */
  showCaption?: boolean
}

export default function CampfireScene({ showCaption = true }: CampfireSceneProps) {
  return (
    <div className={styles.scene} aria-label="Two characters sitting by a campfire">
      {/* Персонаж 1 — fire boy */}
      <motion.div
        className={`${styles.character} ${styles.charLeft}`}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
      >
        <img
          src="/assets/sprites/char1_idle.png"
          alt=""
          width={56}
          height={68}
          loading="lazy"
          className={styles.sprite}
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.style.display = 'none'
            const fb = img.nextElementSibling as HTMLElement
            if (fb) fb.removeAttribute('hidden')
          }}
        />
        <span hidden className={styles.fallbackEmoji}>🔥</span>
      </motion.div>

      {/* Костёр по центру */}
      <div className={styles.campfire}>
        <Flames />
        {/* Поленья */}
        <div className={styles.logs} aria-hidden>
          <div className={styles.logLeft}  />
          <div className={styles.logRight} />
        </div>
        {/* Свечение на земле */}
        <div className={styles.glow} aria-hidden />
      </div>

      {/* Персонаж 2 — nature girl */}
      <motion.div
        className={`${styles.character} ${styles.charRight}`}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <img
          src="/assets/sprites/char2_idle.png"
          alt=""
          width={56}
          height={68}
          loading="lazy"
          className={styles.sprite}
          onError={(e) => {
            const img = e.target as HTMLImageElement
            img.style.display = 'none'
            const fb = img.nextElementSibling as HTMLElement
            if (fb) fb.removeAttribute('hidden')
          }}
        />
        <span hidden className={styles.fallbackEmoji}>🌿</span>
      </motion.div>

      {/* Подпись */}
      {showCaption && (
        <motion.p
          className={styles.caption}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Thanks for being my everyday adventure.
        </motion.p>
      )}
    </div>
  )
}
