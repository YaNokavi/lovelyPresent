import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.tagline}>
        <span className={styles.leaf}>🌿</span>
        {'  '}MADE WITH{' '}
        <span className={styles.heart}>♥</span>
        {'  '}BY US, FOR US{' '}
        <span className={styles.leaf}>🌿</span>
      </p>
      <div className={styles.socials}>
        <a href="#" className={styles.socialLink} aria-label="Instagram">📷</a>
        <a href="#" className={styles.socialLink} aria-label="Spotify">🎵</a>
        <a href="#" className={styles.socialLink} aria-label="Email">✉️</a>
      </div>
    </footer>
  )
}
