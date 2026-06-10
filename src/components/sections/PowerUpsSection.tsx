import styles from './PowerUpsSection.module.css'

const POWERUPS = [
  { icon: '🔥', label: 'Passion' },
  { icon: '🌱', label: 'Growth' },
  { icon: '💗', label: 'Trust' },
  { icon: '⭐', label: 'Laughter' },
]

const EXTRAS = [
  { icon: '🖼', label: 'Gallery',    href: '/gallery' },
  { icon: '✉',  label: 'Letters',   href: '/letters' },
  { icon: '👥', label: 'About Us',  href: '/about-us' },
]

export default function PowerUpsSection() {
  return (
    <section className={styles.section}>
      {/* Левая колонка — Power-ups */}
      <div className={`pixel-card ${styles.col} ${styles.powerupsCard}`}>
        <h2 className={styles.colTitle}>Power-Ups</h2>
        <ul className={styles.list} role="list">
          {POWERUPS.map(({ icon, label }) => (
            <li key={label} className="powerup-item">
              <span className="powerup-icon">{icon}</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Центральная карточка — цитата */}
      <div className={styles.quoteCard}>
        <p className={styles.quoteMain}>
          You&apos;re my favorite player two.
        </p>
        <span className={styles.quoteHeart}>♥</span>
        <p className={styles.quoteSub}>
          Thanks for being my everyday adventure.
        </p>
        {/* Персонажи у костра */}
        <div className={styles.campfire} aria-hidden>
          <span>🔥</span>
          <span style={{ fontSize: '2.5rem' }}>🤝</span>
          <span>🌿</span>
        </div>
      </div>

      {/* Правая колонка — Extras */}
      <div className={`pixel-card ${styles.col} ${styles.extrasCard}`}>
        <h2 className={styles.colTitle}>Extras</h2>
        <ul className={styles.list} role="list">
          {EXTRAS.map(({ icon, label, href }) => (
            <li key={label}>
              <a href={href} className={`powerup-item ${styles.extraLink}`}>
                <span className="powerup-icon">{icon}</span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
