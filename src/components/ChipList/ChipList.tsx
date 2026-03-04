import { useState } from 'react'
import { useVisibleChips } from './useVisibleChips'
import { Popover } from '../Popover'
import styles from './ChipList.module.css'

export interface ChipListProps<T> {
  items: T[]
  renderItem: (
    item: T,
    isSelected: boolean,
    onClick: () => void,
  ) => React.ReactNode
  getKey: (item: T) => string | number
}

export function ChipList<T>({ items, renderItem, getKey }: ChipListProps<T>) {
  const [selectedId, setSelectedId] = useState<string | number | null>(null)

  const handleSelect = (id: string | number) => {
    setSelectedId((prevId) => (prevId === id ? null : id))
  }
  
  const { visibleCount, visibleChipContainerRef, measureChipContainerRef } =
    useVisibleChips(items.length)

  const visibleItems = items.slice(0, visibleCount)
  const hiddenItems = items.slice(visibleCount)

  return (
    <div className={styles.container}>
      {/* эталонные чипы которые всегда скрыты отностительно которых мы измеряем ширину */}
      <div
        ref={measureChipContainerRef}
        className={styles.measurerList}
        aria-hidden="true"
      >
        {items.map((item) => (
          <div key={getKey(item)} className={styles.chipWrapper}>
            {renderItem(item, false, () => {})}
          </div>
        ))}
      </div>

      {/* чипы которые видно */}
      <div ref={visibleChipContainerRef} className={styles.realList}>
        {visibleItems.map((item) => {
          const id = getKey(item)
          const isSelected = id === selectedId
          return (
            <div key={id} className={styles.chipWrapper}>
              {renderItem(item, isSelected, () => handleSelect(id))}
            </div>
          )
        })}
        {/* поповер, показывается если есть скрытие чипы (которые не вместились) */}
        {hiddenItems.length > 0 && (
          <Popover
            items={hiddenItems}
            renderItem={renderItem}
            getKey={getKey}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  )
}
