export interface GalleryPhoto {
  id: string
  src: string       // путь относительно public/
  caption?: string
  date?: string
}

// ── Добавь сюда свои реальные фото! ──
// Положи фото в public/assets/gallery/ и пропиши путь, напр.: "/assets/gallery/photo1.jpg"
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 'photo-1',
    src: '/assets/gallery/photo1.jpg',
    caption: 'The First Meet',
    date: '05.12.2022',
  },
  {
    id: 'photo-2',
    src: '/assets/gallery/photo2.jpg',
    caption: 'Our First Date',
    date: '05.20.2022',
  },
  {
    id: 'photo-3',
    src: '/assets/gallery/photo3.jpg',
    caption: 'Adventures Begin',
    date: '07.15.2022',
  },
  {
    id: 'photo-4',
    src: '/assets/gallery/photo4.jpg',
    caption: 'Stronger Together',
    date: '02.14.2023',
  },
  {
    id: 'photo-5',
    src: '/assets/gallery/photo5.jpg',
    caption: 'My Favorite Day',
    date: '2023',
  },
]
