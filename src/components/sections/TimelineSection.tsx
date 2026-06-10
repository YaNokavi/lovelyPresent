import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { timelineEvents } from '../../data/timeline'
import styles from './TimelineSection.module.css'

function LevelCard({ event, index }: { event: typeof timelineEvents[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  const isFinal = event.isFinal

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${isFinal ? styles.cardFinal : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={!isFinal ? { y: -6, transition: { duration: 0.2 } } : {}}
    >
      {/* Level badge */}
      <div className={`${styles.levelBadge} ${isFinal ? styles.badgeFinal : ''}`}>
        {isFinal ? 'FINAL LEVEL' : `LEVEL ${index + 1}`}
      </div>

      {/* Character scene */}
      <div className={styles.scene}>
        {event.emoji && (
          <span className={styles.sceneEmoji} role="img" aria-label={event.title}>
            {event.emoji}
          </span>
        )}
        {event.sceneIcon && (
          <span className={styles.sceneIcon} aria-hidden>{event.sceneIcon}</span>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <p className={styles.title}>{event.title}</p>
        {event.date && (
          <p className={styles.date}>{event.date}</p>
        )}
        {isFinal && (
          <p className={styles.loadingText}>LOADING...</p>
        )}
      </div>

      {/* Start marker for first card */}
      {index === 0 && (
        <div className={styles.startBadge}>START</div>
      )}
    </motion.div>
  )
}

export default function TimelineSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: trackRef })
  const progressWidth = useTransform(scrollXProgress, [0, 1], ['0%', '100%'])

  return (
    <section className={styles.section} aria-labelledby="adventure-title">
      <div className={styles.header}>
        <motion.h2
          id="adventure-title"
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          ✦ OUR ADVENTURE ✦
        </motion.h2>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A timeline of us, one level at a time.
        </motion.p>
        <div className={styles.heart}>♥</div>
      </div>

      {/* Scroll progress bar */}
      <div className={styles.progressTrack}>
        <motion.div className={styles.progressBar} style={{ width: progressWidth }} />
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className={styles.track}
        role="list"
        aria-label="Relationship timeline"
      >
        {/* Dashed connector line */}
        <div className={styles.connectorLine} aria-hidden />

        {timelineEvents.map((event, i) => (
          <div key={event.id} role="listitem" className={styles.cardWrapper}>
            <LevelCard event={event} index={i} />
            {/* Heart between cards */}
            {i < timelineEvents.length - 1 && (
              <div className={styles.connector} aria-hidden>
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                >
                  ♥
                </motion.span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Continue button */}
      <motion.div
        className={styles.continueWrap}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <a href="/our-journey" className={styles.continueBtn}>
          CONTINUE THE STORY...
          <span className={styles.continueSub}>Many more levels to come ♡</span>
        </a>
      </motion.div>
    </section>
  )
}
