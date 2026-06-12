export interface GalleryPhoto {
  id: string;
  src: string; // путь относительно public/
  caption?: string;
  date?: string;
}

// ── Добавь сюда свои реальные фото! ──
// Положи фото в public/assets/gallery/ и пропиши путь, напр.: "/assets/gallery/photo1.jpg"
export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "photo-1",
    src: "/assets/gallery/211225.jpeg",
    caption: "The First Meet",
    date: "05.12.2022",
  },
  {
    id: "photo-2",
    src: "/assets/gallery/070126.jpeg",
    caption: "Our First Date",
    date: "05.20.2022",
  },
  {
    id: "photo-3",
    src: "/assets/gallery/130126.jpeg",
    caption: "Adventures Begin",
    date: "07.15.2022",
  },
  {
    id: "photo-4",
    src: "/assets/gallery/230126_1.jpeg",
    caption: "Stronger Together",
    date: "02.14.2023",
  },
  {
    id: "photo-5",
    src: "/assets/gallery/230126_2.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-6",
    src: "/assets/gallery/230126_3.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-7",
    src: "/assets/gallery/060226.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-8",
    src: "/assets/gallery/270226.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-9",
    src: "/assets/gallery/080326.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-10",
    src: "/assets/gallery/110326.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-11",
    src: "/assets/gallery/290326.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-12",
    src: "/assets/gallery/020526_1.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-13",
    src: "/assets/gallery/020526_2.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
  {
    id: "photo-14",
    src: "/assets/gallery/070626.jpeg",
    caption: "My Favorite Day",
    date: "2023",
  },
];
