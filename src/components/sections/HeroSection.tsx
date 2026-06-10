import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Левый мир — огонь */}
      <div className={styles.worldLeft} aria-hidden>
        <div className={styles.worldBgFire} />
        <div className={styles.leftContent}>
          <h1 className={styles.headline}>
            Two different<br />worlds.<br />
            <span className={styles.accent}>One beautiful<br />adventure.</span>
          </h1>
          <p className={styles.subtext}>
            This is our story.<br />
            Thank you for being here!
          </p>
        </div>
      </div>

      {/* Персонажи в центре */}
      <div className={styles.characters} aria-hidden>
        {/* Сердце сверху */}
        <div className={styles.heartTop}>♥</div>

        {/* Персонаж 1 */}
        <div className={styles.char1}>
          <img
            src="/assets/sprites/char1_idle.gif"
            alt=""
            width={80}
            height={96}
            loading="lazy"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
              ;(e.target as HTMLImageElement).nextElementSibling!.removeAttribute('hidden')
            }}
          />
          <span hidden style={{ fontSize: '4rem' }}>🔥</span>
        </div>

        {/* Персонаж 2 */}
        <div className={styles.char2}>
          <img
            src="/assets/sprites/char2_idle.gif"
            alt=""
            width={80}
            height={96}
            loading="lazy"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
              ;(e.target as HTMLImageElement).nextElementSibling!.removeAttribute('hidden')
            }}
          />
          <span hidden style={{ fontSize: '4rem' }}>🌿</span>
        </div>
      </div>

      {/* Правый мир — природа */}
      <div className={styles.worldRight} aria-hidden>
        <div className={styles.worldBgNature} />
        <div className={styles.rightContent}>
          <div className="speech-bubble">
            We met, we clicked,<br />
            and somehow...<br />
            we just fit.{' '}
            <span style={{ color: 'var(--color-heart)' }}>♥</span>
          </div>
        </div>
      </div>
    </section>
  )
}
