import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { galleryPhotos } from '../../data/gallery'
import styles from './Gallery.module.css'

// BlossomCarousel — нативный scroll + physics drag
// если пакет есть — используем, иначе — наш нативный fallback
let BlossomCarousel: React.ComponentType<{
  className?: string
  children: React.ReactNode
}> | null = null

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  BlossomCarousel = require('@blossom-carousel/react').BlossomCarousel
} catch {
  BlossomCarousel = null
}

function NativeCarousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={trackRef} className={styles.track} role="list" aria-label="Photo gallery">
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
          <div className={styles.photoPlaceholder} role="img" aria-label={photo.caption ?? 'Photo'}>
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
        {BlossomCarousel ? (
          <BlossomCarousel className={styles.blossomTrack}>
            {slides}
          </BlossomCarousel>
        ) : (
          <NativeCarousel>{slides}</NativeCarousel>
        )}
        <p className={styles.dragHint} aria-hidden>← drag to explore →</p>
      </div>
    </main>
  )
}
