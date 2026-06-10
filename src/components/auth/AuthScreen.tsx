import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useAuth } from '../../store/authStore'
import styles from './AuthScreen.module.css'

import char1Idle from '../../assets/sprites/char1_idle.png'
import char2Idle from '../../assets/sprites/char2_idle.png'
import fireWorldBg from '../../assets/backgrounds/bg_fire_world.png'
import natureWorldBg from '../../assets/backgrounds/bg_nature_world.png'

// Шаг персонажа по оси X на каждой фазе (px)
const CHAR_STEPS = [0, 60, 120] as const

// Частицы сердечек при успехе
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 12) * Math.PI * 2) * (50 + Math.random() * 60),
  y: Math.sin((i / 12) * Math.PI * 2) * (50 + Math.random() * 60) - 20,
  delay: i * 0.04,
  size: 10 + Math.random() * 12,
}))

export default function AuthScreen() {
  const auth     = useAuth()
  const navigate = useNavigate()

  const [loginVal,    setLoginVal]    = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [phase, setPhase]             = useState<'login' | 'password' | 'success' | 'error'>('login')
  const [shake, setShake]             = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  const passwordRef = useRef<HTMLInputElement>(null)

  const char1Controls = useAnimation()
  const char2Controls = useAnimation()

  // Марш персонажей по фазам
  useEffect(() => {
    if (phase === 'password') {
      // Оба делают первый шаг
      char1Controls.start({
        x: CHAR_STEPS[1],
        transition: { type: 'spring', stiffness: 120, damping: 18 },
      })
      char2Controls.start({
        x: -CHAR_STEPS[1],
        transition: { type: 'spring', stiffness: 120, damping: 18 },
      })
    } else if (phase === 'success') {
      // Сходятся полностью
      char1Controls.start({
        x: CHAR_STEPS[2],
        transition: { type: 'spring', stiffness: 100, damping: 14, delay: 0.1 },
      })
      char2Controls.start({
        x: -CHAR_STEPS[2],
        transition: { type: 'spring', stiffness: 100, damping: 14, delay: 0.1 },
      })
      setTimeout(() => setShowParticles(true), 400)
      setTimeout(() => navigate('/home'), 2200)
    } else if (phase === 'error') {
      // Персонаж 2 отшагивает назад
      char2Controls.start({
        x: [-CHAR_STEPS[1], -CHAR_STEPS[1] + 12, -CHAR_STEPS[1]],
        transition: { duration: 0.3 },
      })
      setTimeout(() => setPhase('password'), 800)
    }
  }, [phase]) // eslint-disable-line react-hooks/exhaustive-deps

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (auth.login(loginVal)) {
      setPhase('password')
      setTimeout(() => passwordRef.current?.focus(), 150)
    } else {
      triggerShake()
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (auth.authenticate(passwordVal)) {
      setPhase('success')
    } else {
      triggerShake()
      setPhase('error')
    }
  }

  return (
    <div className={styles.screen}>
      {/* Фоны двух миров */}
      <div
        className={styles.worldFire}
        style={{ backgroundImage: `url(${fireWorldBg})` }}
        aria-hidden
      />
      <div
        className={styles.worldNature}
        style={{ backgroundImage: `url(${natureWorldBg})` }}
        aria-hidden
      />

      {/* Персонажи */}
      <div className={styles.characters} aria-hidden>
        {/* Персонаж 1 — огонь (слева) */}
        <motion.div
          className={`${styles.character} ${styles.char1}`}
          animate={char1Controls}
          initial={{ x: 0 }}
        >
          <img src={char1Idle} alt="" width={148} height={148} loading="eager" />
        </motion.div>

        {/* Сердце в центре + частицы */}
        <div className={styles.heartWrapper}>
          <AnimatePresence>
            {phase === 'success' && (
              <motion.div
                className={styles.heartCenter}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                ♥
              </motion.div>
            )}
          </AnimatePresence>

          {/* Частицы сердечек */}
          <AnimatePresence>
            {showParticles && PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                className={styles.particle}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: p.x, y: p.y, scale: 1, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: p.delay, ease: 'easeOut' }}
                style={{ fontSize: p.size }}
              >
                ♥
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Персонаж 2 — природа (справа), зеркальный */}
        <motion.div
          className={`${styles.character} ${styles.char2}`}
          animate={char2Controls}
          initial={{ x: 0 }}
        >
          <img src={char2Idle} alt="" width={148} height={148} loading="eager" />
        </motion.div>
      </div>

      {/* Форма входа */}
      <motion.div
        className={`${styles.formBox} ${shake ? styles.shake : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            className={styles.formTitle}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
          >
            {phase === 'success' ? '♥ Welcome Back ♥' : '~ Our Story ~'}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {(phase === 'login' || phase === 'error') && (
            <motion.form
              key="login-form"
              onSubmit={handleLoginSubmit}
              className={styles.form}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <label className={styles.label} htmlFor="login">
                &gt; Enter the key word
              </label>
              <input
                id="login"
                className={`pixel-input ${styles.input}`}
                type="text"
                autoComplete="off"
                value={loginVal}
                onChange={(e) => setLoginVal(e.target.value)}
                placeholder="_ _ _ _ _ _"
                autoFocus
              />
              <button type="submit" className={`btn-pixel btn-gold ${styles.btn}`}>
                Continue &gt;
              </button>
            </motion.form>
          )}

          {phase === 'password' && (
            <motion.form
              key="password-form"
              onSubmit={handlePasswordSubmit}
              className={styles.form}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <label className={styles.label} htmlFor="password">
                &gt; One more secret...
              </label>
              <input
                ref={passwordRef}
                id="password"
                className={`pixel-input ${styles.input}`}
                type="password"
                autoComplete="off"
                value={passwordVal}
                onChange={(e) => setPasswordVal(e.target.value)}
                placeholder="_ _ _ _ _ _"
              />
              <button type="submit" className={`btn-pixel btn-fire ${styles.btn}`}>
                Start Game &gt;
              </button>
            </motion.form>
          )}

          {phase === 'success' && (
            <motion.p
              key="success-msg"
              className={styles.successMsg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              Loading our adventure...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
