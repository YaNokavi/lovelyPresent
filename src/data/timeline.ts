/**
 * Данные таймлайна — замени на реальные даты и события!
 * Формат даты: DD.MM.YYYY
 */
export interface TimelineItem {
  title: string
  date: string
  description?: string
}

export const TIMELINE: TimelineItem[] = [
  {
    title: 'The First Meet',
    date: '05.12.2022',
    description: 'Всё началось здесь.',
  },
  {
    title: 'First Date',
    date: '20.05.2022',
  },
  {
    title: 'Adventures',
    date: '15.07.2022',
  },
  {
    title: 'Hard Times',
    date: '10.10.2022',
    description: 'Мы справились вместе.',
  },
  {
    title: 'Stronger Together',
    date: '14.02.2023',
  },
]
