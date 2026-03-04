// функция расчета количества видимый чипсов в контейнере

export const calculateVisibleChips = (
  visibleChipContainer: HTMLElement,
  measureChipContainer: HTMLElement,
): number => {
  const visibleContainerWidth =
    visibleChipContainer.getBoundingClientRect().width

  // массив чипов из measureContainer, элемент массива - чип
  const measureChips = Array.from(
    measureChipContainer.children,
  ) as HTMLElement[]

  // вычисление gap между чипами
  const styles = window.getComputedStyle(measureChipContainer)
  const gap = parseFloat(styles.gap) || 0

  // Запас под кнопку поповера
  const POPOVER_WIDTH = 100
  // суммарная ширина всех чипов которые уже поместились в visibleChipContainer
  let totalChipsWidth = 0
  // количество элементов вместившихся в visibleChipContainer
  let visibleChipsCount = 0

  for (let i = 0; i < measureChips.length; i++) {
    const chipWidth = measureChips[i].getBoundingClientRect().width
    const isLastChip = i === measureChips.length - 1
    const spacingBetweenChip = i === 0 ? 0 : gap

    // зарезервированное место под кнопку поповера
    const reservedSpace = isLastChip ? 0 : POPOVER_WIDTH

    if (
      totalChipsWidth + spacingBetweenChip + chipWidth + reservedSpace <=
      visibleContainerWidth
    ) {
      totalChipsWidth += spacingBetweenChip + chipWidth
      visibleChipsCount++
    } else {
      break
    }
  }
  return visibleChipsCount
}
