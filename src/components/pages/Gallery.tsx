import { useRef } from 'react'
import { motion } from 'framer-motion'
import { galleryPhotos } from '../../data/gallery'
import styles from './Gallery.module.css'

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <main className={styles.page}>
      {/* ── Шапка ── */}
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.eyebrow}>✦ GALLERY ✦</p>
        <h1 className={styles.title}>Our Moments</h1>
        <p className={styles.subtitle}>Every picture tells a part of our story.</p>
      </motion.header>

      {/* ── Carousel ── */}
      <div className={styles.carouselWrapper}>
        <div
          ref={trackRef}
          className={styles.track}
          role="list"
          aria-label="Photo gallery"
        >
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              role="listitem"
              className={styles.slide}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.photoFrame}>
                {/* Уголок рамки */}
                <span className={styles.corner} data-pos="tl" aria-hidden />
                <span className={styles.corner} data-pos="tr" aria-hidden />
                <span className={styles.corner} data-pos="bl" aria-hidden />
                <span className={styles.corner} data-pos="br" aria-hidden />

                <img
                  src={photo.src}
                  alt={photo.caption}
                  className={styles.photo}
                  loading="lazy"
                  width={400}
                  height={500}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement
                    img.style.display = 'none'
                    const fb = img.nextElementSibling as HTMLElement
                    if (fb) fb.removeAttribute('hidden')
                  }}
                />
                {/* Placeholder если фото не загружено */}
                <div hidden className={styles.photoPlaceholder}>
                  <span>📸</span>
                  <p>Photo coming soon</p>
                </div>
              </div>

              {photo.caption && (
                <p className={styles.caption}>{photo.caption}</p>
              )}
              {photo.date && (
                <p className={styles.date}>{photo.date}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Подсказка для мобайла */}
        <p className={styles.dragHint} aria-hidden>← drag to explore →</p>
      </div>
    </main>
  )
}
