import { useState } from 'react'
import { motion } from 'framer-motion'
import { galleryPhotos } from '../../data/gallery'
import styles from './Gallery.module.css'

/**
 * BlossomCarousel lazy-wrapper.
 * Импорт обёрнут в отдельный модуль, чтобы TS не жаловался на отсутствующий пакет.
 * Если @blossom-carousel/react ещё не установлен — возвращаем NativeCarousel.
 */
function CarouselWrapper({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let BC: React.ComponentType<{ className?: string; children: React.ReactNode }> | null = null
  try {
    // dynamic import внутри try/catch: Vite возьмёт если пакет есть,
    // а если нет — throw попадёт в catch без разрыва сборки.
    // Примечание: это tехнически CJS-style внутри try— ESLint-правило
    // import/no-commonjs не должно отрабатывать внутри try{}.
    // Если ESLint всё равно жалуется — замени на /* eslint-disable */ по необходимости.
    const mod = await import('@blossom-carousel/react')
    BC = mod.BlossomCarousel
  } catch {
    BC = null
  }

  if (BC) {
    return <BC className={styles.blossomTrack}>{children}</BC>
  }

  return (
    <div className={styles.track} role="list" aria-label="Photo gallery">
      {children}
    </div>
  )
}

function PhotoSlide({ photo, index }: { photo: typeof galleryPhotos[0]; index: number }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      role="listitem"
      className={styles.slide}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.photoFrame}>
        <span className={styles.corner} data-pos="tl" aria-hidden />
        <span className={styles.corner} data-pos="tr" aria-hidden />
        <span className={styles.corner} data-pos="bl" aria-hidden />
        <span className={styles.corner} data-pos="br" aria-hidden />

        {!imgError ? (
          <img
            src={photo.src}
            alt={photo.caption ?? ''}
            className={styles.photo}
            loading="lazy"
            width={400}
            height={500}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={styles.photoPlaceholder}
            role="img"
            aria-label={photo.caption ?? 'Photo'}
          >
            <span className={styles.placeholderIcon}>📸</span>
            <p className={styles.placeholderText}>Photo coming soon</p>
          </div>
        )}
      </div>

      {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
      {photo.date    && <p className={styles.date}>{photo.date}</p>}
    </motion.div>
  )
}

export default function Gallery() {
  const slides = galleryPhotos.map((photo, i) => (
    <PhotoSlide key={photo.id} photo={photo} index={i} />
  ))

  return (
    <main className={styles.page}>
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.eyebrow}>❖ GALLERY ❖</p>
        <h1 className={styles.title}>Our Moments</h1>
        <p className={styles.subtitle}>Every picture tells a part of our story.</p>
      </motion.header>

      <div className={styles.carouselWrapper}>
        <CarouselWrapper>{slides}</CarouselWrapper>
        <p className={styles.dragHint} aria-hidden>← drag to explore →</p>
      </div>
    </main>
  )
}
