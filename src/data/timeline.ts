// Импорты спрайтов для сцен карточек
// Под каждый level можно подключить свой PNG в assets/sprites/
import char1Idle from "../assets/sprites/char1_idle.png";
import char2Idle from "../assets/sprites/char2_idle.png";

export interface TimelineEvent {
  id: string;
  title: string;
  date?: string;
  /** PNG-спрайт для сцены карточки (предпочтительно) */
  sceneSprites?: string[];
  /** Маленький icon для атмосферы (emoji-облако, замок...) */
  sceneIcon?: string;
  isFinal?: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "level-1",
    title: "Первая новая встреча",
    date: "06.12.2025",
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: "💬",
  },
  {
    id: "level-2",
    title: "День, когда все началось",
    date: "12.12.2025",
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: "✨",
  },
  {
    id: "level-3",
    title: "Прелестные каникулы вместе",
    date: "01.01.2026 - 12.01.2026",
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: "🌟",
  },
  {
    id: "level-4",
    title: "Побег от землеройки и первое путешествие",
    date: "03.02.2026",
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: "🐁",
  },
  {
    id: "level-5",
    title: "Вместе были в театре",
    date: "03.03.2026",
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: "💖",
  },
  {
    id: "level-6",
    title: "Концерт Руслана (наш любимый)",
    date: "02.05.2026",
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: "🦇",
  },
  {
    id: "level-7",
    title: "И вот уже полгода",
    date: "12.06.2026",
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: "⏳",
  },
  {
    id: "final",
    title: "Навсегда и навеки",
    isFinal: true,
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: "🏰",
  },
];
