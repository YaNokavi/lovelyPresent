import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './PowerUpsSection.module.css'

const powerUps = [
  { icon: '🔥', label: 'Passion',  color: 'var(--color-fire)' },
  { icon: '🌿', label: 'Growth',   color: 'var(--color-nature)' },
  { icon: '💗', label: 'Trust',    color: 'var(--color-heart)' },
  { icon: '⭐', label: 'Laughter', color: 'var(--color-gold)' },
]

const extras = [
  { icon: '🖼', label: 'GALLERY',  href: '/gallery' },
  { icon: '✉', label: 'LETTERS',  href: '/letters' },
  { icon: '👤', label: 'ABOUT US', href: '/about-us' },
]

function PowerUpItem({ icon, label, color, index }: { icon: string; label: string; color: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.li
      ref={ref}
      className={styles.powerItem}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className={styles.powerIcon}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      >
        {icon}
      </motion.span>
      <span className={styles.powerLabel} style={{ color }}>{label}</span>
    </motion.li>
  )
}

function ExtraItem({ icon, label, href, index }: { icon: string; label: string; href: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <a href={href} className={styles.extraLink}>
        <span className={styles.extraIcon}>{icon}</span>
        <span>{label}</span>
      </a>
    </motion.li>
  )
}

export default function PowerUpsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })

  return (
    <section ref={ref} className={styles.section} aria-label="Power-Ups and Extras">
      <div className={styles.grid}>
        {/* ── Левая колонка: Power-Ups ── */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className={styles.panelTitle}>POWER-UPS</h3>
          <ul className={styles.powerList}>
            {powerUps.map((p, i) => (
              <PowerUpItem key={p.label} {...p} index={i} />
            ))}
          </ul>
        </motion.div>

        {/* ── Центральная колонка: цитата ── */}
        <motion.div
          className={styles.centerPanel}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.centerQuote}>You're my favorite player two.</p>
          <motion.div
            className={styles.centerHeart}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ♥
          </motion.div>
          <p className={styles.centerSub}>Thanks for being my everyday adventure.</p>
          {/* Campfire scene */}
          <div className={styles.campfireScene} aria-hidden>
            <span className={styles.campfireChar}>🔥</span>
            <motion.span
              className={styles.campfireFlame}
              animate={{ scaleY: [1, 1.3, 0.9, 1.2, 1], scaleX: [1, 0.9, 1.1, 0.95, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              🔥
            </motion.span>
            <span className={styles.campfireChar}>🌿</span>
          </div>
        </motion.div>

        {/* ── Правая колонка: Extras ── */}
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className={styles.panelTitle}>EXTRAS</h3>
          <ul className={styles.extraList}>
            {extras.map((e, i) => (
              <ExtraItem key={e.label} {...e} index={i} />
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className={styles.footer}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <p>🌿 MADE WITH ♥ BY US, FOR US 🔥</p>
        <div className={styles.footerLinks}>
          <a href="#" aria-label="Instagram" className={styles.footerIcon}>📸</a>
          <a href="#" aria-label="Spotify"   className={styles.footerIcon}>🎵</a>
          <a href="#" aria-label="Email"     className={styles.footerIcon}>✉</a>
        </div>
      </motion.footer>
    </section>
  )
}
