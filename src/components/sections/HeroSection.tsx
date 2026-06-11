import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './HeroSection.module.css'

import char1Idle from '../../assets/sprites/char1_idle.png'
import char2Idle from '../../assets/sprites/char2_idle.png'
import heartSplit from '../../assets/sprites/heart_split.png'
import fireWorldBg from '../../assets/backgrounds/bg_fire_world.png'
import natureWorldBg from '../../assets/backgrounds/bg_nature_world.png'

function PixelParticle({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  return (
    <motion.div
      className={styles.particle}
      style={{ left: `${x}%`, top: `${y}%`, background: color }}
      animate={{ y: [0, -18, 0], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2.6 + delay * 0.3, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  )
}

const fireParticles = [
  { x: 10, y: 60, delay: 0,   color: '#e67e22' },
  { x: 22, y: 75, delay: 0.4, color: '#f1c40f' },
  { x:  5, y: 40, delay: 0.8, color: '#e67e22' },
  { x: 32, y: 55, delay: 1.2, color: '#ff9f43' },
  { x: 15, y: 85, delay: 0.2, color: '#f1c40f' },
]
const natureParticles = [
  { x: 65, y: 50, delay: 0.3, color: '#27ae60' },
  { x: 80, y: 70, delay: 0.7, color: '#a8e063' },
  { x: 90, y: 35, delay: 1.1, color: '#27ae60' },
  { x: 72, y: 80, delay: 0.5, color: '#78e08f' },
  { x: 58, y: 90, delay: 1.5, color: '#a8e063' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const leftX        = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const rightX       = useTransform(scrollYProgress, [0, 1], ['0%',  '6%'])
  const charY        = useTransform(scrollYProgress, [0, 1], ['0px', '40px'])
  const heartScale   = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])
  const heartOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const bgLeftY      = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const bgRightY     = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Hero">

      {/* LEFT WORLD — Fire */}
      <motion.div className={styles.worldLeft} style={{ x: leftX }}>
        <motion.img src={fireWorldBg} alt="" className={styles.worldBgImg} style={{ y: bgLeftY }} draggable={false} />
        <div className={styles.worldBgFire} />
        {fireParticles.map((p, i) => <PixelParticle key={i} {...p} />)}
        <motion.div
          className={styles.leftContent}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className={styles.headline}>
            Two different worlds.
            <span className={styles.headlineAccent}>One beautiful adventure.</span>
          </h1>
          <p className={styles.subtext}>
            This is our story.<br />
            Thank you for being here!
          </p>
        </motion.div>
      </motion.div>

      {/* CENTER — Characters + Heart + Platform */}
      <motion.div className={styles.centerCol} style={{ y: charY }}>

        {/* PNG pixel heart */}
        <motion.div
          className={styles.heartWrapper}
          style={{ scale: heartScale, opacity: heartOpacity }}
        >
          <motion.img
            src={heartSplit}
            alt="heart"
            className={styles.heartImg}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            draggable={false}
          />
        </motion.div>

        {/* Characters on platform */}
        <div className={styles.stageArea}>
          <div className={styles.charSlot}>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            >
              <img src={char1Idle} alt="Fire character" className={styles.charImg} draggable={false} />
            </motion.div>
          </div>

          <div className={styles.charSlot}>
            <motion.div
              style={{ scaleX: -1 }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <img src={char2Idle} alt="Nature character" className={styles.charImg} draggable={false} />
            </motion.div>
          </div>

          {/* Platform ground */}
          <div className={styles.platformGround}>
            <div className={styles.platformGrass} />
            <div className={styles.platformEarth} />
          </div>
        </div>

        <div className={styles.divider} />
      </motion.div>

      {/* RIGHT WORLD — Nature */}
      <motion.div className={styles.worldRight} style={{ x: rightX }}>
        <motion.img src={natureWorldBg} alt="" className={styles.worldBgImg} style={{ y: bgRightY }} draggable={false} />
        <div className={styles.worldBgNature} />
        {natureParticles.map((p, i) => <PixelParticle key={i} {...p} />)}
        <motion.div
          className={styles.rightContent}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={styles.speechBubble}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className={styles.bubbleHeart}>♥</span>
            We met, we clicked,<br />
            and somehow...<br />
            <strong>we just fit.</strong>
            <span className={styles.bubbleHeart}> ♥</span>
            <div className={styles.bubbleTail} />
          </motion.div>
        </motion.div>
      </motion.div>

    </section>
  )
}
