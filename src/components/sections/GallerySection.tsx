import { BlossomCarousel } from '@blossom-carousel/react'
import '@blossom-carousel/core/style.css'
import { GALLERY } from '../../data/gallery'
import styles from './GallerySection.module.css'

export default function GallerySection() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title}>🖼 Gallery</h1>
        <p className={styles.subtitle}>Our moments, captured forever</p>
      </header>

      <BlossomCarousel
        className={styles.carousel}
        autoPlay={false}
      >
        {GALLERY.map((item, i) => (
          <div key={i} className={styles.slide}>
            <div className={`pixel-card ${styles.photoCard}`}>
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.caption}
                  width={280}
                  height={320}
                  loading="lazy"
                  className={styles.photo}
                />
              ) : (
                <div className={styles.photoPlaceholder}>
                  <span className={styles.placeholderIcon}>📷</span>
                  <span className={styles.placeholderText}>Photo {i + 1}</span>
                </div>
              )}
              {item.caption && (
                <p className={styles.caption}>{item.caption}</p>
              )}
            </div>
          </div>
        ))}
      </BlossomCarousel>

      <p className={styles.hint}>← Drag or scroll →</p>
    </section>
  )
}
