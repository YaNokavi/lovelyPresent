import { useState, useRef } from 'react'
import { GALLERY } from '../../data/gallery'
import styles from './GallerySection.module.css'

export default function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Открытый лайтбокс
  const [lightbox, setLightbox] = useState<number | null>(null)

  const scrollTo = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[idx] as HTMLElement
    if (!card) return
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    setActive(idx)
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const center = track.scrollLeft + track.clientWidth / 2
    let closest = 0
    let minDist = Infinity
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActive(closest)
  }

  const prev = () => scrollTo(Math.max(0, active - 1))
  const next = () => scrollTo(Math.min(GALLERY.length - 1, active + 1))

  const closeLightbox = () => setLightbox(null)

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>✦ GALLERY ✦</p>
        <h2 className={styles.title}>Our Moments</h2>
        <p className={styles.subtitle}>Every photo is a level cleared together 💛</p>
      </header>

      {/* Карусель */}
      <div className={styles.carouselWrap}>
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous" disabled={active === 0}>
          ◀
        </button>

        <div ref={trackRef} className={styles.track} onScroll={onScroll}>
          {GALLERY.map((item, i) => (
            <div
              key={item.id}
              className={`${styles.slide} ${i === active ? styles.slideActive : ''}`}
              onClick={() => setLightbox(i)}
            >
              <div className={styles.photoCard}>
                <img
                  src={item.src}
                  alt={item.caption ?? `Photo ${i + 1}`}
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={styles.photo}
                />
                <div className={styles.cardInfo}>
                  {item.date && <span className={styles.date}>{item.date}</span>}
                  {item.caption && <p className={styles.caption}>{item.caption}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next" disabled={active === GALLERY.length - 1}>
          ▶
        </button>
      </div>

      {/* Точки-индикаторы */}
      <div className={styles.dots}>
        {GALLERY.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Лайтбокс */}
      {lightbox !== null && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">✕</button>
            <button className={styles.lightboxPrev} onClick={() => setLightbox(Math.max(0, lightbox - 1))} disabled={lightbox === 0}>◀</button>
            <img
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].caption ?? ''}
              className={styles.lightboxImg}
            />
            <button className={styles.lightboxNext} onClick={() => setLightbox(Math.min(GALLERY.length - 1, lightbox + 1))} disabled={lightbox === GALLERY.length - 1}>▶</button>
            {GALLERY[lightbox].caption && (
              <p className={styles.lightboxCaption}>{GALLERY[lightbox].caption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
