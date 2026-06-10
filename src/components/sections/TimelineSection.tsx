import { TIMELINE } from '../../data/timeline'
import styles from './TimelineSection.module.css'

export default function TimelineSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.deco}>✦</span>
        <h2 className={styles.title}>Our Adventure</h2>
        <span className={styles.deco}>✦</span>
      </div>
      <p className={styles.subtitle}>A timeline of us, one level at a time.</p>
      <div className={styles.heart}>♥</div>

      {/* Горизонтальная лента */}
      <div className={styles.scrollWrapper}>
        <div className={styles.track}>
          {/* Start */}
          <div className={styles.startBadge}>START</div>

          {TIMELINE.map((item, i) => (
            <div
              key={i}
              className={`${styles.levelCard} ${i % 2 === 0 ? styles.above : styles.below}`}
            >
              {/* Badge */}
              <div className={`level-badge ${styles.badge}`}>Level {i + 1}</div>

              {/* Соединительная линия-точки */}
              <div className={styles.connector} aria-hidden />

              {/* Контент */}
              <div className="pixel-card">
                <p className={styles.eventName}>{item.title}</p>
                <time className={styles.eventDate}>{item.date}</time>
              </div>
            </div>
          ))}

          {/* Final Level */}
          <div className={`${styles.levelCard} ${styles.finalLevel}`}>
            <div className={`level-badge ${styles.badge} ${styles.finalBadge}`}>
              Final Level
            </div>
            <div className={styles.connector} aria-hidden />
            <div className="pixel-card">
              <p className={styles.eventName}>Forever &amp; Always</p>
              <time className={styles.eventDate}>LOADING...</time>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <button className="btn-pixel">
          Continue the story... &gt;
        </button>
        <p className={styles.ctaText}>Many more levels to come ♡</p>
      </div>
    </section>
  )
}
