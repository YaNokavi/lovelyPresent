export interface Letter {
  id: string
  from: string
  date: string
  title: string
  body: string
  sign: string
}

// ── Замени тексты на свои настоящие письма! ──
export const letters: Letter[] = [
  {
    id: 'letter-1',
    from: 'Me',
    date: '05.12.2022',
    title: 'The Day We Met',
    body: `I still remember the exact moment I saw you.\n\nSomething just clicked. Like the universe quietly whispered: "pay attention, this one matters."\n\nThank you for walking into my world.`,
    sign: 'Always yours',
  },
  {
    id: 'letter-2',
    from: 'Me',
    date: '02.14.2023',
    title: 'What I Love About You',
    body: `Where do I even start?\n\nYour laugh. The way you get excited about little things. How you make everything feel a bit more magical just by being there.\n\nI could write a thousand pages and still not get it all down.`,
    sign: 'Forever',
  },
  {
    id: 'letter-3',
    from: 'Me',
    date: 'Today',
    title: 'This Is For You',
    body: `I built this whole thing just so you could see how I see us.\n\nTwo worlds. One beautiful adventure.\n\nThis is our story — and my favorite one.`,
    sign: 'Your Player One',
  },
]
