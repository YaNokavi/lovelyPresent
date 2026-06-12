import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './HeroSection.module.css'

import char1Idle from '../../assets/sprites/char1_idle.png'
import char2Idle from '../../assets/sprites/char2_idle.png'
import heartSplit from '../../assets/sprites/heart_split.png'
import platformGround from '../../assets/backgrounds/platform_ground.png'
import bgFireWorld from '../../assets/backgrounds/bg_fire_world.png'
import bgNatureWorld from '../../assets/backgrounds/bg_nature_world.png'

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
  { x: 8,  y: 65, delay: 0,   color: '#f1c40f' },
  { x: 15, y: 75, delay: 0.5, color: '#e67e22' },
  { x: 5,  y: 50, delay: 1.0, color: '#f39c12' },
]
const natureParticles = [
  { x: 68, y: 55, delay: 0.3, color: '#52d68a' },
  { x: 78, y: 70, delay: 0.8, color: '#a8e063' },
  { x: 88, y: 42, delay: 1.3, color: '#27ae60' },
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

      {/* ── ЛЕВЫЙ МИР — огонь ── */}
      <div className={styles.worldLeft}>
        <img src={bgFireWorld} alt="" className={styles.worldBg} draggable={false} />
        {fireParticles.map((p, i) => <PixelParticle key={i} {...p} />)}
      </div>

      {/* ── ПРАВЫЙ МИР — природа ── */}
      <div className={styles.worldRight}>
        <img src={bgNatureWorld} alt="" className={styles.worldBg} draggable={false} />
        {natureParticles.map((p, i) => <PixelParticle key={i} {...p} />)}
      </div>

      {/* ── ЦЕНТРАЛЬНЫЙ РАЗДЕЛИТЕЛЬ ── */}
      <div className={styles.divider} />

      {/* ── ТЕКСТ СЛЕВА ── */}
      <motion.div
        className={styles.textLeft}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.headline}>
          Два разных<br />мира.
          <span className={styles.headlineAccent}>
            Одно прекрасное<br />приключение.
          </span>
        </h1>
        <p className={styles.subtext}>
          Это наша история.<br />
          Спасибо, что ты здесь!
        </p>
      </motion.div>

      {/* ── РЕЧЕВОЙ ПУЗЫРЬ СПРАВА ── */}
      <motion.div
        className={styles.speechBubble}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.bubbleHeart}>♥</span>{' '}
        Мы встретились, совпали,<br />
        и как-то само собой...<br />
        <strong>мы просто подошли друг другу.</strong>
        {' '}<span className={styles.bubbleHeart}>♥</span>
        <div className={styles.bubbleTail} />
      </motion.div>

      {/* ── ПЛАТФОРМА ── */}
      <div
        className={styles.platform}
        style={{ backgroundImage: `url(${platformGround})` }}
        role="presentation"
      />

      {/* ── ПЕРСОНАЖ 1 — огонь ── */}
      <img
        src={char1Idle}
        alt="Персонаж огня"
        className={`${styles.char} ${styles.char1}`}
        draggable={false}
      />

      {/* ── ПЕРСОНАЖ 2 — природа, зеркальный ── */}
      <img
        src={char2Idle}
        alt="Персонаж природы"
        className={`${styles.char} ${styles.char2}`}
        draggable={false}
      />

      {/* ── СЕРДЦЕ ── */}
      <motion.img
        src={heartSplit}
        alt="разделённое сердце"
        className={styles.heart}
        style={{ opacity: heartOpacity }}
        draggable={false}
      />

    </section>
  )
}
