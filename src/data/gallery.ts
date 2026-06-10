/**
 * Данные галереи.
 * src: путь к фото в /public/assets/gallery/ или URL.
 * Оставь src: '' если фото ещё не добавлено — покажется placeholder.
 */
export interface GalleryItem {
  src: string
  caption?: string
}

export const GALLERY: GalleryItem[] = [
  { src: '', caption: 'Chapter 1' },
  { src: '', caption: 'Chapter 2' },
  { src: '', caption: 'Chapter 3' },
  { src: '', caption: 'Chapter 4' },
  { src: '', caption: 'Chapter 5' },
  { src: '', caption: 'Chapter 6' },
]
