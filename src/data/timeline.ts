// Импорты спрайтов для сцен карточек
// Под каждый level можно подключить свой PNG в assets/sprites/
import char1Idle from '../assets/sprites/char1_idle.png'
import char2Idle from '../assets/sprites/char2_idle.png'

export interface TimelineEvent {
  id: string
  title: string
  date?: string
  /** PNG-спрайт для сцены карточки (предпочтительно) */
  sceneSprites?: string[]
  /** Маленький icon для атмосферы (emoji-облако, замок...) */
  sceneIcon?: string
  isFinal?: boolean
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'level-1',
    title: 'The First Meet',
    date: '05.12.2022',
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: '💬',
  },
  {
    id: 'level-2',
    title: 'First Date',
    date: '05.20.2022',
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: '✨',
  },
  {
    id: 'level-3',
    title: 'Adventures',
    date: '07.15.2022',
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: '🌟',
  },
  {
    id: 'level-4',
    title: 'Hard Times',
    date: '10.10.2022',
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: '☁️',
  },
  {
    id: 'level-5',
    title: 'Stronger Together',
    date: '02.14.2023',
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: '💖',
  },
  {
    id: 'final',
    title: 'Forever & Always',
    isFinal: true,
    sceneSprites: [char1Idle, char2Idle],
    sceneIcon: '🏰',
  },
]
