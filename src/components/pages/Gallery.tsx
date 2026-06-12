import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GALLERY } from '../../data/gallery'
import styles from './Gallery.module.css'

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive]   = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  /* ── Отслеживание скролла ── */
  const onScroll = useCallback(() => {
    const t = trackRef.current
    if (!t) return
    const center = t.scrollLeft + t.clientWidth / 2
    let closest = 0, minD = Infinity
    ;(Array.from(t.children) as HTMLElement[]).forEach((el, i) => {
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
      if (d < minD) { minD = d; closest = i }
    })
    setActive(closest)
  }, [])

  /* ── Программный скролл ── */
  const scrollTo = useCallback((idx: number) => {
    const t = trackRef.current
    if (!t) return
    const el = t.children[idx] as HTMLElement
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    setActive(idx)
  }, [])

  const prev = () => scrollTo(Math.max(0, active - 1))
  const next = () => scrollTo(Math.min(GALLERY.length - 1, active + 1))

  /* ── Лайтбокс: клавиши ── */
  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (lightbox === null) return
    if (e.key === 'ArrowLeft')  setLightbox(l => l !== null ? Math.max(0, l - 1) : l)
    if (e.key === 'ArrowRight') setLightbox(l => l !== null ? Math.min(GALLERY.length - 1, l + 1) : l)
    if (e.key === 'Escape') setLightbox(null)
  }, [lightbox])

  return (
    <main className={styles.page} onKeyDown={onKey} tabIndex={-1}>

      {/* Header */}
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.eyebrow}>❖ GALLERY ❖</p>
        <h1 className={styles.title}>Our Moments</h1>
        <p className={styles.subtitle}>Every picture tells a part of our story 🧡</p>
      </motion.header>

      {/* Carousel wrapper */}
      <div className={styles.carouselWrapper}>
        {/* Arrows */}
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={prev}
          disabled={active === 0}
          aria-label="Previous"
        >◀</button>

        {/* Track */}
        <div ref={trackRef} className={styles.track} onScroll={onScroll}>
          {GALLERY.map((photo, i) => (
            <motion.div
              key={photo.id}
              className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setLightbox(i)}
            >
              <div className={styles.photoFrame}>
                {/* Пиксельные уголки */}
                <span className={styles.corner} data-pos="tl" aria-hidden="true" />
                <span className={styles.corner} data-pos="tr" aria-hidden="true" />
                <span className={styles.corner} data-pos="bl" aria-hidden="true" />
                <span className={styles.corner} data-pos="br" aria-hidden="true" />

                <img
                  src={photo.src}
                  alt={photo.caption ?? `Photo ${i + 1}`}
                  className={styles.photo}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>

              <div className={styles.info}>
                {photo.date    && <span className={styles.date}>{photo.date}</span>}
                {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
              </div>
            </motion.div>
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={next}
          disabled={active === GALLERY.length - 1}
          aria-label="Next"
        >▶</button>
      </div>

      {/* Drag hint */}
      <p className={styles.dragHint} aria-hidden="true">← drag to explore →</p>

      {/* Dots */}
      <div className={styles.dots}>
        {GALLERY.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className={styles.lightboxInner}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.lbClose} onClick={() => setLightbox(null)} aria-label="Close">✕</button>

              <button
                className={`${styles.lbNav} ${styles.lbPrev}`}
                onClick={() => setLightbox(l => l !== null ? Math.max(0, l - 1) : l)}
                disabled={lightbox === 0}
                aria-label="Previous"
              >◀</button>

              <img
                src={GALLERY[lightbox].src}
                alt={GALLERY[lightbox].caption ?? ''}
                className={styles.lbImg}
              />

              <button
                className={`${styles.lbNav} ${styles.lbNext}`}
                onClick={() => setLightbox(l => l !== null ? Math.min(GALLERY.length - 1, l + 1) : l)}
                disabled={lightbox === GALLERY.length - 1}
                aria-label="Next"
              >▶</button>

              <div className={styles.lbInfo}>
                {GALLERY[lightbox].date    && <span className={styles.lbDate}>{GALLERY[lightbox].date}</span>}
                {GALLERY[lightbox].caption && <p className={styles.lbCaption}>{GALLERY[lightbox].caption}</p>}
                <span className={styles.lbCounter}>{lightbox + 1} / {GALLERY.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
