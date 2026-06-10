import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import styles from './AboutUs.module.css'

const CHARACTERS = [
  {
    name: 'Player 1',
    emoji: '🔥',
    class: 'Fire Mage',
    stats: [
      { label: 'Passion',    value: 95 },
      { label: 'Humor',      value: 88 },
      { label: 'Creativity', value: 90 },
      { label: 'Wisdom',     value: 85 },
    ],
    bio: 'Из мира огня. Всегда в движении. Любит приключения и сюрпризы.',
    color: 'fire',
  },
  {
    name: 'Player 2',
    emoji: '🌿',
    class: 'Nature Guardian',
    stats: [
      { label: 'Kindness', value: 98 },
      { label: 'Grace',    value: 94 },
      { label: 'Strength', value: 87 },
      { label: 'Magic',    value: 92 },
    ],
    bio: 'Из мира природы. Тихая сила. Превращает любой момент в воспоминание.',
    color: 'nature',
  },
]

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <main id="main-content" className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>👥 About Us</h1>
          <p className={styles.subtitle}>Two players. One story.</p>
        </header>

        <div className={styles.cards}>
          {CHARACTERS.map((char) => (
            <div
              key={char.name}
              className={`pixel-card ${styles.charCard} ${styles[char.color]}`}
            >
              <div className={styles.charHeader}>
                <span className={styles.charEmoji}>{char.emoji}</span>
                <div>
                  <p className={styles.charName}>{char.name}</p>
                  <p className={styles.charClass}>{char.class}</p>
                </div>
              </div>

              <p className={styles.bio}>{char.bio}</p>

              <div className={styles.stats}>
                {char.stats.map((stat) => (
                  <div key={stat.label} className={styles.stat}>
                    <div className={styles.statLabel}>
                      <span>{stat.label}</span>
                      <span>{stat.value}</span>
                    </div>
                    <div className="pixel-progress">
                      <div
                        className="pixel-progress-fill"
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
