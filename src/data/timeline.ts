export interface TimelineEvent {
  id: string
  title: string
  date?: string
  emoji?: string        // большой emoji-персонаж для сцены
  sceneIcon?: string    // маленький icon внизу (облако, замок...)
  isFinal?: boolean
}

// ── Заполни своими реальными данными! ──
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'level-1',
    title: 'The First Meet',
    date: '05.12.2022',
    emoji: '👫',
    sceneIcon: '💬',
  },
  {
    id: 'level-2',
    title: 'First Date',
    date: '05.20.2022',
    emoji: '🌹',
    sceneIcon: '✨',
  },
  {
    id: 'level-3',
    title: 'Adventures',
    date: '07.15.2022',
    emoji: '🗺️',
    sceneIcon: '🌟',
  },
  {
    id: 'level-4',
    title: 'Hard Times',
    date: '10.10.2022',
    emoji: '🌧️',
    sceneIcon: '☁️',
  },
  {
    id: 'level-5',
    title: 'Stronger Together',
    date: '02.14.2023',
    emoji: '💑',
    sceneIcon: '💖',
  },
  {
    id: 'final',
    title: 'Forever & Always',
    isFinal: true,
    emoji: '🏰',
    sceneIcon: '🚩',
  },
]
