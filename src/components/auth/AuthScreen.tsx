import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useAuth } from "../../store/authStore";
import styles from "./AuthScreen.module.css";

import char1Idle from "../../assets/sprites/char1_idle.png";
import char2Idle from "../../assets/sprites/char2_idle.png";
import fireWorldBg from "../../assets/backgrounds/bg_fire_world.png";
import natureWorldBg from "../../assets/backgrounds/bg_nature_world.png";
import platformGround from "../../assets/backgrounds/platform_ground.png";

const STEP_AFTER_LOGIN = 60;
const STEP_AFTER_PASSWORD = 100;

const HEART_APPEAR_DELAY = 500;
const PARTICLES_DELAY = 500;
const NAVIGATE_DELAY = 2400;

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 14) * Math.PI * 2) * (55 + (i % 3) * 20),
  y: Math.sin((i / 14) * Math.PI * 2) * (55 + (i % 3) * 20) - 20,
  delay: i * 0.035,
  size: 10 + (i % 4) * 4,
}));

export default function AuthScreen() {
  const auth = useAuth();

  const [loginVal, setLoginVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [phase, setPhase] = useState<
    "login" | "password" | "success" | "error"
  >("login");
  const [shake, setShake] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const char1Controls = useAnimation();
  const char2Controls = useAnimation();

  useEffect(() => {
    if (phase === "password") {
      char1Controls.start({
        x: STEP_AFTER_LOGIN,
        transition: { type: "spring", stiffness: 120, damping: 18 },
      });
      char2Controls.start({
        x: -STEP_AFTER_LOGIN,
        transition: { type: "spring", stiffness: 120, damping: 18 },
      });
      setTimeout(() => passwordRef.current?.focus(), 200);
      return;
    }
    if (phase === "success") {
      char1Controls.start({
        x: STEP_AFTER_PASSWORD,
        transition: { type: "spring", stiffness: 90, damping: 14 },
      });
      char2Controls.start({
        x: -STEP_AFTER_PASSWORD,
        transition: { type: "spring", stiffness: 90, damping: 14 },
      });
      setTimeout(() => setShowHeart(true), HEART_APPEAR_DELAY);
      setTimeout(() => setShowParticles(true), PARTICLES_DELAY);
      setTimeout(() => auth.confirmAuth(), NAVIGATE_DELAY);
      return;
    }
    if (phase === "error") {
      char2Controls.start({
        x: [-STEP_AFTER_LOGIN, -STEP_AFTER_LOGIN + 16, -STEP_AFTER_LOGIN],
        transition: { duration: 0.35 },
      });
      setTimeout(() => setPhase("password"), 900);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 420);
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (auth.login(loginVal)) {
      setPhase("password");
    } else {
      triggerShake();
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (auth.authenticate(passwordVal)) {
      setPhase("success");
    } else {
      triggerShake();
      setPhase("error");
    }
  }

  return (
    <div className={styles.screen}>
      {/* ── ФОНЫ ── */}
      <div className={styles.worldFire} aria-hidden>
        <img
          src={fireWorldBg}
          alt=""
          className={styles.worldBg}
          draggable={false}
        />
      </div>
      <div className={styles.worldNature} aria-hidden>
        <img
          src={natureWorldBg}
          alt=""
          className={styles.worldBg}
          draggable={false}
        />
      </div>

      {/* ── РАЗДЕЛИТЕЛЬ ── */}
      <div className={styles.divider} aria-hidden />

      {/* ── ФОРМА — по центру, над персонажами ── */}
      <motion.div
        className={`${styles.formBox} ${shake ? styles.shake : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={phase + "-title"}
            className={styles.formTitle}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22 }}
          >
            {phase === "success" ? "♥ Наша история ♥" : "~ Наша история ~"}
          </motion.p>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {(phase === "login" || phase === "error") && (
            <motion.form
              key="login-form"
              onSubmit={handleLoginSubmit}
              className={styles.form}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.22 }}
            >
              <label className={styles.label} htmlFor="login">
                &gt; Введи логин
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
              <button
                type="submit"
                className={`btn-pixel btn-gold ${styles.btn}`}
              >
                Продолжить &gt;
              </button>
            </motion.form>
          )}

          {phase === "password" && (
            <motion.form
              key="password-form"
              onSubmit={handlePasswordSubmit}
              className={styles.form}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 14 }}
              transition={{ duration: 0.22 }}
            >
              <label className={styles.label} htmlFor="password">
                &gt; Ещё один секрет...
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
              <button
                type="submit"
                className={`btn-pixel btn-fire ${styles.btn}`}
              >
                Начать &gt;
              </button>
            </motion.form>
          )}

          {phase === "success" && (
            <motion.p
              key="success-msg"
              className={styles.successMsg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              Загружаем наше приключение...
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── ПЕРСОНАЖИ ── */}
      <div className={styles.characters} aria-hidden>
        <motion.div
          className={styles.charOuter}
          animate={char1Controls}
          initial={{ x: 0 }}
        >
          <div className={styles.charBob}>
            <img
              src={char1Idle}
              alt=""
              width={148}
              height={148}
              loading="eager"
              className={styles.charImg}
            />
          </div>
        </motion.div>

        {/* Сердце + частицы */}
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
            {showParticles &&
              PARTICLES.map((p) => (
                <motion.span
                  key={p.id}
                  className={styles.particle}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ x: p.x, y: p.y, scale: 1, opacity: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                  style={{ fontSize: p.size }}
                >
                  ♥
                </motion.span>
              ))}
          </AnimatePresence>
        </div>

        <motion.div
          className={styles.charOuter}
          animate={char2Controls}
          initial={{ x: 0 }}
        >
          <div className={styles.charBob}>
            <img
              src={char2Idle}
              alt=""
              width={148}
              height={148}
              loading="eager"
              className={styles.charImg}
            />
          </div>
        </motion.div>
      </div>

      {/* ── ПЛАТФОРМА ── */}
      <div
        className={styles.platform}
        style={{ backgroundImage: `url(${platformGround})` }}
        aria-hidden
      />
    </div>
  );
}
