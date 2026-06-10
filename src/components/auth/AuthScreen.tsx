import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/authStore'
import styles from './AuthScreen.module.css'

/** Экран входа — два персонажа идут навстречу друг другу при вводе. */
export default function AuthScreen() {
  const auth = useAuth()
  const navigate = useNavigate()

  const [loginVal,    setLoginVal]    = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [phase, setPhase]             = useState<'login' | 'password' | 'success' | 'error'>('login')
  const [shake, setShake]             = useState(false)

  const loginRef    = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  function triggerShake() {
    setShake(true)
    setTimeout(() => setShake(false), 400)
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = auth.login(loginVal)
    if (ok) {
      setPhase('password')
      setTimeout(() => passwordRef.current?.focus(), 100)
    } else {
      triggerShake()
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = auth.authenticate(passwordVal)
    if (ok) {
      setPhase('success')
      setTimeout(() => navigate('/home'), 1800)
    } else {
      triggerShake()
      setPhase('error')
      setTimeout(() => setPhase('password'), 800)
    }
  }

  const char1Step = phase === 'login'    ? 0
                  : phase === 'password' ? 1
                  : 2  // success / error
  const char2Step = phase === 'success'  ? 2
                  : phase === 'password' ? 1
                  : 0

  return (
    <div className={styles.screen}>
      {/* Фоны двух миров */}
      <div className={styles.worldFire}  aria-hidden />
      <div className={styles.worldNature} aria-hidden />

      {/* Персонажи */}
      <div className={styles.characters} aria-hidden>
        {/* Персонаж 1 — огонь (слева) */}
        <div
          className={[
            styles.character,
            styles.char1,
            char1Step === 1 ? styles.step1 : '',
            char1Step === 2 ? styles.step2 : '',
            phase === 'success' ? styles.idle : '',
          ].join(' ')}
        >
          <img
            src="/assets/sprites/char1_idle.gif"
            alt=""
            width={64}
            height={64}
            onError={(e) => {
              // Fallback: рисуем emoji если спрайт не загрузился
              ;(e.target as HTMLImageElement).style.display = 'none'
              ;(e.target as HTMLImageElement).nextElementSibling!.removeAttribute('hidden')
            }}
          />
          {/* Emoji fallback */}
          <span hidden style={{ fontSize: '3rem', lineHeight: 1 }}>🔥</span>
        </div>

        {/* Пиксельное сердце в центре */}
        <div
          className={[
            styles.heartCenter,
            phase === 'success' ? styles.heartVisible : '',
          ].join(' ')}
          aria-hidden
        >
          ♥
        </div>

        {/* Персонаж 2 — природа (справа) */}
        <div
          className={[
            styles.character,
            styles.char2,
            char2Step === 1 ? styles.step1 : '',
            char2Step === 2 ? styles.step2 : '',
            phase === 'success' ? styles.idle : '',
          ].join(' ')}
        >
          <img
            src="/assets/sprites/char2_idle.gif"
            alt=""
            width={64}
            height={64}
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
              ;(e.target as HTMLImageElement).nextElementSibling!.removeAttribute('hidden')
            }}
          />
          <span hidden style={{ fontSize: '3rem', lineHeight: 1 }}>🌿</span>
        </div>
      </div>

      {/* Форма входа */}
      <div
        className={[
          styles.formBox,
          shake ? styles.shake : '',
        ].join(' ')}
      >
        <p className={styles.formTitle}>
          {phase === 'success' ? '♥ Welcome Back ♥' : '~ Our Story ~'}
        </p>

        {(phase === 'login' || phase === 'error') && (
          <form onSubmit={handleLoginSubmit} className={styles.form}>
            <label className={styles.label} htmlFor="login">
              &gt; Enter the key word
            </label>
            <input
              ref={loginRef}
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
          </form>
        )}

        {phase === 'password' && (
          <form onSubmit={handlePasswordSubmit} className={styles.form}>
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
          </form>
        )}

        {phase === 'success' && (
          <p className={styles.successMsg}>Loading our adventure...</p>
        )}
      </div>
    </div>
  )
}
