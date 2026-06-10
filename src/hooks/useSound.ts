/**
 * Простой хук для воспроизведения звуков.
 * Файлы кладём в public/assets/sounds/
 * Пример: useSound('/assets/sounds/click.mp3')()
 */
import { useCallback, useRef } from 'react'

export function useSound(src: string, volume = 0.4) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = useCallback(() => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(src)
        audioRef.current.volume = volume
      }
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {/* autoplay policy */})
    } catch {
      // тихо игнорируем если файл не найден
    }
  }, [src, volume])

  return play
}
