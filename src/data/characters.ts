export interface CharacterStat {
  label: string
  value: number  // 1-10
  color: string
}

export interface Character {
  name: string
  class: string
  level: number
  sprite: string
  emoji: string
  bio: string
  special: string
  stats: CharacterStat[]
}

// ── Замени на свои настоящие данные! ──
export const characters: Character[] = [
  {
    name: 'Player One',          // Твоё имя
    class: 'Fire Wanderer',
    level: 99,
    sprite: '/assets/sprites/char1_idle.png',
    emoji: '🔥',
    bio: 'A determined adventurer from the Fire World. Known for charging headfirst into new challenges and always finding a way through.',
    special: 'Infinite Retry — no matter how tough the level, always gets back up.',
    stats: [
      { label: 'Passion',    value: 10, color: 'var(--color-fire)' },
      { label: 'Courage',    value: 9,  color: '#e67e22' },
      { label: 'Creativity', value: 8,  color: 'var(--color-gold)' },
      { label: 'Loyalty',    value: 10, color: 'var(--color-heart)' },
    ],
  },
  {
    name: 'Player Two',          // Имя девушки
    class: 'Nature Keeper',
    level: 99,
    sprite: '/assets/sprites/char2_idle.png',
    emoji: '🌿',
    bio: 'A gentle soul from the Nature World. Brings calm to chaos, growth to every place she touches, and warmth to every room.',
    special: 'Bloom — makes everything around her flourish just by being present.',
    stats: [
      { label: 'Kindness',   value: 10, color: 'var(--color-nature)' },
      { label: 'Wisdom',     value: 9,  color: '#27ae60' },
      { label: 'Warmth',     value: 10, color: 'var(--color-heart)' },
      { label: 'Strength',   value: 8,  color: '#a8e063' },
    ],
  },
]
