// ── Импорты через Vite (работает из src/assets/) ──
import img_211225 from "../assets/gallery/211225.jpeg";
import img_070126 from "../assets/gallery/070126.jpeg";
import img_130126 from "../assets/gallery/130126.jpeg";
import img_230126_1 from "../assets/gallery/230126_1.jpeg";
import img_230126_2 from "../assets/gallery/230126_2.jpeg";
import img_230126_3 from "../assets/gallery/230126_3.jpeg";
import img_060226 from "../assets/gallery/060226.jpeg";
import img_270226 from "../assets/gallery/270226.jpeg";
import img_080326 from "../assets/gallery/080326.jpeg";
import img_110326 from "../assets/gallery/110326.jpeg";
import img_290326 from "../assets/gallery/290326.jpeg";
import img_020526_1 from "../assets/gallery/020526_1.jpeg";
import img_020526_2 from "../assets/gallery/020526_2.jpeg";
import img_070626 from "../assets/gallery/070626.jpeg";

export interface GalleryPhoto {
  id: string;
  src: string;
  caption?: string;
  date?: string;
}

export const GALLERY: GalleryPhoto[] = [
  { id: "p1", src: img_211225, caption: "Милые на полу)", date: "21.12.25" },
  {
    id: "p2",
    src: img_070126,
    caption: "Январская прогулка в ресторан ✨",
    date: "07.01.26",
  },
  { id: "p3", src: img_130126, caption: "Вместе 🧡", date: "13.01.26" },
  {
    id: "p4",
    src: img_230126_1,
    caption: "Ботаники в саду 🌿",
    date: "23.01.26",
  },
  {
    id: "p5",
    src: img_230126_2,
    caption: "В китайском ресторане",
    date: "23.01.26",
  },
  { id: "p6", src: img_230126_3, caption: "ОСД!", date: "23.01.26" },
  { id: "p7", src: img_060226, caption: "Сняли дом", date: "06.02.26" },
  { id: "p8", src: img_270226, caption: "Ходили в кино", date: "27.02.26" },
  { id: "p9", src: img_080326, caption: "8 марта 🌸", date: "08.03.26" },
  { id: "p10", src: img_110326, caption: "В театре были", date: "11.03.26" },
  { id: "p11", src: img_290326, caption: "Красотка", date: "29.03.26" },
  {
    id: "p12",
    src: img_020526_1,
    caption: "На концерте Руслана! 🦇",
    date: "02.05.26",
  },
  { id: "p13", src: img_020526_2, caption: "Красотка 2", date: "02.05.26" },
  {
    id: "p14",
    src: img_070626,
    caption: "Летняя прогулка ☀️",
    date: "07.06.26",
  },
];

// backward-compat alias
export const galleryPhotos = GALLERY;
