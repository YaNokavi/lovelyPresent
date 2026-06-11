import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './HeroSection.module.css'

import char1Idle from '../../assets/sprites/char1_idle.png'
import char2Idle from '../../assets/sprites/char2_idle.png'
import heartSplit from '../../assets/sprites/heart_split.png'
import platformGround from '../../assets/backgrounds/platform_ground.png'

function PixelParticle({ x, y, delay, color }: {
  x: number; y: number; delay: number; color: string
}) {
  return (
    <motion.div
      className={styles.particle}
      style={{ left: `${x}%`, top: `${y}%`, background: color }}
      animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.6 + delay * 0.4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

const fireParticles = [
  { x: 12, y: 60, delay: 0,   color: '#f1c40f' },
  { x: 22, y: 75, delay: 0.5, color: '#e67e22' },
  { x: 7,  y: 45, delay: 1.0, color: '#f39c12' },
]
const natureParticles = [
  { x: 68, y: 55, delay: 0.3, color: '#27ae60' },
  { x: 80, y: 70, delay: 0.8, color: '#a8e063' },
  { x: 90, y: 40, delay: 1.3, color: '#52d68a' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const heartOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Hero">

      {/* ── LEFT WORLD ── */}
      <div className={styles.worldLeft}>
        {/* Sky gradient done in CSS */}
        <div className={styles.worldLeftClouds}>
          <div className={`${styles.cloud} ${styles.cloud1}`} />
          <div className={`${styles.cloud} ${styles.cloud2}`} />
        </div>
        {fireParticles.map((p, i) => <PixelParticle key={i} {...p} />)}
      </div>

      {/* ── RIGHT WORLD ── */}
      <div className={styles.worldRight}>
        <div className={styles.worldRightClouds}>
          <div className={`${styles.cloud} ${styles.cloud3}`} />
          <div className={`${styles.cloud} ${styles.cloud4}`} />
        </div>
        {natureParticles.map((p, i) => <PixelParticle key={i} {...p} />)}
      </div>

      {/* ── WHITE CENTER DIVIDER ── */}
      <div className={styles.divider} />

      {/* ── TEXT LEFT (shifted right from edge, ~20% from left) ── */}
      <motion.div
        className={styles.textLeft}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.headline}>
          Two different<br />worlds.
          <span className={styles.headlineAccent}>
            One beautiful<br />adventure.
          </span>
        </h1>
        <p className={styles.subtext}>
          This is our story.<br />
          Thank you for being here!
        </p>
      </motion.div>

      {/* ── SPEECH BUBBLE RIGHT ── */}
      <motion.div
        className={styles.speechBubble}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.bubbleHeart}>♥</span>{' '}
        We met, we clicked,<br />
        and somehow...<br />
        <strong>we just fit.</strong>
        {' '}<span className={styles.bubbleHeart}>♥</span>
        <div className={styles.bubbleTail} />
      </motion.div>

      {/* ── PLATFORM — centered, NOT full width ── */}
      <img
        src={platformGround}
        alt=""
        className={styles.platform}
        draggable={false}
      />

      {/* ── CHAR 1 — right of divider on fire side ── */}
      <img
        src={char1Idle}
        alt="Fire character"
        className={`${styles.char} ${styles.char1}`}
        draggable={false}
      />

      {/* ── CHAR 2 — left of divider on nature side, mirrored ── */}
      <img
        src={char2Idle}
        alt="Nature character"
        className={`${styles.char} ${styles.char2}`}
        draggable={false}
      />

      {/* ── HEART — centered above chars ── */}
      <motion.img
        src={heartSplit}
        alt="split heart"
        className={styles.heart}
        style={{ opacity: heartOpacity }}
        draggable={false}
      />

    </section>
  )
}
