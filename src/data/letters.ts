/**
 * Данные писем — замени на реальные сообщения!
 */
export interface Letter {
  from: string
  preview: string   // Короткий превью (показывается свёрнутым)
  text: string      // Полный текст (показывается при открытии)
}

export const LETTERS: Letter[] = [
  {
    from: 'From Player 1',
    preview: 'Знаешь, я до сих пор помню тот день...',
    text: 'Знаешь, я до сих пор помню тот день. Напиши здесь что-то настоящее — слова, которые ты хочешь, чтобы она прочитала и улыбнулась.',
  },
  {
    from: 'From Player 2',
    preview: 'Это место для её слов...',
    text: 'Это место для её слов — можно оставить пустым или добавить её любимую цитату.',
  },
  {
    from: 'A Note',
    preview: 'Some things are better said in pixels...',
    text: 'Some things are better said in pixels. Add more letters here as your story grows.',
  },
]
