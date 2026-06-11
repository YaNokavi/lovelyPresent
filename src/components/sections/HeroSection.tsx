import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './HeroSection.module.css'

import char1Idle from '../../assets/sprites/char1_idle.png'
import char2Idle from '../../assets/sprites/char2_idle.png'
import heartSplit from '../../assets/sprites/heart_split.png'
import fireWorldBg from '../../assets/backgrounds/bg_fire_world.png'
import natureWorldBg from '../../assets/backgrounds/bg_nature_world.png'

function PixelParticle({ x, y, delay, color }: {
  x: number; y: number; delay: number; color: string
}) {
  return (
    <motion.div
      className={styles.particle}
      style={{ left: `${x}%`, top: `${y}%`, background: color }}
      animate={{ y: [0, -16, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2.6 + delay * 0.3, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

const fireParticles = [
  { x: 8,  y: 55, delay: 0,   color: '#e67e22' },
  { x: 18, y: 72, delay: 0.4, color: '#f1c40f' },
  { x: 4,  y: 38, delay: 0.8, color: '#e67e22' },
  { x: 28, y: 60, delay: 1.2, color: '#ff9f43' },
  { x: 14, y: 82, delay: 0.2, color: '#f1c40f' },
]
const natureParticles = [
  { x: 72, y: 48, delay: 0.3, color: '#27ae60' },
  { x: 84, y: 68, delay: 0.7, color: '#a8e063' },
  { x: 92, y: 32, delay: 1.1, color: '#27ae60' },
  { x: 78, y: 78, delay: 0.5, color: '#78e08f' },
  { x: 62, y: 88, delay: 1.5, color: '#a8e063' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgLeftY      = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const bgRightY     = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const charY        = useTransform(scrollYProgress, [0, 1], ['0px', '36px'])
  const heartScale   = useTransform(scrollYProgress, [0, 0.35], [1, 0.6])
  const heartOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Hero">

      {/* ─ LEFT WORLD (full height, left half) ─ */}
      <div className={styles.worldLeft}>
        <motion.img
          src={fireWorldBg}
          alt=""
          className={styles.worldBgImg}
          style={{ y: bgLeftY }}
          draggable={false}
        />
        <div className={styles.worldBgFire} />
        {fireParticles.map((p, i) => <PixelParticle key={i} {...p} />)}

        {/* Left text content */}
        <motion.div
          className={styles.leftContent}
          initial={{ opacity: 0, x: -36 }}
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
      </div>

      {/* ─ RIGHT WORLD (full height, right half) ─ */}
      <div className={styles.worldRight}>
        <motion.img
          src={natureWorldBg}
          alt=""
          className={styles.worldBgImg}
          style={{ y: bgRightY }}
          draggable={false}
        />
        <div className={styles.worldBgNature} />
        {natureParticles.map((p, i) => <PixelParticle key={i} {...p} />)}

        {/* Speech bubble */}
        <motion.div
          className={styles.rightContent}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={styles.speechBubble}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className={styles.bubbleHeart}>♥</span>{' '}
            We met, we clicked,<br />
            and somehow...<br />
            <strong>we just fit.</strong>
            {' '}<span className={styles.bubbleHeart}>♥</span>
            <div className={styles.bubbleTail} />
          </motion.div>
        </motion.div>
      </div>

      {/* ─ CENTER OVERLAY: divider + heart + chars + platform ─ */}
      <div className={styles.centerOverlay}>

        {/* Vertical pixel divider */}
        <div className={styles.divider} />

        {/* Heart above characters */}
        <motion.div
          className={styles.heartWrapper}
          style={{ scale: heartScale, opacity: heartOpacity }}
        >
          <motion.img
            src={heartSplit}
            alt="heart"
            className={styles.heartImg}
            animate={{ scale: [1, 1.14, 1] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            draggable={false}
          />
        </motion.div>

        {/* Characters + full-width platform */}
        <motion.div className={styles.stageRow} style={{ y: charY }}>
          {/* Char 1 — fire side */}
          <motion.div
            className={styles.charLeft}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          >
            <img src={char1Idle} alt="Fire character" className={styles.charImg} draggable={false} />
          </motion.div>

          {/* Char 2 — nature side (mirrored via inline style per arch notes) */}
          <motion.div
            className={styles.charRight}
            style={{ scaleX: -1 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.38 }}
          >
            <img src={char2Idle} alt="Nature character" className={styles.charImg} draggable={false} />
          </motion.div>

          {/* Full-width pixel platform */}
          <div className={styles.platform}>
            <div className={styles.platformGrass} />
            <div className={styles.platformEarth} />
          </div>
        </motion.div>
      </div>

    </section>
  )
}
