import { useEffect, useRef } from 'react'

/**
 * Добавляет класс 'visible' к элементам с классом 'reveal'
 * когда они попадают в viewport.
 */
export function useScrollReveal(threshold = 0.15) {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target) // срабатывает один раз
          }
        })
      },
      { threshold }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return containerRef
}
