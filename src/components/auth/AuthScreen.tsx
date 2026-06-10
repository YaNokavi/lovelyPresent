import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useAuth } from '../../store/authStore'
import styles from './AuthScreen.module.css'

import char1Idle from '../../assets/sprites/char1_idle.png'
import char2Idle from '../../assets/sprites/char2_idle.png'
import fireWorldBg from '../../assets/backgrounds/bg_fire_world.png'
import natureWorldBg from '../../assets/backgrounds/bg_nature_world.png'

// Шаги сближения персонажей в пикселях (по X)
const STEP_AFTER_LOGIN    = 60   // после логина — шаг навстречу
const STEP_AFTER_PASSWORD = 120  // после пароля — встреча

// Тайминги анимации успеха (мс)
const CHARS_MEET_DURATION  = 700   // время сближения
const HEART_APPEAR_DELAY   = 500   // сердце появляется
const PARTICLES_DELAY      = 500   // частицы
const NAVIGATE_DELAY       = 2400  // переход на /home

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 14) * Math.PI * 2) * (55 + (i % 3) * 20),
  y: Math.sin((i / 14) * Math.PI * 2) * (55 + (i % 3) * 20) - 20,
  delay: i * 0.035,
  size: 10 + (i % 4) * 4,
}))

export default function AuthScreen() {
  const auth = useAuth()

  const [loginVal,    setLoginVal]    = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [phase, setPhase] = useState<'login' | 'password' | 'success' | 'error'>('login')
  const [shake, setShake]             = useState(false)
  const [showHeart,     setShowHeart]     = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  const passwordRef   = useRef<HTMLInputElement>(null)
  const char1Controls = useAnimation()
  const char2Controls = useAnimation()

  // Реагируем на смену фазы
  useEffect(() => {
    if (phase === 'password') {
      // Персонажи делают первый шаг навстречу
      char1Controls.start({
        x: STEP_AFTER_LOGIN,
        transition: { type: 'spring', stiffness: 120, damping: 18 },
      })
      char2Controls.start({
        x: -STEP_AFTER_LOGIN,
        transition: { type: 'spring', stiffness: 120, damping: 18 },
      })
      setTimeout(() => passwordRef.current?.focus(), 200)
      return
    }

    if (phase === 'success') {
      // Персонажи сходятся до конца
      char1Controls.start({
        x: STEP_AFTER_PASSWORD,
        transition: { type: 'spring', stiffness: 90, damping: 14 },
      })
      char2Controls.start({
        x: -STEP_AFTER_PASSWORD,
        transition: { type: 'spring', stiffness: 90, damping: 14 },
      })

      // Сердце — чуть позже сближения
      setTimeout(() => setShowHeart(true),     HEART_APPEAR_DELAY)
      // Частицы — одновременно с сердцем
      setTimeout(() => setShowParticles(true), PARTICLES_DELAY)

      // Только ПОСЛЕ анимации — подтверждаем auth → роутер перенаправляет
      setTimeout(() => auth.confirmAuth(), NAVIGATE_DELAY)
      return
    }

    if (phase === 'error') {
      // Второй персонаж отшатывается
      char2Controls.start({
        x: [-STEP_AFTER_LOGIN, -STEP_AFTER_LOGIN + 16, -STEP_AFTER_LOGIN],
        transition: { duration: 0.35 },
      })
      setTimeout(() => setPhase('password'), 900)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 420)
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (auth.login(loginVal)) {
      setPhase('password')
    } else {
      triggerShake()
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (auth.authenticate(passwordVal)) {
      setPhase('success')   // запускает анимацию; auth.confirmAuth() вызовется через 2400мс
    } else {
      triggerShake()
      setPhase('error')
    }
  }

  return (
    <div className={styles.screen}>
      {/* Фоны */}
      <div className={styles.worldFire}   style={{ backgroundImage: `url(${fireWorldBg})` }}   aria-hidden />
      <div className={styles.worldNature} style={{ backgroundImage: `url(${natureWorldBg})` }} aria-hidden />

      {/* Персонажи */}
      <div className={styles.characters} aria-hidden>

        {/* Char1 — outer двигается по X (Framer), inner делает bob (CSS) */}
        <motion.div className={styles.charOuter} animate={char1Controls} initial={{ x: 0 }}>
          <div className={styles.charBob}>
            <img src={char1Idle} alt="" width={148} height={148} loading="eager" className={styles.charImg} />
          </div>
        </motion.div>

        {/* Сердце + частицы — центральная точка */}
        <div className={styles.heartWrapper}>
          <AnimatePresence>
            {showHeart && (
              <motion.div
                className={styles.heartCenter}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.6, 1], opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                ♥
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showParticles && PARTICLES.map((p) => (
              <motion.span
                key={p.id}
                className={styles.particle}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{ x: p.x, y: p.y, scale: 1, opacity: 0 }}
                transition={{ duration: 0.9, delay: p.delay, ease: 'easeOut' }}
                style={{ fontSize: p.size }}
              >
                ♥
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Char2 — зеркальный: scaleX через inline style на motion.div */}
        <motion.div
          className={styles.charOuter}
          style={{ scaleX: -1 }}
          animate={char2Controls}
          initial={{ x: 0 }}
        >
          <div className={styles.charBob}>
            <img src={char2Idle} alt="" width={148} height={148} loading="eager" className={styles.charImg} />
          </div>
        </motion.div>

      </div>

      {/* Форма */}
      <motion.div
        className={`${styles.formBox} ${shake ? styles.shake : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={phase + '-title'}
            className={styles.formTitle}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22 }}
          >
            {phase === 'success' ? '♥ Our Story ♥' : '~ Our Story ~'}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {(phase === 'login' || phase === 'error') && (
            <motion.form
              key="login-form"
              onSubmit={handleLoginSubmit}
              className={styles.form}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.22 }}
            >
              <label className={styles.label} htmlFor="login">&gt; Enter the key word</label>
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
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.22 }}
            >
              <label className={styles.label} htmlFor="password">&gt; One more secret...</label>
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
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Loading our adventure...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
