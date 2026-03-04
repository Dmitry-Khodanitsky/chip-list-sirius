import { useLayoutEffect, useRef, useState } from 'react'
import { calculateVisibleChips } from '../../utils/index'

export const useVisibleChips = (itemsCount: number) => {
  const [visibleCount, setVisibleCount] = useState(itemsCount)

  const visibleChipContainerRef = useRef<HTMLDivElement>(null)
  const measureChipContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const visibleContainer = visibleChipContainerRef.current
    const measureContainer = measureChipContainerRef.current

    const handleResize = () => {
      if (!visibleContainer || !measureContainer) return
      const visibleChipsCount = calculateVisibleChips(
        visibleContainer,
        measureContainer,
      )
      // если влезли вообще все чипы без исключения, то оставляем в visibleCount все чипы
      if (visibleChipsCount === itemsCount) {
        setVisibleCount(itemsCount)
      } else {
        setVisibleCount(visibleChipsCount)
      }
    }

    if (visibleContainer) {
      const observer = new ResizeObserver(handleResize)
      observer.observe(visibleContainer)
      handleResize()

      return () => observer.disconnect()
    }
  }, [itemsCount])

  return { visibleCount, visibleChipContainerRef, measureChipContainerRef }
}
